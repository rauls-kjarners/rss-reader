$(document).ready(function() {
    let email = $('#registration_form_email');
    let userRegistationAlert = $('#user-registration-alert');

    userRegistationAlert.hide();

    email.on('blur', function(event) {
        $.ajax({
            url: email.data('url'),
            type: 'POST',
            dataType: 'json',
            data: {
                'email': email.val()
            },
            async: true,

            success: function(email) {
                if (email) {
                    userRegistationAlert.show();
                } else {
                    userRegistationAlert.hide();
                }
            },
            error : function() {}
        });
    });
});
