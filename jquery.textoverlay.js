/*!
 * jQuery.textoverlay.js
 *
 * Repository: https://github.com/yuku-t/jquery-textoverlay
 * License:    MIT
 * Author:     Yuku Takahashi
 */

;(function ($) {

  'use strict';

  /**
   * Bind the func to the context.
   */
  var bind = function (func, context) {
    if (func.bind) {
      // Use native Function#bind if it's available.
      return func.bind(context);
    } else {
      return function () {
        func.apply(context, arguments);
      };
    }
  };

  /**
   * Get the styles of any element from property names.
   */
  var getStyles = (function () {
    var color;
    color = $('<div></div>').css(['color']).color;
    if (typeof color !== 'undefined') {
      return function ($el, properties) {
        return $el.css(properties);
      };
    } else {  // for jQuery 1.8 or below
      return function ($el, properties) {
        var styles;
        styles = {};
        $.each(properties, function (i, property) {
          styles[property] = $el.css(property);
        });
        return styles
      };
    }
  })();

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }

  var entityRegexe = /[&<>"'\/]/g

  /**
   * Function for escaping strings to HTML interpolation.
   */
  var escape = function (str) {
    return str.replace(entityRegexe, function (match) {
      return entityMap[match];
    })
  };

  /**
   * Determine if the array contains a given value.
   */
  var include = function (array, value) {
    var i, l;
    if (array.indexOf) return array.indexOf(value) != -1;
    for (i = 0, l = array.length; i < l; i++) {
      if (array[i] === value) return true;
    }
    return false;
  };

  var Overlay = (function () {

    var html, css, textareaToWrapper, textareaToOverlay;

    html = {
      wrapper: '<div class="textoverlay-wrapper"></div>',
      overlay: '<div class="textoverlay"></div>'
    };

    css = {
      wrapper: {
        margin: 0,
        padding: 0
      },
      overlay: {
        position: 'absolute',
        overflow: 'hidden',
        'white-space': 'pre-wrap',
        'word-wrap': 'break-word'
      },
      textarea: {
        background: 'transparent',
        position: 'relative',
        outline: 0,
        color: 'transparent'
      }
    };

    // CSS properties transport from textarea to wrapper
    textareaToWrapper = ['display'];
    // CSS properties transport from textarea to overlay
    textareaToOverlay = ['margin', 'padding', 'color', 'font-family',
      'font-weight', 'font-size', 'background'];

    function Overlay($textarea, options) {
      var $wrapper, position;

      // Setup wrapper element
      position = $textarea.css('position');
      if (position === 'static') position = 'relative';
      $wrapper = $(html.wrapper).css(
        $.extend({}, css.wrapper, getStyles($textarea, textareaToWrapper), {
          position: position
        })
      );

      // Setup overlay
      this.$el = $(html.overlay).css(
        $.extend({}, css.overlay, getStyles($textarea, textareaToOverlay), {
          top: parseInt($textarea.css('border-top-width')),
          right: parseInt($textarea.css('border-right-width')),
          bottom: 4, //parseInt($textarea.css('border-bottom-width')),
          left: parseInt($textarea.css('border-left-width'))
        })
      );

      // Setup textarea
      this.$textarea = $textarea.css(css.textarea);

      // Render wrapper and overlay
      this.$textarea.wrap($wrapper).before(this.$el);

      // Intercept val method
      // Note that jQuery.fn.val does not trigger any event.
      this.$textarea.origVal = $textarea.val;
      this.$textarea.val = bind(this.val, this);

      // Bind event handlers
      this.$textarea.on('input', bind(this.onInput, this));
    }

    $.extend(Overlay.prototype, {
      val: function (value) {
        return value == null ? this.$textarea.origVal() : this.setVal(value);
      },

      setVal: function (value) {
        this.$textarea.origVal(value);
        return this.renderTextOnOverlay();
      },

      onInput: function (e) {
        this.renderTextOnOverlay();
      },

      renderTextOnOverlay: function () {
        var text = this.$textarea.val();
        // TODO: markup specified words
        this.$el.text(text);
        return this;
      }
    });

    return Overlay;

  })();

  $.fn.overlay = function (options) {
    new Overlay(this, options);
    return this;
  };

})(window.jQuery);
