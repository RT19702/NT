
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabbar/index","pages/tabbar/property","pages/tabbar/difi","pages/tabbar/mine","subpackages/recommend/recommend","subpackages/team/team","subpackages/safety/safety"],"window":{"navigationStyle":"custom","navigationBarTextStyle":"black","navigationBarTitleText":"NT","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"backgroundColor":"transparent","color":"#4c4c4c","selectedColor":"#fff","borderStyle":"transparent","list":[{"pagePath":"pages/tabbar/index","iconPath":"static/images/tabbar/home.png","selectedIconPath":"static/images/tabbar/active_home.png","text":"首页"},{"pagePath":"pages/tabbar/difi","iconPath":"static/images/tabbar/difi.png","selectedIconPath":"static/images/tabbar/active_difi.png","text":"Difi"},{"pagePath":"pages/tabbar/property","iconPath":"static/images/tabbar/property.png","selectedIconPath":"static/images/tabbar/active_property.png","text":"资产"},{"pagePath":"pages/tabbar/mine","iconPath":"static/images/tabbar/mine.png","selectedIconPath":"static/images/tabbar/active_mine.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"nt","compilerVersion":"3.6.5","entryPagePath":"pages/tabbar/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabbar/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/tabbar/property","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/tabbar/difi","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/tabbar/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/subpackages/recommend/recommend","meta":{},"window":{}},{"path":"/subpackages/team/team","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/subpackages/safety/safety","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});