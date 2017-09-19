module.exports = function(router, userTools) {
  router.get('/home/:userId', function (req, res) {
    res.redirect('/users/show/' + req.params.userId);
  });
}
