(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~app"],{

/***/ "./node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js":
/*!***************************************************************************!*\
  !*** ./node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================\n * Bootstrap: alert.js v3.4.1\n * https://getbootstrap.com/docs/3.4/javascript/#alerts\n * ========================================================================\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n * ======================================================================== */\n\n\n+function ($) {\n  'use strict';\n\n  // ALERT CLASS DEFINITION\n  // ======================\n\n  var dismiss = '[data-dismiss=\"alert\"]'\n  var Alert   = function (el) {\n    $(el).on('click', dismiss, this.close)\n  }\n\n  Alert.VERSION = '3.4.1'\n\n  Alert.TRANSITION_DURATION = 150\n\n  Alert.prototype.close = function (e) {\n    var $this    = $(this)\n    var selector = $this.attr('data-target')\n\n    if (!selector) {\n      selector = $this.attr('href')\n      selector = selector && selector.replace(/.*(?=#[^\\s]*$)/, '') // strip for ie7\n    }\n\n    selector    = selector === '#' ? [] : selector\n    var $parent = $(document).find(selector)\n\n    if (e) e.preventDefault()\n\n    if (!$parent.length) {\n      $parent = $this.closest('.alert')\n    }\n\n    $parent.trigger(e = $.Event('close.bs.alert'))\n\n    if (e.isDefaultPrevented()) return\n\n    $parent.removeClass('in')\n\n    function removeElement() {\n      // detach from parent, fire event then clean up data\n      $parent.detach().trigger('closed.bs.alert').remove()\n    }\n\n    $.support.transition && $parent.hasClass('fade') ?\n      $parent\n        .one('bsTransitionEnd', removeElement)\n        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :\n      removeElement()\n  }\n\n\n  // ALERT PLUGIN DEFINITION\n  // =======================\n\n  function Plugin(option) {\n    return this.each(function () {\n      var $this = $(this)\n      var data  = $this.data('bs.alert')\n\n      if (!data) $this.data('bs.alert', (data = new Alert(this)))\n      if (typeof option == 'string') data[option].call($this)\n    })\n  }\n\n  var old = $.fn.alert\n\n  $.fn.alert             = Plugin\n  $.fn.alert.Constructor = Alert\n\n\n  // ALERT NO CONFLICT\n  // =================\n\n  $.fn.alert.noConflict = function () {\n    $.fn.alert = old\n    return this\n  }\n\n\n  // ALERT DATA-API\n  // ==============\n\n  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)\n\n}(jQuery);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js?");

/***/ }),

/***/ "./node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js":
/*!******************************************************************************!*\
  !*** ./node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================\n * Bootstrap: collapse.js v3.4.1\n * https://getbootstrap.com/docs/3.4/javascript/#collapse\n * ========================================================================\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n * ======================================================================== */\n\n/* jshint latedef: false */\n\n+function ($) {\n  'use strict';\n\n  // COLLAPSE PUBLIC CLASS DEFINITION\n  // ================================\n\n  var Collapse = function (element, options) {\n    this.$element      = $(element)\n    this.options       = $.extend({}, Collapse.DEFAULTS, options)\n    this.$trigger      = $('[data-toggle=\"collapse\"][href=\"#' + element.id + '\"],' +\n                           '[data-toggle=\"collapse\"][data-target=\"#' + element.id + '\"]')\n    this.transitioning = null\n\n    if (this.options.parent) {\n      this.$parent = this.getParent()\n    } else {\n      this.addAriaAndCollapsedClass(this.$element, this.$trigger)\n    }\n\n    if (this.options.toggle) this.toggle()\n  }\n\n  Collapse.VERSION  = '3.4.1'\n\n  Collapse.TRANSITION_DURATION = 350\n\n  Collapse.DEFAULTS = {\n    toggle: true\n  }\n\n  Collapse.prototype.dimension = function () {\n    var hasWidth = this.$element.hasClass('width')\n    return hasWidth ? 'width' : 'height'\n  }\n\n  Collapse.prototype.show = function () {\n    if (this.transitioning || this.$element.hasClass('in')) return\n\n    var activesData\n    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')\n\n    if (actives && actives.length) {\n      activesData = actives.data('bs.collapse')\n      if (activesData && activesData.transitioning) return\n    }\n\n    var startEvent = $.Event('show.bs.collapse')\n    this.$element.trigger(startEvent)\n    if (startEvent.isDefaultPrevented()) return\n\n    if (actives && actives.length) {\n      Plugin.call(actives, 'hide')\n      activesData || actives.data('bs.collapse', null)\n    }\n\n    var dimension = this.dimension()\n\n    this.$element\n      .removeClass('collapse')\n      .addClass('collapsing')[dimension](0)\n      .attr('aria-expanded', true)\n\n    this.$trigger\n      .removeClass('collapsed')\n      .attr('aria-expanded', true)\n\n    this.transitioning = 1\n\n    var complete = function () {\n      this.$element\n        .removeClass('collapsing')\n        .addClass('collapse in')[dimension]('')\n      this.transitioning = 0\n      this.$element\n        .trigger('shown.bs.collapse')\n    }\n\n    if (!$.support.transition) return complete.call(this)\n\n    var scrollSize = $.camelCase(['scroll', dimension].join('-'))\n\n    this.$element\n      .one('bsTransitionEnd', $.proxy(complete, this))\n      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])\n  }\n\n  Collapse.prototype.hide = function () {\n    if (this.transitioning || !this.$element.hasClass('in')) return\n\n    var startEvent = $.Event('hide.bs.collapse')\n    this.$element.trigger(startEvent)\n    if (startEvent.isDefaultPrevented()) return\n\n    var dimension = this.dimension()\n\n    this.$element[dimension](this.$element[dimension]())[0].offsetHeight\n\n    this.$element\n      .addClass('collapsing')\n      .removeClass('collapse in')\n      .attr('aria-expanded', false)\n\n    this.$trigger\n      .addClass('collapsed')\n      .attr('aria-expanded', false)\n\n    this.transitioning = 1\n\n    var complete = function () {\n      this.transitioning = 0\n      this.$element\n        .removeClass('collapsing')\n        .addClass('collapse')\n        .trigger('hidden.bs.collapse')\n    }\n\n    if (!$.support.transition) return complete.call(this)\n\n    this.$element\n      [dimension](0)\n      .one('bsTransitionEnd', $.proxy(complete, this))\n      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)\n  }\n\n  Collapse.prototype.toggle = function () {\n    this[this.$element.hasClass('in') ? 'hide' : 'show']()\n  }\n\n  Collapse.prototype.getParent = function () {\n    return $(document).find(this.options.parent)\n      .find('[data-toggle=\"collapse\"][data-parent=\"' + this.options.parent + '\"]')\n      .each($.proxy(function (i, element) {\n        var $element = $(element)\n        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)\n      }, this))\n      .end()\n  }\n\n  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {\n    var isOpen = $element.hasClass('in')\n\n    $element.attr('aria-expanded', isOpen)\n    $trigger\n      .toggleClass('collapsed', !isOpen)\n      .attr('aria-expanded', isOpen)\n  }\n\n  function getTargetFromTrigger($trigger) {\n    var href\n    var target = $trigger.attr('data-target')\n      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\\s]+$)/, '') // strip for ie7\n\n    return $(document).find(target)\n  }\n\n\n  // COLLAPSE PLUGIN DEFINITION\n  // ==========================\n\n  function Plugin(option) {\n    return this.each(function () {\n      var $this   = $(this)\n      var data    = $this.data('bs.collapse')\n      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)\n\n      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false\n      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))\n      if (typeof option == 'string') data[option]()\n    })\n  }\n\n  var old = $.fn.collapse\n\n  $.fn.collapse             = Plugin\n  $.fn.collapse.Constructor = Collapse\n\n\n  // COLLAPSE NO CONFLICT\n  // ====================\n\n  $.fn.collapse.noConflict = function () {\n    $.fn.collapse = old\n    return this\n  }\n\n\n  // COLLAPSE DATA-API\n  // =================\n\n  $(document).on('click.bs.collapse.data-api', '[data-toggle=\"collapse\"]', function (e) {\n    var $this   = $(this)\n\n    if (!$this.attr('data-target')) e.preventDefault()\n\n    var $target = getTargetFromTrigger($this)\n    var data    = $target.data('bs.collapse')\n    var option  = data ? 'toggle' : $this.data()\n\n    Plugin.call($target, option)\n  })\n\n}(jQuery);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js?");

/***/ }),

/***/ "./node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js":
/*!******************************************************************************!*\
  !*** ./node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================\n * Bootstrap: dropdown.js v3.4.1\n * https://getbootstrap.com/docs/3.4/javascript/#dropdowns\n * ========================================================================\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n * ======================================================================== */\n\n\n+function ($) {\n  'use strict';\n\n  // DROPDOWN CLASS DEFINITION\n  // =========================\n\n  var backdrop = '.dropdown-backdrop'\n  var toggle   = '[data-toggle=\"dropdown\"]'\n  var Dropdown = function (element) {\n    $(element).on('click.bs.dropdown', this.toggle)\n  }\n\n  Dropdown.VERSION = '3.4.1'\n\n  function getParent($this) {\n    var selector = $this.attr('data-target')\n\n    if (!selector) {\n      selector = $this.attr('href')\n      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\\s]*$)/, '') // strip for ie7\n    }\n\n    var $parent = selector !== '#' ? $(document).find(selector) : null\n\n    return $parent && $parent.length ? $parent : $this.parent()\n  }\n\n  function clearMenus(e) {\n    if (e && e.which === 3) return\n    $(backdrop).remove()\n    $(toggle).each(function () {\n      var $this         = $(this)\n      var $parent       = getParent($this)\n      var relatedTarget = { relatedTarget: this }\n\n      if (!$parent.hasClass('open')) return\n\n      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return\n\n      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))\n\n      if (e.isDefaultPrevented()) return\n\n      $this.attr('aria-expanded', 'false')\n      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))\n    })\n  }\n\n  Dropdown.prototype.toggle = function (e) {\n    var $this = $(this)\n\n    if ($this.is('.disabled, :disabled')) return\n\n    var $parent  = getParent($this)\n    var isActive = $parent.hasClass('open')\n\n    clearMenus()\n\n    if (!isActive) {\n      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {\n        // if mobile we use a backdrop because click events don't delegate\n        $(document.createElement('div'))\n          .addClass('dropdown-backdrop')\n          .insertAfter($(this))\n          .on('click', clearMenus)\n      }\n\n      var relatedTarget = { relatedTarget: this }\n      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))\n\n      if (e.isDefaultPrevented()) return\n\n      $this\n        .trigger('focus')\n        .attr('aria-expanded', 'true')\n\n      $parent\n        .toggleClass('open')\n        .trigger($.Event('shown.bs.dropdown', relatedTarget))\n    }\n\n    return false\n  }\n\n  Dropdown.prototype.keydown = function (e) {\n    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return\n\n    var $this = $(this)\n\n    e.preventDefault()\n    e.stopPropagation()\n\n    if ($this.is('.disabled, :disabled')) return\n\n    var $parent  = getParent($this)\n    var isActive = $parent.hasClass('open')\n\n    if (!isActive && e.which != 27 || isActive && e.which == 27) {\n      if (e.which == 27) $parent.find(toggle).trigger('focus')\n      return $this.trigger('click')\n    }\n\n    var desc = ' li:not(.disabled):visible a'\n    var $items = $parent.find('.dropdown-menu' + desc)\n\n    if (!$items.length) return\n\n    var index = $items.index(e.target)\n\n    if (e.which == 38 && index > 0)                 index--         // up\n    if (e.which == 40 && index < $items.length - 1) index++         // down\n    if (!~index)                                    index = 0\n\n    $items.eq(index).trigger('focus')\n  }\n\n\n  // DROPDOWN PLUGIN DEFINITION\n  // ==========================\n\n  function Plugin(option) {\n    return this.each(function () {\n      var $this = $(this)\n      var data  = $this.data('bs.dropdown')\n\n      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))\n      if (typeof option == 'string') data[option].call($this)\n    })\n  }\n\n  var old = $.fn.dropdown\n\n  $.fn.dropdown             = Plugin\n  $.fn.dropdown.Constructor = Dropdown\n\n\n  // DROPDOWN NO CONFLICT\n  // ====================\n\n  $.fn.dropdown.noConflict = function () {\n    $.fn.dropdown = old\n    return this\n  }\n\n\n  // APPLY TO STANDARD DROPDOWN ELEMENTS\n  // ===================================\n\n  $(document)\n    .on('click.bs.dropdown.data-api', clearMenus)\n    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })\n    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)\n    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)\n    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)\n\n}(jQuery);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js?");

/***/ }),

/***/ "./node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js":
/*!***************************************************************************!*\
  !*** ./node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================\n * Bootstrap: modal.js v3.4.1\n * https://getbootstrap.com/docs/3.4/javascript/#modals\n * ========================================================================\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n * ======================================================================== */\n\n\n+function ($) {\n  'use strict';\n\n  // MODAL CLASS DEFINITION\n  // ======================\n\n  var Modal = function (element, options) {\n    this.options = options\n    this.$body = $(document.body)\n    this.$element = $(element)\n    this.$dialog = this.$element.find('.modal-dialog')\n    this.$backdrop = null\n    this.isShown = null\n    this.originalBodyPad = null\n    this.scrollbarWidth = 0\n    this.ignoreBackdropClick = false\n    this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'\n\n    if (this.options.remote) {\n      this.$element\n        .find('.modal-content')\n        .load(this.options.remote, $.proxy(function () {\n          this.$element.trigger('loaded.bs.modal')\n        }, this))\n    }\n  }\n\n  Modal.VERSION = '3.4.1'\n\n  Modal.TRANSITION_DURATION = 300\n  Modal.BACKDROP_TRANSITION_DURATION = 150\n\n  Modal.DEFAULTS = {\n    backdrop: true,\n    keyboard: true,\n    show: true\n  }\n\n  Modal.prototype.toggle = function (_relatedTarget) {\n    return this.isShown ? this.hide() : this.show(_relatedTarget)\n  }\n\n  Modal.prototype.show = function (_relatedTarget) {\n    var that = this\n    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })\n\n    this.$element.trigger(e)\n\n    if (this.isShown || e.isDefaultPrevented()) return\n\n    this.isShown = true\n\n    this.checkScrollbar()\n    this.setScrollbar()\n    this.$body.addClass('modal-open')\n\n    this.escape()\n    this.resize()\n\n    this.$element.on('click.dismiss.bs.modal', '[data-dismiss=\"modal\"]', $.proxy(this.hide, this))\n\n    this.$dialog.on('mousedown.dismiss.bs.modal', function () {\n      that.$element.one('mouseup.dismiss.bs.modal', function (e) {\n        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true\n      })\n    })\n\n    this.backdrop(function () {\n      var transition = $.support.transition && that.$element.hasClass('fade')\n\n      if (!that.$element.parent().length) {\n        that.$element.appendTo(that.$body) // don't move modals dom position\n      }\n\n      that.$element\n        .show()\n        .scrollTop(0)\n\n      that.adjustDialog()\n\n      if (transition) {\n        that.$element[0].offsetWidth // force reflow\n      }\n\n      that.$element.addClass('in')\n\n      that.enforceFocus()\n\n      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })\n\n      transition ?\n        that.$dialog // wait for modal to slide in\n          .one('bsTransitionEnd', function () {\n            that.$element.trigger('focus').trigger(e)\n          })\n          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :\n        that.$element.trigger('focus').trigger(e)\n    })\n  }\n\n  Modal.prototype.hide = function (e) {\n    if (e) e.preventDefault()\n\n    e = $.Event('hide.bs.modal')\n\n    this.$element.trigger(e)\n\n    if (!this.isShown || e.isDefaultPrevented()) return\n\n    this.isShown = false\n\n    this.escape()\n    this.resize()\n\n    $(document).off('focusin.bs.modal')\n\n    this.$element\n      .removeClass('in')\n      .off('click.dismiss.bs.modal')\n      .off('mouseup.dismiss.bs.modal')\n\n    this.$dialog.off('mousedown.dismiss.bs.modal')\n\n    $.support.transition && this.$element.hasClass('fade') ?\n      this.$element\n        .one('bsTransitionEnd', $.proxy(this.hideModal, this))\n        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :\n      this.hideModal()\n  }\n\n  Modal.prototype.enforceFocus = function () {\n    $(document)\n      .off('focusin.bs.modal') // guard against infinite focus loop\n      .on('focusin.bs.modal', $.proxy(function (e) {\n        if (document !== e.target &&\n          this.$element[0] !== e.target &&\n          !this.$element.has(e.target).length) {\n          this.$element.trigger('focus')\n        }\n      }, this))\n  }\n\n  Modal.prototype.escape = function () {\n    if (this.isShown && this.options.keyboard) {\n      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {\n        e.which == 27 && this.hide()\n      }, this))\n    } else if (!this.isShown) {\n      this.$element.off('keydown.dismiss.bs.modal')\n    }\n  }\n\n  Modal.prototype.resize = function () {\n    if (this.isShown) {\n      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))\n    } else {\n      $(window).off('resize.bs.modal')\n    }\n  }\n\n  Modal.prototype.hideModal = function () {\n    var that = this\n    this.$element.hide()\n    this.backdrop(function () {\n      that.$body.removeClass('modal-open')\n      that.resetAdjustments()\n      that.resetScrollbar()\n      that.$element.trigger('hidden.bs.modal')\n    })\n  }\n\n  Modal.prototype.removeBackdrop = function () {\n    this.$backdrop && this.$backdrop.remove()\n    this.$backdrop = null\n  }\n\n  Modal.prototype.backdrop = function (callback) {\n    var that = this\n    var animate = this.$element.hasClass('fade') ? 'fade' : ''\n\n    if (this.isShown && this.options.backdrop) {\n      var doAnimate = $.support.transition && animate\n\n      this.$backdrop = $(document.createElement('div'))\n        .addClass('modal-backdrop ' + animate)\n        .appendTo(this.$body)\n\n      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {\n        if (this.ignoreBackdropClick) {\n          this.ignoreBackdropClick = false\n          return\n        }\n        if (e.target !== e.currentTarget) return\n        this.options.backdrop == 'static'\n          ? this.$element[0].focus()\n          : this.hide()\n      }, this))\n\n      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow\n\n      this.$backdrop.addClass('in')\n\n      if (!callback) return\n\n      doAnimate ?\n        this.$backdrop\n          .one('bsTransitionEnd', callback)\n          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :\n        callback()\n\n    } else if (!this.isShown && this.$backdrop) {\n      this.$backdrop.removeClass('in')\n\n      var callbackRemove = function () {\n        that.removeBackdrop()\n        callback && callback()\n      }\n      $.support.transition && this.$element.hasClass('fade') ?\n        this.$backdrop\n          .one('bsTransitionEnd', callbackRemove)\n          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :\n        callbackRemove()\n\n    } else if (callback) {\n      callback()\n    }\n  }\n\n  // these following methods are used to handle overflowing modals\n\n  Modal.prototype.handleUpdate = function () {\n    this.adjustDialog()\n  }\n\n  Modal.prototype.adjustDialog = function () {\n    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight\n\n    this.$element.css({\n      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',\n      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''\n    })\n  }\n\n  Modal.prototype.resetAdjustments = function () {\n    this.$element.css({\n      paddingLeft: '',\n      paddingRight: ''\n    })\n  }\n\n  Modal.prototype.checkScrollbar = function () {\n    var fullWindowWidth = window.innerWidth\n    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8\n      var documentElementRect = document.documentElement.getBoundingClientRect()\n      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)\n    }\n    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth\n    this.scrollbarWidth = this.measureScrollbar()\n  }\n\n  Modal.prototype.setScrollbar = function () {\n    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)\n    this.originalBodyPad = document.body.style.paddingRight || ''\n    var scrollbarWidth = this.scrollbarWidth\n    if (this.bodyIsOverflowing) {\n      this.$body.css('padding-right', bodyPad + scrollbarWidth)\n      $(this.fixedContent).each(function (index, element) {\n        var actualPadding = element.style.paddingRight\n        var calculatedPadding = $(element).css('padding-right')\n        $(element)\n          .data('padding-right', actualPadding)\n          .css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px')\n      })\n    }\n  }\n\n  Modal.prototype.resetScrollbar = function () {\n    this.$body.css('padding-right', this.originalBodyPad)\n    $(this.fixedContent).each(function (index, element) {\n      var padding = $(element).data('padding-right')\n      $(element).removeData('padding-right')\n      element.style.paddingRight = padding ? padding : ''\n    })\n  }\n\n  Modal.prototype.measureScrollbar = function () { // thx walsh\n    var scrollDiv = document.createElement('div')\n    scrollDiv.className = 'modal-scrollbar-measure'\n    this.$body.append(scrollDiv)\n    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth\n    this.$body[0].removeChild(scrollDiv)\n    return scrollbarWidth\n  }\n\n\n  // MODAL PLUGIN DEFINITION\n  // =======================\n\n  function Plugin(option, _relatedTarget) {\n    return this.each(function () {\n      var $this = $(this)\n      var data = $this.data('bs.modal')\n      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)\n\n      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))\n      if (typeof option == 'string') data[option](_relatedTarget)\n      else if (options.show) data.show(_relatedTarget)\n    })\n  }\n\n  var old = $.fn.modal\n\n  $.fn.modal = Plugin\n  $.fn.modal.Constructor = Modal\n\n\n  // MODAL NO CONFLICT\n  // =================\n\n  $.fn.modal.noConflict = function () {\n    $.fn.modal = old\n    return this\n  }\n\n\n  // MODAL DATA-API\n  // ==============\n\n  $(document).on('click.bs.modal.data-api', '[data-toggle=\"modal\"]', function (e) {\n    var $this = $(this)\n    var href = $this.attr('href')\n    var target = $this.attr('data-target') ||\n      (href && href.replace(/.*(?=#[^\\s]+$)/, '')) // strip for ie7\n\n    var $target = $(document).find(target)\n    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())\n\n    if ($this.is('a')) e.preventDefault()\n\n    $target.one('show.bs.modal', function (showEvent) {\n      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown\n      $target.one('hidden.bs.modal', function () {\n        $this.is(':visible') && $this.trigger('focus')\n      })\n    })\n    Plugin.call($target, option, this)\n  })\n\n}(jQuery);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js?");

/***/ }),

/***/ "./node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js":
/*!********************************************************************************!*\
  !*** ./node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================\n * Bootstrap: transition.js v3.4.1\n * https://getbootstrap.com/docs/3.4/javascript/#transitions\n * ========================================================================\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n * ======================================================================== */\n\n\n+function ($) {\n  'use strict';\n\n  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)\n  // ============================================================\n\n  function transitionEnd() {\n    var el = document.createElement('bootstrap')\n\n    var transEndEventNames = {\n      WebkitTransition : 'webkitTransitionEnd',\n      MozTransition    : 'transitionend',\n      OTransition      : 'oTransitionEnd otransitionend',\n      transition       : 'transitionend'\n    }\n\n    for (var name in transEndEventNames) {\n      if (el.style[name] !== undefined) {\n        return { end: transEndEventNames[name] }\n      }\n    }\n\n    return false // explicit for ie8 (  ._.)\n  }\n\n  // https://blog.alexmaccaw.com/css-transitions\n  $.fn.emulateTransitionEnd = function (duration) {\n    var called = false\n    var $el = this\n    $(this).one('bsTransitionEnd', function () { called = true })\n    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }\n    setTimeout(callback, duration)\n    return this\n  }\n\n  $(function () {\n    $.support.transition = transitionEnd()\n\n    if (!$.support.transition) return\n\n    $.event.special.bsTransitionEnd = {\n      bindType: $.support.transition.end,\n      delegateType: $.support.transition.end,\n      handle: function (e) {\n        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)\n      }\n    }\n  })\n\n}(jQuery);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js?");

/***/ })

}]);