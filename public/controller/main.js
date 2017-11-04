'use strict';
var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1

  //
  // Now set up the states
  $stateProvider
    .state('main', {
      url: "/",
      templateUrl: "/views/dashboard.html",
      controller: "RevisionController"
  });

    // .state('state1.list', {
    //   url: "/list",
    //   templateUrl: "partials/state1.list.html",
    //   controller: function($scope) {
    //     $scope.items = ["A", "List", "Of", "Items"];
    //   }
    // })
    // .state('state2', {
    //   url: "/state2",
    //   templateUrl: "partials/state2.html"
    // })
    // .state('state2.list', {
    //   url: "/list",
    //   templateUrl: "partials/state2.list.html",
    //   controller: function($scope) {
    //     $scope.things = ["A", "Set", "Of", "Things"];
    //   }
    // });

    $urlRouterProvider.otherwise("/");
});


myApp.controller('RevisionController',['$scope', '$http', function($scope,$http){

    $scope.rv = {};


    // -------------------------------------------------------------------------
    // Create section
    // -------------------------------------------------------------------------

    $scope.rv.co = {
        isSubmited: false,
        model: {}
    };







    /**
     *
     */
    $scope.rv.co.openModal = function() {
        $("#create-learning-point-modal").modal('show');
    }


    /**
     *
     */
    $scope.rv.co.closeModal = function() {
        $scope.rv.co.model = {};
        $("#create-learning-point-modal").modal('hide');
    }


    /**
     *
     */
    $scope.rv.co.submitAction = function(form) {
        //
        if(form.$invalid) {
            $scope.rv.co.isSubmited = true;
            return;
        }


        //
        $http.post('/api/v1/learning-points/create', $scope.rv.co.model).then(function(response) {
            $scope.rv.lo.data.push(response.data.data);
            $scope.rv.co.closeModal();
        });

    }



    // -------------------------------------------------------------------------
    // List section
    // -------------------------------------------------------------------------

    $scope.rv.lo = {};
    $scope.rv.lo.data = [];


    /**
     *
     */
    $scope.rv.lo.getData = function() {
        //
        $http.post('/api/v1/learning-points/get', {}).then(function(response) {
            console.log(' > >>> > >> ', response.data);
            $scope.rv.lo.data = response.data;
        });

    }

}]);



//
myApp.run(function($rootScope) {

});


//
angular.element(document).ready(function() {

    // alert("Sdf");
    // if (window.location.hash === '#_=_') {
    //     window.location.hash = '#!'
    // }


    angular.bootstrap(document, ['myApp']);
    alert("ds");
});
