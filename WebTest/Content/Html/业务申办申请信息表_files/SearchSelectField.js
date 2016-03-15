/**
 * @author taoy
 * @description 用于调入单位查询选择和清除。
 */
SearchSelectField = Ext.extend(Ext.form.TwinTriggerField,{
	onRender : function(ct, position){
        SearchSelectField.superclass.onRender.call(this, ct, position);
        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName, id: (this.hiddenId||this.hiddenName)},
                    'before', true);
            this.hiddenField.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';

            // prevent input submission
            this.el.dom.removeAttribute('name');
        }
	},
	
	validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:false,
    //hasSearch : false,
    paramName : 'query',
    
    /**
     * 点击清除按钮的操作，该函数在页面上自定义调用
     */
    onOneClick: Ext.emptyFn,
    
    /**
     * 点击查询按钮的操作，该函数在页面上自定义调用
     */
    onTwoClick: Ext.emptyFn,
    
    /**
     * 点击清除按钮的默认操作
     */
    onTrigger1Click : function(){
       	this.onOneClick();
        this.el.dom.value = '';
        if(this.hiddenField){
        	this.hiddenField.value = '';
        }
    },

	/**
	 * 点击查询按钮的默认操作
	 */
    onTrigger2Click : function(){
        this.onTwoClick();
    },
    
    setValue: function(v){
    	SearchSelectField.superclass.setValue.call(this,v);
    	if(this.hiddenField){
    		this.hiddenField.value = v;
    	}
    },
    // private
    onBlur : function(){
    	SearchSelectField.superclass.onBlur.call(this);
        this.beforeBlur();
        if(!Ext.isOpera && this.focusClass){ // don't touch in Opera
            this.el.removeClass(this.focusClass);
        }
        this.hasFocus = false;
        if(this.validationEvent !== false && this.validateOnBlur && this.validationEvent != "blur"){
            this.validate();
        }
        var v = this.getValue();
        if(String(v) !== String(this.startValue)){
            this.fireEvent('change', this, v, this.startValue);
        }
        this.fireEvent("blur", this);
    }
});

Ext.reg('searchfield', SearchSelectField);