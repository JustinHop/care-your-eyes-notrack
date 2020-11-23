var color = {
	//r g b 是在区间 [0, 1] 的小数
	rgb2hsv: function(r, g, b) {
		var n = Math.min(Math.min(r, g), b);
		var v = Math.max(Math.max(r, g), b);
		var m = v - n;
		if (m === 0) {
			return [0, 0, v];  // 原来是[null, 0, v], 但是参考维基改为了现在这样
		}
		var h = r === n ? 3 + (b - g) / m : (g === n ? 5 + (r - b) / m : 1 + (g - r) / m);
		return [h === 6 ? 0 : h, m / v, v];
	},
	/**  v 是在区间 [0, 1] 的小数, h, s 暂时未知，没仔细研究过
	 * 返回的 r,g,b 也是在区间 [0, 1] 的小数 */
	hsv2rgb: function(h, s, v) {
		if (h === null) {
			return [v, v, v];
		}
		var i = Math.floor(h);
		var f = i % 2 ? h - i : 1 - (h - i);
		var m = v * (1 - s);
		var n = v * (1 - s * f);
		switch (i) {
			case 6:
			case 0:
				return [v, n, m];
			case 1:
				return [n, v, m];
			case 2:
				return [m, v, n];
			case 3:
				return [m, n, v];
			case 4:
				return [n, m, v];
			case 5:
				return [v, m, n];
		}
	},
	/* 返回的 r,g,b 是在区间 [0, 1] 的小数 */
	str2rgb: function(hex) {
		var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
		if (!m) {
			return [0, 0, 0];
		} else {
			if (m[1].length === 6) { // 6-char notation
				return [parseInt(m[1].substr(0, 2), 16) / 255,
						parseInt(m[1].substr(2, 2), 16) / 255,
						parseInt(m[1].substr(4, 2), 16) / 255];
			} else { // 3-char notation
				return [parseInt(m[1].charAt(0) + m[1].charAt(0), 16) / 255,
						parseInt(m[1].charAt(1) + m[1].charAt(1), 16) / 255,
						parseInt(m[1].charAt(2) + m[1].charAt(2), 16) / 255];
			}
			return [0, 0, 0];
		}
	},
	rgb2str: function(r, g, b) {
		return parseInt(r*255).toString(16) + parseInt(g*255).toString(16) + parseInt(b*255).toString(16);
	},
	str2hsv:function(hex) {
		var rgb = this.str2rgb(hex);
		return this.rgb2hsv(rgb[0], rgb[1], rgb[2]);
	},
	hsv2str:function(h, s, v) {
		var rgb = this.hsv2rgb(h, s, v);
		return this.rgb2str(rgb[0], rgb[1], rgb[2]);
	}
};