#include<iostream>
using namespace std;
// Please write your code, within the "BEGIN-END" blocks given below.
// A "BEGIN-END" block is identified as follows :
//
// "//// BEGIN: Some string DONT_ERASE_xx_yy"
// 
//
// "//// END: Some other string DONT_ERASE_xx_yy"
//
// where "xx" is the block number and "yy" is the
// marks allocated for the block
//
// The FIRST block (BLOCK 1 i.e. DONT_ERASE_01_0) carries 0 marks and 
// is a placeholder for your personal information, to be written as a comment.
//
// WARNING :
// (1) Do NOT write any cout or cin statements
// (2) Do NOT delete or modify the existing code i.e. main function, comments, blocks, etc.
// (3) Write your code in between BEGIN and END of the respective blocks only
// (4) Do NOT rename the .cpp file

//// ---------------------------------------------------------------------------
//// BEGIN: Fill your details as comments below DONT_ERASE_01_0
//// Name:
////
//// END: Fill your details as comments above DONT_ERASE_01_0
//// ---------------------------------------------------------------------------

int main() {

    long long int rpm, maxRPM, finalRPM;
    int years = 0,x,xr,y=0,yr,p,pr;
    cout << "Enter the RPM of harddisk. Value should be inbetween 3524 and 8524, both inclusive \n";
    cin >> rpm;
    maxRPM = rpm * 8;
    cout << "The maximum limit of the RPM is " << maxRPM << endl;

//// ---------------------------------------------------------------------------
//// BEGIN: Write code below  DONT_ERASE_02_10
while(rpm <= maxRPM)
{
x = rpm;
y = 0;
while(x != 0)
{
xr = x % 10;
y = y + xr * xr;
x = x / 10;
}
yr = y * 323;
p = rpm;
pr = p % 10;
if((p/10000) != 0)
pr = pr * 10000;
else
pr = pr * 1000;
p = p / 10;
pr = pr + p;
pr = pr % 100;
yr = yr + pr;
if(yr <= maxRPM)
{
years = years + 1;
rpm = yr;
}
else
{
years = years + 1;
finalRPM = yr;
break;
}
if(years == 10)
{
finalRPM = yr;
break;
}
}
//// END: End of your code DONT_ERASE_02_10
//// ---------------------------------------------------------------------------

    if (years >= 10)
        cout << "The harddisk is not affected with the bug. Tested for " << years << " Years. Final RPM is: " << finalRPM << endl;
    else
        cout << "The harddisk is likely to crash after " << years << " years, with RPM of " << finalRPM << endl;
    return 0;
}