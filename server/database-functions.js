// const uuidv4 = require('uuid/v4');


class Database {

  constructor (db) {
    this.db = db;
  }

  // Saves new data to `db`

  addData (data) {
    switch (data.type) {

      case "persistScoreboard":
        this.db.collection("scoreboard").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log("1 new high-score inserted database (scoreboard collection)");
        });
        break;

      case "persistStatistics":
        this.db.collection("statistics").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log("1 new statistic inserted to database (statistic collecdtion)")
        });
        break;

    };
  };

  // Get data in `db`, pushed to an array

  getData (query, callback) {
      switch (query.type) {

        case "persistScoreboard":
          this.db.collection("scoreboard").find({ scoreboardId: id }).toArray(function (err, docs) {
            callback(docs);
          });
          break;

        case "persistStatistics":
          this.db.collection("statistics").find({ statistic: id }).toArray(function (err, docs) {
            callback(docs);
          });
          break;

      }
    }

  // Deletes user from `db`

  deleteData (query) {
    switch (query.type) {

      case "persistScoreboard":
        let delCriteria = query.value;
        this.db.collection("scoreboard").remove(delCritera, function(err, obj) {
          if (err) throw err;
          console.log("1 score deleted from scoreboard");
        });
        break;

      case "persistStatistics":
        let delCriteria = query.value;
        this.db.collection("statistics").remove(delCritera, function(err, obj) {
          if (err) throw err;
          console.log("1 stat deleted from statistics");
        });
        break;

    }
  }

}


module.exports = Database;