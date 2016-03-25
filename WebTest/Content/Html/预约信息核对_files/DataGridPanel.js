var DataGridPanel = Ext.extend(Ext.grid.GridPanel,{
	loadMask: {msg: '加载中...'},
	
	/**
	 * 判断是否要单选还是多选
	 */
	doOperate: function(b,obj1,confirmFlag){
    	var c = this.getSelections();
    	if(b){
    		if(c.length == 1){
    			obj1();
    		}else{
    			Ext.MessageBox.alert('警告', '请选择一条记录!');
				this.getSelectionModel().clearSelections();
    		}
    	}else{
    		if (c.length > 0) {
    			if(confirmFlag ==  true){
					Ext.MessageBox.confirm('消息', '确认要操作所选记录?', obj1, this);
    			}else{
    				obj1();
    			}
			}else{
				Ext.MessageBox.alert('警告', '最少需要选择一条记录!');
			}	
    	}
    },
    
    /**
     * 得到选中的记录ID集合
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
     * 得到选中的记录集合
     */
    doSelectRecords: function(){
    	var records = new Array();
    	if (this.getSelectionModel().hasSelection()) {
			records = this.getSelectionModel().getSelections();
		}
		return records;    	
    },
    
    /**
	 * 得到选中的数据集合
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
			alert("记录已被删除,无法选择!");
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
	 * 操作完成
	 * @param o 请求回来的Json数据
	 * @param fn 回调函数
	 * @param scope 作用域
	 */
	onFinally : function(o, r, fn){
		var response = function(json) {
			try {
				return eval('(' + json + ')');
			} catch(e) {}
			return null;
		}(o.responseText);
		if (response && response.success && response.success == 'ok') {
			Ext.MessageBox.alert('消息', response.msg,function(){
				if(fn && fn instanceof Function){
					fn();
				}	
			});
		}
	},
	
	/**
	 * 出现异常
	 */
	onAjaxRequestFailure: function(){
		Ext.MessageBox.alert("提示信息","网络连接异常.");
	},
	
	/**
	 * 更新表格里面的数据
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
 * 办理状态列表
 * @param paramType 状态集，在静态类中定义
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
 * 登记地区列表
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
