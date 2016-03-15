/*
 *	数据校验 JS库
 **/

//验证自然数
function isNumber(str)  
{
     //var regs = /^-?\d+$/; // 正负数
	 var regs = /^\d+$/;   //正整数 （包括0）
	 if(regs.test(str))
	 { 
		return true;
	 }else 
	 { 
		return false;
	 } 
} 

//验证日期 yyyy-MM-dd
function isDate(str)  
{
	var regs = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/;
	if(regs.test(str))
	{ 
		return true;
	}else 
	{ 
		return false;
	} 
}

//如果date2晚于或等于date1返回真，否则返回假
function equalOrMoreThan(date1,date2){
	if(date1 == '' && date2 == '') return true;
	if(date1 == '' && date2 != '') return false;
	if(date1 != '' && date2 == '') return true;    		
	var year1 = parseInt(date1.split("-")[0]);
	var year2 = parseInt(date2.split("-")[0]);
	if(year1 < year2) return true;
	if(year1 > year2) return false;
	if(year1 == year2){
		var month1 = parseInt(date1.split("-")[1],10);
		var month2 = parseInt(date2.split("-")[1],10);
		if(month1 < month2) return true;
		if(month1 > month2) return false;
		if(month1 == month2){
			var day1 = parseInt(date1.split("-")[2],10);
			var day2 = parseInt(date2.split("-")[2],10);
			if(day1<=day2){
				return true;
			}else{
				return false;
			}
		}    			
	}
	return true;
}

//默认以1000个 字为例，内容不能超过1000字,多于1000切断为1000字
function validateMaxLength(obj,maxInt){
	var v = obj.value;
	var max = 1000;
	if(maxInt){
		max = maxInt;
	}
	if(v){
		if(v.length > max){
			return v.substring(0,max);
		}else{
			return obj.value;
		}
	}
}


/********************************************身份证校验 begin*************************************************************/

var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",   
        21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",   
        33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",   
        42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",   
        51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",   
        63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
       };   
//身份证校验调用此方法
validIdCode = function(idCode)   
{   
var card = idCode;   
//是否为空   
if(card === '')   
{   
    alert('请输入身份证号码,身份证号码不能为空');   
    return false;   
}   
//校验长度，类型   
if(isCardNo(card) === false)   
{   
    alert('您输入的身份证号码长度或格式错误,请重新输入');   
    return false;   
}   
//检查省份   
if(checkProvince(card) === false)   
{   
    alert('您输入的身份证号码地区非法,请重新输入');   
    return false;   
}   
//校验生日   
if(checkBirthday(card) === false)   
{   
    alert('您输入的身份证号码生日不正确,请重新输入');   
    return false;   
}   
//检验位的检测   
if(checkParity(card) === false)   
{   
    alert('您的身份证校验位不正确,请重新输入');   
    return false;   
}   
return true;   
};   


//检查号码是否符合规范，包括长度，类型   
isCardNo = function(card)   
{   
//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X   
var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;   
if(reg.test(card) === false)   
{   
    return false;   
}   

return true;   
};   

//取身份证前两位,校验省份   
checkProvince = function(card)   
{   
var province = card.substr(0,2);   
if(vcity[province] == undefined)   
{   
    return false;   
}   
return true;   
};   

//检查生日是否正确   
checkBirthday = function(card)   
{   
var len = card.length;   
//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字   
if(len == '15')   
{   
    var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;    
    var arr_data = card.match(re_fifteen);   
    var year = arr_data[2];   
    var month = arr_data[3];   
    var day = arr_data[4];   
    var birthday = new Date('19'+year+'/'+month+'/'+day);   
    return verifyBirthday('19'+year,month,day,birthday);   
}   
//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X   
if(len == '18')   
{   
    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;   
    var arr_data = card.match(re_eighteen);   
    var year = arr_data[2];   
    var month = arr_data[3];   
    var day = arr_data[4];   
    var birthday = new Date(year+'/'+month+'/'+day);   
    return verifyBirthday(year,month,day,birthday);   
}   
return false;   
};   

//校验日期   
verifyBirthday = function(year,month,day,birthday)   
{   
var now = new Date();   
var now_year = now.getFullYear();   
//年月日是否合理   
if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)   
{   
    //判断年份的范围（3岁到100岁之间)   
    var time = now_year - year;   
    if(time >= 3 && time <= 100)   
    {   
        return true;   
    }   
    return false;   
}   
return false;   
};   

//校验位的检测   
checkParity = function(card)   
{   
//15位转18位   
card = changeFivteenToEighteen(card);   
var len = card.length;   
if(len == '18')   
{   
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);    
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');    
    var cardTemp = 0, i, valnum;    
    for(i = 0; i < 17; i ++)    
    {    
        cardTemp += card.substr(i, 1) * arrInt[i];    
    }    
    valnum = arrCh[cardTemp % 11];    
    if (valnum == card.substr(17, 1))    
    {   
        return true;   
    }   
    return false;   
}   
return false;   
};   

//15位转18位身份证号   
changeFivteenToEighteen = function(card)   
{   
if(card.length == '15')   
{   
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);    
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');    
    var cardTemp = 0, i;      
    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);   
    for(i = 0; i < 17; i ++)    
    {    
        cardTemp += card.substr(i, 1) * arrInt[i];    
    }    
    card += arrCh[cardTemp % 11];    
    return card;   
}   
return card;   
};
/********************************************身份证校验 end*************************************************************/