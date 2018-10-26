"use strict";

// Defines helper functions for saving, getting, and deleting users, using the database `db`
module.exports = function makeDatabaseHelpers(db) {
  return {

    // Saves new data to `db`
    addData: function addData(data) {
      switch (data.type) {

        case "persistScoreboard":
          db.collection("scoreboard").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("1 new high-score inserted database (scoreboard collection)");
          });
          break;

        case "persistStatistics":
          db.collection("statistics").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("1 new statistic inserted to database (statistic collecdtion)")
          });
          break;




      }
    },

    // Get data in `db`, pushed to an array
    getData: function getData(query, callback) {
      switch (query.type) {

        case "persistScoreboard":
          db.collection("scoreboard").find().toArray(function (err, docs) {
            docs.forEach(doc => {
              function compareNumbers(a, b) {
               return a - b;
              }
            })
            callback(docs);
          });
          break;

        case "persistStatistics":

          break;


// // sorting the mapped array containing the reduced values
// mapped.sort(function(a, b) {
//   if (a.value > b.value) {
//     return 1;
//   }
//   if (a.value < b.value) {
//     return -1;
//   }
//   return 0;
// });

      }
    },

    // Deletes user from `db`
    deleteData: function(query) {

      let delCriteria = query.value;
      db.collection(query.collection).remove(delCritera, function(err, obj) {
        if (err) throw err;
        console.log("1 score deleted from scoreboard");
      });

    }

}









// addData: function addData(data) {
//       db.collection("users").insertOne(user, function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//       });
//     },

//     // Get all users in `db`, pushed to an array
//     getData: function getUser(id, callback) {
//       db.collection("users").find({ playerId: id }).toArray(function (err, docs) {
//         callback(docs);
//       });
//     },

//     // Deletes user from `db`
//     deleteData: function(playerId) {
//       db.collection("users").remove(playerId, function(err, obj) {
//         if (err) throw err;
//         console.log("1 document deleted");
//         db.close();
//       });
//     }