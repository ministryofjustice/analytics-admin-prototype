module.exports = function(router, userTools) {
  router.get('/users/show/:userId', function (req, res) {
    var user = userTools.getUser(req.params.userId),
      userApps = userTools.getUserApps(req.params.userId),
      userDatasources = userTools.getUserDatasources(req.params.userId),
      data = req.session.data,
      signedInUser = false;

    if(data && data.user_id) {
      signedInUser = (parseInt(data.user_id, 10) === parseInt(req.params.userId, 10) ? true : false);
    }

console.log(userDatasources);

    res.render('users/show', {
      user: user,
      userApps: userApps,
      userDatasources: userDatasources,
      signedInUser: signedInUser
    });
  });
}
