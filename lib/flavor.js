	function flavor() {
		this.renderSubString = function(superSub) {
			if (superSub.rule === 'const') {
				return superSub.payload;
			} else if (superSub.rule === 'branch') {
				var i = randint(0,superSub.payloads.length-1);
				return this.renderSubString(superSub.payloads[i]);
			} else if (superSub.rule === 'rand') {
				var i = randint(0,superSub.payloads.length-1);
				return superSub.payloads[i];      
			} else if (superSub.rule === 'multi') {
				return this.renderString(superSub.payload);
			} else if (superSub.rule === 'statevar') {
				return Controller[superSub.payload];
			}
		}
		this.renderString = function(superString) {
			var string = "";
			for (var i = 0; i < superString.length; i++) {
				string += this.renderSubString(superString[i]);
			}
			return string
		}
	}
