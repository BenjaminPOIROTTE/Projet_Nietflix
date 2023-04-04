const path = require('path');
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Enable CORS for all requests
app.use(cors(),);

const uri =
  "mongodb+srv://achlys:No0OT1v5vcURFfEY@cinemarestapi.qx37mhn.mongodb.net/?retryWrites=true&w=majority";
//String uri = "mongodb://achlys:pass@sample.host:27017/?maxPoolSize=20&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let sessionCollection;
client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }

  sessionCollection = client.db("cinema_sessions").collection("sessions");

  app.listen(8081, () => {
    console.log("Server is listening on port 8081");
  });
});

// Parse JSON request body
app.use(bodyParser.json());

// Log HTTP requests and responses on the server console
app.use(morgan('dev'));

// Set the view engine to use EJS
app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'views'));
// Get 20 sessions (for performance purpose since it was crowded with +1M data before...)
app.get('/sessions', (req, res) => {
  sessionCollection.find({}, {limit: 20}).toArray((err, sessions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(sessions);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Go to /sessions to see the fetched sessions from MongoDB!");
});


// Update an existing session
app.put('/sessions/:id', (req, res) => {
  const sessionId = req.params.id;
  const sessionUpdates = {
    movie_id: new ObjectId(req.body.movie_id),
    theater_id: new ObjectId(req.body.theater_id),
    date: new Date(req.body.date),
    start_time: req.body.start_time
  };

  const query = { _id: new ObjectId(sessionId) };
  const update = { $set: sessionUpdates };

  sessionCollection.updateOne(query, update, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.nModified === 0) {
      res.status(404).send('No session found with the given id');
    } else {
      res.send('Session updated successfully');
    }
  });
});


// Delete a session
app.delete("/sessions/:id", (req, res) => {
  const id = req.params.id;
  sessionCollection.deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Add a new session
app.post('/sessions', (req, res) => {
  const newSession = {
    movie_id: new ObjectId(req.body.movie_id),
    theater_id: new ObjectId(req.body.theater_id),
    date: new Date(req.body.date),
    start_time: req.body.start_time
  };
  
  sessionCollection.insertOne(newSession, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result.ops[0]);
    }
  });
});
