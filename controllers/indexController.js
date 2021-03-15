const randomData = require('../models/random-data');
const CronJob = require('cron').CronJob;

/** Global charactor to generate string, it helps to customize string char */
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const type = ['type1', 'type2', 'type3'];

/**
 * INFO: Api to get/serch/sort data which was created every second by cron
 * @param {string} query
 * @param {string} sort_by
 * @param {string} sorting_order
 */
const index = async (req, res) => {
    try {
        let { query, sort_by, sorting_order, page, count } = req.query, queryString = {}, sortBy = {};
        page = page ? Number(page) : 0;
        count = count ? Number(count) : 20;

        if (query) {
            query = new RegExp(query, 'i');
            const tempQuery = { $or: [{ 'string': query }, { 'type': query }] };
            queryString = { ...queryString, ...tempQuery };
        }

        sortBy['created_at'] = -1;
        sorting_order = sorting_order ? (sorting_order.toLowerCase() == "asc" ? 1 : (sorting_order.toLowerCase() == "desc" ? -1 : null)) : null;
        if (sort_by && sorting_order) {
            sortBy[sort_by] = sorting_order;
        } else if (sort_by) {
            sortBy[sort_by] = -1;
        }
        const result = await randomData.find(queryString).sort(sortBy).skip(page * count).limit(count).lean().exec();
        const AllDocument = await randomData.countDocuments();
        res.status(200).json({ success: true, data: result, TotalResult: AllDocument })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong!' })
    }
}


/**
 * INFO: Function to create random string b/w 5 to 50 char
 */
const randomString = (length) => {
    let str = '';
    const randomLength = Math.floor(Math.random() * 46) + 5; 
    while (length--) str += chars[Math.floor(Math.random() * randomLength)];
    return str;
}

/**
 * INFO: Function to get random type
 */
const randTypeValue = (type) => {
    const index = Math.floor(Math.random() * type.length);
    return type[index] || 'type1';
}

/**
 * INFO: Function to get random type
 */
const saveRandomdata = () => {
    const random = new randomData({
        string: randomString(50),
        type: randTypeValue(type),
        created_at: new Date()
    })
    global.io.emit(process.env.EMITTED_CHANNEL, random);
    random.save();
    return true
}


/**
 * INFO: A process that create entry in random-data collection every second
 */
const startCronjob = async function () {
    new CronJob(process.env.FREQUENCY_CRON, async () => {
        saveRandomdata();
    }, null, true)
}

module.exports = {
    type,
    chars,
    randomString,
    randTypeValue,
    saveRandomdata,
    index,
    startCronjob
}