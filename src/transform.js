groupAdultsByAgeRange = (people) => {
    if (people.length === 0) {
        return {}
    }
    else {
        const adults = people.filter((person) => person.age >= 18)
        if (adults.length === 0) {
            return {}
        } else {
            adultsTwentyAndYounger = adults.filter((adult) => adult.age <= 20)
            adultsThirtyAndYounger = adults.filter((adult) => adult.age >= 21 && adult.age <= 30)
            adultsFourtyAndYounger = adults.filter((adult) => adult.age >= 31 && adult.age <= 40)
            adultsFiftyAndYounger = adults.filter((adult) => adult.age >= 41 && adult.age <= 50)
            adultsAboveFifty = adults.filter((adult) => adult.age >= 51)

            const groups = {}

            if (adultsTwentyAndYounger.length !== 0) {
                groups['20 and younger'] = adultsTwentyAndYounger
            }

            if (adultsThirtyAndYounger.length !== 0) {
                groups['21-30'] = adultsThirtyAndYounger
            }

            if (adultsFourtyAndYounger.length !== 0) {
                groups['31-40'] = adultsFourtyAndYounger
            }

            if (adultsFiftyAndYounger.length !== 0) {
                groups['41-50'] = adultsFiftyAndYounger
            }

            if (adultsAboveFifty.length !== 0) {
                groups['51 and older'] = adultsAboveFifty
            }
            
            return groups
        }
    }
}

module.exports = { groupAdultsByAgeRange }