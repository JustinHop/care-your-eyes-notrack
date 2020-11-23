

function Cacher(defaultItems) {
	if (!defaultItems) {
		defaultItems = window.defaultSettings || chrome.extension.getBackgroundPage().defaultSettings || {};
	}
	var storageType = defaultItems.storageType || 'local';
	var listeners = [];
//	console.log('Cacher', defaultItems, window.defaultSettings, chrome.extension.getBackgroundPage());
	this.defaultItems = defaultItems;

	function getKeys(obj) {
		if (obj === null)
			return obj;
		var keys = [];
		for (var i in obj) {
			keys.push(i);
		}
		return keys;
	}

	function handleItems(obj, items, defaultItems) {
		if (!defaultItems) {
			defaultItems = {};
		}
		for (var key in obj) {
			if (items[key] === undefined) {
				items[key] = defaultItems[key];
				continue;
			}

			if (obj[key] === null || typeof obj[key] !== 'object') {
				if (items[key] === undefined) {
					items[key] = defaultItems[key];
					continue;
				}
			}
			handleItems(obj[key], items[key], defaultItems[key]);
		}
	}

	/** obj 的类型可能为三种：string, number, {xxx}
	 * 前两种的处理方式是一样的：以obj为key从 storage 中取得对应的值，若取值为null，则取 defaultItems 中对应的值
	 * 对于 {xxx} 类型的，先取得它第一层级的 keys，接着根据keys从storage 中取得对应的值items，
	 * 然后对obj进行for循环，在循环第一层，判断obj[key1]是否为true, 
	 *	   若是，则看下items中对应路径键的值是否为null，
	 *		   若是，则从defaultItems中取对应的值，
	 *		   若否，进行后续操作*/
	this.get = function(obj, callback) {
		if (typeof obj === 'string' || typeof obj === 'number') {
			var key = obj;
			obj = {};
			obj[key] = true;
		}
		var defaultItems = this.defaultItems;
		chrome.storage[storageType].get(getKeys(obj), function(items) {
			items = $.extend(true, {}, defaultItems, items);
			callback(items);
		});
	};

	/** 把对象 items 和 obj 进行递归合并 
	 * obj 的值将会覆盖 items 的值 */
	function merge(items, obj) {
		if ($ && $.extend) {
			$.extend(true, items, obj);
			return;
		}
		for (var key in obj) {
			if (items[key] === undefined) {
				items[key] = obj[key];
				continue;
			}
			if (obj[key] === null || typeof obj[key] !== 'object') {
				items[key] = obj[key];
				continue;
			}
			merge(items[key], obj[key]);
		}
	}

	/** 先从obj获取keys, 再根据keys从storage获取对应值items，接着递归合并 obj和old，
	 * 以obj的值覆盖 old，然后把 old 存进storage*/
	this.set = function(obj, callback) {
		chrome.storage[storageType].get(getKeys(obj), function(old) {
//			alert(JSON.stringify(obj) + '   ' + JSON.stringify(old));
//			console.log('34324 cacher set', obj, old);
			merge(old, obj);
			chrome.storage[storageType].set(old, callback);
		});
	};

	function remove(items, obj) {
		for (var key in obj) {
			if (items[key] === undefined) {
				continue;
			}
			if (obj[key] === null || typeof obj[key] !== 'object') {
				if (items[key] !== undefined) {
					delete items[key];
				}
				continue;
			}
			remove(items[key], obj[key]);
		}
	}

	function removeFirstLevel(obj) {
		var keys = [];
		for (var key in obj) {
			if (obj[key] === null || typeof obj[key] !== 'object') {
				keys.push(key);
			}
		}
		for (var i in keys) {
			delete obj[keys[i]];
		}
		if (keys.length > 0) {
			chrome.storage[storageType].remove(keys);
		}
	}

	function empty(obj) {
		for (var i in obj) {
			return false;
		}
		return true;
	}
	/** obj->keys->items, 根据 obj 删除掉 items 中相应的值后，再存回storage
	 * 当删除的对象深度为1时，callback 不一定是在真正从storage中删除后才执行的，可能
	 * 会早或晚一定的微秒数
	 *  */
	this.remove = function(obj, callback) {
		if (!callback) {
			callback = function () {};
		}
		removeFirstLevel(obj);
		if (empty(obj)) {
			callback();
			return;
		}
		chrome.storage[storageType].get(getKeys(obj), function(items) {
			remove(items, obj);
			chrome.storage[storageType].set(items);
			callback();
		});
	};

	this.clear = function(callback) {
		chrome.storage[storageType].clear(callback);
	};

	this.listenOnChanged = function() {
		var defaultItems = this.defaultItems;
		chrome.storage.onChanged.addListener(function(changes, areaName) {
			for (var i in listeners) {
				var listener = listeners[i];
				var keyPath = listener.keyPath;
				var key = keyPath[0];
				var changeVal = changes[key];
//				console.log('onChanged', key, changes, changeVal);
				if (!changeVal) {
					continue;
				}

				var len = keyPath.length;
				if (len > 1) {
					changeVal.oldValue = $.extend(true, {}, defaultItems[key], changeVal.oldValue);
					changeVal.newValue = $.extend(true, {}, defaultItems[key], changeVal.newValue);
				}
				var oldValue = changeVal.oldValue;
				var newValue = changeVal.newValue;
				for (var i = 1; i < len; i++) {
					key = keyPath[i];
					if (oldValue) {
						oldValue = oldValue[key];
					}
					newValue = newValue[key];
					if (newValue === undefined) {
						continue;
					}
				}
				if (typeof newValue === 'object') {
					if (JSON.stringify(oldValue) === JSON.stringify(newValue))
						continue;
				} else {
					if (oldValue === newValue) {
						continue;
					}
				}
				listener.callback({oldValue: oldValue, newValue: newValue});
			}
		});
	};

	/** 监听 storage 中值的变化, 只有新旧值不同时，才会调用 callback
	 * keyPath: 数组，从数组的第0个元素到最后一个元素按顺序组成一个key路径读取相应的值 */
	this.onChanged = function(keyPath, callback) {
		if (typeof keyPath === 'string') {
			keyPath = [keyPath];
		}
		listeners.push({keyPath:keyPath, callback:callback});
	};
}

Cacher.instance = null;
Cacher.create = function(defaultItems) {
	if (Cacher.instance === null) {
		Cacher.instance = new Cacher(defaultItems);
		Cacher.instance.listenOnChanged();
	}
	return Cacher.instance;
};

//Cacher.prototype.get = function

