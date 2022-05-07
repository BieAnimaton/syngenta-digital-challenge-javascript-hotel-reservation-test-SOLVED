function getCheapestHotel (input) { //DO NOT change the function's name.
    let isRegularOrReward = 0, dayOne = "", dayTwo = "", dayThree = ""

    isRegularOrReward = input.search('Regular')
    isRegularOrReward = input.search('Rewards')

    pattern = /\((.+?)\)/g

    dayOne = input.match(pattern)[0].replace('(', '').replace(')', '')
    dayTwo = input.match(pattern)[1].replace('(', '').replace(')', '')
    dayThree = input.match(pattern)[2].replace('(', '').replace(')', '')

    normalDays = ["mon", "tues", "wed", "thur", "fri"]
    weekends = ["sat", "sun"]

    function findCheapestHotel (isRegularOrReward) {
        
        let cost_lake = 0, cost_bridge = 0, cost_ridge = 0, lakewood, bridgewood, ridgewood, chosenHotel

        if (isRegularOrReward) {
            lakewood = [110, 90, 3]
            bridgewood = [160, 60, 4]
            ridgewood = [220, 150, 5]
        } else {
            lakewood = [80, 80, 3]
            bridgewood = [110, 50, 4]
            ridgewood = [100, 40, 5]
        }

        function addPrice (isWeekend) {
            cost_lake += lakewood[isWeekend]
            cost_bridge += bridgewood[isWeekend]
            cost_ridge += ridgewood[isWeekend]
        }

        function checkThreePrices (day) {
            if (normalDays.includes(day)) {
                addPrice(0)
            } else if (weekends.includes(day)) {
                addPrice(1)
            } else {
                console.log("Error")
            }
        }

        checkThreePrices(dayOne)
        checkThreePrices(dayTwo)
        checkThreePrices(dayThree)

        function checkPriceAndClassification () {

            function compareTwo (cost1, cost2, class1, class2, name1, name2) {
                if (cost1 < cost2 || class1 < class2) {
                    chosenHotel = name1
                }
                if (cost1 > cost2 || class1 > class2) {
                    chosenHotel = name2
                }
            }

            if (cost_lake < cost_bridge) {
                compareTwo (cost_lake, cost_ridge, lakewood[3], ridgewood[3], "Lakewood", "Bridgewood")
            } else if (cost_bridge < cost_lake) {
                compareTwo (cost_bridge, cost_ridge, bridgewood[3], ridgewood[3], "Bridgewood", "Ridgewood")
            } else {

                function compareFinal (cost1, cost2, class1, class2, name1, name2) {
                    if (cost1 < cost2 || class1 < class2) {
                        chosenHotel = name1
                    }
                    if (cost1 > cost2 || class1 > class2) {
                        chosenHotel = name2
                    }
                }

                compareFinal(cost_ridge, cost_lake, ridgewood[3], lakewood[3], "Ridgewood", "Lakewood")
                compareFinal(cost_ridge, cost_bridge, ridgewood[3], bridgewood[3], "Ridgewood", "Bridgewood")
            }

            function isEqualToOther (cost1, cost2, class1, class2, name1, name2) {
                if (cost1 == cost2) {
                    if (class1 > class2) {
                        chosenHotel = name1
                    } else {
                        chosenHotel = name2
                    }
                }
            }

            isEqualToOther(cost_lake, cost_bridge, lakewood[3], bridgewood[3], "Lakewood", "Bridgewood")
            isEqualToOther(cost_lake, cost_ridge, lakewood[3], ridgewood[3], "Lakewood", "Ridgewood")
            isEqualToOther(cost_bridge, cost_ridge, bridgewood[3], ridgewood[3], "Bridgewood", "Ridgewood")
        }
        checkPriceAndClassification()

        return chosenHotel

    }

    if (isRegularOrReward) {
        // Condition if "Regular"
        let hotel = findCheapestHotel(isRegularOrReward)
        return hotel

    } else {
        // Condition if "Reward"
        let hotel = findCheapestHotel(isRegularOrReward)
        return hotel
    }

}

exports.getCheapestHotel = getCheapestHotel
