import fetch from 'node-fetch';

// import modelSleepLevel from '../models/modelSleepLevel.js';
import libLowDB from '../lowDB/libLowDB.js';

// -----------------------------------------------------------------
// --sort taskLevel
// const ENUM_TASK_LEVEL_FROM_NAME = {
//     '5s': 0,
//     '30s': 1,
//     '15m': 2,
// };
// const ENUM_TASK_LEVEL_FROM_INDEX = {
//     0: '5s',
//     1: '30s',
//     2: '15m',
// };

// -----------------------------------------------------------------
// NOTE: - - shared-data(web-socket)
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
const taskMoreFreq = function () {
    // pop from current=30s
    // push =>(index-1)5s
}
const taskLessFreq = function () {
    // pop from current=30s
    // push =>(index+1)
}

// -----------------------------------------------------------------
// NOTE: - - model[...]
const modelRunningTask = {
    'symbol': '',
    'retryCount': '',
    'sameCount': '',
    'taskLevel': '30s',
}

// -----------------------------------------------------------------
// NOTE: - - global-var[tasks]
var runningTasks = [];
// TODO: no-save duplicate-results
var oldResult = [];
// var errTasks = [];
var sectionTasks_time = 0 + '';

// NOTE: global-var[database]
var dbInMem = {};
/*
{section_at, sectionData[{}, ...}, }

sectionData:
{symbol, symbol_level(titleLevel), req_at, res_at, is_same, raw_json, }
*/

// NOTE: global-var[status]
var classStatus = {
    runningStatus: true,
}

// -----------------------------------------------------------------
// // mockup
// const enumResTime = [50, 100, 250]

// -----------------------------------------------------------------
// NOTE: -FN
// const oneFetch = function (someParams) {
//     // let runningTasks = todoTask;
//     return new Promise((resolve, reject) => {
//         let localFn = async function () {
//             let counterRunned = 0;
//             while (runningTasks.length > 0) {
//                 // TODO: check if-overflow => -1
//                 // https://stackoverflow.com/questions/307179/what-is-javascripts-highest-integer-value-that-a-number-can-go-to-without-losin
//                 let task = runningTasks.pop();
//                 counterRunned = counterRunned + 1;

//                 // fetch API
//                 // mockup
//                 let resTimeDelay = enumResTime[Math.floor(Math.random() * enumResTime.length)];
//                 await new Promise(r => setTimeout(r, resTimeDelay));

//                 // TODO: if-err =>retry
//                 // TODO: ,after-err(3-time) =>res={status:err}
//             }
//             return counterRunned;
//         };
//         resolve(localFn())
//     });
// }

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
// NOTE: - - move tasks
// -----------------------------------------------------------------
// NOTE: - - task refresh
const refreshTasks_fromTodo_5s = function () {
    // const localTempTasks = todoTasks.filter(e => e.titleLevel === '5s')[0].tasks;
    // DEBUG: use-list of-30s to-5s
    const localTempTasks = todoTasks.filter(e => e.titleLevel === '30s')[0].tasks;
    // const localTempTasks = [...todoTasks.filter(e => e.titleLevel === '5s')[0].tasks];
    if (localTempTasks.length > 0) {
        sectionTasks_time = Date.now() + '';
        for (let i = 0; i < localTempTasks.length; i++) {
            const task = localTempTasks[i];
            if (runningTasks.indexOf(task) > -1) {
                // runningTasks[task] = task;
                console.error('cannot-clear: runningTasks [task]:', task);
            } else {
                runningTasks.push(task);
            }
        }
    }
}
const refreshTasks_fromTodo_30s = function () {
    const localTempTasks = todoTasks.filter(e => e.titleLevel === '30s')[0].tasks;
    if (localTempTasks.length > 0) {
        sectionTasks_time = Date.now() + '';
        for (let i = 0; i < localTempTasks.length; i++) {
            const task = localTempTasks[i];
            if (runningTasks.indexOf(task) > -1) {
                // runningTasks[task] = task;
                console.error('cannot-clear: runningTasks [task]:', task);
            } else {
                runningTasks.push(task);
            }
        }
    }
}
const taskUpdating_refreshing = async function (currentTimeSec) {
    // 

    // -----
    // // TODO: add tasks-from-websocket[http-mode]
    // const websocketTasks = [];
    // const websocketTasks = await fetch(...)
    // if (websocketTasks.length > 0) {
    //     todoTasks.push(...websocketTasks);
    // }
    // // ---


    // // TODO: [move] less then-freq

    // // TODO: [move] more then-freq
    // array = [1, 1, 1, 1, 1, 2, 5, 9];
    // index = array.indexOf(5);
    // popData = array.splice(index, 3);
    // tasks.push(popData):


    // TODO: refresh 5s-list
    if (
        (currentTimeSec % 5) == 4
        // currentTimeSec == 0 + (60 - 1) ||
        // currentTimeSec == 30
    ) {
        // refresh 5s-list 
        // refreshTasks_fromTodo_5s()

        // TODO: refresh 30s-list
        refreshTasks_fromTodo_30s()
        // if (
        //     (currentTimeSec % 30) == 29
        //     // currentTimeSec == 0 + (60 - 1) ||
        //     // currentTimeSec == 30
        // ) {
        // // refresh 30s-list 
        // for (let i = 0; i < todoTasks[1].tasks.length; i++) {
        //     const task = todoTasks[1].tasks[i];
        //     if (runningTasks.indexOf(task) > -1) {
        //         runningTasks.push(task);
        //     } else {
        //         console.error('cannot-clear: runningTasks [task]:', task);
        //     }
        // }

        // --basic-JS
        //     // unique array
        //     array1 = ["Vijendra","Singh"];
        //     array2 = ["Singh", "Shakya"];
        //    // Merges both arrays and gets unique items
        //     array3 = array1.concat(array2); 
        // , unique
        // array3.filter((item, pos) => array3.indexOf(item) === pos)
    }

    // TODO: refresh 15m-list

    // save lowDB[from(mem) - to(json-file)]
    // saveDB-freq = 1/m
    const currentSaveTimeMinute = (new Date()).getUTCMinutes();
    if (currentTimeSec > 53 && currentSaveTimeMinute != lastSaveTimeMinute) {
        // TODO: save - lowDB
        lastSaveTimeMinute = currentSaveTimeMinute;

        const time_save_at = Date.now() + '';
        saveData_toLowDB(dbInMem, time_save_at);
    }

    return true;
}
var lastSaveTimeMinute = 66;
const taskUpdating = async function () {
    // -----
    // DEBUG: taskUpdating
    let loop_i = 1;
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
                const sleepTimeMs = 250;
                await new Promise(r => setTimeout(r, sleepTimeMs));
                continue;
            } else {
                lastTimeSec = currentTimeSec;
            }
        } else {
            lastTimeMinute = currentTimeMinute;
        }

        // DEBUG: log loop_i
        // console.log('loop_i: ', loop_i);

        // refresh[task, saveMemDB_toFile, ]
        await taskUpdating_refreshing(currentTimeSec);
        loop_i++;
    }
    console.log('taskUpdating: ending--loop');

    let errResult = false;
    errResult = 'Fn: taskUpdating';
    return errResult;
}

// -----------------------------------------------------------------
// NOTE: fetch Data
const fetchAndRetry = async function ({ url, customOptions }) {
    // https://stackoverflow.com/questions/44342226/next-js-error-only-absolute-urls-are-supported
    const absoluteURL = url;
    const absoluteOptions = customOptions;
    const res = await fetch(absoluteURL, absoluteOptions).catch(function (err) {
        console.error(err);
        return false;
    });
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
        let req_at = 0;
        let res_at = 0;
        while (retryCounter < 3) {
            retryCounter++;
            fetchCounter++;
            req_at = Date.now();
            res = await fetchAndRetry({ customOptions, url });
            res_at = Date.now();
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

        // TODO: check is_same-res
        const is_same = false;


        // NOTE: save(mem) 
        const resText = await res.text();
        const result = {
            symbol: popSymbol,
            req_at,
            res_at,
            is_same,
            res_json: resText,
        };
        saveData_inMem(
            {
                result,
                section_time: sectionTasks_time,
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
    const sectionMemData = {
        symbol: result.symbol,
        req_at: result.req_at,
        res_at: result.res_at,
        is_same: result.is_same,
        res_json: result.res_json,
    };
    const sectionMemTime = section_time;

    // check-null
    if (typeof dbInMem[sectionMemTime + ''] == 'undefined') {
        dbInMem[sectionMemTime + ''] = [];
    }

    dbInMem[sectionMemTime + ''].push(sectionMemData);

    return true;
}
var filename_id = 0;
const saveData_toLowDB = async function (results, time_save_at) {
    // NOTE: increment - filename_id
    filename_id++;
    console.log('save_lowDB ->filename_id: ', filename_id);
    console.log('data: ', results);
    const copyResults = JSON.parse(JSON.stringify(results));
    // const newResults = JSON.parse(JSON.stringify(original));

    // NOTE: save lowDB
    // https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    console.time('save-jsonFile.')
    try {
        await libLowDB.saveJson({
            saveFile_at: time_save_at, results: copyResults,
        },
            filename_id,
        );

    } catch (error) {
        console.error(error);
    }
    console.timeEnd('save-jsonFile.')


    // NOTE: after-save ->clear-dbInMem
    dbInMem = {};

    return true;
}

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
    const numConn = 2;
    // const numConn = 20;
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

    // TODO: save lowDB-counter
    // saveLowDB_counter();

    // TODO: save report

    console.log('Exit.');
    // process.exit();
    return errReport.filter((result) => (result !== false));
};