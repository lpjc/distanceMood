let myLon;
let myLat;
let reciLon;
let reciLat;
let reciMood;

let isGeoConnected = false;

let maxMeters = 20; // from host before starting to turn green

let hue; //we want the range at 0(red) to 120(green)
let sat = 80;
let light =50;

let isHost = null;

let refreshInterval = window.setInterval(autoRefresh, 300);

function yesHost(){
  isHost = true;
  document.getElementById("distanceLine").innerHTML = " Am Host"
}
function noHost(){
  isHost = false;
  
}

function autoRefresh() {

  if(isHost){
    console.clear();
    console.log("refreshing broadcast: ")
 
    broadcastPos();
  } else if(!isHost){
    console.clear();
    console.log("refreshing background: ")
    backgroundDraw();
  } else{
    console.log("null");
  }
}

options = {
  enableHighAccuracy: true,
  timeout: 5000, 
  maximumAge: 10 
};

if(!isGeoConnected){
  document.getElementById("geoLoad").innerHTML = "LOADING GEOLOCATION, please wait...";
}

function broadcastPos(){
  let moodPositionArr =[myLon, myLat];
  let msg = JSON.stringify(moodPositionArr);
  sendMessage(positionTopic, msg);
  console.log("BRODCASTED lon/lat " + myLon + "/"+ myLat)
  isHost = true;
}

function receivePos(msg){
  let unpMsg = JSON.parse(msg)

 // reciMood = unpMsg[0];
  reciLon = unpMsg[0];
  reciLat = unpMsg[1];

 // console.log("RECIEVED lon/lat"+ reciLon + "/" + reciLat)
}

function getDistanceToHost(){
  let distance = haversine(myLat, myLon, reciLat, reciLon)
  console.log("distance to host: "+distance)
  document.getElementById("showdata").innerHTML = distance;
  return distance;
}

function refreshMyPos(position){
  navigator.geolocation.getCurrentPosition(geoSuccess,geoError2,options)
  console.log("MY POSITION lon/lat "+ myLon +" " + myLat)	
}

function backgroundDraw(){

  refreshMyPos();
  let distance = getDistanceToHost();
  if(distance < 100){
    hue = mappingValue(distance,0,maxMeters,120,0) //mapping 0 meters to 120 hue value(green), and maxMeters meters to 0 hue value(red)
      onePixelDo(true,hue,sat,light);
  } else {
      onePixelDo(false,0,sat,light);
  }
  
}


function geoSuccess(position) 
{
  let isGeoConnected = true;

  console.log("GeoConection True")

  document.getElementById("geoLoad").innerHTML = "";

  myLat = position.coords.latitude;
  myLon = position.coords.longitude;

}
  
function geoError() 
{
    console.log("geoError")
}

function geoError2() 
{
    console.log("geoError2")
}

function mappingValue(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

//navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options) //Do it once
navigator.geolocation.watchPosition(geoSuccess,geoError, options)		 //Keep tracking
