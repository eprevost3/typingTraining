import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {changeNbLetters} from "../store/actions.js"
import TRANSLATIONS from "../translations.js"
import "./NbLetters.css"


class Dropdown extends React.Component{
    onChange = (evt) => {
        this.props.dispatch(changeNbLetters(Number(evt.target.value)))
    }

    render(){
        return (
            <select id="dropdown" onChange={this.onChange} defaultValue={this.props.currNbLetters}>
                {[40, 60, 120, 240].map((option, idx) =>
                    (<option key={idx} value={option}>{option}</option>)
                )}
            </select>
        )
    }
}


// constraints on the props
Dropdown.propTypes = {
    currNbLetters : PropTypes.number.isRequired,
    dispatch : PropTypes.func.isRequired,
}



// select the number of letters the user has to type
class NbLetters extends React.Component{

    render(){
        var lang = this.props.lang
        var nbLetters = this.props.nbLetters

        return(
            <div id="nbLetters">
                <div id="textNbLetters">{TRANSLATIONS[lang].chooseNbLetters}</div>
                <Dropdown currNbLetters={nbLetters}/>
                <div id="paddingNbLetters"/>
            </div>
        )
    }
}

NbLetters.propTypes = {
    lang : PropTypes.string.isRequired,
    nbLetters : PropTypes.number.isRequired,
}


var mapStateToProps = state => ({lang : state.changeLangReducer.lang,
                                 nbLetters : state.changeNbLettersReducer.nbLetters})

Dropdown = connect(mapStateToProps)(Dropdown)

export default connect(mapStateToProps)(NbLetters)
