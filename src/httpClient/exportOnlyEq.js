import fetch from 'node-fetch';

// import modelSleepLevel from '../models/modelSleepLevel.js';
import libFileDB from '../fileDB/libFileDB.js';


// -----------------------------------------------------------------
// NOTE: - - shared-data(web-socket)
var globalVarShareNodeData = {};
// var allTasks = [];
// var todoTasks = [];
var todoTasks = [
    // can multiple same-server-level 
    {
        serverID: 1,
        titleLevel: '5s',
        timeStepMs: 5000,
        tasks: [],
    },
    // {
    //     serverID: 1,
    //     titleLevel: '5s',
    //     timeStepMs: 5000,
    //     tasks: [],
    // },
    {
        serverID: 2,
        titleLevel: '30s',
        timeStepMs: (30 * 1000),
        tasks: [],
    },
    // {
    //     serverID: 2,
    //     titleLevel: '30s',
    //     timeStepMs: (30 * 1000),
    //     tasks: [],
    // },
    // {
    //     serverID: 2,
    //     titleLevel: '30s',
    //     timeStepMs: (30 * 1000),
    //     tasks: [],
    // },
    {
        serverID: 3,
        titleLevel: '15m',
        timeStepMs: (15 * 60 * 1000),
        tasks: [],
    },
];

var runningTasks = [];

// var errTasks = [];
var sectionTasks_time = 0 + '';

// NOTE: global-var[database]
var dbInMem = {};

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
// NOTE: fetch Data
const fetchAndRetry = async function ({ url, customOptions }) {
    const numRetryLimit = 1;
    let numRetryCounter = 1;
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
    let fetchCounter = 0;
    let errFetchCounter = 0;

    // --wait stop-key
    while (classStatus.runningStatus === true) {
        // NOTE: no-runningTasks
        if (runningTasks.length < 1) {
            // NOTE: sleep wait - next-refresh
            const sleepTimeMs = 1000;
            await new Promise(r => setTimeout(r, sleepTimeMs));
            continue;
        }

        // NOTE: run-runningTasks
        const popSymbol = runningTasks.pop();

        // --check [symbol - not defined]
        if (typeof popSymbol == 'undefined') {
            // NOTE: err when parallel--same-pop
            continue;
        }

        // NOTE: customOptions
        const symbolKey = `symbol=${popSymbol}&key=${key}`;
        const customOptions = {
            headers: options.headers,
            method: options.method,
            body: symbolKey,
        }

        // fetchAndRetry until [max | hasResult]
        let retryCounter = 0;
        let res = false;
        // let req_at = 0;
        let res_at = 0;

        let timeUsed = 0;
        while (retryCounter < 3) {
            retryCounter++;
            fetchCounter++;
            // req_at = Date.now();
            const req_at = Date.now();
            res = await fetchAndRetry({ customOptions, url });
            // {res, numRetryCounter} = await fetchAndRetry({ customOptions, url });
            // { res } = await fetchAndRetry({ customOptions, url });
            res_at = Date.now();
            timeUsed = res_at - req_at;
            if (res === false) {
                errFetchCounter++;
            } else {
                break;
            }
        }
        // TODO: handle after - many-err
        if (res === false) {
            // TODO: log-err after-retry
            console.log('err::: still-err after-retry many-times.');
            continue;
        }

        // TODO: STOP after(token-EXP)

        // TODO: check is_same-res
        const is_same = false;


        // NOTE: save(mem) 
        const resText = await res.text();
        // const resJson = await res.json();
        // const arrData = {
        //     arrData: [
        //         resJson.avg,
        //         resJson.avgbuy,
        //         resJson.avgsell,
        //         resJson.bo,
        //         resJson.bov,
        //         resJson.bsp,
        //         resJson.bsv,
        //         resJson.buyNumberOfExeList,
        //         resJson.buyTotalVolumn,
        //         resJson.buyVolumnList,
        //         resJson.ceil,
        //         resJson.chg,
        //         resJson.close,
        //         resJson.cur,
        //         resJson.d5,
        //         resJson.dy,
        //         resJson.eps,
        //         resJson.floor,
        //         resJson.high,
        //         resJson.industryname,
        //         resJson.language,
        //         resJson.last,
        //         resJson.low,
        //         resJson.marketbarBuy,
        //         resJson.marketbarNonSide,
        //         resJson.marketbarSell,
        //         resJson.mkt,
        //         resJson.mktlabel,
        //         resJson.mktstatus,
        //         resJson.name,
        //         resJson.nonSideNumberOfExeList,
        //         resJson.nonSideTotalVolumn,
        //         resJson.nonSideVolumnList,
        //         resJson.open,
        //         resJson.open2,
        //         resJson.openopen,
        //         resJson.openopendata,
        //         resJson.par,
        //         resJson.pbuy,
        //         resJson.pbv,
        //         resJson.pchg,
        //         resJson.pe,
        //         resJson.percentBuyVolumn,
        //         resJson.percentNonSideVolumn,
        //         resJson.percentSellVolumn,
        //         resJson.pnonside,
        //         resJson.priceDecimal,
        //         resJson.priceList,
        //         resJson.psell,
        //         resJson.sStatus,
        //         resJson.sector,
        //         resJson.sectorbarBuy,
        //         resJson.sectorbarNonSide,
        //         resJson.sectorbarSell,
        //         resJson.sectorname,
        //         resJson.sellNumberOfExeList,
        //         resJson.sellTotalVolumn,
        //         resJson.sellVolumnList,
        //         resJson.settleDecimal,
        //         resJson.spread,
        //         resJson.stockMarketStatus,
        //         resJson.symbol,
        //         resJson.symbolbarBuy,
        //         resJson.symbolbarNonSide,
        //         resJson.symbolbarSell,
        //         resJson.ticker,
        //         resJson.totalList,
        //         resJson.totalPercentList,
        //         resJson.totalVolumnAllSide,
        //         resJson.type,
        //         resJson.val,
        //         resJson.vol,
        //     ],
        // };
        const reqSection = sectionTasks_time;
        const result = {

            // reqSection: popSymbol.reqSection, //moved-to(parent)
            timeUsed,
            res_at,
            // symbol: 'PTT',
            isSame: false,

            // symbol: popSymbol.symbol,
            symbol: popSymbol,
            // req_at,
            res_at,
            // is_same,
            res_json: resText,
        };
        saveData_inMem(
            {
                result,
                section_time: reqSection,
            }
        );
    }
    // TODO: pop() task
    // TODO: move() task
    // TODO: log() err-task
    // TODO: wait new-tasks

    const report = `number of conn-${conn_i}: ${fetchCounter}, ${errFetchCounter}`
    return report;
}


// -----------------------------------------------------------------
// NOTE: - - save lowDB
const saveData_inMem = function ({ result, section_time, }) {
    const sectionMemData = JSON.parse(JSON.stringify(result))
    const sectionMemTime = section_time;

    // check-null
    if (typeof dbInMem[sectionMemTime + ''] == 'undefined') {
        dbInMem[sectionMemTime + ''] = [];
    }

    dbInMem[sectionMemTime + ''].push(sectionMemData);

    return true;
}
var filename_id = 0;
var lastSaveDataHr = 0;
const saveData_toLowDB = async function (results, time_saving_at) {
    // NOTE: increment(filename_id)
    const currentSaveDataHr = (new Date()).getUTCHours();
    let isNewFile = false;
    if (lastSaveDataHr != currentSaveDataHr) {
        // newFile-data
        filename_id++;
        // await fs.truncate(filePath).catch(err => true);
        isNewFile = true;

        lastSaveDataHr = currentSaveDataHr;
    }

    // append-data
    console.log('save_FileDB ->filename_id: ', filename_id);
    const copyResults = ',' + JSON.stringify(
        {
            saveFile_at: time_saving_at, results,
        }
    );

    // NOTE: after-save ->clear-dbInMem
    dbInMem = {};

    // NOTE: save fileDB
    console.time('save-jsonFile.');
    try {
        await libFileDB.saveJson(
            copyResults,
            filename_id,
            isNewFile,
        );

    } catch (error) {
        console.error(error);
    }
    console.timeEnd('save-jsonFile.')

    return true;
}
// const saveData_toLowDB = async function (results, time_save_at) {
//     // NOTE: increment - filename_id
//     filename_id++;
//     console.log('save_lowDB ->filename_id: ', filename_id);
//     // console.log('data: ', results);
//     const copyResults = JSON.parse(JSON.stringify(results));
//     // const newResults = JSON.parse(JSON.stringify(original));

//     // NOTE: save lowDB
//     // https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
//     console.time('save-jsonFile.')
//     try {
//         await libLowDB.saveJson({
//             saveFile_at: time_save_at, results: copyResults,
//         },
//             filename_id,
//         );

//     } catch (error) {
//         console.error(error);
//     }
//     console.timeEnd('save-jsonFile.')


//     // NOTE: after-save ->clear-dbInMem
//     dbInMem = {};

//     return true;
// }

// -----------------------------------------------------------------
// NOTE: - - Main
export async function main(
    {
        url,
        key,
        options,
        defaultLevel,
        initTasks = [],
    },
) {
    // TODO: import env
    // TODO: fetch all-list(single-time)
    // TODO: filter eq
    // TODO: generate(eq-filename)
    // TODO: save eq-list
    // ------------------
    // NOTE: counter ->nodeWorker
    const numOfNode = todoTasks.filter(e => e.titleLevel === defaultLevel).length;
    if (numOfNode > 1) {
        // NOTE: set -> initTasks
        // แบ่ง เท่าๆกัน
        for (let i = 0; i < initTasks.length; i++) {
            const task = initTasks[i];
            // const node_i = (i + 1) % numOfNode;
            const node_i = i % numOfNode;
            todoTasks.filter(e => e.titleLevel === defaultLevel)[node_i].tasks.push(task);
        }
        // half_length = Math.ceil(arrayName.length / 2);   
        // leftSide = arrayName.slice(0,half_length);
        // leftRight = arrayName.slice(half_length);
    } else {
        todoTasks.filter(e => e.titleLevel === defaultLevel)[0].tasks = initTasks;
    }
    // todoTasks.filter(e => e.titleLevel === '30s').map(function (todoTask_i) {
    //     todoTask_i.tasks = initTasks;
    // });
    // todoTasks.filter(e => e.titleLevel === '30s').map(function (todoTask_i) {
    //     todoTask_i.tasks = initTasks;
    // });

    // ---------------------
    // run-concurrent(paralet http-client)
    const doingTasks = [];
    // handle console-key
    // doingTasks.push(waitConsoleKey());
    // taskUpdating
    doingTasks.push(taskUpdating());

    // conn
    // const numConn = 2;
    // const numConn = 20;
    // const numConn = 50;
    // const numConn = 39;
    const numConn = 32;
    for (let i = 0; i < numConn; i++) {
        doingTasks.push(
            poolConn({ conn_i: i, options, url, key, })
        )
    }

    // --wait-doingTasks - promiseAll =>[waitKey, refresh, runningConn[n],]
    const errReport = await Promise.all(doingTasks).catch(function (err) {
        console.error(err);
        // return false;
    });

    console.log(global_all_eq);

    console.log('Exit.');
    // process.exit();
    return errReport.filter((result) => (result !== false));
};