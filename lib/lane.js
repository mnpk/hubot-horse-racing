var MAX_SPEED = 7
var MAX_WIDTH = 50

var Lane = function(rider) {
  this.tail = 0
  this.head = MAX_WIDTH
  this.rider = rider // {name: 'name', emoji: 'emoji'}
  this.text = ':' + ' '.repeat(this.head) + this.rider.emoji + ' '.repeat(this.tail) + ':' + this.rider.name
}

String.prototype.repeat = function(n) {
  return new Array(n + 1).join(this);
}

Lane.prototype.next = function(callback) {
  var moved = Math.ceil(Math.random() * MAX_SPEED) + 1
  this.head -= moved
  this.tail += moved
  if (this.head < 0) {
    this.tail += this.head
    this.head = 0
  }
  this.text = ':' + ' '.repeat(this.head) + this.rider.emoji + ' '.repeat(this.tail) + ':' + this.rider.name
  return this.text
}

Lane.prototype.done = function() {
  return (this.head == 0)
}

var Lanes = function(riders) {
  this.lanes = []
  this.winner = ''
  for (var i in riders) {
    this.lanes.push(new Lane({name: riders[i], emoji: ':horse_racing:'}))
  }
}

Lanes.prototype.text = function() {
  var texts = []
  for (var i in this.lanes) {
    texts.push(this.lanes[i].text)
  }
  return texts.join('\n')
}

Lanes.prototype.next = function(callback) {
  var texts = []
  for (var i in this.lanes) {
    texts.push(this.lanes[i].next())
  }
  return texts.join('\n')
}

Lanes.prototype.done = function() {
  for (var i in this.lanes) {
    if (this.lanes[i].done()) {
      this.winner = this.lanes[i].rider.name
      return true
    }
  }
  return false
}

module.exports = Lanes
