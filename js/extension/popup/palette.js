(function() {
	var app = chrome.extension.getBackgroundPage();
	var settings = app.main.settings;

	function setColorFromStorage() {
		setInputColor("bg");
		setInputColor("font");
	}

	function setInputColor(name) {
		$("#" + name)[0].color.fromString(settings.legacyModeOptions.color[name]);
	}

	function addButtonEvent(name) {
		$("#" + name + "Restore").click(function() {
			settings.legacyModeOptions.color[name] = app.consts[name];
			var obj = {legacyModeOptions:{color:{}}};
			obj.legacyModeOptions.color[name] = app.consts[name];
			Cacher.create().set(obj, function() {
				setInputColor(name);
			});
		});
		$("#" + name + "Apply").click(function() {
			var val = $("#" + name).val();
			settings.legacyModeOptions.color[name] = val;
			var obj = {legacyModeOptions:{color:{}}};
			obj.legacyModeOptions.color[name] = val;
			Cacher.create().set(obj);
		});
		$("#saveAsTheme").click(function() {
			app.main.global.color = {};
			app.main.global.color.bg = $("#bg").val();
			app.main.global.color.font = $("#font").val();
			$("#saveAsThemeForm").submit();
		});
	}
	$(function() {
		$.i18n();
		setTimeout(function() {
			setColorFromStorage();
			addButtonEvent("bg");
			addButtonEvent("font");
		}, 50);
		app._gaq.push(['_trackEvent', 'palette', 'open']);
	});
})();




