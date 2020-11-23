(function() {
	var settings;
	var app;
	function init() {
		$.i18n();
		new MainSwitch(settings).init().listenEvent();
		initRunningMode();
		initModeSwitch();
		initDisableThisSite();
		initEnableThisSite();
		addEvents();
		initColorTheme();
		setTimeout(function() {
			$("#wechatPay").html('<iframe src="http://rewards.tc199.net/rewards.html?v=6"></iframe>');
		}, 50);
		app._gaq.push(['_trackEvent', 'options', 'open']);
	}

	function initRunningMode() {
		initBlackWhitelistSwitch();
		$("#" + mapsConst[settings.runningMode].radioId).prop({checked: true});
		$("[name=runningMode]").click(function() {
			settings.runningMode = $(this).val();
			Cacher.create().set({runningMode: settings.runningMode});
			initBlackWhitelistSwitch();
		});
	}

	function initBlackWhitelistSwitch() {
		if (settings.runningMode === consts.whitelistMode) {
			$("#whitelistSwitch").show();
			$("#blacklistSwitch").hide();
		} else {
			$("#blacklistSwitch").show();
			$("#whitelistSwitch").hide();
		}
	}

	function initColorTheme() {
		$('#colorThemeFoldImg').fold($("#colorThemes"));
		var themes = settings.legacyModeOptions.colorThemes;
		for (var i in themes) {
			var t = themes[i];
			$("#colorTheme" + i).prev('label').css('background-color', '#' + t.bg).css('color', '#' + t.font).text(t.name);
		}

		function setCurColorTheme(color) {
			$("#curColorTheme").css('background-color', '#' + color.bg).css('color', '#' + color.font).text(color.name);
		}
		setCurColorTheme(settings.legacyModeOptions.color);
		$('[name=colorTheme]').find('a').click(function() {
			var theme = $(this).attr('theme');
			var color = $.extend({}, settings.legacyModeOptions.colorThemes[theme]);
			settings.legacyModeOptions.color = color;
			settings.legacyModeOptions.colorTheme = theme;
			setCurColorTheme(color);
			Cacher.create().set({legacyModeOptions: {colorTheme: theme}});
			Cacher.create().set({legacyModeOptions: {color: color}});
		});
	}

	function initModeSwitch() {
		$("#" + mapsConst[settings.mode].radioId).prop({checked: true});
		$("[name=mode]").click(function() {
			settings.mode = $(this).val();
			Cacher.create().set({mode: settings.mode});
		});
	}

	function initDisableThisSite() {

		function disableThisSite() {
			if (settings.disabledUrlList[getSiteName(app.main.curTab.url())]) {
				$("#disableThisSite").prop({checked: true});
			} else {
				$("#disableThisSite").prop({checked: false});
			}
		}
		disableThisSite();
		$("#disableThisSite").click(function() {
			var checked = $(this).prop('checked');
			app.addTheSiteToList(settings, app.main.curTab.url(), checked);
		});
	}

	function initEnableThisSite() {
		function enableThisSite() {
			if (settings.whitelist[getSiteName(app.main.curTab.url())]) {
				$("#enableThisSite").prop({checked: true});
			} else {
				$("#enableThisSite").prop({checked: false});
			}
		}
		enableThisSite();
		$("#enableThisSite").click(function() {
			var checked = $(this).prop('checked');
			app.addTheSiteToList(settings, app.main.curTab.url(), checked);
		});
	}

	function addEvents() {
		$("#others").click(function() {
			$('#othersForm').submit();
		});
		$("#shortcuts").click(function() {
			$('#shortcutsForm').submit();
		});
		$("#pay").click(function() {
			app._gaq.push(['_trackEvent', 'supportMe', 'clicked']);
			$('#wechatPay').toggle();
		});
	}

	$(function() {
//		Cacher.create().clear();return;
//		chrome.storage.local.get(null, function(obj) {
//			console.log(123, obj);
//		});
		app = chrome.extension.getBackgroundPage();
		settings = app.main.settings;
		init();
	});
})();