/**
 * ��� document.getElementById()
 */
function EI(id){
	return document.getElementById(id);
}
/**
 * ��� document.getElementsByName()
 */
function EN(name){
	return document.getElementsByName(name);
}

function openWindow(theURL,width,height,features,isResizable) 
{ 
  if (!isResizable) {
	isResizable = "no";
  }	
  
  if(!features || features == "")
  {
	  features = "yes";
  }

  var myLeft = 5;
  var myTop = 2;

  if( !width || !height )
  {
	  width=700;
	  height=500;
  }
  else
  {
	  myLeft = (screen.availWidth-width)/2;
	  myTop = (screen.availHeight-height)/2;
  }

  return window.open(theURL,'','top='+myTop+',left='+myLeft+',width='+width+',height='+height+',scrollbars='+features+',resizable='+isResizable);
}

//ȥ��ո�; 
		  function ltrim(s)
		  { 
			return s.replace( /^\s*/, ""); 
		  } 
		  //ȥ�ҿո�; 
		  function rtrim(s)
		  { 
			return s.replace( /\s*$/, ""); 
		  } 
		  //ȥ���ҿո�; 
		  function trim(s)
		  { 
			return rtrim(ltrim(s)); 
		  }

function trdocss()
{
  var ncss=  document.all("trs");
  if (ncss != null)
  {
      var ncslen=ncss.length;
        for(i=0;i<ncslen;i++)
        {
        	if( i%2!=1)
        	{
        		ncss[i].className="bgtr1";
        	}
        	else
        	{
        		ncss[i].className="bgtr2";
        	}
        }
    }
}

function trClass(){
	var table = document.getElementById("trs");
	if(arguments[0]) {
		table = document.getElementById(arguments[0]);
	}
	var tr = table.getElementsByTagName("tr");
	if(tr){
		for(var i=0; i<tr.length; i++) {
			if(tr[i].getElementsByTagName("th")!="th"){
				if(i%2 != 1){
					tr[i].className= !arguments[1]?"bgtr1":"bgtr2";
				}else
        		{
        			tr[i].className=!arguments[1]?"bgtr2":"bgtr1";
        		}
			}
		}
	}
}

/**
 * ����tableӦ�ø���ʽ��ʹ����һ��ҳ���ж��table��Ӧ�ø���ʽ�����
 * xuhj add
 */
function trsClass(){
	var tables = document.getElementsByTagName("table");
	for(var j = 0; j<tables.length; j++)
	{
		table = tables[j];
		var tr = table.getElementsByTagName("tr");
		if(tr){
			for(var i=0; i<tr.length; i++) {
				if(tr[i].getElementsByTagName("th")!="th"){
					if(i%2 != 1){
						tr[i].className= "bgtr1";
					}else
	        		{
	        			tr[i].className="bgtr2";
	        		}
				}
			}
		}
	}
}

function stringLengthOnEvent2(maxlen,propertyName,str1,str2)
{
    if(stringLength(event.srcElement.value)>maxlen)
    {


			alert('[ '+propertyName+' ]'+str1+' '+maxlen+'�ַ� \n'+str2);
			cut(maxlen);
			event.srcElement.focus();
			event.srcElement.select();
    }
}

function stringLength(str)
{
    var count =0;
    if(null == str) return 0;
    for (var i=0; i<str.length; i++)
    {
        if (str.charCodeAt(i)>=256)
            count+=2;
        else
            count+=1;
    }
     return count;
}

function cut(maxlen)
{

	var curlen = 0;
	var str=event.srcElement.value;
	if(null ==str) return;
	for (var i=0; i<str.length; i++) {
		if (str.charCodeAt(i)>=256)
     		curlen+=2;
	   	else
      		curlen+=1;

		if(curlen>maxlen)
		{
			event.srcElement.value=str.substring(0,i);
			return;
		}
	}
}
//���֤��֤��obj1Ϊ���֤���룬obj2Ϊ���֤����

function checkIdNo(obj1,obj2){
	var cardNo = obj1.value;
	var slt = obj2.value;
	var isIDCard1 = /^\d{15}$/;
	var isIDCard2 = /^\d{17}(?:\d|x|X)$/;   
	if (slt == "1") {
		if (cardNo != "") {
			if (!(isIDCard1.test(cardNo) || isIDCard2.test(cardNo))) {
				alert("��������ȷ���֤��ʽ!");
				obj1.value = "";
				obj1.focus();
				return;
			}
		}
	}
}

//������֤����������ָ�������Ϊ��-������/������.������ʽ����Ϊ0000-0-0,0000-00-00,0000-00,0000-0,��󶼻�ת����0000-00-00�ĸ�ʽ
function strDateTime(obj) 
  { 
     var dateCard = /^(\d{1,4})(-|\/|\.)(\d{1,2})\2(\d{1,2})$/;
     var dateCard1 = /^(\d{1,4})(-|\/|\.)(\d{1,2})$/;
     if(obj.value != ""){
	  	 if(! (dateCard.test(obj.value)|| (dateCard1.test(obj.value)))){
	  	 	alert("���ڸ�ʽ����ȷ��(2008-12-31)");
	  	 	obj.value="";
	  	 	obj.focus();
	  	 	return false;
	  	 }
	 }
  	 if(dateCard.test(obj.value)){
	     var r = obj.value.match(dateCard); 
	     if(r==null)return false; 
	     var d= new Date(r[1], r[3]-1, r[4]); 
	     var year = d.getFullYear();
	     var month = d.getMonth() + 1;
	     var day = d.getDate();
	     if(0 < month && month < 10){
	     	month = "0" + month;
	     } 
	     if(0 < day && day < 10){
	     	day = "0" + day;
	     }
	     obj.value = year+"-"+month+"-"+day;
	 }
	 if(dateCard1.test(obj.value)){
	     var r = obj.value.match(dateCard1); 
	     if(r==null)return false; 
	     var d= new Date(r[1], r[3]-1); 
	     var year = d.getFullYear();
	     var month = d.getMonth() + 1;
	     //var day = d.getDate();
	     if(0 < month && month < 10){
	     	month = "0" + month;
	     } 
	     /*if(0 < day && day < 10){
	     	day = "0" + day;
	     }*/
	     //�Ƿ����'��'
	     if(arguments[1] && arguments[1] == 'day'){
	     	alert("���ڸ�ʽ����ȷ��");
	  	 	obj.value="";
	  	 	obj.focus();
	  	 	return false;
	     }else{
	     	obj.value = year+"-"+month;
	     }
	     
	 }
	 return true;
  } 
 
  //ȥ��ո�; 
  function ltrim(s)
  { 
	return s.replace( /^\s*/, ""); 
  } 
  //ȥ�ҿո�; 
  function rtrim(s)
  { 
 	return s.replace( /\s*$/, ""); 
  } 
  
  //ȥ���ҿո�; 
  function trim(s)
  { 
	return rtrim(ltrim(s)); 
  }
  //��֤����
   function isNumber(str)  
   {
    //var regs = /^-?\d+$/; // ������
	 var regs = /^\d+$/;   //������ ������0��
	 if(regs.test(str))
	 { 
		return false;
	 }else 
	 { 
		return true;
	 } 
   } 
   
   //��֤���� yyyy-MM-dd
   function isDate(str)  
   {
		var regs = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/;
		if(regs.test(str))
		{ 
			return false;
		}else 
		{ 
			return true;
		} 
	} 
	//roolBackWindow
	 function showRollBackWindow(workItemId,activityInsId,processInsId)
	   {
	        var url = "rollBackWorkItem.do?method=rollBackWorkItem";
	        var obj = new Object();
	        obj.workItemId    = workItemId;
	        obj.activityInsId = activityInsId;
	        obj.processInsId  = processInsId;
	        var version = window.navigator.appVersion;
	        var test7    = version.lastIndexOf("7.0");
	        var test6    = version.lastIndexOf("6.0");
	         if(test7!=-1)
	         {
	           window.showModalDialog(url,obj,"dialogWidth:400px;dialogHeight:300px;scroll:no;status:no");
	         } 
	        if(test6!=-1)
	        {
	        	window.showModalDialog(url,obj,"dialogWidth:400px;dialogHeight:350px;scroll:no;status:no");
	        }
     } 

    function setValueById(id,object)
    {
     // alert("id==="+id+"====object"+"===="+object);
      if(object==null)
      {
         document.getElementById(id).value = "0.0 ";
      }
      else
      {
         document.getElementById(id).value =object;
      }
    }

    function setValueByName(name,object)
    {
      if(object==null)
      {
         document.getElementsByName(name)[0].value = "0.0 ";
      }
      else
      {
         document.getElementsByName(name)[0].value =object ;
      }
    }

   function formatValue(object)
   {
           var  i =0.00;
   		 if(object==null)
   		 {
   		 	return i;
   		 }
   		 else
   		 {
   		    return object +".00";
   		 }
   }
     

  	 function getFileTypeValue()
	 {
		var f= document.getElementById('file');
		if(f!=null)
		{
			var len = f.cells.length;
			if(len>0)
			{
					var values="";
					var nodes =f.cells[1].childNodes;
					var len = nodes.length;
					for( var i=1;i<len;i=i+2)
					{
					     	var j=i;
					     	if(nodes[j].checked==true)
							  { 
							    values=values+nodes[j].value+"@"
							  }
					   
					}
				return values;
		}
						
		}

	 }
	  	function showOrHidden()
    	{
    		var object = window.document.getElementById('hide2');
    		var flag = object.style.display
    		if(flag=="block")
    		{
    			flag="none";
    		}
    		else
    		{
    			flag="block";
    		}
    	
    	}
    	
    	function compareDate(date1,date2){
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
    				if(day1 < day2) return true;
    				if(day1 >= day2) return false;
    			}    			
    		}
    		return true;
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
//�������һ��Ԫ��
function addItem(ary,item){
	ary.push(item);
}

//����ɾ��һ��Ԫ��
function removeItem(ary,item){
	var index = getIndex(ary,item);
	if(index > -1){
		ary.splice(index,1);
	}
}

//�õ�Ԫ���������е�λ��
function getIndex(ary,item){
	for(var i=0;i < ary.length;i++){
		if(ary[i] == item){
			return i;
		}
	}
	return -1;
}


/**
 * set table tr width
 * 1 two column
 * 2 four column
 * @param tdWidth
 */
function setTableTdWidth(tdWidth)
{
	var trs = document.getElementsByTagName('tr');
	for(var i = 0; trs && i < trs.length; i++)
	{
		if(trs[i].childNodes && trs[i].childNodes.length == 2)
		{
			trs[i].firstChild.style.width = tdWidth;
			trs[i].firstChild.style.textAlign = 'right';
			trs[i].firstChild.nextSibling.textAlign = 'left';
		}		
		if(trs[i].childNodes && trs[i].childNodes.length == 4)
		{
			trs[i].firstChild.style.width = tdWidth;
			trs[i].firstChild.nextSibling.nextSibling.style.width = tdWidth;
			trs[i].firstChild.style.textAlign = 'right';
			trs[i].firstChild.nextSibling.textAlign = 'left';
			trs[i].firstChild.nextSibling.nextSibling.style.textAlign = 'right';
			trs[i].firstChild.nextSibling.nextSibling.nextSibling.textAlign = 'left';
		}
	}
}

/**
 * compare Date
 * @param String date1
 * @param String date2
 * @param String flag	default:'<'less		others:'<='lessEqual or '<'less or '=='equal
 * @return boolean 
 */
function compareDateByCondition(date1, date2, flag)
{
	if(!date1 || typeof date1 != 'string') return false;
	if(!date2 || typeof date2 != 'string') return false;
	var startDate = new Date(date1.replace(/-/g, '\/'));
	var endDate = new Date(date2.replace(/-/g, '\/'));
	if(!flag || (flag && flag == '<')){
		if(startDate < endDate)
			return true;
		else
			return false;
	}
	if(flag && flag == '<='){
		if(startDate <= endDate)
			return true;
		else
			return false;
	}
	if(flag && flag == '=='){
		if(startDate == endDate)
			return true;
		else
			return false;
	}
}

/**
 * floating bottom toolbar for open new window
 * @param el				element ID or Name
 * @param index(option)		el is name, give the el index
 */
function floatingBottomBar(el, index)
{
	var brEl = document.createElement('br');
	var element = undefined;
	var regTest = /^\d+$/;
	if(arguments.length == 1)
		element = document.getElementById(el);
	if(arguments.length == 2){
		if(index && !regText.test(index)) return;
		element = document.getElementsByName(el)[index];
	}
	//set style
	if(element){
		element.style.position = 'absolute';
		element.style.width = '100%';
		element.style.background = 'white';
		window.onscroll = function(){
			element.style.top = (document.body.scrollTop+document.body.clientHeight-element.offsetHeight)+"px";
		};
		window.scrollTo(0,1);//fire scroll event
		//fire resize event
		window.onresize = function(){
			window.scrollTo(0,1);
		};
	}
}

/**
 * ��֤���ڸ�ʽ
 */
function checkDate(time){
	if(time == '') return true;
	if(isDate(time)){  //isDateҲ�����js��
		return false;
	}
	return true;
}
//������
function showProgressText()
{
	Ext.MessageBox.show({
						   msg: '���ڴ�����ȴ�...',
						   progressText: '������...',
						   width:300,
						   wait:true,
						   waitConfig: {interval:200},
						   icon:Ext.MessageBox.WARNING
						});	
}
//����
function recall()
{
	parent.win.win.close();
}
/**
 * 
 * 
 * 
 * 
 * 
 */
function isInteger(value)
{
	if(value == 'undefined' || value ==null || value== "")
	{
		return false;
	}
	
	for(i=0;i<value.length;i++){
		character = value.charAt(i);
		if(!(('0'<=character) && (character<='9')))
		{
			return false;
		}
	}
	return true;
}

/********************************************************************************* 
*�����ַ����ĳ��ȣ������������
*author: 
**********************************************************************************/ 
function isMoreThanLen(str,length)
{
	if(str.replace(/[^\x00-\xff]/g,"xx").length > length)
	{
		return true;
	}
	return false;
}
//textarea�е����ݲ��ܳ���1000��,����1000�ж�Ϊ1000��
function validateMaxLength(obj,maxInt){
	var v = obj.value;
	var max = 1000;
	if(maxInt){
		max = maxInt;
	}
	if(v){
		if(v.length > max){
			obj.value = v.substring(0,max);
		}
	}
}

function toNumber(str)
{
	if(stringLength(str)>1 && str.substring(0,1)=='0')
	{
		str=str.substring(1,stringLength(str));
		if(stringLength(str)>=1 && str.substring(0,1)!='0')
		{
			return str;
		}
		str=toNumber(str);
		
	}else
	{
	 	return str;
	}
}

/**
 * ��window����
 * theURL:    url����
 * title:     ����title
 * features:  �������ڵ�����
 * isEncoding:�Ƿ���� ��:'Y';��:'N'; Ĭ��Ϊ"Y"
 */
function openWindowWithFeature(theURL,title,features,isEncoding) 
{ 
	var	width=700;
	var	height=500;
	var	myLeft = (screen.availWidth-width)/2;
	var	myTop = (screen.availHeight-height)/2;
	if(!features || features == "")
	{
		features = 'top='+myTop+',left='+myLeft+',width='+width+',height='+height+',location=no';
	}
	//theURL = encodingUrl(theURL,isEncoding); 
	return window.open(theURL,title,features);
}