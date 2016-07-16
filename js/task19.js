
window.onload=function () {
    var oNum=document.getElementById('num-input');
    var oInput=document.getElementsByTagName('button');
    var oContainer = document.getElementById("container");
    var oArray=[];
    var oStr;
    oInput[0].onclick=function () {
        if (parseInt(oNum.value)<10 || parseInt(oNum.value)>100||oNum.value=="") {
            alert("请输入10-100之间的数字！");
        } 
        else{
            oArray.unshift(parseInt(oNum.value));
            var node=document.createElement("div");
            node.style.height=parseInt(oNum.value)+"px";
            var textnode=document.createTextNode(oArray[0]);
            node.appendChild(textnode);
            oContainer.insertBefore(node,oContainer.childNodes[0]);
        };
    }
    oInput[1].onclick=function () {
        if (parseInt(oNum.value)<10 || parseInt(oNum.value)>100||oNum.value=="") {
            alert("请输入10-100之间的数字！");
        } 
        else{
            
            oArray.push(parseInt(oNum.value));
            var node=document.createElement("div");
            node.style.height=parseInt(oNum.value)+"px";
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
    oInput[4].onclick=function () {
       var oDiv=oContainer.getElementsByTagName('div');
       var arrDiv=[];
       for (var i = 0; i < oDiv.length; i++) {
           arrDiv[i]=oDiv[i];
       };
       arrDiv.sort(function (a,b) {
           var n1=a.innerHTML;
           var n2=b.innerHTML;
           return n1-n2;
       });
       for (var j = 0; j < arrDiv.length; j++) {
           oContainer.appendChild(arrDiv[j]);
       };
       
    }
    
}