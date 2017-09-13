module.exports = function(router, users, apps, groups, datasources) {
  router.get('/home/:userId', function (req, res) {
    // TODO: YOU ARE HERE
    // don't need all this stuff, use more tools to get the relevant
    // stuff per user
    res.render('home/index', {
      users: users,
      apps: apps,
      groups: groups,
      datasources: datasources
    });
  });
}
