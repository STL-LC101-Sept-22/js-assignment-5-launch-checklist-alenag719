// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const div = document.getElementById("missionTarget");
    div.innerHTML = `\
          <h2>Mission Destination</h2>
            <ul>
              <li>Name: ${name}</li>
              <li>Diameter: ${diameter}</li>
              <li>Star: ${star}</li>
              <li>Distance from Earth: ${distance}</li>
  <li>Number of Moons: ${moons}</li>
            </ul>
  <img src="${imageUrl}"></img>
          `;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput) === false) {
        return "Is a Number";
    } else if (isNaN(testInput) === true) {
        return "Not a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let launchStatus = document.getElementById("launchStatus")
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");

    if (
        (validateInput(pilot)) === "Empty" ||
        (validateInput(copilot)) === "Empty" ||
        (validateInput(fuelLevel)) === "Empty" ||
        (validateInput(cargoLevel)) === "Empty"
    ) {
        alert("All fields required!");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Make sure to enter valid information for each field!");
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = "visible";
    }
    if (fuelLevel < 10000 && cargoLevel <= 10000) {
        fuelStatus.innerText = "Fuel level too low for launch";
        cargoStatus.innerText = "Cargo mass low enough for launch";
        launchStatus.innerText = "Shuttle Not Ready for Launch";
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (fuelLevel < 10000 && cargoLevel > 10000) {
        fuelStatus.innerText = "Fuel level too low for launch";
        cargoStatus.innerText = "Cargo mass too heavy for launch";
        launchStatus.innerText = "Shuttle Not Ready for Launch";
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
        fuelStatus.innerText = "Fuel level high enough for launch";
        cargoStatus.innerText = "Cargo mass too heavy for launch";
        launchStatus.innerText = "Shuttle Not Ready for Launch";
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch"
        cargoLevel.innerHTML = "Cargo mass low enough for launch"
        launchStatus.innerHTML = "Shuttle Is Ready for Launch"
        launchStatus.style.color = " #419f6a";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    //.then(function (response) {
    //  return planetsReturned.json();});
    // console.log(response)
    return planetsReturned.json();

    // return planetsReturned;
    // });
}

function pickPlanet(planets) {
    return Math.floor(Math.random() * planets.length);
    // let random = Math.floor(Math.random() * planets.length);
    // return planets[random];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
