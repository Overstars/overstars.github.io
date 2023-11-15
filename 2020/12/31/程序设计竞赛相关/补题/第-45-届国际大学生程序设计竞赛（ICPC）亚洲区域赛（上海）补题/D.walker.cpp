//#pragma comment(linker, "/STACK:102400000,102400000")
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int>pii;
//#define int ll
#define ff first
#define ss second
#define debug(x) std:: cerr << #x << " = " << x << std::endl;
const int maxn=2e5+10,inf=0x3f3f3f3f,mod=1000000007;
const ll INF=0x3f3f3f3f3f3f3f3f;
const double eps=1e-7;
//#define DEBUG//#define lowbit(x) ((x) & -(x))//<<setiosflags(ios::fixed)<<setprecision(9)
void read(){}
template<typename T,typename... T2>inline void read(T &x,T2 &... oth) {
	x=0; int ch=getchar(),f=0;
	while(ch<'0'||ch>'9'){if (ch=='-') f=1;ch=getchar();}
	while (ch>='0'&&ch<='9'){x=(x<<1)+(x<<3)+(ch^48);ch=getchar();}
	if(f)x=-x;
	read(oth...);
}

signed main(signed argc, char const *argv[])
{
	std::ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
	#ifdef DEBUG
		freopen("input.in", "r", stdin);
	//	freopen("output.out", "w", stdout);
	#endif
	int t;
	cin>>t;
	while(t--)
	{
		double n,p1,v1,p2,v2;
		cin>>n>>p1>>v1>>p2>>v2;
		if(p1>p2)
		{
			swap(p1,p2);
			swap(v1,v2);
		}
		double l=0,r=min({(n+min(n-p1,p1))/v1,(n+min(n-p2,p2))/v2,max((n-p1)/v1,p2/v2)});//1走完全程,2走完全程,对穿
		double ans=r;
		while(r-l>eps)
		{
			double mid=(l+r)/2;
			auto f=[](double p,double v,double t){
				double d=v*t;//p点出发,t时间行走距离
				if(d<p)//并不能走完
					return (double)0;
				return max(max(p,d-2*p+p),p+(d-p)/2);//先向两侧走,先向中间走最大覆盖区间
			};
			double s1=f(p1,v1,mid)+f(n-p2,v2,mid);
			double s2=f(n-p1,v1,mid)+f(p2,v2,mid);
			if(s1>=n||s2>=n)
				ans=min(ans,mid),r=mid;
			else
				l=mid;
		}
		cout<<setiosflags(ios::fixed)<<setprecision(9)<<ans<<endl;
	}
	return 0;
}


