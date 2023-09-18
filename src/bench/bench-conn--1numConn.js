
// https://stackoverflow.com/a/66309132
import path from 'path';
import { fileURLToPath } from 'url'

// import got from 'got';
import fetch from 'node-fetch';




async function main() {
    const myArgs = process.argv.slice(2);

    let hasErr = false;
    let loop_i = 1;
    let oldSec_count = 99;
    while (!hasErr) {
        // --time-start
        const timeStart = Date.now();
        const res = await

            fetch("https://wen079.settrade.com/webrealtime/data/fastquote.jsp", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                    "cookie": "rl=\"rv+zNcG8o2VmIPvb5YZ7HUQ3o/nO5f+Qs6AyLg==\"; __txtBrokerId=007; __txtUserRef=7093644; JSESSIONID=9910F2608FBB0F1FB8714A1ECEFAFFE2.ITPPN-TCE-B125; id=72CQ6HY62SYbQZ84xWrBDg0000000000; ls=MULTI; tm=\"qv6vTcHexhYCWYy5qf0dYylMvszJ5+rv1tlWZZD8WJ01bfLltyg=\"; __txtUserRef=7093644; __txtBrokerId=007; if=\"15vUZb7DxhUGWsK4qfIdZyRK897139a/1tlWZZD8WJ0ybPPkvijROeSfTFl0\"; st=\"ITP|10.33.2.125|1667260632000|/webrealtime/data/fastquote.jsp\"; str_0=%3D007%2C7093644%3D1Z%2FPWMKzr39nPffL2ZlrEFwqxv3F7PWRo6oyfpD%2BRJtsLZnltBGXcaK2Pw9L98GVoaC6dFXxNUInOZIhWOuMoDYvnAbK8f4rrlLDyYAvSpjFCQ33QlthUi3sWmOkamv%2FnRh0ISogfw0ecA%3D%3D",
                    "Referer": "https://wen079.settrade.com/realtime/fastorder/fastorder.jsp?platform=mm",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": "symbol=OR&key=0jsY43Ev4vUC*hqz279CfQ$$",
                "method": "POST"
            });

            const xxx = res.json();
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

        if(oldSec ==

        console.log('timeUsed: ', timeUsed);


    }
}

// main()
console.log('isRunningDirectlyViaCLI: ', isRunningDirectlyViaCLI);
if (isRunningDirectlyViaCLI) {
    console.log('console-starting: -- ');
    main();
    console.log('console-ended: -- ');
}
