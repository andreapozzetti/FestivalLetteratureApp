
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	var i;
	var arrayValues = [];
	var arrayValuesMilliseconds = [];
	var startDate = new Date(2014, 10, 05, 11, 00);
	var startDateMilliseconds = startDate.getTime();


  var currentDate = new Date(2014, 9, 20, 03, 00);
  var currentDateMilliseconds = currentDate.getTime();

  var endDate = new Date(2014, 10, 09, 19, 00);
	var endDateMilliseconds = endDate.getTime();

  //var endDate = new Date(2014, 8, 15, 4, 0);
  //var endDateMilliseconds = endDate.getTime();


	i = startDateMilliseconds;

	while(i < endDateMilliseconds ){
		var newDateMilliseconds = i;
		var newDate = new Date(newDateMilliseconds);
		var day = newDate.getDate();
		var month = newDate.getMonth()+1;
		var hour = newDate.getHours();
    var minute = (newDate.getMinutes()<10?'0':'') + newDate.getMinutes();
		var date = ""+day+"/"+month+" "+hour+"."+minute+"";
		arrayValuesMilliseconds.push(newDateMilliseconds);
		arrayValues.push(date);
    
		i = i + (3600 * 1000);
	}

  var defaultRange = arrayValues.length; //default start from end

	$("#slider").ionRangeSlider({
		        values: arrayValues,
            from: defaultRange-1,
            type: 'single',
            hasGrid: true,
            step: 1,
		    onLoad: function (obj) {        // callback is called after slider load and update

		        var fileName = arrayValuesMilliseconds[obj.fromNumber];

		        /*HEATMAP*/
				
        		var urlTwitterData = "http://131.175.59.106/festivaldelleletterature2014/Results/Heatmap/General/"+fileName+".csv";
        		var twitterData = loadData(urlTwitterData, 1, 0);


				initialize(twitterData);

        		var urlTweets = "http://131.175.59.106/festivaldelleletterature2014/Results/TweetsHeatmap/General/"+fileName+".csv";
        		tweets = loadData(urlTweets, 0, 1);
				showTweetMarkers(tweets);


		        /*DOT CHART*/
				var treOreDotChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/BubbleChart/3h/"+fileName+".csv";
				getDataDotChart(treOreDotChartCSV, "dotChart3h", 900000, 9900000, "m");

				var dodiciOreDotChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/BubbleChart/12h/"+fileName+".csv";
				getDataDotChart(dodiciOreDotChartCSV, "dotChart12h", 3600000, 39600000, "h");

				/*AREA CHART*/

				var dodiciOreAreaChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/AC/12h/"+fileName+".csv";
				getDataAreaChart(dodiciOreAreaChartCSV, "areaChart12h", 900000, 43200000);

				/*BAR CHART*/

				var unaOraBarChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/TopHT/1h/"+fileName+".csv";
				getDataBarChart(unaOraBarChartCSV, "barChart1h");

				var dodiciOreBarChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/TopHT/12h/"+fileName+".csv";
				getDataBarChart(dodiciOreBarChartCSV, "barChart12h");

				/*TOPICS*/

				var topicsChartJSON = "http://131.175.59.106/festivaldelleletterature2014/Results/Topic/"+fileName+".json";
				getDataTopicsChart(topicsChartJSON, "topicsChart");
		    
        },
		    onChange: function (obj) {      // callback is called on every slider change
		        //console.log(obj);
		    },
		    onFinish: function (obj) {      // callback is called on slider action is finished

		        var fileName = arrayValuesMilliseconds[obj.fromNumber];


            	/*HEATMAP*/
        
		        var urlTwitterData = "http://131.175.59.106/festivaldelleletterature2014/Results/Heatmap/General/"+fileName+".csv";
		        var twitterData = loadData(urlTwitterData, 1, 0);


		        initialize(twitterData);

		        var urlTweets = "http://131.175.59.106/festivaldelleletterature2014/Results/TweetsHeatmap/General/"+fileName+".csv";
		        tweets = loadData(urlTweets, 0, 1);
		        showTweetMarkers(tweets);


		            /*DOT CHART*/
		        var treOreDotChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/BubbleChart/3h/"+fileName+".csv";
		        getDataDotChart(treOreDotChartCSV, "dotChart3h", 900000, 9900000, "m");

		        var dodiciOreDotChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/BubbleChart/12h/"+fileName+".csv";
		        getDataDotChart(dodiciOreDotChartCSV, "dotChart12h", 3600000, 39600000, "h");

		        /*AREA CHART*/

		        var dodiciOreAreaChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/AC/12h/"+fileName+".csv";
		        getDataAreaChart(dodiciOreAreaChartCSV, "areaChart12h", 900000, 43200000);

		        /*BAR CHART*/

		        var unaOraBarChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/TopHT/1h/"+fileName+".csv";
		        getDataBarChart(unaOraBarChartCSV, "barChart1h");

		        var dodiciOreBarChartCSV = "http://131.175.59.106/festivaldelleletterature2014/Results/TopHT/12h/"+fileName+".csv";
		        getDataBarChart(dodiciOreBarChartCSV, "barChart12h");

				/*TOPICS*/

				var topicsChartJSON = "http://131.175.59.106/festivaldelleletterature2014/Results/Topic/"+fileName+".json";
				getDataTopicsChart(topicsChartJSON, "topicsChart");

		    }
        });


}
