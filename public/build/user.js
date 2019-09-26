(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user"],{

/***/ "./assets/js/user.js":
/*!***************************!*\
  !*** ./assets/js/user.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {$(document).ready(function () {\n  var email = $('#registration_form_email');\n  var userRegistationAlert = $('#user-registration-alert');\n  userRegistationAlert.hide();\n  email.on('blur', function (event) {\n    $.ajax({\n      url: email.data('url'),\n      type: 'POST',\n      dataType: 'json',\n      data: {\n        'email': email.val()\n      },\n      async: true,\n      success: function success(email) {\n        if (email) {\n          userRegistationAlert.show();\n        } else {\n          userRegistationAlert.hide();\n        }\n      },\n      error: function error() {}\n    });\n  });\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./assets/js/user.js?");

/***/ })

},[["./assets/js/user.js","runtime","vendors~app~user"]]]);