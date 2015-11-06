Flavor = new flavor();

Flavor.intro = [
  {
    rule: 'const',
    payload: 'Your kingdom\'s archmage is tinkering with '
  },
  {
    rule: 'rand',
    payloads: [
      'incomprehensible magical devices',
      'strange floating bronze spheres',
      'vials of foul-smelling liquid',
      'a cloudy scrying orb',
      'an apparatus that transmutes gold to beer',
      'cakes... actually no, eating cakes'
    ]
  },
  {
    rule: 'const',
    payload: '. Without a glance, she says, "Stick your '
  },
  {
    rule: 'rand',
    payloads: [
      'focus crystal in that thingy over there',
      'doodad in the arcane resonance tuner'
    ]
  },
  {
    rule: 'const',
    payload: ', I\'ll be right over."'
  }
];

Flavor.failedStatus = [
  {
    rule: 'const',
    payload: '"Hey! This is a'
  },
  {
    rule: 'branch',
    payloads: [
      {
        rule: 'multi',
        payload: [
          {
            rule: 'const',
            payload: ' sensitive magical instrument, you can\'t just shove your '
          },
          {
            rule: 'rand',
            payloads: [
              'doodad',
              'thingamabob',
              'thingy',
              'whatsit',
              'whatever that is'
            ]
          },
          {
            rule: 'const',
            payload: ' in there!"'
          }
        ]
      },
      {
        rule: 'multi',
        payload: [
          {
            rule: 'rand',
            payloads: [
              ' breaky thingy,',
              ' delicate spinny doodad,',
              '&ndash;well, I\'m not entirely sure what it is, but'
            ]
          },
          {
            rule: 'const',
            payload: ' you can\'t just shove your '
          },
          {
            rule: 'rand',
            payloads: [
              'tax revenue reports',
              'weather forecast',
              'copy of A Lusty Argonian Maid',
              'giant flanged mace',
              'puppy that you\'re carrying around for some reason',
              'cloudy scrying orb',
              'jar with a fairy in it'
            ]
          },
          {
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
  },
  {
    rule: 'statevar',
    payload: 'maxMana'
  },
  {
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
