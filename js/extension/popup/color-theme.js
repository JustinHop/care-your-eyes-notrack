(function() {
	var settings;
	var app;
	function init() {
		$.i18n();
		initColorTheme();
		addEvents();
	}
	
	function initColorTheme() {
		
		function setCurColorTheme($, color) {
			$.css('background-color', '#' + color.bg).css('color', '#' + color.font).text(color.name);
		}
		
		var color = app.main.global.color;
		color.name = settings.legacyModeOptions.color.name;
		$("#themeName").css('background-color', '#' + color.bg).css('color', '#' + color.font).val(color.name);
		
		var themes = settings.legacyModeOptions.colorThemes;
		for (var i in themes) {
			var t = themes[i];
			setCurColorTheme($("#colorTheme" + i).prev('label'), t);
		}
		
		$('[name=colorTheme]').find('a').click(function() {
			if (!window.confirm(i18n('SureToCoverTheTheme'))) {
				return;
			}
			var themeIndex = $(this).attr('theme');
//			var color = settings.legacyModeOptions.color;
			color.name = $("#themeName").val();
			if (!color.name) {
				color.name = i18n('Theme') + themeIndex;
			}
			settings.legacyModeOptions.colorThemes[themeIndex] = color;
			console.log(color);
			setCurColorTheme($("#colorTheme" + themeIndex).prev('label'), color);
			var colorTheme = {legacyModeOptions:{colorThemes:{}}};
			colorTheme.legacyModeOptions.colorThemes[themeIndex] = color;
			Cacher.create().set(colorTheme);
		});
	}

	function addEvents() {
	}

	$(function() {
//		Cacher.create().clear();return;
		app = chrome.extension.getBackgroundPage();
		settings = app.main.settings;
		init();
	});
})();