var WeatherManager = WeatherManager || {};

(function ($) {
    'use strict';

    var useWeatherInput = function () {
            $('.weather-input').fadeIn();
            $('#btnGetWeather').click(getWeather);
        },
        useGeoLocation = function () {
            navigator.geolocation.getCurrentPosition(getCoordinatesComplete, WeatherManager.WeatherResultViewer.showError);
        },
        getWeather = function () {

            if ($('#zipCode').val().trim() !== "") {
                WeatherManager.OpenWeatherAdapter.getWeatherByZipCode($('#zipCode').val().trim());
            } else if ($('#country').val().trim() !== "") {
                WeatherManager.OpenWeatherAdapter.getWeatherByCountry($('#country').val().trim());
            }
        },
        getCoordinatesComplete = function (position) {
            WeatherManager.OpenWeatherAdapter.getWeatherByCoords(position.coords);
        };


    if ("geolocation" in navigator) {
        var notificationOptions = {
                containerSelector: ".banner-container",
                bannerSelector: ".banner",
                approveSelector: ".yes",
                declineSelector: ".no",
                approveCallback: useGeoLocation,
                declineCallback: useWeatherInput
            },
            weatherOptions = {
                loaderSelector: '.loader',
                successCallback: WeatherManager.WeatherResultViewer.show,
                errorCallback: WeatherManager.WeatherResultViewer.showError
            }
            ;
        WeatherManager.OpenWeatherAdapter.init(weatherOptions);
        WeatherManager.NotificationManager.init(notificationOptions);
        WeatherManager.NotificationManager.show();
    }
    else {
        useWeatherInput();
    }

})(jQuery);
