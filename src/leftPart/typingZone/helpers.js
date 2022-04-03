import {letterGeneration} from "./letterGenerationLogic.js"

// returns a dictionary of letters to type
const getLetters = (nbLetters) => {
    var letters = letterGeneration(nbLetters)

    var listDicts = []
    for (var k = 0; k < letters.length; k++){
        listDicts.push({
            letter : letters[k],
            status : undefined,
        })
    }

    return listDicts
}

// helper function to get the time or the date
const getTime = () => {
    const d = new Date()

    var nbSeconds = d.getTime() / 1000
    return(nbSeconds)
}

const getDate = () => {
    var dateObj = new Date()
    var date = dateObj.toISOString()
    date = date.split("T")[0]

    return date
}

const computeSpeed = (startTime, nbLetters) => {
    // calculate duration of typing all the letters
    var currTime = getTime()
    var duration = currTime - startTime

    // the words are of size 5
    var speed = Math.ceil(nbLetters / 5) / duration * 60

    return [speed, duration]
}


// letters = [{letter : 'a', status : "failure"}, {letter : 'b', status : undefined},...]
const computeAccuracy = (letters) => {
    // compute the accuracy
        // remove the undefined at the beginning of the array
    var letters = letters.filter((elt) => (elt.letter !== undefined))
    var success = letters.map((elt) => {
        if (elt.status === undefined){return(1)}
        else{return(0)}
    })
    var totSuccess = success.reduce((tot, elt) => (tot + elt))
    var accuracy = (totSuccess / letters.length * 100)

    return accuracy
}

// provide statistics about the different letters typed
const statsLetters = (letters) => {
        var count = {}
        var countErrors = {}
        var totErrors = 0

        for (var k = 0; k < letters.length; k++){
            let letter = letters[k].letter
            let status = letters[k].status

            if ((!letter) || letter === "␣"){continue}
            else{
                if (letter in count){
                    count[letter] += 1
                    countErrors[letter] += status === "failure" ? 1 : 0
                }
                else{
                    count[letter] = 1
                    countErrors[letter] = status === "failure" ? 1 : 0
                }
            }
            totErrors += status === "failure" ? 1 : 0
        }

        return [count, countErrors, totErrors]
    }

export {getLetters, getTime, getDate, computeSpeed, computeAccuracy, statsLetters}
