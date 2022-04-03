import {getLetters, getTime} from "./helpers.js"


test("Get 1 letters", () => {
    let output = getLetters(1)
    expect(output.length).toBe(7)
})

test("Get 15 letters", () => {
    let output = getLetters(15)
    expect(output.length).toBe(23)
})


test("Time in seconds", () => {
    let output = getTime()
    expect(typeof(output)).toBe("number")
})
