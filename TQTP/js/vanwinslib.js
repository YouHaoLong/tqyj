/**
 * Vanwins JavaScript Library v1.0
 * @company: Vanwins
 * @date 2013/1/25
 */

/* 扩展内置对象的方法 start */

/**
 * 日期的格式化输出
 * @param format [必需] 要输出的格式类型如 "yyyy-MM-dd hh:mm:ss"
 */
Date.prototype.format = function(format) {  
    var o = {  
        "M+" : this.getMonth() + 1, // month  
        "d+" : this.getDate(), // day  
        "h+" : this.getHours(), // hour  
        "m+" : this.getMinutes(), // minute  
        "s+" : this.getSeconds(), // second  
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S" : this.getMilliseconds()  // millisecond  
    }; 
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }
    return format;
};

/* 扩展内置对象的方法 end */

/////////////////////////////
/* vanwins Namespace start */
(function(){
if(!window.vanwins){
	window['vanwins']={};
	window['vanwins']['net']={};
	window['vanwins']['view']={};
	window['vanwins']['util']={};
} 
/* vanwins.net Namespace start */
/**
 * 查询url参数
 * @param name [必需] 要查询的参数名称
 */
vanwins.net.getQueryString = function(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var test ="helllo";
	var r = window.location.search.substr(1).match(reg);
	if (r != null){
		return unescape(r[2]); 
	}
	return null;
};

/**
 * 从服务器文件中获取字符窜或解析数据
 * @param name String [必需] 文件路径
 * @param type String [必需] 数据类型：json , text
 * @param name Function [必需] 要查询的参数名称
 * @return 获取失败将返回 null 成功怎根据参数type的值返回String或json对象
 */
vanwins.net.getDataFromServerFile = function(urlpath, type, callback){
	if(typeof callback != 'function'){
		return;
	}
	var re = new RegExp("\\?");
	if(re.test(urlpath)){
		urlpath = urlpath + "&random=" + Math.random();
	}else{
		urlpath = urlpath + "?random=" + Math.random();
	}
	$.ajax({
	    url: urlpath,
	    dataType: 'text',
	    type: 'GET',
	    timeout: 5000,
	    error: function(e)
	    {
			callback(null);
	    },
	    success: function(data)
	    {
	    	if(type == "json"){
	    		eval("tempval = " + data);
		        callback(tempval);
	    	}else if(type == "text"){
	    		callback(data);
	    	}
	        
	    }
	});
};

/**
 * 存取cookies值
 */
vanwins.net.cookies = {
	//设置cookie
	set: function (name, value, time, path, domain) {
		var expires = "";
		if (time) {
			var date = new Date();
			date.setTime(date.getTime() + time * 1000);
			expires = "; expires=" + date.toGMTString();
		}
		if (!path) path = "/";
		if (domain){
			document.cookie = name + "=" + value + expires + "; path=" + path + "; domain=" + domain + ";";
		}
		else{
			document.cookie = name + "=" + value + expires + "; path=" + path + ";";
		}
	},

	//取得cookie值
	get: function (name) {
		var name = name + "=";
		var cookies = document.cookie.split(";");
		for(var i=0; i<cookies.length; i++) {
			var c = cookies[i];
			while (c.charAt(0) == " ") c = c.substring(1, c.length);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return null;
	}
};
/* vanwins.net Namespace end */

/* vanwins.view Namespace start */
/**
 * 根据iframe的内容设置iframe的高度
 * 该函数的常规调用方式为绑定iframe元素的onload事件，
 * 当iframe页面内容包含异步加载时，该函数的常规调用方式并不能保证获取正确的高度。
 * 在iframe页面异加载操作完成的代码后面显式调用该函数能获取正确的高度。
 */
vanwins.view.setCwinHeight = function(obj) {
	var cwin = obj;
	if (document.getElementById) {
		if (cwin && !window.opera) {
			if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight)
				cwin.height = cwin.contentDocument.body.offsetHeight + 10; //FF NS
			else if (cwin.Document && cwin.Document.body.scrollHeight)
                cwin.height = cwin.Document.body.scrollHeight; //IE
            }
        else {
            if (cwin.contentWindow.document && cwin.contentWindow.document.body.scrollHeight)
                cwin.height = cwin.contentWindow.document.body.scrollHeight + 10; //Opera
            }
     }
};

/**
 * 加载一个js数据文件
 * @param src String [必需] 文件路径
 * @param callback Function [可选] 文件加载完成后的回调函数
 * @param tag String [可选] 标签的tag属性
 * @param arg Object [可选] 回调函数需要的参数
 */
vanwins.view.createScript = function(src,callback,tag,arg){
	var oScript = document.createElement('script');
	oScript.setAttribute('type','text/javascript');
	oScript.src = src;
	if(typeof tag != 'undefined' && tag!='')
		oScript.setAttribute('tag',tag);
	oScript[document.all?"onreadystatechange":"onload"]=function(){
		if(typeof arg=='undefined'){
			var arg=false;
		}
		if(typeof callback=='function'){
			callback(arg);
		}
    }
	document.getElementsByTagName('head')[0].appendChild(oScript);
};

/**
 * 不使用浏览器缓存，重新加载一个js数据文件
 * @param src String [必需] 文件路径
 * @param callback Function [可选] 文件加载完成后的回调函数
 * @param tag String [可选] 标签的tag属性
 * @param arg Object [可选] 回调函数需要的参数
 */
vanwins.view.createScriptNoCache = function(src,callback,tag,arg){
	var oScript = document.createElement('script');
	oScript.setAttribute('type','text/javascript');
	var re = new RegExp("\\?");
	if(re.test(src)){
		oScript.src = src + "&random=" + Math.random();
	}else{
		oScript.src = src + "?random=" + Math.random();
	}
	if(typeof tag != 'undefined' && tag!='')
		oScript.setAttribute('tag',tag);
	oScript[document.all?"onreadystatechange":"onload"]=function(){
		if(typeof arg=='undefined'){
			var arg=false;
		}
		if(typeof callback=='function'){
			callback(arg);
		}
    }
	document.getElementsByTagName('head')[0].appendChild(oScript);
};
/* vanwins.view Namespace end */

/* vanwins.util Namespace start */
/**
 * 将Date类型的日期格式化为指定的字符串
 * @param d Date [必需] 指定的日期 
 * @param format String [必需] 要输出的格式类型如 "yyyy-MM-dd hh:mm:ss"
 */
vanwins.util.formatDate  = function(d, format) {
	if(typeof d == 'undefined' || format == 'undefined')return;
    var o = {  
        "M+" : d.getMonth() + 1, // month  
        "d+" : d.getDate(), // day  
        "h+" : d.getHours(), // hour  
        "m+" : d.getMinutes(), // minute  
        "s+" : d.getSeconds(), // second  
        "q+" : Math.floor((d.getMonth() + 3) / 3), // quarter  
        "S" : d.getMilliseconds()  // millisecond  
    }; 
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
};

/**
 * 将String类型的日期(如："yyyy-MM-dd hh:mm:ss" )格式化为指定的中文日期字符串
 * @param d String [必需] 指定的日期 
 * @param format String [必需] 要输出的格式类型如 "ymdhiw"
 * @param addDay Number [可选] 要增加的是天数或小时
 * @param t String [可选] 决定要增加的是天还是小时
 */
vanwins.util.formatDateStr2CH  = function(d,format,addDay,t)
{
	if(typeof d == 'undefined')return;
	if(typeof t=='undefined' || t=='day')
		addDay = (typeof addDay!='undefined')?86400*addDay*1000:0;
	else if(t=='hour'){
		addDay = (typeof addDay!='undefined')?3600*addDay*1000:0;
	}else{
		return;
	}
	var arr = d.format("yyyy-MM-dd").split('-');
	if(typeof arr[3]!='undefined' && arr[3].indexOf(':')>0){
		var arrH = arr[3].split(':');
		var time = parseInt(Date.parse(arr[0]+'/'+arr[1]+'/'+arr[2]+" "+arrH[0]+':'+arrH[1])) + addDay;
	}else{
		var time = parseInt(Date.parse(arr[0]+'/'+arr[1]+'/'+arr[2])) + addDay;
	}
	var d = new Date();
	d.setTime(time);
	if(typeof format=='undefined')
		return (d.getMonth()+1)+'月'+d.getDate()+'日';
	var s = '';
	format = format.toLowerCase();
	if(format.indexOf('y')>=0) s = (d.getFullYear())+'年';
	if(format.indexOf('m')>=0) s += (d.getMonth()+1)+'月';
	if(format.indexOf('d')>=0) s += d.getDate()+'日';
	if(format.indexOf('h')>=0) s += (d.getHours())+'时';
	if(format.indexOf('i')>=0) s += (d.getMinutes())+'分';
	if(format.indexOf('w')>=0){
		var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		s += ' ' + week[d.getDay()];
	}
	return s;
}
/* vanwins.util Namespace end */
})();
/* vanwins Namespace end */
///////////////////////////


/////////////////////////////
/* szmb Namespace start */
(function(){
if(!window.szmb){
	window['szmb']={};
} 
szmb.getWindLevel = function (l , renum){
	if(typeof l=='undefined')return;
	if(l<=0.3) return renum == true ? 0 : '小于3级';
	else if(l<=1.6) return renum == true ? 1 : '小于3级';
	else if(l<=3.4) return renum == true ? 2 : '小于3级';
	else if(l<=5.4) return renum == true ? 3 : '3级';
	else if(l<=7.9) return renum == true ? 4 : '4级';
	else if(l<=10.7) return renum == true ? 5 : '5级';
	else if(l<=13.8) return renum == true ? 6 : '6级';
	else if(l<=17.1) return renum == true ? 7 : '7级';
	else if(l<=20.7) return renum == true ? 8 : '8级';
	else if(l<=24.4) return renum == true ? 9 : '9级';
	else if(l<=28.4) return renum == true ? 10 : '10级';
	else if(l<=32.6) return renum == true ? 11 : '11级';
	else if(l>32.6) return renum == true ? 12 : '12级';
}

/**
 * 判断是否使用夏季温度标准，每年11月到3月监控低温
 */
szmb.isSummer = function(){
	var month = (new Date()).getMonth();
	if(month >= 10 || month < 2){
		return false; 
	}
	
	return true;
}

/**
 * 初始化决策网顶部区域选择select
 */
szmb.initMyRegionForTop = function(){
	var userfenqu = MESIS_USER_AREA;
	if(userfenqu == null || typeof userfenqu == 'undefined'){
		userfenqu = vanwins.net.cookies.get('fenquyubaouserlikeregion');
	}else if(document.cookie != ""){
		vanwins.net.cookies.set('fenquyubaouserlikeregion', userfenqu, 3600000);
	}
	if(userfenqu == null || typeof userfenqu == 'undefined'){
		userfenqu = 'ft';
	}
	var temp = $("#MyRegionForTop option[value='"+userfenqu+"']").attr("selected");
	if(typeof temp == 'undefined' || temp == false){
		$("#MyRegionForTop option[value='"+userfenqu+"']").attr("selected", true);
	}
	
	
}

/*设置区域 ，用于网站顶部 */
szmb.SetMyRegionForTop = function(fenquPinyin,fenquZh){
	if (document.cookie == "") {
		alert("您的浏览器禁用了cookie,请启用您的cookie功能。");
		return;
	}
	if( MESIS_USER_AREA_CN == null || typeof MESIS_USER_AREA_CN == 'undefined'){
		var currentCookie = vanwins.net.cookies.get('fenquyubaouserlikeregion');
		vanwins.net.cookies.set('fenquyubaouserlikeregion', fenquPinyin, 3600000);
		alert("设置成功! \n 您的默认分区为:"+fenquZh);
	}else{
		alert("部门信息设置的区域为 "+MESIS_USER_AREA_CN+"\n\n请进入决策用户中心修改您的所在区域");
		szmb.initMyRegionForTop();
	}
};


})();
/* szmb Namespace end */
///////////////////////////


/* global function start */

/**
 * 加载一个js数据文件, 不建议直接使用该函数名称。
 * 为与老系统兼容，声明此全局函数名称,该函数的功能由 vanwins.view.createScript(src,callback,tag,arg) 实现。
 * 为避免命名冲突请使用 vanwins.view.createScript(src,callback,tag,arg) 调用
 * @param src String [必需] 文件路径
 * @param callback Function [可选] 文件加载完成后的回调函数
 * @param tag String [可选] 标签的tag属性
 * @param arg Object [可选] 回调函数需要的参数
 */
var createScript = vanwins.view.createScript;

/**
 * 不使用浏览器缓存，重新加载一个js数据文件
 * 为与老系统兼容，声明此全局函数名称,该函数的功能由 vanwins.view.createScriptNoCache(src,callback,tag,arg) 实现。
 * 为避免命名冲突请使用 vanwins.view.createScriptNoCache(src,callback,tag,arg) 调用
 * @param src String [必需] 文件路径
 * @param callback Function [可选] 文件加载完成后的回调函数
 * @param tag String [可选] 标签的tag属性
 * @param arg Object [可选] 回调函数需要的参数
 */
var createScriptNoCache = vanwins.view.createScriptNoCache;

/**
 * 根据iframe的内容设置iframe的高度
 * 为与老系统兼容，声明此全局函数名称,该函数的功能由 vanwins.view.setCwinHeight(obj) 实现。
 * 为避免命名冲突请使用 vanwins.view.setCwinHeight(obj) 调用
 * 该函数的常规调用方式为绑定iframe元素的onload事件，
 * 当iframe页面内容包含异步加载时，该函数的常规调用方式并不能保证获取正确的高度。
 * 在iframe页面异加载操作完成的代码后面显式调用该函数能获取正确的高度。
 */
var SetCwinHeight = vanwins.view.setCwinHeight;

/**
 * 将String类型的日期(如："yyyy-MM-dd hh:mm:ss" )格式化为指定的中文日期字符串
 * 为与老系统兼容，声明此全局函数名称,该函数的功能由 vanwins.util.formatDateStr2CH(d,format,addDay,t) 实现。
 * 为避免命名冲突请使用 vanwins.util.formatDateStr2CH(d,format,addDay,t) 调用
 * @param d String [必需] 指定的日期 
 * @param format String [必需] 要输出的格式类型如 "ymdhiw"
 * @param addDay Number [可选] 要增加的是天数或小时
 * @param t String [可选] 决定要增加的是天还是小时
 */
var formatDate = vanwins.util.formatDateStr2CH;

/* global function end */