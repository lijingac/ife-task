var cityAndCollege=[
	["北京","北京大学","清华大学","中国科技大学","北京理工大学"],
	["上海","复旦大学","同济大学","aaa大学","bbb大学","ccc大学","ddd大学"],
	["广州","111大学","222大学","333大学"],
	["深圳","qqq大学","www大学","eee大学","rrr大学"]
];

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
function showCollege(city,school){
	school.innerHTML="";
	var option=null;
	for (var i = 1; i < cityAndCollege[city.selectedIndex].length; i++) {
		option=document.createElement("option");
		option.innerHTML=cityAndCollege[city.selectedIndex][i];
		school.appendChild(option);
	}
};
window.onload=function () {
	var oCity=document.getElementById('city');
	var oSchool=document.getElementById('school');
	var oCollege=document.getElementById('college');
	var ograduate=document.getElementById('graduate');
	var oCompany=document.getElementById('company');
	var oStudent=document.getElementById('student');
	showCollege(oCity,oSchool);
	//在校生和非在校生切换的时候改变选择内容，原理是改变display值
	addEvent(oStudent,"click",function(){
		if (ograduate.checked==true) {
			oCompany.style.display="block";
			oCollege.style.display="none";
		}
		else{
			oCompany.style.display="none";
			oCollege.style.display="block";
			oCity[0].selected=true;
		}
	});
	//切换城市的时候，显示城市对应的大学
	addEvent(city,"change",function(){
		showCollege(oCity,oSchool);
	});
	//addEvent(city,"change",showCollege(oCity,oSchool));
}

