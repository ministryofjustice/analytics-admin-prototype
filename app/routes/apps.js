module.exports = function(router, appTools) {
  router.get('/apps/show/:appId', function (req, res) {
    var app = appTools.getApp(req.params.appId),
      appGroup = appTools.getAppGroup(req.params.appId),
      appDatasources = appTools.getAppDatasources(req.params.appId);

    res.render('apps/show', {
      app: app,
      appGroup: appGroup,
      appDatasources: appDatasources
    });
  });
}
