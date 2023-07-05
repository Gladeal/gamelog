const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require("dotenv");
const { result } = require('lodash');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { dirname } = require('upath');
//const forgotPasswordRouter = require('./forgotpassword.js');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use('/forgotpassword', forgotPasswordRouter);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dimebag1",
  database: "gamelog1",
});

//|/|\|/|\|/|\|/|\|/|\|/|\| REGISTER SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|

app.post("/register", (req, res) => {
  const username = req.body.userName;
  const password = req.body.userPassword;
  const email = req.body.userEmail;

  db.query(
    "INSERT INTO user(userName, userPassword, userEmail) VALUES(?, ?, ?)",
    [username, password, email],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while registering");
      } 
      else {
        res.status(200).send("User registered successfully");
      }
    }
  );
});


//|/|\|/|\|/|\|/|\|/|\|/|\| LOGIN SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|

app.post('/login', (req, res)=> {
  const username = req.body.userName;
  const password = req.body.userPassword;

  db.query(
    "SELECT userName, userPassword FROM user WHERE userName = ? AND userPassword = ?", [username, password],
    (err, result) => {
      if (err) {
        res.send({err: err})
      } else {
        if (result.length > 0) {
          res.send(result)
        } else {
          res.send({message: "Email or password is not right"});
        }
      }
    }
  );
});



//|/|\|/|\|/|\|/|\|/|\|/|\| ŞİFREMİ UNUTTUM SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|
app.post('/forgotpassword', (req, res) => {
  const email = req.body.userEmail;

  // Veritabanında kullanıcının e-posta adresini ara
  db.query('SELECT * FROM user WHERE userEmail = ?', [email], (err, rows) => {
      if (err) {
          console.error(err);
          return res.status(500).send({ error: 'Internal server error' });
      }

      const user = rows[0];

      // Kullanıcı bulunamadıysa hata döndür
      if (!user) {
          return res.status(400).send({ error: 'User not found' });
      }

      // JWT oluştur
      const token = jwt.sign( email , process.env.JWT_SECRET);

      // Şifre sıfırlama bağlantısını içeren bir e-posta gönder
      const transporter = nodemailer.createTransport({
          port: "587",
          host: 'smtp.office365.com',
          auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.EMAIL_PASSWORD,
          },
      });

      const mailOptions = {
          from: 'Gamelog',
          to: email,
          subject: 'Şifrenizi sıfırlayın',
          text: `Şifrenizi sıfırlamak için bu bağlantıya tıklayın: http://localhost:3000/reset-password?token=${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error(error);
              return res.status(500).send({ error: 'Internal server error' });
          }

          res.send({ message: 'E-posta gönderildi' });
      });
  });
});


//|/|\|/|\|/|\|/|\|/|\|/|\| OYUNLAR SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|
app.get("/games", (req, res) => {
  db.query("SELECT * FROM game", (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send("Error while fetching data with database")
        return
      }
      if (!result || !result.length) {
          res.send("No game in database")
          return
      }
      res.json(result)
  });
});

app.post('/games', async (req, res) => {
  const { gameName, gameDev, gameDate, gameCover } = req.body;

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'INSERT INTO game (gameName, gameDev, gameDate, gameCover) VALUES (?, ?, ?, ?)',
      [gameName, gameDev, gameDate, gameCover]
    );
    connection.release();

    res.status(201).json({ gameId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

//|/|\|/|\|/|\|/|\|/|\|/|\| OYUN DETAY SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|
app.get("/games/:id", (req, res) => {
  const gameId = req.params.id;

  db.query("SELECT * FROM game WHERE gameId = ?", [gameId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error while fetching data from database");
      return;
    }

    if (!result || result.length === 0) {
      res.status(404).send("Game not found");
      return;
    }

    const game = result[0];
    res.json(game);
  });
});



//|/|\|/|\|/|\|/|\|/|\|/|\| KULLANICILAR SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|
app.get("/users", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send("Error while fetching data with database")
        return
      }
      if (!result || !result.length) {
          res.send("No game in database")
          return
      }
      res.json(result)
  });
});


app.post('/users', async (req, res) => {
  const { userName } = req.body;

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'INSERT INTO user (userName) VALUES (?)',
      [userName]
    );
    connection.release();

    res.status(201).json({ userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


//|/|\|/|\|/|\|/|\|/|\|/|\| LİSTELER SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|
app.get("/lists", (req, res) => {
  db.query("SELECT * FROM list", (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send("Error while fetching data with database")
        return
      }
      if (!result || !result.length) {
          res.send("No list in database")
          return
      }
      res.json(result)
  });
});

app.post('/lists', async (req, res) => {
  const { listName, listDescription, memberId, gameId } = req.body;

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'INSERT INTO list (listName, listDescription, memberId, gameId) VALUES (?, ?, ?, ?)',
      [listName, listDescription, memberId, gameId]
    );
    connection.release();

    res.status(201).json({ listId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


//|/|\|/|\|/|\|/|\|/|\|/|\| İNCELEMELER SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|
app.get("/reviews", (req, res) => {
  db.query(
    "SELECT * FROM review",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error while fetching data from the database");
        return;
      }
      res.json(result);
    }
  );
});

app.post("/reviews", (req, res) => {
  const { reviewId, reviewName, reviewDesc, gameId, userId } = req.body;

  db.query(
    "INSERT INTO review (reviewId, reviewName, reviewDesc, gameId, userId) VALUES (?, ?, ?, ?, ?)",
    [reviewId, reviewName, reviewDesc, gameId, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error while inserting data into the database");
        return;
      }
      res.status(200).send("Review added successfully");
    }
  );
});


//|/|\|/|\|/|\|/|\|/|\|/|\| DATA FETCH |/|\|/|\|/|\|/|\|/|\|/|\|
app.get("/data", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send("Error while fetching data with database")
        return
      }
      if (!result || !result.length) {
          res.send("No user in database")
          return
      }
      res.json(result)
  });
});

app.listen(3001, ()=>{
  console.log("SERVER ONLINE");
});




/*//|/|\|/|\|/|\|/|\|/|\|/|\| OYUN DETAY SAYFASI |/|\|/|\|/|\|/|\|/|\|/|\|
app.get('/games/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'SELECT * FROM game WHERE gameId = ?',
      [gameId]
    );
    connection.release();

    if (!result || !result.length) {
      res.status(404).send('Game not found');
      return;
    }

    const game = result[0];
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});*/


/*
app.get('/games/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'SELECT * FROM game WHERE gameId = ?',
      [gameId]
    );
    connection.release();

    if (!result || !result.length) {
      res.status(404).send('Game not found');
      return;
    }

    const game = result[0];
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
*/