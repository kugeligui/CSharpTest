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
		Ext.MessageBox.alert("��ܰ��ʾ", "δ����ı�ǩ����ID����'"+ tapID +"'"+"&nbsp;&nbsp;&nbsp;&nbsp;");
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
 * ��ѯ
 */
function doSearch(url)
{
	var certificateNo = EI('c_certificateNo');
	var phoneNumber = EI('c_phoneNumber');
	var msgStr = '';
	if(certificateNo == null || trim(certificateNo.value) == '')
	{
		msgStr += 'ԤԼ��֤�����벻��Ϊ��!\n';
	}
	if(phoneNumber == null || trim(phoneNumber.value) == '')
	{
		msgStr += 'ԤԼ���ֻ����벻��Ϊ��!\n';
	}
	bookingInformationDwr.checkInSystemWork({callback:function(lockStr){
		if(lockStr && lockStr != ''){
			Ext.MessageBox.alert("��ܰ��ʾ", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	}});
	
	if(msgStr != '')
	{
		Ext.MessageBox.alert("��ܰ��ʾ", msgStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
		return;
	}
	
	var doUrl = url+"&certificateNo="+certificateNo.value+"&phoneNumber="+phoneNumber.value;
	parent.goHref(doUrl);
}
/**
 * ȡ��
 */
function doCancel(url)
{
	var bookingCode = EI('c_bookingCode');
	var certificateNo = EI('c_certificateNo');
	var phoneNumber = EI('c_phoneNumber');
	var msgStr = '';
	if(bookingCode == null || trim(bookingCode.value) == '')
	{
		msgStr += 'ԤԼ��ˮ�Ų���Ϊ��!\n';
	}
	if(bookingCode != null &&trim(bookingCode.value) != ''&&trim(bookingCode.value).length<6)
	{
		msgStr += 'ԤԼ��ˮ�ų��ȱ�����ڻ��ߵ�����λ!\n';
	}
	if((certificateNo == null || trim(certificateNo.value) == '')&&(phoneNumber == null || trim(phoneNumber.value) == ''))
	{
		msgStr += 'ԤԼ��֤����������ֻ����벻��Ϊ��!\n';
	}
	bookingInformationDwr.checkInSystemWork({callback:function(lockStr){
		if(lockStr && lockStr != ''){
			Ext.MessageBox.alert("��ܰ��ʾ", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	}});
	
	if(msgStr != '')
	{
		Ext.MessageBox.alert("��ܰ��ʾ", msgStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
		return;
	}
	
	var doUrl = url+"&bookingCode="+bookingCode.value+"&certificateNo="+certificateNo.value+"&phoneNumber="+phoneNumber.value;
	parent.goHref(doUrl);
}
/**
 * ȡ��ԤԼ
 */
function bookWebCancel(bookingInformationOid)
{
	Ext.Msg.confirm('��ܰ��ʾ','��ȷ���Ƿ�ȡ��ԤԼ��',function(btn){
		if(btn=='yes'){	
			$.ajax({
				url:'cancelBookWeb.do?method=cancelBookWeb',
				type:'post',
				success:function(o)
				{
 
					if(o && o != '')
					{
						Ext.MessageBox.alert("��ܰ��ʾ", o+'&nbsp;&nbsp;&nbsp;&nbsp;');
					}
					else
					{
						var successMsg=Ext.MessageBox.alert("��ܰ��ʾ", 'ԤԼȡ���ɹ�!&nbsp;&nbsp;&nbsp;&nbsp;',function(){
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
 * ��ӡ��ִ
 */
function printBookweb(bookingInformationOid)
{
	//var url = "printBookWeb.do?method=printBookWeb&bookingInformationOid="+bookingInformationOid;
	var url = "printBookReceipt.do?method=printBookReceipt&bookingInformationOid="+bookingInformationOid;
	window.open(url);
}
/**
 * ��ѯ����֤
 * @param {} data
 * @return {Boolean}
 */
function afterCheck()
{
	var bookingDate = new Date(buildViewField(workDay).replace(/-/g,'/'));
	
	if(''==todayStr||null==todayStr)
	{
		EI('dataDiv').style.display='';
		EI('dataDiv').innerHTML="<font size='6' color='red'>�Բ���û�в�ѯ�����ݣ�</font>";
//		Ext.MessageBox.alert("��ܰ��ʾ", '�Բ���û�в�ѯ�����ݣ�&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	if('2'==todayStr)
	{

		Ext.MessageBox.alert("��ܰ��ʾ", '��������ˮ��¼��λ�������7λ������7λ���� &nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	var today = new Date(todayStr.replace(/-/g,'/'));
	var dayBetween = (today.getTime() - bookingDate.getTime())/(3600*24*1000);
	 
	if(dayBetween > parseInt(queryDayBefore))
	{
		if (queryDayBefore == '7') 
		{
			Ext.MessageBox.alert("��ܰ��ʾ", '�Բ���ϵͳ���ṩԤԼ����Ϊһ��ǰ��ԤԼ��¼��ѯ��&nbsp;&nbsp;&nbsp;&nbsp;');
		} else {
			Ext.MessageBox.alert("��ܰ��ʾ", "�Բ���ϵͳ���ṩԤԼ����Ϊ" + queryDayBefore + "��ǰ��ԤԼ��¼��ѯ��&nbsp;&nbsp;&nbsp;&nbsp;");
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
			Ext.MessageBox.alert("��ܰ��ʾ", '�����붯̬�룡&nbsp;&nbsp;&nbsp;&nbsp;');
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
//				var confirm=Ext.Msg.confirm('��ܰ��ʾ','��ȷ����ѡ��ԤԼʱ�����ԤԼ��</br>Ϊ��ʡ���ֳ��Ŷӱ���ʱ�䣬����������ԤԼ��&nbsp;&nbsp;&nbsp;&nbsp;',function(btn){
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
			Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ��ע����Ѻ����С�࣡&nbsp;&nbsp;&nbsp;&nbsp;');
			
			return false;
		}
	}
	
	if(bookingSzAreaOid == null || bookingSzAreaOid == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ�񷿵ز���������&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}

	if(bookingType == null || bookingType == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", 'ҵ�����ʹ���&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(houseName == null || houseName == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '�����뷿�ز����ƣ�&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(houseName.length > 200){
		Ext.MessageBox.alert("��ܰ��ʾ", '���ز����Ƴ������200λ��&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	
	if(proveType == null || proveType == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ��Ȩ��֤�����ͣ�&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(proveCode == null || proveCode == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '������Ȩ��֤����ţ�&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(proveCode.length > 100){
		Ext.MessageBox.alert("��ܰ��ʾ", 'Ȩ��֤����ų������100λ��&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	else if(!/^\d+$/.test(proveCode))
	{
		Ext.MessageBox.alert("��ܰ��ʾ", '<table><tr><td>Ȩ��֤��������벻�淶���磺</td></tr><tr><td>'
				+'1)�������Ԥ���֣�2001��00001�ţ�������200100001;</td></tr><tr><td>'
				+'2)�����2000541807,������2000541807.</td></tr></table>');
		return false;					
	}
	
	if(personName == null || personName == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '������������&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(personName.length > 200){
		Ext.MessageBox.alert("��ܰ��ʾ", '�����������100�����֣�&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	else if(!/^[\u4e00-\u9fa5]+$/.test(personName))
	{
		Ext.MessageBox.alert("��ܰ��ʾ", 'ԤԼ���������벻�淶��&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(phoneNumber == null || phoneNumber == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '�������ֻ����룡&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(!/^\d{11}$/.test(phoneNumber)){
		Ext.MessageBox.alert("��ܰ��ʾ", '�ֻ������ʽ����ȷ��&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(certificateType == null || certificateType == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ��֤�����ͣ�&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(certificateNo == null || certificateNo == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '������֤�����룡&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(certificateNo.length > 100){
		Ext.MessageBox.alert("��ܰ��ʾ", 'ԤԼ������֤�����볤�����100λ��&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}

	if(certificateType == "1"){
		if(certificateNo.length != '18')
		{
			Ext.MessageBox.alert("��ܰ��ʾ", '���֤���볤�Ȳ���ȷ��&nbsp;&nbsp;&nbsp;&nbsp;');
			return false;
		}
		if(!validIdCode(certificateNo)){
			return false;
		}
	}
	if(registrationArea == null || registrationArea == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ�����Ǽǵ㣡&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	if (registrationArea == null || registrationArea == "" || bookingDate == null || bookingDate == "" || workTime == null || workTime == "")
	{
		Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ��ԤԼʱ�Σ�&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	DWREngine.setAsync(false);
	var b = true;
	
	if(b == true)
	{		
		bookingInformationDwr.checkHasLock(certificateType,certificateNo,phoneNumber,bookingSzAreaName,proveCode,{callback:function(lockStr){
			if(lockStr && lockStr != ''){
				Ext.MessageBox.alert("��ܰ��ʾ", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
				b = false;
			}
		}});
	}
		
	if(b == true)
		bookingInformationDwr.checkInSystemWork({callback:function(lockStr){
			if(lockStr && lockStr != ''){
				Ext.MessageBox.alert("��ܰ��ʾ", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
				b = false;
			}
		}});
	
	if(szItemNo != null && szItemNo != ""&&proveCode != null && proveCode != "" && bookingSzAreaOid!=null )
	{
		if(b == true)
			bookingInformationDwr.countSameBookingOnSameDay(szItemNo, proveCode, bookingSzAreaOid,{callback:function(c){
				if(c && c != ''){
					Ext.MessageBox.alert("��ܰ��ʾ", c+'&nbsp;&nbsp;&nbsp;&nbsp;');
					b = false;
				}
			}});
	}
	if(bookingDate != null && bookingDate != "")
	{
		if(b == true)
			bookingInformationDwr.checkPreTime(bookingDate,workTime,{callback:function(checkStr){
				if(checkStr && checkStr != ''){
					Ext.MessageBox.alert("��ܰ��ʾ", checkStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
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

//��֤����У��
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
		Ext.MessageBox.alert("��ܰ��ʾ", '������������&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(personName.length > 200){
		Ext.MessageBox.alert("��ܰ��ʾ", '�����������100�����֣�&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	else if(!/^[\u4e00-\u9fa5]+$/.test(personName))
	{
		Ext.MessageBox.alert("��ܰ��ʾ", 'ԤԼ���������벻�淶��&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(phoneNumber == null || phoneNumber == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '�������ֻ����룡&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(!/^\d{11}$/.test(phoneNumber)){
		Ext.MessageBox.alert("��ܰ��ʾ", '�ֻ������ʽ����ȷ��&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(certificateType == null || certificateType == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ��֤�����ͣ�&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}
	if(certificateNo == null || certificateNo == ""){
		Ext.MessageBox.alert("��ܰ��ʾ", '������֤�����룡&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}else if(certificateNo.length > 100){
		Ext.MessageBox.alert("��ܰ��ʾ", 'ԤԼ������֤�����볤�����100λ��&nbsp;&nbsp;&nbsp;&nbsp;');
		
		return false;
	}

	if(certificateType == "1"){
		if(certificateNo.length != '18')
		{
			Ext.MessageBox.alert("��ܰ��ʾ", '���֤���볤�Ȳ���ȷ��&nbsp;&nbsp;&nbsp;&nbsp;');
			return false;
		}
		if(!validIdCode(certificateNo)){
			return false;
		}
	}
	if(registrationAreaOid==null||registrationAreaOid==""){
		Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ����֤�Ǽǵ㣡&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	
	if(fzFileNo==null||fzFileNo==""){
		Ext.MessageBox.alert("��ܰ��ʾ", '�������ĺţ�&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}else if(fzFileNo)
	{
		var reg=/^(9C-|9D-)(\d{8,9})((-[123456789]){0,1})$/;
		if(fzFileNo.match(reg)==null)
		{
			Ext.MessageBox.alert("��ܰ��ʾ", '�ĺ����벻�淶������������֪ͨ�����ĺš���ʽΪ��9C-123456789&nbsp;&nbsp;&nbsp;&nbsp;');
			return false;
		}
	}
	
	if (bookingDate == null || bookingDate == "" || workTime == null || workTime == "")
	{
		Ext.MessageBox.alert("��ܰ��ʾ", '��ѡ��ԤԼʱ�Σ�&nbsp;&nbsp;&nbsp;&nbsp;');
		return false;
	}
	DWREngine.setAsync(false);
	var b = true;
	if(b == true)
	{
		bookingInformationDwr.checkHasLockToFz(certificateType,certificateNo,phoneNumber,{callback:function(lockStr){
			if(lockStr && lockStr != ''){
				Ext.MessageBox.alert("��ܰ��ʾ", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
				b = false;
			}
		}});
	}
		
	if(b == true)
		bookingInformationDwr.checkInSystemWork({callback:function(lockStr){
			if(lockStr && lockStr != ''){
				Ext.MessageBox.alert("��ܰ��ʾ", lockStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
				b = false;
			}
		}});
	
	if(bookingDate != null && bookingDate != "")
	{
		if(b == true)
			bookingInformationDwr.checkPreTime(bookingDate,workTime,{callback:function(checkStr){
				if(checkStr && checkStr != ''){
					Ext.MessageBox.alert("��ܰ��ʾ", checkStr+'&nbsp;&nbsp;&nbsp;&nbsp;');
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
		if(oid=="���Ͷ�̬���쳣�����Ժ����ԣ�")
		{
			flag=false;
		}
		EI("verificationCodeOid").value = oid;
	}});
	if(flag)
	{ 
		var sendBtn = EI("sendVerificationBtn");
		sendBtn.disabled = true;
		sendBtn.value ="(180)���·���";
		EI("verification").innerHTML = "��̬���Ѿ����͵������ֻ�����ע�����!</br>(�����180���û���յ�������������·��ͻ�ȡ�ֻ���̬��)��";
		EI("verification_1").style.display = '';
		setTimeout("resetSendBtnValue(179)",1000);
	}
	else
	{
		EI("verification").innerHTML = "���Ͷ�̬���쳣�����Ժ����ԣ�";
	}
	DWREngine.setAsync(true);
	SetIframeHeight();
}
function resetSendBtnValue(mins){
	var sendBtn = EI("sendVerificationBtn");
	EI("verification").innerHTML = "��̬���Ѿ����͵������ֻ�����ע�����!</br>(�����180���û���յ�������������·��ͻ�ȡ�ֻ���̬��)��";
	EI("verification_1").style.display = '';
	if(mins<=0){
		sendBtn.disabled = false;
		sendBtn.value ="���·���";
	}else{
		sendBtn.disabled = true;
		sendBtn.value ="("+mins+")���·���";
		setTimeout("resetSendBtnValue("+(mins-1)+")",1000);
	}
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
