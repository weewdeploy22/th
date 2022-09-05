import { main as mainOldPromiseAll } from "./httpClient/myNodeFetchOld.js"
// import {main as mainOldAsync} from "httpClient/myNodeFetchOld"

import { ALL_TASKS, fetchOptions } from './env/constData.js'

// import fetchOptions from './env/fetchOptions.js'

// import modelSleepLevel from './models/modelSleepLevel'

// --runMain
import path from 'path';
import { fileURLToPath } from 'url'
import { MaxRedirectsError } from "got";
const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url))
const isRunningDirectlyViaCLI = nodePath === modulePath

async function main() {
    console.log('Start: src/main...');

    // const url = `https://pokeapi.co/api/v2/pokemon/{(number)}`
    // const url = `https://pokeapi.co/api/v2/pokemon/1`
    // const url = `https://wen043.settrade.com/webrealtime/data/fastquote.jsp`

    // DEBUG: mockup initSymbols
    // let initSymbols = [];
    // for (let i = 0; i < 72210; i++) {
    //     // const element = 10[i];
    //     initSymbols.push(i)
    // }

    // TODO: can change-tpye
    const nodeType = 'single'; //[single, master, worker]

    // const nodeType = 'worker'; //[master, worker]

    // TODO: add-mode [MaxRedirectsError,woker]
    if (nodeType == 'single') {
        const defaultLevel = '30s';
        const reports = await mainOldPromiseAll({
            defaultLevel: defaultLevel,
            initTasks: ALL_TASKS,
            options: fetchOptions.options,
            key: fetchOptions.key,
            url: fetchOptions.url,
        });
        console.log('reports: ', reports);
    } else if (nodeType == 'master') {
        // [express(admin-manageMent), webSocket(control-nodes)]
        /*
        admin-manageMent:
        - add new--worker-node
        - start,stop
        - show-reports
        */
        // const todoTasks = {'1s': [...], '3s': [...], '30s': [...], ...};
        //
        // const reports = await mainMaster({
        //     initTasks: todoTasks,
        //     options: fetchOptions.options,
        //     key: fetchOptions.key,
        //     url: fetchOptions.url,
        // });
    } else if (nodeType == 'worker') {
        // const wsMasterUrl = 'wss://xxx...xx';
        // const nodeLevel = '30s';
        //
        // const reports = await mainWorker({
        //     nodeLevel: null,
        //     initTasks: ALL_TASKS,
        //     options: fetchOptions.options,
        //     key: fetchOptions.key,
        //     url: fetchOptions.url,
        // });
    } else {
        console.log('err::: no-type - case[...]');
    }

    // detect[ctrl+c]
    // https://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
    if (process.platform === "win32") {
        var rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("SIGINT", function () {
            console.log('END: SIGINT(with ctrl+c)');
            process.emit("SIGINT");
        });
    }
    process.on("SIGINT", function () {
        //graceful shutdown
        console.log('END: (with ctrl+c)shutdown');
        process.exit();
    });
    console.log('END: src/main...');
}

console.log('isRunningDirectlyViaCLI: ', isRunningDirectlyViaCLI);
if (isRunningDirectlyViaCLI) {
    console.log('console-starting: -- ');
    main();
    console.log('console-ended: -- ');
}