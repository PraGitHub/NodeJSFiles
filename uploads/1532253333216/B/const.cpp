#include<iostream>
using namespace std;
int fun()
{
	return 1;
}
float fun()
{
	return 1.23;
}
int main()
{
	int a;
	cout<<fun()<<endl;
	cout<<::fun()<<endl;
	cout<<a;
}
