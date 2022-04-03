import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import "./TypingZone.css"
import {getLetters, getTime, getDate, computeSpeed, computeAccuracy, statsLetters} from "./helpers.js"
import Performance from "./Performance.js"
import TRANSLATIONS from "../../translations.js"

// the letter to type is not the first one in the box:
// we want the active later to be one in the middle, so that the user can
// see the letters he already typed
var OFFSET = 6

const LetterBox = ({letter, status, idx}) => {
    // letter to type
    if (idx === OFFSET){
        return(<div id="totype" className="letterBox grey">{letter}</div>)
    }
    // the letter either has not been typed, or has been typed correctly
    else if (status === undefined){
        // the first "letters" are undefined values to pad at the beginning.
        // making sure they are not displayed
        if(letter === undefined){
            return(<div className="letterBox">{letter}</div>)
        }else{
            return(<div className="letterBox success grey">{letter}</div>)
        }
    }
    // the user mistyped the letter
    else{
        return(<div className="letterBox failure grey">{letter}</div>)
    }
}

// use those blocks to pad and produce a more beautiful layout
const Padding = () => {
    return(
        <div className="padding">
        </div>
    )
}

LetterBox.propTypes = {
    letter : PropTypes.string,
    status : PropTypes.string,
    idx : PropTypes.number.isRequired,
}



class TypingZone extends React.Component{
    constructor(props){
        super(props)

        // indicates which letters are being displayed first
        this.defaultStartEnd = {
            start : 0,
            end : 38,
        }

        // indexes of the letters we are currently displaying
        this.state = {...this.defaultStartEnd, active : true}

        this.initializeAttributes()

    }

    initializeAttributes = () => {
        // start time when the user started typing
        this.startTime = undefined

        // number of letters to type
        this.nbLetters = this.props.nbLetters
        this.letters = getLetters(this.nbLetters)


        this.setState({...this.defaultStartEnd, active : true})
    }


    handleClick = () => {
        // de activating the typing mode
        if (this.state.active){
            this.setState({active : !this.state.active})
        }else{
            // the typing mode is active again, but we do need to reinitialize everything
            this.initializeAttributes()
        }

    }


    handleKeyPress = (e) => {
        // the key typed is not correct
        var idx = this.state["start"] + OFFSET // first letters are undefined, we don't care about them


        // correct key typed
        if((e.key === this.letters[idx].letter) ||
           ((e.key === " ") && (this.letters[idx].letter === "␣"))){
            // set up the start time. this is the time when a key is successfully typed
            this.startTime = this.startTime ? this.startTime : getTime()

            this.setState((prevState) => (
                {
                start : prevState.start + 1,
                end : prevState.end + 1,
                }
            ))

            // check if all the letters have been typed
            if (idx + 1 === this.letters.length){
                // game is done, displaying a new game
                this.reset()
            }else{}
        }
        // the key typed is incorrect
        else {
            this.letters[idx]['status'] = "failure"
        }

    }

    reset = () => {
        let [speed, duration] = computeSpeed(this.startTime, this.nbLetters)
        let [count, countErrors, totErrors] = statsLetters(this.letters)
        let accuracy = computeAccuracy(this.letters)

        // update the storage with the new performances
        this.props.storage.updatePerformances(speed, accuracy)

        // udpate the indexedDB with more detailed data
        this.props.indexedDB.addRes({
            date : getDate(),
            totLetters : this.nbLetters,
            countPerLetter : count,
            totErrors : totErrors,
            errorsPerLetter : countErrors,
            duration : duration,
            wpm : this.props.storage.getSpeed(),
            accuracy : this.props.storage.getAccuracy(),
        })

        // reset attributes
        this.initializeAttributes()
    }

    componentDidMount = () => {
        document.addEventListener("keypress", this.handleKeyPress)
        let typingZone = document.getElementById("typingzone")
        typingZone.addEventListener("click", this.handleClick)
    }


    // remove the event listener, to free up some memory but also
    // as the component are rendered several times, we want to
    // avoid creating several same event listeners
    // https://www.pluralsight.com/guides/how-to-cleanup-event-listeners-react
    componentWillUnmount = () => {
        document.removeEventListener("keypress", this.handleKeyPress)
        let typingZone = document.getElementById("typingzone")
        typingZone.removeEventListener("click", this.handleClick)
    }

    // when the number of letters is updated, we have to call the initialization
    // again
    componentDidUpdate(){
        if (this.props.nbLetters !== this.nbLetters){
            this.initializeAttributes()
        }else{}
    }


    render(){
        // check if the serie of letters can be displayed or not. When the user
        // clicks in the box, it de-activates the typing mode and the letters are hidden
        let letters
        if (this.state.active){
            letters = this.letters.slice(this.state["start"], this.state["end"] + 1).map((elt, idx) => (
                                         <LetterBox letter={elt.letter}
                                                    status={elt.status}
                                                    key={idx}
                                                    idx={idx}/>
                                    ))
        }else{
            letters = <div id="clickToActivate">
                            {TRANSLATIONS[this.props.lang].clickToActivate}
                      </div>
        }

        return(
            <div id="typingzone">

                <Performance speed={this.props.storage.getSpeed()}
                             accuracy={this.props.storage.getAccuracy()}
                             todayBestScore={this.props.storage.getTodayBestScore()}/>
                <Padding/>
                 <div id="letterZone">
                     {letters}
                 </div>
                <Padding/>
            </div>
        )
    }
}

TypingZone.propTypes = {
    nbLetters : PropTypes.number.isRequired,
    lang : PropTypes.string.isRequired,
    storage : PropTypes.object.isRequired,
    indexedDB : PropTypes.object.isRequired,
}


const mapStateToProps = state => ({lang : state.changeLangReducer.lang,nbLetters : state.changeNbLettersReducer.nbLetters,})

export default connect(mapStateToProps)(TypingZone)
