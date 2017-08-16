var app = angular.module('app', ['pagination']);
app.controller('myCtrl',
        function ($scope, $http) {
            $scope.Title = "学生信息";
            //查询的学生列表
            $scope.items = [];
            $scope.currentItem = null;
            //点击编辑
            $scope.edit = function (item) {
                $scope.currentItem = null;
                var url = "http://localhost:6666/api/student/GetStudent?id=" + item.UserId;
                $http.get(url)
					.success(function (d) {
					    if (d.isSuccess == true) {
					        $scope.currentItem = d.data;
					    }
					    else {
					        alert(d.message);
					    }
					}).error(function (data, status, headers, config) {
					    if (data.exceptionMessage) {
					        console.log(data.exceptionMessage);
					    }
					    if (data.stackTrace) {
					        console.log(data.stackTrace);
					    }
					});
            };
            //分页对象
            $scope.paginationConf = {
                currentPage: 1,
                itemsPerPage: 10,
                totalItems: 0
            };
            //全选
            $scope.selectAllResult = false;
            //分页查询
            $scope.GetPages = function () {
                var url = "http://localhost:6666/api/student/GetStudents";
                $http.post(url, {
                        pageIndex: $scope.currentPage,
                        pageSize: $scope.itemsPerPage
                    })
					.success(function (d) {
					    if (d.isSuccess == true){
					        $scope.items = d.data;
					        angular.forEach($scope.items, function (item) {
					            item.checked = false;
					        });
					        $scope.paginationConf.totalItems = d.totalCount;
					    }
					    else{
					        alert(d.message);
					    }
					})
					.error(function (data, status, headers, config) {
					    if (data.exceptionMessage) {
					        console.log(data.exceptionMessage);
					    }
					    if (data.stackTrace) {
					        console.log(data.stackTrace);
					    }
					});
            };
            //查询按钮调用方法
            $scope.search = function () {
                $scope.paginationConf.currentPage = 1;
                $scope.GetPages();
            };
            //监视分页动作
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function (n, o) {
                if(n!=v){
                    $scope.GetPages();
                }
            });
            //点击保存按钮
            $scope.save = function () {
                var url = "http://localhost:6666/api/student/SaveStudent";
            	$http.post(url, $scope.currentItem)
					.success(function (d) {
					    if (d.isSuccess == true) {
					        $scope.currentItem = null;
					        $scope.search();
					    }
					    else {
					        alert(d.message);
					    }
					
					}).error(function (data, status, headers, config) {
						    if (data.exceptionMessage) {
						        console.log(data.exceptionMessage);
						    }
						    if (data.stackTrace) {
						        console.log(data.stackTrace);
						    }
						});
            };
            $scope.selectAllResultClick = function ($event) {
                var elm = $event.srcElement || $event.currentTarget;

                $scope.selectAllResult = elm.checked;
                for (var i = 0; i < $scope.items.length; i++) {
                    $scope.items[i].checked = $scope.selectAllResult;
                }
            };
            $scope.itmeCheckBoxClick = function ($event, item) {
                var elm = $event.srcElement || $event.currentTarget;
                item.checked = elm.checked;
                $scope.selectAllResult = JSLINQ($scope.items).Where(function (a) {
                    return a.checked == true;
                }).Count() == $scope.items.length;
            };
            $scope.delete = function () {
                var deleteding = JSLINQ($scope.CurrentSum.items).Where(function (b) {
                    return b.checked == true;
                });
                if (deleteding.Count() == 0) {
                    alert("请选择要删除的记录!");
                    return false;
                }
                var promise = confirm("确定要删除选中的渠道信息吗？");
                if (promise == true) {
                    var deletedCodes = deleteding.Select(function (a) {
                        return a.code;
                    }).items;
                    var url = "http://localhost:6666/api/student/DeleteStudents";
                    $http.post(url, deletedCodes).success(function (r) {
                        if (d.isSuccess == true) {
                            $scope.search();
                            alert("删除成功!");
                        }
                        else {
                            alert(d.message);
                        }
                       

                    }).error(function (data, status, headers, config) {
                        if (data.exceptionMessage) {
                            console.log(data.exceptionMessage);
                        }
                        if (data.stackTrace) {
                            console.log(data.stackTrace);
                        }
                    });

                }
            };
            $scope.add = function () {
                var url = "http://localhost:6666/api/student/New";
            	$http.get(url)
					.success(function (data) {
						$scope.currentItem = data;
					}).error(function (data, status, headers, config) {
					    if (data.exceptionMessage) {
					        console.log(data.exceptionMessage);
					    }
					    if (data.stackTrace) {
					        console.log(data.stackTrace);
					    }
					});
            };

            $scope.close = function () {
            	$scope.currentItem = null;
            };
            $scope.search();
			
        });