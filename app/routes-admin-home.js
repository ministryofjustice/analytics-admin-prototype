module.exports = function(router, users, apps, groups, datasources) {
  router.get('/admin/home', function (req, res) {
    res.render('admin/home/index', {
      users: users,
      apps: apps,
      groups: groups,
      datasources: datasources
    });
  });
}
