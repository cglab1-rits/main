///////// デバイスの判定 ////////
const isSupported = !!(
	'ontouchstart' in window || // iOS & Andoroid
	(navigator.pointerEnabled && navigator.maxTouchPoints > 0)
);//IE 11+

function firstscript() {
	var window_width = document.documentElement.clientWidth;
	var syoukai = document.getElementById('syoukai');
	var click = 0;
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

	
}



var window_width = document.body.clientWidth;
if(window_width<1100)
{
	$('.bxslider').bxSlider({
   		adaptiveHeight: true,
   		slideWidth: window_width-60,
	});
}