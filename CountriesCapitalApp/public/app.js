/**
 * Created by Pallavi on 10/1/2015.
 */

angular.module('MyApp',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: './home.html',
                controller : 'HomeCtrl'
            })
            .when('/countries',{
            templateUrl:'./country.html',
            Controller:'CountryCtrl'
            })
            .when('/countries/:country/:capital/:population/:area/:code',{
                templateUrl:'./countryDetail.html',
                Controller:'CountryDeatilCtrl',
                resolve: {
                    capitalpopulation : function($route,$http){
                        var capitalpopulation ;
                        var country = $route.current.params.country;
                        var capital = $route.current.params.capital;
                        var code = $route.current.params.code;
                        var url="http://api.geonames.org/searchJSON?q="+country+"&name="+capital+"&name_equals="+capital+"&country="+code+"&isNameRequired=true&fcode=PPLC&username=demo&style=full";
                        $http.get(url).success(function(data){

                        })

                        return capitalpopulation;
                    },
                    neighbors:function($route,$http){
                            var neighbors ;
                            var code = $route.current.params.code;
                            var url="http://api.geonames.org/neighboursJSON?country="+code+"&username=demo";
                            alert(url);
                            $http.get(url).success(function(data){
                                alert(data.geonames.countryName);
                            })
                    }
                }
            })

        .when('/error', {
            template : '<p>Error Page Not Found</p>'
        })
        .otherwise({
            redirectTo : '/error'
        });

})

.controller('CountryCtrl', function($scope , $http) {

        $http.get("http://api.geonames.org/countryInfoJSON?formatted=true&lang=it&username=demo&style=full").success(function(data){
        $scope.countries = data.geonames;
        })


})
    .controller('HomeCtrl', function($scope) {
        //empty for now
    })
    .controller('CountryDeatilCtrl', ['$scope', '$routeParams',
        function($scope, $routeParams){

        $scope.country = $routeParams.country;
        $scope.capital =  $routeParams.capital;
        $scope.population = $routeParams.population;
        $scope.area = $routeParams.area;
        $scope.code = $routeParams.code;

    }]);