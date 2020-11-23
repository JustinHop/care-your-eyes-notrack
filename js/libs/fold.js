
function addEventForFold(key, defaultVisibility, listName) {
	var visibility = defaultVisibility || false;
	if (!listName) {
		listName = 'List';
	}
	$("#" + key).click(function() {
		visibility = !visibility;
		if (visibility) {
			$("#" + key + listName).show();
		} else {
			$("#" + key + listName).hide();
		}
	});
}