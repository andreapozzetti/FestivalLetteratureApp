/*DOT CHART FUNCTION*/

function getDataDotChart(fileName, chartName, interval, timeToShow, DotInterval){

    var options = {
        chart: {
            renderTo: chartName,
            type: 'bubble',
            backgroundColor:'rgba(255, 255, 255, 0.0)'
        },
        colors: ['#f23789', '#f3720a', '#C60DF4', '#3BDB00', '#FF0308', '#F3E507', '#6F00F2', '#04B200', '#FF5D07', '#2A00E0', '#E02ED7'],
        title: {
            text: null
        },
        xAxis: {
            startOnTick: false,
            endOnTick: false,
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%H:%M',
            }
 
        },
        yAxis: {
            min: 0,
            gridLineWidth: 0,
            startOnTick: false,
            endOnTick: false,
            categories: [],
            title: {
                text: null
            }
        },
        plotOptions: {
            bubble: {
                minSize: 1,
                maxSize: 30
            }
        },
        marker: {
              fillOpacity: 0.9
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true,
            headerFormat: '',
            pointFormat: '{point.z}',
        },
        series: []
    };


    $.get(fileName, function(data) {
        // Split the lines
        var lines = data.split('\n');
        
        // Iterate over the lines and add categories or series
        var series = new Object();
        series.data = [];
        var startTime;
        var lastTime;

        $.each(lines, function(lineNo, line) {
            var items = line.split(',');
            var series = new Object();
            series.data = [];

            if (lineNo == 0) {
                lastTime = items[12];
                
                if(DotInterval == "m"){
                    lastTime = roundQuarter(parseInt(lastTime));
                    startTime = parseInt(lastTime) - parseInt(timeToShow);
                }
                else{
                    lastTime = roundHour(parseInt(lastTime));
                    startTime = parseInt(lastTime) - parseInt(timeToShow);
                }   
            }

            if (lineNo != 0) {
                $.each(items, function(itemNo, item) {
                    if (itemNo == 0) {
                        options.yAxis.categories.push(item);
                    }
                    else {
                        singleValue = new Array(parseInt(lineNo-1), parseInt(item));
                        series.data.push(singleValue);
                        series.pointInterval = parseInt(interval);
                        series.marker = { fillOpacity: 0.9 };
                        series.pointStart = parseInt(startTime);
                        $.each(items, function(itemNo, item) {
                            if (itemNo > 0) {
                                //series.data.push("["+lineNo+","+item+"]");
                                //console.log("["+lineNo+","+item+"]");
                            }
                        });
                    }
                });
            
                var seriesJson = JSON.stringify(series);
                //console.log(seriesJson);
                options.series.push(series);
            }       
        });
        
        // Create the chart
        var chart = new Highcharts.Chart(options);
    });

} // END OF FUNCTION getDataDotChart();

function roundQuarter(time){

    var dateToChange = new Date(time);
    var year = dateToChange.getFullYear();
    var month = dateToChange.getMonth();
    var day = dateToChange.getDate();
    var hour = dateToChange.getHours();
    var minutes = dateToChange.getMinutes();
    var h = minutes > 52 ? (hour === 23 ? 0 : ++hour) : hour;
    var m = (Math.round(minutes/15) * 15) % 60;

    var dateChanged = new Date(year,month, day, h, m);
    
    return dateChanged.getTime();

}


function roundHour(time) {

    var dateToChange = new Date(time);

    dateToChange.setHours(dateToChange.getHours() + Math.round(dateToChange.getMinutes()/60));
    dateToChange.setMinutes(0);

    return dateToChange.getTime();
}