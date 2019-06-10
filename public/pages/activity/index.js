(function() {
    APP.controller('activityController', ['$scope', '$http', function($scope, $http) {
        var vm = this
        this.data = { a: 1, b: 2, c: 3 }

        function request(url, data) {
            var params = [].slice.call(arguments, 0)
            $scope.resData = undefined;
            $scope.loading = true;
            var promise = $http.get.apply(null, params)
                .then(function(res) {
                    $scope.url = res.config.url
                    $scope.resData = res.data
                });
            promise.finally(function() {
                $scope.loading = false;
            });
            return {
                then: function(cb, err) {
                    return promise.then(cb, err)
                }
            }
        }
        $scope.clickMe = function() {
                request('/demo/test/a');
            } 
    }]);
})();