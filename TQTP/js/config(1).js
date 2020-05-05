//气象数据JSON URL
var DATA_PATH = 'https://data.szmb.gov.cn/data_cache/' ;
var LOCAL_PATH = '/' ;
var LOCAL_ROOT = '/site/szmb'; 
var LOCAL_ACTION_ROOT = "/publicdatacenter/";
var CITYCLIMATE_PATH = "/publicdatacenter/";

// JavaScript Document
var VanWins_StaticObj = new function(){
	this._LocalJSPath = "/design/reception/js/";
	this._LocalImagesPath = "/design/reception/images/";
	this._CurrentYear = new Date().getFullYear();
	this._CurrentMonth = new Date().getMonth() + 1;
	this._CurrentDay = new Date().getDate();
	this._CurrentRegion = "ft";
	this._tipsTitle = "";
	this._gradeStarLevel = 0;
	this._averageNum1 = 0;
	this._averageNum2 = 0;
	this._ctgNum = 1;
	this._gradeStarDesp = ["很差","一般","还行","不错","很好"];
	this._OnlineInvestigateClient = null;
	this. _statesArr={  
			"多云转阴":" Cloudy With Overcast Intervals During The Day",
			"多云转晴":"Mainly Cloudy With Sunny Intervals",
			"阴转小雨":"Overcast, with light rain",
			"阴转多云":"Overcast With Cloudy Intervals During The Day",
			"小雨转阴":"Light rain, with Overcast",
			"小雨转多云":"Light rain, with Cloudy",
			"阵雨转多云":"Shower, with Cloudy",
			"多云转小雨":"Cloudy, with Light rain",
			"阴转雨夹雪":"Overcast, with Sleet",
			"晴转小雨":"Sunny, with Light rain",
			"多云转阵雨":"Cloudy, with Shower",
			"小雨转晴":"Light rain, with Sunny",
			"雾转多云":"Fog, with Cloudy",
			
			"晴":"Fine/Fair/ Sunny",
            "多云间晴":"Mainly Cloudy With Sunny Intervals",
			"多云间晴天":"Mainly Cloudy With Sunny Intervals",
            "晴间多云":" Mainly Sunny With Cloudy Intervals",
			"晴天间多云":" Mainly Sunny With Cloudy Intervals",
            "多云": "Cloudy",
			"晴转多云" :"Clear To Cloudy",
            "多云间阴":" Cloudy With Overcast Intervals During The Day",
	        "阴间多云":"Overcast With Cloudy Intervals During The Day",
            "阴":"Overcast",
            "有轻雾" :"With  Mist/Misty",
            "有雾的"  :"Foggy",
            "阴天有阵雨和轻雾" :"Overcast With Showers And Mist",
            "多云有轻雾":"Cloudy With Mist",	
			"零星小雨/小雨" :"Drizzle",
			"分散阵雨" :"Scattered Shower",
			"分散小雨" :"Scattered Drizzle",
			"局部阵雨" :"Isolated Shower",
			"小阵雨"   :"Light Shower",
			"阵雨"     :"Shower",
			"雷阵雨"   :"Thunder Shower",
			"小到中雨":"Light To Moderate Rain",
			"中雨"     :"Moderate Rain",
			"中到大雨": "Moderate To Heavy Rain",
			"大雨"     :"Heavy Rain",
			"大到暴雨" :"Heavy Rain To Downpour",
			"暴雨"    :"Downpour",
			"大暴雨"  :"Cloud-Burst",
			"暴风雨"  :"Rainstorm",
			"雷暴"     :"Thunderstorm",
			"晴"         :"Fine",
			"多云":"Cloudy",
			"阴":"Overcast",
			"阵雨":"Shower",
			"雷阵雨":"Thunder Shower",
		    "雷阵雨伴有冰雹":"Thunder Shower With Hail",
			"雨夹雪":"Sleet",
			"小雨":"Drizzle",
			"中雨":"Moderate Rain",
			"大雨":"Heavy Rain",
			"暴雨":"Downpour",
			"大暴雨":"Cloud-Burst",
			"特大暴雨":"Extraordinary Storm",
			"小雪":"Light Snow",
			"阵雪":"Snow Shower",
			"中雪":"Moderate Shower",
			"大雪":"Heavy Snow",
			"暴雪":"Blizzard",
			"雾":"Fog",
			"冻雨":"Ice Rain",
			"沙尘暴":"Sand Storm",
			"小雨-中雨":"Light To Moderate Rain",
			"中雨-大雨":"Moderate To Heavy Rain",
			"大雨-暴雨":"Heavy Rain To Downpour",
			"暴雨-大暴雨":"Downpour To Cloud-Burst",
			"大暴雨-特大暴雨":"Cloud-Burst To Extraordinary Storm",
			"小雪-中雪":"Light To Moderate Snow",
			"中雪-大雪":"Moderate To Heavy Snow",
			"大雪-暴雪":"Heavy Snow To Blizzard",
			"浮尘":"Floating Dust",
			"扬尘":"Blowing Dust",
			"强沙尘暴":"Heavy Sand Storm",
			"微风":"Breeze",
			"旋转风":"Rotary Wind",
			"多云有阵雨":"Cloudy，with shower"

          };
	
	 
	this.weeksArr={
		"明天":"Tomorrow",
		"周日":"Sunday",
		"星期日":"Sunday",
		"周一":"Monday",
		"星期一":"Monday",
		"周二":"Tuesday",
		"星期二":"Tuesday",
		"周三":"Wednesday",
		"星期三":"Wednesday",
		"周四":"Thursday",
		"星期四":"Thursday",
		"周五":"Friday",
		"星期五":"Friday",
		"周六":"Saturday",
		"星期六":"Saturday",
		"今天":"Today"
	},
	this.weeksArrEn={
			"明天":"Tomorrow",
			"周日":"Sun",
			"周一":"Mon",
			"星期一":"Mon",
			"周二":"Tue",
			"周三":"Wed",
			"星期三":"Wed",
			"周四":"Thu",
			"星期四":"Thu",
			"周五":"Fri",
			"星期五":"Fri",
			"周六":"Sat",
			"今天":"Today"
		},
	//月份
	this.monthsArr={
		"01":"Jan.",
		"02":"Feb.",
		"03":"Mar.",
		"04":"Apr.",
		"05":"May.",
		"06":"Jun.",
		"07":"Jul.",
		"08":"Aug.",
		"09":"Sept.",
		"1":"Jan.",
		"2":"Feb.",
		"3":"Mar.",
		"4":"Apr.",
		"5":"May.",
		"6":"Jun.",
		"7":"Jul.",
		"8":"Aug.",
		"9":"Sept.",
		"10":"Oct.",
		"11":"Nov.",
		"12":"Dec."
		
	},

	//预警信号 
	this.yjArr={
		"大风蓝色":"Blue early warning of typhoon",
		"暴雨":"Rain Storm",
		"冰雹":"Hail",
		"大风":"Gale",
		"大雾":"Heavy Fog",
		"山体滑坡":"Landslide",
		"干旱":"Drought",
		"高温":"Heat Wave",
		"寒冷":"Cold",
		"灰霾":"Haze",
		"火险":"Wild Fire",
		"雷电":"Lightning",
		"台风":"Typhoon",
		"地质灾害":"Landslide",
		
		"白色":"White",
		"黄色":"Yellow",
		"蓝色":"Blue",
		"橙色":"Orange",
		"红色":"Red",
		
		"全市陆地及海区":"The land and sea area of Shenzhen",
		"全市陆地":"the land area of Shenzhen",
		"东部海区":"Eastern Sea Area",
		"西部海区":" Western Sea Area",
		"深圳东部":"the eastern Shenzhen",
		"深圳西部":"the western Shenzhen",
		"大鹏半岛":"Dapeng peninsula",
		"龙岗北/东/西/南部":"the north/east/west/south part of Longgang district",
		"宝安北/东/西/南部":"the north/east/west/south part of Bao'an district",
		"南山区":"Nanshan District",
		"福田区":" Futian District",
		"罗湖区":"Luohu District",
		"光明新区":"Guanming District",
		"龙华新区":"Longhua District",
		"龙华区":"Longhua District",
		"盐田区":" Yantian District",
		"南澳":"Nan'ao",
		"宝安区":"Bao'an District",
		"横岗":"Henggang",
		"龙岗":"Longgang",
		"坪地":"Pingdi",
		"龙城":"Longcheng",
		"平湖":"Pinghu",
		"大鹏新区":"Dapeng New District",
		"龙岗区":"LongGang",
		"坪山区":"Pingshan District",
		"新安":"Xin'an",
		"西乡":"Xixiang",
		"福永":"Fuyong",
		"石岩":"Shiyan",
		"沙井":"Shajing",
		"松岗":"Songgang",
	    "航城":"Hangcheng",
		"福海":"Fuhai",
		"新桥":"Xinqiao",
		"燕罗":"Yanluo",
		"龙岗":"Longgang",
		"坪地":"Pingdi",
		"龙城":"Longcheng",
		"横岗":"Henggang",
		"南湾":"Nanwan",
		"平湖":"Pinghu",
		"坂田":"Bantian",
		"布吉":"Buji",
		"吉华":"Jihua",
		"园山":"Yuanshan",
		"宝龙":"Baolong",
		"公明":"Gongming",
		"光明":"Guangming",
		"玉塘":"Yutang",
		"凤凰":"Fenghuang",
		"新湖":"Xinhu",
		"马田":"Matian",
		"大浪":"Dalang",
		"观湖":"Guanhu",
		"福成":"Fucheng",
		"观澜":"Guanlan",
		"龙华":"Longhua",
		"民治":"Minzhi",
		"坪山":"Pingshan",
		"坑梓":"Kengzi",
		"马峦":"Maluan",
		"碧岭":"Biling",
		"石井":"Shijing",
		"龙田":"Longtian",
		"葵涌":"Kuichong",
		"大鹏":"Dapeng",
		"南澳":"Nan'ao"
	}
	//景点 
	this.scenicArr={
		"世界之窗":"window of the world",
		"大小梅沙":"Dameisha/Xiaomeisha",
		"莲花山":"Lotus Hill",
		"欢乐谷":"Happy Valley",
		"东西涌[大鹏湾]":"Mirs Bay",
		"红树林":"mangrove",
		"东部华侨城":"OCT East",
		"仙湖植物园":"Fair Lake Botanical Garden",
		"梧桐山":"Mountain Wutong",
		"东门老街":"East Gate"
	}
	//景点图片
		this.scenicImageArr={
		"世界之窗":"sjzc.jpg",
		"大小梅沙":"dxms.jpg",
		"莲花山":"lhs.jpg",
		"欢乐谷":"hlg.jpg",
		"东西涌[大鹏湾]":"dpw.jpg",
		"红树林":"hsl.jpg",
		"东部华侨城":"dbhqc.jpg",
		"仙湖植物园":"xhzwy.jpg",
		"梧桐山":"wts.jpg",
		"东门老街":"dmlj.jpg"
	}
	
	//风    
	this.windArr={
		
	 "东":"east",
	 "东北": "northeast", 
	 "东南": "southeast",
	 "西南": "southwest",
	 "南":"south",
	 "西" :"west",
	 "西北":"northwest",
	 "北" :"north" ,
	 "微风":"breeze",
	 "东风":"east",
	 "东北风": "northeast", 
	 "东南风": "southeast",
	 "西南风": "southwest",
	 "南风":"south",
	 "西风" :"west",
	 "西北风":"northwest",
	 "北风" :"north" ,
	 "微风":"breeze",
	 "旋转风":"rotary wind",
	 "无":""
		
	}
		//风    
	this.windArr_icon={
		
	 "东":"e.png",
	 "东北": "en.png", 
	 "西南": "ws.png",
	 "南":"s.png",
	 "西" :"w.png",
	 "西北":"wn.png",
	 "北" :"n.png" ,
	 "东南风": "se.png",
	
		
	}
	//灰霾
	this.hazeArr={
		"轻度灰霾" :"Slight haze",
		"中度灰霾" :"moderate haze",
		"重度灰霾" :"heavy haze"
		
		
	};
	//城市天气图标
	this.cityIcon={  
	  "晴":"01.png",	
	  "多云":"02.png",
	  "阴":"03.png",		
	  "阵雨":"04.png",
	  "雷阵雨":"05.png",		
	  "雷阵雨伴有冰雹":"06.png",	
	  "雨夹雪":"07.png",		
	  "小雨":"08.png",		
	  "中雨":"09.png",		
	  "大雨":"10.png",		
	  "暴雨":"11.png",		
	  "大暴雨":"12.png",		
	  "阵雪":"13.png",		
	  "小雪":"14.png",
	  "中雪":"15.png",  		
	  "大雪":"16.png",	
      "暴雪":"17.png",		
	  "雾":"18.png",		
	  "冻雨":"19.png",		
	  "沙尘暴":"20.png",		
      "小雨-中雨":"21.png",
	   "中雨-大雨":"22.png",
	  "大雨-暴雨":"23.png",	
	  "暴雨-大暴雨":"24.png",			
	  "小雪-中雪":"25.png",	
	  "中雪-大雪":"26.png",		
	  "大雪-暴雪":"27.png",		
	  "浮尘":"28.png",		
	  "扬沙":"29.png",		
	  "强沙尘暴":"30.png",		
	  "灰霾":"31.png"	
	}
	//灰霾级别英文解释
	this.haze_en={
		"0":"normal",
		"1":"moderate",  //
		"2":"heavy",
		"3":"Silght"
		
	}	 
		
	//灰霾级别英文解释
	this.haze_icon={
		"0":"0.gif",
		"1":"2.gif",
		"2":"3.gif",
		"3":"1.gif"
		
	}	  
	this.haze_cm={
		"0":">10km",
		"1":"<0.5km",
		"2":"1-0.5km",
		"3":"1-3km"
		
	}
	this.timeArr={
		"0:00":"AM",
		"1:00":"AM",
		"2:00":"AM",
		"3:00":"AM",
		"4:00":"AM",
		"5:00":"AM",
		"6:00":"AM",
		"7:00":"AM",
		"8:00":"AM",
		"9:00":"AM",
		"10:00":"AM",
		"11:00":"AM",
		"12:00":"AM",
		"13:00":"PM",
		"14:00":"PM",
		"15:00":"PM",
		"16:00":"PM",
		"17:00":"PM",
		"18:00":"PM",
		"19:00":"PM",
		"20:00":"PM",
		"21:00":"PM",
		"22:00":"PM",
		"23:00":"PM",
		"24:00":"PM"
		
		}
	this.time_frameArr={
	"中午到傍晚":"noon to  in the evening",
	"白天至傍晚":"By the evening during the day"	
	}	  
};
//有道翻译接口(字数不能超过200)
function translateContent(c){
	return "";
var m='';
$.ajax({
			url: '/html_en/language',
			type: 'POST',
			data: "c="+c,
			dataType: 'json',
			async:false, 
			//timeout: 1000,
			error: function(){
				alert('无法验证，请联系网站维护人员');
			},
			success: function(msg){
		      m= (msg.m);
			}
			});
			return m;
};