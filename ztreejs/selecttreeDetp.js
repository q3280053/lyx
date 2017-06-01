var strdept=null;
function selecttree(setting, objid, url, datas) { //下拉树公用方法
	var oldSrc = { //	
		async: {
			enable: true,
			type: 'post',
			autoParam: ["id"]
		},
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: onClick,
		}
	};
	var newSrc = $.extend({}, oldSrc, setting);
	if(url != '') {
		$.ajax({
			url: url,
			type: "post",
			dataType: 'json',
			success: function(data) {
				strdept=data;
				
				$.fn.zTree.init($("#" + objid), newSrc, data);
			}
		});
	} else {

		$.fn.zTree.init($("#" + objid), newSrc, datas);
	}

}

function showMenu(obj) { //显示下拉菜单
	var parent = $(obj).parent();
	var cityObj = $(obj).parent().find(".citySel");
	var menuContent = $(obj).parent().find(".menuContent");
	var treeDemo = $(obj).parent().find("ul");
	var treeDemoid = $(treeDemo).attr('id');
	if($(menuContent).css('display') == 'none') {
		$(menuContent).css({
			'z-index': '5000'
		}).slideDown("fast");
	}
	$(treeDemo).css({
		width: $(parent).width() + 'px'
	});
	$("body").bind("mousedown", onBodyDown);

}

function hideMenu() { //隐藏下拉菜单
	$(".menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {

	if(!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents(".menuContent").length > 0)) {
		hideMenu();
	}
}

function beforeClick(treeId, treeNode) { //click事件前的回调
	var check = (treeNode && !treeNode.isParent);
	if(!check) layer.msg("只能选择子节点!!!");
	return check;
}

function onClick(e, treeId, treeNode) { //onclick事件
	var zTree = $.fn.zTree.getZTreeObj(treeId),
		nodes = zTree.getSelectedNodes(),
		v = "",
		name = "";
	nodes.sort(function compare(a, b) {
		return a.id - b.id;
	});
	for(var i = 0, l = nodes.length; i < l; i++) {
		var dou;
		if(nodes.length == 1 || i == l - 1) {
			dou = "";
		} else {
			dou = ","
		}
		v += nodes[i].id + dou;
		name += nodes[i].name + dou;
	}
	//	if(v.length > 0) v = v.substring(0, v.length - 1);
	var cityname = $("#" + treeId).parent().parent().find('.citySel');
	cityname.attr("value", name);
	var cityvalue = $("#" + treeId).parent().parent().find('input[type=hidden]');
	cityvalue.attr("value", v);
	hideMenu();

}