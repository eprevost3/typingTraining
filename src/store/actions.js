const nbLettersAllowed = [40, 60, 120, 240]
const langAllowed = ["fr", "us"]

export const LANGUAGE = "LANGUAGE"
export const NBLETTERS = "NBLETTERS"

export const changeLang = (lang) => {
    if (!langAllowed.includes(lang)){
        throw new Error(`Language not allowed. Pick one of the following languages: ${langAllowed}`)
    }else{
        return {type : LANGUAGE, payload : lang,}
    }
}

export const changeNbLetters = (nbLetters) => {
    if (!nbLettersAllowed.includes(nbLetters)){
        throw new Error(`Wrong number of letters allowed. Pick one of the following: ${nbLettersAllowed}`);
    }else{
        return {type : NBLETTERS, payload : nbLetters,}
    }
}
