import {changeLang, changeNbLetters} from "./actions.js"

test("Check the language change with wrong input", () => {
    expect(() => changeLang("brrrr")).toThrowError()
})

test("Check the language change with correct input", () => {
    expect(changeLang("us")).toEqual({type : "LANGUAGE", payload : "us"})
})

test("Change the number of letter change fails with wrong input", () => {
    expect(() => changeNbLetters(32)).toThrowError()
})

test("Check the payload is correct", () => {
    expect(changeNbLetters(240)).toEqual({type : "NBLETTERS", payload : 240})
})
