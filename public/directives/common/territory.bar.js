app.directive('territoryBar', function() {
    return {
        restrict: 'E',
        replace: true,
        scope : {
            vs: '@',
            nc: '@',
            tr: '@',
            draw: '@',
            total: '@',
            decimal: '@'
        },
        templateUrl: 'views/common/territory.bar.html'
    };
});