(function() {
	var settings;
	var app;
	function init() {
		$.i18n();
		initShortcutSwitch();
		app._gaq.push(['_trackEvent', 'shortcuts', 'open']);
	}
	
	function initShortcutSwitch() {
		$('#shortcutSwitch').prop({checked:settings.shortcut.enabled});
		$('#shortcutSwitch').click(function() {
			settings.shortcut.enabled = $(this).prop('checked');
			Cacher.create().set({shortcut:{enabled:settings.shortcut.enabled}});
		});
	}

	$(function() {
		app = chrome.extension.getBackgroundPage();
		settings = app.main.settings;
		init();
	});
})();