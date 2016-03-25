var BaseInfoPanel = Ext.extend(Ext.Panel,{
	autoScroll: true,
				
	updateData: function(){
		this.getUpdater().update({
			url: this.url,
			params: this.params,
			method: 'post',
			nocache: false,
			timeout: 30,
			scope: this,
			scripts: (this.scripts === true)?true:false
		});
	}
});

Ext.reg('infoPanel', BaseInfoPanel);