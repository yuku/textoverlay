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
        outline: 0
      }
    };

    // CSS properties transport from textarea to wrapper
    textareaToWrapper = ['display', 'background'];
    // CSS properties transport from textarea to overlay
    textareaToOverlay = ['margin', 'padding'];

    function Overlay($textarea) {
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
          bottom: 0, //parseInt($textarea.css('border-bottom-width')),
          right: parseInt($textarea.css('border-right-width')),
          left: parseInt($textarea.css('border-left-width'))
        })
      );

      // Setup textarea
      this.$textarea = $textarea.css(css.textarea);

      // Render wrapper and overlay
      this.$textarea.wrap($wrapper).before(this.$el);
    }

    return Overlay;

  })();

  $.fn.overlay = function (options) {
    new Overlay(this, options);
    return this;
  };

})(window.jQuery);
