	Flavor = new flavor();

	Flavor.intro = [
		{
			rule: 'const',
			payload: 'Arriving at your artificer\'s latest project, you pass a guarded perimiter with a sign that says, "'
		}, {
			rule: 'rand',
			payloads: [
				'No Avians Past This Point',
				'Intense Meggnetic Fields',
				'Caution: This Area is Goofy as Fuck'
			]
		}, {
			rule: 'const',
			payload: '". Meeting you, she says, "The imager is right over here... '
		}, {
			rule: 'branch',
			payloads: [
				{
					rule: 'const',
					payload: 'you know eggs don\'t only stand on their ends during the spring equinox, right?'
				},
				{
					rule: 'multi',
					payload: [
						{
							rule: 'const',
							payload: 'don\'t worry, this machine is safe. ' 
						},
						{
							rule: 'rand',
							payloads: [
								'It\'s extremely unlikely that it\'ll blow up and kill everyone. Not everyone nearby, everyone. In the universe. Very unlikely.',
								'We\'ve only had a few incidents with avian projectiles.',
								'Intense meggnetic fields have been known to cause sore throat, runny nose, and bone implosion, but only in semi-rare circumstances.'
							]
						}
					]
				},
				{
					rule: 'const',
					payload: 'I was considering making this machine big-endian, but in the end I decided it should be little-endian.'
				},
				{
					rule: 'const',
					payload: 'meggnets have poles, which by convention are called round and kinda-pointy. Ovomeggnetic materials, like eggs, are naturally attracted to meggnets.'
				},
				{
					rule: 'const',
					payload: 'I wanted to power the electromeggnet in it with lightning, but it never seemed to hit where I wanted it to.'
				}
			]
		}, {
			rule: 'const',
			payload: '"'
		}
	];

	Flavor.title = [
		{
			rule: 'const',
			payload: 'Meggnetic Resonance Imager'
		}
	];

	Flavor.tagline = [
		{
			rule: 'rand',
			payloads: [
				'The Only Realm Grinder Forecasting Tool that Uses Nuclear Meggnetic Resonance',
				'Yolks Have Spin Too, Especially if They\'re not Hard-Boiled',
				'Causes Eggs to Stand on Their End During the Whole Year[citation needed]'
			]
		}
	];

	Flavor.pageLoaded = function(vm) {
		vm.flavor.intro = this.renderString(this.intro);
		vm.flavor.title = this.renderString(this.title);
		vm.flavor.tagline = this.renderString(this.tagline);
	}
