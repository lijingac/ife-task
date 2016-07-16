
window.onload=function () {
    var oNum=document.getElementById('num-input');
    var oInput=document.getElementsByTagName('button');
    var oContainer = document.getElementById("container");
    var oArray=[];
    var oStr;
    oInput[0].onclick=function () {
        if (oNum.value=="") {
            alert("请输入数字！");
        } 
        else{
            
            oArray.unshift(oNum.value);
            var node=document.createElement("div");
            var textnode=document.createTextNode(oArray[0]);
            node.appendChild(textnode);
            oContainer.insertBefore(node,oContainer.childNodes[0]);
        };
    }
    oInput[1].onclick=function () {
        if (oNum.value=="") {
            alert("请输入数字！");
        } 
        else{
            
            oArray.push(oNum.value);
            var node=document.createElement("div");
            var textnode=document.createTextNode(oArray[oArray.length-1]);
            node.appendChild(textnode);
            oContainer.appendChild(node);
        };
    }
    oInput[2].onclick=function () {
        if (oArray.length==0) {
            alert("已经为空");
        } 
        else{
            alert(oArray[0]);
            oArray.shift();
            oContainer.removeChild(oContainer.firstElementChild);
        };
    }
    oInput[3].onclick=function () {
        if (oArray.length==0) {
            alert("已经为空");
        } 
        else{
            alert(oArray[oArray.length-1]);
            oArray.pop();
            oContainer.removeChild(oContainer.lastElementChild);
        };
    }

}