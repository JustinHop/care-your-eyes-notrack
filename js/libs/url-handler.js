
function getHostName(url) {
	var results = url.match(/(\w+):\/\/([0-9a-zA-Z_\-.]+)\/(\S*)/);
	var host = results[2];
	var arrHost = host.split('.'), len = arrHost.length;
	if (len < 2) {
		return host;
	}
	var hostName;
	if (len > 2 && arrHost[len-2].search(/^(com|co|cc|net|cn)$/) != -1) {
		hostName = arrHost[len-3];
	} else {
		hostName = arrHost[len-2];
	}
	return hostName;
}

function getDomainName(url) {
	var results = url.match(/(\w+):\/\/([0-9a-zA-Z_\-.]+)\/(\S*)/);
	var host = results[2];
	return host;
}

function getCurDomainName() {
	return getDomainName(location.href);
}

function getSiteName(url) {
	var results = url.match(/(\w+:\/\/[0-9a-zA-Z_\-.]+)\/(\S*)/);
	if (!results) return '';
	var host = results[1];
	return host;
}

function getCurSiteName() {
	return getSiteName(location.href);
}