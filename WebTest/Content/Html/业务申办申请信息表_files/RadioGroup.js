Ext.namespace('Ext.ux');

Ext.ux.Radio =function(config)
{
    Ext.ux.Radio.superclass.constructor.call(this,config);
    this.group = config.group;
    this.value=config.value;
};
Ext.extend(Ext.ux.Radio ,Ext.form.Radio, {
	onRender : function(ct, position){
		Ext.ux.Radio.superclass.onRender.call(this, ct, position);
			if(this.el && this.el.dom){
				this.el.dom.value = this.value;//make the value for radio is the value user has given!
			}
			this.on('check',this.onCheck);
	},
	clearInvalid : function(){
		this.group.clearInvalid();
	},markInvalid : function(msg){
		this.group.markInvalid(msg);
	},
	onClick : function(){
	
		if(this.el.dom.checked !=this.checked){
			this.group.setValue(this.value);
		}
		
	},
	setValue : function(v){
		this.checked = (v === true || v === 'true' || v == '1' || String(v).toLowerCase() == 'on');
		if(this.el && this.el.dom){
			this.el.dom.checked = this.checked;
			this.el.dom.defaultChecked = this.checked;
			this.group.el.dom.value=this.value;
		}
	},onCheck:function(radio,checked)
	{
		
		Ext.log('radiao change!');
		if(checked)
		{
			var oldValue=this.group.getValue();
			this.group.onChange(this.group,oldValue,this.getValue());
		}
		
		//this.fireEvent('change', this.group, oldValue, newValue);
	},
	getValue : function(){
		if(this.rendered){
			return this.el.dom.value;
		}
		return false;
	}
});
	
Ext.ux.RadioGroup=function(config)
{
	this.radios=config.radios;
	this.defaultValue=config.defaultValue||false;
	Ext.ux.RadioGroup.superclass.constructor.call(this,config);    
};
Ext.extend(Ext.ux.RadioGroup,Ext.form.Field,  {
	defaultAutoCreate:{tag:'input', type:'hidden'},
	onRender : function(ct, position){
			
		Ext.ux.RadioGroup.superclass.onRender.call(this, ct, position);
		this.wrap = this.el.wrap({cls: "x-form-check-wrap"});
		if (this.radios && this.radios instanceof Array) {
			this.els=new Array();
			this.els[0]=this.el;
			for(var i=0;i<this.radios.length;i++){
				var r=this.radios[i];
				this.els[i]=new Ext.ux.Radio(Ext.apply({}, {
					renderTo:this.wrap,
					hideLabel:true,
					group:this
				},r));
				if (this.horizontal) {
					this.els[i].el.up('div.x-form-check-wrap').applyStyles({
						'display': 'inline',
						'padding-left': '5px'
					});
				}
			}
			if(this.hidden)this.hide();
		}
		this.setDefaultValue();
	},initValue : function(){
		//Ext.log('initValue for'+this.name);
		if(this.value !== undefined){
			this.el.dom.value=this.value;
		
		}else if(this.el.dom.value.length > 0){
			this.value=this.el.dom.value;
		}
	},getValue:function()
	{
		if(this.rendered){
			return this.el.dom.value;
		}
		return false;
		/**//*
		if(this.value !== undefined){
			return this.value;
		}else if(this.el.dom.value.length > 0){
			return this.el.dom.value;
		}
		*/
	},setValue:function(v)
	{
		var oldValue=this.getValue();
		if(oldValue==v)return ;
		for(var j=0;j<this.els.length;j++)
		{
			if(this.els[j].value==v)
			{
				this.els[j].setValue(true);
			}
			else
			{
				this.els[j].setValue(false);
			}
		}
		this.el.dom.value=v;
		this.fireEvent('change', this.group, oldValue, v);       
	},
	setDefaultValue:function()
	{
		for(var j=0;j<this.els.length;j++)
		{
			if(this.els[j].value==this.defaultValue)
			{
				this.els[j].setValue(true);
				return;
			}
			else
			{
				if(j<this.els.length-1)
				{
					this.els[j].setValue(false);
				}
				else
				{
					this.els[j].setValue(true);
				}
						
			}	
		}
	},
	// private
	onDestroy : function(){
		if (this.radios && this.radios instanceof Array) {
			var cnt = this.radios.length;
			for(var x=1;x<cnt;x++){
				this.els[x].destroy();
			}
		}
		if(this.wrap){
			this.wrap.remove();
		}
		Ext.ux.RadioGroup.superclass.onDestroy.call(this);
	},
    
	// private
    
	onChange : function(oldValue, newValue){
		this.fireEvent('change', this, oldValue, newValue);
	}

});
Ext.reg('ux-radiogroup', Ext.ux.RadioGroup);
