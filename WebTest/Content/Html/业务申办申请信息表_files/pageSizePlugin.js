Ext.namespace('Ext.ux');

Ext.ux.PageSizePlugin = function(config) {
	Ext.apply(this,config);
	defaultStore = new Ext.data.SimpleStore({
            fields: ['text', 'value'],
            data: [['10', 10], ['20', 20], ['30', 30], ['50', 50], ['100', 100]]
        });
    if(!config || !config.store){
    	this.pageStore = defaultStore;
    }else{
		this.pageStore = !config.store ? defaultStore : config.store;
    }
    Ext.ux.PageSizePlugin.superclass.constructor.call(this, {
        store: this.pageStore,
        mode: 'local',
        displayField: 'text',
        valueField: 'value',
        editable: false,
        allowBlank: false,
        triggerAction: 'all',
        width: 45
    });
};

Ext.extend(Ext.ux.PageSizePlugin, Ext.form.ComboBox, {
    init: function(paging) {
        paging.on('render', this.onInitView, this);
    },
    
    /**
     * pageSortHide boolean ������Ϊtrue��ʾ����ҳ����������ѡ���ޱ�ҳ���򡯵�ѡ��򽫻�����,Ĭ��Ϊfalse
     * @desc �÷���
	 *        	bbar:new Ext.PagingToolbar({
	 *		       	pageSize: MaxPageSize,
	 *		       	store: this.store,
	 *		       	displayInfo: true,
	 *		       	displayMsg : '���� {2} ����¼.��ǰ��ʾ {0} - {1}����¼.',
	 *				emptyMsg : 'û�м�¼!',
	 *				plugins: [new Ext.ux.PageSizePlugin({pageSortHide: true|false})]	//���Ϊfalse��Ҳ����plugins: [new Ext.ux.PageSizePlugin()]
	 *	      	} 
     */
    pageSortHide: false,
    
    onInitView: function(paging) {
        paging.add('-',
            this
        );
        if(!this.pageSortHide){
        	this.checkbox = new Ext.form.Checkbox({
    			boxLabel : '�ޱ�ҳ����'
    		});
    		paging.add('-',this.checkbox);
        	
        	if(!paging.store.remoteSort){	//���Զ������Ϊtrue,���ޱ�ҳ���򡯵�ѡ���״̬Ϊ��ѡ��
        		this.checkbox.setValue(true);
        	}
        	this.checkbox.on('check',this.onSortChanged,paging);
        }
        this.setValue(paging.pageSize);
        this.on('select', this.onPageSizeChanged, paging);
    },
    
    onPageSizeChanged: function(combo) {
        this.pageSize = parseInt(combo.getValue());
        this.doLoad(0);
    },
    
    onSortChanged: function(checkbox,checked){
    	if(checked){
    		this.store.remoteSort = false;
    	}else{
    		this.store.remoteSort = true;
    	}
    }
});









Ext.ux.SortPlugin = function(config) {
	Ext.apply(this,config);
    Ext.ux.SortPlugin.superclass.constructor.call(this, {
    			boxLabel : '��ҳ����'
    		});
};

Ext.extend(Ext.ux.SortPlugin, Ext.form.Checkbox, {
    init: function(paging) {
        paging.on('render', this.onInitView, this);
    },
    
    /**
     * pageSortHide boolean ������Ϊtrue��ʾ����ҳ����������ѡ���ޱ�ҳ���򡯵�ѡ��򽫻�����,Ĭ��Ϊfalse
     * @desc �÷���
	 *        	bbar:new Ext.PagingToolbar({
	 *		       	pageSize: MaxPageSize,
	 *		       	store: this.store,
	 *		       	displayInfo: true,
	 *		       	displayMsg : '���� {2} ����¼.��ǰ��ʾ {0} - {1}����¼.',
	 *				emptyMsg : 'û�м�¼!',
	 *				plugins: [new Ext.ux.PageSizePlugin({pageSortHide: true|false})]	//���Ϊfalse��Ҳ����plugins: [new Ext.ux.PageSizePlugin()]
	 *	      	} 
     */
    pageSortHide: false,
    
    onInitView: function(paging) {
        paging.add('-',
            this
        );
        if(!this.pageSortHide){
        	
        	if(!paging.store.remoteSort){	//���Զ������Ϊtrue,���ޱ�ҳ���򡯵�ѡ���״̬Ϊ��ѡ��
        		this.setValue(true);
        	}
        	this.on('check',this.onSortChanged,paging);
        }
        this.on('select', this.onPageSizeChanged, paging);
    },
    
    onSortChanged: function(checkbox,checked){
    	if(checked){
    		this.store.remoteSort = false;
    	}else{
    		this.store.remoteSort = true;
    	}
    }
});

/**
 * ÿҳ���20����¼��store
 * xuhj 2010��3��24�� Add
 */
var pluginStore20 = new Ext.data.SimpleStore({
		            fields: ['text', 'value'],
		            data: [['10', 10], ['20', 20]]
        		});
/**
 * ÿҳ���50����¼��store
 * xuhj 2010��3��29�� Add
 */
var pluginStore50 = new Ext.data.SimpleStore({
		            fields: ['text', 'value'],
		            data: [['10', 10], ['20', 20], ['30', 30], ['50', 50]]
        		});