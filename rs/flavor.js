	Flavor = new flavor();

	Flavor.intro = [
		{
			rule: 'const',
			payload: 'Your scribe is perusing a book titled '
		}, {
			rule: 'rand',
			payloads: [
				'Clicking Techniques: Secret, Ancient, and Automated',
				'Scrying Orb User\'s Manual',
				'Transmuting Beer into Gold',
				'A Lusty Argonian Maid',
				'Extracting Stats for Dummies',
				'Large Quantities of Gold Coins and General Relativity',
				'How to Embezzle on an Archaeological Expedition',
				'How ugmethesecond Discovered the Mana Spent Stat',
				'How to Not Kill People Even When You Probably Should',
				'Fairies and a Woodchipper: Fertilizer in 3 Easy Steps',
				'Using the Whole Angel: from Magic to Cuisine',
				'Hell Portal Zoning Regulations: an Overview',
				'Keynesian, Goblin, Voodoo: the Major Econonometric Models',
				'So You Died but You\'re Reading This Anyways',
				'On the Susceptibility of Uganda to Cheating-Related Fires'
			]
		}, {
			rule: 'const',
			payload: '. Putting down the book, he reaches out to you and says, "Your Majesty, if I can see the kingdom\'s annals, I will create a summary for you."'
		}
	];

	Flavor.title = [
		{
			rule: 'const',
			payload: 'Royal Scribe'
		}
	];

	Flavor.tagline = [
		{
			rule: 'rand',
			payloads: [
				'Not the Stats Panel the Game Needs, but the One It Deserves',
				'Bringing You Uselessly Comprehensive Data for Over 75 Years',
				'The Only Realm Grinder Statistics Tool with Dead Parents',
				'Not Included: Times Complained about Lightning Strike',
				'Number of Possible Taglines: 5; Number of Batman References: 3',
				'Now with 20% More Working Except on IE'
			]
		}
	];

	Flavor.pageLoaded = function() {
		View.setIntro(this.renderString(this.intro));
		View.setTitle(this.renderString(this.title));
		View.setTagline(this.renderString(this.tagline));
		//View.setStatus('The mage is waiting...');
	}
