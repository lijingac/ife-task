var btn = document.getElementsByTagName('button'),
	inputText=document.getElementsByTagName('input'),
	traverBtn = btn[0],
	deleteBtn = btn[1],
	addBtn = btn[2],
	searchBtn = btn[3],
	addText = inputText[0],
	searchText = inputText[1],
	treeRoot = document.getElementsByClassName('root')[0],
	divList = [],  //存放遍历结果
	search = [], //存放搜索结果
	timer = null;

window.onload = function (){
	//点击遍历按钮
	traverBtn.onclick = function () {
		reset();
		preOrder(treeRoot,divList);
		changeColor(1);
	}
	
	//点击相应的DIV背景变色
	var selectDiv;  //记录选中的div
	var oDiv=document.getElementsByTagName('div');
	for(i=0;i<oDiv.length;i++){
		oDiv[i].onclick=function(e){
			reset();
			this.style.backgroundColor='#ccc';
			e.stopPropagation();//阻止事件冒泡
			selectDiv=this;
		};
	}
	//删除选中的div
	deleteBtn.onclick=function(){
		if(selectDiv===undefined){
			alert("请先选中要删除的节点");
		}
		else{
			selectDiv.parentNode.removeChild(selectDiv);
		}
	}
	//在选中的节点增加子节点
	addBtn.onclick=function(){
		if(addText.value==""){
			alert("请输入文字");
		}
		else if(selectDiv===undefined){
			alert("请先选中一个节点");
		}
		else{
			var newDiv=document.createElement("div");
			newDiv.innerHTML=addText.value;
			selectDiv.appendChild(newDiv);
			reset();
		}
	}
	//查询按钮
    //有问题？？
	searchBtn.onclick=function(){
		if(searchText.value==""){
			alert("请输入文字");
		}
		else{
			
			reset();
			preOrder(treeRoot,divList);
			for(k in divList){
			search[k]=divList[k].innerText;
			}
			alert(searchText.value);
			console.log(search);
			alert(isInArray(searchText.value,search.split("")));
			if(isInArray(searchText.value,search)){
				changeColor(2);
			}
			else{
				changeColor(3);
			}
		}
	}

	


}

//遍历树
function preOrder(node,divList) {
	if (node) {
		divList.push(node);
		for (var i = 0; i < node.children.length; i++) {
			preOrder(node.children[i],divList);
		}
	}
}



//颜色变化函数
function changeColor(n) {
	var i = 0;
	divList[i].style.backgroundColor = '#ccc';
	timer = setInterval(function (argument) {
		i++;
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = '#ccc';
			
		} else if(n==1){
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
		}
		else if(n==3){
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
			alert('没查询到该搜索内容');
		}
		
		if(n==2){
			if (i < divList.length) {
				if(searchText.value==divList[i-1].innerText){
					divList[i-1].style.backgroundColor = 'red';
				}
				else{
				divList[i-1].style.backgroundColor = '#fff';
				divList[i].style.backgroundColor = '#ccc';
				}
				
			} else{
				clearInterval(timer);
				divList[divList.length-1].style.backgroundColor = '#fff';
			}
		}
	},500)
}




//初始化样式
function reset() {
	divList = [];
	search =[];
	clearInterval(timer);
	//deepTvs(treeRoot,divList);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}

//判断一个字符串是否在数组中
function isInArray(str,arr){
	for(var i in arr){
		if(arr[i]==str){
			return true;
		}
	}
	return false;
}


