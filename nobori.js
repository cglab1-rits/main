///////// デバイスの判定 ////////
const isSupported = !!(
	'ontouchstart' in window || // iOS & Andoroid
	(navigator.pointerEnabled && navigator.maxTouchPoints > 0)
);//IE 11+

////////WebPの判定 ////////
const isSupportWebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

///////// 画像の処理 ////////
var img_width;
var img_height;
var img_size;
var device_direction;

var img_op = new Array(24); // デフォルト

var image = document.getElementById("image");
var kakudai = document.getElementById("range");
var count_x=2;  // 画像配列の添え字 x
var count_y = 5;  // 画像配列の添え字 y
//var count_x2 = 2;   // 画像配列の添え字 x
//var count_y2 = 5;  // 画像配列の添え字 y
var file_name;  // 画像読み込み用
var image_ar = img_op;  // 表示画像変更用
var image_type = ""

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

function firstscript() {
	supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	if(supportsTouch) {
		document.getElementById('btn1').style.display = "none";
		document.getElementById('btn2').style.display = "none";
		document.getElementById('btn3').style.display = "none";
		document.getElementById('btn4').style.display = "none";
	}
	img_width = document.documentElement.clientWidth;
	img_height = document.documentElement.clientHeight;
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
				document.images.image.width = img_size-65;
				document.images.image.height = img_size-65;
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
	// デフォルトの画像データを配列に格納  
	if(isSupportWebp){
	document.images.image.src = "Data_nobori/Data_nobori_Webp/data5/image002.webp";
	filename = "Data_nobori/Data_nobori_Webp/data";
	image_type = ".webp"
	image_load(img_op, filename);
	}
	else{
	document.images.image.src = "Data_nobori/Data_nobori_jpg/data5/image002.jpg";
	filename = "Data_nobori/Data_nobori_jpg/data";
	image_type = ".jpg"
	image_load(img_op, filename);
	}
}

// xの値をa-b の範囲から c-d の範囲へ変換する    
function map(x, a, b, c, d) {
    return (x-a) / (b-a) * (d-c) + c;
}


//******************** mouseの処理 ********************//


var dragFlag = false;//対象画像上でマウスボタンを押すと、true
var prevX,prevY;//ドラック中における前のイベントの指・マウス座標
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
		var px_x = 12;  // x方向で画像を切り替える際のピクセル数
		var px_y = 12;  // y方向で画像を切り替える際のピクセル数
	 
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


     // 画像の書き換え     
     image.src=image_ar[count_y][count_x].src;               
	 
 
 }  // end if
						  }  //end function
						  ,false);  //イベントが登録listener に発送され、その後、DOMツリーにおいてその下に位置する EventTarget に発送させる時にtrue

//***** mouse down時の処理 *****//
document.getElementById("image").addEventListener("mousedown",
	function (itEvent) {
		var itX = this.offsetLeft;  //image要素の左からの位置を得る。
		var mx = itEvent.clientX - itX;  //image内の相対座標を得る
		var itY = this.offsetTop;  //ページの上からのimage要素位置を得る。
		var my = itEvent.clientY - itY;

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

	function (itEvent) {

		dragFlag = false;// ドラックの終了
	}
	, false);


//***** touchの処理 *****// 
// 要素ら
var el_x = document.getElementById('x');
var el_y = document.getElementById('y');
var touchmoveFlag = false;//対象画像上でをタッチすると、true
var prevX2, prevY2;//ドラック中における前のイベントのマウス座標
var sum_xx2 = 0;
var sum_yy2 = 0;
var kakudai_Flag=0;

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

		//var dy2 = 1;//現在もマウス位置と 前の位置で、移動量を求める

		// yが正の方向 
			//sum_yy2 += dy2;
			count_y = count_y + 1;//Math.floor(sum_yy2 / px2_y);
			//sum_yy2 %= px2_y;

		//     count_x += dx%img_op.length;
		//     count_y += dy%img_op.length;

		if (count_y >= img_op.length) {
				count_y = 0;
			} else if (count_y < 0) {
				count_y = img_op.length - 1;
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

		if (count_y >= img_op.length) {
			count_y = 0;
		} else if (count_y < 0) {
			count_y = img_op.length - 1;
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

		count_x = count_x- 1;


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


