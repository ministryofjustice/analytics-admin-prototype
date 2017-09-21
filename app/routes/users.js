module.exports = function(router, userTools) {
  router.get('/users/show/:userId', function (req, res) {
    var user = userTools.getUser(req.params.userId),
      userApps = userTools.getUserApps(req.params.userId),
      userDatasources = userTools.getUserDatasources(req.params.userId),
      data = req.session.data,
      signedInUserId;

    if(data && data.user_id) {
      signedInUserId = parseInt(data.user_id, 10);
    }

    res.render('users/show', {
      user: user,
      userApps: userApps,
      userDatasources: userDatasources,
      signedInUserId: signedInUserId
    });
  });
}
