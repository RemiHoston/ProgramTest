var app = angular.module('app', []);
app.controller('myCtrl',
        function ($scope, $http) {
            $scope.Title = "用户日志";
            $scope.items = [];
            $scope.currentItem = null;
            $scope.edit = function (item) {
                $scope.currentItem = item; 
            };
            $scope.class1 = [];
            $scope.class1.push({
                name: '动物',
                code: 1,
                child: [{
                    name: '老虎', code: 2,parentCode:1
                }, {
                    name: '狮子', code: 3, parentCode: 1
                }, {
                    name: '猫', code: 4, parentCode: 1
                }, {
                    name: '狗', code: 5, parentCode: 1
                }]
            });
            $scope.class1.push({
                name: '植物',
                code: 6,
                child: [{
                    name: '草', code: 7, parentCode: 6
                }, {
                    name: '树', code: 8, parentCode: 6
                }, {
                    name: '花', code: 9, parentCode: 6
                }, {
                    name: '木', code: 10, parentCode: 6
                }]
            });
            $scope.currentNode = null;
            $scope.select = function (p) {
                $scope.currentNode = p;
            };
            $scope.search = function () {
            	var url = "http://localhost:6666/api/accounts/GetUserList";
            	$http.get(url)
					.success(function (data) {
						$scope.items = data;
					})
					.error(function (data, state, information) {

					});
            };
            $scope.save = function () {
            	var url = "http://localhost:6666/api/accounts/Save";
            	$http.post(url, $scope.currentItem)
					.success(function (data) {
						$scope.currentItem = null;
						$scope.search();
					})
					.error(function (data, state, information) {

					});
            };
            $scope.delete = function () {

            };
            $scope.add = function () {
            	var url = "http://localhost:6666/api/accounts/Add";
            	$http.get(url)
					.success(function (data) {
						$scope.currentItem = data;
					})
					.error(function (data, state, information) {

					});
            };
            $scope.onBlur = function () {
            	$scope.currentItem.DisplayName = $scope.currentItem.FirstName + $scope.currentItem.LastName;
            };
            $scope.close = function () {
            	$scope.currentItem = null;
            };
            $scope.search();
			
        });