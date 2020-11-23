
(function() {
	var app, settings;
	
	function init() {
		$('[name=updatedRemind]').each(function(i) {
			console.log(i, this);
			var v = $(this).attr('v');
			if (!settings.updatedRemind[v]) {
				$(this).hide();
			}
		});
	}
	
	function readUpdated() {
		
	}
	
	$(function() {
		app = chrome.extension.getBackgroundPage();
		settings = app.main.settings;
		init();
	});
})();


