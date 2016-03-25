/**
 * @author taoy
 * @description ���ڵ��뵥λ��ѯѡ��������
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
     * ��������ť�Ĳ������ú�����ҳ�����Զ������
     */
    onOneClick: Ext.emptyFn,
    
    /**
     * �����ѯ��ť�Ĳ������ú�����ҳ�����Զ������
     */
    onTwoClick: Ext.emptyFn,
    
    /**
     * ��������ť��Ĭ�ϲ���
     */
    onTrigger1Click : function(){
       	this.onOneClick();
        this.el.dom.value = '';
        if(this.hiddenField){
        	this.hiddenField.value = '';
        }
    },

	/**
	 * �����ѯ��ť��Ĭ�ϲ���
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