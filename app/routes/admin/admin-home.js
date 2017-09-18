module.exports = function(router, users, apps, datasources) {
  router.get('/admin/home', function (req, res) {
    res.render('admin/home/index', {
      users: users,
      apps: apps,
      datasources: datasources
    });
  });
}
