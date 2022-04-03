// storage of the user performance
class Storage {
    constructor(){
        // variables updated later in some functions
        this.speed = undefined
        this.accuracy = undefined
        this.todayBestScore = undefined

        this.retrievePerformanceDay()

    }

    #getDate(){
        var currDate = new Date()

        var year = currDate.getFullYear()
        var month = currDate.getMonth() + 1
        var day = currDate.getDate()

        var date = `${year}-${month}-${day}`
        return date
    }

    // create a key in the local storage to store
    // the daily performances
    #createEntryLocalStorage = (locStorage, date) => {
        let data = {
            "speed" : "N/A",
            "accuracy" : "N/A",
            "todayBestScore" : "N/A",
        }
        locStorage.setItem(date, JSON.stringify(data))

        return data
    }

    getSpeed = () => (Number(this.speed))
    getAccuracy = () => (Number(this.accuracy))
    getTodayBestScore = () => (Number(this.todayBestScore))


    // when a user first comes on the page, search
    // in the data stored if the user has already
    // generated some performances this day
    retrievePerformanceDay = () => {
        var date = this.#getDate()

        var locStorage = window.localStorage

        // no games have been played today
        let data
        if (!locStorage.getItem(date)){
            data = this.#createEntryLocalStorage(locStorage, date)
        }else{
            data = locStorage.getItem(date)
            data = JSON.parse(data)
        }

        this.speed = data["speed"]
        this.accuracy = data["accuracy"]
        this.todayBestScore =  data["todayBestScore"]
    }

    // once the user is done typing one serie of
    // letters, update the performance displayed
    updatePerformances = (speed, accuracy) => {
        var date = this.#getDate()

        var locStorage = window.localStorage

        // making sure that there is a key in the dictionary to host the data
        // this condition is there to avoid issues that may arise when the tab is not refreshed for days
        let data
        if (date in locStorage){
            data = locStorage.getItem(date)
            data = JSON.parse(data)
        }
        else{data = this.#createEntryLocalStorage(locStorage, date)}

        data.speed = Math.round(speed)
        data.accuracy = accuracy.toPrecision(3)

        // best score of the day. At the beginning it may be a string so
        // we have to do some further processing
        if (typeof(this.todayBestScore) === "string"){
            data.todayBestScore = Math.round(speed)
        }else{
            data.todayBestScore = data.todayBestScore < speed ? speed : data.todayBestScore
            data.todayBestScore = Math.round(data.todayBestScore)
        }

        locStorage.setItem(date, JSON.stringify(data))

        // update the attributes
        this.speed = data["speed"]
        this.accuracy = data["accuracy"]
        this.todayBestScore =  data["todayBestScore"]

    }

}

export default Storage
