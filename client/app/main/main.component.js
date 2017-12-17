import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import golfIcons from '../../components/golf-icons/golf-icons.component';

export class MainController {
  $http;
  // socket;
  awesomeThings = [];
  values = {};
  numbers = [
    {
      value: 1,
      label: '1 Golfer'
    },
    {
      value: 2,
      label: '2 Golfers'
    },
    {
      value: 3,
      label: '3 Golfers'
    },
    {
      value: 4,
      label: '4 Golfers'
    }
  ];
  courses = [
    {
      value: 'wente',
      label: 'The course at Wente Vinyards'
    },
    {
      value: 'halfmoon',
      label: 'Half Moon Bay'
    },
    {
      value: 'coyote',
      label: 'Coyote Creek Valley'
    },
    {
      value: 'bridges',
      label: 'The Bridges'
    },
    {
      value: 'callippe',
      label: 'Callippe golf course'
    }
  ];
  productType = 'GolfRentalRide';
  showInputs = {
    golf: true,
    rental: true,
    ride: true
  };
  dateOptions = this.createDateOptions();
  datePopUp = {
    opened: false
  };
  teeTime = this.setStartTeetime();
  teeDate = this.dateOptions.minDate;

  /*@ngInject*/
  // constructor($http, $scope, socket) {
  constructor($http, $scope) {
    this.$http = $http;
    // this.socket = socket;

    // $scope.$on('$destroy', function() {
    //   socket.unsyncUpdates('thing');
    // });

    $scope.$watch(function() {
      return $scope.$ctrl.productType;
    }, function(newProductType) {
      const showInputs = {
        GolfRentalRide: {
          golf: true,
          rental: true,
          ride: true
        },
        GolfRental: {
          golf: true,
          rental: true,
          ride: false
        },
        GolfRide: {
          golf: true,
          rental: false,
          ride: true
        },
        RentalRide: {
          golf: false,
          rental: true,
          ride: true
        },
        Rental: {
          golf: false,
          rental: true,
          ride: false
        }
      };
      $scope.$ctrl.showInputs = showInputs[newProductType];
    }, true);
  }

  // $onInit() {
  //   this.$http.get('/api/things')
  //     .then(response => {
  //       this.awesomeThings = response.data;
  //       this.socket.syncUpdates('thing', this.awesomeThings);
  //     });
  // }

  // addThing() {
  //   if(this.values.golfers) {
  //     this.$http.post('/api/things', this.values);
  //     this.values = {};
  //   }
  // }

  submit() {
    if(this.values.golfers) {
      this.values.type = this.productType;
      this.$http.post('/api/reservation', this.values);
      this.teeTime = this.setStartTeetime();
      this.teeDate = this.dateOptions.minDate;
      this.values = {};
    }
  }

  open() {
    this.datePopUp.opened = true;
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

  createDateOptions() {
    const now = new Date();
    const dayInMillis = 24 * 60 * 60 * 1000;
    const minDate = new Date(now.getTime() + dayInMillis);
    const maxDate = new Date(now.getTime() + 122 * dayInMillis);
    return {minDate, maxDate, startingDay: 0};
  }

  setStartTeetime() {
    const date = new Date();
    date.setHours(8);
    date.setMinutes(0);
    return date;
    }

  updateTeeTime() {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    const hours = (this.teeTime || date).getHours();
    const minutes = (this.teeTime || date).getMinutes();
    const teeTime = `${hours % 12}:${minutes < 10 ? '0': ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    this.values.teeTime = teeTime;
  }

  updateTeeDate() {
    const teeDate = this.teeDate.toJSON().slice(0, 10);
    this.values.teeDate = teeDate;
  }
}

export default angular.module('reposApp.main', [uiRouter, golfIcons])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
