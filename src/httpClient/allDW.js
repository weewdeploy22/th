
import { ALL_TASKS } from "../env/all.js"


const list_broker = [
    // p,c
    '01', //BLS
    '13', //KGI
    '19', //YUANTA
    '42', //MST
    // only-C
    '06', //KKPS
    '08', //ASPS
    '16', //TNS
    '24', //FSS
    // '41', //JPM
    // // only-BABA
    // '41', //JPM
    // '28', //MACQ
]
const after50 = ["ACE", "AEONTS", "AMATA", "AP", "BAM", "BCH", "BCP", "BCPG", "BEC", "CENTEL", "CHG", "CK", "CKP", "COM7", "DOHOME", "EPG", "ESSO", "FORTH", "GUNKUL", "HANA", "KEX", "KKP", "MAJOR", "MEGA", "ONEE", "ORI", "PLANB", "PSL", "PTG", "QH", "RATCH", "RBF", "RCL", "SINGER", "SPALI", "SPRC", "STA", "STARK", "STEC", "STGT", "SUPER", "SYNEX", "TASCO", "TCAP", "THANI", "TIPH", "TQM", "TTA", "VGI", "WHA"]

function detectSymbolFromPut(input_symbol, input__brokerID) {
    const dataSplited = input_symbol.split(input__brokerID + 'P')[0]
    // substring(0,xx.length -2)

    return dataSplited
}
function checkSymbolFromPut(input_symbol, input__brokerID) {
    if (input_symbol.indexOf(input__brokerID + 'P') == -1) {
        return false
    }

    return true
}
// ==
// ==
function detectSymbolFromCall(input_symbol, input__brokerID) {
    const dataSplited = input_symbol.split(input__brokerID + 'C')[0]

    return dataSplited
}
function checkSymbolFromCall(input_symbol, input__brokerID) {
    if (input_symbol.indexOf(input__brokerID + 'C') == -1) {
        return false
    }

    return true
}

// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
// // usage example:
// var a = ['a', 1, 'a', 2, '1'];
// var unique = a.filter(onlyUnique);
// console.log(unique); // ['a', 1, 2, '1']

async function main(params) {
    console.log('ALL_TASKS.length: ', ALL_TASKS.length);
    let dwOnlyPut = ALL_TASKS;

    const list__put_uniqe__All = []
    const list__call_uniqe__All = []

    for (let i = 0; i < list_broker.length; i++) {
        const broker_id = list_broker[i];
        // PUT:
        // const list__put_all = ALL_TASKS.filter((symbol_i) => detectSymbolFromPut(symbol_i, broker_id) !== false)
        const list__put_all = ALL_TASKS.filter((symbol_i) => checkSymbolFromPut(symbol_i, broker_id) !== false)
        // console.log(ALL_TASKS.filter((symbol_i) => detectSymbolFromPut(symbol_i, broker_id)));
        const list__put_temps = []
        list__put_all.forEach(symbol_i__full => {
            const symbol_i__pure = detectSymbolFromPut(symbol_i__full, broker_id)
            // console.log('dataSplited: ', symbol_i__pure);
            if (list__put_temps.indexOf(symbol_i__pure) === -1) {
                list__put_temps.push(symbol_i__pure)
            }
            // global
            if (list__put_uniqe__All.indexOf(symbol_i__pure) === -1) {
                list__put_uniqe__All.push(symbol_i__pure)
            }
        })
        const list__put_uniqe = list__put_temps
        // console.log(list__put_uniqe);

        // CALL:
        const list__call_all = ALL_TASKS.filter((symbol_i) => checkSymbolFromCall(symbol_i, broker_id) !== false)
        const list__call_temps = []
        list__call_all.forEach(symbol_i__full => {
            const symbol_i__pure = detectSymbolFromCall(symbol_i__full, broker_id)
            // console.log('dataSplited: ', symbol_i__pure);
            if (list__call_temps.indexOf(symbol_i__pure) === -1) {
                list__call_temps.push(symbol_i__pure)
            }
            // global
            if (list__call_uniqe__All.indexOf(symbol_i__pure) === -1) {
                list__call_uniqe__All.push(symbol_i__pure)
            }
        })
        const list__call_uniqe = list__put_temps

        console.log('broker-', broker_id, ': ', `Put: ${list__put_uniqe.length}, Call: ${list__call_uniqe.length}`);
    }
    console.log('Global:: ', `Put: ${list__put_uniqe__All.length}, Call: ${list__call_uniqe__All.length}`);
    console.log('list__put_uniqe__All: ',list__put_uniqe__All);
    // let dwOnlyCall = xx;
    // console.log('ALL_TASKS.length: ', ALL_TASKS.length);

    console.log('Exit.');


}

main().catch()
