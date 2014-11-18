/*AREA CHART FUNCTION*/

function getDataAreaChart(fileName, chartName, interval, timeToShow){

    var max;

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var options = {
        chart: {
            renderTo: chartName,
            type: 'area',
            backgroundColor:'rgba(255, 255, 255, 0.0)'
        },
        colors: ['#f3720a', '#f23789'],
        title: {
            text: null
        },
        xAxis: {
            startOnTick: false,
            endOnTick:false,
            type: 'datetime',
            dateTimeLabelFormats: {
                hour:"%H:%M"
            }   
        },
        yAxis: {
            gridLineWidth: 0,
            startOnTick: false,
            endOnTick: false,
            max: max,
            labels: {
                    formatter: function () {
                        return this.value;
                    }
            },
            title: {
                text: null
            }
        },
        plotOptions: {
            series: {
                fillOpacity: 0.9
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true,
            headerFormat: '',
            pointFormat: '{point.y}',
        },
        series: []
    };

    $.get(fileName, function(data) {
        // Split the lines
        var lines = data.split('\n');
        
        var data1 = [];
        var data2 = [];
        var startTime;

        var lastLine = lines.length - 2;
        var nullLine = lines.length-1;
        
        $.each(lines, function(lineNo, line) {
            var items = line.split(',');
            var series = new Object();
            series.data = [];



            if (lineNo != 0) {
              if (lineNo != nullLine) {

                
                if (lineNo == lastLine) {
                    startTime = items[0];
                    //startTime = parseInt(startTime) + parseInt(timeToShow);
                }

                
                var pointMilliseconds = parseInt(items[0]);

                var pointDate = new Date(pointMilliseconds);
                var pointYear = pointDate.getFullYear();
                var pointDay = pointDate.getDate();
                var pointMonth = pointDate.getMonth();
                var pointHour = pointDate.getHours();
                var pointMinute = pointDate.getMinutes();

                //Date.UTC(parseInt(pointYear), parseInt(pointMonth), parseInt(pointDay), parseInt(pointHour), parseInt(pointMinute)), 23

                //console.log(" "+pointYear+" "+pointDay+" "+pointMonth+" "+pointHour+" "+pointMinute+" ");

                var pointItem1 = [parseInt(pointMilliseconds), parseInt(items[1])];
                data1.push(pointItem1);

                var pointItem2 = [parseInt(pointMilliseconds), parseInt(items[2])];
                data2.push(pointItem2);

              }
            }
            
        });


        function getMaxOfArray(numArray) {
            return Math.max.apply(null, numArray);
        }

        var serie1 = {
            pointInterval: parseInt(interval),
            pointStart: parseInt(startTime),
            data: data1.reverse()
        }

        var serie2 = {
            pointInterval: parseInt(interval),
            pointStart: parseInt(startTime),
            data: data2.reverse()
        }

        options.series.push(serie1);
        options.series.push(serie2);

        //console.log(options.series)
        
        // Create the chart
        var chart = new Highcharts.Chart(options);
        //var chart2 = new Highcharts.Chart(optionsTeam2);
    });

} // END OF FUNCTION getDataAreaChart;


/*-----------------------------------------------------------------------------------------------------*/