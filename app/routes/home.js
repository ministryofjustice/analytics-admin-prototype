module.exports = function(router, userTools) {
  router.get('/home/:userId', function (req, res) {
    var user = userTools.getUser(req.params.userId),
      userApps = userTools.getUserApps(req.params.userId),
      userDatasources = userTools.getUserDatasources(req.params.userId);

    console.log(userDatasources);

    res.render('home/index', {
      user: user,
      userApps: userApps,
      userDatasources: userDatasources
    });
  });
}
