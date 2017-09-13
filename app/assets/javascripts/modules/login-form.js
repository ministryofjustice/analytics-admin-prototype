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

      if (newUserType === 'super-admin') {
        $('#user_email').val(newUserType + self.emailSuffix);
        $('#user_id').val('-1');
      } else {
        self.populateRegularUser();
      }
    });

    $('#user-select').on('change', function() {
      self.populateRegularUser();
    });
  },

  getRegularUser: function() {
    var regularUser = {
      id: $('#user-select').val(),
      email: $('#user-select').find('option:selected').data('useremail'),
      name: $('#user-select').find('option:selected').text()
    };

    return regularUser;
  },

  populateRegularUser: function() {
    var self = this,
      regularUser = self.getRegularUser();

    $('#user_email').val(regularUser.email);
    $('#user_id').val(regularUser.id);
    $('#user_name').val(regularUser.name);
  }
};
