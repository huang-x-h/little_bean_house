/**
 * Created by huangxinghui on 2016/1/25.
 */

var fs = require('fs');
var moment = require('moment');
var profile = require('../public/javascripts/little_bean_profile.json');

function refreshProfile(data) {
  var result = profile.timeline.date.concat(data);

  result = result.sort(function(a, b) {
    if (moment(a.startDate, 'YYYY,M,D').valueOf() > moment(b.startDate, 'YYYY,M,D').valueOf()) {
      return 1;
    }

    return -1;
  });

  profile.timeline.date = result;

  fs.writeFile('./public/javascripts/little_bean_profile.json', JSON.stringify(profile), function(err) {
    if (err) console.error(err);

    console.log('Profile refresh success.');
  })
}

module.exports = {
  refreshProfile: refreshProfile
};