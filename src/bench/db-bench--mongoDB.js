import { ALL_TASKS, fetchOptions } from '../env/constData.js'


import mongooses from 'mongoose';

// https://stackoverflow.com/a/66309132
// NOTE: not-run main() =>when testing
import path from 'path';
import { fileURLToPath } from 'url'
const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url))
const isRunningDirectlyViaCLI = nodePath === modulePath

// DEBUG: mockup PTT
const DATA_1row_raw = {
    reqSection: Date.now(),
    timeUsed: 1122,
    res_at: Date.now(),
    symbol: 'PTT',
    isSame: false,
    res_json: "{\"symbol\":\"PTT\",\"pchg\":-0.6802721088435374,\"marketbarSell\":48.732536671467706,\"buyTotalVolumn\":5298900,\"language\":\"english\",\"type\":\"stock\",\"totalList\":[3400,9568200,3072600],\"high\":37,\"dy\":\"5.44\",\"mkt\":\"equity\",\"sector\":\"ENERG\",\"industryname\":\"Resources\",\"val\":463.90704999999997,\"par\":\"1.00\",\"pbuy\":\"41.91\",\"psell\":\"55.40\",\"chg\":-0.25,\"last\":36.5,\"marketbarBuy\":50.0971746579088,\"symbolbarNonSide\":2.696888692048528,\"sectorbarNonSide\":3.3424257387490375,\"eps\":\"2.26\",\"pnonside\":\"2.70\",\"ceil\":47.75,\"mktlabel\":\"SET\",\"settleDecimal\":2,\"buyVolumnList\":[3400,5295500,0],\"percentNonSideVolumn\":\"2.70\",\"name\":\"PTT PUBLIC COMPANY LIMITED\",\"sectorbarBuy\":42.265347721994274,\"sectorname\":\"Energy & Utilities\",\"bsp\":[37,36.75,36.5],\"avgbuy\":\"36.75\",\"cur\":\"(Baht)\",\"bsv\":[0,0,3400,5,3400,0.026889799275557173,167,3931700,5295500,696,9227200,72.97575172806503,629,3072600,0,0,3072600,24.30046978061087],\"percentSellVolumn\":\"55.40\",\"pbv\":\"0.98\",\"bov\":[14811800,4375200,15758400,7341600,15864300,7740600,7248900,4264400,4979400,2853900],\"nonSideVolumnList\":[0,341000,0],\"bo\":[\"36.50\",\"36.75\",36.25,37,36,37.25,35.75,37.5,35.5,37.75],\"priceList\":[37,36.75,36.5],\"stockMarketStatus\":\"Open1\",\"nonSideNumberOfExeList\":[0,1,0],\"sellVolumnList\":[0,3931700,3072600],\"d5\":\"38.00 / 36.50\",\"vol\":12644200,\"avg\":36.69,\"low\":36.5,\"openopendata\":36.75,\"sStatus\":\"\",\"floor\":25.75,\"close\":36.75,\"avgsell\":\"36.64\",\"ticker\":[\"12:20:08\",\"S\",1900,36.5,\"12:20:07\",\"B\",300,36.75,\"12:20:07\",\"S\",400,36.5,\"12:20:05\",\"B\",3000,36.75,\"12:19:57\",\"S\",4800,36.5,\"12:19:57\",\"S\",2700,36.5,\"12:19:20\",\"B\",500,36.75,\"12:19:14\",\"B\",100,36.75,\"12:19:14\",\"B\",100,36.75,\"12:19:08\",\"S\",1800,36.5,\"12:19:07\",\"S\",500,36.5,\"12:19:01\",\"B\",200,36.75,\"12:18:57\",\"S\",2700,36.5,\"12:18:47\",\"B\",4500,36.75,\"12:18:20\",\"S\",4100,36.5],\"sellTotalVolumn\":7004300,\"percentBuyVolumn\":\"41.91\",\"sellNumberOfExeList\":[0,167,629],\"nonSideTotalVolumn\":341000,\"mktstatus\":\"Open1\",\"priceDecimal\":2,\"sectorbarSell\":54.39222653925669,\"symbolbarBuy\":41.90775217095585,\"openopen\":\"Open 1\",\"spread\":0.25,\"buyNumberOfExeList\":[5,696,0],\"totalVolumnAllSide\":12644200,\"pe\":\"9.08\",\"open2\":0,\"marketbarNonSide\":1.170288670623491,\"totalPercentList\":[\"0.03\",\"75.67\",\"24.30\"],\"open\":36.75,\"symbolbarSell\":55.395359136995616}",
};

const resJson = JSON.parse(DATA_1row_raw.res_json);
const DATA_1row_parsed = {
    reqSection: Date.now(),
    timeUsed: 1122,
    res_at: Date.now(),
    symbol: 'PTT',
    isSame: false,
    resJson: resJson,
};
const DATA_1row_forFile = {
    reqSection: Date.now(),
    timeUsed: 1122,
    res_at: Date.now(),
    symbol: 'PTT',
    isSame: false,
    arrData: [
        resJson.avg,
        resJson.avgbuy,
        resJson.avgsell,
        resJson.bo,
        resJson.bov,
        resJson.bsp,
        resJson.bsv,
        resJson.buyNumberOfExeList,
        resJson.buyTotalVolumn,
        resJson.buyVolumnList,
        resJson.ceil,
        resJson.chg,
        resJson.close,
        // resJson.cur,
        resJson.d5,
        resJson.dy,
        resJson.eps,
        resJson.floor,
        resJson.high,
        // resJson.industryname,
        // resJson.language,
        resJson.last,
        resJson.low,
        resJson.marketbarBuy,
        resJson.marketbarNonSide,
        resJson.marketbarSell,
        // resJson.mkt,
        // resJson.mktlabel,
        resJson.mktstatus,
        // resJson.name,
        resJson.nonSideNumberOfExeList,
        resJson.nonSideTotalVolumn,
        resJson.nonSideVolumnList,
        resJson.open,
        resJson.open2,
        resJson.openopen,
        resJson.openopendata,
        resJson.par,
        resJson.pbuy,
        resJson.pbv,
        resJson.pchg,
        resJson.pe,
        resJson.percentBuyVolumn,
        resJson.percentNonSideVolumn,
        resJson.percentSellVolumn,
        resJson.pnonside,
        // resJson.priceDecimal,
        resJson.priceList,
        resJson.psell,
        resJson.sStatus,
        // resJson.sector,
        resJson.sectorbarBuy,
        resJson.sectorbarNonSide,
        resJson.sectorbarSell,
        // resJson.sectorname,
        resJson.sellNumberOfExeList,
        resJson.sellTotalVolumn,
        resJson.sellVolumnList,
        // resJson.settleDecimal,
        // resJson.spread,
        resJson.stockMarketStatus,
        resJson.symbol,
        resJson.symbolbarBuy,
        resJson.symbolbarNonSide,
        resJson.symbolbarSell,
        resJson.ticker,
        resJson.totalList,
        resJson.totalPercentList,
        resJson.totalVolumnAllSide,
        // resJson.type,
        resJson.val,
        resJson.vol,
    ],
};
const oneWriteMini = async function () {
    return true
}
const oneWriteBig = async function () {
    // TODO: write until--1s
    const timeLimit = 1 * 1000;
    let numLoop = 50;
    const filePath = 'messageBig.txt';

    // --clear-file:
    await fs.truncate(filePath).catch(err => true);

    let timeUseMs = 0;
    const textWrite = JSON.stringify(DATA_1row_forFile);
    while (timeUseMs < timeLimit) {
        const timeStart = Date.now();

        // insert-many(prepare-data)
        let manyText = '';
        for (let i = 0; i < numLoop; i++) {
            // TODO: make collections
            // manyText = manyText + textWrite;
        }
        // insertMany mongoose
        // await fs.appendFile(filePath, manyText).catch(function (err) {
        //     console.error(err);
        // });

        const timeEnd = Date.now();

        timeUseMs = timeEnd - timeStart;

        console.log('(oneWriteBig)log::: timeUsed: ', timeUseMs);
        console.log(`(oneWriteBig)log-on: -- [numConn=${numLoop} -- `);


        // double(x + 0.25)--numLoop
        numLoop = numLoop + ((numLoop / 4) | 0)
    }

    return true
}

async function main() {
    // await oneWriteMini();

    // await oneWriteBig();

    console.log('Ended-main;');
}

// main()
console.log('isRunningDirectlyViaCLI: ', isRunningDirectlyViaCLI);
if (isRunningDirectlyViaCLI) {
    console.log('console-starting: -- ');
    main();
    console.log('console-ended: -- ');
}

