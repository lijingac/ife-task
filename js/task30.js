// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    var regex1 = /^\s*/;
    var regex2 = /\s*$/;
    return (str.replace(regex1, "")).replace(regex2, "");
}
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener, isCorrect) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, isCorrect);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

//相关的正则表达式，用来验证中文字符和字符串长度
var chineseRegex = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
var lenRegex = /^.{4,16}$/;
//密码正则
var passwordRegex = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{8,20}$/;
//邮箱正则
//第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
//第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
//而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
var emailRegex = /^([\w-*\.*]+)@([\w-]+)((\.[\w-]{2,4}){1,2})$/;
//手机号码正则
var phoneRegex = /^1[0-9]{10}$/;


//验证
var validate={
	//名称验证
	nameVali:function(target,status){
		var msg=trim(target.value);
	    var msg=msg.replace(chineseRegex,"00");
	    if (msg.length==0) {
	        this.wrongMsg(target,status,"名称不能为空");
	    }
	    else if(!lenRegex.test(msg)){
	    	this.wrongMsg(target,status,"字符数应为4~16位");
	    }
	    else{
	    	this.correctMsg(target,status,"格式正确");
	    }
	},
	//密码验证
	passwordVali:function(target,status){
		var repasswordInput=document.querySelector("input[name='repassword']");
		var repasswordStatus=repasswordInput.nextElementSibling||repasswordInput.nextSibling;
		var passwordMsg=trim(target.value);
		if (passwordRegex.test(passwordMsg)) {
			this.correctMsg(target,status,"密码可用");
		}
		else{
			this.wrongMsg(target,status,"密码不可用");
		}
	},
	//再次输入密码验证
	repasswordVali:function(target,status){
		var passwordInput=document.querySelector("input[name='password']");
		if(trim(target.value)!=trim(passwordInput.value)){
			this.wrongMsg(target,status,"两次输入密码不一致");
		}
		else if(passwordRegex.test(target.value)){
			this.correctMsg(target,status,"密码输入一致");
		}
		else{
			this.wrongMsg(target,status,"密码不可用");
		}
	},
	//邮箱地址验证
	emailVali:function(target,status){
		if (emailRegex.test(target.value)) {
			this.correctMsg(target,status,"邮箱格式正确");
		}
		else{
			this.wrongMsg(target,status,"邮箱格式错误");
		}
	},
	//手机号码验证
	phoneVali:function(target,status){
		if (phoneRegex.test(target.value)) {
			this.correctMsg(target,status,"手机格式正确");
		}
		else{
			this.wrongMsg(target,status,"手机格式错误");
		}
	},
	wrongMsg:function(target,status,msg){
		//target.style.border="2px solid red";
		target.className="wrong";
		status.innerHTML=msg;
		status.style.color="red";
	},
	correctMsg:function(target,status,msg){
		//target.style.border="2px solid lightgreen";
		target.className="correct";
		status.innerHTML=msg;
		status.style.color="lightgreen";
	}

    
}


var events={
	
	inputFocus:function (e) {
		e=e||window.event;   //获取事件
		var target=e.target||e.srcElement;  //获取事件的元素
		if(target.tagName.toLowerCase()=="input"){
			target.className="inputFocus";
			var status=target.nextElementSibling||target.nextSibling;
			status.style.display="block";
		}
	},

	inputBlur:function(e){
		e=e||window.event;
		var target=e.target||e.srcElement;
		if(target.tagName.toLowerCase()=="input"){
			var status=target.nextElementSibling||target.nextSibling;
			switch(target.name){
				case "username":
					validate.nameVali(target,status);
					break;
				case "password":
					validate.passwordVali(target,status);
					break;
				case "repassword":
					validate.repasswordVali(target,status);
					break;
				case "email":
					validate.emailVali(target,status);
					break;
				case "phone":
					validate.phoneVali(target,status);
					break;
				default:break;
			}
		}
	},

	submit:function(){
		var inputArr=document.getElementsByTagName('input');
		inputArr=[].slice.call(inputArr, 0);      //important !!将getElementsByTagName获得的Nodelist变为数组
		function isCorr(n){
			if (n.className=="correct"){
				return true;
			}
			else{
				return false;
			}
		}
		var isRight=inputArr.map(isCorr);
		var isSub=true;
		for (var i = 0; i < isRight.length; i++) {
			var isSub=isSub&&isRight[i];
		}
		if (isSub) {
			alert("提交正确");
		}
		else{
			alert("提交错误");
		}
	}
}
window.onload=function() {
	var oDiv=document.getElementById('container');
	var oBtn=document.getElementById('submit');
	addEvent(oDiv, "focus", events.inputFocus, true);
	addEvent(oDiv,"blur",events.inputBlur,true);
    addEvent(oBtn,"click",events.submit,true);
	

}