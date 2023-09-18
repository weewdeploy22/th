
// https://stackoverflow.com/a/66309132
import path from 'path';
import { fileURLToPath } from 'url'

// import got from 'got';
import fetch from 'node-fetch';

import fetchOptions from "../env/fetchOptions.js"

const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url))
const isRunningDirectlyViaCLI = nodePath === modulePath

// im--x00ms, canfetchMany

const URL = 'https://wen043.settrade.com/webrealtime/data/fastquote.jsp';
// const URL = 'https://pokeapi.co/api/v2/pokemon/1';

const popSymbol = 'SCB';
const OPTIONS = {
    headers: fetchOptions.options.headers,
    method: fetchOptions.options.method,
    body: `symbol=${popSymbol}&key=${fetchOptions.key}`,
}

const oneFetch = async function (someParams) {
    let hasErr = false;
    for (let i = 0; i < 2; i++) {
        // for (let i = 0; i < 12; i++) {
        // try {
        //     const res = await got(URL, { "method": "GET" });
        //     if (res.ok) {
        //         const body = res.body;
        //     } else {
        //         hasErr = true;
        //     }
        // } catch (error) {
        //     // console.error(error)
        //     console.log('--catch--')

        //     hasErr = true;
        // }

        // const res = await fetch(URL)
        const res = await fetch(URL, OPTIONS)
            .catch(function (err) {
                hasErr = true;

                return false;
            });

        if (res === false) {
            hasErr = true;
        } else {
            const hasData = await res.text();
            // const hasData = await res.body();
            // console.log(hasData);
        }

    }

    return hasErr;
}


function moreConn(currentConn) {
    return currentConn + ((currentConn / 2) | 0);
}

function lessConn(currentConn) {
    return currentConn - ((currentConn / 2) | 0);
}


// -----------------------------------------------------------------
// NOTE: - - pool connect
const onePoolConn = async function ({ conn_i, options, url, key, }) {

    // ---
    // TODO: loop 
    // TODO: check time out(1s)
    // TODO: fetch
    // ,,if timeout =>retry()
    // ,,if retry>3 : report-errCounter(retryErr)
    // onTimeUsed >700ms
    // ,,exit-loop

    // ---
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
    const report = `number of conn-${conn_i}: ${fetchCounter}, ${errFetchCounter}`
    // const report = `number of conn-${conn_i}: ${fetchCounter}, ${errFetchCounter}`
    return {
        
        report,
    };
}


async function poolCurrent(numConn) {
    pooconn
}
async function poolMore(numConn) {
    //
}
async function poolLess(numConn) {
    //
}

async function main() {
    const myArgs = process.argv.slice(2);
    // console.log(myArgs);
    // return;

    let numConn = 5;
    const initNumConn = parseInt(myArgs[1]);
    if (myArgs.length > 0) {
        numConn = initNumConn;
    }
    // run-concurrent(paralet http-client)
    const numMoreConn = numConn * 2;

    const cons = []
    // let hasErr = false;

    const timeBenchLimit = 700; //ms
    // const timeBenchLimit = 2 * 1000; //ms

    let loop_i = 1;
    while (!hasErr) {
        console.log('numConn: ', numConn);
        console.time('allConn');
        for (let i = 0; i < numConn; i++) {
            cons.push(
                oneFetch('some param')
            )
        }
        // --time-start
        const timeStart = Date.now();
        const results = await Promise.all(cons)
            .catch(function (err) {
                console.log('err::: -------------------');
                console.error(err);
            });

        // console.log('results: ', results);
        // check-err http
        for (let i = 0; i < results.length; i++) {
            const resultErr = results[i];
            const local_hasErr = resultErr;
            if (local_hasErr) {
                hasErr = true;
                console.log(`err-on: -- [numConn=${numConn}, i=${i}] -- `);
                break;
            }
        }

        // --time-stop
        const timeStop = Date.now();
        const timeUsed = timeStop - timeStart;
        // check-err long-time
        if (timeUsed > timeBenchLimit) {
            hasErr = true;
            console.log('err::: outOfTime - timeUsed: ', timeUsed);
            console.log(`err-on: -- [numConn=${numConn}, i=${loop_i}] -- `);
            break;
        }

        console.log(`log-at: -- [numConn=${numConn}, i=${loop_i}] -- `);
        console.log('timeUsed: ', timeUsed);

        const sleepTimeMs = 10;
        await new Promise(r => setTimeout(r, sleepTimeMs));

        console.timeEnd('allConn');

        // double(x + 0.5)--numConn
        numConn = numConn + ((numConn / 2) | 0)
        loop_i++;
    }
}

// main()
console.log('isRunningDirectlyViaCLI: ', isRunningDirectlyViaCLI);
if (isRunningDirectlyViaCLI) {
    console.log('console-starting: -- ');
    main();
    console.log('console-ended: -- ');
}
