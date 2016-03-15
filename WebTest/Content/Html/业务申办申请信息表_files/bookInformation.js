function init(){
	var area = EI('registrationAreaOid');
	if(hasReturn && hasReturn=='Y'){
		changeRegistrationArea(area.value);
		setTimeout(init2,50);
	}else{
		area.selectedIndex=0;
		changeRegistrationArea(area.value);
	}
}
function init2(){
	EI('bookingType').value = bookingType;
	radio = EI(workDay +"_" + workTimeSoltOid);
	if(radio.disabled || radio.disabled == 'disabled'){
		clearBookTime();
	}else{
		radio.checked = true;
		radio.click();
	}
}

function changeRegistrationArea(area){
	clearBookTime();
	
	if(area && area!=''){
		DWREngine.setAsync(false);
		bookingTypeDwr.listBookingTypeForSelectLabel(area,reLoadBookingType);
		DWREngine.setAsync(true);
		reloadBookingCalendarPanel();
	}
}

function reLoadBookingType(values){
	var arr = eval(values);
	var select = EI('bookingType');
	select.options.length = 0;
	for ( var i = 0; i < arr.length; i++)
	{
		select.options.add(new Option(arr[i].label,arr[i].value));
	}
	if(hasReturn && hasReturn=='Y')
	{
		EI('bookingType').value = bookingType;
	}
	else
	{
		select.focus();
		select.selectedIndex=0;
	}
}

function reloadBookingCalendarPanel(){
	var registrationAreaOid = document.getElementById("registrationAreaOid").value;
	var bookingType = document.getElementById("bookingType").value;

	//匹配登记点地址
	var registerAddressName=new Array();
	registerAddressName=registerAddress.split(',');
	for(var i=0;i<registerAddressName.length;i+=2)
	{
		if(registrationAreaOid&&registrationAreaOid==registerAddressName[i])
		{
			$("#registerAddressTr").css('display','');
			$("#registerAddress").html(registerAddressName[i+1]);
			break;
		}
	}	
	
	if(null!=registrationAreaOid&&""!=registrationAreaOid&&null!=bookingType&&""!=bookingType)
	{ 
		var dayList,timeList,countMap,addTimeList;
		DWREngine.setAsync(false);
		workDayDwr.listWorkDayByRegistrationAreaOid(registrationAreaOid,{callback:function(d){
			dayList = eval(d);
		}});
		workTimeSoltDwr.listWorkTimeSoltByRegistrationAreaOid(registrationAreaOid, bookingType, {callback:function(t){
			timeList = eval(t);
		}});
		workTimeSoltDwr.findMissBookRelease(registrationAreaOid, {callback:function(t){
			addTimeList = eval(t);
		}});
		bookingInformationDwr.countAllBookingAmount(registrationAreaOid, bookingType,{callback:function(m){
			countMap = m;
		}});
		$("#calendar_panel tr").remove();
		var headRow = "<tr class='label' style='height:25px;'><td>预约时段</td>";
		for (var i = 0; i < dayList.length; i++){
			headRow += ("<td>"+dayList[i].workDayLabel+"</td>");
		}
		headRow += "</tr>";
		$("#calendar_panel").append(headRow);
		EI("calendar_panel").style.display = '';
		for(var i = 0; i<timeList.length; i++){
			var row = "<tr><td class='label'>"+timeList[i].workTimeSoltName+"</td>";
			for ( var j = 0; j < dayList.length; j++)
			{
				var count = countMap[dayList[j].workDay.substring(0,10)+"_"+timeList[i].workTimeSoltName] || 0;
				var curCount = timeList[i].bookCount;
				//当天
				if(dayList[j].workDay.substring(0,10)==toDay)
				{
					var tNum = 0;
					for ( var k = 0; k < addTimeList.length; k++)
					{
						if(addTimeList[k].workTimeSoltOid == timeList[i].workTimeSoltOid)
						{
							tNum += addTimeList[k].bookCount;
						}
					}
					curCount = timeList[i].bookCount+tNum;
				}
				//不是今天
				dayList[j].workDay=dayList[j].workDay.substring(0,10);
				if(count < curCount){
					row += ("<td><input type='radio' name='calendar' " +
							"value='"+dayList[j].workDay+"_"+timeList[i].workTimeSoltOid+"' " +
							"id='"+dayList[j].workDay+"_"+timeList[i].workTimeSoltOid+"' " +
							"onclick=\"chooseBookTime('"
							+dayList[j].workDay+"','"
							+dayList[j].workDayLabel+"','"
							+timeList[i].workTimeSoltOid+"','"
							+timeList[i].workTimeSoltName+"')\"/><span>("
							+count+"/"+curCount+")</span></td>");
				}else{
					row += ("<td><input type='radio' name='calendar' disabled='disabled' " +
							"value='"+dayList[j].workDay+"_"+timeList[i].workTimeSoltOid+"' " +
							"id='"+dayList[j].workDay+"_"+timeList[i].workTimeSoltOid+"' " +
							"/><span><font color='#999999'>约满</font></td></span>");
				}
			}
			row += "</tr>";
			$("#calendar_panel").append(row);
		}	
		DWREngine.setAsync(true);
		disabledForetime(timeList);
		parent.SetIframeHeight();
	}
}
function disabledForetime(timeList)
{
	for(var i = 0; i<timeList.length; i++){
		if((new Date().getHours()+parseInt(addTime))>(parseInt(timeList[i].startTime.substring(0,2),10)))
		{
			disabledNode(toDay+"_"+timeList[i].workTimeSoltOid);
		}else if((new Date().getHours()+parseInt(addTime))==(parseInt(timeList[i].startTime.substring(0,2),10)))
		{
			if(new Date().getSeconds() > parseInt(timeList[i].startTime.substring(3,5),10))
			{
				disabledNode(toDay+"_"+timeList[i].workTimeSoltOid);
			}
		}
	}
}
function disabledNode(nodeId)
{
	var node = document.getElementById(nodeId);
	if(node)
	{
		node.disabled=true;
		node.parentNode.lastChild.innerHTML = "<font color='#999999'>已结束</font></td>";
	}
}
function chooseBookTime(day,dayLabel,timeId,timeLabel){
//	EI("chooseTimeLabel").innerHTML= dayLabel +" "+timeLabel;
	EI("bookingDateStr").value = day;
	EI("bookingDateLabel").value = dayLabel;
	EI("workTimeSoltOid").value = timeId;
	EI("workTimeSoltName").value = timeLabel;
}

function clearBookTime(){
//	EI("chooseTimeLabel").innerHTML= "";
	EI("bookingDateStr").value = "";
	EI("bookingDateLabel").value = "";
	EI("workTimeSoltOid").value = "";
	EI("workTimeSoltName").value = "";
}

function sendVerificationCode(phoneNumber){
	var flag=true;
	DWREngine.setAsync(false);
	var verificationCodeOid = EI("verificationCodeOid").value;
	getVerificationCodeDwr.getVerificationCode(phoneNumber,verificationCodeOid,{callback:function(oid){
	//	alert(oid);
		if(oid=="发送动态码异常，请稍后再试！")
		{
			flag=false;
		}
		EI("verificationCodeOid").value = oid;
	}});
	if(flag)
	{ 
		var sendBtn = EI("sendVerificationBtn");
		sendBtn.disabled = true;
		sendBtn.value ="(180)重新发送";
		EI("verification").innerHTML = "动态码已经发送到您的手机，请注意查收(如果在180秒后还没有收到，请您点击重新发送获取手机动态码)。";
		EI("verification_1").style.display = '';
		setTimeout("resetSendBtnValue(179)",1000);
	}
	else
	{
		EI("verification").innerHTML = "发送动态码异常，请稍后再试！";
	}
	DWREngine.setAsync(true);
}

function resetSendBtnValue(mins){
	var sendBtn = EI("sendVerificationBtn");
	EI("verification").innerHTML = "动态码已经发送到您的手机，请注意查收(如果在180秒后还没有收到，请您点击重新发送获取手机动态码)。";
	EI("verification_1").style.display = '';
	if(mins<=0){
		sendBtn.disabled = false;
		sendBtn.value ="重新发送";
	}else{
		sendBtn.disabled = true;
		sendBtn.value ="("+mins+")重新发送";
		setTimeout("resetSendBtnValue("+(mins-1)+")",1000);
	}
}

function checkVerificationCode(falg) {
	if ("Y"==falg)
	{
		var verificationCode = EI("verificationCode").value;
		if (verificationCode == null || verificationCode == "") {
			alert("请输入动态码！");
			return false;
		}
	}
	return true;
}

function onSubmit()
{
	var registrationArea = EI("registrationAreaOid").value;
	var bookingType = EI("bookingType").value;
	var bookingDate = EI("bookingDateStr").value;
	var workTime = EI("workTimeSoltOid").value;
	var proveType = EI("proveType").value;
	var proveCode = EI("proveCode").value;
	proveCode = trim(proveCode);
	EI("proveCode").value = proveCode;
	var houseName = EI("houseName").value;
	var personName = EI("personName").value;
	var certificateType = EI("certificateType").value;
	var certificateNo = EI("certificateNo").value;
	certificateNo = trim(certificateNo);
	EI("certificateNo").value = certificateNo;
	var phoneNumber = EI("phoneNumber").value;
	phoneNumber = trim(phoneNumber);
	EI("phoneNumber").value = phoneNumber;
	
	if(registrationArea == null || registrationArea == ""){
		alert("请选择办理登记点！");
		return false;
	}
	if(bookingType == null || bookingType == ""){
		alert("请选择业务类型！");
		return false;
	}
	if(bookingDate == null || bookingDate == "" || workTime==null ||workTime==""){
		alert("请选择预约时段！");
		return false;
	}
	if(proveType == null || proveType == ""){
		alert("请选择房地产权利证明类型！");
		return false;
	}
	if(proveCode == null || proveCode == ""){
		alert("请输入房地产权利证明编号！");
		return false;
	}else if(proveCode.length > 100){
		alert("房地产权利证明编号长度最多100位！");
		return false;
	}
	if(houseName == null || houseName == ""){
		alert("请输入房地产名称！");
		return false;
	}else if(houseName.length > 100){
		alert("房地产名称长度最多100位！");
		return false;
	}
	if(personName == null || personName == ""){
		alert("请输入申请人姓名！");
		return false;
	}else if(personName.length > 50){
		alert("申请人姓名长度最多50位！");
		return false;
	}
	if(certificateType == null || certificateType == ""){
		alert("请选择申请人证件类型！");
		return false;
	}
	if(certificateNo == null || certificateNo == ""){
		alert("请输入申请人证件号码！");
		return false;
	}else if(certificateNo.length > 100){
		alert("申请人证件号码长度最多100位！");
		return false;
	}
	
	if(certificateType == "1"){
		if(!validIdCode(certificateNo)){
			return false;
		}
	}
	
	if(phoneNumber == null || phoneNumber == ""){
		alert("请输入申请人手机号码！");
		return false;
	}else if(!/^\d{11}$/.test(phoneNumber)){
		alert("手机号码格式不正确！");
		return false;
	}
	DWREngine.setAsync(false);
	var b = true;
	
	if(b == true)
		bookingInformationDwr.checkHasLock(certificateType,certificateNo,{callback:function(lockStr){
			if(lockStr && lockStr != ''){
				alert(lockStr);
				b = false;
			}
		}});
	
	if(b == true)
		bookingInformationDwr.countSameBookingOnSameDay(bookingType, proveCode, proveType,{callback:function(c){
			if(c > 0){
				alert("该房产当天已经预约过该业务，不可重复预约！");
				b = false;
			}
		}});
	
	if(b == false){
		return false;
	}
	DWREngine.setAsync(true);
	return true;
}