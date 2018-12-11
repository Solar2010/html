function getStyle(obj,attr){
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj)[attr];
	}
}

function startMove(obj,attr,iTarget,fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var icur = 0;
		if(attr == 'opacity') {
			icur = Math.round(parseFloat(getStyle(obj,attr))*100);
		} else {
			icur = parseInt(getStyle(obj,attr));
		}

		var speed = (iTarget - icur) / 8;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		if(icur == iTarget) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		} else {
			if(attr == 'opacity') {
				obj.style.filter = 'alpha:(opacity:' + icur + speed + ')';
				obj.style.opacity = (icur + speed)/100;
			} else {
				obj.style[attr] = parseInt(getStyle(obj,attr)) + speed + 'px';
			}
		}
	},30);
}