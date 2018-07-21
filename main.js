var express = require('express');

var bodyParser = require('body-parser');

var multer = require('multer');

var fs = require('fs');

var strTime = Date.now();

var storage	=	multer.diskStorage({
    destination: function (httpReq, FileObject, callback) {
      callback(null, './uploads/'+strTime);
    },
    filename: function (httpReq, FileObject, callback) {
      callback(null, FileObject.originalname);
    }
  });

var upload = multer({ storage : storage}).array('FilePath');
var uploadA = multer({storage:storage}).single('FilePathA');
var uploadB = multer({storage:storage}).single('FilePathB');

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
});

app.get('/',function(httpReq,httpRes){
    httpRes.sendFile(__dirname+'/home.html');
});

app.post('/Upload',function(httpReq,httpRes){
    //console.log(httpReq.body);
    strTime = Date.now();

    fs.mkdirSync(__dirname+'/uploads/'+strTime);
    
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
    
});