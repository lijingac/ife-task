function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}
window.onload=function () {
	var oSignIn=document.getElementById('signIn');
	var oMask=document.getElementById('mask');
	var oLoginBox=document.getElementById('loginBox');
	var oCloseBtn=document.getElementById('closeBtn');
	var loginBoxHeader=document.getElementById('loginBoxHeader');
	var disx=0;
	var disy=0;
	oMask.style.height=document.documentElement.scrollHeight;
	//显示登陆框
	addEvent(oSignIn,"click",function(){
		oMask.style.display="block";
		oLoginBox.style.display="block";
	});
	//点击关闭按钮关闭登陆框
	addEvent(closeBtn,"click",function(){
		oMask.style.display="none";
		oLoginBox.style.display="none";
	});
	//点击登陆框周边关闭登陆框
	addEvent(oMask,"click",function(){
		oMask.style.display="none";
		oLoginBox.style.display="none";
	});
	//登陆框拖曳
	addEvent(loginBoxHeader,"mousedown",function(ev){
		var oEvent=ev||event;
		disx=oEvent.clientX-oLoginBox.offsetLeft;
		disy=oEvent.clientY-oLoginBox.offsetTop;
		
		document.onmousemove=function (ev)
		{
			var oEvent=ev||event;
			var l=oEvent.clientX-disx;
			var t=oEvent.clientY-disy;
			if(l<0){
				l=0;
			}
			else if(l>document.documentElement.clientWidth-oLoginBox.offsetWidth){
				l=document.documentElement.clientWidth-oLoginBox.offsetWidth;
			}
			if(t<0)
			{
				t=0;
			}
			else if(t>document.documentElement.clientHeight-oLoginBox.offsetHeight)
			{
				t=document.documentElement.clientHeight-oLoginBox.offsetHeight;
			}
			oLoginBox.style.left=l+'px';
			oLoginBox.style.top=t+'px';
			oLoginBox.style.margin=0;
			
			
		};
		
		document.onmouseup=function ()
		{
			document.onmousemove=null;
			document.onmouseup=null;
		};
	});
}

