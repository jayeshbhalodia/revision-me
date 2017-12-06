'use strict';

//
var myApp = angular.module('myApp', ['ui.router', 'summernote']);


//
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


myApp.controller('RevisionController', ['$scope', '$http', function($scope, $http) {

    $scope.rv = {};


    // -------------------------------------------------------------------------
    // Create section
    // -------------------------------------------------------------------------

    $scope.rv.co = {
        isSubmited: false,
        model: {}
    };


    $scope.rv.co.responseType = [{
        key: '1',
        tital: 'Daily'
    }, {
        key: '2',
        tital: 'One Day'
    }, {
        key: '3',
        tital: 'Two Day'
    }, {
        key: '4',
        tital: 'Three Day'
    }, {
        key: '5',
        tital: 'Weekly Day'
    }, {
        key: '6',
        tital: 'Ten Day'
    }, {
        key: '7',
        tital: 'Fifteen Day'
    }, {
        key: '8',
        tital: 'Twenty Day'
    }, {
        key: '9',
        tital: 'Monthly'
    }, {
        key: '10',
        tital: 'Two Months'
    }, {
        key: '11',
        tital: 'Three Months'
    }, {
        key: '12',
        tital: 'Six Months'
    }];


    // $scope.rv.co.reminderType = $scope.rv.co.responseType[0].key;

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
        $scope.rv.co.isSubmited = false;
        $("#create-learning-point-modal").modal('hide');
    }


    /**
     *
     */
    $scope.rv.co.submitAction = function(form) {
        //
        if (form.$invalid) {
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
        $http.post('/api/v1/learning-points/get', {}).then(function(response) {
            $scope.rv.lo.data = response.data.learningPoints;
            $scope.rv.lo.todayRevisions = response.data.todayRevisions;
        });
    }



    // -------------------------------------------------------------------------
    // Update section
    // -------------------------------------------------------------------------

    $scope.rv.uo = {
        isSubmited: false,
        model: {}
    };


    /**
     *
     */
    $scope.rv.uo.openModal = function(data) {
        $scope.rv.uo.model = data;
        $("#update-learning-point-modal").modal('show');
    }


    /**
     *
     */
    $scope.rv.uo.closeModal = function() {
        $scope.rv.uo.model = {};
        $scope.rv.uo.isSubmited = false;
        $("#update-learning-point-modal").modal('hide');
    }


    /**
     *
     */
    $scope.rv.uo.updateAction = function(from) {

        //
        if (from.$invalid) {
            $scope.rv.uo.isSubmited = true;
            return;
        }

        console.log('$scope.rv.uo.model', $scope.rv.uo.model);

        //
        $http.post('/api/v1/learning-points/' + $scope.rv.uo.model._id + '/update', $scope.rv.uo.model).then(function(response) {

            console.log('response', response);

            for (var data in $scope.rv.lo.data) {
                if ($scope.rv.lo.data[data]._id == $scope.rv.uo.model._id) {
                    $scope.rv.lo.data[data] = $scope.rv.uo.model;
                }
            }

            $scope.rv.uo.closeModal();
        });

    }



    // -------------------------------------------------------------------------
    // Delete section
    // -------------------------------------------------------------------------
    $scope.rv.do = {};

    /**
     *
     */
    $scope.rv.do.deleteAction = function(data) {

        console.log('$scope.rv.uo.model', data);

        for (var r in $scope.rv.lo.data) {
            if ($scope.rv.lo.data[r]._id == data._id) {
                $scope.rv.lo.data.splice(r, 1);
            }
        }
        //
        $http.post('/api/v1/' + data._id + '/remove').then(function(response) {});

    }


    // -------------------------------------------------------------------------
    // reminder section
    // -------------------------------------------------------------------------
    $scope.rv.rm = {};

    /**
     *
     */
    $scope.rv.rm.done = function(data) {

        console.log('data', data);
         //
        $http.post('/api/v1/reminder/' + data._id + '/update', data).then(function(response) {

            $scope.rv.lo.getData();

            // for (var data in $scope.rv.lo.data) {
            //     if ($scope.rv.lo.data[data]._id == $scope.rv.uo.model._id) {
            //         $scope.rv.lo.data[data] = $scope.rv.uo.model;
            //     }
            // }
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
