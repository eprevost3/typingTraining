import React from "react"
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import {changeLang} from "../store/actions.js"
import imgFrench from "../img/Fr_flag.jpg"
import imgUS from "../img/US_flag.jpg"
import TRANSLATIONS from "../translations.js"


class Language extends React.Component{

    render(){
        var lang = this.props.lang
        return(
            <div id="language">
                <div id="textLang">{TRANSLATIONS[lang].selectLang}</div>
                <div id="flags">
                    <img className="imgLang"
                         src={imgFrench}
                         alt="France"
                         onClick={() => this.props.dispatch(changeLang("fr"))}
                         title={TRANSLATIONS[lang].titleFlag}/>
                    <img className="imgLang"
                         src={imgUS}
                         alt="USA"
                         onClick={() => this.props.dispatch(changeLang("us"))}
                         title={TRANSLATIONS[lang].titleFlag}/>
                </div>
                <div className="paddingLang"/>
            </div>
        )
    }
}

Language.propTypes = {
    lang : PropTypes.string.isRequired,
    dispatch : PropTypes.func.isRequired,
}

var mapStateToProps = state => ({lang : state.changeLangReducer.lang})

export default connect(mapStateToProps)(Language)
