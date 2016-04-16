	function randint(a,b){return a+Math.floor(Math.random()*(++b-a))}

	function log(x, b) {
		if (b === undefined) {
		return Math.log(x);
		}
		else {
		return Math.log(x) / Math.log(b);
		} 
	}

	function typeve(thing) {
		var type = typeof(thing);
		if (type === 'object') {
		if (Array.isArray(thing)) {
		return 'array';
		}
		if (thing === null) {
		return 'null';
		}
		}
		return type;
	}

	function render() {
		this.shortScale = ['M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', 'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tg', 'Utg', 'Dtg', 'Ttg', 'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Octg', 'Notg', 'Qag', 'Uqag', 'Dqag', 'Tqag', 'Qaqag', 'Qiqag', 'Sxqag', 'Spqag', 'Ocqag', 'Noqag', 'Qig', 'UQig', 'DQig', 'TQig', 'QaQig', 'QiQig', 'SxQig', 'SpQig', 'OcQig', 'NoQig', 'Sxg', 'USxg', 'DSxg', 'TSxg', 'QaSxg', 'QiSxg', 'SxSxg', 'SpSxg', 'OcSxg', 'NoSxg', 'Spg', 'USpg', 'DSpg', 'TSpg', 'QaSpg', 'QiSpg', 'SxSpg', 'SpSpg', 'OcSpg', 'NoSpg', 'Ocg', 'UOcg', 'DOcg', 'TOcg', 'QaOcg', 'QiOcg', 'SxOcg', 'SpOcg', 'OcOcg', 'NoOcg', 'Nog', 'UNog', 'DNog', 'TNog', 'QaNog', 'QiNog', 'SxNog', 'SpNog', 'OcNog', 'NoNog', 'C', 'Uc'];

		this.expSep = '<sub>E</sub>';

		this.sciSig = function(man, sig) {
			man = man.substr(0,sig+1);
			while ('0.'.indexOf(man[man.length-1]) != -1) {
				man = man.substr(0, man.length-1);
			}
			return man
		}

		this.sci = function(val) {
			var man = val.toExponential();
			var exp = Number(man.substr(man.search('e') + 1));
			var man = man.substr(0, man.search('e')); 
			if (val >= 0 && val < 1000000) {
				return this.short(val);
			}
			return this.sciSig(man, 4) + this.expSep + exp;
		}

		this.engSig = function(man, exp, sig) {
			man = man[0] + man.substr(2, sig-1);
			exp = exp % 3;
			for (var i = 0; i < (3 - exp); i++) {
				if (man[man.length - 1] == '0') {
					man = man.substr(0, man.length - 1);
				} else {
					break;
				}
			}
			while (man.length < exp + 1) {
				man += '0';
			}
			if (man.length == exp + 1) {
				return man;
			} else {
				return man.substr(0, exp + 1) + '.' + man.substr(exp + 1);
			}
		}

		this.eng = function(val) {
			var man = val.toExponential();
			var exp = Number(man.substr(man.search('e') + 1));
			var man = man.substr(0, man.search('e')); 
			if (val >= 0 && val < 1000000) {
				return this.short(val);
			}
			return this.engSig(man, exp, 4) + this.expSep + (exp - exp % 3);
		}

		this.short = function(val) {
			var man = val.toExponential();
			var exp = Number(man.substr(man.search('e') + 1));
			var man = man.substr(0, man.search('e'));
			if (exp < 0) {
				if (val == 0) return '0';
				return this.sci(val);
			} else if (exp < 3) {
				return this.engSig(man, exp, 4);
			} else if (exp < 6) {
				man = man[0] + man.substr(2, exp);
				while (man.length < exp + 1) {
					man += '0';
				}
				return man.substr(0, exp - 2) + ',' + man.substr(exp - 2);
			} else {
				var suffix = Math.floor(exp / 3) - 2;
				return this.engSig(man, exp, 4) + ' ' + this.shortScale[suffix];
			}
		}

		this.time = function(val) {
			res = [];
			val = Math.floor(val);
			if (val == 0) return '0s';

			s = val % 60;
			val = Math.floor(val / 60);
			m = val % 60;
			val = Math.floor(val / 60);
			h = val % 24;
			val = Math.floor(val / 24);
			d = val;

			if (s > 0) res.unshift(s + 's');
			if (m > 0) res.unshift(m + 'm');
			if (h > 0) res.unshift(h + 'h');
			if (d > 0) res.unshift(d + 'd');
			return res.join(', ');
		}

		this.timedelta = function(val) {
			if (val >= 0) {
				return this.time(val) + ' ago';
			} else {
				return this.time(-val) + ' from now';
			}
		}

		this.timeISO = function(time) {
			var date = new Date(time * 1000);
			return date.toLocaleDateString() + ' ' + 
			date.toLocaleTimeString(undefined, {hour12: false});
		}
	}

	function listJoin(a) {
		if (a.length == 0) {
			return "";
		} else if (a.length == 1) {
			return a[0];
		} else if (a.length == 2) {
			return a[0] + " and " + a[1];
		} else {
			var list = a[0];
			for (var i = 1; i < a.length-1;i++) {
				list += ", " + a[i]
			}
			list += ", and " + a[a.length-1]
			return list
		}
	}

	function liJoin(a) {
		var list = "";
		for (i = 0; i < a.length; i++) {
			list += "<li>" + a[i] + "</li>"
		}  
		return list;
	}

	function ulJoin(a) {
		var list = "<ul>"
		list += liJoin(a);
		list += "</ul>"
		return list
	}

	function olJoin(a) {
		var list = "<ol>"
		list += liJoin(a);
		list += "</ol>"
		return list
	}

	util = {
		render: new render()
	};
