var SplunkLogger = require("splunk-logging").Logger;
const request = require('request');

var config = {
    token: "splunk token",
    url: "http://localhost:8088"
};

var Logger = new SplunkLogger(config);

request.get({
    url: 'https://name.okta.com/api/v1/events',
    qs: {
      startDate: '2013-01-01T12:00:00.000-07:00',
      limit: 1000
    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS oktatoken'
    }
  }, function(err,httpResponse,body) {
    if (err || httpResponse.statusCode != 200) {
      console.log("Unable to fetch events", err, httpResponse, body);
      res.json({error:"Unable to fetch events, check server logs"});
    } else {
      var bodyjson = JSON.parse(body);
      bodyjson.forEach(function(eventt){
        console.log("Sending payload", eventt);
        console.log("#########################");
        Logger.send({ message: eventt }, function(err, resp, body2) {
            console.log("Response from Splunk", body2);
        });
      });
    }
});
