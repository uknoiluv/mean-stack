import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  values = {};

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.values.golfers) {
      this.$http.post('/api/things', this.values);
      this.values = {};
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('reposApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
