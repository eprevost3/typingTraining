import TRANSLATIONS from "../../translations.js"
import PropTypes from "prop-types"
import {connect} from "react-redux"


// display the performances of the user: accuracy, speed etc...
const Performance = ({speed, accuracy, todayBestScore, lang, dispatch}) => {
    // lang is accessible as we use the connect()
    return(
        <div id="performance">
            <div>{TRANSLATIONS[lang].speed}{speed}{TRANSLATIONS[lang].wpm}</div>
            <div>{TRANSLATIONS[lang].accuracy}{accuracy}%</div>
            <div>{TRANSLATIONS[lang].todayBestScore}{todayBestScore}{TRANSLATIONS[lang].wpm}</div>
        </div>
    )
}

Performance.propTypes = {
    speed : PropTypes.number.isRequired,
    accuracy : PropTypes.number.isRequired,
    todayBestScore : PropTypes.number.isRequired,
    lang : PropTypes.string.isRequired,
    dispatch : PropTypes.func.isRequired,
}


var mapStateToProps = state => ({lang : state.changeLangReducer.lang})

export default connect(mapStateToProps)(Performance)
