var page=require('webpage').create();//创建一个网页对象;
var system=require('system');
var address,fileName;
window.scrollTo(0,10000);//滚动到底部
// window.document.body.scrollTop = document.body.scrollHeight;//滚动到底部
// var _height=document.body.offsetHeight;
// var _width=document.body.offsetWidth;
// page.viewportSize={width:4800,height:8000};//设置窗口的大小为1024*800；
// console.log(_height,_width) ;

// page.viewportSize={width:1024,height:8000};//设置窗口的大小为1024*800；
// page.clipRect={top:0,left:0,width:1024,height:800};//截取从{0,0}为起点的1024*800大小的图像;
// //禁止Javascript，允许图片载入;
// // 并将userAgent改为"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0";

//
if (system.args.length === 1) {
  console.log('Try to pass some args when invoking this script!');
  phantom.exit(1);
}else{
    var t=Date.now();
  address=system.args[1];
  fileName=system.args[2];
  count=system.args[3];
  max=system.args[4];
  page.open(address,function(status){
    console.log('status:'+status);
    if (status != "success")
    {
      console.log('FAIL to load the address');
    }

   var bb= page.evaluate(function()
    {
      //此函数在目标页面执行的，上下文环境非本phantomjs，所以不能用到这个js中其他变量
        window.document.body.scrollTop = document.body.scrollHeight;
      return document.getElementsByTagName('body')[0].getBoundingClientRect();
    });

    page.viewportSize = {width: bb.width,height: bb.height};
    t=Date.now()-t;
     
    window.setTimeout(function ()
    {
      page.render('../public/images/'+fileName+'.png');
      phantom.exit();
    }, t);

    // page.close();//释放;
  });





}