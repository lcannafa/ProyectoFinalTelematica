
var refreshIntervalId;
var lat;
var lon;
var usuario;
var map;

function start(){
    refreshIntervalId = setInterval(save, 1000);
    document.getElementById("toma").disabled = true;
    document.getElementById("parar").disabled = false;
}
function stop(){
    clearInterval(refreshIntervalId);
    document.getElementById("toma").disabled = false;
    document.getElementById("parar").disabled = true;
}
function save(){
    console.log("lat: "+lat+"lon: "+lon+" a "+usuario);
    document.fm.user.value = usuario
    document.fm.latitud.value = lat
    document.fm.longitud.value = lon
    addMaker(lat,lon)
    document.fm.submit()
    ///Locations.insert({"local.user": usuario, "local.latitud": lat,"local.longitud": lon});
}

function locat(user) {
    navigator.geolocation.watchPosition(fn_ok, fn_error);
    usuario = user;
    function fn_error() {
        alert("error");
    }

    function fn_ok(respuesta) {
        lat = respuesta.coords.latitude;
        lon = respuesta.coords.longitude;
    }
}

function initMap(){
    document.getElementById("map").style.visibility = "hidden";
    document.getElementById("take").style.visibility = "visible";
    //options
    var options = {
        zoom:8,
        center: new google.maps.LatLng(6.27053,-75.57211999999998)
    }
    //new map
    map = new 
    google.maps.Map(document.getElementById('map'), options);
}

function addMaker(a,b){
    var coor = new google.maps.LatLng(a,b)
    var marker = new google.maps.Marker({
        position: coor,
        map:map
    })
}

function take(){
    document.getElementById("map").style.visibility = "hidden";
    document.getElementById("take").style.visibility = "visible";
}

function getmap(){
    document.getElementById("map").style.visibility = "visible";
    document.getElementById("take").style.visibility = "hidden";
}