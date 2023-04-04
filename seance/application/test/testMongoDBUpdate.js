const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const uri = "mongodb+srv://achlys:No0OT1v5vcURFfEY@cinemarestapi.qx37mhn.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;

  const dbo = db.db("cinema_sessions");
  
  const sessionId = '640604d4369105e099381364';
  const sessionUpdates = {
    movie_id: new ObjectID(),
    theater_id: new ObjectID(),
    date: new Date("<YYYY-mm-ddTHH:MM:ssZ>"),
    start_time: "21:00"
  };
  
  const query = { _id: new ObjectID(sessionId) };
  const update = { $set: sessionUpdates };
  
  dbo.collection("sessions").updateOne(query, update, function(err, res) {
    if (err) throw err;
    if (res.result) {
      console.log(res.result.nModified + " document updated");
    } else {
      console.log("Document updated");
    }
    db.close();
  });
});
