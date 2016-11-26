"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var weather_service_1 = require('../service/weather.service');
var weather_1 = require('../model/weather');
var constatns_1 = require('../constants/constatns');
var WeatherComponent = (function () {
    function WeatherComponent(service) {
        this.service = service;
        this.weatherData = new weather_1.Weather(null, null, null, null, null);
        this.currentSpeedUnit = "kph";
        this.currentTempUnit = "fahrenheit";
        this.currentLocation = "";
        this.icons = new Skycons();
        this.dataReceived = false;
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentLocation();
    };
    WeatherComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            _this.getCurrentWeather();
            _this.getLocationName();
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (weather) {
            _this.weatherData.temp = weather["currently"]["temperature"],
                _this.weatherData.summary = weather["currently"]["summary"],
                _this.weatherData.wind = weather["currently"]["windSpeed"],
                _this.weatherData.humidity = weather["currently"]["humidity"],
                _this.weatherData.icon = weather["currently"]["icon"];
            console.log("Weather: ", _this.weatherData); //TODO: REMOVE
            _this.setIcon();
            _this.dataReceived = true;
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getLocationName = function () {
        var _this = this;
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (location) {
            console.log(location); //TODO: REMOVE
            _this.currentLocation = location["results"][3]["formatted_address"];
        });
    };
    WeatherComponent.prototype.toggleUnits = function () {
        this.toggleTempUnit();
        this.toggleSpeedUnit();
    };
    WeatherComponent.prototype.toggleTempUnit = function () {
        if (this.currentTempUnit === "fahrenheit") {
            this.currentTempUnit = 'celsius';
        }
        else {
            this.currentTempUnit = "fahrenheit";
        }
    };
    WeatherComponent.prototype.toggleSpeedUnit = function () {
        if (this.currentSpeedUnit === "kph") {
            this.currentSpeedUnit = 'mph';
        }
        else {
            this.currentSpeedUnit = "kph";
        }
    };
    WeatherComponent.prototype.setIcon = function () {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    };
    WeatherComponent.prototype.setStyles = function () {
        if (this.weatherData.icon) {
            this.icons.color = constatns_1.WEATHER_COLORS[this.weatherData.icon]["color"];
            return constatns_1.WEATHER_COLORS[this.weatherData.icon];
        }
        else {
            this.icons.color = constatns_1.WEATHER_COLORS["default"]["color"];
            return constatns_1.WEATHER_COLORS["default"];
        }
    };
    WeatherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weather-widget',
            templateUrl: 'weather.component.html',
            styleUrls: ['weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map