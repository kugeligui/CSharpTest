GridPanelExtend = Ext.extend(Ext.grid.GridPanel,{
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
					Ext.MessageBox.confirm('消息', '确认要操作所选记录?', obj1);
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
    
    /**
	 * 操作完成
	 */
	onFinally: function(o){
		var response = function(json) {
			try {
				return eval('(' + json + ')');
			} catch(e) {}
			return null;
		}(o.responseText);
		if (response && response.success && response.success == 'ok') {
			Ext.MessageBox.alert('消息', response.msg,function(){this.ownerCt.ownerCt.goQuery()},this);
		}
	},
	
	/**
	 * 操作完成(刷新store)
	 */
	onFinallyForStore: function(o)
    {
   		var response = function(json) {
			try {
				return eval('(' + json + ')');
			} catch(e) {}
			return null;
		}(o.responseText);
		if (response && response.success && response.success == 'ok') {
			Ext.MessageBox.alert('消息', response.msg,function(){this.store.reload();},this);
		}
		if (response && response.success && response.success == 'fail') {
			Ext.MessageBox.alert('消息', response.msg,function(){this.store.reload();},this);
		}
     },
	/**
	 * 上报操作完成
	 */
	onReportFinally: function(o)
    {
   		var response = function(json) {
			try {
				return eval('(' + json + ')');
			} catch(e) {}
			return null;
		}(o.responseText);
		if(response && response.isPrintSubmit)
		{
		    if(response.isPrintSubmit == 'Y')
		    {
		    	Ext.Msg.confirm("提示信息", response.msg,function(btn){
					if (btn == 'yes'){
						//openWindow('printDutyPointAndRemove.do?method=printDutyPointAndRemove&submitReportNo='+response.submitReportNo,screen.availWidth,screen.availHeight,'','yes');
                        window.location = "printOfficeOfficialPointAndRemoveForChuSubmitReport.do?method=officeOfficialPointAndRemoveForChuSubmitReportPrint&submitReportNo="+response.submitReportNo;
					}
				});
		    }else if(response.isPrintSubmit == 'N')
		    {
		    	Ext.MessageBox.alert('消息', response.msg);
		    }
		}
		this.ownerCt.ownerCt.goQuery();
     },
	/**
	 * 出现异常
	 */
	onAjaxRequestFailure: function(){
		Ext.MessageBox.alert("提示信息","网络连接异常.");
	}
});
