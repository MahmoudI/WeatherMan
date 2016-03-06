var WeatherManager = WeatherManager || {};

WeatherManager.NotificationManager = (function ($) {
    'use strict';
    var settings = {
        containerSelector: ".banner-container",
        bannerSelector: ".banner",
        approveSelector: ".yes",
        declineSelector: ".no",
        approveCallback: function () {
        },
        declineCallback: function () {
        }
    };
    var init = function (options) {
            settings = $.extend({}, settings, options || {});
            $(settings.approveSelector).click(onApprove);
            $(settings.declineSelector).click(onDecline);
        },
        show = function () {
            $(settings.bannerSelector).slideDown();
        },
        hide = function () {
            $(settings.bannerSelector).slideUp();
        },
        onApprove = function () {
            settings.approveCallback();
            hide();
        },
        onDecline = function () {
            settings.declineCallback();
            hide();
        };
    return {
        init: init,
        show: show,
        hide: hide
    };

})(jQuery);
