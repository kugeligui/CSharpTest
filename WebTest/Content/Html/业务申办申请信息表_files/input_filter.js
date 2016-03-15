document.attachEvent("onkeyup",mykeyup);    //���� �����ͷ��¼�
document.attachEvent("onkeydown",mykeydown); //���� ���̰����¼�

var xxxxxxxxkeydownLenght = 0; //�õ������ʱ���������ı��ĳ���
var xxxxxxxxkeydownPos = 0;  //��¼Keydown��λ��

//�����¼�ʵ��
function mykeyup(e){
	if(e.srcElement.tagName=="INPUT"||e.srcElement.tagName=="TEXTAREA"){
		//���˲���ת���ļ�������   TAB���س����������£�F1��F12 �ȡ�
		if(e.keyCode>=33&&e.keyCode<=40) return; 
		if(e.keyCode==9) return;
		if(e.keyCode==8) return;
		if(e.keyCode==45) return;
		if(e.keyCode==46) return;
		if(e.keyCode==17) return;
		if(e.keyCode==20) return;
		if(event.ctrlKey&&e.keyCode!=86) return;
		if(event.altKey) return;
		if(event.shiftKey&&(e.keyCode>=33&&e.keyCode<=40)) return;
		if(e.srcElement.value.length){
			var typeValue = e.srcElement.value;
			if(typeValue!=null){
				typeValue = ToDBC(typeValue);
				e.srcElement.value = typeValue;
				//�ƶ���굽��ǰ������λ��
				setCaretPosition(e.srcElement,xxxxxxxxkeydownPos + (e.srcElement.value.length - xxxxxxxxkeydownLenght));
			}
		}
	}
}

//�õ���ǰ������λ�ã���ֹ�����ַ�����ֱ���ƶ����ı�����ǰ��
function mykeydown(e){
	if(e.srcElement.tagName=="INPUT"){
		xxxxxxxxkeydownLenght = e.srcElement.value.length;
		xxxxxxxxkeydownPos = getPositionForInput(e.srcElement);
	}else if(e.srcElement.tagName=="TEXTAREA"){
		xxxxxxxxkeydownLenght = e.srcElement.value.length;
		xxxxxxxxkeydownPos = getPositionForTextArea(e.srcElement);
	}
}
//ת���ֶ�
function ToDBC(txtstring) 
{ 	
	var tmp = ""; 
	
	for(var i=0;i<txtstring.length;i++) 
	{  
	    //ֻת��IF��������ַ������Ҫ���Ӻͼ��٣�������ɾ�������ӡ�
		if(txtstring.charCodeAt(i)<127 &&(
				txtstring.charCodeAt(i) ==	'"'.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	';'.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	'('.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	')'.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	'\''.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	'|'.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	'$'.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	'%'.charCodeAt(0)||
//				txtstring.charCodeAt(i) ==	'@'.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	'<'.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	'>'.charCodeAt(0)||
//				txtstring.charCodeAt(i) ==	'+'.charCodeAt(0)||
//				txtstring.charCodeAt(i) ==	','.charCodeAt(0)||
				txtstring.charCodeAt(i) ==	'#'.charCodeAt(0)
				||txtstring.charCodeAt(i) == 32
				)
		) 
		{ 
			if(txtstring.charCodeAt(i) == 32){ //�ո��ַ�����ת��
				//alert(txtstring.charCodeAt(i));
//				tmp=tmp+String.fromCharCode(12288);
			}else{
				tmp=tmp+String.fromCharCode(txtstring.charCodeAt(i)+65248); 
			}
		}else{
			tmp=tmp+String.fromCharCode(txtstring.charCodeAt(i)); 
		} 
	} 
	return tmp;
}


//����ƶ���������λ��
function setCaretPosition(ctrl, pos){//
	if(ctrl.setSelectionRange)
	{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}
//Input���õ����λ��
function getPositionForInput(ctrl){ 
	var CaretPos = 0; 
	if (document.selection) { // IE Support 
		ctrl.focus(); 
		var Sel = document.selection.createRange(); 
		Sel.moveStart('character', -ctrl.value.length); 
		CaretPos = Sel.text.length; 
	}else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support 
		CaretPos = ctrl.selectionStart; 
	} 
	return (CaretPos); 
} 
//TextArea���õ����λ��	
function getPositionForTextArea(ctrl) { 
	var CaretPos = 0; 
	if(document.selection) {// IE Support 
		ctrl.focus(); 
		var Sel = document.selection.createRange(); 
		var Sel2 = Sel.duplicate(); 
		Sel2.moveToElementText(ctrl); 
		var CaretPos = -1; 
		while(Sel2.inRange(Sel)){ 
			Sel2.moveStart('character'); 
			CaretPos++; 
		} 
	}else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support 
		CaretPos = ctrl.selectionStart; 
	} 
	return (CaretPos); 
} 
