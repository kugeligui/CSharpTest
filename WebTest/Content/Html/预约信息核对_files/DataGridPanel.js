var DataGridPanel = Ext.extend(Ext.grid.GridPanel,{
	loadMask: {msg: '������...'},
	
	/**
	 * �ж��Ƿ�Ҫ��ѡ���Ƕ�ѡ
	 */
	doOperate: function(b,obj1,confirmFlag){
    	var c = this.getSelections();
    	if(b){
    		if(c.length == 1){
    			obj1();
    		}else{
    			Ext.MessageBox.alert('����', '��ѡ��һ����¼!');
				this.getSelectionModel().clearSelections();
    		}
    	}else{
    		if (c.length > 0) {
    			if(confirmFlag ==  true){
					Ext.MessageBox.confirm('��Ϣ', 'ȷ��Ҫ������ѡ��¼?', obj1, this);
    			}else{
    				obj1();
    			}
			}else{
				Ext.MessageBox.alert('����', '������Ҫѡ��һ����¼!');
			}	
    	}
    },
    
    /**
     * �õ�ѡ�еļ�¼ID����
     */
    doSelectIds: function(){
    	var ids = new Array();
    	if (this.getSelectionModel().hasSelection()) {
			var records = this.getSelectionModel().getSelections();
			for (var i = 0, len = records.length; i < len; i++) {
				ids[ids.length] = records[i].id;
			}
		}
		return ids;
    },
    
    /**
     * �õ�ѡ�еļ�¼����
     */
    doSelectRecords: function(){
    	var records = new Array();
    	if (this.getSelectionModel().hasSelection()) {
			records = this.getSelectionModel().getSelections();
		}
		return records;    	
    },
    
    /**
	 * �õ�ѡ�е����ݼ���
	 */
	getRecordDatas: function(obj){
		var objs = new Array();
		var records = this.doSelectRecords();
		if(records && records.length > 0){
			for (var i = 0; i < records.length; i++) {
				objs[objs.length] = records[i].data[obj];
			}
		}
		return objs;
	},
    
    change: function(p,rowId,r){
		if(r.data.isActive == 'N'){
			alert("��¼�ѱ�ɾ��,�޷�ѡ��!");
			p.deselectRow(rowId);
    	}
    },
    
    initComponent: function(){
		DataGridPanel.superclass.initComponent.call(this);
		this.on('render',this.showBtn,this);
	},
	
	showBtn: function(){
		if(this.btns instanceof Array){
			for(var i =0; i < this.btns.length; i ++) {
				var el = this.btns[i];
				if(typeof el == "object"){
					el.handler = el.handler?el.handler.createDelegate(this):Ext.emptyFn;
				}
               	this.getTopToolbar().add(el);
			}
		}
	},
    
    /**
	 * �������
	 * @param o ���������Json����
	 * @param fn �ص�����
	 * @param scope ������
	 */
	onFinally : function(o, r, fn){
		var response = function(json) {
			try {
				return eval('(' + json + ')');
			} catch(e) {}
			return null;
		}(o.responseText);
		if (response && response.success && response.success == 'ok') {
			Ext.MessageBox.alert('��Ϣ', response.msg,function(){
				if(fn && fn instanceof Function){
					fn();
				}	
			});
		}
	},
	
	/**
	 * �����쳣
	 */
	onAjaxRequestFailure: function(){
		Ext.MessageBox.alert("��ʾ��Ϣ","���������쳣.");
	},
	
	/**
	 * ���±�����������
	 */
	updateData: function(){
		if(this.url){
			this.store.proxy = new Ext.data.HttpProxy({url:this.url});
		}
		this.store.baseParams = this.params || {};
		if(this.getBottomToolbar()){
			this.store.reload({params: {start: 0, limit:this.getBottomToolbar().pageSize},callback: queryCallBack.createDelegate(this)});
		}else{
			this.store.reload({callback: queryCallBack.createDelegate(this)});
		}
	}
});
/**
 * ����״̬�б�
 * @param paramType ״̬�����ھ�̬���ж���
 */
TaskStatusStore = function(paramType,notInclude){
	this.dicTypeCode = !paramType?"":paramType;
	this.notIncludeItemCode = !notInclude?"":notInclude;
	this.store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url:'listParamOptions.do?method=getParamsData&type='+this.dicTypeCode+'&notInclude='+this.notIncludeItemCode}),
		reader: new Ext.data.JsonReader({
			root: 'rs'
		},[
			{name: 'label'},
          	{name: 'value'}
        ]),
        remoteSort : true
	});
	this.store.load();
	return this.store;
}
/**
 * �Ǽǵ����б�
 */
RegistrationAreaStore = function(){
	this.store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url:'listRegistrationArea.do?method=getRegistrationAreaLabel'}),
		reader: new Ext.data.JsonReader({
			root: 'rs'
		},[
			{name: 'label'},
          	{name: 'value'}
        ]),
        remoteSort : true
	});
	this.store.load();
	return this.store;
}
