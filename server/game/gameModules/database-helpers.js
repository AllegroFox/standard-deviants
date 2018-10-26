"use strict";

// Defines helper functions for saving, getting, and deleting users, using the database `db`
module.exports = function makeDatabaseHelpers(db) {
  return {

    // Saves a user to `db`
    addUser: function addUser(user) {
      db.collection("users").insertOne(user, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    },

    // Get all users in `db`, pushed to an array
    getUser: function getUser(id, callback) {
      db.collection("users").find({ playerId: id }).toArray(function (err, docs) {
        callback(docs);
      });
    },

    // Deletes user from `db`
    deleteUser: function(playerId) {
      db.collection("users").remove(playerId, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
      });
    }

  };
}


