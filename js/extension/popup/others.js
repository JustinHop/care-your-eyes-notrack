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
		var foo = 1;
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

