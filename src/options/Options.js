import React from "react"
import PropTypes from "prop-types"
import "./Options.css"
import Language from "./Language.js"
import LetterGenerationLogic from "./LetterGenerationLogic.js"
import NbLetters from "./NbLetters.js"


class Options extends React.Component{
    render(){
        return(
            <div id="options">
                <Language/>
                <LetterGenerationLogic/>
                <NbLetters/>
            </div>
        )
    }

}

export default Options
