GridPanelExtend = Ext.extend(Ext.grid.GridPanel,{
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
					Ext.MessageBox.confirm('��Ϣ', 'ȷ��Ҫ������ѡ��¼?', obj1);
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
			Ext.MessageBox.alert('��Ϣ', response.msg,function(){this.ownerCt.ownerCt.goQuery()},this);
		}
	},
	
	/**
	 * �������(ˢ��store)
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
			Ext.MessageBox.alert('��Ϣ', response.msg,function(){this.store.reload();},this);
		}
		if (response && response.success && response.success == 'fail') {
			Ext.MessageBox.alert('��Ϣ', response.msg,function(){this.store.reload();},this);
		}
     },
	/**
	 * �ϱ��������
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
		    	Ext.Msg.confirm("��ʾ��Ϣ", response.msg,function(btn){
					if (btn == 'yes'){
						//openWindow('printDutyPointAndRemove.do?method=printDutyPointAndRemove&submitReportNo='+response.submitReportNo,screen.availWidth,screen.availHeight,'','yes');
                        window.location = "printOfficeOfficialPointAndRemoveForChuSubmitReport.do?method=officeOfficialPointAndRemoveForChuSubmitReportPrint&submitReportNo="+response.submitReportNo;
					}
				});
		    }else if(response.isPrintSubmit == 'N')
		    {
		    	Ext.MessageBox.alert('��Ϣ', response.msg);
		    }
		}
		this.ownerCt.ownerCt.goQuery();
     },
	/**
	 * �����쳣
	 */
	onAjaxRequestFailure: function(){
		Ext.MessageBox.alert("��ʾ��Ϣ","���������쳣.");
	}
});
