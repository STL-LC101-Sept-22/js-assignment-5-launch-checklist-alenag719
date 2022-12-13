// Write your JavaScript code here!

window.addEventListener("load", function () {

    let form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        formSubmission(document, list, pilot.value, copilot.value, fuelLevel.value, cargoLevel.value);
        event.preventDefault();
    });

    let pilot = document.querySelector("input[name=pilotName]");
    let copilot = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoLevel = document.querySelector("input[name=cargoMass]");


    let list = document.getElementById("faultyItems");
    list.style.visibility = "hidden";

    let listedPlanets;
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);

        let destination = pickPlanet(listedPlanets);
        addDestinationInfo(document,
            listedPlanets[destination].name,
            listedPlanets[destination].diameter,
            listedPlanets[destination].star,
            listedPlanets[destination].distance,
            listedPlanets[destination].moons,
            listedPlanets[destination].image
        );
    });
});
