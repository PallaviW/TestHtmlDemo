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
            Controller:'CDCtrl'
            })
            .when('/countries/:countryCode',{
                templateUrl:'./countryDetail.html',
                Controller:'CountryDeatilCtrl'
            })

        .when('/error', {
            template : '<p>Error Page Not Found</p>'
        })
        .otherwise({
            redirectTo : '/error'
        });

})
    .controller('HomeCtrl', function($scope) {
        //empty for now
    })

.controller('CountryDeatilCtrl', ['$scope', '$route','countries',
        function($scope, $route,countries) {
            var code = $route.current.params.countryCode;
            countries.getCountryDetail().then(function(result){
                $scope.country = result.geonames[0];
                });
            countries.getCapitalDetails().then(function(result){
                $scope.capitalpopulation = result.geonames[0].population;
            });

            countries.getneighbors().then(function(result){
                console.log(result.geonames);
                $scope.neighbors = result.geonames;
                });
        }
])
    .controller('CDCtrl',['$scope','countries',function($scope,countries){
        countries.getCountryList().then(function(result){
            $scope.countries = result.geonames;
        });
    }])


    .factory('countries', ['$http', '$route', function($http,$route){
        console.log($route.current.params.countryCode);
        return ({

            getCountryList : getCountryList,
            getCountryDetail : getCountryDetail,
            getneighbors : getneighbors,
            getCapitalDetails :getCapitalDetails
        });

        function getCountryList(){
                var url = "http://api.geonames.org/countryInfoJSON?username=pallaviw";
                var request = $http.get(url, { cache: true });
                return (request.then(handleSuccess, handleError));
        };

        function getCountryDetail(){
                var url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang=it&username=pallaviw&style=full&country=" +$route.current.params.countryCode ;
                var request = $http.get(url);
                return (request.then(handleSuccess, handleError));
        };

        function getneighbors(){
            var urlforneighbor="http://api.geonames.org/neighboursJSON?country="+$route.current.params.countryCode+"&username=pallaviw";
            var request = $http.get(urlforneighbor);
            return (request.then(handleSuccess, handleError));
        };

        function getCapitalDetails(){
            var url = "http://api.geonames.org/searchJSON?formatted=true&username=pallaviw&q=capital&&style=full&country=" + $route.current.params.countryCode;
            var request = $http.get(url);
            return (request.then(handleSuccess, handleError));

        };
        function handleError(response) {

        }
        function handleSuccess(response) {
            return (response.data);
        }
    }])