var app = angular.module('app', ['ngResource']);

app.factory('UserService', function ($resource) {
    return $resource('http://test-api.kuria.tshdev.io/')
});

app.controller("ctrl", function($scope, UserService) {

    $scope.pages = 0;
    $scope.rating;
    $scope.sear;

    $scope.loadPage = function(){

        var main = UserService.get({query:$scope.sear,page:$scope.pages,rating:$scope.rating});

        main.$promise.then(function(data) {

            $scope.users = data;
            $scope.main = data.payments;
            $scope.paginations = $scope.users.pagination.total;
            $scope.totalPages = [];
            for (i=0;i<$scope.paginations;i++){
                $scope.totalPages.push(i);
            }

        });//querypromise

    };//loadpage

    $scope.rate = function(){
            $scope.rating = 5;
            $scope.loadPage();
    };

    $scope.next = function() {
        if ($scope.users.pagination.current < $scope.users.pagination.total - 1) {
            $scope.pages = $scope.pages + 1;
            $scope.loadPage();
            };
    };

    $scope.prev = function() {
        if ($scope.users.pagination.current > 0) {
                $scope.pages = $scope.pages - 1;
                $scope.loadPage();
        };
    };

    $scope.action = function(){
       var sup = $("#suplier").val();
       var rat = $("#rate-val").val();
       $scope.sear = sup;
       $scope.rating = rat;
       $scope.loadPage();
    };

    $scope.reset = function(){
        $scope.rating = null;
        var sup = $("#suplier").val("");
        var rat = $("#rate-val").val("");
        $scope.pages = 0;
        $scope.sear = sup;
        $scope.rating = rat;
        $scope.action();
        $scope.loadPage();
    };

    $scope.getDetails = function(){

    };

    $scope.goToPage = function() {

    };


$scope.loadPage();

});//ctrl

