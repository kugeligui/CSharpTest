function EI(id)
{
	return document.getElementById(id);
}
function SetIframeHeight() 
{ 
	var win=document.all("tabIframe2"); 
	if(!win||win==null)
	{
		win = parent.document.all("tabIframe2"); 
	}
	var height = 400;
	if (document.getElementById) 
	{ 
		if (win && !window.opera) 
		{ 
			if (win.contentDocument && win.contentDocument.body.offsetHeight && win.contentDocument.body.offsetHeight>=height) {
				height = win.contentDocument.body.offsetHeight; 
				 
			}
			if(win.Document && win.Document.body.scrollHeight && win.Document.body.scrollHeight>=height) {
				height = win.Document.body.scrollHeight; 
			}
		} 
	} 
	win.style.height = height+10+'px';
}
function setHeight(num)
{
	document.getElementById("tabIframe2").style.height = num+'px';
}
function hiddenTapPage(tapID){
	var tabObj = document.getElementById(tapID);
	if( tabObj == undefined ){
		if(tapID=="v_log"){
			return;
		}
		Ext.MessageBox.alert("温馨提示", "未定义的标签对象ID名：'"+ tapID +"'"+"&nbsp;&nbsp;&nbsp;&nbsp;");
	}else{
		tabObj.style.display = 'none';
	}
}
function onClickTab(tabId){
	var elList = document.getElementsByTagName("A");
  	for (i = 0; i < elList.length; i++){
  		if(elList[i].id==tabId){
  			elList[i].className += " activeTab";
        	elList[i].blur();
      	}else{
        	removeName(elList[i], "activeTab");
        }
  	}
  	
}
function toFirstPageTap(hrefUrl,num){
	var hrefstr = window.location.href; 
	tempItemName = hrefstr.substring(hrefstr.indexOf("?")+1);
	document.getElementById('tabIframe2').src = hrefUrl;	
	temp_bookingInformationOid='';
}

function toFollowPageTap(hrefUrl,num){ 
	document.getElementById('tabIframe2').src = hrefUrl;	
	temp_bookingInformationOid='';
}
/**
 * 查询
 */
function doSearch(url)
{
	var certificateNo = EI('c_certificateNo');
	var phoneNumber = EI('c_phoneNumber');
	var msgStr = '';
	if(certificateNo == null || trim(certificateNo.value) == '')
	{
		msgStr += '预约人证件号码不能为空!\n';
	}
	if(phoneNumber == null || trim(phoneNumber.value) == '')
	{
		msgStr += '预约人手机号码不能为空!\n';
	}
	bookingInformationDwr.checkInSystemWork({callback:function(lockStr){
		if(lockStr && lockStr != ''){
			Ext.MessageBox.alert("温馨提示", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	}});
	
	if(msgStr != '')
	{
		Ext.MessageBox.alert("温馨提示", msgStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
		return;
	}
	
	var doUrl = url+"&certificateNo="+certificateNo.value+"&phoneNumber="+phoneNumber.value;
	parent.goHref(doUrl);
}
/**
 * 取消
 */
function doCancel(url)
{
	var bookingCode = EI('c_bookingCode');
	var certificateNo = EI('c_certificateNo');
	var phoneNumber = EI('c_phoneNumber');
	var msgStr = '';
	if(bookingCode == null || trim(bookingCode.value) == '')
	{
		msgStr += '预约流水号不能为空!\n';
	}
	if(bookingCode != null &&trim(bookingCode.value) != ''&&trim(bookingCode.value).length<6)
	{
		msgStr += '预约流水号长度必须大于或者等于六位!\n';
	}
	if((certificateNo == null || trim(certificateNo.value) == '')&&(phoneNumber == null || trim(phoneNumber.value) == ''))
	{
		msgStr += '预约人证件号码或者手机号码不能为空!\n';
	}
	bookingInformationDwr.checkInSystemWork({callback:function(lockStr){
		if(lockStr && lockStr != ''){
			Ext.MessageBox.alert("温馨提示", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	}});
	
	if(msgStr != '')
	{
		Ext.MessageBox.alert("温馨提示", msgStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
		return;
	}
	
	var doUrl = url+"&bookingCode="+bookingCode.value+"&certificateNo="+certificateNo.value+"&phoneNumber="+phoneNumber.value;
	parent.goHref(doUrl);
}
/**
 * 取消预约
 */
function bookWebCancel(bookingInformationOid)
{
	Ext.Msg.confirm('温馨提示','请确认是否取消预约？',function(btn){
		if(btn=='yes'){	
			$.ajax({
				url:'cancelBookWeb.do?method=cancelBookWeb',
				type:'post',
				success:function(o)
				{
 
					if(o && o != '')
					{
						Ext.MessageBox.alert("温馨提示", o+'&nbsp;&nbsp;&nbsp;&nbsp;');
					}
					else
					{
						var successMsg=Ext.MessageBox.alert("温馨提示", '预约取消成功!&nbsp;&nbsp;&nbsp;&nbsp;',function(){
							doCancel('goCancelBookWeb.do?method=goCancelBookWeb');
						});
					}
				},
				data:{bookingInformationOid:bookingInformationOid}
			});
		}     
	});
}
/**
 * 打印回执
 */
function printBookweb(bookingInformationOid)
{
	//var url = "printBookWeb.do?method=printBookWeb&bookingInformationOid="+bookingInformationOid;
	var url = "printBookReceipt.do?method=printBookReceipt&bookingInformationOid="+bookingInformationOid;
	window.open(url);
}
/**
 * 查询后验证
 * @param {} data
 * @return {Boolean}
 */
function afterCheck()
{
	var bookingDate = new Date(buildViewField(workDay).replace(/-/g,'/'));
	
	if(''==todayStr||null==todayStr)
	{
		EI('dataDiv').style.display='';
		EI('dataDiv').innerHTML="<font size='6' color='red'>对不起，没有查询到数据！</font>";
//		Ext.MessageBox.alert("温馨提示", '对不起，没有查询到数据！&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	if('2'==todayStr)
	{

		Ext.MessageBox.alert("温馨提示", '请增加流水号录入位数，如后7位，或者7位以上 &nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	var today = new Date(todayStr.replace(/-/g,'/'));
	var dayBetween = (today.getTime() - bookingDate.getTime())/(3600*24*1000);
	 
	if(dayBetween > parseInt(queryDayBefore))
	{
		if (queryDayBefore == '7') 
		{
			Ext.MessageBox.alert("温馨提示", '对不起，系统不提供预约日期为一周前的预约记录查询。&nbsp;&nbsp;&nbsp;&nbsp;');
		} else {
			Ext.MessageBox.alert("温馨提示", "对不起，系统不提供预约日期为" + queryDayBefore + "天前的预约记录查询。&nbsp;&nbsp;&nbsp;&nbsp;");
		}
		return false;
	}
	return true;
}
function buildViewField(str)
{
	if(str && str != null)
		return str;
	return '';
}
function checkVerificationCode(falg) {
	if ("Y"==falg)
	{
		var verificationCode = EI("verificationCode").value;
		if (verificationCode == null || verificationCode == "") {
			Ext.MessageBox.alert("温馨提示", '请输入动态码！&nbsp;&nbsp;&nbsp;&nbsp;');
			return false;
		}
	}
	return true;
}
function create(){
	var registrationArea = EI("registrationAreaOid").value;
	var bookingDate = EI("bookingDateStr").value;
	var workTime = EI("workTimeSoltOid").value;
	var check=onCreate();
	if ("block" == EI("yy").style.display)
	{
//		if (check==true&&(registrationArea == null || registrationArea == "" || bookingDate == null || bookingDate == "" || workTime == null || workTime == ""))
//		{
//			
//				var confirm=Ext.Msg.confirm('温馨提示','您确定不选择预约时间进行预约吗？</br>为节省您现场排队宝贵时间，建议您进行预约。&nbsp;&nbsp;&nbsp;&nbsp;',function(btn){
//					if(btn=='yes'){	
//						$('form').submit();
//					}     
//				});
//		}else 
		if(check==true){
			if(EI("isXLTr").style.display!='none')
			{
				document.forms[0].action=document.forms[0].action+"&XLType="+XLType;
			}
			$('form').submit();
		}

	}
}
function onCreate()
{
	var szItemNo = EI("szItemNo").value;
	var registrationArea = EI("registrationAreaOid").value;
	var bookingType = EI("bookingType").value;
	var bookingDate = EI("bookingDateStr").value;
	var workTime = EI("workTimeSoltOid").value;
	var proveType = EI("proveType").value;
	var proveCode = EI("proveCode").value;
	var bookingSzAreaOid = EI("bookingSzAreaOid").value;
	var bookingSzAreaName = EI("bookingSzAreaOid").options[EI("bookingSzAreaOid").selectedIndex].text;
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
	
	if(EI("isXLTr").style.display!='none')
	{
		if(XLType == null || XLType == ""){
			Ext.MessageBox.alert("温馨提示", '请选择注销抵押事项小类！&nbsp;&nbsp;&nbsp;&nbsp;');
			
			return false;
		}
	}
	
	if(bookingSzAreaOid == null || bookingSzAreaOid == ""){
		Ext.MessageBox.alert("温馨提示", '请选择房地产所在区！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}

	if(bookingType == null || bookingType == ""){
		Ext.MessageBox.alert("温馨提示", '业务类型错误！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(houseName == null || houseName == ""){
		Ext.MessageBox.alert("温馨提示", '请输入房地产名称！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(houseName.length > 200){
		Ext.MessageBox.alert("温馨提示", '房地产名称长度最多200位！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	
	if(proveType == null || proveType == ""){
		Ext.MessageBox.alert("温馨提示", '请选择权属证明类型！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(proveCode == null || proveCode == ""){
		Ext.MessageBox.alert("温馨提示", '请输入权属证明编号！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(proveCode.length > 100){
		Ext.MessageBox.alert("温馨提示", '权属证明编号长度最多100位！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	else if(!/^\d+$/.test(proveCode))
	{
		Ext.MessageBox.alert("温馨提示", '<table><tr><td>权属证明编号输入不规范，如：</td></tr><tr><td>'
				+'1)深（宝）网预买字（2001）00001号，请输入200100001;</td></tr><tr><td>'
				+'2)深房地字2000541807,请输入2000541807.</td></tr></table>');
		return false;					
	}
	
	if(personName == null || personName == ""){
		Ext.MessageBox.alert("温馨提示", '请输入姓名！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(personName.length > 200){
		Ext.MessageBox.alert("温馨提示", '姓名长度最多100个汉字！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	else if(!/^[\u4e00-\u9fa5]+$/.test(personName))
	{
		Ext.MessageBox.alert("温馨提示", '预约人姓名输入不规范！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(phoneNumber == null || phoneNumber == ""){
		Ext.MessageBox.alert("温馨提示", '请输入手机号码！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(!/^\d{11}$/.test(phoneNumber)){
		Ext.MessageBox.alert("温馨提示", '手机号码格式不正确！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(certificateType == null || certificateType == ""){
		Ext.MessageBox.alert("温馨提示", '请选择证件类型！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(certificateNo == null || certificateNo == ""){
		Ext.MessageBox.alert("温馨提示", '请输入证件号码！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(certificateNo.length > 100){
		Ext.MessageBox.alert("温馨提示", '预约申请人证件号码长度最多100位！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}

	if(certificateType == "1"){
		if(certificateNo.length != '18')
		{
			Ext.MessageBox.alert("温馨提示", '身份证号码长度不正确！&nbsp;&nbsp;&nbsp;&nbsp;');
			return false;
		}
		if(!validIdCode(certificateNo)){
			return false;
		}
	}
	if(registrationArea == null || registrationArea == ""){
		Ext.MessageBox.alert("温馨提示", '请选择办理登记点！&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	if (registrationArea == null || registrationArea == "" || bookingDate == null || bookingDate == "" || workTime == null || workTime == "")
	{
		Ext.MessageBox.alert("温馨提示", '请选择预约时段！&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	DWREngine.setAsync(false);
	var b = true;
	
	if(b == true)
	{		
		bookingInformationDwr.checkHasLock(certificateType,certificateNo,phoneNumber,bookingSzAreaName,proveCode,{callback:function(lockStr){
			if(lockStr && lockStr != ''){
				Ext.MessageBox.alert("温馨提示", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
				b = false;
			}
		}});
	}
		
	if(b == true)
		bookingInformationDwr.checkInSystemWork({callback:function(lockStr){
			if(lockStr && lockStr != ''){
				Ext.MessageBox.alert("温馨提示", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
				b = false;
			}
		}});
	
	if(szItemNo != null && szItemNo != ""&&proveCode != null && proveCode != "" && bookingSzAreaOid!=null )
	{
		if(b == true)
			bookingInformationDwr.countSameBookingOnSameDay(szItemNo, proveCode, bookingSzAreaOid,{callback:function(c){
				if(c && c != ''){
					Ext.MessageBox.alert("温馨提示", c+'&nbsp;&nbsp;&nbsp;&nbsp;');
					b = false;
				}
			}});
	}
	if(bookingDate != null && bookingDate != "")
	{
		if(b == true)
			bookingInformationDwr.checkPreTime(bookingDate,workTime,{callback:function(checkStr){
				if(checkStr && checkStr != ''){
					Ext.MessageBox.alert("温馨提示", checkStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
					b = false;
				}
			}});
	}
	if(b == false){
		return false;
	}
	DWREngine.setAsync(true);
	return true;
}

function fzCreate()
{
	var check=onFzCreate();
	if(check==true){
		$('form').submit();
	}
}

//发证申请校验
function onFzCreate()
{
	var szItemNo = EI("szItemNo").value;
	var personName = EI("personName").value;
	var phoneNumber = EI("phoneNumber").value;
	phoneNumber = trim(phoneNumber);
	EI("phoneNumber").value = phoneNumber;
	var certificateType = EI("certificateType").value;
	var certificateNo = EI("certificateNo").value;
	var registrationAreaOid = EI("registrationAreaOid").value;
	var fzFileNo=EI("fzFileNo").value;
	var bookingDate = EI("bookingDateStr").value;
	var workTime = EI("workTimeSoltOid").value;
	if(personName == null || personName == ""){
		Ext.MessageBox.alert("温馨提示", '请输入姓名！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(personName.length > 200){
		Ext.MessageBox.alert("温馨提示", '姓名长度最多100个汉字！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	else if(!/^[\u4e00-\u9fa5]+$/.test(personName))
	{
		Ext.MessageBox.alert("温馨提示", '预约人姓名输入不规范！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(phoneNumber == null || phoneNumber == ""){
		Ext.MessageBox.alert("温馨提示", '请输入手机号码！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(!/^\d{11}$/.test(phoneNumber)){
		Ext.MessageBox.alert("温馨提示", '手机号码格式不正确！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(certificateType == null || certificateType == ""){
		Ext.MessageBox.alert("温馨提示", '请选择证件类型！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(certificateNo == null || certificateNo == ""){
		Ext.MessageBox.alert("温馨提示", '请输入证件号码！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(certificateNo.length > 100){
		Ext.MessageBox.alert("温馨提示", '预约申请人证件号码长度最多100位！&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}

	if(certificateType == "1"){
		if(certificateNo.length != '18')
		{
			Ext.MessageBox.alert("温馨提示", '身份证号码长度不正确！&nbsp;&nbsp;&nbsp;&nbsp;');
			return false;
		}
		if(!validIdCode(certificateNo)){
			return false;
		}
	}
	if(registrationAreaOid==null||registrationAreaOid==""){
		Ext.MessageBox.alert("温馨提示", '请选择领证登记点！&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	
	if(fzFileNo==null||fzFileNo==""){
		Ext.MessageBox.alert("温馨提示", '请输入文号！&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}else if(fzFileNo)
	{
		var reg=/^(9C-|9D-)(\d{8,9})((-[123456789]){0,1})$/;
		if(fzFileNo.match(reg)==null)
		{
			Ext.MessageBox.alert("温馨提示", '文号输入不规范，请输入受理通知书上文号。格式为：9C-123456789&nbsp;&nbsp;&nbsp;&nbsp;');
			return false;
		}
	}
	
	if (bookingDate == null || bookingDate == "" || workTime == null || workTime == "")
	{
		Ext.MessageBox.alert("温馨提示", '请选择预约时段！&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	DWREngine.setAsync(false);
	var b = true;
	if(b == true)
	{
		bookingInformationDwr.checkHasLockToFz(certificateType,certificateNo,phoneNumber,{callback:function(lockStr){
			if(lockStr && lockStr != ''){
				Ext.MessageBox.alert("温馨提示", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
				b = false;
			}
		}});
	}
		
	if(b == true)
		bookingInformationDwr.checkInSystemWork({callback:function(lockStr){
			if(lockStr && lockStr != ''){
				Ext.MessageBox.alert("温馨提示", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
				b = false;
			}
		}});
	
	if(bookingDate != null && bookingDate != "")
	{
		if(b == true)
			bookingInformationDwr.checkPreTime(bookingDate,workTime,{callback:function(checkStr){
				if(checkStr && checkStr != ''){
					Ext.MessageBox.alert("温馨提示", checkStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
					b = false;
				}
			}});
	}
	if(b == false){
		return false;
	}
	DWREngine.setAsync(true);
	return true;
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
		EI("verification").innerHTML = "动态码已经发送到您的手机，请注意查收!</br>(如果在180秒后还没有收到，请您点击重新发送获取手机动态码)。";
		EI("verification_1").style.display = '';
		setTimeout("resetSendBtnValue(179)",1000);
	}
	else
	{
		EI("verification").innerHTML = "发送动态码异常，请稍后再试！";
	}
	DWREngine.setAsync(true);
	SetIframeHeight();
}
function resetSendBtnValue(mins){
	var sendBtn = EI("sendVerificationBtn");
	EI("verification").innerHTML = "动态码已经发送到您的手机，请注意查收!</br>(如果在180秒后还没有收到，请您点击重新发送获取手机动态码)。";
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

//进度条
function showProgressText()
{
	Ext.MessageBox.show({
						   msg: '正在处理，请等待...',
						   progressText: '处理中...',
						   width:300,
						   wait:true,
						   waitConfig: {interval:200},
						   icon:Ext.MessageBox.WARNING
						});	
}
