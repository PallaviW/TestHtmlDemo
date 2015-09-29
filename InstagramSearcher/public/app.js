/**
 * Created by Pallavi on 9/24/2015.
 */

var app = angular.module('myApp',[]);
app.controller('myContrl',function($scope,$http){

    $scope.show = false;

    $scope.searchData = function(searchtext) {

        $scope.keyword = searchtext;
        $scope.show = true;
        $scope.loading = true;


        var endPoint = "https://api.instagram.com/v1/tags/";
        var midpoint=$scope.keyword;
        var end="/media/recent?client_id=5bec6b47c111499b8e661961ed145632&callback=JSON_CALLBACK";

        $http.jsonp(endPoint+midpoint+end ).success(function(response) {
           $scope.results = response.data;
            $scope.show = false;
            $scope.loading = false;
        });

    }

});

app.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="loading-animation.gif" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
});
