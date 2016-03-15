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
     * pageSortHide boolean 该属性为true表示隐藏页面排序，所以选择‘限本页排序’的选择框将会隐藏,默认为false
     * @desc 用法：
	 *        	bbar:new Ext.PagingToolbar({
	 *		       	pageSize: MaxPageSize,
	 *		       	store: this.store,
	 *		       	displayInfo: true,
	 *		       	displayMsg : '共有 {2} 条记录.当前显示 {0} - {1}条记录.',
	 *				emptyMsg : '没有记录!',
	 *				plugins: [new Ext.ux.PageSizePlugin({pageSortHide: true|false})]	//如果为false，也可以plugins: [new Ext.ux.PageSizePlugin()]
	 *	      	} 
     */
    pageSortHide: false,
    
    onInitView: function(paging) {
        paging.add('-',
            this
        );
        if(!this.pageSortHide){
        	this.checkbox = new Ext.form.Checkbox({
    			boxLabel : '限本页排序'
    		});
    		paging.add('-',this.checkbox);
        	
        	if(!paging.store.remoteSort){	//如果远程排序为true,则‘限本页排序’的选择框状态为不选择
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
    			boxLabel : '本页排序'
    		});
};

Ext.extend(Ext.ux.SortPlugin, Ext.form.Checkbox, {
    init: function(paging) {
        paging.on('render', this.onInitView, this);
    },
    
    /**
     * pageSortHide boolean 该属性为true表示隐藏页面排序，所以选择‘限本页排序’的选择框将会隐藏,默认为false
     * @desc 用法：
	 *        	bbar:new Ext.PagingToolbar({
	 *		       	pageSize: MaxPageSize,
	 *		       	store: this.store,
	 *		       	displayInfo: true,
	 *		       	displayMsg : '共有 {2} 条记录.当前显示 {0} - {1}条记录.',
	 *				emptyMsg : '没有记录!',
	 *				plugins: [new Ext.ux.PageSizePlugin({pageSortHide: true|false})]	//如果为false，也可以plugins: [new Ext.ux.PageSizePlugin()]
	 *	      	} 
     */
    pageSortHide: false,
    
    onInitView: function(paging) {
        paging.add('-',
            this
        );
        if(!this.pageSortHide){
        	
        	if(!paging.store.remoteSort){	//如果远程排序为true,则‘限本页排序’的选择框状态为不选择
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
 * 每页最多20条记录的store
 * xuhj 2010年3月24日 Add
 */
var pluginStore20 = new Ext.data.SimpleStore({
		            fields: ['text', 'value'],
		            data: [['10', 10], ['20', 20]]
        		});
/**
 * 每页最多50条记录的store
 * xuhj 2010年3月29日 Add
 */
var pluginStore50 = new Ext.data.SimpleStore({
		            fields: ['text', 'value'],
		            data: [['10', 10], ['20', 20], ['30', 30], ['50', 50]]
        		});