module.exports = function(router, users, apps, groups, datasources) {
  router.get('/home/:userId', function (req, res) {
    // get stuff to show here
    res.render('home/index');
  });
}
