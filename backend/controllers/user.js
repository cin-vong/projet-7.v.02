const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const dbParams = require('../dbParams');

exports.signup = (req, res, next) => {
  const pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'groupomania'
  });
  pool.getConnection(function (err, connection){
      if (err){
          console.log(err)
          return res.status(400).json("Erreur interne")
      }
      const user = req.body
      console.log(user);
      bcrypt.hash(user.password, 10) 
      .then((hash) => {
          user.password = hash;
          user.password_confirm = hash;
          connection.query('SELECT * from user WHERE email=?', user.email, (err, result) => {
              if (err) {
                  console.log(err)
                  return res.status(400).json("Erreur interne")
              }
              if(result.length >= 1) {
                  return res.status(500).json({ message: "Email déjà existante."});
              } else {
                  connection.query(`INSERT INTO user SET ?`, user, (err, result) => {
                      if (err) {
                          console.log(err)
                          return res.status(400).json("Erreur interne")
                      }
                  return res.status(201).json({message : 'Compte crée avec succés !'})
                  });
                  connection.release();
              }
          })
      }); 
  }); 
}

exports.login = (req, res, next) => {
  const user = req.body
  if (user.email && user.password){
    dbParams.query('SELECT * FROM user WHERE email = ?', user.email, function(err, results){
          if (err){
              console.log(err)
              return res.status(400).json("Erreur interne")
          }
          if (results.length <= 0){
              return res.status(500).json({ message: "Email inconnu"})
          } else {
              bcrypt.compare(user.password, results[0].password)
              .then(valid => {
                  if(!valid){
                      return res.status(500).json({ message: "Email ou mot de passe incorrect"});
                  } else {
                      return res.status(200).json({
                        userId: results[0].id,
                          nom: results[0].nom,
                          prenom: results[0].prenom,
                          email: results[0].email,
                          roleAdmin: results[0].roleAdmin,
                          token: jwt.sign(
                          { userId: results[0].id},
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn : '24h'}
                          ) 
                      })
                  }
              })
              .catch(() => {
                  return res.status(500).json({ message : 'Erreur interne' })
              })
          }
      })
  }
}

exports.getOneUser = (req, res, next) => {
  const userId = req.params.id
    console.log(userId);
  dbParams.query(`SELECT * FROM users WHERE user.id = ${req.params.id}`, function(err,result){
    if (err){
        console.log(err);
        return res.status(400).json({ message : "Erreur interne" })
    }
    return res.status(201).json({ result })
})
};

exports.deleteUser = (req, res, next) => {
  dbParams.query(`DELETE FROM users WHERE user.id = ${req.params.id}`, (error, result, field) => {
    if (error) {
        return res.status(400).json({
            error
        });
    }
    return res.status(200).json(result);
});
};