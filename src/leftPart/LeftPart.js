import React from "react"
import "./LeftPart.css"
import PropTypes from "prop-types"
import TypingZone from "./typingZone/TypingZone.js"
import PlotBox from "./plotBox/PlotBox.js"


// use those blocks to pad and produce a more beautiful layout
const Padding = () => {
    return(
        <div className="padding">
        </div>
    )
}


class LeftPart extends React.Component{

    render(){
        return(
            <div id="leftpart">
                <Padding/>
                <TypingZone storage={this.props.storage}
                            indexedDB={this.props.indexedDB}/>
                <Padding/>
                <PlotBox indexedDB={this.props.indexedDB}/>
            </div>
        )
    }
}

LeftPart.propTypes = {
    storage : PropTypes.object.isRequired,
    indexedDB : PropTypes.object.isRequired,
}

export default LeftPart
