var tdString = "<tr style='text-align: center'><td>���&nbsp;&nbsp;&nbsp;</td><td>�����ˮ��&nbsp;&nbsp;&nbsp;</td><td>ҵ������&nbsp;&nbsp;&nbsp;</td><td>״̬&nbsp;&nbsp;&nbsp;</td><td>ԤԼ����&nbsp;&nbsp;&nbsp;</td><td>ԤԼʱ��&nbsp;&nbsp;&nbsp;</td></tr>";

//  �ص�
function cancelReturn()
{
	parent.win.win.close();
}
//�ɹ��ص�
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
		Ext.MessageBox.alert('��Ϣ', response.msg);
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
		Ext.MessageBox.alert('��Ϣ', response.msg);
	}
}
//�ص�
function queryCallBack(data, arg, successFlag)
{
	if (!successFlag)
	{
		Ext.Msg.show(
		{
			title : '��ʾ��Ϣ',
			msg : '���������쳣,�Ƿ����²�ѯ?',
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
// У������дֵ�ĳ���
function stringLengthOnCut(maxlen, propertyName)
{
	var str1 = "���ܳ���";
	var str2 = "�������ֽ����Զ���ȡ��";
	var str3 = "���ֽ�";

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
		Ext.MessageBox.alert("��ʾ��Ϣ", '[ ' + propertyName + ' ]' + '���ܳ���' + ' ' + maxlen + '���ַ�������:'+maxlen/2+'����</br>' + '���ڲ��ֽ��Զ���ȥ!');
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
