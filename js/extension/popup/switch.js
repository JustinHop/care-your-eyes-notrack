function MainSwitch(settings) {
	var self = this;
	this.init = function() {
		if (settings.enabled) {
			$("#switch").find('span.open').show();
			$("#switch").find('span.close').hide();
		} else {
			$("#switch").find('span.open').hide();
			$("#switch").find('span.close').show();
		}
		return this;
	};
	this.listenEvent = function() {
		$("#switch").click(function(e) {
			settings.enabled = !settings.enabled;
			Cacher.create().set({enabled: settings.enabled});
			self.init();
		});
	};
}