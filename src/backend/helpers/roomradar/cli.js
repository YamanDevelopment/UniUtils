const { RoomRadar } = require('./radar');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter room name: ', (roomName) => {
    const radar = RoomRadar(roomName);
    console.log(radar);
    rl.close();
});
