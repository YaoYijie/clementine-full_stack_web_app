function clickHandler(db) {
  var clicks = db.collection('clicks');
  this.getClicks = function(req, res) {
    var clickProjection = {
      clicks: 1,
      _id: 0
    };
    clicks.findOne({}, clickProjection, function(err, result) {
      if (err) {
        throw err;
      }
      if (result) {
        console.log(result);
        res.json(result);
      }else {
        clicks.insert({'clicks': 0}, function(err) {
          if (err) {
            throw err;
          }

          clicks.findOne({}, clickProjection, function(err, result) {
            if (err) {
              throw err;
            }
            res.json(result);
          });
        });
      }
    })
  };
}

module.exports = clickHandler;
