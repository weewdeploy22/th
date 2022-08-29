
// const URL = 'https://wen043.settrade.com/webrealtime/data/fastquote.jsp';
const URL = 'https://pokeapi.co/api/v2/pokemon/1';

const OPTIONS = {

    "headers": {
        "accept": "*/*",
        "accept-language": "en-US",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        // "cookie": "xx=1",
        "Referer": "https://wen043.settrade.com/realtime/fastorder/fastorder.jsp?platform=mm&frameHeight=60",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "symbol=PTT&key=1234",
    "method": "POST"
}

const oneFetch = async function (someParams) {
    let hasErr = false;
    for (let i = 0; i < 2; i++) {
        const res = await fetch(URL).catch(function (err) {
            hasErr = true;

            return false;
        });

        if (res === false) {
            hasErr = true;
        } else {
            const hasData = await res.text();
            // console.log(hasData);
        }

    }

    return hasErr;
}


async function main() {
    // run-concurrent(paralet http-client)
    const cons = []
    let numConn = 5;
    let hasErr = false;

    while (!hasErr) {
        console.log('numConn: ', numConn);
        for (let i = 0; i < numConn; i++) {
            cons.push(
                oneFetch('some param')
            )
        }
        const results = await Promise.all(cons)
            .catch(function (err) {
                console.log('err::: -------------------');
                console.error(err);
            });

        // console.log('results::: ', results);
        for (let i = 0; i < results.length; i++) {
            const resultErr = results[i];
            // hasErr = true;
            hasErr = resultErr;
            if (hasErr) {
                console.log(`err-on: -- [numConn=${numConn}, i=${i}] -- `);
                break;
            }
        }

        const sleepTimeMs = 2;
        await new Promise(r => setTimeout(r, sleepTimeMs));

        // double--numConn
        numConn = numConn + ((numConn / 2) | 0)
    }
}

main()

export { oneFetch }