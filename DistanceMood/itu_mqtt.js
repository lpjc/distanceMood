// --- SETTING UP -------------------------------------- (DON'T CHANGE)
const myBroker = "wss://edp21:Ko5z2bU0Uf7ajNzv@edp21.cloud.shiftr.io"; 
const myID = "itu" + parseInt(Math.random() * 1000000, 10); //Construct a random unique ID
const client = mqtt.connect(myBroker, {clientId: myID});


// --- CONNECTING-------------------------------------- (DON'T CHANGE)

client.on('connect', function() {
  console.log('connected!');
  client.subscribe(positionTopic);

});

// --- SEND MESSAGE --------------------------------------

function sendMessage(topic,msg){
  client.publish(topic, msg);
}

// --- RECEIVING MESSAGE --------------------------------------

client.on('message', function(topic, message) {
 
  let msg = message.toString();
 // console.log("modtaget"+msg);

  if(topic == positionTopic){
    receivePos(msg)
  }
 
});






