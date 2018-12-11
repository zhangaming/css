
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
    });
    
    mian.addEventListener( 'touchend' ,function(e) {
        click = false;
    });
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

