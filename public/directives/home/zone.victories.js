app.directive('homeZoneVictories', function() {
    return {
        restrict: 'A',
        templateUrl: 'views/home/zone.victories.html',
        link: function( $scope, elem, attrs ) {
            elem.ready(function(){
                // $scope.$emit('ga-sync', '#combat-leaderboards .ga-event');
            });
        }
    };
});
