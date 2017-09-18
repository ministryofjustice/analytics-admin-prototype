module.exports = function(router, appTools) {
  router.get('/apps/show/:appId', function (req, res) {
    var app = appTools.getApp(req.params.appId);

    res.render('apps/show', {
      app: app
    });
  });
}
