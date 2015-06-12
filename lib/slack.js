var token = process.env.HUBOT_SLACK_TOKEN
var querystring = require('querystring')
var https = require('https')

var chat = {
  postMessage : function(channel, text, callback) {
    var params = {
      channel: channel,
      token: token,
      text: text,
      as_user: true
    }
    _apiCall('postMessage', params, callback)
  },

  update : function(ts, channel, text, callback) {
    var params = {
      ts: ts,
      channel: channel,
      token: token,
      text: text,
    }
    _apiCall('update', params, callback)
  }
}

// private methods
function _apiCall(method, params, callback) {
  var q = querystring.stringify(params)
  https.get('https://slack.com/api/chat.' + method + '?' + q, function(res) {
    buffer = ''
    res.on('data', function(data) {
      buffer += data
    })
    res.on('end', function() {
      if (callback) {
        if (res.statusCode == 200) {
          callback(JSON.parse(buffer))
        } else {
          callback({'ok': false, 'error': 'API resposne: ' + res.statusCode})
        }
      }
    })
    res.on('error', function(err) {
      console.log(err)
      if (callback) {
        callback({'ok': false, 'error': err.errno})
      }
    })
  })
}

module.exports.chat = chat

// var updateText = function(json) { var text = (json.text)?json.text:json.message.text; chat.update(json.ts, json.channel, text + '!', updateText) }
// chat.postMessage('#racing', 'test', function(res) { console.log(res); updateText(res) })
