document.attachEvent("onkeyup",mykeyup);    //捕获 键盘释放事件
document.attachEvent("onkeydown",mykeydown); //捕获 键盘按下事件

var xxxxxxxxkeydownLenght = 0; //得到输入的时候输入框的文本的长度
var xxxxxxxxkeydownPos = 0;  //记录Keydown的位置

//键盘事件实现
function mykeyup(e){
	if(e.srcElement.tagName=="INPUT"||e.srcElement.tagName=="TEXTAREA"){
		//过滤不用转换的键盘输入   TAB，回车，左右上下，F1－F12 等。
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
				//移动光标到当前输入后的位置
				setCaretPosition(e.srcElement,xxxxxxxxkeydownPos + (e.srcElement.value.length - xxxxxxxxkeydownLenght));
			}
		}
	}
}

//得到当前输入框的位置，防止输入字符后光标直接移动到文本的最前面
function mykeydown(e){
	if(e.srcElement.tagName=="INPUT"){
		xxxxxxxxkeydownLenght = e.srcElement.value.length;
		xxxxxxxxkeydownPos = getPositionForInput(e.srcElement);
	}else if(e.srcElement.tagName=="TEXTAREA"){
		xxxxxxxxkeydownLenght = e.srcElement.value.length;
		xxxxxxxxkeydownPos = getPositionForTextArea(e.srcElement);
	}
}
//转换字段
function ToDBC(txtstring) 
{ 	
	var tmp = ""; 
	
	for(var i=0;i<txtstring.length;i++) 
	{  
	    //只转换IF条件里的字符，如果要增加和减少，在这里删除和增加。
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
			if(txtstring.charCodeAt(i) == 32){ //空格字符进行转换
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


//光标移动到输入后的位置
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
//Input结点得到光标位置
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
//TextArea结点得到光标位置	
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
