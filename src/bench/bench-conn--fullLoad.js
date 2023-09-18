// import fetch from 'node-fetch';






// -----------------------------------------------------------------
var globalVarTaskRunning = {};
// NOTE: - - global-var[tasks]
var runningTasks = [];



// NOTE: global-var[database]
// var dbInMem = {};
var dbInMem = {
    dataLast: [],
    memDB_oneRow: '',
    counter: 0,
};


// NOTE: global-var[status]
var classStatus = {
    runningStatus: true,
}

// -----------------------------------------------------------------
// NOTE: - - wait console-key
const waitConsoleKey = async function () {
    // handle key
    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (key) {
        console.log(toUnicode(key), key); //Gives you the unicode of the pressed key
        if (key == '\u007A') {
            classStatus.runningStatus = false;
            process.stdin.destroy();
        }    // z
        if (key == '\u0003') { process.exit(); }    // ctrl-c
    });

    function toUnicode(theString) {
        var unicodeString = '';
        for (var i = 0; i < theString.length; i++) {
            var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
            while (theUnicode.length < 4) {
                theUnicode = '0' + theUnicode;
            }
            theUnicode = '\\u' + theUnicode;
            unicodeString += theUnicode;
        }
        return unicodeString;
    }

    let errResult = false;
    errResult = 'Fn: waitConsoleKey';
    return errResult;
}
// -----------------------------------------------------------------
// NOTE: - - task refresh
const refreshTasks_1s = function () {
    // print: counter
    console.log('1s-counter: ', dbInMem.counter);
    // reset: counter
    dbInMem.counter = 0;
    // reset: memDB_oneRow
    dbInMem.memDB_oneRow = '';
}
const taskUpdating_1s_refreshing = async function (currentTimeSec) {

    // TODO: refresh 1s-list
    if (
        // (currentTimeSec % 30) == 29
        true
    ) {
        refreshTasks_1s()
    }


    return true;
}

const taskUpdating = async function () {
    // -----
    // DEBUG: taskUpdating
    let lastTimeMinute = 66;
    let lastTimeSec = 66;
    while (classStatus.runningStatus === true) {

        const currentTimeSec = (new Date()).getUTCSeconds();
        const currentTimeMinute = (new Date()).getUTCMinutes();

        // validate--refresh-time
        // wait until--next-sec
        if (currentTimeMinute == lastTimeMinute) {
            if (currentTimeSec == lastTimeSec) {
                // --next
                const sleepTimeMs = 20;
                await new Promise(r => setTimeout(r, sleepTimeMs));
                continue;
            } else {
                lastTimeSec = currentTimeSec;
            }
        } else {
            lastTimeMinute = currentTimeMinute;
        }
        // 1s-refresh
        await taskUpdating_1s_refreshing(currentTimeSec);
    }
    console.log('taskUpdating: ending--loop');

    let errResult = false;
    // errResult = 'Fn: taskUpdating';
    return errResult;
}

// -----------------------------------------------------------------
// NOTE: fetch Data
const fetchAndRetry = async function ({ url, customOptions }) {
    // const numRetryLimit = 1;
    // let numRetryCounter = 1;
    // TODO: retry-errFetch
    // https://stackoverflow.com/questions/44342226/next-js-error-only-absolute-urls-are-supported
    const absoluteURL = url;
    const absoluteOptions = customOptions;
    const res = await fetch(absoluteURL, absoluteOptions).catch(function (err) {
        console.error(err);
        return false;
    });
    // return { res, numRetryCounter };
    return res;
}

// -----------------------------------------------------------------
// NOTE: - - pool connect
const poolConn = async function ({ conn_i, options, url, key, }) {
    // --wait stop-key
    while (classStatus.runningStatus === true) {



        // NOTE: customOptions
        const customOptions = options


        // fetchAndRetry until [max | hasResult]
        let retryCounter = 0;
        let res = false;

        // let req_at = 0;
        let res_at = 0;
        let timeUsed = 0;
        const req_at = Date.now();
        res = await fetchAndRetry({ customOptions, url });
        res_at = Date.now();
        timeUsed = res_at - req_at;


        // TODO: handle after - many-err
        if (res === false) {
            // TODO: log-err after-retry
            console.log('err::: still-err after-retry many-times.');
            continue;
        }


        // NOTE: save(mem) 
        const resText = await res.text();
        // TODO: text oneRow_TSV

        // TODO: check is_same-res
        if (dbInMem.memDB_oneRow === '') {
            dbInMem.memDB_oneRow = "\n" + resText
        }
        // const is_same = xxx;


        dbInMem.counter += 1;
    }

    // const report = `number of conn-${conn_i}: ${fetchCounter}, ${errFetchCounter}`
    // return report;
    return true;
}


// // -----------------------------------------------------------------
// // NOTE: - - save lowDB
// const saveData_inMem = function ({ result, section_time, }) {
//     const sectionMemData = JSON.parse(JSON.stringify(result))
//     const sectionMemTime = section_time;

//     // check-null
//     if (typeof dbInMem[sectionMemTime + ''] == 'undefined') {
//         dbInMem[sectionMemTime + ''] = [];
//     }

//     dbInMem[sectionMemTime + ''].push(sectionMemData);

//     return true;
// }

// var filename_id = 0;
// var lastSaveDataHr = 0;


// -----------------------------------------------------------------
// NOTE: - - Main
// export async function main() {
async function main() {

    // ---------------------
    // run-concurrent(paralet http-client)
    const doingTasks = [];
    // handle console-key
    // doingTasks.push(waitConsoleKey());
    // taskUpdating
    doingTasks.push(taskUpdating());

    // conn
    const numConn = 2;
    // const numConn = 32;
    // const url = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    const url = 'https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5000';
    const options = {
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    }
    for (let i = 0; i < numConn; i++) {
        doingTasks.push(
            poolConn({ conn_i: i, options, url, })
        )
    }

    // --wait-doingTasks - promiseAll =>[waitKey, refresh, runningConn[n],]
    const errReport = await Promise.all(doingTasks).catch(function (err) {
        console.error(err);
        // return false;
    });


    console.log('Exit.');
    // process.exit();
    return errReport.filter((result) => (result !== false));
};

main().catch()