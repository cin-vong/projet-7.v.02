const dbParams = require('../dbParams');

exports.comment = (req, res, next) => {
    const comment = {
        authorname: req.body.authorname,
        commentary: req.body.commentary,
        attachement: req.body.attachement
    }
    dbParams.query('INSERT INTO comments SET ?', comment, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
    return res.status(201).json({ result, message: 'Commentaire posté !' })
    })
};

exports.getAllComments = (req, res, next) => {
    dbParams.query('SELECT * FROM comments ORDER BY date DESC', (err, result) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
        return res.status(200).json({result});
        
    })
};

exports.getOneComment = (req, res, next) => {
    const commentId = req.params.id
    dbParams.query('SELECT * FROM comments WHERE postid="'+commentId+'"', function(err,result){
      if (err){
          console.log(err);
          return res.status(400).json({ message : "Erreur interne" })
      }
      return res.status(201).json({ result })
  })
};

exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id
    dbParams.query('DELETE FROM comments WHERE id=?', commentId, function(err,result){
        if (err){
            console.log(err);
            return res.status(400).json({ message : "Erreur interne" })
        }
        return res.status(201).json({ message : "Commentaire supprimée."})
    })
};