var imgAry1 = new Array();
for (var i = 0; i < 120; i++) {
  var imgUrl = "./img/2020diary/";
  var num = i + 1;
  var img = `${imgUrl}${num}.jpg`;
  imgAry1.push({
    img:img,
  });
}
var imgAry2 = new Array();
for (var i = 0; i < 56; i++) {
  var imgUrl = "./img/2021diary/";
  var num = i + 1;
  var img = `${imgUrl}${num}.jpg`;
  imgAry2.push({
    img:img,
  });
}

var imgSum = [...imgAry1, ...imgAry2];
window.onload = function () {
  console.log("imgSum", imgSum.length);
  //开始即调用
  var aryIndex = 0;
  createBox(aryIndex);

  window.onscroll = function () {
    //检查是否具备了滚动条件
    if (checkScrollSlide()) {
      aryIndex += 10;
      createBox(aryIndex);
    }
  };
};

function createBox(aryIndex) {
  var ocontent = document.getElementById("container");
  //创建div,并将其加到所有的Box后面
  for (var i = 1; i <= 10; i++) {
    if (aryIndex + i <= imgSum.length) {
      var obox = document.createElement("div");
      obox.className = "box";
      ocontent.appendChild(obox);
      var opic = document.createElement("div");
      opic.className = "active";
      obox.appendChild(opic);
      var oimg = document.createElement("img");
      oimg.src = `${imgSum[aryIndex + i].img}`;
      opic.appendChild(oimg);
    }
  }
  setTimeout(() => {
    waterfall("container", "box");
  }, 100);
}

function waterfall(content, box) {
  //获取大盒子（container）里的所有小盒子（box）
  var ocontent = document.getElementById(content);
  var oboxs = getByClass(ocontent, box);
  //计算整个页面显示的列数(页面宽/box的宽);
  var oboxW = oboxs[0].offsetWidth;

  //Math.floor 向下取整
  var cols = Math.floor(document.documentElement.clientWidth / oboxW);
  console.log("cols", cols);
  //设置container的宽度（这里用刚刚计算出来的列数乘盒子的宽度（oboxW * cols）得到的）
  ocontent.style.cssText = "width:" + oboxW * cols + "px;margin:20 auto";
  var heightArr = [];
  for (var i = 0; i < oboxs.length; i++) {
    if (i < cols) {
      // 将前cols张图片的宽度记录到hArr数组中(第一行的高度)
      heightArr.push(oboxs[i].offsetHeight);
    } else {
      //从第二行开始就开始找最小的高度了，决定带插入图片该插入到哪里
      //js Math.min.apply()方法，取出数组中的最小值
      var minH = Math.min.apply(null, heightArr);
      var index = getMinhIndex(heightArr, minH);
      // 设置最小高度的图片的style为绝对定位，并设置top和left
      oboxs[i].style.position = "absolute";
      oboxs[i].style.top = minH + "px";
      oboxs[i].style.left = oboxs[index].offsetLeft + "px";
      heightArr[index] += oboxs[i].offsetHeight;
    }
  }
}

//  返回所有的box盒子
function getByClass(content, cName) {
  var boxAry = new Array(),
    oElements = content.getElementsByTagName("*");
  for (var i = 0; i < oElements.length; i++) {
    if (oElements[i].className == cName) {
      boxAry.push(oElements[i]);
    }
  }
  return boxAry;
}

//获取数组中最小值的下标值
function getMinhIndex(arr, val) {
  for (var i in arr) {
    if (arr[i] == val) {
      return i;
    }
  }
}

//定义函数检测是否具备了滚动加载数据块的条件

function checkScrollSlide() {
  var ocontent = document.getElementById("container");
  var oboxs = getByClass(ocontent, "box");
  //获取最后一个box到顶部的距离+它自身一半的距离
  var lastBoxH =
    oboxs[oboxs.length - 1].offsetTop +
    Math.floor(oboxs[oboxs.length - 1].offsetHeight / 2);
  //获取滚动条滚动距离（为了消除标准模式和怪异模式之间的差别而做的兼容）
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  // 获取window可视化的高度
  var height =
    document.body.clientHeight || document.documentElement.clientHeight;
  console.log("lastBoxH", lastBoxH);
  return lastBoxH < scrollTop + height ? true : false;
}
