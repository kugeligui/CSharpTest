var UnitGridPanelExtend = Ext.extend(GridPanelExtend,{
	/**
	 * �������
	 */
	onFinally: function(o){
		var response = function(json) {
			try {
				return eval('(' + json + ')');
			} catch(e) {}
			return null;
		}(o.responseText);
		if (response && response.success && response.success == 'ok') {
			Ext.MessageBox.alert('��Ϣ', response.msg,function(){this.ownerCt.ownerCt.getComponent("queryFormId").goQuery()},this);
		}
	},
	
	/**
	 * У���Ƿ��Ѿ�����
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
	 * У���Ƿ��Ѿ�����������ɻص�
	 */
	onCheckIsCreatedFinally:function(o){
		var response = function(json) {
			try {
				return eval('(' + json + ')');
			} catch(e) {}
			return null;
		}(o.responseText);
		if (response && response.haveCreated && response.haveCreated == 'yes') {
			Ext.MessageBox.alert('��Ϣ', "ҵ���Ѿ����ڣ�����������!");
		}else if(response && response.haveCreated && response.haveCreated == 'fail') {
			Ext.MessageBox.alert('��Ϣ', '���ҵ���Ƿ�������:'+response.msg);
		}else if(response && response.haveCreated && response.haveCreated == 'no'){
			viewport.tbar.addBizInfo(); //������Ϣ����
		}
	}
})