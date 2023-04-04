var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

const uri =
  "mongodb+srv://achlys:No0OT1v5vcURFfEY@cinemarestapi.qx37mhn.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cinema_sessions");
  var myobj = { movie_id: new ObjectID(), theater_id: new ObjectID(), date:new Date("<YYYY-mm-ddTHH:MM:ssZ>"),start_time: "21:00"};
  dbo.collection("sessions").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}); 