//const _ = require('lodash')
const db = require('quick.db')

module.exports = bot => {
    bot.pages = (arr, itemsPerPage, page = 1) => {
        const maxPages = Math.ceil(arr.length / itemsPerPage);
        if(page < 1 || page > maxPages) return null;
        return arr.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }
    
    /**
     * @param key the key in the database
     * @param defaultVal default value if none found
     */
    bot.ensure = (key, defaultVal = null) => {
        if (!defaultVal) throw new Error('Cant ensure property without default value')
        if (!db.get(key)) db.set(key, defaultVal)
        return db.get(key)
    }

    /**
     * turns array into chunks, ex/
     * _.chunk([1, 2, 3, 4, 5], 2) -> [[1, 2], [3, 4], [5]]
     */
    //pages(arr, per, page = 1) {
    //    if (!_.chunk(arr, per)[page]) return null
    //    return _.chunk(arr, per)[page]
    //}
}