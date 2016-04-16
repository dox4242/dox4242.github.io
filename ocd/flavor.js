	//The archmage glares at you. "I told you, I don't know why the scrying orb is cloudy, there's all this wibbly wibbly wobbly magic around that's confusing it. Oh, you're not here about that..."
	//As you walk in, the archmage is plucking an angel. Seeing your expression, she says, "If you like sausages or magic, you should never watch them being made. It's worse when I grind up fairies... the screaming."
	//On your way to see the archmage, you can hear her yelling from down the hall. "I told you not to build a hell portal there, the firey magic stuff is messing with the bakery down the street! They've had three bread golems in the last week! ... Yeah, I guess if you could figure out how to cause the portal to make cake golems, that would be okay."

	Flavor = new flavor();

	Flavor.intro = [
		{
			rule: 'const',
			payload: 'Your kingdom\'s archmage is tinkering with '
		}, {
			rule: 'rand',
			payloads: [
				'incomprehensible magical devices',
				'strange floating bronze spheres',
				'vials of foul-smelling liquid',
				'a cloudy scrying orb',
				'an apparatus that transmutes gold to beer',
				'cakes... actually no, eating cakes'
			]
		}, {
			rule: 'const',
			payload: '. Without a glance, she says, "Stick your '
		}, {
			rule: 'rand',
			payloads: [
				'focus crystal in that thingy over there',
				'doodad in the arcane resonance tuner'
			]
		}, {
			rule: 'const',
			payload: ', I\'ll be right over."'
		}
	];

	Flavor.failedStatus = [
		{
			rule: 'const',
			payload: '"Hey! This is a'
		}, {
			rule: 'branch',
			payloads: [
				{
					rule: 'multi',
					payload: [
						{
							rule: 'const',
							payload: ' sensitive magical instrument, you can\'t just shove your '
						}, {
							rule: 'rand',
							payloads: [
								'doodad',
								'thingamabob',
								'thingy',
								'whatsit',
								'whatever that is'
							]
						}, {
							rule: 'const',
							payload: ' in there!"'
						}
					]
				}, {
					rule: 'multi',
					payload: [
						{
							rule: 'rand',
							payloads: [
								' breaky thingy,',
								' delicate spinny doodad,',
								'&ndash;well, I\'m not entirely sure what it is, but'
							]
						}, {
							rule: 'const',
							payload: ' you can\'t just shove your '
						}, {
							rule: 'rand',
							payloads: [
								'tax revenue reports',
								'weather forecast',
								'copy of A Lusty Argonian Maid',
								'giant flanged mace',
								'puppy that you\'re carrying around for some reason',
								'cloudy scrying orb',
								'jar with a fairy in it',
								'&ndash;just no, you can\'t put that'
							]
						}, {
							rule: 'const',
							payload: ' in there!"'
						}
					]
				}
			]
		}
	];

	Flavor.loadedStatus = [
		{
			rule: 'const',
			payload: '"Hey, this thing actually works! Looks like your max mana is '
		}, {
			rule: 'statevar',
			payload: 'maxMana'
		}, {
			rule: 'const',
			payload: ', and you can adjust your contingency threshold with this dial here."'
		}
	];

	Flavor.pageLoaded = function() {
		View.setIntro(this.renderString(this.intro));
		View.setStatus('The mage is waiting...');
	}

	Flavor.saveInvalid = function() {
		View.setStatus(this.renderString(this.failedStatus));
		View.saveStatus(-1);
	}

	Flavor.saveLoaded = function() {
		View.setStatus(this.renderString(this.loadedStatus)); 
		View.saveStatus(1);
	}
