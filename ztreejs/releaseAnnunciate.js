
 var setting2 = {    
		   async: {
				enable: true,
				//url: getUrlByNodeId				
				url:"notice/noticeRecSubDeptQuery.action",
				autoParam: ["id=noticeRecDeptParamInfo.deptId"],
				dataFilter: filterrig
			},		
			data: {
				simpleData: {
					enable: true
				}
			},
			edit: {
                enable: true,                  
                showRenameBtn:false
	         },
			view: {					
				selectedMulti: false,
			},
			callback: {				
				//onClick: zTreeOnClick
				// onCollapse: zTreeOnCollapse,//收起事件
				 onExpand: zTreeOnExpand,//展开事件
				 onRemove:onRemove,//删除节点后触发，用户后台操作
				// onAsyncSuccess:zTreeOnAsyncSuccessRight//异步加载成功的fun
			}
      };
 var zTree;
$(function(){
	//关闭弹出框
	$(".layui-layer-close").bind('click',function(){
		$(".layui-layer-shade").hide();
		$("#layui-jsf").hide();
	});
	$(".rigtabs .icheckbox").iCheck('check');//默认勾选所有用户
	//选中事件
	$('.rigtabs .icheckbox').on('ifChecked', function(event){ //ifCreated 事件应该在插件初始化之前绑定 		  
		  jsoarr.length=0;//用来生成右侧树
		  idscf.length=0;//用来判断去重复
		  idsarr.length=0;//用来加颜色的
		  $("#TreeLists").html('');//清空右边树
		  $('#deptmenu .node_name').removeClass('disnode');//移除所有的颜色
	}); 
	$('.rigtabs .icheckbox').on('ifUnchecked', function(event){ //ifCreated 事件应该在插件初始化之前绑定 
		 // alert('没选中'); 		 
	}); 
	//$('.icheckbox').iCheck('uncheck'); //移除 checked 状态 
	//初始化树
	//var urldept = URL + "/basicData/deptedropbox.action";
	var urldept =URL + "/notice/noticeRecDeptMainQuery.action";
	var urldept= [   
	    {"id":1, "pId":0, "name":"test1"},   
	    {"id":11, "pId":1, "name":"test11"},   
	    {"id":12, "pId":1, "name":"test12"},   
	    {"id":111, "pId":11, "name":"test111"},   
	];   
	var setting = {
		view: {					
				selectedMulti: false,
			},
	    data: {
                keep:{
                    parent:true,
                    leaf:true
                },
                simpleData: {
                    enable: true
                }               
            },
            async: {
				enable: true,//getUrlByNodeId,
				url:"notice/noticeRecSubDeptQuery.action",
				autoParam: ["id=noticeRecDeptParamInfo.deptId"],
				dataFilter: filter
			},
	
		callback : {		
			//asyncError: zTreeOnAsyncError   //加载错误的fun 
			onAsyncSuccess:zTreeOnAsyncSuccess//异步加载成功的fun
		}
	};
  
	selecttree(setting, 'deptmenu', urldept);		
	
});

var nodesrig=null;
//异步加载后数据
function filter(treeId, parentNode, childNodes) {	
    if (!childNodes) return null;
    var arrsend=[];
    for (var i=0, l=childNodes.length; i<l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
        arrsend.push(childNodes[i].id);
    }
   //console.log(parentNode);
   // console.log(parentNode.children.length);      
   //判断加载后的数据在右边是否存在
   //for(var i in nodesrig){
	  // console.log(nodesrig[i].id);
   //}	
    return childNodes;
}
//收起事件
function zTreeOnCollapse(event, treeId, treeNode) {	  
	
};
//展开事件
function zTreeOnExpand(event, treeId, treeNode) {
    var treeObj1 = $.fn.zTree.getZTreeObj("TreeLists");
	var nodes1 = treeObj1.transformToArray(treeObj1.getNodes());
	jsoarr.length=0;
	for(var i in nodes1){
		var flag=false;
		if(treeNode.id==nodes1[i].id){
			jsoarr.push({"id":""+nodes1[i].id+"","pId":""+nodes1[i].pId+"","name":""+nodes1[i].name+"","isParent":""+nodes1[i].isParent+"","open":""+nodes1[i].open+"","status":"1"});
			flag=true;
		}
		if(!flag){
			jsoarr.push({"id":""+nodes1[i].id+"","pId":""+nodes1[i].pId+"","name":""+nodes1[i].name+"","isParent":""+nodes1[i].isParent+"","open":""+nodes1[i].open+"","status":""+nodes1[i].status+""});
		}
	}
	
	
		
	   zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);
	  
	
};
//右侧异步加载
function filterrig(treeId, parentNode, childNodes){
	 if (!childNodes) return null;
	    for (var i=0, l=childNodes.length; i<l; i++) {
	        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	    }
	    return childNodes;
}
function zTreeOnAsyncError(event, treeId, treeNode){    
    alert("异步加载失败!");    
}    
//异步加载成功方法  
function zTreeOnAsyncSuccess(event, treeId, treeNode, msg){

     var childrens=treeNode.children;
    // console.log(nodesrig);
     if(childrens){
    	 //判断右侧树是否有内容
    	 if($("#TreeLists").text().length==0){}else{    		 
    		 var treeObj1 = $.fn.zTree.getZTreeObj("TreeLists");
    		 var nodes1 = treeObj1.transformToArray(treeObj1.getNodes());
    		 //如果加载出的数据在右边已存在，那就变色
        	 for(var i=0;i<childrens.length;i++){ 
            	 for(var j in nodes1){        		 
            		 if(childrens[i].id==nodes1[j].id){        			 
            			 $('#'+childrens[i].tId+"_a").find('.node_name').addClass('disnode');        			
            		 }
            	 }
             }
    	 }
	
	
    
     }
    // console.log(nodes1);
}
//右边异步加载成功的方法
function zTreeOnAsyncSuccessRight(event, treeId, treeNode, msg){
	
	
}
function getUrlByNodeId(treeId, treeNode) {
	return "notice/noticeRecSubDeptQuery.action?noticeRecDeptParamInfo.deptId="+treeNode.deptId;
}

//添加
var jsoarr=[];//用来生成右侧树
var idscf=[];//用来判断去重复
var idsarr=[];//用来加颜色的
 function adddpet(){
	 $('.rigtabs .icheckbox').iCheck('uncheck');
	 var treeObj = $.fn.zTree.getZTreeObj("deptmenu");
	 var nodes = treeObj.getSelectedNodes(); //获取选中	 
	 var nodesAll = treeObj.transformToArray(treeObj.getNodes());//全部
	//如果选中的这个id在右边已存在这不选中
	 for(var o in jsoarr){		
		 if(nodes[0].id==jsoarr[o].id){
			 $('#deptmenu .curSelectedNode .node_name').addClass('disnode');
			 return;
		 }		
	 }	 
	 //判断是否勾选全部选中
	 /*if($('.icheckbox_square-green').hasClass("checked")){
		 for(var i=0;i<nodesAll.length;i++){						 
			 jsoarr.push({"id":""+nodesAll[i].id+"","pId":""+nodesAll[i].pId+"","name":""+nodesAll[i].name+"","isParent":""+nodesAll[i].isParent+"","open":""+nodesAll[i].open+"","status":"2"});
		 }			 
		 zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);
	 }else{//没有勾选全部		 
*/		 var ifys=$('.curSelectedNode span').eq(1).hasClass('disnode');
		 if(ifys){
			return;			
		 }else{			 
			 //$("#"+nodes[0].pId).find('.node_name').addClass('disnode');			 
			 $('#deptmenu .curSelectedNode .node_name').addClass('disnode');			 
			 var str={"id":""+nodes[0].id+"","pId":""+nodes[0].pId+"","name":""+nodes[0].name+"","isParent":"false","open":""+nodes[0].open+"","status":"1","zAsync":"true"};
			 jsoarr.push(str);
		 }
		 zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);
	 //}
	 var treeObjrig = $.fn.zTree.getZTreeObj("TreeLists");
	 nodesrig = treeObjrig.transformToArray(treeObjrig.getNodes());
 }
 //添加下属部门 
 function addSubordinates(){
	 $('.rigtabs .icheckbox').iCheck('uncheck');
	 var treeObj = $.fn.zTree.getZTreeObj("deptmenu");
	 var nodes = treeObj.getSelectedNodes(); //获取选中
	 var zjd=nodes[0].children;	 
	 var nodesAll = treeObj.transformToArray(treeObj.getNodes());//全部	
	 
	 /*if($("#TreeLists").text().length>0){	
		 var treeObj1 = $.fn.zTree.getZTreeObj("TreeLists");
		 var nodes1 = treeObj1.transformToArray(treeObj1.getNodes());
		 var dataZtreeList=[];
			//alert(1);			
			for(var i in nodes1){
				
			}
		}else{ */
	 	 
	//如果选中的这个id在右边已存在这不选中
	 for(var o in jsoarr){		
		 if(nodes[0].id==jsoarr[o].id){
			 $('#deptmenu .curSelectedNode .node_name').addClass('disnode');
			 return;
		 }		
	 }
	 
	 var str =""; 
	 idsarr.length=0;
     if(zjd){      	 
    	// alert('有子节点');    	     	 
    	 var ifys=$('.curSelectedNode span').eq(1).hasClass('disnode');
    	 if(ifys){return;}else{
    		 $('#deptmenu .curSelectedNode .node_name').addClass('disnode');
        	 idsarr.push(nodes[0].tId);
        	 idscf.push(nodes[0].id);//用来去重的
        	 arrpid.push(nodes[0].id);//判断重复添加
        	 jsoarr.push({"id":""+nodes[0].id+"","pId":""+nodes[0].pId+"","name":""+nodes[0].name+"","isParent":""+nodes[0].isParent+"","open":""+nodes[0].open+"","status":"2"});

             getAllChildrenNodes(nodes[0],str);
             
            
            // console.log(idscf);
    	 }
    	
     }else{   
    	// alert('无子节点');    	
    	 str=nodes[0].tId;
        // str.push(nodes[0].tId);
    	 var ifys=$('.curSelectedNode span').eq(1).hasClass('disnode');
    	 if(ifys){return;}else{
    		 idscf.push(nodes[0].id);//用来去重的颜色
    		 arrpid.push(nodes[0].id);//判断重复添加
    		 $('#deptmenu .curSelectedNode .node_name').addClass('disnode');
    		
    		 jsoarr.push({"id":""+nodes[0].id+"","pId":""+nodes[0].pId+"","name":""+nodes[0].name+"","isParent":""+nodes[0].isParent+"","open":""+nodes[0].open+"","status":"2"});
    		 zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);
    	 }
    	 
     }
    
     //获取所有的父节点让他变颜色
    /* if (nodes.length > 0) {
     	var nodepid = nodes[0].getPath();
	     for(var i in nodepid){
	    	$('#'+nodepid[i].tId+"_a").find('.node_name').addClass('disnode');
	     }
     }*/
    
	 //添加颜色
     for(var i=0;i<idsarr.length;i++){
    	$('#'+idsarr[i]+"_a").find('.node_name').addClass('disnode');
     }
   
	//}
 }
//去掉重复数据方法
 function dataqc(array){
 for(var i=0;i<array.length;i++){   
     for(var j=i+1;j<array.length;j++){   
        if(array[j]===array[i]) {   
            array.splice(j,1);   
            j--;   
          }          
     }
 }
 	return array;
 }
 //js递归
 var arrpid=[];
 function getAllChildrenNodes(treeNode,result){ 	 

	 var treeObj1 = $.fn.zTree.getZTreeObj("TreeLists");
	 var nodes1=null;
	  //jsoarr.length=0;
	 if($("#TreeLists").text().length>0){		
		  nodes1 = treeObj1.transformToArray(treeObj1.getNodes());	
	 }
	 
		 if (treeNode.children) { 			 
		      var childrenNodes = treeNode.children; 
		      if (childrenNodes) {		    	  
		          for (var i = 0; i < childrenNodes.length; i++) { 		        	
		           if(childrenNodes[i].children){			        	   
		        	idsarr.push(childrenNodes[i].tId);
		        	idscf.push(childrenNodes[i].id);//用来去重的颜色		     
		        	arrpid.push(childrenNodes.id);//用来判断右边是否已存在	
		        	//循环判断重复
		        	var flagqc=false;
		        	for(var k in nodes1){
		        		if(childrenNodes[i].id==nodes1[k].id){
		        		
		        			//jsoarr.splice(0, 1, {"id":""+childrenNodes[i].id+"","pId":""+childrenNodes[i].pId+"","name":""+childrenNodes[i].name+"","isParent":""+childrenNodes[i].isParent+"","open":""+childrenNodes[i].open+"","status":"2"});
		        			//jsoarr.length=0;
		        			//treeObj1.removeChildNodes(childrenNodes[i]);
		        			//jsoarr.splice($.inArray({"id":""+childrenNodes[i].id+"","pId":""+childrenNodes[i].pId+"","name":""+childrenNodes[i].name+"","isParent":""+childrenNodes[i].isParent+"","open":""+childrenNodes[i].open+"","status":""+childrenNodes[i].open+""},jsoarr),1);
		        			flagqc=true;		        			
		        			
		        		}
		        	}
		        	if(!flagqc){		        		
		        		jsoarr.push({"id":""+childrenNodes[i].id+"","pId":""+childrenNodes[i].pId+"","name":""+childrenNodes[i].name+"","isParent":""+childrenNodes[i].isParent+"","open":""+childrenNodes[i].open+"","status":"2"});
		        	}
		        	
		        	
		        	//jsoarr.push({"id":""+childrenNodes[i].id+"","pId":""+childrenNodes[i].pId+"","name":""+childrenNodes[i].name+"","isParent":""+childrenNodes[i].isParent+"","open":""+childrenNodes[i].open+"","status":"2"});		        	
		            //result = getAllChildrenNodes(childrenNodes[i], result);
		        	getAllChildrenNodes(childrenNodes[i], result);
		        	
		           }else{		        	   
		            //result += ',' + childrenNodes[i].id;		        	
		            idsarr.push(childrenNodes[i].tId);
		            idscf.push(childrenNodes[i].id);//用来去重的
		            arrpid.push(childrenNodes[i].id);
		           // jsoarr.push({"id":""+childrenNodes[i].id+"","pId":""+childrenNodes[i].pId+"","name":""+childrenNodes[i].name+"","isParent":""+childrenNodes[i].isParent+"","open":""+childrenNodes[i].open+"","status":"2"});
		            //循环判断重复
		            var flagqc=false;
		            	for(var k in nodes1){
		            		if(childrenNodes[i].id==nodes1[k].id){
		            			//treeObj1.removeChildNodes(childrenNodes[i]);	
		            			//jsoarr.splice(0, 1, {"id":""+childrenNodes[i].id+"","pId":""+childrenNodes[i].pId+"","name":""+childrenNodes[i].name+"","isParent":""+childrenNodes[i].isParent+"","open":""+childrenNodes[i].open+"","status":"2"});
		            			flagqc=true;		            			
		            		}
		            	}
		            	if(!flagqc){		            		
		            		jsoarr.push({"id":""+childrenNodes[i].id+"","pId":""+childrenNodes[i].pId+"","name":""+childrenNodes[i].name+"","isParent":""+childrenNodes[i].isParent+"","open":""+childrenNodes[i].open+"","status":"2"});
		            	}
		            
		           }
		          } 
		      } 
		  }
		 
		 dataqc(arrpid);
		 dataqc(idscf);//去重

	
		  zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);

	 // console.log(idscf);	  
	  return result; 
	  
	}
	
 //删除查找pid 递归
function getAllPidNodes(treeNode,result){
	 zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);
	 var treeObj1 = $.fn.zTree.getZTreeObj("TreeLists");
	 var nodes1 = treeObj1.transformToArray(treeObj1.getNodes());	 
	 
	  
	 if (treeNode.pId) {
		 jsoarr.length=0; 
		 for(var i=0;i<nodes1.length;i++){
			 if(treeNode.pId==nodes1[i].id){
				 jsoarr.push({"id":""+nodes1[i].id+"","pId":""+nodes1[i].pId+"","name":""+nodes1[i].name+"","isParent":""+nodes1[i].isParent+"","open":""+nodes1[i].open+"","status":"1"});
				 getAllPidNodes(nodes1[i], result);
			 }else{
				 jsoarr.push({"id":""+nodes1[i].id+"","pId":""+nodes1[i].pId+"","name":""+nodes1[i].name+"","isParent":""+nodes1[i].isParent+"","open":""+nodes1[i].open+"","status":""+nodes1[i].status+""});
			 }
		 }
	      
	  } 
	  // console.log(idsarr);
	  zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);
	
	  return result; 
}
 //取消
 function btnqx(){
	$(".layui-layer-shade").hide();
	$("#layui-jsf").hide();
 }

 //确认

 function btnOK(){
	 //选中了所有用户
		if($('.rigtabs .icheckbox_square-green').hasClass("checked")){
			$("#txtjsf").val('所有用户');
			$("#labdata").html('所有用户');
			/*for(var i=0;i<nodesAll.length;i++){						 
				 jsoarr.push({"id":""+nodesAll[i].id+"","pId":""+nodesAll[i].pId+"","name":""+nodesAll[i].name+"","isParent":""+nodesAll[i].isParent+"","open":""+nodesAll[i].open+"","status":"2"});
			 }			 
			 zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);*/
		}else{  
			if($("#TreeLists").html().length<1){layer.msg("未选择任何数据");return;}
			
   		 var treeObj1 = $.fn.zTree.getZTreeObj("TreeLists");
   		 var nodes1 = treeObj1.transformToArray(treeObj1.getNodes());
   		 var dataZtreeList=[];
   		 var dataZtreeListjson={};   		 
   		//dataZtreeListjson={};//传值给后台
  		 for(var i in nodes1){
   			dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].deptId"] = nodes1[i].id;
   			dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].deptName"] = nodes1[i].name;
   			 //打开
   			if(nodes1[i].open){
   				dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "1";	    				
   			}else{//关闭   				
   				if(nodes1[i].zAsync){
   					dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "1";
   				}else{	    					
   					dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "0";
   				}
   			}
   			
   			
  		 }
   		/*if(!ifdel){
   			dataZtreeListjson={};//传值给后台
	   		 for(var i in nodes1){
	    			dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].deptId"] = nodes1[i].id;
	    			dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].deptName"] = nodes1[i].name;
	    			 //打开
	    			if(nodes1[i].open){
	    				dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "1";	    				
	    			}else{//关闭
	    				
	    				if(nodes1[i].isParent){
	    					dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "0";
	    				}else{
	    					dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "1";
	    				}
	    				if(nodes1[i].zAsync){
	    					dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "1";
	    				}else{	    					
	    					dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "0";
	    				}
	    			}
	    			
	    			
	   		 }
   		}
   		else{   
   			
   			dataZtreeListjson={};//传值给后台
   		 for(var i in nodes1){
   			dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].deptId"] = nodes1[i].id;
			dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].deptName"] = nodes1[i].name;
   			if(nodes1[i].status=="1"){	   				
	   				dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "1";
	   				//dataZtreeList.push({"deptId":""+nodes1[i].id+"","deptName":""+nodes1[i].name+"","receiveState":"1"});
	   		}else if(nodes1[i].status=="2"){	   				
	   				dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "0";
	   				//dataZtreeList.push({"deptId":""+nodes1[i].id+"","deptName":""+nodes1[i].name+"","receiveState":"0"}); 
	   		}else{
	   				dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = "0";
	   				//dataZtreeListjson["noticeAddParamInfo.deptInfos["+i+"].receiveState"] = nodes1[i].status;
	   				//dataZtreeList.push({"deptId":""+nodes1[i].id+"","deptName":""+nodes1[i].name+"","receiveState":""+nodes1[i].status+""});
	   				//dataZtreeList.push({"deptId":""+nodes1[i].id+"","deptName":""+nodes1[i].name+"","receiveState":"0"});
	   		}
	
    			
    		}
   		
   		}*/
   		
   		
  
   		//console.log(nodes1);
   		//console.log(dataZtreeListjson);   		 
   		// return;   	
		 $.ajax({
			 url:"notice/noticeRecDeptNameQuery.action",			 			 		
			 type: "post",
			 data: dataZtreeListjson,
			 dataType:"json",
			 traditional: true,
			 beforeSend:function(){
				loading();
			},
			 success: function(data) {
				 var strtext="";//给文本框内容
				 $("#backjson").val(JSON.stringify(dataZtreeListjson));
				 $("#txtjsf").val('');
				 var str=[];
				
				 for(var i in data){
					 str.push(data[i].deptName);
				 }				 
				 //超过10个字段显示...
				 var flg=false;
				 for(var i=0;i<str.length;i++){
					 if(i==9){
						 strtext+=str[i]+";";
						 flg=true;
						 break;
					 }else{
						 strtext+=str[i]+";";
					 }
				 }
				 if(flg){strtext=strtext.replace(/;$/,'...');}				 
				 $("#txtjsf").val(strtext);	
				 $("#labdata").html(strtext);	 
				 closeloading();
				 
			 }
		 });
		}//else结束
		//
		$(".layui-layer-shade").hide();
		$("#layui-jsf").hide();
 }

//删除
var delarr=[];
var ifdel=false;
function onRemove(e, treeId, treeNode) {
	 ifdel=true;
	 var treeObj = $.fn.zTree.getZTreeObj("deptmenu");
	 var nodes = treeObj.transformToArray(treeObj.getNodes());
	 var treeObj1 = $.fn.zTree.getZTreeObj("TreeLists");
	 var nodes1 = treeObj1.transformToArray(treeObj1.getNodes());
	 var arr=[];
	 
	// console.log(treeNode);
	 var treeren=treeNode.children;
	 

		 //有子节点	 
		 if(treeNode.children){
			 //alert('有子节点');
			 //生成右侧ztree
			 jsoarr.length=0;
			 delarr.length=0;
			//删除时改变他所有父节点的状态
			  if (nodes1.length > 0) {
			     	var nodepid = treeNode.getPath();
			     	 
				     for(var j=0;j<nodes1.length;j++){
				    	 var flag=false;
				    	 for(var i in nodepid){
					    	 if(nodes1[j].id==nodepid[i].id){
					    		 flag=true;					    		
					    		 delarr.push(nodes1[i].id);
					    		 jsoarr.push({"id":""+nodes1[j].id+"","pId":""+nodes1[j].pId+"","name":""+nodes1[j].name+"","isParent":""+nodes1[j].isParent+"","open":""+nodes1[j].open+"","status":"1"});
					    	 }
					    	
					     }
				    	 if(!flag){
				    		 delarr.push(nodes1[j].id);
				    		 jsoarr.push({"id":""+nodes1[j].id+"","pId":""+nodes1[j].pId+"","name":""+nodes1[j].name+"","isParent":""+nodes1[j].isParent+"","open":""+nodes1[j].open+"","status":""+nodes1[j].status+""});
				    	 }
				    	 //delarr.push(nodes1[i].id);
					 }
			     }
			 			
			
			 
			//console.log(delarr);
			 
			 //循环对比左右ztree的id		 
			 for(var q=0;q<nodes.length;q++){
				 var flag=false;
				 for(var w=0;w<delarr.length;w++){
					 //判断右边的ID是否在左边存在
					 if(nodes[q].id==delarr[w]){	
						 flag=true; 
					 }				
				 }
				 //如果左侧有的右侧没有，那就变颜色
				 if(!flag){
					 $('#'+nodes[q].tId+"_a").find('.node_name').removeClass('disnode');
				 }
			 }
			
			 
			 zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);
			 
		 }else{//没有子节点	
			 //alert('无子节点');
			 //判断是否变色
			 for(var i=0;i<nodes.length;i++){			 			 				 		
					 if(nodes[i].id==treeNode.id){						
						 $('#'+nodes[i].tId+"_a").find('.node_name').removeClass('disnode');								
					 }
			 }
			 jsoarr.length=0;	
			 //删除时改变他所有父节点的状态
			  if (nodes1.length > 0) {
			     	var nodepid = treeNode.getPath();
			     	 
				     for(var j=0;j<nodes1.length;j++){
				    	 var flag=false;
				    	 for(var i in nodepid){
					    	 if(nodes1[j].id==nodepid[i].id){
					    		 flag=true;
					    		 jsoarr.push({"id":""+nodes1[j].id+"","pId":""+nodes1[j].pId+"","name":""+nodes1[j].name+"","isParent":""+nodes1[j].isParent+"","open":""+nodes1[j].open+"","status":"1"});
					    	 }					    	 
					     }
				    	 if(!flag){
				    		 jsoarr.push({"id":""+nodes1[j].id+"","pId":""+nodes1[j].pId+"","name":""+nodes1[j].name+"","isParent":""+nodes1[j].isParent+"","open":""+nodes1[j].open+"","status":""+nodes1[j].status+""});
				    	 }
						 
					 }
			     }
			 			 
			 zTree = $.fn.zTree.init($("#TreeLists"), setting2, jsoarr);
			// console.log(jsoarr);
		 }
	// }
	
	 //console.log(nodes1)
	// console.log(jsoarr);
}

