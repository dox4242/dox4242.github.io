# ported from code in Realm Grinder [http://www.kongregate.com/games/divinegames/realm-grinder]
# by Divine Games [www.divinegames.it]

from math import floor, log

# realm grinder also has a Rand class that extends PM_PRNG
# it only seeds itself randomly on initialization and reimplements some of these methods
# so I will not provide an implementation of it
class PM_PRNG(object):
  def __init__(self, state = 1):
    object.__init__(self)

    # note that the normal range of initialized states is 0-2147483647
    # and the range of states the RNG can evolve to is 1-2147483647
    # the behavior of other initial states should be considered undefined
    self.state = state

  def nextInt(self):
    return self.gen()

  # equivalent to Rand.random
  def nextDouble(self):
    return self.gen() / 2147483647.

  def nextIntRange(self, min, max):
    min -= 0.4999
    max += 0.4999
    return round(min + (max - min) * self.nextDouble())

  # equivalent to Rand.randRange
  def nextDoubleRange(self, min, max):
    return min + (max - min) * self.nextDouble()

  def gen(self):
    a = 16807 * (self.state >> 16)
    b = (16807 * (self.state & 0xFFFF)) + ((a & 32767) << 16) + (a >> 15)
    # this expression wants to be b % 2147483648 when it grows up
    self.state = b - 2147483647 if b > 2147483647 else b
    return self.state

  # helper function for lightning strike -- from ^T.=D (LightningStrike.onEffect)
  # n is the number of buildings currently possessed, returns the strike tier (0-indexed)
  def strikeTier(self, n):
    return int(floor(self.nextDoubleRange(0, n)))

  # helper function for green fingers discount -- from 4P.V (Game.onEnterFrame)
  # however, prior to 1.4.37, GFD did not use its dedicated Rand instance for its online effect, just its offline one
  # returns the percent bonus GFD applies to offline production if offline is True
  # returns the factor to multiply production per second by to get its bonus if offline is False
  def greenFingers(self, offline=False):
    return self.nextDoubleRange(1,100) if offline else self.nextDoubleRange(1,1200)

  # helper function for goblin's greed -- from 1Z.=D (GoblinsGreed.onEffect)
  # it takes the current production per second and gem count and returns (coins, faction coins)
  def goblinsGreed(self, prod, gems):
    return (round(self.nextDoubleRange(prod * 50, prod * 150)),
            floor(self.randRange(10 + log(1 + gems), 50 + log(1 + gems) ** 2.75)))

  # helper function for excavations -- from 4P.4V (Game.buyExcavationProgress)
  # returns the possible FC reward of an excavation
  def excavationFC(self, n):
    return floor(2 * log(1 + (5000000 * 1.15 ** n)) ** 3)

  # helper function for excavations -- from 4P.4V (Game.buyExcavationProgress)
  # returns the actual FC reward based on the RNG state
  # n is the number purchased before, for the first excavation, n = 0
  def excavationReward(self, n):
    return self.excavationFC(n) if self.nextDouble() * 100 <= 35 else 0
