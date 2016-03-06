var WeatherManager = WeatherManager || {};

WeatherManager.OpenWeatherAdapter = (function ($) {
    'use strict';
    var settings = {
            loaderSelector: "loader",
            successCallback: function () {
            },
            errorCallback: function () {
            }
        },
        serverUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&",
        iconUrl = "http://openweathermap.org/img/w/{0}.png",
        byCountryQuery = "q=",
        byCoordsQuery = "lat={0}&lon={1}",
        byPostalQuery = "zip=",
        appId = "&APPID=e521bff5a0fc41daf8ae14cb041ecee4";

    var init = function (options) {
            settings = $.extend({}, settings, options || {});
        },

        getWeatherByCoords = function (coords) {
            var url = serverUrl + byCoordsQuery.replace("{0}", coords.latitude).replace("{1}", coords.longitude) + appId;
            getWeatherInformation(url);
        },

        getWeatherByZipCode = function (zipCode) {
            var url = serverUrl + byPostalQuery + zipCode + appId;
            getWeatherInformation(url);
        },

        getWeatherByCountry = function (country) {
            var url = serverUrl + byCountryQuery + country + appId;
            getWeatherInformation(url);
        },

        getWeatherInformation = function (url) {
            $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function () {
                    $(settings.loaderSelector).show();
                },
                complete: function () {
                    $(settings.loaderSelector).hide();
                },
                success: function (data) {
                    if (data && data.weather && data.weather.length > 0) {
                        var weatherResult = data.weather[0],
                            weatherInfo = {
                                iconUrl: iconUrl.replace("{0}", weatherResult.icon),
                                description: weatherResult.description,
                                temp: data.main.temp,
                                unit: " °C",
                                name: data.name
                            };
                        settings.successCallback(weatherInfo);
                    }
                    else {
                        settings.errorCallback("No weather information available");
                    }

                },
                error: function (err) {
                    settings.errorCallback(err);
                }
            });
        };

    return {
        init: init,
        getWeatherByCoords: getWeatherByCoords,
        getWeatherByZipCode: getWeatherByZipCode,
        getWeatherByCountry: getWeatherByCountry
    };

})(jQuery);
