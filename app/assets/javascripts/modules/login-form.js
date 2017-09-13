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
      var $el = $(e.target),
        newUserType = $el.val();

      $('#user_type').val(newUserType);
      $('#homepage').val($el.data('homepage'));
      $('#username').val(newUserType + self.emailSuffix);
    });
  }
};
