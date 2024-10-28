#!/usr/bin/env node

const path = require('path');
const { RoomRadar } = require(path.resolve(__dirname, './radar'));
const Table = require('cli-table3');
const [,, ...args] = process.argv
if (args.length == 0) {
    console.log("Welcome to RoomRadar!");
    console.log("Usage:");
    console.log("  roomradar help                - Get an overview of the possible queries.");
    console.log("  roomradar \"Your Search Query\" - Pass in your search query to find a room or building.");
    process.exit(0);
} else if (args[0] === 'help') {
    console.log("RoomRadar CLI Help:");
    console.log("  Pass in your search query as an argument to find a room or building.");
    console.log("  Example:");
    console.log("    roomradar \"ED112\"");
    console.log("    roomradar \"Engineering 1\"");
    console.log("Your search query can contain a partial room number, partial building name, or a partial building name AND room number");
    console.log("  Add the -s flag to view the schedules of the resulting rooms")
    console.log("  Example:");
    console.log("     roomradar \"ED112\" -s")
    console.log("     roomradar \"Engineering 102\" -s")
    process.exit(0);
} else {
    let queries = [];
    let schedule_bool = false;
    for(arg of args) {
            // displayTable(RoomRadar(arg))
        arg == "-s" || arg == "--schedule" ? schedule_bool = true : null;
        !arg.match("-") && !arg.match("--") ? queries.push(arg) : null
    }
    if(!schedule_bool) {
        for(query of queries) {
            console.log(`Search query ${query}:`);
            console.log(displayTable(RoomRadar(query)));
        }
    } else {
        for(query of queries) {
            console.log(`Search query ${query}:`);
            console.log(displayScheduleTable(RoomRadar(query)));
        }
    }
    

}
function displayTable(data) {
    const table = new Table({
        head: ['Room number', 'Type','Status'],
        colWidths: [15, 20, 35]
    });
    for(room of data) table.push([room.Number, room.RoomType ,room.status])

    console.log(table.toString());
}

function displayScheduleTable(data) {
    const table = new Table({
        head: ['Room number', `Today's schedule`],
        colWidths: [15, 40]
    });
    
    
    for(room of data) {
        if(room.schedule) {
            if(Object.keys(room.schedule).includes(getDay())) {
                room.schedule_string = ""
                for(course of room.schedule[getDay()]) {
                    room.schedule_string += course.start + " to " + course.end + "\n"
                }
                table.push([room.Number,room.schedule_string]);
            }
            else table.push([room.Number,"Available all day"]); 
        } else table.push([room.Number,"Room has no schedule"])
        
    }

    console.log(table.toString());
}

// threw this in for when i compute room rating
function generateRatingScale(rating) {
    const maxRating = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(maxRating - rating);
    return filledStars + emptyStars;
}

function getDay() {
    const weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    return weekdays[date.getDay()];
}

