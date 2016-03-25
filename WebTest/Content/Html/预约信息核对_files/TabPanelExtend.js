var TabPanelExtend = Ext.extend(Ext.TabPanel, {
	resizeTabs : false,
	enableTabScroll : true,
	defaults : {autoScroll : true},
	initComponent : function() {
		TabPanelExtend.superclass.initComponent.call(this);
		if (this.panels instanceof Array) {
			for ( var i = 0; i < this.panels.length; i++) {
				var tab = this.add(this.panels[i]).show();
				tab.on('activate', this.handleActivate, this);
			}
		}
	},

	handleActivate : function(tab) {
		tab.updateData();
	},

	updateData : function() {
		if (this.items && this.items.length > 0) {
			if (this.getActiveTab()) {
				this.setActiveTab(this.getActiveTab().getId());
			} else {
				this.setActiveTab(0);
			}
		}
	}
});

Ext.reg('tabExtend', TabPanelExtend);