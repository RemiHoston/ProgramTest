(function (angular) {
    'use strict';
    angular.module('pagination', []).directive('tmPagination', [function () {
        return {
            restrict: 'EA',
            template: '<div class="page-list clearfix">' +
            '<ul class="pagination paginationPc" ng-show="conf.totalItems > 0">' +
            '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li>' +
            '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
            'ng-click="changeCurrentPage(item)">' +
            '<span  ng-class="{backNum: item == \'...\'}">{{ item }}</span>' +
            '</li>' +
            '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li>' +
            '</ul>' +
            //小屏幕
            '<ul class="pagination paginationMobile" ng-show="conf.totalItems > 0">' +
            '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li>' +
            '<li ng-repeat="item in mobilePageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
            'ng-click="changeCurrentPage(item)">' +
            '<span  ng-class="{backNum: item == \'...\'}">{{ item }}</span>' +
            '</li>' +
            '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li>' +
            '</ul>' +
            //结束
            '<div class="page-total" ng-show="conf.totalItems > 0">' +
            '第&nbsp;<input type="text" ng-model="jumpPageNum"  class="paging"/>&nbsp;页&nbsp;<input type="button" class="btn btn-info" value="跳转" ng-click="jumpToPage($event)" >' +
            '&nbsp;每页 &nbsp;<span>{{conf.itemsPerPage}}</span>' +
            '&nbsp;/共&nbsp;<span>{{ conf.totalItems }}</span>&nbsp;条' +
            '</div>' +
            '<div class="no-items" ng-show="conf.totalItems <= 0"></div>' +
            '</div>',
            replace: true,
            scope: {
                conf: '=tmPagination'
            },
            link: function (scope, element, attrs) {
                //   scope.conf.randomNum 以实现每次点击都可执行getPagination()方法，[即解决点击当前页码刷新的第一步]，此写法主要针对$watch)
                // scope.conf.randomNum=0;
                // 变更当前页
                scope.changeCurrentPage = function (item) {
                    if (item == '...') {
                        return;
                    } else {
                        scope.conf.currentPage = item;
                        scope.conf.randomNum = Math.random();
                    }
                };

                // 定义分页的长度必须为奇数 (default:9)
                scope.conf.pagesLength = parseInt(scope.conf.pagesLength) ? parseInt(scope.conf.pagesLength) : 7;
                if (scope.conf.pagesLength % 2 === 0) {
                    // 如果不是奇数的时候处理一下
                    scope.conf.pagesLength = scope.conf.pagesLength - 1;
                }

                // conf.erPageOptions
                if (!scope.conf.perPageOptions) {
                    scope.conf.perPageOptions = [];
                }

                // pageList数组
                function getPagination() {
                    // conf.currentPage
                    scope.conf.currentPage = parseInt(scope.conf.currentPage) < 1 ? 1 : parseInt(scope.conf.currentPage);
                    // conf.totalItems
                    scope.conf.totalItems = parseInt(scope.conf.totalItems);

                    // numberOfPages
                    scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems / scope.conf.itemsPerPage);

                    if (scope.conf.currentPage > scope.conf.numberOfPages) {
                        scope.conf.currentPage = scope.conf.numberOfPages;
                    }
                    // judge currentPage > scope.numberOfPages
                    if (scope.conf.currentPage < 1) {
                        scope.conf.currentPage = 1;
                    }
                    // jumpPageNum
                    scope.jumpPageNum = scope.conf.currentPage;

                    // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                    var perPageOptionsLength = scope.conf.perPageOptions.length;
                    // 定义状态
                    var perPageOptionsStatus;
                    for (var i = 0; i < perPageOptionsLength; i++) {
                        if (scope.conf.perPageOptions[i] == scope.conf.itemsPerPage) {
                            perPageOptionsStatus = true;
                        }
                    }
                    // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                    if (!perPageOptionsStatus) {
                        scope.conf.perPageOptions.push(scope.conf.itemsPerPage);
                    }

                    // 对选项进行sort
                    scope.conf.perPageOptions.sort(function (a, b) { return a - b; });

                    scope.pageList = [];
                    //小屏幕显示的分页条数
                    scope.mobilePageList = [];

                    scope.mobilePageList.push(1);
                    if (scope.conf.numberOfPages != 1) {
                        if (parseInt(scope.conf.currentPage) > 2) {
                            scope.mobilePageList.push('...');
                        } else if (parseInt(scope.conf.currentPage) == 1 && parseInt(scope.conf.numberOfPages) > 2) {
                            scope.mobilePageList.push('...');
                        }
                        if (scope.conf.numberOfPages != scope.conf.currentPage && scope.conf.currentPage != 1) {
                            scope.mobilePageList.push(scope.conf.currentPage);
                        }
                        if (parseInt(scope.conf.numberOfPages) - parseInt(scope.conf.currentPage) > 1 && parseInt(scope.conf.currentPage) != 1) {
                            scope.mobilePageList.push('...');
                        }
                        scope.mobilePageList.push(scope.conf.numberOfPages);
                    }

                    if (scope.conf.numberOfPages <= scope.conf.pagesLength) {
                        // 判断总页数如果小于等于分页的长度，若小于则直接显示
                        for (i = 1; i <= scope.conf.numberOfPages; i++) {
                            scope.pageList.push(i);
                        }
                    } else {
                        // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                        // 计算中心偏移量
                        var offset = (scope.conf.pagesLength - 1) / 2;
                        if (scope.conf.currentPage <= offset) {
                            // 左边没有...
                            for (i = 1; i <= offset + 1; i++) {
                                scope.pageList.push(i);
                            }
                            scope.pageList.push('...');
                            scope.pageList.push(scope.conf.numberOfPages);
                        } else if (scope.conf.currentPage > scope.conf.numberOfPages - offset) {
                            scope.pageList.push(1);
                            scope.pageList.push('...');
                            for (i = offset + 1; i >= 1; i--) {
                                scope.pageList.push(scope.conf.numberOfPages - i);
                            }
                            scope.pageList.push(scope.conf.numberOfPages);
                        } else {
                            // 最后一种情况，两边都有...
                            scope.pageList.push(1);
                            scope.pageList.push('...');
                            //20160408注释  实现当前页纸显示前后一页
                            if ((scope.conf.currentPage - 1) != 2) {
                                scope.pageList.push(scope.conf.currentPage - 1);
                            }
                            // for (i = Math.ceil(offset / 2) ; i >= 1; i--) {
                            //避免出现  1 … 2 3 4 。。修改好后：  1 … 3 4
                            //if ((scope.conf.currentPage - i) != 2) {
                            //    scope.pageList.push(scope.conf.currentPage - i);
                            //} 
                            //  }
                            scope.pageList.push(scope.conf.currentPage);
                            //20160408注释  实现当前页纸显示前后一页
                            scope.pageList.push(scope.conf.currentPage + 1);
                            // for (i = 1; i <= offset / 2; i++) {
                            // scope.pageList.push(scope.conf.currentPage + i);
                            // }


                            scope.pageList.push('...');
                            scope.pageList.push(scope.conf.numberOfPages);
                        }
                    }

                    if (scope.conf.onChange) {
                        scope.conf.onChange();
                    }

                    scope.$parent.conf = scope.conf;
                }

                // 上一页
                scope.prevPage = function () {
                    if (scope.conf.currentPage > 1) {
                        scope.conf.currentPage -= 1;
                    }
                };
                // 下一页
                scope.nextPage = function () {
                    if (scope.conf.currentPage < scope.conf.numberOfPages) {
                        scope.conf.currentPage += 1;
                    }
                };

                // 跳转页
                scope.jumpToPage = function () {
                    //如果跳转页大于最大页数，则设置为最大页数
                    if (parseInt(scope.conf.numberOfPages) < parseInt(scope.jumpPageNum)) {
                        scope.jumpPageNum = scope.conf.numberOfPages;
                    }
                    if (angular.isNumber(scope.jumpPageNum)) {
                        scope.jumpPageNum = scope.jumpPageNum.toString();
                    } else {
                        scope.jumpPageNum = scope.jumpPageNum.replace(/[^0-9]/g, '');
                    }
                    scope.conf.randomNum = Math.random();
                    //   } 
                    if (parseInt(scope.jumpPageNum) < 1) {
                        scope.jumpPageNum = 1;
                    }
                    if (scope.jumpPageNum !== '') {
                        scope.conf.currentPage = scope.jumpPageNum;
                    }

                };

                // 修改每页显示的条数
                scope.changeItemsPerPage = function () {
                    // 清除本地存储的值方便重新设置
                    if (scope.conf.rememberPerPage) {
                        localStorage.removeItem(scope.conf.rememberPerPage);
                    }
                };

                scope.$watch(function () {
                    var newValue = scope.conf.currentPage + ' ' + scope.conf.totalItems + ' ' + scope.conf.randomNum + ' ';
                    // 如果直接watch perPage变化的时候，因为记住功能的原因，所以一开始可能调用两次。
                    //所以用了如下方式处理 
                    if (scope.conf.rememberPerPage) {
                        // 由于记住的时候需要特别处理一下，不然可能造成反复请求
                        // 之所以不监控localStorage[scope.conf.rememberPerPage]是因为在删除的时候会undefind
                        // 然后又一次请求
                        if (localStorage[scope.conf.rememberPerPage]) {
                            newValue += localStorage[scope.conf.rememberPerPage];
                        } else {
                            newValue += scope.conf.itemsPerPage;
                        }
                    } else {
                        newValue += scope.conf.itemsPerPage;
                    }
                    return newValue;

                }, getPagination);

            }
        };
    }]);
});