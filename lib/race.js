var slack = require('./slack')
var Lanes = require('./lane')


module.exports = {
Race: function(channel, riders, locale) {
  this.channel = channel
  this.riders = riders  // [name, name, ...]
  this.locale = locale
  this.lanes = new Lanes(riders)
},

Start: function(race) {
  var UpdateRace = function(json, race) {
    if (race.lanes.done()) {
      var win_msg = ''
      if (race.locale === 'kr') {
        win_msg = '우승자는 ' + race.lanes.winner + '입니다! :tada:'
      } else {
        win_msg = race.lanes.winner + ' has won the race! :tada:'
      }
      slack.chat.postMessage(race.channel, win_msg, function(res) {
        console.log(res)
        return
      })
      return
    }
    console.log(json);
    slack.chat.update(json.ts, json.channel, race.lanes.next(), function(json) {
      if (json.ok) {
        UpdateRace(json, race)
      } else {
        console.log(json)
      }
    })
  }
  slack.chat.postMessage(race.channel, race.lanes.text(), function(json) {
    if (json.ok) { 
      UpdateRace(json, race)
    } else {
      console.log(json)
    }
  })
}

}  // module.exports
