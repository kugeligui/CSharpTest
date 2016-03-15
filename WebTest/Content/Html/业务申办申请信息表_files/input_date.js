function dtControl(name,dtStyle,value,dateSeparator,timeSeparator,readOnly,rangeBegin,rangeEnd) {
	this.name = name;
	this.fName = name+"_input";
	//this.fName = fName || "m_input";
	this.timer = null;
	this.fObj = null;
	this.maxDate = null;
	this.minDate = null;
	this.dtSeparator=arguments.length>3?(arguments[3]==null?"-":arguments[3]):"-";
	this.tmSeparator=arguments.length>4?(arguments[4]==null?":":arguments[4]):":";
	this.dtStyle = arguments.length>1?(arguments[1]==null?0:arguments[1]):0; 
	this.defValue =arguments.length>2?arguments[2]:null;	
	this.readOnly = arguments.length>2?(arguments[5]==null?false:arguments[5]):false;	
	
	this.toString = function() {
		var objDate = new Date();		
		var READONLY = this.readOnly ? "readonly":"";
		var sMinute_Common = " class=\"m_input\" maxlength=\"2\" name=\""+this.fName+"\" onfocus=\""+this.name+".setFocusObj(this)\" onblur=\""+this.name+".setTime(this)\" onkeyup=\"hdlEnter(this, event);"+this.name+".prevent(this)\" onkeypress=\"if (!/[0-9]/.test(String.fromCharCode(event.keyCode)))event.keyCode=0\" onpaste=\"return false\" ondragenter=\"return false\" style=\"ime-mode:disabled\"";		
		var sYear_Common = " class=\"m_inputyear\" maxlength=\"4\" name=\""+this.fName+"\"  onfocus=\""+this.name+".setFocusObj(this)\" onblur=\""+this.name+".setYear(this);"+this.name+".checkYear(this);\" onkeyup=\"hdlEnter(this, event);"+this.name+".preventYear(this)\"   onkeypress=\"if (!/[0-9]/.test(String.fromCharCode(event.keyCode)))event.keyCode=0\" onpaste=\"return false\" ondragenter=\"return false\" style=\"ime-mode:disabled\"";		
		sMinute_Common = this.readOnly ? "readonly maxlength=\"2\" class=\"m_input_readonly\" name=\""+this.fName+"\" style=\"ime-mode:disabled\" " : sMinute_Common ;
		sYear_Common = this.readOnly ? "readonly maxlength=\"4\" class=\"m_inputyear_readonly\" name=\""+this.fName+"\" style=\"ime-mode:disabled\" " : sYear_Common ;
		var sButton_Common = "class=\"m_arrow\" onfocus=\"this.blur()\" onmouseup=\""+this.name+".controlTime()\" disabled"
		var vYear = 0;
		var vMonth = 0;
		var vDay = 0;
		var vHour = 0;
		var vMinute = 0;
		var vSecond = 0 ;
		var defValue = this.defValue;
		
		if(defValue!= null && defValue=='now'){
			vYear = objDate.getFullYear();
			vMonth = objDate.getMonth()+1;
			vDay = objDate.getDate();
			vHour = objDate.getHours();
			vMinute = objDate.getMinutes();
//			vSecond = objDate.getSeconds();	
			vSecond = "00";	
		}
		else if(this.dtStyle==0){
			try{
			vYear = defValue == null ? "" : defValue.substr(0,4);
			vMonth = defValue == null ? "" : defValue.substr(5,2);
			vDay = defValue == null ? "" : defValue.substr(8,2);
			vHour = defValue == null ? "" : defValue.substr(11,2);
			vMinute = defValue == null ? "" : defValue.substr(14,2);
//			vSecond = defValue == null ? "" : defValue.substr(17,2);			
			vSecond = "00";	
			}catch(e){
			}
		}else if(this.dtStyle==1){
			try{
			vYear = defValue == null ? "" : defValue.substr(0,4);
			vMonth = defValue == null ? "" : defValue.substr(5,2);
			vDay = defValue == null ? "" : defValue.substr(8,2);
			}catch(e){
			}	
		}else if(this.dtStyle==2){
			try{
			vHour = defValue == null ? "" : defValue.substr(0,2);
			vMinute = defValue == null ? "" : defValue.substr(3,2);
//			vSecond = defValue == null ? "" : defValue.substr(6,2);	
			vSecond = "00";	
			}catch(e){
			}	
		}
		var str = "";
		str += "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
		str += "<tr>"
		str += "<td>"
		if(this.readOnly==false){
			str += "<div class=\"m_frameborder\">"		
		}else{
			str += "<div class=\"m_frameborder_readonly\">"		
		}
		if(this.dtStyle==0 || this.dtStyle==1){
			str += "<input radix=\"2100\" intype=\"YEAR\" value=\""+this.formatTyear(vYear)+"\" "+sYear_Common+">"+this.dtSeparator		
			str += "<input radix=\"12\" intype=\"MONTH\" value=\""+this.formatTime(vMonth)+"\" "+sMinute_Common+">"+this.dtSeparator		
			str += "<input radix=\"31\" intype=\"DAY\" value=\""+this.formatTime(vDay)+"\" "+sMinute_Common+">"		
		}
		if(this.dtStyle==0 || this.dtStyle==2){
			str += "<input radix=\"24\" intype=\"HOUR\" value=\""+this.formatTime(vHour)+"\" "+sMinute_Common+">"+this.tmSeparator
			str += "<input radix=\"60\" intype=\"MINUTE\" value=\""+this.formatTime(vMinute)+"\" "+sMinute_Common+">"+this.tmSeparator
//			str += "<input radix=\"60\" intype=\"SECOND\" value=\""+this.formatTime(vSecond)+"\" "+sMinute_Common+">"    
			str += "<input radix=\"60\" intype=\"SECOND\" value=\""+this.formatTime("00")+"\" "+sMinute_Common+">"    
		}
		str += "</div>"
		str += "</td>"
		if(this.readOnly==false){
		str += "<td width=\"20px\">"
		str += "<table border=\"0\" cellspacing=\"2\" cellpadding=\"0\">"
		str += "<tr><td><button id=\""+this.fName+"_up\" "+sButton_Common+">5</button></td></tr>"
		str += "<tr><td><button id=\""+this.fName+"_down\" "+sButton_Common+">6</button></td></tr>"
		str += "</table>"
		str += "</td>"
		}
		str += "</tr>"
		str += "</table>"
		//alert(str)
		return str;
	}
	this.play = function() {
		this.timer = setInterval(this.name+".playback()",1000);
	}
	this.formatTime = function(sTime) {		  
	  if(sTime!="")
		sTime = ("0"+sTime);
		return sTime.substr(sTime.length-2);
	}
	
	this.formatTyear = function(sYear) {
		//return sYear.substr(sYear.length-4);
	  if(""==sYear)
	  	return "";		
		return sYear
	}	
	
	this.playback = function() {
		var objDate = new Date();
		var arrDate = [objDate.getHours(),objDate.getMinutes(),objDate.getSeconds()];
		var objMinute = document.getElementsByName(this.fName);
		for (var i=0;i<objMinute.length;i++) {
			objMinute[i].value = this.formatTime(arrDate[i])
		}
	}
	this.checkYear = function(obj){
		var radix =  parseInt(obj.radix,10) ;
		if( obj.value!="")
		if(obj.value>radix||obj.value<1900) {
			  	obj.value = 1900;
		}	
	}	
	this.prevent = function(obj) {
	
		clearInterval(this.timer);
		this.setFocusObj(obj);
		var isTime = (this.fObj.intype=="YEAR" || this.fObj.intype=="MONTH" || this.fObj.intype=="DAY") ? false : true;
		var value = parseInt(obj.value,10);
		var radix = isTime ? parseInt(obj.radix,10)-1 : parseInt(obj.radix,10) ;
		var minv  = isTime ? 0 : 1 ;
		if(this.fObj.intype=="YEAR" ) {
			if (obj.value>radix||obj.value<1900) {
			  	obj.value = 1900;
			}
		}else{
			if (obj.value>radix||obj.value<minv) {
			  	obj.value = obj.value.substr(0,1);
			}else if(obj.value.length==2 && event.keyCode!=39 && event.keyCode!=37){			
				if(obj.value!=""){
			  	event.keyCode=13
					hdlEnter(obj,event)
				}
			}
		}	
	}
	this.preventYear = function(obj) {
	
		clearInterval(this.timer);
		this.setFocusObj(obj);
		var isTime = (this.fObj.intype=="YEAR" || this.fObj.intype=="MONTH" || this.fObj.intype=="DAY") ? false : true;
		var value = parseInt(obj.value,10);
		var radix = isTime ? parseInt(obj.radix,10)-1 : parseInt(obj.radix,10) ;
		if(this.fObj.intype=="YEAR" && obj.value!="") {		  
			if (obj.value>radix||obj.value<1 ) {
			  	obj.value = 1900;
			}else if(obj.value.length==4 && event.keyCode!=39 && event.keyCode!=37){			
			  event.keyCode=13
				hdlEnter(obj,event)
			}
		}
	}	
	this.controlTime = function(cmd) {
		event.cancelBubble = true;
		if (!this.fObj) return;
		clearInterval(this.timer);
		//5向上按，6向下按
		var cmd = event.srcElement.innerText=="5"?true:false;
		var i = parseInt(this.fObj.value,10);
		var isTime = (this.fObj.intype=="YEAR" || this.fObj.intype=="MONTH" || this.fObj.intype=="DAY") ? false : true;
		var radix = isTime ? parseInt(this.fObj.radix,10)-1 : parseInt(this.fObj.radix,10);	
		var minValue= isTime ? 0 : 1 ;
		if(this.fObj.intype=="YEAR") minValue = 1900
		if (i==radix&&cmd) {		  
			i = minValue;		
		} else if (i==minValue&&!cmd) {		
			i = radix;
		} else {
			cmd?i++:i--;
		}
		this.fObj.value = this.fObj.intype=="YEAR" ? this.formatTyear(i) : this.formatTime(i);
		this.fObj.select();
	}
	this.setTime = function(obj) {
		obj.value = this.formatTime(obj.value);
	}
	this.setYear = function(obj) {
		obj.value = this.formatTyear(obj.value);
	}	
	this.setFocusObj = function(obj) {
	  document.getElementById(this.fName+"_up").disabled = document.getElementById(this.fName+"_down").disabled = false;
		//eval(this.fName+"_up").disabled = eval(this.fName+"_down").disabled = false;
		this.fObj = obj;
	}
	this.getDate = function() {
	  var arrDate = new Array(2);
		var arrTime = new Array(2);
		var dt = null;
		for (var i=0;i<document.getElementsByName(this.fName).length;i++) {
		  if(i<3){
		    arrDate[i] = document.getElementsByName(this.fName)[i].value;
		  }
		  else{
				arrTime[i-3] = document.getElementsByName(this.fName)[i].value;
			}
		}
		if(this.dtStyle == 1){
		    	return arrDate.join(this.dtSeparator);
		}else if(this.dtStyle == 2){
		    	return arrDate.join(this.tmSeparator);
		}else{		
			return arrDate.join(this.dtSeparator)+" "+arrTime.join(this.tmSeparator)
		}
	}
}
function GetCursorPsn(txb) 
{ 
    var slct = document.selection; 
    var rng = slct.createRange(); 
    txb.select(); 
    rng.setEndPoint("StartToStart", slct.createRange()); 
    var psn = rng.text.length; 
    rng.collapse(false); 
    rng.select(); 
    return psn; 
}
function hdlEnter (field, event) {
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
		var mm=field.intype=="YEAR" ?4:2 ;
		var forword = false ;
		if(keyCode==39){ //rightward
			var rng = GetCursorPsn(field)
				if(rng==mm) keyCode=13
		}
		if(keyCode==37){ //rightward
			var rng = GetCursorPsn(field)				
				if(rng==0)
				{
					forword=true;
					keyCode = 13
				}
		}				
		if (keyCode == 13) {

		for (i = 0; i < field.form.elements.length; i++){
				if (field != field.form.elements[i])
					continue;
				
			var j = forword ? (i -1) % field.form.elements.length:(i + 1) % field.form.elements.length;
			try{
				field=field.form.elements[j];
				if( field.form.elements[j].type ){
					if(field.form.elements[j].type=="hidden"){					
						continue;
					}
				}
			  field.form.elements[j].focus();
			  if(forword){
			  	var rng = field.form.elements[j].createTextRange();
			  	rng.collapse(false);
			  	rng.select();			  
			  }
			}catch(e){
				break;
			}
			return false;		
		} 
		
		}else
		return true;
	}    
