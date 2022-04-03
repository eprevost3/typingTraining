import {changeLangReducer, changeNbLettersReducer} from "./reducers.js"

test("Providing the incorrect action", () => {
    let badAction = {type : "BAD"}
    let state = {state : 1234}
    expect(changeLangReducer(state, badAction)).toBe(state)
})


test("Check can change lang to American", () => {
    let state = {test : 1234}
    let action = {type : "LANGUAGE", payload : "us"}
    expect(changeLangReducer(state, action)).toEqual({lang : "us", test : 1234})
})

test("Check default state returned", () => {
    let state = {test : 1234}
    let action = {type : "LANGUAGE", payload : "bad"}
    expect(changeLangReducer(state, action)).toEqual({lang : "fr", test : 1234})

})


test("Providing the incorrect action", () => {
    let badAction = {type : "BAD"}
    let state = {state : 1234}
    expect(changeNbLettersReducer(state, badAction)).toBe(state)
})


test("Check can change the number of letters", () => {
    let state = {test : 1234}
    let action = {type : "NBLETTERS", payload : 240}
    expect(changeNbLettersReducer(state, action)).toEqual({nbLetters : 240, test : 1234})
})

test("Check default state returned", () => {
    let state = {test : 1234}
    let action = {type : "NBLETTERS", payload : "bad"}
    expect(changeNbLettersReducer(state, action)).toEqual({nbLetters : 60, test : 1234})
})
