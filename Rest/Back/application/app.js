/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://achlys:<No0OT1v5vcURFfEY>@cinemarestapi.qx37mhn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("sample_mflix").collection("comments");
  // perform actions on the collection object
  console.log("Une erreur est survenue \n"+err);

  client.close();
});*/
const path = require('path');
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Enable CORS for all requests
app.use(cors());

const uri =
  "mongodb+srv://achlys:No0OT1v5vcURFfEY@cinemarestapi.qx37mhn.mongodb.net/?retryWrites=true&w=majority";
//String uri = "mongodb://achlys:pass@sample.host:27017/?maxPoolSize=20&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let commentsCollection;
client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }

  commentsCollection = client.db("sample_mflix").collection("comments");

  app.listen(8081, () => {
    console.log("Server is listening on port 8081");
  });
});

// Parse JSON request body
app.use(bodyParser.json());

// Set the view engine to use EJS
app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'views'));
// Get 20 comments sessions
app.get('/comments', (req, res) => {
  commentsCollection.find({}, {limit: 20}).toArray((err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(comments);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Add a new comment
app.post('/movies/:id/comments', async (req, res) => {
  try {
    const newComment = { content: req.body.content, movie_id: ObjectId(req.params.id) };
    const result = await db.collection('comments').insertOne(newComment);
    res.send(result.ops[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update an existing comment
app.put("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  commentsCollection.updateOne({ _id: ObjectId(id) }, { $set: comment }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});


// Delete a comment
app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  commentsCollection.deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

/*
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
