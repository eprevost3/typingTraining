import Dexie from 'dexie';

const dbVersion = 1

export const db = new Dexie('stats');
db.version(dbVersion).stores({
  "statisticsTable": '++key, value', // Primary key and indexed props
});


class IndexedDB {
    // add the result of the typing to the database
    addRes = async (performances) => {
        try {
            // Add the new performances
            const id = await db.statisticsTable.add(
                {
                    date : performances.date,
                    totLetters : performances.totLetters,
                    countPerLetter : performances.countPerLetter,
                    totErrors : performances.totErrors,
                    errorsPerLetter : performances.errorsPerLetter,
                    duration : performances.duration,
                    wpm : performances.wpm,
                    accuracy : performances.accuracy,
                }
            )
        } catch (error) {console.error(error);}

    }

    // returns all the data so that it can be plotted
    getAllData = async (nbLetters) => {
        let allData = []

        const rawData = await db.table("statisticsTable").toArray()

        for (let key in rawData){
            let elt = rawData[key]

            // if the number of letters does not correspond to what the
            //user want to see: move on to the next item
            if (elt.totLetters !== nbLetters){continue}
            else {}

            let processedElt = {}
            processedElt["key"] = key
            processedElt["date"] = elt.date
            processedElt["wpm"] = elt.wpm
            processedElt["accuracy"] = elt.accuracy

            allData.push(processedElt)
        }

        return allData
    }

}
export default IndexedDB
