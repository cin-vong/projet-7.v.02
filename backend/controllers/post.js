const dbParams = require('../dbParams');
const jwt = require('jsonwebtoken')
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const createPost = {
        authorname: req.body.authorname,
        title: req.body.title,
        content: req.body.content,
        attachement: req.body.attachement
    }
    console.log(createPost);

    dbParams.query('INSERT INTO post SET ?', createPost, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
    return res.status(201).json({result, message: 'Votre message a bien été posté !' })
    })
};

exports.modifyOnePost = (req, res, next) => {
    dbParams.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};

exports.getOnePost = (req, res, next) => {
    const postId = req.params.id
    dbParams.query('SELECT * FROM post WHERE id="'+postId+'"', function(err,result){
      if (err){
          console.log(err);
          return res.status(400).json({ message : "Erreur interne" })
      }
      return res.status(201).json({ result })
  })
};

//actualités
exports.getAllPost = (req, res, next) => {
    dbParams.query('SELECT * FROM post ORDER BY date DESC', (err, result) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
        return res.status(200).json({result});
    })
};

exports.deletePost = (req, res, next) => {
    const postId = req.params.id
    dbParams.query('SELECT * FROM post WHERE id=?', postId,(err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json("Erreur interne")
        } else {
            const exportResult = result;
            const filename = exportResult[0].attachement
            fs.unlink(`images/${filename}`, () => {
                dbParams.query('DELETE FROM post WHERE id=?', postId, function(err,result){
                    if (err){
                        console.log(err)
                        return res.status(400).json({ message : "Erreur interne" })
                    } else {
                        dbParams.query('DELETE FROM comments WHERE postid=?', postId, function(err,result){
                            if (err){
                                console.log(err);
                                return res.status(400).json({ message : "Erreur interne" })
                            }
                            return res.status(201).json({message : 'Post supprimé avec ses commentaires'})
                        });
                    }
                })
            });
        }
    })
}