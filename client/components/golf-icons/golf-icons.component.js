'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class GolfIconsComponent {

  constructor() {
    'ngInject';
  }

}

export default angular.module('directives.golfIcons', [])
  .component('golfIcons', {
    restrict: 'E',
    template: require('./golf-icons.html'),
    controller: GolfIconsComponent,
    bindings: {
      golf: '@',
      rental: '@',
      ride: '@'
    }
  })
  .name;
