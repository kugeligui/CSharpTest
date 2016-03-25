/*
 * Ext JS Library 2.0 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.UpdateManager.defaults.indicatorText="<div class=\"loading-indicator\">加载中...</div>";
if(Ext.View)
{
	Ext.View.prototype.emptyText=""
}if(Ext.grid.Grid)
{
	Ext.grid.Grid.prototype.ddText="{0}行被选中"
}if(Ext.TabPanelItem)
{
	Ext.TabPanelItem.prototype.closeText="关闭该Tab页"
}if(Ext.form.Field)
{
	Ext.form.Field.prototype.invalidText="输入值不合法"
}
Date.monthNames=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
Date.dayNames=["日","一","二","三","四","五","六"];
if(Ext.MessageBox)
{
	Ext.MessageBox.buttonText=
	{
		ok:"确定",cancel:"取消",yes:"是",no:"否"
	}
}if(Ext.util.Format)
{
	Ext.util.Format.date=function (A,B)
	{
		if(!A)
		{
			return ""
		}if(!(A instanceof Date))
		{
			A=new Date(Date.parse(A))
		}return A.dateFormat(B||"y年m月d日")
	}
}if(Ext.DatePicker)
{
	Ext.apply(Ext.DatePicker.prototype,
	{
		todayText:"今天",minText:"日期在最小日期之前",maxText:"日期在最大日期之后",disabledDaysText:"",disabledDatesText:"",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"下月 (Control+Right)",prevText:"上月 (Control+Left)",monthYearText:"选择一个月 (Control+Up/Down 修改年份)",todayTip:"{0} (空格键选择)",format:"Y-m-d",okText:"确定",cancelText:"取消"
	})
}if(Ext.PagingToolbar)
{
	Ext.apply(Ext.PagingToolbar.prototype,
	{
		beforePageText:"第",afterPageText:"页 共 {0} 页",firstText:"第一页",prevText:"上一页",nextText:"下一页",lastText:"最后页",refreshText:"刷新",displayMsg:"显示 {0} - {1}，共 {2} 条",emptyMsg:"没有可显示的数据"
	})
}if(Ext.form.TextField)
{
	Ext.apply(Ext.form.TextField.prototype,
	{
		minLengthText:"该输入项的最小长度是 {0}",maxLengthText:"该输入项的最大长度是 {0}",blankText:"该输入项为必输项",regexText:"",emptyText:null
	})
}if(Ext.form.NumberField)
{
	Ext.apply(Ext.form.NumberField.prototype,
	{
		minText:"该输入项的最小值是 {0}",maxText:"该输入项的最大值是 {0}",nanText:"{0} 不是有效数值"
	})
}if(Ext.form.DateField)
{
	Ext.apply(Ext.form.DateField.prototype,
	{
		disabledDaysText:"禁用",disabledDatesText:"禁用",minText:"该输入项的日期必须在 {0} 之后",maxText:"该输入项的日期必须在 {0} 之前",invalidText:"{0} 是无效的日期 - 必须符合格式： {1}",format:"Y-m-d"
	})
}if(Ext.form.ComboBox)
{
	Ext.apply(Ext.form.ComboBox.prototype,
	{
		loadingText:"加载中...",valueNotFoundText:undefined
	})
}if(Ext.form.VTypes)
{
	Ext.apply(Ext.form.VTypes,
	{
		emailText:"该输入项必须是电子邮件地址，格式如： \"user@domain.com\"",urlText:"该输入项必须是URL地址，格式如： \"http:/"+"/www.domain.com\"",alphaText:"该输入项只能包含字符和_",alphanumText:"该输入项只能包含字符,数字和_"
	})
}if(Ext.grid.GridView)
{
	Ext.apply(Ext.grid.GridView.prototype,
	{
		sortAscText:"升序",sortDescText:"降序",lockText:"锁定列",unlockText:"解锁列",columnsText:"列隐藏/显示"
	})
}if(Ext.grid.PropertyColumnModel)
{
	Ext.apply(Ext.grid.PropertyColumnModel.prototype,
	{
		nameText:"名称",valueText:"值",dateFormat:"y年m月d日"
	})
}if(Ext.layout.BorderLayout.SplitRegion)
{
	Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype,
	{
		splitTip:"拖动可以改变尺寸.",collapsibleSplitTip:"拖动可以改变尺寸. 双击隐藏."
	})
};
