//设置cookie
function setCooike(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}
//setCooike("name","zhangsan",7);
//alert(document.cookie);
//获取cookie
function getCooike(name) {
	var arr = document.cookie.split("; ");
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split("=");
		if (arr2[0] == name) {
			return arr2[1];
		}
	}
	return '';
}
//alert(getCooike("12222"));
//删除cookie
function removeCooike(name) {
	setCooike(name, '1', -1);
}