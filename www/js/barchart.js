/* BAR CHART FUNCTION*/

function getDataBarChart(fileName, chartName){

    var options = {
        chart: {
            renderTo: chartName,
            type: 'bar',
            backgroundColor:'rgba(255, 255, 255, 0.0)'
        },
        colors: ['#f3720a', '#f23789'],
        title: {
            text: null
        },
        xAxis: {
            categories: [],
            title: {
                text: null
            }  
        },
        yAxis: {
            min: 0,
            allowDecimals: false,
            title: {
                text: null
            },
            labels: {
                overflow: 'justify'
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
        var hashtag = [];
        var hashtagCount = [];
        
        $.each(lines, function(lineNo, line) {
            var items = line.split(',');

            if (lineNo != 0) {
                var addHashtag = "#"+items[0]+"";
                options.xAxis.categories.push(addHashtag);

                $.each(items, function(itemNo, item) {
                    if (itemNo == 1) {
                        item = parseInt(item);
                        hashtagCount.push(parseInt(item)); 
                    }
                    
                });
            
                //var seriesJson = JSON.stringify(series);
                //console.log(seriesJson);
                //options.series.push(series);
            }

            //options.series.push(series);
            
            
        });

        var serie = {
            data: hashtagCount
        }

        options.series.push(serie);

        // Create the chart
        var chart = new Highcharts.Chart(options);
    });

} // END OF FUNCTION getDataAreaChart;

