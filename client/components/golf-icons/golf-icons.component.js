'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class GolfIconsComponent {

  // golf = false;
  // rental = false;
  // ride = false;

  constructor($scope) {
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
