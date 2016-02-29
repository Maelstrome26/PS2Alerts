app.controller('AlertController', function(
    $scope,
    $routeParams,
    AlertMetricsService
) {
    $scope.alert = AlertMetricsService;

    $scope.loaded = {
        data: false
    };

    $scope.$on('dataLoaded', function() {
        $scope.loaded.data = true;

        // It seems promises causes some issues with Angular. Need to apply the scope to kick it in the nuts.
        $scope.$apply();

        $('#player-leaderboard').DataTable({
            data: $scope.alert.parsed.players,
            columns: [
                { data: 'name', title: 'Player', className: 'name' },
                { data: 'outfit', title: 'Outfit', className: 'outfit' },
                { data: 'kills', title: 'Kills', className: 'metric' },
                { data: 'deaths' , title: 'Deaths', className: 'metric' },
                { data: 'kd' , title: 'K/D', className: 'metric' },
                { data: 'teamkills', title: 'Teamkills', className: 'metric' },
                { data: 'suicides', title: 'Suicides', className: 'metric' },
                { data: 'headshots', title: 'Headshots', className: 'metric' },
                { data: 'hsr', title: 'Headshot %', className: 'metric hsr' },
                { data: 'factionAbv', visible: false },
                { data: 'outfitTag', visible: false }
            ],
            order:          [2, 'desc'],
            deferRender:    true,
            scrollY:        450,
            scrollCollapse: true,
            scroller:       true,
            "rowCallback": function( row, data, index ) {
                // Format the faction colors
                if (data.factionAbv !== null) {
                    $('.name', row).addClass(data.factionAbv + '-table-text');
                    $('.outfit', row).addClass(data.factionAbv + '-table-text');
                }

                // Add outfit tags
                if (data.outfitTag !== null) {
                    $('.outfit', row).html('['+data.outfitTag+'] '+data.outfit);
                }
                $('.hsr', row).html(data.hsr + '%');
            }
        });

        $('#outfit-leaderboard').DataTable({
            data: $scope.alert.parsed.outfits,
            columns: [
                { data: 'name', title: 'Outfit', className: 'name' },
                { data: 'participants', title: 'Participants', className: 'metric'},
                { data: 'kills', title: 'Kills', className: 'metric' },
                { data: 'deaths' , title: 'Deaths', className: 'metric' },
                { data: 'kd' , title: 'K/D *', className: 'metric kd' },
                { data: 'teamkills', title: 'Teamkills', className: 'metric' },
                { data: 'suicides', title: 'Suicides', className: 'metric' },
                { data: 'tag', title: 'Tag', className: 'metric', visible: false },
                { data: 'factionAbv', visible: false }
            ],
            order:          [2, 'desc'],
            deferRender:    true,
            scrollY:        450,
            scrollCollapse: true,
            scroller:       true,
            "rowCallback": function( row, data, index ) {
                // Format the faction colors
                if (data.factionAbv !== null) {
                    $('.name', row).addClass(data.factionAbv + '-table-text');
                }

                // Add outfit tags
                if (data.tag !== null) {
                    $('.name', row).html('['+data.tag+'] '+data.name);
                }
            }
        });

        $('#weapon-leaderboard').DataTable({
            data: $scope.alert.parsed.weapons,
            columns: [
                { data: 'name', title: 'Weapon', className: 'name' },
                { data: 'kills', title: 'Kills', className: 'metric'},
                { data: 'teamkills', title: 'Teamkills', className: 'metric' },
                { data: 'headshots' , title: 'Headshots', className: 'metric' },
                { data: 'hsr' , title: 'Headshot %', className: 'metric hsr' },
                { data: 'vehicle', visible: false },
                { data: 'faction' , visible: false }
            ],
            order:          [1, 'desc'],
            deferRender:    true,
            scrollY:        450,
            scrollCollapse: true,
            scroller:       true,
            "rowCallback": function( row, data, index ) {
                var vehicle = ' [I]';
                // Format the cells
                if (data.factionAbv !== null) {
                    $('.name', row).addClass(data.factionAbv + '-table-text');
                }

                if (data.vehicle === 1) {
                    vehicle = ' [V]';
                }

                $('.name', row).html(data.name + vehicle);
                $('.hsr', row).html(data.hsr + '%');
            }
        });

        $('#vehicle-leaderboard').DataTable({
            data: $scope.alert.parsed.vehicles,
            columns: [
                { data: 'name', title: 'Vehicle', className: 'name' },
                { data: 'kills', title: 'Kills', className: 'metric' },
                { data: 'kd', title: 'K/D (total)', className: 'metric kd' },
                { data: 'killsI', title: 'Infantry Kills', className: 'metric' },
                { data: 'killsV', title: 'Vehicle Kills', className: 'metric' },
                { data: 'deaths', title: 'Deaths', className: 'metric' },
                { data: 'deathsI', title: 'Infantry Deaths *', className: 'metric' },
                { data: 'deathsV', title: 'Vehicle Deaths', className: 'metric' },
                { data: 'bails', title: 'Ejections', className: 'metric' },
                { data: 'factionAbv', visible: false },
                { data: 'type', visible: false }
            ],
            order:          [1, 'desc'],
            deferRender:    true,
            scrollY:        450,
            scrollCollapse: true,
            scroller:       true,
            "rowCallback": function( row, data, index ) {
                // Format the cells
                if (data.factionAbv !== null) {
                    $('.name', row).addClass(data.factionAbv + '-table-text');
                }
            }
        });

        $(document).ready(function(){
            $('ul.tabs').tabs();
        });
    });

    // Instantiate the service
    $scope.alert.init($routeParams.alert);
});
