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
    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = 'rgb(65, 159, 106)';
    } else if (fuelLevel >= 10000) {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000) {
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = 'rgb(65, 159, 106)';
    } else if (cargoLevel < 10000) {
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }

    if (fuelLevel > 10000 && cargoLevel < 10000) {
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    }
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
    });

    return planetsReturned;
}


function pickPlanet(planets) {
    //return Math.floor(Math.random() * planets.length);
    let randomPlanet = Math.floor(Math.random() * planets.length);
    return randomPlanet;
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
