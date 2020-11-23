(function($) {

	var _settings = {
		getMessage: chrome.i18n.getMessage
	};

	function handleText(self, msg) {
		var text = $.trim(self.text());
		if (text && text != '') {
			var reg = new RegExp('\{(' + msg + ')\}', 'g');
			text = text.replace(reg, function(m, s1) {
				return _settings.getMessage(s1);
			});
			self.text(text);
		} else {
			self.text(_settings.getMessage(msg));
		}
	}

	function handleAttr(self, attrName, key) {
		var attr = self.attr(attrName);
		if (attr && attr !== '') {
			var reg = new RegExp('\{(' + key + ')\}', 'g');
			attr = attr.replace(reg, function(m, s1) {
				return _settings.getMessage(s1);
			});
			self.attr(attrName, attr);

		} else {
			self.attr(attrName, _settings.getMessage(key));
		}
	}

	function handleInnerHtml(self, key) {
		var html = self.html();
		var orgHtml = html;
		if (html !== '') {
			var reg = new RegExp('\{(' + key + ')\}', 'g');
			html = html.replace(reg, function(m, s1) {
				return _settings.getMessage(s1);
			});
			if (html != orgHtml) {
				self.html(html);
			} else {
				self.append(_settings.getMessage(key));
			}
		} else {
			self.html(_settings.getMessage(key));
		}
	}
	
	function handleShowInLang(self, lang) {
		var curLang = _settings.getMessage('extLang');
		if (curLang != lang) {
			self.remove();
		}
	}

	$.extend({
		i18n: function(i18nAttrName, context) {
			if (!i18nAttrName) {
				i18nAttrName = 'i18n';
			}
			var $i18n;
			if (context) {
				$i18n = $('[' + i18nAttrName + ']', context);
			} else {
				$i18n = $('[' + i18nAttrName + ']');
			}
			$i18n.each(function(i) {
				var self = $(this);
				var i18nMsg = self.attr(i18nAttrName);
				i18nMsg = i18nMsg.replace(/ /g, '');
				var items = i18nMsg.split(';');
				var len = items.length;
				for (var i = 0; i < len; i++) {
					var item = items[i].split(':');
					var attrName = item[0], msg = item[1];
					if (attrName === 'text') {
						handleText(self, msg);
					} else if (attrName === 'html') {
						handleInnerHtml(self, msg);
					} else if (attrName === 'showInLang') {
						handleShowInLang(self, msg);
					} else {
						handleAttr(self, attrName, msg);
					}
				}
				self.removeAttr(i18nAttrName);
			});
		},
		i18nSettings: function(settings) {
			$.extend(_settings, settings);
		}
	});
})(jQuery);