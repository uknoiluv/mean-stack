import angular from 'angular';

export class WeatherWidgetComponent {}

export default angular.module('directives.weatherWidget', [])
  .component('weather', {
    template: require('./weather-widget.html'),
    controller: WeatherWidgetComponent
  })
  .name;
