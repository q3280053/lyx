	//判断浏览器高度
	
	$(function(){
		bowhei();
	});
		function bowhei(){
			
			var bh=$(window).height();
			$("body,#mask").css({"height":bh});				
	
		}
			
		 $(window).resize(function () {
		 	bowhei();
            /*var bh=$(window).height();
			$("body").css({"height":bh});*/
			//$(".headtop").css({"padding-top":"30%"})
        });
     
   //时间
        function timedCount(){
			var myDate = new Date();  
			var y = myDate.getFullYear();
			var m = myDate.getMonth()+1;
			var d = myDate.getDate();
			var t=myDate.toLocaleTimeString();     //获取当前时间  
			document.getElementById('time').innerHTML=y+"-"+m+"-"+d+" "+t;
			setTimeout("timedCount()",1000)  
		} 
	//禁止使用右键		
		/*function click() {if (event.button==2) {alert("禁止右键！");}}document.onmousedown=click*/ 
		document.oncontextmenu=function(ev){
				var e=ev||event;
				var oDiv=document.getElementById("lxzz");
				oDiv.style.display="block";			
				oDiv.style.left=e.clientX+"px";
				oDiv.style.top=e.clientY+"px";
				return false;
			}
		
