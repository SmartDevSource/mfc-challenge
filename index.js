import { routes, falcon, empire } from "./data/data.js"

const giveMeTheOdds = (falcon, empire) => {
    const paths = getAllPaths(
        falcon.departure,
        falcon.arrival,
    )

    // console.log("all paths :", paths)

    const odds = calculatesOdds(paths, empire, falcon.autonomy)

    const higher_odd = Math.max(...odds.map(e=>e.odds))
    const best_way = odds.find(obj=>obj.odds == higher_odd)
    const output = higher_odd == 0 ?
        "0% de chance d'arriver à temps." :
        `Le meilleur chemin est ${best_way.way} avec ${best_way.odds}% de chances d'y arriver.`

    return output
}

const calculatesOdds = (paths, empire, autonomy) => {
    let time_traveled = 0, current_risks = 0
    const bounty_hunters = empire.bounty_hunters
    let current_autonomy = autonomy

    const outputs = []

    for (const path of paths){
        let start_departure = path[0]
        let departure = path.shift()
        current_risks = 0, time_traveled = 0
        for (const current_planet of path){
            const next_destination_distance = routes[departure].destinations[current_planet]
            time_traveled += next_destination_distance
            if (next_destination_distance > current_autonomy){
                current_autonomy = autonomy
                current_risks += getRisks(time_traveled, current_planet, bounty_hunters)
                time_traveled++
            }
            current_autonomy -= next_destination_distance
            current_risks += getRisks(time_traveled, current_planet, bounty_hunters)
            departure = current_planet
        }

        const days_left = empire.countdown - time_traveled + 1
        if (days_left > 0) current_risks -= days_left
        outputs.push({
            way: `${start_departure} > ${path.join(' > ')}`,
            countdown: days_left,
            odds: days_left < 0 ? 0 : getOdd(current_risks)
        })
    }

    return outputs
}

const getOdd = current_risks => {
    if (current_risks == 0) return 100
    let percentage = 1/10

    for(let n = 1 ; n < current_risks ; n++)
        percentage += (Math.pow(9, n) / Math.pow(10, n+1))

    return 100 - (percentage * 100)
}

const getRisks = (time_traveling, current_planet, bounty_hunters) => {
    for (const hunter_presence of bounty_hunters){
        if (hunter_presence.planet == current_planet && hunter_presence.day == time_traveling)
            return 1
    }
    return 0
}

const getAllPaths = (departure, arrival, current_path = [], all_paths = []) => {
    current_path.push(departure)

    if (arrival == departure)
        all_paths.push([...current_path])
    else
        for (const key in routes[departure].destinations)
            if (!current_path.includes(key))
                getAllPaths(key, arrival, current_path, all_paths)
    
    current_path.pop()
    return all_paths
}


console.log("[First empire entry]", giveMeTheOdds(falcon, empire.first))
console.log("[Second empire entry]", giveMeTheOdds(falcon, empire.second))
console.log("[Third empire entry]", giveMeTheOdds(falcon, empire.third))
console.log("[Fourth empire entry]", giveMeTheOdds(falcon, empire.fourth))