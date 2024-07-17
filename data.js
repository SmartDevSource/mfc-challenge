export const routes = {
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

export const falcon = {
    autonomy: 6,
    departure: "Tatooine",
    arrival: "Endor"
}

export const empire = {
    first: {
        countdown: 7, 
        bounty_hunters: [
          {planet: "Hoth", day: 6}, 
          {planet: "Hoth", day: 7},
          {planet: "Hoth", day: 8}
        ]
    },
    second: {
        countdown: 8, 
        bounty_hunters: [
          {planet: "Hoth", day: 6}, 
          {planet: "Hoth", day: 7},
          {planet: "Hoth", day: 8}
        ]
    },
    third: {
        countdown: 9, 
        bounty_hunters: [
          {planet: "Hoth", day: 6}, 
          {planet: "Hoth", day: 7},
          {planet: "Hoth", day: 8}
        ]
    },
    fourth: {
        countdown: 10, 
        bounty_hunters: [
          {planet: "Hoth", day: 6}, 
          {planet: "Hoth", day: 7},
          {planet: "Hoth", day: 8}
        ]
    }
}