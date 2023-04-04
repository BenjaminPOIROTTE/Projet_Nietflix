const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
    //Construction schema
const schema = buildSchema(`
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
    directors: [Director]
    director(id: Int!): Director
    genres: [Genre]
    genre(id: Int!): Genre
  }

  type Movie {
    id_movie: Int
    id_real: Int
    id_genre1: Int
    id_genre2: Int
    duree: Int
    titre: String
    image: String
    realisateur: Director
    genre1: Genre
    genre2: Genre
  }

  type Director {
    id_realisateur: Int
    nom_realisateur: String
    movies: [Movie]
  }

  type Genre {
    id_genre: Int
    nom_genre: String
    movies: [Movie]
  }
`);

const getMovies = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'film'
  });

  const [rows] = await connection.execute('SELECT * FROM generalite');
  const movies = rows.map((movie) => ({
    id_movie: movie.id_movie,
    id_real: movie.id_real,
    id_genre1: movie.id_genre1,
    id_genre2: movie.id_genre2,
    duree: movie.duree,
    titre: movie.titre,
    image: movie.image,
  }));
        //Recherche parmi la liste des films
 for (const movie of movies) {

    const [Director] = await connection.execute('SELECT * FROM realisateur WHERE id_realisateur = ?', [movie.id_real]);
    movie.realisateur = Director[0];
    const [genre1] = await connection.execute('SELECT * FROM genre WHERE id_genre = ?', [movie.id_genre1]);
    movie.genre1 = genre1[0];
    const [genre2] = await connection.execute('SELECT * FROM genre WHERE id_genre = ?', [movie.id_genre2]);
    movie.genre2 = genre2[0];

  }

  return movies;
};
        //Get by id
const getMovieById = async (args) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'film'
  });

  const [rows] = await connection.execute('SELECT * FROM generalite WHERE id_movie = ?', [args.id]);
  const movie = rows[0];
  
  const [realisateur] = await connection.execute('SELECT * FROM realisateur WHERE id_realisateur = ?', [movie.id_real]);
  movie.realisateur = realisateur[0];

  const [genre1] = await connection.execute('SELECT * FROM genre WHERE id_genre = ?', [movie.id_genre1]);
  movie.genre1 = genre1[0];

  const [genre2] = await connection.execute('SELECT * FROM genre WHERE id_genre = ?', [movie.id_genre2]);
  movie.genre2 = genre2[0];

  return movie;
};

const getDirectors = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'film'
  });

  const [rows] = await connection.execute('SELECT * FROM realisateur');
  return rows;
};

const getGenres = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'film'
  });

  const [rows] = await connection.execute('SELECT * FROM genre');
  return rows;
};



const root = {
  movies: getMovies,
  movie: getMovieById,
  directors: getDirectors,
  director: async (parent) => {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'film'
    });

    const [rows] = await connection.execute('SELECT * FROM realisateur WHERE id_realisateur = ?', [parent.id_real]);
    return rows[0];
  },
  genres: getGenres,

  genre: async (parent) => {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'film'
    });

    const [rows] = await connection.execute('SELECT * FROM a_pour_genre WHERE id_movie = ?', [parent.id_movie]);
    const genres = [];
    for (const row of rows) {
      const [genre] = await connection.execute('SELECT * FROM genre WHERE id_genre = ?', [row.id_genre]);
      genres.push(genre);
    }
    return genres;
  }
};

        //Init
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server started on port 4000');
});