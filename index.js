const routes = {
    "Tatooine": {
        destinations: {
            "Dagobah": 6,
            "Hoth": 6
        }
    },
    "Dagobah": {
        destinations: {
            "Endor": 4,
            "Hoth": 1
        }
    },
    "Hoth": {
        destinations: {
            "Endor": 1
        }
    }
}

const falcon = {
    autonomy: 6,
    departure: "Tatooine",
    arrival: "Endor"
}

const empire = {
    first: {
        countdown: 7, 
        bounty_hunters: [
          {planet: "Hoth", day: 6}, 
          {planet: "Hoth", day: 7},
          {planet: "Hoth", day: 8}
        ]
    }
}

const giveMeTheOdds = (routes, falcon, empire) => {
    const countdown = empire.countdown
    const bounty_hunters = empire.bounty_hunters

    let current_destinations =  routes[falcon.departure].destinations

    const output = getPathsToArrival(current_destinations)

    return output
}

const getPathsToArrival = (destinations, output='') => {
    if (destinations["Endor"]) return output

    for (const key in destinations){
        console.log(key)
        output += key
        getPathsToArrival(routes[key].destinations, output)
    }
}

console.log(giveMeTheOdds(routes, falcon, empire.first))