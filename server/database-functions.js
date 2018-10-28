// const uuidv4 = require('uuid/v4');


class Database {

  constructor (db) {
    this.db = db;
  }

  // Saves new data to `db`

  addData (data) {
    switch (data.type) {

      case "persistAnswer":
        this.db.collection("answers").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log(`Added into collection answers:`)
          console.log(res.ops[0]);
        });
        break;

      case "persistStatistics":
        this.db.collection("statistics").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log(`Added into collection statistics:`)
          console.log(res.ops[0])
        });
        break;

    };
  };

  // Get data in `db`, pushed to an array

  getData (query, callback) {
    switch (query.type) {

      case "persistAnswer":
        this.db.collection("answers").find().toArray(function (err, docs) {
          console.log(docs);
          return docs;
        });
        break;

      case "persistStatistics":
        this.db.collection("statistics").find({ word: query.word }).toArray(function (err, docs) {
          console.log(`The data retreived from database is:`);
          console.log(docs);
          return docs;
        });
        break;

    }
  }

  // Deletes user from `db`

  deleteData (query) {
    switch (query.type) {

      case "persistAnswer":
        console.log(`Criteria found: ${JSON.stringify(query.criteria)}`)
        this.db.collection("scoreboard").remove(query.criteria, function(err, obj) {
          if (err) throw err;
          console.log("Delete request processed");
        });
        break;

      case "persistStatistics":
        console.log(`Criteria found: ${JSON.stringify(query.criteria)}`)
        this.db.collection("statistics").remove(query.criteria, function(err, obj) {
          if (err) throw err;
          console.log("Delete request processed");
        });
        break;

    }
  }

}


module.exports = Database;