getTimelineData();

function getTimelineData() {
    aja()
        .method('post')
        .url(api_url + '/statistics/alert/history/summary')
        .on('200', function(response) {
            logDebug('Timeline data promise completed');
            
            writeTimeline(response);
        })
        .on('204', function(response) {
            console.log('No data!');
        })
        .on('500', function(response) {
            console.log('Server Error!');
        })
        .go();
}

function writeTimeline(data) {
    console.log('Timeline', data);

    var victoryChart = $('#victories-timeline').highcharts();

    var vsData   = victoryChart.get('vs');
    var ncData   = victoryChart.get('nc');
    var trData   = victoryChart.get('tr');
    var drawData = victoryChart.get('draw');

    var vsPoints   = [];
    var ncPoints   = [];
    var trPoints   = [];
    var drawPoints = [];

    for (var date in data) {
        var dateToConvert = new Date(date);
        var milliseconds = dateToConvert.getTime();

        vsPoints.push([milliseconds, data[date].vs]);
        ncPoints.push([milliseconds, data[date].nc]);
        trPoints.push([milliseconds, data[date].tr]);
        drawPoints.push([milliseconds, data[date].draw]);
    }

    // SET TEH DATAS
    vsData.setData(vsPoints);
    ncData.setData(ncPoints);
    trData.setData(trPoints);
    drawData.setData(drawPoints);

    // See victory.timeline.events.js
    victoryChart.addSeries(timelineEvents);
}

$(function() {
    // Create the chart
    $('#victories-timeline').highcharts('StockChart', {
        chart: {
            backgroundColor: '',
            style: {
                color: '#FFF',
            },
            events: {
                redraw: function() {
                    //alert ('The chart was just redrawn');
                }
            }
        },
        credits: {
            enabled: false
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        rangeSelector: {
            buttons: [{
                type: 'week',
                count: 1,
                index: 1,
                text: '1w'
            }, {
                type: 'week',
                count: 2,
                index: 2,
                text: '2w'
            }, {
                type: 'month',
                count: 1,
                index: 3,
                text: '1m'
            }, {
                type: 'month',
                count: 2,
                index: 4,
                text: '2m'
            }, {
                type: 'month',
                count: 3,
                index: 5,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                index: 6,
                text: '6m'
            }, {
                type: 'all',
                index: 7,
                text: 'All'
            }],
            selected: 3,
        },

        navigator: {
            maskFill: 'rgba(12, 88, 144, 0.15)',
            height: 25,
            baseSeries: 'vs'
        },

        yAxis: {
            min: 0,
            plotLines: [{
                color: '#838383',
                width: 1,
            }],
            labels: {
                style: {
                    color: '#FFF'
                }
            },
            minorGridLineWidth: 1,
            minorGridLineColor: '#5F5F5F',
            minorGridLineDashStyle: 'Dash',
            minorTickInterval: 5,
            minorTickWidth: 3,
            lineWidth: 1
        },
        xAxis: {
            labels: {
                style: {
                    color: '#FFF'
                }
            },
            gridLineColor: '#444',
            gridLineWidth: 0
        },
        scrollbar: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillOpacity: 0.2
            }
        },
        series: [{
            id: 'draw',
            type: 'line',
            name: 'Draws',
            color: 'rgb(80, 80, 80)',
            marker: {
                enabled: true,
                radius: 0
            },
            shadow: false,
            data: []
        }, {
            id: 'nc',
            type: 'area',
            name: 'New Conglomerate',
            color: 'rgb(0, 125, 225)',
            marker: {
                enabled: true,
                radius: 2.5
            },
            shadow: true,
            data: []
        }, {
            id: 'tr',
            type: 'area',
            name: 'Terran Republic',
            color: 'rgb(250, 0, 0)',
            marker: {
                enabled: true,
                radius: 2.5
            },
            shadow: true,
            data: []
        }, {
            id: 'vs',
            type: 'area',
            name: 'Vanu Sovereignty',
            color: '#8000C0',
            marker: {
                enabled: true,
                radius: 2.5
            },
            shadow: true,
            data: []
        }],
    });
});
