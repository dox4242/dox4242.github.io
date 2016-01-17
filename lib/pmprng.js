	// ported from code in Realm Grinder [http://www.kongregate.com/games/divinegames/realm-grinder]
	// by Divine Games [www.divinegames.it]

	// realm grinder also has a Rand class that extends PM_PRNG
	// it only seeds itself randomly on initialization and reimplements some of these methods
	// so I will not provide an implementation of it
	function PM_PRNG(state) {
		if (state === undefined) { state =  1 }
		// note that the normal range of initialized states is 0-2147483647
		// and the range of states the RNG can evolve to is 1-2147483647
		// the behavior of other initial states should be considered undefined
		this.state = state;

		this.gen = function () {
			var a = 16807 * (this.state >> 16);
			var b = (16807 * (this.state & 0xFFFF)) + ((a & 32767) << 16) + (a >> 15);
			// this expression wants to be b % 2147483648 when it grows up
			this.state = b > 2147483647 ? b - 2147483647 : b;
			return this.state;
		}

		this.nextInt = function () {
			return this.gen();
		}

		this.nextIntRange = function(min, max) {
			min -= 0.4999;
			max += 0.4999;
			return Math.round(min + (max - min) * this.nextDouble());
		}

		// equivalent to Rand.random
		this.nextDouble = function() {
			return this.gen() / 2147483647;
		}

		// equivalent to Rand.randRange
		this.nextDoubleRange = function(min, max) {
			return min + (max - min) * this.nextDouble();
		}

		// helper function for lightning strike -- from ^T.=D (LightningStrike.onEffect)
		// n is the number of buildings currently possessed, returns the strike tier (0-indexed)
		this.strikeTier = function(n) {
			return Math.floor(this.nextDoubleRange(0, n));
		}

		// helper function for green fingers discount -- from 4P.V (Game.onEnterFrame)
		// returns the percent bonus GFD applies to offline production if offline is True
		// returns the factor to multiply production per second by to get its bonus if offline is False
		this.greenFingers = function(offline) {
			if (offline === undefined) { offline = false }
			return offline ? this.nextDoubleRange(1,100) : this.nextDoubleRange(1,1200);
		}

		// helper function for goblin's greed -- from 1Z.=D (GoblinsGreed.onEffect)
		// it takes the current production per second and gem count and returns [coins, faction coins]
		this.goblinsGreed = function (prod, gems) {
			return [Math.round(self.nextDoubleRange(prod * 50, prod * 150)),
			Math.floor(self.randRange(10 + Math.log(1 + gems), 50 + Math.pow(Math.log(1 + gems), 2.75)))];
		}

		// helper function for excavations -- from 4P.4V (Game.buyExcavationProgress)
		// returns the possible FC reward of an excavation
		this.excavationFC = function(n) {
			return Math.floor(2 * Math.pow(Math.log(1 + (5000000 * Math.pow(1.15, n))), 3));
		}
		// helper function for excavations -- from 4P.4V (Game.buyExcavationProgress)
		// returns the actual FC reward based on the RNG state
		// n is the number purchased before, for the first excavation, n = 0
		this.excavationReward = function(n){
			return this.nextDouble() * 100 <= 35 ? this.excavationFC(n) : 0;
		}
	}
