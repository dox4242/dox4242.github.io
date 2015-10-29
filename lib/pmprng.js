function PM_PRNG(state) {
  if (state == undefined) { state =  1 }
  this.state = state;
  this.gen = function () {
    var a = 16807 * (this.state >> 16);
    var b = (16807 * (this.state & 0xFFFF)) + ((a & 32767) << 16) + (a >> 15);
    // this is not actually % 2147483648, it's a shitty chinese knockoff of it
    this.state = b > 2147483647 ? b - 2147483647 : b;
    return this.state;
  }
  this.nextDouble = function() {
    return this.gen() / 2147483647;
  }
  this.nextDoubleRange = function(min, max) {
    return min + (max - min) * this.nextDouble();
  }
  this.strikeTier = function(n) {
    return Math.floor(this.nextDoubleRange(0, n))
  }
}
