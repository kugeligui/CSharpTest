var ModalDialogWindow = function() { 
    this.constructor(); 
    this.window = Ext.extend(Ext.Window,{ 
        closeable:true, 
        closeAction:'close', 
        draggable:true,
        plain:true, //覆写父类中的plain属性值
        modal:true //覆写父类中的modal属性值
    }); 
} 
ModalDialogWindow.prototype.initialize = function(obj) { 
    //if(!IsArray(obj)) { 
        if (typeof(obj) == 'string') { 
            obj = obj.split(';'); 
            for(var i = 0; i < obj.length; i++) { 
                obj[i] = obj[i].split(':'); 
                switch(obj[i][0]) { 
	                case 'title': this.title = obj[i][1];break; 
                    case 'dialogHeight': this.dialogHeight = parseInt(obj[i][1]);break; 
                    case 'dialogWidth': this.dialogWidth = parseInt(obj[i][1]);break; 
                    case 'dialogLeft': this.dialogLeft = parseInt(obj[i][1]);break; 
                    case 'dialogTop': this.dialogTop = parseInt(obj[i][1]);break; 
                    case 'resizable': this.resizable = obj[i][1];break; 
                    case 'scroll': this.scroll = obj[i][1];break;
                    case 'maximizable': this.maximizable = obj[i][1];break;  
                    case 'max': this.max =  obj[i][1];break; 
                    case 'animateTarget': this.animateTarget = obj[i][1];break;
                    case 'tbar': this.tbar = obj[i][1];break;
                } 
           } 

        } else if(typeof(obj) == 'object') { 
            for(var index in obj) { 
                switch(index) { 
	                case 'title': this.title = obj[index];break; 
                    case 'dialogHeight': this.dialogHeight = parseInt(obj[index]);break; 
                    case 'dialogWidth': this.dialogWidth = parseInt(obj[index]);break; 
                    case 'dialogLeft': this.dialogLeft = parseInt(obj[index]);break; 
                    case 'dialogTop': this.dialogTop = parseInt(obj[index]);break; 
                    case 'resizable': this.resizable = obj[index];break; 
                    case 'scroll': this.scroll = obj[index];break; 
                    case 'maximizable': this.maximizable = obj[index];break;  
                    case 'max': this.max =  obj[index];break; 
                    case 'animateTarget':this.animateTarget = obj[index];break;
                    case 'tbar': this.tbar = obj[index];break;
                } 
            } 
        } 
  //  } 
}; 
ModalDialogWindow.prototype.constructor = function() { 
    this.obj = this; 
    this.returnValue = null; 
    this.win = {}; 
    // showModalDialog arguments 
    this.sURL = ''; 
    this.dialogArguments = null; 
    //sFeatures arguments 
    this.dialogHeight = 100; 
    this.dialogWidth = 100; 
    this.dialogLeft = 0; 
    this.dialogTop = 0; 
    this.resizable = false; 
    this.scroll = true; 
    this.title = ''; 
    this.html = ''; 
    this.max = true;
    this.maximizable = false;
    this.animateTarget = '';
    this.tbar = new Ext.Toolbar();
}; 
ModalDialogWindow.prototype.destroy = function() { 
    this.constructor.call(this); 
} 
var i =0;
ModalDialogWindow.prototype.showModalDialog = function(sURL,vArguments,sFeatures) { 
    if(this.sURL != '') {this.destroy()} 
    this.sURL = sURL; 
    if(arguments.length < 3) {sFeatures = vArguments;vArguments = null;} 
    this.dialogArguments = vArguments?vArguments:null; 
    this.initialize(sFeatures); 
    window.win = this.obj; 
    this.html = '<iframe id="mdFrame" style="width:100%;height:100%" name="mdFrame" src="' + this.sURL + '"></iframe>'; 
    this.win = new this.window({ 
        id: 'mdWin'+i, //原来的BUG是因为我们所有window起的名字都一样，现在动态生成ID即可解决以前的问题。
        title: this.title, 
        resizable: this.resizable, 
        width: this.dialogWidth, 
        height: this.dialogHeight, 
        maximizable: this.maximizable,  
        animateTarget: this.animateTarget,
        tbar: this.tbar,
        constrainHeader:true,//True 表示为将 window header约束在视图中显示
        html: this.html
    }); 
    this.win.addListener({ 
        'show':function(obj) {
        	i++;
        	if((this.max == true || this.max == 'true') && (this.maximizable == true || this.maximizable == 'true')){
        		obj.maximize();
        	}
        }.createDelegate(this), 
        'close':function() {window.win = null;} 
    }); 

    this.win.show(); 
}; 
