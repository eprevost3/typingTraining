import React from "react"
import './App.css';
import LeftPart from "./leftPart/LeftPart.js"
import Options from "./options/Options.js"
import Storage from "./storage.js"
import IndexedDB from "./indexedDB.js"
import {Provider} from "react-redux"
import {createStore, combineReducers} from "redux"
import {changeLangReducer, changeNbLettersReducer} from "./store/reducers.js"

const rootReducer = combineReducers(
    {
        changeLangReducer,
        changeNbLettersReducer,
    }
)
const store = createStore(rootReducer)


class App extends React.Component{
    constructor(props){
        super(props)
        this.storage = new Storage()
        this.indexedDB = new IndexedDB()
    }


    render(){
        return (
            <Provider store={store}>
                <div className="App">
                    <LeftPart storage={this.storage}
                              indexedDB={this.indexedDB}/>
                    <Options/>
                </div>
            </Provider>
        );
    }
}

export default App;


// changer la manière dont on calcule la durée de frappe
// faire un guerrier statistque qui donne que les letters qu'on tape mal
// gérer la manière dont on active les cases pour taper
