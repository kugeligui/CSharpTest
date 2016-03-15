var UnitGridPanelExtend = Ext.extend(GridPanelExtend,{
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
			Ext.MessageBox.alert('消息', response.msg,function(){this.ownerCt.ownerCt.getComponent("queryFormId").goQuery()},this);
		}
	},
	
	/**
	 * 校验是否已经新增
	 */
	checkIsCreated:function(itemCode){
		Ext.Ajax.request({
			url: 'checkIsHaveCreated.do?method=getTaskInfoByOuterUserOidAndItemCode&itemCode='+itemCode,
			method: 'post',
			success: this.grid.onCheckIsCreatedFinally,
			failure: this.grid.onAjaxRequestFailure,
			scope: this
		});
	},
	
	/**
	 * 校验是否已经新增操作完成回调
	 */
	onCheckIsCreatedFinally:function(o){
		var response = function(json) {
			try {
				return eval('(' + json + ')');
			} catch(e) {}
			return null;
		}(o.responseText);
		if (response && response.haveCreated && response.haveCreated == 'yes') {
			Ext.MessageBox.alert('消息', "业务已经存在，无需再新增!");
		}else if(response && response.haveCreated && response.haveCreated == 'fail') {
			Ext.MessageBox.alert('消息', '检查业务是否已新增:'+response.msg);
		}else if(response && response.haveCreated && response.haveCreated == 'no'){
			viewport.tbar.addBizInfo(); //新增信息方法
		}
	}
})