/**
 * 重写ComboBox resizable属性，使用户可以自动调整下拉宽高度
 */
Ext.override(Ext.form.ComboBox,{
	resizable: true
});

/**
 * 重写数据源的排序方法
 */
Ext.override(Ext.data.Store,{
	// private
    applySort : function(){        //重载 applySort   
  		if(this.sortInfo && !this.remoteSort){
            var s = this.sortInfo, f = s.field;
            var st = this.fields.get(f).sortType;
            var fn = function(r1, r2){
            	var v1 = st(r1.data[f]), v2 = st(r2.data[f]);
                // 添加:修复汉字排序 让汉字排序按本地字符集排序
                if(typeof(v1) == "string"){ //若为字符串，
                	return v1.localeCompare(v2);//则用 localeCompare 比较汉字字符串, Firefox 与 IE 均支持
                }
                // 添加结束
                return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
            };
            this.data.sort(s.direction, fn);
            if(this.snapshot && this.snapshot != this.data){
            	this.snapshot.sort(s.direction, fn);
            }
        }
	} 
});

/**
 * 重写Connection的request属性
 * 重写Connection的TimeOut属性
 * 在请求的URL中增加Ext请求标识&_req=ext
 * @author      xuhj
 * @created     2009-1-9 10:12:38
 * @version     1.0
 */
Ext.override(Ext.data.Connection,{
	timeout : 60000,//默认超时时间由30秒改成了该时间
	
	// private
    request : function(o){
        if(this.fireEvent("beforerequest", this, o) !== false){
            var p = o.params;

            if(typeof p == "function"){
                p = p.call(o.scope||window, o);
            }
            if(typeof p == "object"){
                p = Ext.urlEncode(p);
            }
            if(this.extraParams){
                var extras = Ext.urlEncode(this.extraParams);
                p = p ? (p + '&' + extras) : extras;
            }

            var url = o.url || this.url;
            if(typeof url == 'function'){
                url = url.call(o.scope||window, o);
            }

            if(o.form){
                var form = Ext.getDom(o.form);
                url = url || form.action;

                var enctype = form.getAttribute("enctype");
                if(o.isUpload || (enctype && enctype.toLowerCase() == 'multipart/form-data')){
                    return this.doFormUpload(o, p, url);
                }
                var f = Ext.lib.Ajax.serializeForm(form);
                p = p ? (p + '&' + f) : f;
            }

            var hs = o.headers;
            if(this.defaultHeaders){
                hs = Ext.apply(hs || {}, this.defaultHeaders);
                if(!o.headers){
                    o.headers = hs;
                }
            }

            var cb = {
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {options: o},
                timeout : this.timeout
            };

            var method = o.method||this.method||(p ? "POST" : "GET");
            if(method == 'GET' && (this.disableCaching && o.disableCaching !== false) || o.disableCaching === true){
                url += (url.indexOf('?') != -1 ? '&' : '?') + '_dc=' + (new Date().getTime());
               
            }

            if(typeof o.autoAbort == 'boolean'){ 
                if(o.autoAbort){
                    this.abort();
                }
            }else if(this.autoAbort !== false){
                this.abort();
            }
            if((method == 'GET' && p) || o.xmlData || o.jsonData){
                url += (url.indexOf('?') != -1 ? '&' : '?') + p;
                p = '';
                
            }
            //增加ext标识
            url += (url.indexOf('?') != -1 ? '&' : '?') + '_req=ext' ;
            this.transId = Ext.lib.Ajax.request(method, url, cb, p, o);
            return this.transId;
        }else{
            Ext.callback(o.callback, o.scope, [o, null, null]);
            return null;
        }
    },
    
	/**
	 * 重写Connection的handleResponse属性
	 * 考虑到安全过滤
	 * @author      xuhj
	 * @created     2009-1-9 10:12:38
	 * @version     1.0
	 */
	// private
    handleResponse : function(response){
        this.transId = false;
           
        var responseMsg = function(json) {
			try {
				return eval('({' + json + '})');
			} catch(e) {}
			return null;
		}(response.responseText);
		
		if (responseMsg && responseMsg.warning) {
			Ext.MessageBox.alert('警告', responseMsg.warning);
		}
		
        var options = response.argument.options;
         
        response.argument = options ? options.argument : null;
        this.fireEvent("requestcomplete", this, response, options);
        Ext.callback(options.success, options.scope, [response, options]);
        Ext.callback(options.callback, options.scope, [options, true, response]);
        
    }
});

Ext.MessageBox1 = function(){
    var dlg, opt, mask, waitTimer;
    var bodyEl, msgEl, textboxEl, textareaEl, progressBar, pp, iconEl, spacerEl;
    var buttons, activeTextEl, bwidth, iconCls = '';

    // private
    var handleButton = function(button){
        dlg.hide();
        Ext.callback(opt.fn, opt.scope||window, [button, activeTextEl.dom.value], 1);
    };

    // private
    var handleHide = function(){
        if(opt && opt.cls){
            dlg.el.removeClass(opt.cls);
        }
        progressBar.reset();
    };

    // private
    var handleEsc = function(d, k, e){
        if(opt && opt.closable !== false){
            dlg.hide();
        }
        if(e){
            e.stopEvent();
        }
    };

    // private
    var updateButtons = function(b){
        var width = 0;
        if(!b){
            buttons["ok"].hide();
            buttons["cancel"].hide();
            buttons["yes"].hide();
            buttons["no"].hide();
            return width;
        }
        dlg.footer.dom.style.display = '';
        for(var k in buttons){
            if(typeof buttons[k] != "function"){
                if(b[k]){
                    buttons[k].show();
                    buttons[k].setText(typeof b[k] == "string" ? b[k] : Ext.MessageBox.buttonText[k]);
                    width += buttons[k].el.getWidth()+15;
                }else{
                    buttons[k].hide();
                }
            }
        }
        return width;
    };

    return {
        /**
         * Returns a reference to the underlying {@link Ext.Window} element
         * @return {Ext.Window} The window
         */
        getDialog : function(titleText){
           if(!dlg){
                dlg = new Ext.Window({
                    autoCreate : true,
                    title:titleText,
                    resizable:false,
                    constrain:true,
                    constrainHeader:true,
                    minimizable : false,
                    maximizable : false,
                    stateful: false,
                    modal: true,
                    shim:true,
                    buttonAlign:"center",
                    width:400,
                    height:100,
                    minHeight: 80,
                    plain:true,
                    footer:true,
                    closable:true,
                    close : function(){
                        if(opt && opt.buttons && opt.buttons.no && !opt.buttons.cancel){
                            handleButton("no");
                        }else{
                            handleButton("cancel");
                        }
                    }
                });
                buttons = {};
                var bt = this.buttonText;
                //TODO: refactor this block into a buttons config to pass into the Window constructor
                buttons["ok"] = dlg.addButton(bt["ok"], handleButton.createCallback("ok"));
                buttons["yes"] = dlg.addButton(bt["yes"], handleButton.createCallback("yes"));
                buttons["no"] = dlg.addButton(bt["no"], handleButton.createCallback("no"));
                buttons["cancel"] = dlg.addButton(bt["cancel"], handleButton.createCallback("cancel"));
                buttons["ok"].hideMode = buttons["yes"].hideMode = buttons["no"].hideMode = buttons["cancel"].hideMode = 'offsets';
                dlg.render(document.body);
                dlg.getEl().addClass('x-window-dlg');
                mask = dlg.mask;
                bodyEl = dlg.body.createChild({
                    html:'<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text"></span><br /><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div>'
                });
                iconEl = Ext.get(bodyEl.dom.firstChild);
                var contentEl = bodyEl.dom.childNodes[1];
                msgEl = Ext.get(contentEl.firstChild);
                textboxEl = Ext.get(contentEl.childNodes[2]);
                textboxEl.enableDisplayMode();
                textboxEl.addKeyListener([10,13], function(){
                    if(dlg.isVisible() && opt && opt.buttons){
                        if(opt.buttons.ok){
                            handleButton("ok");
                        }else if(opt.buttons.yes){
                            handleButton("yes");
                        }
                    }
                });
                textareaEl = Ext.get(contentEl.childNodes[3]);
                textareaEl.enableDisplayMode();
                progressBar = new Ext.ProgressBar({
                    renderTo:bodyEl
                });
               bodyEl.createChild({cls:'x-clear'});
            }
            return dlg;
        },

        /**
         * Updates the message box body text
         * @param {String} text (optional) Replaces the message box element's innerHTML with the specified string (defaults to
         * the XHTML-compliant non-breaking space character '&amp;#160;')
         * @return {Ext.MessageBox} this
         */
        updateText : function(text){
            if(!dlg.isVisible() && !opt.width){
                dlg.setSize(this.maxWidth, 100); // resize first so content is never clipped from previous shows
            }
            msgEl.update(text || '&#160;');

            var iw = iconCls != '' ? (iconEl.getWidth() + iconEl.getMargins('lr')) : 0;
            var mw = msgEl.getWidth() + msgEl.getMargins('lr');
            var fw = dlg.getFrameWidth('lr');
            var bw = dlg.body.getFrameWidth('lr');
            if (Ext.isIE && iw > 0){
                //3 pixels get subtracted in the icon CSS for an IE margin issue,
                //so we have to add it back here for the overall width to be consistent
                iw += 3;
            }
            var w = Math.max(Math.min(opt.width || iw+mw+fw+bw, this.maxWidth),
                        Math.max(opt.minWidth || this.minWidth, bwidth || 0));

            if(opt.prompt === true){
                activeTextEl.setWidth(w-iw-fw-bw);
            }
            if(opt.progress === true || opt.wait === true){
                progressBar.setSize(w-iw-fw-bw);
            }
            dlg.setSize(w, 'auto').center();
            return this;
        },

        /**
         * Updates a progress-style message box's text and progress bar.  Only relevant on message boxes
         * initiated via {@link Ext.MessageBox#progress} or by calling {@link Ext.MessageBox#show} with progress: true.
         * @param {Number} value Any number between 0 and 1 (e.g., .5, defaults to 0)
         * @param {String} progressText The progress text to display inside the progress bar (defaults to '')
         * @param {String} msg The message box's body text is replaced with the specified string (defaults to undefined
         * so that any existing body text will not get overwritten by default unless a new value is passed in)
         * @return {Ext.MessageBox} this
         */
        updateProgress : function(value, progressText, msg){
            progressBar.updateProgress(value, progressText);
            if(msg){
                this.updateText(msg);
            }
            return this;
        },

        /**
         * Returns true if the message box is currently displayed
         * @return {Boolean} True if the message box is visible, else false
         */
        isVisible : function(){
            return dlg && dlg.isVisible();
        },

        /**
         * Hides the message box if it is displayed
         * @return {Ext.MessageBox} this
         */
        hide : function(){
            if(this.isVisible()){
                dlg.hide();
                handleHide();
            }
            return this;
        },

        /**
         * Displays a new message box, or reinitializes an existing message box, based on the config options
         * passed in. All display functions (e.g. prompt, alert, etc.) on MessageBox call this function internally,
         * although those calls are basic shortcuts and do not support all of the config options allowed here.
         * The following config object properties are supported:
         * <pre>
Property          Type             Description
----------------  ---------------  -----------------------------------------------------------------------------
animEl            String/Element   An id or Element from which the message box should animate as it opens and
                                   closes (defaults to undefined)
buttons           Object/Boolean   A button config object (e.g., Ext.MessageBox.OKCANCEL or {ok:'Foo',
                                   cancel:'Bar'}), or false to not show any buttons (defaults to false)
closable          Boolean          False to hide the top-right close button (defaults to true).  Note that
                                   progress and wait dialogs will ignore this property and always hide the
                                   close button as they can only be closed programmatically.
cls               String           A custom CSS class to apply to the message box element
defaultTextHeight Number           The default height in pixels of the message box's multiline textarea if
                                   displayed (defaults to 75)
fn                Function         A callback function to execute after closing the dialog.  The arguments to the
                                   function will be btn (the name of the button that was clicked, if applicable,
                                   e.g. "ok"), and text (the value of the active text field, if applicable).
                                   Progress and wait dialogs will ignore this option since they do not respond to
                                   user actions and can only be closed programmatically, so any required function
                                   should be called by the same code after it closes the dialog.
icon              String           A CSS class that provides a background image to be used as an icon for
                                   the dialog (e.g., Ext.MessageBox.WARNING or 'custom-class', defaults to '')
maxWidth          Number           The maximum width in pixels of the message box (defaults to 600)
minWidth          Number           The minimum width in pixels of the message box (defaults to 100)
modal             Boolean          False to allow user interaction with the page while the message box is
                                   displayed (defaults to true)
msg               String           A string that will replace the existing message box body text (defaults
                                   to the XHTML-compliant non-breaking space character '&#160;')
multiline         Boolean          True to prompt the user to enter multi-line text (defaults to false)
progress          Boolean          True to display a progress bar (defaults to false)
progressText      String           The text to display inside the progress bar if progress = true (defaults to '')
prompt            Boolean          True to prompt the user to enter single-line text (defaults to false)
proxyDrag         Boolean          True to display a lightweight proxy while dragging (defaults to false)
title             String           The title text
value             String           The string value to set into the active textbox element if displayed
wait              Boolean          True to display a progress bar (defaults to false)
waitConfig        Object           A {@link Ext.ProgressBar#waitConfig} object (applies only if wait = true)
width             Number           The width of the dialog in pixels
</pre>
         *
         * Example usage:
         * <pre><code>
Ext.Msg.show({
   title: 'Address',
   msg: 'Please enter your address:',
   width: 300,
   buttons: Ext.MessageBox.OKCANCEL,
   multiline: true,
   fn: saveAddress,
   animEl: 'addAddressBtn',
   icon: Ext.MessagBox.INFO
});
</code></pre>
         * @param {Object} config Configuration options
         * @return {Ext.MessageBox} this
         */
        show : function(options){
            if(this.isVisible()){
                this.hide();
            }
            opt = options;
            var d = this.getDialog(opt.title || "&#160;");

            d.setTitle(opt.title || "&#160;");
            var allowClose = (opt.closable !== false && opt.progress !== true && opt.wait !== true);
            d.tools.close.setDisplayed(allowClose);
            activeTextEl = textboxEl;
            opt.prompt = opt.prompt || (opt.multiline ? true : false);
            if(opt.prompt){
                if(opt.multiline){
                    textboxEl.hide();
                    textareaEl.show();
                    textareaEl.setHeight(typeof opt.multiline == "number" ?
                        opt.multiline : this.defaultTextHeight);
                    activeTextEl = textareaEl;
                }else{
                    textboxEl.show();
                    textareaEl.hide();
                }
            }else{
                textboxEl.hide();
                textareaEl.hide();
            }
            activeTextEl.dom.value = opt.value || "";
            if(opt.prompt){
                d.focusEl = activeTextEl;
            }else{
                var bs = opt.buttons;
                var db = null;
                if(bs && bs.cancel){
                    db = buttons["cancel"];
                }else if(bs && bs.no){
                    db = buttons["no"];
                }
                if (db){
                    d.focusEl = db;
                }
            }
            this.setIcon(opt.icon);
            bwidth = updateButtons(opt.buttons);
            progressBar.setVisible(opt.progress === true || opt.wait === true);
            this.updateProgress(0, opt.progressText);
            this.updateText(opt.msg);
            if(opt.cls){
                d.el.addClass(opt.cls);
            }
            d.proxyDrag = opt.proxyDrag === true;
            d.modal = opt.modal !== false;
            d.mask = opt.modal !== false ? mask : false;
            if(!d.isVisible()){
                // force it to the end of the z-index stack so it gets a cursor in FF
                document.body.appendChild(dlg.el.dom);
                d.setAnimateTarget(opt.animEl);
                d.show(opt.animEl);
            }

            //workaround for window internally enabling keymap in afterShow
            d.on('show', function(){
                if(allowClose === true){
                    d.keyMap.enable();
                }else{
                    d.keyMap.disable();
                }
            });

            if(opt.wait === true){
                progressBar.wait(opt.waitConfig);
            }
            return this;
        },

        /**
         * Adds the specified icon to the dialog.  By default, the class 'ext-mb-icon' is applied for default
         * styling, and the class passed in is expected to supply the background image url. Pass in empty string ('')
         * to clear any existing icon.  The following built-in icon classes are supported, but you can also pass
         * in a custom class name:
         * <pre>
Ext.MessageBox.INFO
Ext.MessageBox.WARNING
Ext.MessageBox.QUESTION
Ext.MessageBox.ERROR
         *</pre>
         * @param {String} icon A CSS classname specifying the icon's background image url, or empty string to clear the icon
         * @return {Ext.MessageBox} this
         */
        setIcon : function(icon){
            if(icon && icon != ''){
                iconEl.removeClass('x-hidden');
                iconEl.replaceClass(iconCls, icon);
                iconCls = icon;
            }else{
                iconEl.replaceClass(iconCls, 'x-hidden');
                iconCls = '';
            }
            return this;
        },

        /**
         * Displays a message box with a progress bar.  This message box has no buttons and is not closeable by
         * the user.  You are responsible for updating the progress bar as needed via {@link Ext.MessageBox#updateProgress}
         * and closing the message box when the process is complete.
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {String} progressText The text to display inside the progress bar (defaults to '')
         * @return {Ext.MessageBox} this
         */
        progress : function(title, msg, progressText){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                progress:true,
                closable:false,
                minWidth: this.minProgressWidth,
                progressText: progressText
            });
            return this;
        },

        /**
         * Displays a message box with an infinitely auto-updating progress bar.  This can be used to block user
         * interaction while waiting for a long-running process to complete that does not have defined intervals.
         * You are responsible for closing the message box when the process is complete.
         * @param {String} msg The message box body text
         * @param {String} title (optional) The title bar text
         * @param {Object} config (optional) A {@link Ext.ProgressBar#waitConfig} object
         * @return {Ext.MessageBox} this
         */
        wait : function(msg, title, config){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                closable:false,
                wait:true,
                modal:true,
                minWidth: this.minProgressWidth,
                waitConfig: config
            });
            return this;
        },

        /**
         * Displays a standard read-only message box with an OK button (comparable to the basic JavaScript alert prompt).
         * If a callback function is passed it will be called after the user clicks the button, and the
         * id of the button that was clicked will be passed as the only parameter to the callback
         * (could also be the top-right close button).
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @return {Ext.MessageBox} this
         */
        alert : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OK,
                fn: fn,
                scope : scope
            });
            return this;
        },

        /**
         * Displays a confirmation message box with Yes and No buttons (comparable to JavaScript's confirm).
         * If a callback function is passed it will be called after the user clicks either button,
         * and the id of the button that was clicked will be passed as the only parameter to the callback
         * (could also be the top-right close button).
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @return {Ext.MessageBox} this
         */
        confirm : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.YESNO,
                fn: fn,
                scope : scope,
                icon: this.QUESTION
            });
            return this;
        },

        /**
         * Displays a message box with OK and Cancel buttons prompting the user to enter some text (comparable to JavaScript's prompt).
         * The prompt can be a single-line or multi-line textbox.  If a callback function is passed it will be called after the user
         * clicks either button, and the id of the button that was clicked (could also be the top-right
         * close button) and the text that was entered will be passed as the two parameters to the callback.
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @param {Boolean/Number} multiline (optional) True to create a multiline textbox using the defaultTextHeight
         * property, or the height in pixels to create the textbox (defaults to false / single-line)
         * @return {Ext.MessageBox} this
         */
        prompt : function(title, msg, fn, scope, multiline){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OKCANCEL,
                fn: fn,
                minWidth:250,
                scope : scope,
                prompt:true,
                multiline: multiline
            });
            return this;
        },

        /**
         * Button config that displays a single OK button
         * @type Object
         */
        OK : {ok:true},
        /**
         * Button config that displays a single Cancel button
         * @type Object
         */
        CANCEL : {cancel:true},
        /**
         * Button config that displays OK and Cancel buttons
         * @type Object
         */
        OKCANCEL : {ok:true, cancel:true},
        /**
         * Button config that displays Yes and No buttons
         * @type Object
         */
        YESNO : {yes:true, no:true},
        /**
         * Button config that displays Yes, No and Cancel buttons
         * @type Object
         */
        YESNOCANCEL : {yes:true, no:true, cancel:true},
        /**
         * The CSS class that provides the INFO icon image
         * @type String
         */
        INFO : 'ext-mb-info',
        /**
         * The CSS class that provides the WARNING icon image
         * @type String
         */
        WARNING : 'ext-mb-warning',
        /**
         * The CSS class that provides the QUESTION icon image
         * @type String
         */
        QUESTION : 'ext-mb-question',
        /**
         * The CSS class that provides the ERROR icon image
         * @type String
         */
        ERROR : 'ext-mb-error',

        /**
         * The default height in pixels of the message box's multiline textarea if displayed (defaults to 75)
         * @type Number
         */
        defaultTextHeight : 75,
        /**
         * The maximum width in pixels of the message box (defaults to 600)
         * @type Number
         */
        maxWidth : 600,
        /**
         * The minimum width in pixels of the message box (defaults to 100)
         * @type Number
         */
        minWidth : 100,
        /**
         * The minimum width in pixels of the message box if it is a progress-style dialog.  This is useful
         * for setting a different minimum width than text-only dialogs may need (defaults to 250)
         * @type Number
         */
        minProgressWidth : 250,
        /**
         * An object containing the default button text strings that can be overriden for localized language support.
         * Supported properties are: ok, cancel, yes and no.  Generally you should include a locale-specific
         * resource file for handling language support across the framework.
         * Customize the default text like so: Ext.MessageBox.buttonText.yes = "oui"; //french
         * @type Object
         */
        buttonText : {
            ok : "OK",
            cancel : "Cancel",
            yes : "Yes",
            no : "No"
        }
    };
}();

Ext.applyIf(Array.prototype,{
	clone: function(){
		return this.slice(0);
		}
})		
