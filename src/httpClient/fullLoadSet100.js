
// import { ALL_TASKS, fetchOptions } from '../env/constData.js'

import { ALL_TASKS } from "../env/3sSet100.js"
import fetchOptions from "../env/fetchOptions.js"


var global__fetchCounter = 0;

// const poolConn = async function ({ conn_i, options, url, key, list_symbols_i, }) {
const poolConn = async function ({ list_symbols_i, }) {
    // 
    for (let i = 0; i < list_symbols_i.length; i++) {
        const symbol_ii = list_symbols_i[i];

        const xx = await
            // --
            fetch("https://wen073.settrade.com/webrealtime/data/fastquote.jsp", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                    "cookie": "__txtUKey=010588_005; rl=\"ofmiWqS0pWVxEvfbyednH0Q73f7F58aOsqM0G46DJv1DDZSe1SilAIaqKglqyO/ixNe8Rng=\"; xid=D79BD646B8C3C7150C56; __txtBrokerId=005; __txtUserRef=7008908; JSESSIONID=7F3A2B88B5688BC257D55D2E509E1842.ITPPN-TCE-B163; __txtUTID=16681566609151319cd52-7388-42ef-ae45-7927f07d08a6; id=DW8MOAVm7Egv31B8kqQcsQ0000000000; __txtUserRef=7008908; __txtBrokerId=005; str_0=%3D005%2C7008908%3D1p%2FPTdCmu29zJ%2FDJ2IJiFFRSvpywn4j3y64qE%2FqVO%2FhPGoCDwhWtEZ2uOXps1P%2FixLXLJijlRhw8bdRSe8Ckxk8F%2FxS97%2F8%2Fk1fboOEvSZTFJSCEYz1UezDmfV%2B3T2PkrD8EaS15JHoLKifRv1EY7JK8c17nUFtykDnfLQ4uCQM%3D; tm=\"rv+zNbnEwRgFW4i5r/obZSgCy/XS+uzv1tlWapP/Xpw2bfXhsCg=\"; if=\"15vWZbjDxxUMVsK4qfsWaCBG84KygJTx08FRZpfkUZh6b/bnv2XUc+PRTxETtceWoK/OJTbmI1glMY5Qbpqozxkr\"; st=\"ITP|10.33.2.163|1668156661000|/webrealtime/data/marketsummary.jsp\"",
                    "Referer": "https://wen073.settrade.com/realtime/fastorder/fastorder.jsp?platform=mm&accNo=0105887&tab=Home&stat=no",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": "symbol=" + symbol_ii + "&key=0Wr*lj2ijp9*y*V7LDUqQQ$$",
                "method": "POST"
            });
        const resText = await xx.text();

        // --
        global__fetchCounter++;
    }
}

async function main(params) {
    const timeAllStart = Date.now()

    const numConn = 10;
    // const numConn = 20;
    // const numConn = 15;

    let list_symbols_i = []
    for (let i = 0; i < numConn; i++) {
        list_symbols_i.push([])
    }
    for (let i = 0; i < ALL_TASKS.length; i++) {
        const symbol_i = ALL_TASKS[i];
        const pos_i = i % numConn;
        list_symbols_i[pos_i].push(symbol_i)
    }

    // // DEBUG: slit-symbols
    // for (let i = 0; i < numConn; i++) {
    //     console.log('i: ', i);
    //     console.log('list-length: ', list_symbols_i[i].length);
    //     console.log('--');
    // }

    // NOTE: doing
    // while (true) {
    for (let i = 0; i < 3; i++) {

        const timeStart = Date.now()

        const doingTasks = [];
        for (let i = 0; i < numConn; i++) {
            doingTasks.push(
                // poolConn({ conn_i: i, options, url, key, list_symbols_i: list_symbols_i[i], })
                poolConn({ list_symbols_i: list_symbols_i[i], })
            )
        }

        // --wait-doingTasks - promiseAll =>[waitKey, refresh, runningConn[n],]
        const errReport = await Promise.all(doingTasks).catch(function (err) {
            console.error(err);
        });

        const timeEnd = Date.now()
        const timeUsed = timeEnd - timeStart
        const timeUsedAll = timeEnd - timeAllStart
        console.log('timeUsed: ', timeUsed);
        console.log('timeUsedAll: ', timeUsedAll);
        console.log('global__fetchCounter: ', global__fetchCounter);
    }


    console.log('Exit.');


}

main().catch()
// // for (let i = 0; i < 10; i++) {
// for (let i = 0; i < 20; i++) {
//     main().catch()
// }
