import React from "react"
import PropTypes from "prop-types"
import "./Graphs.css"
import {LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend} from "recharts"
import TRANSLATIONS from "../../translations.js"


const Numbers = ({val, idx, isActive, onClick}) => {

    if (isActive){
        return(<div className="number active"
                    onClick={() => onClick(idx)}>{val}</div>)
    }else{
        return(<div className="number"
                    onClick={() => onClick(idx)}>{val}</div>)
    }

}

Numbers.propTypes = {
    val : PropTypes.number.isRequired,
    idx : PropTypes.number.isRequired,
    isActive : PropTypes.bool.isRequired,
    onClick : PropTypes.func.isRequired,
}


class Graphs extends React.Component{
    constructor(props){
        super(props)

        this.options = [40, 60, 120, 240]
        this.state = {tabs : {0 : true, 1 : false, 2 : false, 3 : false},
                      nbLetters : 40,
                      data : []}
    }

    // when we click on the number, display the graph for this number
    onClick = (idx) => {
        let newTabs = {}
        // set all the tabs to false
        for (var key in this.state.tabs){newTabs[key] = false}

        // set the tab to display to true
        newTabs[idx] = true
        let nbLetters = this.options[idx]
        this.setState({tabs : newTabs, nbLetters : nbLetters,})
    }

    // fetching the data from the indexedDB asynchronously
    // thus rendering the component and then collecting the data
    componentDidUpdate(){
        this.props.indexedDB.getAllData(this.state.nbLetters)
            .then((data) => {
                // check if the update has already been done. If it has, then
                // no need to update again. The keys of the dic are unique, so the
                // comparison should always work
                if (JSON.stringify(this.state.data) !== JSON.stringify(data)){
                    this.setState({data : data});
                }else{}
            })
            .catch((err) => console.error(err))
    }

    // displaying when the component is rendered for the first time
    componentDidMount(){
        this.props.indexedDB.getAllData(this.state.nbLetters)
            .then((data) => {this.setState({data : data})})
            .catch((err) => console.error(err))
    }


    render(){
        return(
            <div id="graphs">
                <div id="headerGraph">
                    {this.options.map((val, idx) =>
                        (<Numbers key={idx}
                                  idx={idx}
                                  val={val}
                                  onClick={this.onClick}
                                  isActive={this.state.tabs[idx]}/>)
                    )}
                </div>

                <div id="plotGraph">
                    <ResponsiveContainer height='90%' width='90%'>
                        <LineChart id="lineChart" data={this.state.data}>
                            <Tooltip/>
                            <Line type="monotone" dataKey="wpm" stroke="black"/>
                            <Line type="monotone" dataKey="accuracy" stroke="green"/>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Legend/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

}

Graphs.propTypes = {
    indexedDB : PropTypes.object.isRequired,
}


export default Graphs
