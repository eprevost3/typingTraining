import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import "./PlotBox.css"
import Graphs from "./Graphs.js"
import upDown from "../../img/upDown.png"
import TRANSLATIONS from "../../translations.js"


// part containing the dropdown to show or not the graphs
const UpDown = ({onClick, lang, directionImage}) => {
    return(
        <div id="upDownPlot" onClick={onClick}>
            <div>{TRANSLATIONS[lang].graphes}</div>


            <img id="upDownImg"
                 className={directionImage}
                 src={upDown}
                 alt="up-down image"
                 title={TRANSLATIONS[lang].clickUpDown}/>
        </div>
    )
}

UpDown.propTypes = {
    onClick : PropTypes.func.isRequired,
    lang : PropTypes.string.isRequired,
    directionImage : PropTypes.string.isRequired,
}


// empty container to replace the space occupied by the graphs when they are
// not displayed
const EmptyGraph = () => (<div id="emptyGraph"/>)

// part containing all the plots
class PlotBox extends React.Component{
    constructor(props){
        super(props)

        // display or not the graphs
        this.state = {displayGraphs : false}
    }

    // modifies the state to display or not the graphs
    onClick = () => {
        let newState
        if (this.state.displayGraphs){
            newState = {displayGraphs : false}
        }else{
            newState = {displayGraphs : true}
        }
        this.setState(newState)
    }

    render(){
        if (this.state.displayGraphs){
            return(
                <div id="plotBox">
                    <UpDown onClick={this.onClick}
                            lang={this.props.lang}
                            directionImage="goDown"/>
                    <Graphs indexedDB={this.props.indexedDB}/>
                </div>
            )
        }else{
            return(
                <div id="plotBox">
                    <UpDown onClick={this.onClick}
                            lang={this.props.lang}
                            directionImage="goUp"/>
                    <EmptyGraph/>
                </div>
            )
        }
    }
}


PlotBox.propTypes = {
    lang : PropTypes.string.isRequired,
    indexedDB : PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({lang : state.changeLangReducer.lang})
export default connect(mapStateToProps)(PlotBox)
