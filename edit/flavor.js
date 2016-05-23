	Flavor = new flavor();

	Flavor.intro = [
		{
			rule: 'const',
			payload: 'The place where you edit saves: this is it.'
		}
	];

	Flavor.title = [
		{
			rule: 'const',
			payload: 'Save Editor'
		}
	];

	Flavor.tagline = [
		{
			rule: 'rand',
			payloads: [
				'It Edits Saves'
			]
		}
	];

	Flavor.pageLoaded = function(vm) {
		vm.flavor.intro = this.renderString(this.intro);
		vm.flavor.title = this.renderString(this.title);
		vm.flavor.tagline = this.renderString(this.tagline);
	}
