var consts = {
	bg: "cce8cf",
	font: "000000",
	nightMode: 'nightMode',
	legacyMode: 'legacyMode',
	autoSwitch: 'autoSwitch',
	whitelistMode:'whitelistMode',
	blacklistMode:'blacklistMode',
	nightModeSwitch: {
		always: 'always',
		auto: 'auto'
	},
	minNum:-2147483648
};

/** 在存储到服务器之前，要根据 defaultSettings 把一些过时被弃用的 key 从 chrome.storage 里面清理掉 */
var defaultSettings = {
	/** 数据结构的版本，主要是为了在以后数据结构发生改变时，可以进行数据转换，此版本号
	 * 不用跟扩展程序的版本号相同
	 * 6.1.0 版本之后，开始递增此版本号 */
	version: 1,
	storageType: 'local',
	enabled: true,
	mode: consts.nightMode,
	runningMode:consts.blacklistMode,
	/** 网站黑名单：不使用扩展的网站 */
	disabledUrlList: {},
	/** 网站白名单：使用扩展的网站 */
	whitelist: {},
	modeSwitchOptions: {
		time: {
			night: {from: 7, to: 8}   //晚上7点 到早上8点
		}
	},
	legacyModeOptions: {
		enable: true,
		targetTags: {
			body: {enable: true},
			div: {enable: true},
			table: {enable: true},
			textInput: {enable: true},
			select: {enable: true},
			ul: {enable: true},
			a: {enable: false}
		},
		changeByClick: true,
		useCustomFontColor: true,
		coverBgImg: true,
		color: {
			name: i18n('DefaultTheme'), 
			bg: consts.bg,
			font: consts.font
		},
		colorTheme: 5,
		/** 主题收藏夹 */
		colorThemes: {
			1: {name: i18n('Theme') + '1', bg: consts.bg, font: consts.font},
			2: {name: i18n('Theme') + '2', bg: 'D4D6D9', font: consts.font},
			3: {name: i18n('Theme') + '3', bg: 'C1E0E8', font: consts.font},
			4: {name: i18n('Theme') + '4', bg: 'C3E8C8', font: consts.font},
			5: {name: i18n('Theme') + '5', bg: 'D0D9BA', font: consts.font},
			6: {name: i18n('Theme') + '6', bg: 'BF8B9D', font: consts.font}
		}
	},
	nightModeOptions: {
		autoOpen: true,
		mode: 'always',
		brightness: 84,
		contrast: 91
	},
	shortcut: {
		enabled: true,
		keys: {
			appSwitch: {key: 'Ctrl+Q', text: 'appSwitch'},
			addTheSiteToList: {key: 'Ctrl+Alt+X', text: ''},
			changeByClick: {key: 'Alt+C', text: ''},
			coverBgImg: {key: 'Alt+B', text: ''},
			useCustomFontColor: {key: 'Alt+A', text: ''},
			autoMode: {key: 'Alt+Shift+1', text: ''},
			greenMode: {key: 'Alt+Shift+2', text: ''},
			nightMode: {key: 'Alt+Shift+3', text: ''},
			darker: {key: 'Alt+S', text: ''},
			brighter: {key: 'Alt+W', text: ''}
		}
	},
	/**  */
	updatedRemind: {
		'604': true
	}
};

var mapsConst = {
	legacyMode: {
		radioId: 'legacyMode',
		targetTags: {
			body: {id: 'body', selector: ",body", key: 'body', selectors: ['body']},
			div: {id: "div", selector: ",div", key: 'div', selectors: ['div']},
			table: {id: "table", selector: ",th,td", key: 'table', selectors: ['th', 'td']},
			textInput: {id: "textInput", selector: ",input[type=text],textarea", key: 'textInput', selectors: ['input[type=text]', 'textarea']},
			select: {id: "select", selector: ",select", key: 'select', selectors: ['select']},
			ul: {id: "ul", selector: ",ul", key: 'ul', selectors: ['ul']},
			a: {id: 'a', selector: ",a", key: 'a', selectors: ['a']}
		},
		coverBgImg: {id: "bgImg"},
		useCustomFontColor: {id: "customFontColor"}
	},
	nightMode: {radioId: "nightMode", mode: {}},
	autoSwitch: {radioId: 'autoSwitch'},
	blacklistMode:{radioId: "blacklistMode"},
	whitelistMode:{radioId: "whitelistMode"}
};