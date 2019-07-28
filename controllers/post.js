
exports.getPost = (req, res)=> {
  res.json({
    'posts' : [
      {titiel: 'First post'},
      {titiel: 'Second post'}
    ]
  });
}

