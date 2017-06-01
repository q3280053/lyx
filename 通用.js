//模拟样式 兼容IE  //返回的是数组形式
//getClass("hehe")
function getClass(key) {
    var ele = document.getElementsByTagName("*");
    var aw = [];
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].className === key) {
            aw.push(ele[i]);
        }
    }
    return aw;
}

//设置取css方法----不兼容
//俩个参数获取样式，三个参数设置样式
//alert(css(aaa,'height','400px'));
function css(obj,name,value){
	if(arguments.length==2)
	{
		return obj.style[name];
	}
	else{
		obj.style[name]=value;
	}	
}

//设置获取css的兼容方法  获取非行间样式
//getStyle(obj,"width");
function getStyle(obj,name){
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else{
		return getComputedStyle(obj,false)[name];		
	}	
}

 var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
 
//封装绑定事件兼容
function myAddEvent(obj,ev,fn){
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+ev,fn);//IE
	}else{
		obj.addEventListener(ev,fn,false);//false 是否在捕获或冒泡阶段执行。
	}
}
myAddEvent(oBtn,'click',function(){alert(1);})
var obtn=document.getElementById("btn");

//obtn.setCapture();//事件捕获				
//obtn.releaseCapture();//删除事件捕获
//数组 数字排序方法
//arr.sort(function(n1,n2){
//	return n1-n2;
//});
//children //子节点 所有兼容
//parentNode//父节点
//appendChild //类似append();
//insertBefore(节点,原有节点);//插入元素
//removeChild// 删除元素 要从父节点开始
//obtn.tBodies[0].rows[0].cells[0].innerHTML;
//otb.offsetLeft;

//拖拽
var oDiv=document.getElementById("div1");
			
			oDiv.onmousedown=function(ev){
				var e=ev||event;				
				var disX=e.clientX-oDiv.offsetLeft;
				var disY=e.clientY-oDiv.offsetTop;
				
				document.onmousemove=function(ev){
					var e=ev||event;
					oDiv.style.left=e.clientX-disX+"px";
					oDiv.style.top=e.clientY-disY+"px";					
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;					
				}
				
}
			
//随机5个数字不重复
var str="1234567890";
var arry=[];
for(i=0;i<5;i++){
        arry[i]=str.substr(Math.floor(str.length*Math.random()),1);											
		for(var j=0;j<i;j++){
             if(arry[j]==arry[i]){i--;break;};
		}
}
document.getElementById("dd").value=arry.toString().replace(/,/g,'');

//鼠标移入移出
$('.input_test').bind({ 
		focus:function(){
			if (this.value == this.defaultValue){ 
				this.value="";
				//this.style.color="#199E47";
			} 
		}, 
		blur:function(){ 
			if (this.value == ""){ 
				this.value = this.defaultValue; 
				this.style.color="#c3c9ce";
			} 
} 
//循环判断获取不同的值
Array.prototype.indexOf=function(n){
		for(var i=0;i<this.length;i++){
			if(this[i]==n){
				return i;
			}
		}
		return -1;
		
	}
			
var a1=["战三","李四","王五","赵六","孙七"];
var a2=["王五","李四","孙七"];
var a3=[];
for(var i=0;i<a1.length;i++)
{
	if(a2.indexOf(a1[i])==-1){
			a3.push(a1[i])
		}

}			
alert(a3);

//时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}


//组织默认事件
//window.event ? window.event.cancelBubble = true : e.stopPropagation();//组织冒泡
function asd(e){
			
	if(e && e.preventDefault) {
        　　//阻止默认浏览器动作(W3C)
        　　e.preventDefault();
        } else {
        　　//IE中阻止函数器默认动作的方式 
        　　window.event.returnValue = false; 
        }
        return false;
}

//插件
(function($){
	$.fn.extend({
		getTableDate:function(value){
			
		}
	});
	
})(jQuery);
(function($){
	$.fn.tab = function(options){//$.fn后面的tab是这个插件的函数名称。可以更具自己喜好进行修改
		var defaults = {
			//相关属性设置	
		}
		var options = $.extend(defaults, options);
		this.each(function(){
			//实现的功能设置		
           });
	};
})(jQuery);

//
$(function(){
	var myfunction ={
			myquery:function(){
				alert(1);
			}
	}
	myfunction.myquery();
});