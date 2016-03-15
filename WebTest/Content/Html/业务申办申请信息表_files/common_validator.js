/*
 *	����У�� JS��
 **/

//��֤��Ȼ��
function isNumber(str)  
{
     //var regs = /^-?\d+$/; // ������
	 var regs = /^\d+$/;   //������ ������0��
	 if(regs.test(str))
	 { 
		return true;
	 }else 
	 { 
		return false;
	 } 
} 

//��֤���� yyyy-MM-dd
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

//���date2���ڻ����date1�����棬���򷵻ؼ�
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

//Ĭ����1000�� ��Ϊ�������ݲ��ܳ���1000��,����1000�ж�Ϊ1000��
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


/********************************************���֤У�� begin*************************************************************/

var vcity={ 11:"����",12:"���",13:"�ӱ�",14:"ɽ��",15:"���ɹ�",   
        21:"����",22:"����",23:"������",31:"�Ϻ�",32:"����",   
        33:"�㽭",34:"����",35:"����",36:"����",37:"ɽ��",41:"����",   
        42:"����",43:"����",44:"�㶫",45:"����",46:"����",50:"����",   
        51:"�Ĵ�",52:"����",53:"����",54:"����",61:"����",62:"����",   
        63:"�ຣ",64:"����",65:"�½�",71:"̨��",81:"���",82:"����",91:"����"  
       };   
//���֤У����ô˷���
validIdCode = function(idCode)   
{   
var card = idCode;   
//�Ƿ�Ϊ��   
if(card === '')   
{   
    alert('���������֤����,���֤���벻��Ϊ��');   
    return false;   
}   
//У�鳤�ȣ�����   
if(isCardNo(card) === false)   
{   
    alert('����������֤���볤�Ȼ��ʽ����,����������');   
    return false;   
}   
//���ʡ��   
if(checkProvince(card) === false)   
{   
    alert('����������֤��������Ƿ�,����������');   
    return false;   
}   
//У������   
if(checkBirthday(card) === false)   
{   
    alert('����������֤�������ղ���ȷ,����������');   
    return false;   
}   
//����λ�ļ��   
if(checkParity(card) === false)   
{   
    alert('�������֤У��λ����ȷ,����������');   
    return false;   
}   
return true;   
};   


//�������Ƿ���Ϲ淶���������ȣ�����   
isCardNo = function(card)   
{   
//���֤����Ϊ15λ����18λ��15λʱȫΪ���֣�18λǰ17λΪ���֣����һλ��У��λ������Ϊ���ֻ��ַ�X   
var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;   
if(reg.test(card) === false)   
{   
    return false;   
}   

return true;   
};   

//ȡ���֤ǰ��λ,У��ʡ��   
checkProvince = function(card)   
{   
var province = card.substr(0,2);   
if(vcity[province] == undefined)   
{   
    return false;   
}   
return true;   
};   

//��������Ƿ���ȷ   
checkBirthday = function(card)   
{   
var len = card.length;   
//���֤15λʱ������Ϊʡ��3λ���У�3λ���꣨2λ���£�2λ���գ�2λ��У��λ��3λ������Ϊ����   
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
//���֤18λʱ������Ϊʡ��3λ���У�3λ���꣨4λ���£�2λ���գ�2λ��У��λ��4λ����У��λĩβ����ΪX   
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

//У������   
verifyBirthday = function(year,month,day,birthday)   
{   
var now = new Date();   
var now_year = now.getFullYear();   
//�������Ƿ����   
if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)   
{   
    //�ж���ݵķ�Χ��3�굽100��֮��)   
    var time = now_year - year;   
    if(time >= 3 && time <= 100)   
    {   
        return true;   
    }   
    return false;   
}   
return false;   
};   

//У��λ�ļ��   
checkParity = function(card)   
{   
//15λת18λ   
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

//15λת18λ���֤��   
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
/********************************************���֤У�� end*************************************************************/