import {LANGUAGE, NBLETTERS} from "./actions.js"

const langAllowed = ["us", "fr"]

const defaultState = {
    lang : "fr",
    nbLetters : 60,
}

export const changeLangReducer = (state = defaultState, action) => {
    if (action.type === LANGUAGE){}
    else{return state}

    switch (action.payload) {
        case "fr":
            return {...state, lang : "fr"}
        case "us":
            return {...state, lang : "us"}
        default:
            return {...state, lang : "fr"}

    }
}

export const changeNbLettersReducer = (state = defaultState, action) => {
    if (action.type === NBLETTERS){}
    else{return state}

    switch (action.payload) {
        case 40:
            return {...state, nbLetters : 40}
        case 60:
            return {...state, nbLetters : 60}
        case 120:
            return {...state, nbLetters : 120}
        case 240:
            return {...state, nbLetters : 240}
        default:
            return {...state, nbLetters : 60}

    }
}
