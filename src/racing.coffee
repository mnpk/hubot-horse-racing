# Description:
#   Horse Racing! Yay!
#
# Configuration:
#   HUBOT_SLACK_TOKEN
#
# Commands:
#   hubot race|경마|달려 <runner> <runner> <runner>

Race = require('../lib/race')

module.exports = (robot) ->
  robot.respond /(race) (.*)/i, (msg) ->
    riders = msg.match[2].split(' ')
    race = new Race.Race("##{msg.message.room}", riders, 'en')
    Race.Start race

  robot.respond /(경마|달려) (.*)/i, (msg) ->
    riders = msg.match[2].split(' ')
    race = new Race.Race("##{msg.message.room}", riders, 'kr')
    Race.Start race
