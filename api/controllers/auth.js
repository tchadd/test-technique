const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");



function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin;
      next();
    });
  }
  
  exports.post = async (req, res) => {

    const { login, password } = req.body;
    connection.query(
      "SELECT idUser, login, password, isAdmin FROM user WHERE login = ?",
      [login],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send({
            message: "The entered login does not correspond any existing account",
          });
        } else {
          if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, function (err, result) {
              if (result == true) {
                const token = jwt.sign(
                  { id: user.idUser, isAdmin: user.isAdmin },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: 86400,
                  }
                );
                res.status(200).send({ auth: true, token: token });
              } else {
                res.status(401).send({ message: "Invalid password" });
              }
            });
          } else {
            res.status(404).send({ message: "User not found" });
          }
        }
      }
    );
  });
  
  app.post("/register", verifyToken, (req, res) => {
    if (!req.isAdmin) {
      return res.status(403).send({ message: "Unauthorized" });
    }
    const { nom, prenom, login, password, emploiId } = req.body;
    bcrypt.hash(password, saltRound, function (err, hash) {
      connection.query(
        "INSERT INTO user (nom, prenom, login, password, isAdmin, idEmploiUser) VALUES (?, ?, ?, ?, ?, ?)",
        [nom, prenom, login, hash, 0, emploiId],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).send({
              message: "An error occurred during registration",
            });
          } else {
            res.status(201).send({ message: "User registered" });
          }
        }
      );
    });
  });