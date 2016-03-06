var WeatherManager = WeatherManager || {};

WeatherManager.WeatherResultViewer = (function () {
    'use strict';
    var show = function (weatherInfo) {

            if (weatherInfo !== undefined) {
                var weatherIcon = $('#weatherIcon');
                weatherIcon.attr("src", weatherInfo.iconUrl);
                weatherIcon.attr("alt", weatherInfo.description);

                $('#temp').text(weatherInfo.temp + weatherInfo.unit);
                $('#countryName').text(weatherInfo.name);
                $('#description').text(weatherInfo.description);
                $('.weather-input').hide();
                $('.results').fadeIn();
            }

        },
        showError = function (error) {
            var errorContainer = $('.error'),
                message = error.message || error.statusText;

            errorContainer.html(message);
            errorContainer.fadeIn();
        };


    return {
        show: show,
        showError: showError
    }
}());

