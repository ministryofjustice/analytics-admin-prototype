module.exports = function(router, users, apps, datasources) {
  router.get('/home/:userId', function (req, res) {
    // get stuff to show here
    res.render('home/index');
  });
}
