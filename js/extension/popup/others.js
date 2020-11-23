(function() {
	var settings;
	var app;
	function init() {
		initShareButton();
		$.i18n();
		initNightMode();
		initLegacyMode();
		app._gaq.push(['_trackEvent', 'others', 'open']);
	}

	function initShareButton() {
		setTimeout(function() {
			if (i18n('extLang') === 'zh_CN') {
//				$("#weiboShare").html('<iframe src="http://service.weibo.com/staticjs/weibosharev2.html?\n\
//url=http%3A%2F%2Fwww.tc199.net%2F&amp;type=button&amp;ralateUid=1737813521&amp;language=zh_cn\n\
//&amp;appkey=spOem&amp;title=保护钛合金狗眼！可到chrome商店下载扩展：https://chrome.google.com/webstore/detail/care-your-eyes/fidmpnedniahpnkeomejhnepmbdamlhl&amp;pic=http%3A%2F%2Fimages.tc199.net%2Fglasses.png||http%3A%2F%2Fimages.tc199.net%2Fnight.jpg||http%3A%2F%2Fimages.tc199.net%2Fgreen.jpg&amp;searchPic=true&amp;style=number" width="128" height="25" frameborder="0" scrolling="no" marginheight="0"></iframe>');
			$("#weiboShare").append('<iframe src="http://service.weibo.com/staticjs/weibosharev2.html?\n\
url=http%3A%2F%2Fzh-cn.cye.tc199.net%2F&amp;type=button&amp;ralateUid=1737813521&amp;language=zh_cn\n\
&amp;appkey=spOem&amp;title=保护钛合金狗眼！可到chrome商店下载扩展：\n\
https://chrome.google.com/webstore/detail/care-your-eyes/fidmpnedniahpnkeomejhnepmbdamlhl&\n\
amp;pic=http%3A%2F%2Fimages.tc199.net%2Fglasses.png||http%3A%2F%2Fimages.tc199.net%2Fnight.jpg\n\
||http%3A%2F%2Fimages.tc199.net%2Fgreen.jpg&amp;searchPic=true&amp;style=number" width="100" height="25" frameborder="0" scrolling="no"\n\
 marginheight="0"></iframe>');
			} else {
				$("#facebookShare").html('<iframe name="f1e9da948c" width="1000px" height="1000px" frameborder="0" allowtransparency="true" scrolling="no" title="fb:like Facebook Social Plugin"src="http://www.facebook.com/v2.0/plugins/like.php?action=like&amp;app_id=&amp;channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F7r8gQb8MIqE.js%3Fversion%3D41%23cb%3Df1b93bd758%26domain%3Dcye.tc199.net%26origin%3Dhttp%253A%252F%252Fcye.tc199.net%252Ff360726f3%26relation%3Dparent.parent&amp;href=http%3A%2F%2Fcye.tc199.net%2Fen&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey&amp;share=true&amp;show_faces=true" style="border: none; visibility: visible; width: 126px; height: 20px;" class=""></iframe>');
			}
		}, 300);
	}

	function initLegacyMode() {
		initTargetTags();
		initOtherCheckboxes();
	}
	
	function initOtherCheckboxes() {
		$("#changeByClick").prop({checked:settings.legacyModeOptions.changeByClick});
		$("#coverBgImg").prop({checked:settings.legacyModeOptions.coverBgImg});
		$("#customFontColor").prop({checked:settings.legacyModeOptions.useCustomFontColor});
		$("#changeByClick").click(function() {
			settings.legacyModeOptions.changeByClick = $(this).prop('checked');
			Cacher.create().set({legacyModeOptions:{changeByClick:settings.legacyModeOptions.changeByClick}});
		});
		$("#coverBgImg").click(function() {
			settings.legacyModeOptions.coverBgImg = $(this).prop('checked');
			Cacher.create().set({legacyModeOptions:settings.legacyModeOptions});
		});
		$("#customFontColor").click(function() {
			settings.legacyModeOptions.useCustomFontColor = $(this).prop('checked');
			Cacher.create().set({legacyModeOptions:settings.legacyModeOptions});
		});
		
	}

	function initTargetCheckbox(key, id, checked) {
		var chk = $("#" + id);
		chk.prop('checked', checked || false);
		chk.click(function() {
			settings.legacyModeOptions.targetTags[key].enable = $(this).prop('checked');
			var obj = {legacyModeOptions:{targetTags:{}}};
			obj.legacyModeOptions.targetTags[key] = {};
			obj.legacyModeOptions.targetTags[key].enable = $(this).prop('checked');
			Cacher.create().set(obj);
		});
	}

	function initTargetTags() {
		var tags = mapsConst.legacyMode.targetTags;
		for (var i in tags) {
			var tag = tags[i];
			initTargetCheckbox(tag.key, tag.id, settings.legacyModeOptions.targetTags[tag.key].enable)
		}
	}

	function initNightMode() {
		function initTime() {
			$("#timePm").val(settings.modeSwitchOptions.time.night.from);
			$("#timeAm").val(settings.modeSwitchOptions.time.night.to);
			$("#timePm").change(function() {
				var val = checkVal($(this));
				settings.modeSwitchOptions.time.night.from = val;
				Cacher.create().set({modeSwitchOptions: {time: {night: {from: val}}}});
				this.value = val;
			});
			$("#timeAm").change(function() {
				var val = checkVal($(this));
				settings.modeSwitchOptions.time.night.to = val;
				Cacher.create().set({modeSwitchOptions: {time: {night: {to: val}}}});
				this.value = val;
			});
		}
		/** 初始化夜间模式的 自动开启 or 总是开启 开关 */
		function initSwitch() {
			$("#" + settings.nightModeOptions.mode).prop({checked: true});
			$("[name=mode]").click(function() {
				settings.nightModeOptions.mode = $(this).val();
				Cacher.create().set({nightModeOptions: {mode: settings.nightModeOptions.mode}});
			});
		}

		function initBrightness() {
			initBC('brightness');
		}

		function initContrast() {
			initBC('contrast');
		}

		function showValue(key, value) {
			var range = $("#" + key), input = $("#" + key + 'Input');
			range.val(value);
			input.val(value);
		}

		function initBC(key) {
			showValue(key, settings.nightModeOptions[key]);

			$('#' + key + ',#' + key + 'Input').change(function() {
				settings.nightModeOptions[key] = checkVal($(this));
				showValue(key, settings.nightModeOptions[key]);
				var obj = {nightModeOptions: {}};
				obj.nightModeOptions[key] = settings.nightModeOptions[key];
				Cacher.create().set(obj);
			});
		}
		initTime();
		initSwitch();
		initBrightness();
		initContrast();
	}

	function checkVal($s) {
		var val = parseFloat($s.val());
		var min = parseFloat($s.attr('min')), max = parseFloat($s.attr('max'));
		if (isNaN(val)) {
			val = min;
		}
		if (val < min) {
			val = min;
		}
		if (val > max) {
			val = max;
		}
		return val;
	}

	$(function() {
		app = chrome.extension.getBackgroundPage();
		settings = app.main.settings;
		init();
	});
})();

