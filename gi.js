///////// デバイスの判定 ////////
const isSupported = !!(
	'ontouchstart' in window || // iOS & Andoroid
	(navigator.pointerEnabled && navigator.maxTouchPoints >0)
);//IE 11+

////////WebPの判定 ////////
const isSupportWebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;



///////// 画像の処理 ////////

var img_op = new Array(24); // デフォルト
var img_k_4 = new Array(10); // 拡大画像
var img_k_5 = new Array(10); // 拡大画像
var img_k_6 = new Array(10); // 拡大画像

var kakudai_Flag = 0;  // 画像読み込み用フラッグ

var img_width;
var img_height;
var img_size;
var device_direction;

var image = document.getElementById("image");
var kakudai = document.getElementById("range");
var count_x=23;  // 画像配列の添え字 x
var count_y=0;  // 画像配列の添え字 y
var file_name;  // 画像読み込み用
var image_ar = img_op;  // 表示画像変更用
var image_type = ""

document.getElementById("range").style.visibility = "hidden";

// 画像データを配列に格納  
function image_load(img, file) {

	for (var i = 0; i < img_op.length; i++) {
        img[i] = new Array(24);

		for (var j = 0; j < img_op.length; j++) {
            img[i][j] = new Image();
            img[i][j].src = file + i + "/image" + ('000' + j).slice(-3) + image_type;

        }
    }
}

function image_loadk_6(img, file) {
	
	for (var i = 0; i < 10; i++) {
        	img[i] = new Array(24);

		for (var j = 0; j < img_op.length; j++) {
            img[i][j] = new Image();
            img[i][j].src = file + i + "/image" + ('000' + j).slice(-3) + image_type;
        }
    }
}

function image_loadk_5(img, file) {

	for (var i = 0; i < 10; i++) {
        img[i] = new Array(24);

		for (var j = 0; j < img_op.length; j++) {
            img[i][j] = new Image();
            img[i][j].src = file + i + "/image" + ('000' + j).slice(-3) + image_type;               
        }
    }
}                                //slice(-3)是截取最后三个元素

function image_loadk_4(img, file) {
	
	for (var i = 0; i < 10; i++) {
        img[i] = new Array(24);

		for (var j = 0; j < img_op.length; j++) {
            img[i][j] = new Image();
            img[i][j].src = file + i + "/image" + ('000' + j).slice(-3) + image_type;
        }
    }
}

function firstscript() {
	supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	if(supportsTouch) {
		document.getElementById('btn1').style.display = "none";
		document.getElementById('btn2').style.display = "none";
		document.getElementById('btn3').style.display = "none";
		document.getElementById('btn4').style.display = "none";
	}
	img_width = document.documentElement.clientWidth;
	img_height = document.body.clientHeight;
	if(img_width>=img_height)	{
		img_size=img_height;
		device_direction=1;
	}
	else	{
		img_size=img_width;
		device_direction=0;
	}
	if(img_size<=690){
		if(device_direction==0){
			document.images.image.width = img_size-60;
			document.images.image.height = img_size-60;
		}
		else{
			if(supportsTouch){
				document.images.image.width = img_size-60;
				document.images.image.height = img_size-60;
			}
			else{
				document.images.image.width = img_size-90;
				document.images.image.height = img_size-90;
			}
		}
	}
	var click = 0;
	var aNodes = document.querySelectorAll("a");
	for(var i=0; i<aNodes.length; i++){
		aNodes[i].addEventListener("click",function(e){
			if (click==0) {
				location.href=this.href;
			}
			else{ 
				if (e && e.preventDefault ){
         					e.preventDefault(); 
    				}
				else {
        					window.event.returnValue = false;
				}
			}
		})
	}
	var oDiv=document.getElementById('leftmenu');
	var timer;
	oDiv.onmouseover=function(){
		startMove(0);
		}
	oDiv.onmouseout=function(){
		startMove(-100);
		}
	oDiv.onclick=function(){
		if(oDiv.offsetLeft==-100)	startMove(0);
		else if(oDiv.offsetLeft==0)	startMove(-100);
		}
	function startMove(end){
		clearInterval(timer);
		timer=setInterval(function(){
			var speed=0;
			if(oDiv.offsetLeft>end){
				speed=-20;
			}else{
				speed=20;
			}
			if(oDiv.offsetLeft==end){
				clearInterval(timer);
				click=0;
			}else{
				oDiv.style.left=oDiv.offsetLeft+speed+'px';
				click=1;
			}
		},30);
	}
	// デフォルトの画像データを配列に格納   兼容性加载问题出在这里！！！！！！！
	if(isSupportWebp){
	document.images.image.src = "Data_gi/Data_gi_Webp/data0/image023.webp";
	filename = "Data_gi/Data_gi_Webp/data";
	image_type = ".webp"
	image_load(img_op, filename);
	}
	else{
	document.images.image.src = "Data_gi/Data_gi_jpg/data0/image023.jpg";
	filename = "Data_gi/Data_gi_jpg/data";
	image_type = ".jpg"
	image_load(img_op, filename);
	}
}

//***** 拡大ボタンがクリックされた時の処理 *****//
function kakudai_Click(kakudai, ischecked){
	const range = document.getElementById("range");
	var bar = document.getElementById("range");
	
	if(range.style.visibility == "visible"){
		// スライドバー非表示
		range.style.visibility = "hidden";
		bar.value = 0;
	}
	else{
		// スライドバー表示
		range.style.visibility = "visible";
	}
	
	if(ischecked == true){
		// 拡大画像表示       (框被选中)
		if(isSupportWebp)	filename = "Data_gi/Data_gi_k-6_Webp/data";
		else	filename = "Data_gi/Data_gi_k-6_jpg/data";
		image_loadk_6(img_k_6, filename);
		
		count_y = 4;
		count_x = 23;
		image.src = img_k_6[4][23].src;
		image_ar = img_k_6;
		kakudai_Flag = 1;
	}
	else{
		// デフォルト画像表示      (框未被选中)
		image.src = img_op[0][23].src;
		image_ar = img_op;
		count_y = 0;
		count_x = 23;
		kakudai_Flag = 0;
	}
}

//***** スライドバーの処理 *****//
function kakudai_bar(value){
	if(value == 0){
		image.src = img_k_6[count_y][count_x].src;
		image_ar = img_k_6;
	}
	else if(value == 1){
		if(isSupportWebp)	filename = "Data_gi/Data_gi_k-5_Webp/data";
		else	filename = "Data_gi/Data_gi_k-5_jpg/data";
		image_loadk_5(img_k_5, filename);
		image.src = img_k_5[count_y][count_x].src;
		image_ar = img_k_5;
	}
	else if(value == 2){
		if(isSupportWebp)	filename = "Data_gi/Data_gi_k-4_Webp/data";
		else	filename = "Data_gi/Data_gi_k-4_jpg/data";
		image_loadk_4(img_k_4, filename);
		image.src = img_k_4[count_y][count_x].src;
		image_ar = img_k_4;
	}
}

// xの値をa-b の範囲から c-d の範囲へ変換する    
function map(x, a, b, c, d) {
    return (x-a) / (b-a) * (d-c) + c;
}


//******************** mouseの処理 ********************//


var dragFlag = false;//対象画像上でマウスボタンを押すと、true
var prevX,prevY;//ドラック中における前のイベントのマウス座標
var sum_xx = 0;
var sum_yy = 0;


//***** mouse move時の処理 *****// 
document.getElementById("image").addEventListener("mousemove",
function (itEvent){
   var itX = this.offsetLeft;//image要素の左からの位置を得る。
   var mx = itEvent.clientX-itX;//image内の相対座標を得る
   //（上記では、offsetXに相当する値であるがFireFoxが使えないので相当する情報を算術している）
   var itY = this.offsetTop;//ページの上からのimage要素位置を得る。
   var my = itEvent.clientY-itY;
 　my += document.documentElement.scrollTop + document.body.scrollTop;//ページがスクロールされている場合にも対応させる

 // ドラック中の処理
 if(dragFlag){
     // ドラックイベントの無効化
     image.ondrag = function (){return false;};
     image.ondragstart = function (){return false;};
     image.ondragend = function (){return false;};

     var dx = mx - prevX;//現在もマウス位置と 前の位置で、移動量を求める
     prevX =mx;//ドラックでの移動量を求めるため、現在の位置を移動前の情報として記憶
     
     var dy = my - prevY;//現在もマウス位置と 前の位置で、移動量を求める
     prevY =my;//ドラックでの移動量を求めるため、現在の位置を移動前の情報として記憶
     
     
     // 視点移動      
	 if(kakudai_Flag == 0){	 
		var px_x = 12;  // x方向で画像を切り替える際のピクセル数
		var px_y = 12;  // y方向で画像を切り替える際のピクセル数
     }else{
		var px_x = 12;
		var px_y = 20;
	 }
	 
     if(dx>0) { // xが正の方向
	 sum_xx += dx;
	 count_x += Math.floor(sum_xx/px_x);
	sum_xx %= px_x;
	 
     } else if(dx<0) { // xが負の方向
	 sum_xx -= dx;
	 count_x -= Math.floor(sum_xx/px_x);
	 sum_xx %= px_x;
     }
     
     if(dy>0) { // yが正の方向 
	 sum_yy += dy;
	 count_y += Math.floor(sum_yy/px_y);
	 sum_yy %= px_y;
	 
     } else if(dy<0) { // yが負の方向
	 sum_yy -= dy;
	 count_y -= Math.floor(sum_yy/px_y);
	 sum_yy %= px_y;
     }


//     count_x += dx%img_op.length;
//     count_y += dy%img_op.length;
			
			
	if(kakudai_Flag == 1){
		if(count_x>=24){
			count_x = 0;
		}else if(count_x<0){
			count_x = 23;
		}
				
		if(count_y>=10){
			count_y = 9;
		}else if(count_y<0){
			count_y = 0;
		}
	}	
	else{ 
     if(count_x>=img_op.length){
         count_x = 0;
     }else if(count_x<0){
         count_x = img_op.length-1;
     }

     if(count_y>=img_op.length){
         count_y = 0;
     }else if(count_y<0){
         count_y = img_op.length-1;
				}
	}

     // 画像の書き換え     
     image.src=image_ar[count_y][count_x].src;               
	 
 
 }  // end if
						  }  //end function
						  ,false);  //イベントが登録listener に発送され、その後、DOMツリーにおいてその下に位置する EventTarget に発送させる時にtrue


//***** mouse down時の処理 *****//
document.getElementById("image").addEventListener("mousedown",
function (itEvent){
  var itX = this.offsetLeft;  //image要素の左からの位置を得る。
  var mx = itEvent.clientX-itX;  //image内の相対座標を得る
  var itY = this.offsetTop;  //ページの上からのimage要素位置を得る。
  var my = itEvent.clientY-itY;

  my += document.documentElement.scrollTop + document.body.scrollTop;
  //ページがスクロールされている場合にも対応させる。
  // (Safariではscroll系が未対応で、0の加算になることを期待して作っている。)
  
  dragFlag = true;  //ドラック開始
  prevX = mx;  //ドラックでの移動量を求めるため、現在位置を移動前の情報として記憶
  prevY = my;

	   } // end function
	, false);


//***** mouse up時の処理 *****// 
document.getElementById("image").addEventListener("mouseup",
						 
 function (itEvent){
    
    dragFlag = false;// ドラックの終了
	  }
	, false);

//***** touchの処理 *****// 
// 要素ら
var el_x = document.getElementById('x');
var el_y = document.getElementById('y');
var touchmoveFlag = false;//対象画像上でマウスボタンを押すと、true
var prevX2, prevY2;//ドラック中における前のイベントのマウス座標
var sum_xx2 = 0;
var sum_yy2 = 0;
//const touch = event.changedTouched;

//***** touch start時の処理 *****//
document.getElementById("image").addEventListener("touchstart",
	function (itEvent2) {
		var itX2 = 0;  //image要素の左からの位置を得る。
		var mx2 = itEvent2.touches[0].clientX - itX2;  //image内の相対座標を得る
		var itY2 = 0;  //ページの上からのimage要素位置を得る。
		var my2 = itEvent2.touches[0].clientY - itY2;

		my2 += document.documentElement.scrollTop + document.body.scrollTop;
		//ページがスクロールされている場合にも対応させる。
		// (Safariではscroll系が未対応で、0の加算になることを期待して作っている。)

		touchmoveFlag = true;  //ドラック開始
		prevX2 = mx2;  //ドラックでの移動量を求めるため、現在位置を移動前の情報として記憶
		prevY2 = my2;
	} // end function
	, false);

document.getElementById("image").addEventListener("touchmove",
	function (itEvent2) {
	//event.preventDefault();
		
		var itX2 = 0;//image要素の左からの位置を得る。
		var mx2 = itEvent2.touches[0].clientX - itX2;//image内の相対座標を得る
		//（上記では、offsetXに相当する値であるがFireFoxが使えないので相当する情報を算術している）
		var itY2 =0;//ページの上からのimage要素位置を得る。
		var my2 = itEvent2.touches[0].clientY - itY2;
		my2 += document.documentElement.scrollTop + document.body.scrollTop;//ページがスクロールされている場合にも対応させる


		// ドラック中の処理
		if (touchmoveFlag) {
			
			// ドラックイベントの無効化
			image.ontouchmove = function () { return false; };
			image.ontouchstart = function () { return false; };
			image.ontouchend = function () { return false; };
			
			var dx2 = mx2 - prevX2;//現在の指の位置と 前の位置で、移動量を求める
			prevX2 = mx2;//ドラックでの移動量を求めるため、現在の位置を移動前の情報として記憶

			var dy2 = my2 - prevY2;//現在の指の位置と 前の位置で、移動量を求める
			prevY2 = my2;//ドラックでの移動量を求めるため、現在の位置を移動前の情報として記憶


			// 視点移動      
			if (kakudai_Flag == 0) {
				var px2_x = 12;  // x方向で画像を切り替える際のピクセル数
				var px2_y = 12;  // y方向で画像を切り替える際のピクセル数
			} else {
				var px2_x = 12;
				var px2_y = 20;
			}
			
			if (dx2 > 0) { // xが正の方向
				sum_xx2 += dx2;
				count_x += Math.floor(sum_xx2 / px2_x);
				sum_xx2 %= px2_x;

			} else if (dx2 < 0) { // xが負の方向
				sum_xx2 -= dx2;
				count_x -= Math.floor(sum_xx2 / px2_x);
				sum_xx2 %= px2_x;
			}

			if (dy2 > 0) { // yが正の方向 
				sum_yy2 += dy2;
				count_y += Math.floor(sum_yy2 / px2_y);
				sum_yy2 %= px2_y;

			} else if (dy2 < 0) { // yが負の方向
				sum_yy2 -= dy2;
				count_y -= Math.floor(sum_yy2 / px2_y);
				sum_yy2 %= px2_y;
			}


			//     count_x += dx%img_op.length;
			//     count_y += dy%img_op.length;


			if (kakudai_Flag == 1) {
				if (count_x >= 24) {
					count_x = 0;
				} else if (count_x < 0) {
					count_x = 23;
				}
				if (count_y >= 10) {
					count_y = 9;
				} else if (count_y < 0) {
					count_y = 0;
				}
			}
			else {
				if (count_x >= img_op.length) {
					count_x = 0;
				} else if (count_x < 0) {
					count_x = img_op.length - 1;
				}

				if (count_y >= img_op.length) {
					count_y = 0;
				} else if (count_y < 0) {
					count_y = img_op.length - 1;
				}
			}

			// 画像の書き換え     
			image.src = image_ar[count_y][count_x].src;


		}  // end if
	}  //end function
	, false);  //イベントが登録listener に発送され、その後、DOMツリーにおいてその下に位置する EventTarget に発送させる時にtrue

//***** touchend時の処理 *****// 
document.getElementById("image").addEventListener("touchend",

	function (itEvent) {

		touchmoveFlag = false;// ドラックの終了
	}
	, false);

//***** 上三角ボタンがクリックされた時の処理 *****//

const up = document.querySelector('.inline-block_uptriangle')
up.addEventListener("click",
	function () {
		
		var dy2 = 1;//現在もマウス位置と 前の位置で、移動量を求める


		// 視点移動      
		if (kakudai_Flag == 0) {
			var px2_y = 12;  // y方向で画像を切り替える際のピクセル数
		} else {
			var px2_y = 20;
		}


		if (dy2 > 0) { // yが正の方向 
			//sum_yy2 += dy2;
			count_y = count_y + 1;
			//sum_yy2 %= px2_y;

		}


		//     count_x += dx%img_op.length;
		//     count_y += dy%img_op.length;


		if (kakudai_Flag == 1) {
			if (count_y >= 10) {
				count_y = 9;
			} else if (count_y < 0) {
				count_y = 0;
			}
		}
		else {
			if (count_y >= img_op.length) {
				count_y = 0;
			} else if (count_y < 0) {
				count_y = img_op.length - 1;
			}
		}
		
		// 画像の書き換え     
		image.src = image_ar[count_y][count_x].src;
	} // end function
	, false);





//***** 下三角ボタンがクリックされた時の処理 *****//
const down = document.querySelector('.inline-block_dtriangle')
down.addEventListener("click",
	function () {

		//var dy2 = 1;//現在もマウス位置と 前の位置で、移動量を求める

		count_y = count_y - 1;
		

		//     count_x += dx%img_op.length;
		//     count_y += dy%img_op.length;

		if (kakudai_Flag == 1) {
			if (count_y >= 10) {
				count_y = 9;
			} else if (count_y < 0) {
				count_y = 0;
			}
		}
		else{
			if (count_y >= img_op.length) {
				count_y = 0;
			} else if (count_y < 0) {
				count_y = img_op.length - 1;
			}
		}
		
		// 画像の書き換え     
		image.src = image_ar[count_y][count_x].src;
	} // end function
	, false);

//***** 右三角ボタンがクリックされた時の処理 *****//

const right = document.querySelector('.inline-block_rtriangle')
right.addEventListener("click",
	function () {

		//var dy2 = 1;//現在もマウス位置と 前の位置で、移動量を求める

		count_x = count_x + 1;


		//     count_x += dx%img_op.length;
		//     count_y += dy%img_op.length;

		if (count_x >= img_op.length) {
			count_x = 0;
		} else if (count_x < 0) {
			count_x = img_op.length - 1;
		}


		// 画像の書き換え
		image.src = image_ar[count_y][count_x].src;
	} // end function
	, false);


//***** 左三角ボタンがクリックされた時の処理 *****//

const left = document.querySelector('.inline-block_ltriangle')
left.addEventListener("click",
	function () {

		//var dy2 = 1;//現在もマウス位置と 前の位置で、移動量を求める

		count_x = count_x - 1;


		//     count_x += dx%img_op.length;
		//     count_y += dy%img_op.length;

		if (count_x >= img_op.length) {
			count_x = 0;
		} else if (count_x < 0) {
			count_x = img_op.length - 1;
		}


		// 画像の書き換え
		image.src = image_ar[count_y][count_x].src;
	} // end function
	, false);