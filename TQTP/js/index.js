$(function(){
    jQuery(".mainSlide").slide({ 
        titCell:".hd ul",
        mainCell:".bd ul",
        effect:"left",
        interTime:10000,
        autoPlay:false,
        autoPage:true,
        trigger:"mouseover"
    });
	//淡隐淡现选项卡切换
	$(".early_tit").tabso({
		cntSelect:".early_text",
		tabEvent:"click",
		tabStyle:"fade"
	});
});
$(function(){
	//6分钟更新数据
	window.setInterval(reload,360000);
	//一小时刷新下界面
	window.setInterval(function(){window.location.reload();},3600000);
})
function reload(){	
	//length=0;
	//sign=0;
	//sign2=0;
	//站点实况
	createScript(DATA_PATH + "szWeather/obtMinDataAllCity.js?" + Math.random(),initshikuang);
	//取能见度
	createScript(DATA_PATH + "szWeather/szOssmo.js?random=  " + Math.random(), initCityWeather, 'initCityWeather');
	//预警
	createScript(DATA_PATH+"szWeather/alarm/szAlarm.js?" + Math.random(), initAlarm);
	//未来逐三小时预报
	createScript(DATA_PATH + "szWeather/fenquyubao/MESISarea_ps.js?random=" + Math.random(), Hourly_forecastShow);
	//预发布信息0，重点提示1 ,上下班天气2,深圳市突发事件预警3,深圳天气趋势4
	createScript(DATA_PATH + "szWeather/alarm/szAlarm.js?random" + Math.random(), alamfabuTips);
	//第二页js开始
	createScript(DATA_PATH + "szWeather/sz10day_new.js?" + Math.random(), initReport);
	
}


var obtsign=1;
//站点实况
createScript(DATA_PATH + "szWeather/szAllMonitorData.js?" + Math.random(),initshikuang);
function initshikuang() {
	if (typeof szAllMonitorData  == 'undefined') {
		return;
	}

	var dDatetime=szAllMonitorData.ddatetime;

	//G3537坑梓
	$("#kengziT").html(szAllMonitorData["t"].G3537);
	$("#kengziR").html(szAllMonitorData["rain"].G3537);
	
	$("#huizhanTtime").html("<div style='font-size:2.5rem'>坑梓 <a style='color: #f5ff5c;font-size: 4rem;margin-left:20px'>"+szAllMonitorData["t"].G3537+"℃</a><span>Updated at" +dDatetime+"</span></div>");
	$("#huizhanfeng").html(getWindDirection(szAllMonitorData["ws"].G3537).w+getWindDirection(szAllMonitorData["ws"].G3537).f);
	$("#huizhanfengsu").html(szAllMonitorData["wind"].G3537+"m/s");
	$("#huizhanshidu").html(szAllMonitorData["huminity"].G3537+"%");
	$("#huizhan24HR").html(szAllMonitorData["rain24H"].G3537+"mm");
	$("#huizhanR01H").html(szAllMonitorData["rain1H"].G3537+"mm");
	
	//G3683松子坑水库
	$("#songzikengT").html(szAllMonitorData["t"].G3683);
	$("#songzikengR").html(szAllMonitorData["rain"].G3683);
	
	//G3754竹坑
	$("#zhukengT").html(szAllMonitorData["t"].G3754);
	$("#zhukengR").html(szAllMonitorData["rain"].G3754);
	
	//G3753沙湖
	$("#shahuT").html(szAllMonitorData["t"].G3753);
	$("#shahuR").html(szAllMonitorData["rain"].G3753);
	
	//G3538坪山
	$("#pingshanT").html(szAllMonitorData["t"].G3538);
	$("#pingshanR").html(szAllMonitorData["rain1H"].G3538);
	
	//G1181马峦
	$("#maruanT").html(szAllMonitorData["t"].G1181);
	$("#maruanR").html(szAllMonitorData["rain1H"].G1181);
	
	//G3749江岭
	$("#jianglingT").html(szAllMonitorData["t"].G3749);
	$("#jianglingR").html(szAllMonitorData["rain"].G3749);
	
	//G3731田头
	$("#tiantouT").html(szAllMonitorData["t"].G3731);
	$("#tiantouR").html(szAllMonitorData["rain"].G3731);

	//10秒钟更新站点数据
	window.setInterval(reloadobtdata,5000);
};
function reloadobtdata(){
	if (typeof szAllMonitorData  == 'undefined') {
		return;
	}
	var dDatetime=szAllMonitorData.ddatetime;
	var obt;
	var  obtname;
	if(obtsign==0){//G3537坑梓
		obt="G3537";
		obtname="坑梓";
		obtsign=1;
	}else if(obtsign==1){//G3683松子坑水库
		obt="G3683";
		obtname="松子坑水库";
		obtsign=2;
	}else if(obtsign==2){//G3754竹坑
		obt="G3754";
		obtname="竹坑";
		obtsign=3;
	}else if(obtsign==3){//G3538坪山
		obt="G3538";
		obtname="坪山";
		obtsign=4;
	}else if(obtsign==4){//G3753沙湖
		obt="G3753";
		obtname="沙湖";
		obtsign=5;
	}else if(obtsign==5){//G1181马峦
		obt="G1181";
		obtname="马峦";
		obtsign=6;
	}else if(obtsign==6){//G3749江岭
		obt="G3749";
		obtname="江岭";
		obtsign=7;
	}else if(obtsign==7){//G3731田头
		obt="G3731";
		obtname="田头";
		obtsign=0;
	}
	var t= typeof szAllMonitorData["t"][obt]  == 'undefined'?"-":""+szAllMonitorData["t"][obt]+"℃";
	var wind=typeof szAllMonitorData["wind"][obt]  == 'undefined'?"-":""+szAllMonitorData["wind"][obt]+"m/s";
	var ws=typeof szAllMonitorData["ws"][obt]  == 'undefined'?"-":""+szAllMonitorData["ws"][obt]+"";
	if(ws!="-"){
		ws=getWindDirection(ws).w+getWindDirection(ws).f;
	}
	
	var huminity= typeof szAllMonitorData["huminity"][obt]  == 'undefined'?"-":""+szAllMonitorData["huminity"][obt]+"%";	
	var rain24H=typeof szAllMonitorData["rain24H"][obt]  == 'undefined'?"-":""+szAllMonitorData["rain24H"][obt]+"mm";	
	var rain1H=typeof szAllMonitorData["rain1H"][obt]  == 'undefined'?"-":""+szAllMonitorData["rain1H"][obt]+"mm";	
	$("#huizhanTtime").html("<div style='font-size:2.5rem;'>"+obtname+"<a style='color: #f5ff5c;font-size:4rem;margin-left:20px'>"+t+"</a><span style='margin-left:20px;'>Updated at" +dDatetime+"</span></div>");
	$("#huizhanfeng").html(ws);
	$("#huizhanfengsu").html(wind);
	$("#huizhanshidu").html(huminity);
	$("#huizhan24HR").html(rain24H);
	$("#huizhanR01H").html(rain1H);
	
}
//取能见度
createScript(DATA_PATH + "szWeather/szOssmo.js?random=  " + Math.random(), initCityWeather, 'initCityWeather');
//初始化天气实况
function initCityWeather() {
	if (typeof SZ121_szOssmo == 'undefined') {
		return;
	}
	$("#huizhannengjiandu").text(SZ121_szOssmo.v + 'km'); //能见度
}

var length=100;
var sign=0;
var sign2=0;
var Interval;
var Interval2;
var alarmsign=false;
//预警
createScript(DATA_PATH+"szWeather/alarm/szAlarm.js?" + Math.random(), initAlarm);
function initAlarm(){
			if (typeof SZ121_AlarmInfo == 'undefined') {
				return;
			}
			//判断是否有预警发布
			if (SZ121_AlarmInfo.ingnalNum < 1) {
				if (typeof szAlarmStat == 'undefined') {
					alarmsign=true;
					$("#shang").attr("style","height:495px;");
					$("#shang1").attr("style","margin-top:50px");
					$("#shang2").attr("style","margin-top:50px");
					// $("#alarm").attr("style","height: 150px;padding-top: 50px;");
					//预警变动过					
					if(length!=SZ121_AlarmInfo.subAlarm.length){
						window.clearInterval(Interval);
						window.clearInterval(Interval2);
						var obj_lis = document.getElementById("page").getElementsByTagName("li");
						$(obj_lis[0]).mouseover();			
						length=SZ121_AlarmInfo.subAlarm.length;
						sign=0;
						sign2=0;
						Interval2=window.setInterval(showalert12,20000);
					}
					return;
				}
			}
		    $("#noweather_alarm").attr("style","display:none");
			$("#alarm").show();
			var tit_html = '<div class="early_tit">';
			var des_box_html = "";
			for (var i = 0, l = SZ121_AlarmInfo.subAlarm.length; i < l; i++) {
				//发布时间
				var date = SZ121_AlarmInfo.subAlarm[i].date;
				//发布区域
				var alarmArea = SZ121_AlarmInfo.subAlarm[i].alarmArea;
				var alarmRegion_en='';
				for(var j=0;j<alarmArea.split('、').length;j++){
					
					alarmRegion_en=alarmRegion_en+VanWins_StaticObj.yjArr[alarmArea.split('、')[j]];
					if(j!=alarmArea.split('、').length-1){
					alarmRegion_en+="、";
					}
				}
				//发布内容
				var str = SZ121_AlarmInfo.subAlarm[i].str;
				//颜色
				var alarmColor = SZ121_AlarmInfo.subAlarm[i].alarmColor;
				//类型
				var alarmType = SZ121_AlarmInfo.subAlarm[i].alarmType;
				//预警区域图片
				var contextPicSamll = DATA_PATH + "szWeather/alarm/" + SZ121_AlarmInfo.subAlarm[i].pic;
				//预警图标
				var icon = SZ121_AlarmInfo.subAlarm[i].icon;
				var alarmIconSrc = Local_Root + "design/reception/images/alarm_icon/icon_alarm/" + icon + ".png";
				var xc_icon = Local_Root + "design/reception/images/xh_icon.png"
				$("#alarmType").val($("#alarmType").val() + alarmType)
				if (alarmType == "台风") {
					alamtypesign = 1;
				}
				var temp1 = "";
				var style = "display:none";
				if (i == 0) {
					temp1 = "current";
					style = "display:block";
				}
				var alarmColorEn='';
				if(alarmColor!=''){
					alarmColorEn=VanWins_StaticObj.yjArr[alarmColor];
				}
				var  a='<a style="font-size: 50px;" id="alarm'+i+'" href="javascript:void(0)" class="'+temp1+'">'+alarmType+alarmColor+"<br/>"+VanWins_StaticObj.yjArr[alarmType]+"  "+alarmColorEn+'</a>'
				tit_html += '<a style="font-size: 50px;" id="alarm'+i+'" href="javascript:void(0)" class="'+temp1+'"><img style="width: 200px;height: 80px" src="' + alarmIconSrc + '"></a>';
				if((alarmType+alarmColor)=="台风黄色"&&date=="2017-07-22 21:30:00"){
					des_box_html += '<div class="text" style="' + style + '">' +
					'<div class="icon"></div>' +
					' <div class="des" >' +
					'<p>预警信号：'+alarmColorEn+"  "+VanWins_StaticObj.yjArr[alarmType]+"  "+alarmType+alarmColor+'</p>' +
					'<p style="font-size:1.5rem;line-height:30px;">深圳市气象台于2017年07月22日21时30分将全市台风蓝色预警升级为黄色，预计受“洛克”影响，我市风力将增至阵风10级以上，信号可能持续至明天中午前后，全市进入台风防御状态，托儿所、幼儿园和中小学停课；停止露天集体活动和高空、水上等户外作业；用人单位根据工作地点、工作性质、防灾避灾需要等情况安排工作人员推迟上班、提前下班或者停工。</p>' +
					'<p style="font-size:1.5rem;line-height:30px;">The Observatory upgrade the Blue Typhoon Warning Signal to the Yellow at 21:30 on July 22, 2017. Influenced by tropical storm “Roke”, the wind will enhance to force 10 above. The signal probably continues until tomorrow noon around. Suspend school, nursery and kindergarten classes. Halt outdoor activities and work in the upper-air or at sea. Taking into consideration work location, work nature and preparedness needs, employers should arrange to put off working, take off early and even suspend operations for sake of employees’ safety.</p>' +
					'</div>'+
					'<div class="img"><img src="' + contextPicSamll + '"></div>' +
					'</div>';
				}else{
					des_box_html += '<div class="text" style="' + style + '">' +
						'<div class="icon"></div>' +
						' <div class="des">' +
						'<p>预警信号：'+alarmColorEn+"  "+VanWins_StaticObj.yjArr[alarmType]+"  "+alarmType+alarmColor+'</p>' +
						'<p>发布时间：'+date+'</p>' +
						'<p>发布区域：' + alarmArea + '</p>' +
						'<p>Issued time：'+date+'</p>' +
						'<p>Subarea in force：' + alarmRegion_en + '</p>' +
						'</div>' +
						'<div class="img"><img src="' + contextPicSamll + '"></div>' +
						'</div>';
				}
					
			};
			tit_html += "</div>"
			var alarm_html = tit_html + '<div class="cl"></div></div><div class="early_text">' + des_box_html+"</div>";
			$("#alarm").html(alarm_html);
			$("#alarm").attr("style","height:288px;");
			//淡隐淡现选项卡切换
			$(".early_tit").tabso({
				cntSelect:".early_text",
				tabEvent:"click",
				tabStyle:"fade"
			});
			//预警发生变化 初始到默认状态
			if(length!=SZ121_AlarmInfo.subAlarm.length)
			{
				window.clearInterval(Interval);
				window.clearInterval(Interval2);
				var obj_lis = document.getElementById("page").getElementsByTagName("li");
				$(obj_lis[0]).mouseover();
				length=SZ121_AlarmInfo.subAlarm.length;				
				if(length>1){
					sign=1;
					Interval=window.setInterval(showalert,10000); 
				}else{
					 sign=0;
					 sign2=0;
					 Interval2=window.setInterval(showalert12,30000);
				}
			}
			
}
function showalert(){
	for(var i=0;i<length;i++){
	    if(i==sign){
	    	$("#alarm"+i+"").click();
	    }
	}
	if(sign==length-1){
		 sign=0;
		 sign2=0;
		 window.clearInterval(Interval);
		 Interval2=window.setInterval(showalert12,30000);
	}else{
		sign++;
    }
}

function showalert12(){
	var obj_lis = document.getElementById("page").getElementsByTagName("li")
	if(sign2==0){
		$(obj_lis[1]).mouseover();
		sign2=1;
	}
	else{
		$(obj_lis[0]).mouseover();
		sign2=0;
		if(length>1){
			$("#alarm0").click();
			sign=1;
			window.clearInterval(Interval2);
			Interval=window.setInterval(showalert, 10000);			
		}
	}
}
//未来逐三小时预报
createScript(DATA_PATH + "szWeather/fenquyubao/MESISarea_ps.js?random=" + Math.random(), Hourly_forecastShow);
function Hourly_forecastShow() {
	if (typeof WF_ps == 'undefined') {
		return;
	}
	var dayreportList = WF_ps.dayreport;
	var hoursweatherArray = WF_ps.hoursweather;
	var html = '<dl>';
	var count = 0;
	var hourCount = 0;
	var a=0;
	var iconPath=Local_Root + "design/reception/images/weather_icon/";
	for (var x = 0; x < hoursweatherArray.length; x++) {
	
		var area = hoursweatherArray[x].area;
		var ddate = hoursweatherArray[x].ddate;
		var forecasttime = formatDateStr2CH(hoursweatherArray[x].forecasttime.split('.')[0], 'h');
		var forecastDay = formatDateStr2CH(hoursweatherArray[x].forecasttime.split('.')[0], 'd');
		var maxt = hoursweatherArray[x].maxt;
		var r = hoursweatherArray[x].r;
		var wd = hoursweatherArray[x].wd;
		var weatherpic = hoursweatherArray[x].weatherpic;
		var ws = hoursweatherArray[x].ws;
		var des = hoursweatherArray[x].state;
	    var desEn = hoursweatherArray[x].stateen;//VanWins_StaticObj._statesArr[hoursweatherArray[x].state];
		var now = new Date();
		var nowDay = now.getDate();
		var nowHour = now.getHours();
		if(alarmsign){
			width="700px"
		}else{
			width="500px"
		}
		if (nowDay == forecastDay.replace("日", "") && forecasttime.replace("时", "") > nowHour) {
			 forecasttime1=forecasttime.replace("时",":00");
			 forecasttime=forecasttime.replace("时",":00")
		     if(x!=a){
					continue;
		     }
				a=a+3;
			count++;
			hourCount++;
			var st = '';
			if (count == 6) {
				st = 'style="border-right:0px;"';
			}
			if(count==1){
				if(alarmsign){
					html += '<dd  style="height:545px" class="first"><p style="margin-top: 30px;">'+forecasttime+'</p><p>'+VanWins_StaticObj.timeArr[forecasttime1]+'</p><p class="icon"><img alt="' + des + '" title="' + des +desEn+ '" src="' + iconPath + weatherpic + '" /></p><p style="height:90px">'+des+'</p><p style="font-size:1.8rem;height:100px">'+desEn+'</p><p>' + parseInt(maxt) + '℃</p></dd>';
				}else{
					html += '<dd  style="height:620px" class="first"><p>'+forecasttime+'<span>'+VanWins_StaticObj.timeArr[forecasttime1]+'</span></p><p style="padding-top: 60px" class="icon"><img alt="' + des + '" title="' + des +desEn+ '" src="' + iconPath + weatherpic + '" /></p><p>'+des+'</p><p style="font-size: 1.8rem;height:90px">'+desEn+'</p><p style="padding-top: 0px">' + parseInt(maxt) + '℃</p></dd>';
				}
			}else{
				if(alarmsign){
					html += '<dd  style="height:545px"><p style="margin-top: 30px;">'+forecasttime+'</p><p>'+VanWins_StaticObj.timeArr[forecasttime1]+'</p><p class="icon"><img alt="' + des + '" title="' + des +desEn+ '" src="' + iconPath + weatherpic + '" /></p><p style="height:90px">'+des+'</p><p style="font-size: 1.8rem;height:100px">'+desEn+'</p><p>' + parseInt(maxt) + '℃</p></dd>';
				}else{
					html += '<dd  style="height:620px"><p>'+forecasttime+'<span>'+VanWins_StaticObj.timeArr[forecasttime1]+'</span></p><p style="padding-top: 60px" class="icon"><img alt="' + des + '" title="' + des +desEn+ '" src="' + iconPath + weatherpic + '" /></p><p>'+des+'</p><p style="font-size:1.8rem;height:90px">'+desEn+'</p><p style="padding-top: 0px">' + parseInt(maxt) + '℃</p></dd>';
				}
			}
		} else if (nowDay < forecastDay.replace("日", "")) {
			if(x!=a){
				continue;
			}
			a=a+3;
			count++;
			var st = '';
			if (count == 9) {
				st = 'style="border-right:0px;"';
			}
			forecasttime1=forecasttime.replace("时",":00");
			forecasttime=forecasttime.replace("时", ":00");
			if(count==1){
				if(alarmsign){
					html += '<dd  style="height:545px" class="first"><p style="margin-top: 30px;">'+forecasttime+'</p><p>'+VanWins_StaticObj.timeArr[forecasttime1]+'</p><p class="icon"><img alt="' + des + '" title="' + des +desEn+ '" src="' + iconPath + weatherpic + '" /></p><p style="height:90px">'+des+'</p><p style="font-size: 1.8rem;height:100px">'+desEn+'</p><p>' + parseInt(maxt) + '℃</p></dd>';
				}else{
					html += '<dd  style="height:620px" class="first"><p>'+forecasttime+'<span>'+VanWins_StaticObj.timeArr[forecasttime1]+'</span></p><p style="padding-top: 60px" class="icon"><img alt="' + des + '" title="' + des +desEn+ '" src="' + iconPath + weatherpic + '" /></p><p>'+des+'</p><p style="font-size: 1.8rem;height:90px">'+desEn+'</p><p style="padding-top: 0px">' + parseInt(maxt) + '℃</p></dd>';
				}
			}else{
				if(alarmsign){
					html += '<dd  style="height:545px"><p style="margin-top: 30px;">'+forecasttime+'</p><p>'+VanWins_StaticObj.timeArr[forecasttime1]+'</p><p class="icon"><img alt="' + des + '" title="' + des +desEn+ '" src="' + iconPath + weatherpic + '" /></p><p style="height:90px">'+des+'</p><p style="font-size: 1.8rem;height:100px">'+desEn+'</p><p>' + parseInt(maxt) + '℃</p></dd>';
				}else{
					html += '<dd  style="height:620px"><p>'+forecasttime+'<span>'+VanWins_StaticObj.timeArr[forecasttime1]+'</span></p><p style="padding-top: 60px" class="icon"><img alt="' + des + '" title="' + des +desEn+ '" src="' + iconPath + weatherpic + '" /></p><p>'+des+'</p><p style="font-size: 1.8rem;height:90px">'+desEn+'</p><p style="padding-top: 0px">' + parseInt(maxt) + '℃</p></dd>';
				}			} 
			
		}else{
			a++;
		}
		if (count == 6) {
			break;
		}
	}
	html += "</dl>";
	$("#Hourly_forecast").html(html);
};
//预发布信息0，重点提示1 ,上下班天气2,深圳市突发事件预警3,深圳天气趋势4
createScript(DATA_PATH + "szWeather/alarm/szAlarm.js?random" + Math.random(), alamfabuTips);
//预发布信息
function alamfabuTips() {
	if (typeof SZ121_AlarmInfo == 'undefined') {
		return;
	}
	if (SZ121_AlarmInfo.warnpre.flagindex != 0) {
		var title = SZ121_AlarmInfo.warnpre.title;
		var content = SZ121_AlarmInfo.warnpre.message;
		var html = "<dd><a>【"+title+"】"+content+"</a></dd>";
		$("#newslist").append(html);
	}
	//重点提示
	createScript(DATA_PATH + "szWeather/szImportantTips.js?" + Math.random(), initImportantTips);
};
//重点提示
this.initImportantTips = function() {
	if (typeof SZ121_szImportantTips == 'undefined') {
		return;
	}
	
	var importtip = '';
	for (var i = 0, l = SZ121_szImportantTips.more.length; i < l; i++) {
		var title = SZ121_szImportantTips.more[i].t;
		if (SZ121_szImportantTips.more[i].t == '深圳市天气提示') {
			continue;
		}
		if (SZ121_szImportantTips.more[i].show) {
			var content = SZ121_szImportantTips.more[i].prompt;
			$("#newslist").append("<dd><a>"+content+"</a></dd>");
		}
	}
	//上下班天气
	//createScript(DATA_PATH + "szWeather/szShangxiabanTipsNew.js?" + Math.random(), shangxiabanTipsInit);
	//深圳市突发事件预警
    createScript(DATA_PATH + "szWeather/alarm/emergencyWarning.js?" + Math.random(),tufashijianyujingshow);
};

function tufashijianyujingshow() {
	var shangxiabantip = "";
	if (typeof emergencyWarning == 'undefined') {
		return;
	}
	for (var i = 0, l = emergencyWarning.data.length; i < l; i++) {
		var warnInfo = emergencyWarning.data[i].matter;
		var title = warnInfo.substring(0, warnInfo.indexOf("】") + 1);
		var info = warnInfo.substring(warnInfo.indexOf("】") + 1);
		var div = "<a><dd>【"+title+"】"+info+"</a></dd>";
		$("#newslist").append(div);
	}
	//深圳天气趋势
	createScript(DATA_PATH + "szWeather/sz10day_new.js?" + Math.random(), weatherTipsInit);
};

//深圳天气趋势
function weatherTipsInit() {
	var tip = $("#tip_2");
	if (typeof SZ121_10dayWeather == 'undefined') return;
	var d = '';
	var title = '深圳天气趋势';
	var content = SZ121_10dayWeather.today.trend;
	//天气趋势
	if (content.length > 0) {
		if ((content.substring(content.length - 1)) == '。') {
		} else {
			if ((content.substring(content.length - 1)) == '；') {
				content = content.substring(0, content.length - 1);
			}
			content = content + "。";
		}
	}
	weatherhtml = "<a><dd>【"+title+"】"+content+"</a></dd>";
	$("#newslist").append(weatherhtml);
	//$("#s").textScroll();
};

//第二页js开始
createScript(DATA_PATH + "szWeather/sz10day_new.js?" + Math.random(), initReport);
function initReport() {
	
	if (typeof SZ121_10dayWeather == 'undefined') return;
	var day10 = SZ121_10dayWeather.day10;
	var day10new = SZ121_10dayWeather.day10new;
	var today = SZ121_10dayWeather.today;
	var weeks = {
			"周日" : "Sun.",
			"周一" : "Mon.",
			"周二" : "Tue.",
			"周三" : "Wed.",
			"周四" : "Thu.",
			"周五" : "Fri.",
			"周六" : "Sat."
		};
	//更新时间
	$("#today_updatetime").html("Updated at "+new Date(today.ctime.replace(/-/g, "/")).format("MM-dd  hh:mm"));
	var time=new Date(today.ctime.replace(/-/g, "/")).format("hh")
	
	var today_live = '<p>'+today.report.substring(0,today.report.indexOf('；'))+'</p>'
		+'<p>'+today.weatheren+'</p>'
		+'<p><span>风向 Wind Direction</span><em>'+today.wd+getWindDirectionEnName(today.wd).f+'</em></p>'
		+'<p><span>风速 Wind Speed</span><em style="width: 250px;">force '+today.ws+'(级)</em></p>'
		+'<p><span>湿度 Humidity</span><em>'+today.humidity+'-'+today.maxhumidity+'%</em></p>';
	$("#today_live").html(today_live);
	$("#today_icon").attr('src',Local_Root+'design/reception/images/weather_icon/' + today.icon + '.png'); 
	$("#today_mint").html(today.minT+"℃");
	$("#today_maxt").html(today.maxT+"℃");
	
	//console.log(SZ121_10dayWeather);
	var html = "";
	for (var i = 0; i < day10.length; i++) {
			var maxt = 0;
			var mint = 100;
			maxt = day10[i][2] > maxt ? day10[i][2] : maxt;
			mint = day10[i][3] < mint ? day10[i][3] : mint;
		
			html += '<dd' + (i == 0 ? ' class="first"' : '') + '>'
			+ '<p style="height:30px;">' + (day10[i][5].substring(5, 10)) + '</p>'
			+ '<p style="height:30px;" ' + (day10[i][10] == '周六' || day10[i][10] == '周日' ? ' class="wee"' : '') + '>' + day10[i][10] + '</p>'
			+ '<p style="height:40px;" ' + (day10[i][10] == '周六' || day10[i][10] == '周日' ? ' class="wee"' : '') + '>' + weeks[day10[i][10]] + '</p>'
			+ '<p style="height:116px" class="icon"><img src="' + Local_Root + 'design/reception/images/weather_icon/' + day10[i][4] + '.png" /></p>'
			+ '<p style="height:120px" class="weather">' + day10[i][1] + '</p>'
			+ '<p style="height:110px">' + (typeof(day10new[i]["weatheren"])!='undefined'?day10new[i]["weatheren"]:'') + '</p>'
			+ '<p><span style="color:#5bc8f5;margin-right:10px">' + mint+"℃</span>/<span style='color: #f5ff5c'>"+maxt+ '℃</span></p>'
			+ '</dd>';
        var a;
        if(day10.length==9){//如果有问题就将这段删掉
            a= '<dd>'
                + '<p style="height:30px">04-22</p>'
                + '<p style="height:30px">周一</p>'
                + '<p style="height:40px">Mon.</p>'
                + '<p style="height:116px" class="icon"><img src="' + Local_Root + 'design/reception/images/weather_icon/' + day10[i][4] + '.png" /></p>'
                + '<p style="height:120px" class="weather">多云间晴天</p>'
                + '<p style="height:110px">Cloudy, mostly sunny</p>'
                + '<p><span style="color:#5bc8f5;margin-right:10px">21℃</span>/<span style="color: #f5ff5c">28℃</span></p>'
                + '</dd>';
        }else{
            a="";
        }
	}
    // var a;//如果上面有问题就将这段解释
    // if(day10.length==9){
    // 	 a= '<dd>'
    // 		+ '<p style="height:30px">04-22</p>'
    // 		+ '<p style="height:30px">周一</p>'
    // 		+ '<p style="height:40px">Mon.</p>'
    // 		+ '<p style="height:116px" class="icon"><img src=""></p>'
    // 		+ '<p style="height:120px" class="weather">多云间晴天</p>'
    // 		+ '<p style="height:110px">Cloudy, mostly sunny</p>'
    // 		+ '<p><span style="color:#5bc8f5;margin-right:10px">21℃</span>/<span style="color: #f5ff5c">28℃</span></p>'
    // 		+ '</dd>';
    // }else{
    // 	a="";
    // }
	$("#yb_10day").html(html+a);
}



function startTime()   
{   
    var today=new Date();//定义日期对象   
    var yyyy = today.getFullYear();//通过日期对象的getFullYear()方法返回年    
    var MM = today.getMonth()+1;//通过日期对象的getMonth()方法返回年    
    var dd = today.getDate();//通过日期对象的getDate()方法返回年     
    var hh=today.getHours();//通过日期对象的getHours方法返回小时   
    var mm=today.getMinutes();//通过日期对象的getMinutes方法返回分钟   
    var ss=today.getSeconds();//通过日期对象的getSeconds方法返回秒   
    // 如果分钟或小时的值小于10，则在其值前加0，比如如果时间是下午3点20分9秒的话，则显示15：20：09   
    MM=checkTime(MM);
    dd=checkTime(dd);
    mm=checkTime(mm);   
    ss=checkTime(ss);    
    var day; //用于保存星期（getDay()方法得到星期编号）
    if(today.getDay()==0)   day   =   "星期日 " 
    if(today.getDay()==1)   day   =   "星期一 " 
    if(today.getDay()==2)   day   =   "星期二 " 
    if(today.getDay()==3)   day   =   "星期三 " 
    if(today.getDay()==4)   day   =   "星期四 " 
    if(today.getDay()==5)   day   =   "星期五 " 
    if(today.getDay()==6)   day   =   "星期六 " 
	var months = {
		"01":"Jan",
		"02": "Feb",
		"03": "Mar",
		"04": "Apr",
		"05": "May",
		"06": "June",
		"07": "July",
		"08": "Aug",
		"09": "Sept",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	};
	var xingqi = {
		"周日" : "Sun.",
		"周一" : "Mon.",
		"周二" : "Tue.",
		"周三" : "Wed.",
		"周四" : "Thu.",
		"周五" : "Fri.",
		"周六" : "Sat."
	};
	var weekss = new Array("日", "一", "二", "三", "四", "五", "六");  
	var todayDate = '<a class="l">'
    	+'<p>'+yyyy+'年</p>'
    	+'<p><span>'+MM +"月"+ dd +"日 " +'</span></p>'
    	+'<p>'+day+'</p>'
    	+'<p><span>'+xingqi['周'+weekss[today.getDay()]]+months[MM]+'.'+(dd)+'th</span></p>'
    	+'</a>'
    	+'<a class="r">'+hh+'</a>'
    	+'<a class="r" style="width: 20px;background: none;">:</a>'
    	+'<a class="r">'+mm+'</a>';
	//头部今日时间
	$(".date").html(todayDate);
    setTimeout('startTime()',10000);//每一秒中重新加载startTime()方法 
}   
 
function checkTime(i)   
{   
    if (i<10){
        i="0" + i;
    }   
      return i;
}  
$(function(){
	startTime();
})
function draw(ret) {
	var width = 2064;
	var height = 431;
	var i = 0,
		maxt = 0,
		mint = 100;
	while (i < ret.day10.length) {
		maxt = ret.day10[i][2] > maxt ? ret.day10[i][2] : maxt;
		mint = ret.day10[i][3] < mint ? ret.day10[i][3] : mint;
		i = i + 1;
	}
	try {
		$("#yb_10day_map").empty();
		var paper = Raphael("yb_10day_map", width, height);
	} catch (e) {}
	var everyT = height / ((maxt - mint) + 2);
	i = 0;
	while (i < ret.day10.length) {
		var x = (width / (ret.day10.length)) * (i + 1)
			- (width / (ret.day10.length) / 2);
		var preX = (width / (ret.day10.length)) * (i)
			- (width / (ret.day10.length) / 2);

		paper.text(x, (maxt - ret.day10[i][2]) * everyT + 15,
			ret.day10[i][2] + "℃").attr({
			fill : '#f5ff5c',
			"font-size" : "2.2rem"
		});
		paper.circle(x, (maxt - ret.day10[i][2]) * everyT + 50, 10).attr({
			fill : '#f5ff5c',
			stroke : "#f5ff5c",
			title : ret.day10[i][2]
		});
		paper.text(x, (maxt - ret.day10[i][3]) * everyT + 30,
			ret.day10[i][3] + "℃").attr({
			fill : '#5bc8f5',
			"font-size" : "2.2rem"
		});
		paper.circle(x, (maxt - ret.day10[i][3]) * everyT + 60, 10).attr({
			fill : '#5bc8f5',
			stroke : "#5bc8f5",
			title : ret.day10[i][3]
		});
		if (i > 0) { // 改回1
			paper.path(
				"M" + preX + " "
				+ ((maxt - ret.day10[i - 1][2]) * everyT + 50)
				+ "L" + x + " "
				+ ((maxt - ret.day10[i][2]) * everyT + 50) + "")
				.attr({
					fill : "none",
					stroke : "#f5ff5c",
					"stroke-width" : 5.5
				});
			paper.path(
				"M" + preX + " "
				+ ((maxt - ret.day10[i - 1][3]) * everyT + 60)
				+ "L" + x + " "
				+ ((maxt - ret.day10[i][3]) * everyT + 60) + "")
				.attr({
					fill : "none",
					stroke : "#5bc8f5",
					"stroke-width" : 5.5
				});
		}
		i = i + 1;
	}
}


/*文字滚动*/
$.fn.textScroll=function(){ 
	var speed=100,flag=null,tt,that=$(this),child=that.children(); 
	var p_w=that.width(), w=child.width(); 
	child.css({left:p_w}); 
	var t=(w+p_w)/speed * 1000; 
	function play(m){ 
		var tm= m==undefined ? t : m; 
		child.animate({left:-w},tm,"linear",function(){ 
			$(this).css("left",p_w); 
			play(); 
		}); 
	} 
	child.on({ 
		mouseenter:function(){ 
			var l=$(this).position().left; 
			$(this).stop(); 
			tt=(-(-w-l)/speed)*1000; 
		}, 
		mouseleave:function(){ 
			play(tt); 
			tt=undefined; 
		} 
	}); 
	play(); 
}
