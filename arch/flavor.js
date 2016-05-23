	Flavor = new flavor();

	Flavor.intro = [
		{
			rule: 'const',
			payload: 'This is where '
		}, {
			rule: 'rand',
			payloads: [
				'a bad joke',
				'some random text',
				'flavor text'
			]
		}, {
			rule: 'const',
			payload: ' goes.'
		}
	];

	Flavor.title = [
		{
			rule: 'const',
			payload: 'Lara Crypt'
		}
	];

	Flavor.tagline = [
		{
			rule: 'rand',
			payloads: [
				'Because Re-Logic Shouldn\'t Get All the Undead Archaeologist Name Jokes',
				'Serial Archaeological Site Vandal',
				'You Might Say She\'s a... Pro-Spectre',
				'Ethereal Excavator',
				'Phantasmal Paleontologist',
				'Spectral Surveyor',
				'You Will Find \'Bad Joke\' in 1 Page Refresh',
				'I Dulled the Pain of Reading Realm Grinder\'s Code with Electro Swing'
			]
		}
	];

	Flavor.pageLoaded = function(vm) {
		vm.flavor.intro = this.renderString(this.intro);
		vm.flavor.title = this.renderString(this.title);
		vm.flavor.tagline = this.renderString(this.tagline);
	}
