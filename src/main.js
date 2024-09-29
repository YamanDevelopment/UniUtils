const { handleSearchQuery } = require("./helpers/searchquery")
const fs = require('fs');
// import data from rooms
const data = JSON.parse(fs.readFileSync("../updated_room_data.json"))
// make list of buildings (this in particular is VERY fau specific but can be revisited)
const buildings = {
    "IN-1": "Innovation Centre Bldg. 1",
    "IN-2": "Innovation Centre Bldg. 2",
    "EE": "Engineering East",
    "EG": "Engineering West",
    "BS": "Behavioral Sciences Building",
    "AH": "Dorothy F. Schmidt Arts & Humanities",
    "PA": "Dorothy F. Schmidt Performing Arts Center",
    "VA": "Dorothy F. Schmidt Visual Arts Center",
    "GN": "General Classroom - North",
    "GS": "General Classroom - South",
    "SW": "College Of Social Work And Criminal Justice",
    "AL": "College Of Arts & Letters",
    "BU": "College Of Business In Phil Smith Hall",
    "ED": "College Of Education",
    "EC": "College Of Engineering And Computer Science",
    "BC": "College Of Medicine",
    "NU": "College Of Nursing",
    "SC": "College Of Science",
    "LL": "Friedberg Lifelong Learning Center",
    "IS": "Instructional Services",
    "PS": "Physical Science Building",
    "LS": "Sanford Life Sciences Building",
    "SF": "Schmidt Family Complex For Academic And Athletic Excellence",
    "SP": "Sean Stein Pavilion In College Of Business",
    "SO": "Social Science Building",
    "OC": "Wally Sanger Owl Club Center",
    "KH": "Barry Kaye Hall",
    "FL": "Fleming Hall",
    "FW": "Fleming West",
    "AC": "Tom Oxley Athletic Center",
    "CE": "Continuing Education Hall",
    "CM": "Computer Center",
    "CR": "Student Activities Center",
    "CU": "Culture and Society Building",
    "FA": "MARLEEN & HAROLD FORKAS ALUMNI CENTER",
    "GP": "Glades Park Towers",
    "HP": "Heritage Park Towers",
    "IR": "Indian River Towers",
    "LY": "S.E. Wimberly Library",
    "OD": "OFFICE DEPOT CENTER FOR EXECUTIVE EDUCATION",
    "PH": "Parliament Hall",
    "SE": "Charles E. Schmidt College of Science",
    "UN": "Student Union",
  };
  
// sample university wide room number
const sample = "ED112"
function main() {
// idk add rest api here?
    let t = handleSearchQuery("East", data, {
        buildings: buildings,
        sample: sample
    })
    console.log(t)
}

main()