var express = require('express');

var bodyParser = require('body-parser');

var multer = require('multer');

var fs = require('fs');

var strTime = Date.now();

var storage	=	multer.diskStorage({
    destination: function (httpReq, FileObject, callback) {
    if(FileObject.fieldname == 'FilePathA'){
      callback(null, './uploads/'+strTime+'/A');        
    }
    else if(FileObject.fieldname == 'FilePathB'){
        callback(null, './uploads/'+strTime+'/B');   
    }
    else{
        callback(null, './uploads/'+strTime);   
    }
    },
    filename: function (httpReq, FileObject, callback) {
        callback(null, FileObject.originalname);
    }
  });

var uploader = multer({storage:storage});

var app = express();

var httpPort = 8085;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

for(let i=0;i<process.argv.length;i++){
    var strArg = process.argv[i];
    if(strArg != ""){
        if(strArg.indexOf('-port=')>-1){
            httpPort = strArg.substr(6);
        }
    }
}

app.listen(httpPort,function(err,res){
    if(err) throw err;
    console.log('Server @ '+httpPort);
    if(fs.existsSync(__dirname+'/uploads')==false){
        fs.mkdirSync(__dirname+'/uploads');
    }
    
});

app.get('/',function(httpReq,httpRes){
    httpRes.sendFile(__dirname+'/home.html');
});

app.post('/Upload',function(httpReq,httpRes){
    strTime = Date.now();

    fs.mkdirSync(__dirname+'/uploads/'+strTime);

    var upload = uploader.array('FilePath');
    
    upload(httpReq,httpRes,function(err){
        if(err){
            console.log(err);
            httpRes.sendFile(__dirname+'/uploadFailed.html');
        }
        httpRes.sendFile(__dirname+'/uploadSuccess.html');
    });
});

app.get('/CompareForm',function(httpReq,httpRes){
    httpRes.sendFile(__dirname+'/Compare.html');
});

app.post('/Compare',function(httpReq,httpRes){
    strTime = Date.now();

    fs.mkdirSync(__dirname+'/uploads/'+strTime);
    fs.mkdirSync(__dirname+'/uploads/'+strTime+'/A');
    fs.mkdirSync(__dirname+'/uploads/'+strTime+'/B');

    var uploadCompare = uploader.fields([
        {name:'FilePathA'},
        {name:'FilePathB'}
    ]);

    uploadCompare(httpReq,httpRes,function(err){
        if(err){
            console.log(err);
            httpRes.sendFile(__dirname+'/uploadFailed.html');
        }
        httpRes.sendFile(__dirname+'/uploadSuccess.html');
    });
});