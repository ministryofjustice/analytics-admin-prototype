'use strict';

moj.Modules.loginForm = {
  radioName: 'select-user-type',
  emailSuffix: '@prototype.gov.uk',

  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    var self = this;

    $('[name=' + self.radioName + ']').on('change', function(e) {
      var newUserType = $(e.target).val();
      $('#user_type').val(newUserType);
      $('#username').val(newUserType + self.emailSuffix);
    });
  }
};
