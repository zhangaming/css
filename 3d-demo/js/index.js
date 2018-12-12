
/*
*   type :  0 -- DIV  1--JS  2--H5  3--Css3
*
*
* */
var $ = document.querySelectorAll.bind(document);

var click = false;
var cursor = { x: 0, y: 0};
var perspective = $('#list ul')[0];
var transform = {
  position: { x: 0, y: 0},
  rotation: { x: 0, y: 0},
  zoom: 0
};

var target = { 
  position: { x: 0, y: 0},
  rotation: { x: 0, y: 0},
  zoom: 100
};

var targetOnDown = {
  position: { x: 0, y: 0},
  rotation: { x: 0, y: 0},
  zoom: 0
};

var flyData = [
    {
        type : "Css3",
        author : "阿明",
        title : "我感觉你是在为难我胖虎",
        dec : "这大概是最屌的案例了……",
        time : "2018-03-03",
        src : "3D Drag"
    }
];
function MainMove(){
    var mian  = $('#main')[0];
    // 监听鼠标滚轮键
    mian.addEventListener('mousewheel', scroll, false);
    mian.addEventListener('DOMMouseScroll', scroll, false);
    function scroll(e) {
    e.preventDefault();
    var delta = (e.wheelDelta) ? e.wheelDelta : - e.detail;
    target.zoom += (delta > 0) ? 15 : -15;
    if (target.zoom < 50) target.zoom = 50;
    }
    mian.onmousedown = function(e) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
        targetOnDown.position.x = target.position.x;
        targetOnDown.position.y = target.position.y;
        targetOnDown.rotation.x = target.rotation.x;
        targetOnDown.rotation.y = target.rotation.y;
        targetOnDown.zoom = target.zoom;
        click = true;
    };
      
    mian.onmousemove = function(e) {
        e.preventDefault();
        if (click) {
            target.rotation.x = targetOnDown.rotation.x - (e.pageY - cursor.y) * 0.3;
            target.rotation.y = targetOnDown.rotation.y + (e.pageX - cursor.x) * 0.3;
        }
    };
    
    mian.onmouseup = function(e) {
        click = false;
    };
    mian.addEventListener( 'touchstart' ,function(e) {
        cursor.x = e.touches[0].pageX;
        cursor.y = e.touches[0].pageY;
        targetOnDown.position.x = target.position.x;
        targetOnDown.position.y = target.position.y;
        targetOnDown.rotation.x = target.rotation.x;
        targetOnDown.rotation.y = target.rotation.y;
        targetOnDown.zoom = target.zoom;
        click = true;
    });
      
    mian.addEventListener( 'touchmove' ,function(e) {
        e.preventDefault();
        if (click) {
            target.rotation.x = targetOnDown.rotation.x - (e.touches[0].pageY - cursor.y) * 0.3;
            target.rotation.y = targetOnDown.rotation.y + (e.touches[0].pageX - cursor.x) * 0.3;
        }
    }, {passive: false});
    
    mian.addEventListener( 'touchend' ,function(e) {
        click = false;
    });

    var all  = $('#all')[0];
    var boxGesture=setGesture(all);  //得到一个对象
    boxGesture.gesturestart=function(){  //双指开始
        console.log(1)
    };
    boxGesture.gesturemove=function(e){  //双指移动
        target.zoom += (e.scale > 0) ? 15 : -15;
        if (target.zoom < 50) target.zoom = 50;
    };
    boxGesture.gestureend=function(){  //双指结束
        console.log(2)
    };
    (function animate() {
        transform.position.x += (target.position.x - transform.position.x) * 0.2;
        transform.position.y += (target.position.y - transform.position.y) * 0.2;
        transform.rotation.x += (target.rotation.x - transform.rotation.x) * 0.1;
        transform.rotation.y += (target.rotation.y - transform.rotation.y) * 0.1;
        transform.zoom += (target.zoom - transform.zoom) * 0.1;
      
        transform.position.x = parseFloat(transform.position.x.toFixed(2));
        transform.position.y = parseFloat(transform.position.y.toFixed(2));
        transform.rotation.x = parseFloat(transform.rotation.x.toFixed(2));
        transform.rotation.y = parseFloat(transform.rotation.y.toFixed(2));
        transform.zoom = parseFloat(transform.zoom.toFixed(2));
      
        perspective.style.transform =
        perspective.style.msTransform =
        perspective.style.mozTransform =
        perspective.style.webkitTransform = 'translate3d(' + transform.position.x + 'px, ' + transform.position.y + 'px, -2000px) rotateX(' + transform.rotation.x + 'deg) rotateY(' + transform.rotation.y + 'deg) scale3d(' + transform.zoom / 100 + ', ' + transform.zoom / 100 + ', ' + transform.zoom / 100 + ')';
        requestAnimationFrame(animate);
      })();

    }

    function setGesture(el){
        var obj={}; //定义一个对象
        var istouch=false;
        var start=[];
        el.addEventListener("touchstart",function(e){
            if(e.touches.length>=2){  //判断是否有两个点在屏幕上
                istouch=true;
                start=e.touches;  //得到第一组两个点
                obj.gesturestart&&obj.gesturestart.call(el); //执行gesturestart方法
            };
        },false);
        document.addEventListener("touchmove",function(e){
            e.preventDefault();
            if(e.touches.length>=2&&istouch){
                var now=e.touches;  //得到第二组两个点
                var scale=getDistance(now[0],now[1])/getDistance(start[0],start[1]); //得到缩放比例，getDistance是勾股定理的一个方法
                var rotation=getAngle(now[0],now[1])-getAngle(start[0],start[1]);  //得到旋转角度，getAngle是得到夹角的一个方法
                e.scale=scale.toFixed(2);
                e.rotation=rotation.toFixed(2);
                obj.gesturemove&&obj.gesturemove.call(el,e);  //执行gesturemove方法
            };
        },false);
        document.addEventListener("touchend",function(e){
            if(istouch){
                alert(e.scale)
                istouch=false;
                obj.gestureend&&obj.gestureend.call(el);  //执行gestureend方法
            };
        },false);
        return obj;
    };
    function getDistance(p1, p2) {
        var x = p2.pageX - p1.pageX,
            y = p2.pageY - p1.pageY;
        return Math.sqrt((x * x) + (y * y));
    };
    function getAngle(p1, p2) {
        var x = p1.pageX - p2.pageX,
            y = p1.pageY- p2.pageY;
        return Math.atan2(y, x) * 180 / Math.PI;
    };

