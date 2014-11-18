/* HEATMAP */

  var map, pointarray, heatmap;
  var pointArray;
  var radius;
  var exp = 1.6;
  var mapZoom;
  var markers = [];
  var tweets;
  var markerTweet = [];
  var venues;
  var venuesShowHide = 1;
  var tweetsShowHide = 1;
  var infowindowVenues = new google.maps.InfoWindow({
        maxWidth: 350
  });
  var infowindow = new google.maps.InfoWindow({
        maxWidth: 350
  });


function loadData(urlData, removeFirstRow, tweet){
  
  var fieldsArray = [];

  $.ajax({
    url: urlData,
    async: false
  })
  .done(function(csv) {
      
      if(removeFirstRow == 1){
          fieldsArray = csv.csvToArray({ rSep:'\n', quot:"'" });
          fieldsArray.splice(0,1);
      }
      else{
        if(tweet == 0){
          fieldsArray = csv.csvToArray({ rSep:'\n', quot:"'" });
        }
        else{
          fieldsArray = csv.csvToArray({ rSep:'\n', quot:'"' });
        }
      }

  });



  return fieldsArray;

}

function initialize(twitterData) {
  
  var twitterDataArray = [];

  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(42.466534, 14.213912),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    panControl: false,
    zoomControl: false,
    scaleControl: false,
    mapTypeControl: false,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  mapZoom = 14;

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  for (var i = 0; i < twitterData.length; i++) {
    twitterDataArray.push(new google.maps.LatLng(twitterData[i][0],twitterData[i][1]));
  }

  pointArray = new google.maps.MVCArray(twitterDataArray);

  radius = 0;
  radius = mapZoom - 12;
  radius = Math.pow(radius,exp);
  radius = (radius * 2.5) + 19;

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    maxIntensity: 2,
    radius: radius,
  });

  heatmap.setMap(map);
  showVenues();

  /* Pescara Button */

  var zoomPescaraControlDiv = document.createElement('div');
  var zoomPescaraControl = new ZoomControl(zoomPescaraControlDiv, map, "Pescara", "pescaraButton", "pescara", 42.466534, 14.213912, 13, 13);
  zoomPescaraControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomPescaraControlDiv);

  /* Festival */

  var zoomFestivalControlDiv = document.createElement('div');
  var zoomFestivalControl = new ZoomControl(zoomFestivalControlDiv, map, "Festival", "festivalButton", "festival", 42.462129, 14.211855, 16, 15);
  zoomFestivalControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomFestivalControlDiv);

  /*Tweet Button */

  var tweetsControlDiv = document.createElement('div');
  var tweetsControl = new TweetsControl(tweetsControlDiv, map);

  tweetsControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(tweetsControlDiv);

  /*Venues Button */

  var venuesControlDiv = document.createElement('div');
  var venuesControl = new VenuesControl(venuesControlDiv, map, "Venues", "venuesButton", "venues");

  venuesControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(venuesControlDiv);
    
}

function HeatmapControl(zoomDiv, map, buttonText, buttonClass, imageName) {
  zoomDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundImage = 'url(http://131.175.59.106/festivaldelleletterature2014/html/img/'+imageName+'On.jpg)';
  controlUI.style.width = '37px';
  controlUI.style.height = '37px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  zoomDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.className = ''+buttonClass+'';
  controlUI.appendChild(controlText);

  google.maps.event.addDomListener(controlUI, 'click', function() {
  var buttonClass = controlText.className;

  });

}

function changeHeatmapData(twitterData){

	var newTwitterDataArray = [];
	for (var i = 0; i < twitterData.length; i++) {
    	newTwitterDataArray.push(new google.maps.LatLng(twitterData[i][0],twitterData[i][1]));
  	}

  	return newTwitterDataArray
}

function showVenues(){
  var urlVenues = "http://131.175.59.106/festivaldelleletterature2014/html/venues.csv";
  venues = loadData(urlVenues, 0);
  for (var i = 0; i < venues.length; i++) {
    markers.push(new google.maps.Marker({
      position: new google.maps.LatLng(venues[i][0],venues[i][1]),
      map: map,
      icon: 'http://131.175.59.106/festivaldelleletterature2014/html/img/markerVenue.png',
      draggable: false,
      animation: google.maps.Animation.DROP,
      html: '<p>'+venues[i][2]+'</p>',
      zIndex: 0
    }));

    google.maps.event.addListener(markers[i], "click", function () {
      infowindow.setContent(this.html);
      infowindow.open(map, this);
    });

  }
}

function hideVenues() {
    for (var i = 0; i < venues.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
}

function showTweetMarkers(tweets) {

    for (var i = 0; i < tweets.length; i++) {
      var tweetsLatLng = new google.maps.LatLng(tweets[i][0], tweets[i][1]);
      markerTweet.push(new google.maps.Marker({
                      position: tweetsLatLng,
                      map: map,
                      icon: 'http://131.175.59.106/festivaldelleletterature2014/html/img/twitter.png',
                      animation: google.maps.Animation.DROP,
                      zIndex: parseInt(i+1),
                      html: tweets[i][2]
      }));

      google.maps.event.addListener(markerTweet[i], "click", function () {
        $( "#twitter-wjs" ).remove();
        infowindow.setContent(this.html);
        infowindow.open(map, this);
      });



      google.maps.event.addListener(infowindow, 'domready', function () {
                ! function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "http://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");
      });

      google.maps.event.addListener(infowindow,'closeclick',function(){
          $( "#twitter-wjs" ).remove();
          //map.setCenter(new google.maps.LatLng(44.349915, 9.156330));
      });

    }

}

function hideTweetMarkers(tweets) {
    $( "#twitter-wjs" ).remove();
    for (var i = 0; i < tweets.length; i++) {
      markerTweet[i].setMap(null);
    }
    markerTweet = [];
}

function ZoomControl(zoomDiv, map, buttonText, buttonClass, imageName, centerLat, centerLon, setMapZoom, mapZoom) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map



  zoomDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundImage = 'url(http://131.175.59.106/festivaldelleletterature2014/html/img/'+imageName+'.jpg)';
  controlUI.style.width = '37px';
  controlUI.style.height = '37px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  zoomDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.className = ''+buttonClass+'';
  controlUI.appendChild(controlText);

  google.maps.event.addDomListener(controlUI, 'click', function() {


    map.setCenter(new google.maps.LatLng(centerLat, centerLon));
    map.setZoom(setMapZoom);
    

    radius = 0;
    radius = mapZoom - 12;
    radius = Math.pow(radius,exp);
    radius = (radius * 2.5) + 10;

    heatmap.set('radius', radius);

    /*
    if(tweetsShowHide == 1){
        tweetsShowHide = null;
        $( '.tweetsButton' ).html( '<b>Mostra Tweets</b>' );
        hideTweetMarkers(tweets);
    }

    
    if(venuesShowHide == 1){
        venuesShowHide = null;
        $( '.venuesButton' ).html( '<b>Mostra Venues</b>' );
        hideVenues();
    }
    */

  });

}

/* VENUES */

function VenuesControl(venuesDiv, map, buttonText, buttonClass, imageName) {

  venuesDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundImage = 'url(http://131.175.59.106/festivaldelleletterature2014/html/img/'+imageName+'On.jpg)';
  controlUI.style.width = '37px';
  controlUI.style.height = '37px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  venuesDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.className = ''+buttonClass+'';
  controlUI.appendChild(controlText);

  google.maps.event.addDomListener(controlUI, 'click', function() {
  var buttonClass = controlText.className;

    if(!venuesShowHide){
      venuesShowHide = 1;
      controlUI.style.backgroundImage = 'url(http://131.175.59.106/festivaldelleletterature2014/html/img/'+imageName+'On.jpg)';
      showVenues();
    }
    else {
      venuesShowHide = null;
      controlUI.style.backgroundImage = 'url(http://131.175.59.106/festivaldelleletterature2014/html/img/'+imageName+'Off.jpg)';
      hideVenues();
    }


  });

  

}

function TweetsControl(tweetsDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  tweetsDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundImage = 'url(http://131.175.59.106/festivaldelleletterature2014/html/img/twitterOn.jpg)';
  controlUI.style.width = '37px';
  controlUI.style.height = '37px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  tweetsDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.className = 'tweetsButton';
  controlUI.appendChild(controlText);


  google.maps.event.addDomListener(controlUI, 'click', function() {
    if(!tweetsShowHide){
      tweetsShowHide = 1;
      controlUI.style.backgroundImage = 'url(http://131.175.59.106/festivaldelleletterature2014/html/img/twitterOn.jpg)';
      showTweetMarkers(tweets);
    }
    else {
      tweetsShowHide = null;
      controlUI.style.backgroundImage = 'url(http://131.175.59.106/festivaldelleletterature2014/html/img/twitterOff.jpg)';
      hideTweetMarkers(tweets);
    }

  });

}