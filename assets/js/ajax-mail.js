(function ($) {
  "use strict";

  var form = '.contact-form';
  var invalidCls = 'is-invalid';
  var $email = '[name="email"]';
  var $validation = '[name="name"],[name="email"],[name="subject"],[name="message"]'; // Must be use (,) without any space
  var formMessages = $('.form-messages');
  
  function sendContact() {
    var formData = $(form).serialize();
    var valid;
    valid = validateContact();
    if (valid) {
      jQuery.ajax({
        url: $(form).attr('action'),
        data: formData,
        type: "POST"
      })
      .done(function (response){
        // Make sure that the formMessages div has the 'success' class.
        formMessages.removeClass('error');
        formMessages.addClass('success');
        // Set a clean success message (ignore raw server HTML/code)
        formMessages.text('Thank you! Your message has been sent successfully.');
        // Clear the form.
        $(form + ' input:not([type="submit"]),'+ form+' textarea').val('');
      })
      .fail(function (data){
        // Make sure that the formMessages div has the 'error' class.
        formMessages.removeClass('success');
        formMessages.addClass('error');
        // Set a clean error message (do not show raw HTML/code)
        formMessages.text('Oops! Something went wrong and your message could not be sent. Please try again later.');
      });
    };
  };

  function validateContact() {
    var valid = true;
    var formInput;

    function unvalid($validation) {
      $validation = $validation.split(',')
      for (var i = 0; i < $validation.length; i++) {
        formInput = form + ' ' + $validation[i];
        if (!$(formInput).val()) {
          $(formInput).addClass(invalidCls)
          valid = false;
        } else {
          $(formInput).removeClass(invalidCls)
          valid = true;
        };
      };
    };
    unvalid($validation);
    
    if (!$($email).val() || !$($email).val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
      $($email).addClass(invalidCls)
      valid = false;
    } else {
      $($email).removeClass(invalidCls)
      valid = true;
    };

    
    return valid;
  };



  $(form).on('submit', function (element) {
    element.preventDefault();
    sendContact();
  });

})(jQuery);