

var globalVarSingle = true;

var globalVarMultiple = [];

// waitKey
// const waitKey = async function () {
//     // 
// }

const numOfConn = 100;
const numLoopOfOneConn = 1e5;

const singleVar = async function () {


    // FN
    const onePollConn = async function () {
        // 
        for (let i = 0; i < numLoopOfOneConn; i++) {
            if (globalVarSingle == false) {
                console.log(55);
                // 
            }
        }
        return;
    }
    const tiggerStop = function () {
        globalVarSingle = false;
    }
    const tiggerStart = function () {
        globalVarSingle = true;
    }

    // var
    let counterAllConn = 0;
    const cons = [];

    // code
    const timeStart = Date.now();
    console.log('timeStart: ', timeStart);
    tiggerStart();
    for (let i = 0; i < numOfConn; i++) {
        cons.push(onePollConn())
    }

    const timeUsed_list = await Promise.all(cons);
    const timeEnd = Date.now();
    console.log('timeEnd: ', timeEnd);
    const timeUsed = timeEnd - timeStart;
    console.log('timeUsed: ', timeUsed);
    // for (let i = 0; i < timeUsed_list.length; i++) {
    //     const timeUsed = timeUsed_list[i];
    // }
}

// --

const multipleVar = async function () {
    // FN
    const onePollConn = async function (conn_id) {
        // 
        for (let i = 0; i < numLoopOfOneConn; i++) {
            if (globalVarSingle == false) {
                // 
            }
        }

        for (let i = 0; i < numLoopOfOneConn; i++) {
            if (globalVarMultiple[conn_id] == false) {
                console.log(55);
                // 
            }

        }
        return;
    }
    const tiggerStop = function () {
        globalVarSingle = false;
    }
    const tiggerStart = function () {
        globalVarSingle = true;
    }

    // var
    let counterAllConn = 0;
    const cons = [];

    // code
    const timeStart = Date.now();
    console.log('timeStart: ', timeStart);
    tiggerStart();
    for (let i = 0; i < numOfConn; i++) {
        cons.push(onePollConn(i))
    }

    const timeUsed_list = await Promise.all(cons);
    const timeEnd = Date.now();
    console.log('timeEnd: ', timeEnd);
    const timeUsed = timeEnd - timeStart;
    console.log('timeUsed: ', timeUsed);
}

async function main() {
    await singleVar().catch()
    await multipleVar().catch()
}

main().catch()
