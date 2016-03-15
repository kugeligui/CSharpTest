	//-- mult selector tag	
	function orig2dest(orig,dest,flds)
	{		
		for(var i=0;i<orig.length; i++)
		{
			if (orig.options[i].selected == true)
			{	
				if(isExist(dest,orig.options[i])==false)
				{
					dest.add(new Option(orig.options[i].text,orig.options[i].value));	
				}
			}
		}	
		initSelected(dest,flds);			
	}
	
	function removeOptions(selecter,flds)
	{
		var len = selecter.length;
		var ops = new Array(len);
		var ind = 0;
		for(var i=0; i<len; i++)
		{
			if(selecter.options[i].selected == false)
			{
				ops[ind++] = new Option(selecter.options[i].text,selecter.options[i].value);
			}				
		}
		
		selecter.options.length = 0;			
		for(var i=0; i<ops.length; i++)
		{
			if(ops[i]!=null)
				selecter.add(ops[i]);			
		}

		initSelected(selecter,flds);		
	}
	
	function isExist(selecter,val)
	{	
		for (var i=0; i<selecter.length; i++)
		{	
			if(selecter.options[i].value == val.value)
				return true;
		}
		return false;
	}
	
	function initSelected(selecter,flds)
	{
		var values='';
		for (var i=0; i<selecter.length; i++)
		{	
			values = values + ","+selecter.options[i].value;
		}
		
		if (values.length>1)		
			values = values.substr(1,values.length);
		document.getElementById(flds).value = values;
	}