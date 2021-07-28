///////// デバイスの判定 ////////
const isSupported = !!(
	'ontouchstart' in window || // iOS & Andoroid
	(navigator.pointerEnabled && navigator.maxTouchPoints > 0)
);//IE 11+

function firstscript() {
	var window_width = document.documentElement.clientWidth;
	var syoukai=document.getElementById('syoukai');
	if(window_width<600){
		syoukai.style.width=window_width-80;
	}
	else{	
		if(window_width<1024){
			syoukai.style.width=window_width*0.7;
		}
		else{
			syoukai.style.width=800;
		}
	}
	var oDiv=document.getElementById('leftmenu');
	var timer;
	oDiv.onmouseover=function(){
		startMove(0);
		}
	oDiv.onmouseout=function(){
		startMove(-100);
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
			}else{
				oDiv.style.left=oDiv.offsetLeft+speed+'px';
			}
		},30);
	}
	
}

var window_width = document.body.clientWidth;
if(window_width<1100)
{
	$('.bxslider').bxSlider({
   		adaptiveHeight: true,
   		slideWidth: window_width-60,
	});
}