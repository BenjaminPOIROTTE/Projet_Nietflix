/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://achlys:<No0OT1v5vcURFfEY>@cinemarestapi.qx37mhn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("sample_mflix").collection("comments");
  // perform actions on the collection object
  console.log("Une erreur est survenue \n"+err);

  client.close();
});*/
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://achlys:No0OT1v5vcURFfEY@cinemarestapi.qx37mhn.mongodb.net/?retryWrites=true&w=majority";
//String uri = "mongodb://achlys:pass@sample.host:27017/?maxPoolSize=20&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("sample_mflix").collection("comments");
  // perform actions on the collection object
        if(err)
        {
            console.log(err);
        }
  client.close();
});

const express = require('express');
const app = express();
/*
// Get all film sessions
app.get('/sessions', (req, res) => {
  // Use the MongoDB driver to get all film sessions from the database
  collection.find({}).toArray((err, sessions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(sessions);
    }
  });
});

// Get a specific film session
app.get('/sessions/:id', (req, res) => {
  // Use the MongoDB driver to get a specific film session by id
  collection.findOne({ _id: req.params.id }, (err, session) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(session);
    }
  });
});

// Add a new film session
app.post('/sessions', (req, res) => {
  // Use the MongoDB driver to insert a new film session into the database
  collection.insertOne(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result.ops[0]);
    }
  });
});

// Update an existing film session
app.put('/sessions/:id', (req, res) => {
  // Use the MongoDB driver to update an existing film session
  collection.updateOne({ _id: req.params.id }, { $set: req.body }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Delete a film session
app.delete('/sessions/:id', (req, res) => {
  // Use the MongoDB driver to delete a film session
  collection.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});
*/
var port=8081;
// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
