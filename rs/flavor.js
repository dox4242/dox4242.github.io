Flavor = new flavor();

Flavor.intro = [
  {
    rule: 'const',
    payload: 'Your scribe is perusing a book titled '
  },
  {
    rule: 'rand',
    payloads: [
      'Clicking Techniques: Secret, Ancient, and Automated',
      'Scrying Orb User\'s Manual',
      'Transmuting Beer into Gold',
      'A Lusty Argonian Maid',
      'Extracting Stats for Dummies',
      'Large Quantities of Gold Coins and General Relativity',
      'How to Embezzle on an Archaeological Expedition',
      'How ugmethesecond Discovered the Mana Spent Stat'
    ]
  },
  {
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
      'Not Included: Complaints About Lightning Strike',
      'Number of Possible Taglines: 5; Number of Batman References: 2'
    ]
  }
];

Flavor.pageLoaded = function() {
  View.setIntro(this.renderString(this.intro));
  View.setTitle(this.renderString(this.title));
  View.setTagline(this.renderString(this.tagline));
  //View.setStatus('The mage is waiting...');
}
