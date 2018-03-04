function clickHandler(db) {
  var clicks = db.collection('clicks');

  this.getClicks = function(req, res) {
    var clickProjection = {
      clicks: 1,
      _id: 0
    };
    clicks.find({}).project(clickProjection).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      if (result) {
        // console.log(result);
        res.json(result);
      }else {
        clicks.insert({'clicks': 0}, function(err) {
          if (err) {
            throw err;
          }
          clicks.find({}).project(clickProjection).toArray(function(err, result) {
            if (err) {
              throw err;
            }
            console.log(result);
            res.json(result);
          });
        });
      }
    });
  };

  this.addClick = function(req, res) {
    clicks.findAndModify(
      {},
      {'id': 1},
      {$inc: {'clicks': 1}},
      {new:true},
      function(err, result) {
        if (err) {
          throw err;
        }
        res.json(result);
      }
    );
  };

  this.resetClicks = function(req, res) {
      clicks.update(
        {},
        {'clicks': 0},
        function(err, result) {
          if (err) {
            throw err;
          }
          res.json(result);
        }
      );
  };

}

module.exports = clickHandler;
