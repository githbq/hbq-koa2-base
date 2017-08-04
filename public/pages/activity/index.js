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
            //同步上传目录
        $scope.syncUpload = function(e) {
                request('/activity/ftpupload/upload');
            }
            //同步前端生成目录
        $scope.syncDist = function(e) {
                request('/activity/ftpupload/dist');
            }
            //生成对应ID的页面文件
        $scope.gengrateHtml = function(e) {
            request('/activity/preview/create/' + vm._id);
        }
        $scope.clearData = function(e) {
            if (confirm('确定删除临时数据以及相关文件?')) {
                request('/activity/clear');
            }
        }
    }]);
})();