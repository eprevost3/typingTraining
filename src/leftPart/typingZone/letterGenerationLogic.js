
const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h",
                 "i", "j", "k", "l", "m", "n", "o", "p",
                 "q", "r", "s", "t", "u", "v", "w", "x",
                 "y", "z"]

function getRandomInt(lenList) {
    return Math.floor(Math.random() * lenList)
}

// logic to generate the letters to type
export function letterGeneration(nbLetters, lettersExcluded = []){
    //when the game starts, some letter blocks are filled with null
    // values. Those blocks will be filled later on with the
    // letters that have already been typed
    var letters = [undefined, undefined, undefined, undefined, undefined, undefined]

    // remove the letters the user has specified not to use
    var allowedLetters = LETTERS.filter((x) => (lettersExcluded.indexOf(x) < 0))

    var n = allowedLetters.length, totLetters = 0
    // sample the letters using a uniform density function
    while (totLetters < nbLetters){
        var count = 0

        // letters are grouped by 5
        while(totLetters < nbLetters & count < 5){
            var i = getRandomInt(n)

            letters.push(allowedLetters[i])
            count += 1
            totLetters += 1
        }

        letters.push("␣")
    }

    // the last character is a space. Removing it
    return letters.slice(0, -1)
}
