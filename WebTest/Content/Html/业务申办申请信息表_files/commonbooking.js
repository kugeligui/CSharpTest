var tdString = "<tr style='text-align: center'><td>序号&nbsp;&nbsp;&nbsp;</td><td>申办流水号&nbsp;&nbsp;&nbsp;</td><td>业务类型&nbsp;&nbsp;&nbsp;</td><td>状态&nbsp;&nbsp;&nbsp;</td><td>预约日期&nbsp;&nbsp;&nbsp;</td><td>预约时段&nbsp;&nbsp;&nbsp;</td></tr>";

//  回调
function cancelReturn()
{
	parent.win.win.close();
}
//成功回调
function onFinally(o)
{
	var response = function(json)
	{
		try
		{
			return eval('(' + json + ')');
		} catch (e)
		{
		}
		return null;
	}(o.responseText);
	if (response && response.success && response.success == 'ok')
	{
		Ext.MessageBox.alert('消息', response.msg);
		if(viewport.centerPanel.form){	
			viewport.centerPanel.form.goQuery();
		}else{
			viewport.centerPanel.grid.store.reload({
				params : {
					start : 0,
					limit : viewport.centerPanel.grid.getBottomToolbar().pageSize
				},
				callback : queryCallBack.createDelegate
			});
		}
	} else if (response && response.success && response.success == 'fail')
	{
		Ext.MessageBox.alert('消息', response.msg);
	}
}
//回调
function queryCallBack(data, arg, successFlag)
{
	if (!successFlag)
	{
		Ext.Msg.show(
		{
			title : '提示信息',
			msg : '网络连接异常,是否重新查询?',
			buttons : Ext.Msg.YESNO,
			fn : function(btn)
			{
				if (btn == 'yes')
				{
					if(viewport.centerPanel.form){						
						viewport.centerPanel.form.goQuery();
					}else{
						viewport.centerPanel.grid.store.reload({
							params : {
								start : 0,
								limit : viewport.centerPanel.grid.getBottomToolbar().pageSize
							},
							callback : queryCallBack.createDelegate
						});
					}
				} else
				{
				}
			},
			icon : Ext.MessageBox.QUESTION,
			scope : this
		});
	}
}
// 校验所填写值的长度
function stringLengthOnCut(maxlen, propertyName)
{
	var str1 = "不能超过";
	var str2 = "超出部分将被自动截取！";
	var str3 = "个字节";

	var curlen = 0;
	var str = event.srcElement.value;
	var s = trim(str);
	if (null == s)
		return;
	for (var i = 0; i < s.length; i++)
	{
		if (s.charCodeAt(i) >= 256)
			curlen += 2;
		else
			curlen += 1;
	}
	if (curlen > maxlen)
	{
		Ext.MessageBox.alert("提示信息", '[ ' + propertyName + ' ]' + '不能超过' + ' ' + maxlen + '个字符（汉字:'+maxlen/2+'个）</br>' + '大于部分将自动截去!');
		cut(maxlen);
		event.srcElement.focus();
		event.srcElement.select();
	}
}
function cut(maxlen)
{
	var curlen = 0;
	var str = event.srcElement.value;
	var s = trim(str);

	if (null == s)
		return;
	for (var i = 0; i < s.length; i++)
	{
		if (s.charCodeAt(i) >= 256)
			curlen += 2;
		else
			curlen += 1;

		if (curlen > maxlen)
		{
			event.srcElement.value = s.substring(0, i);
			return;
		}
	}
}
