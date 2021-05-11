/*
The haversine formula is an equation important in navigation,
giving great-circle distances between two points on a sphere from their longitudes and latitudes.

It is a special case of a more general formula in spherical trigonometry, 
the law of haversines, relating the sides and angles of spherical "triangles".
*/


function haversine() {

    var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI;});   
   
    var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];

    var R = 6372.8;  // Earths radius in km

    var dLat = lat2 - lat1; // lat diff

    var dLon = lon2 - lon1; // lon diff

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    var c = 2 * Math.asin(Math.sqrt(a));

    var afrundet = Math.floor((R * c) * 1000);

    return afrundet
}

//USAGE: let afstand = haversine(latt_sted_A, long_sted_A, latt_sted_B, long_sted_B));