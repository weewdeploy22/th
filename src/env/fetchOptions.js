
const options =

{
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
        "Referer": "https://wen043.settrade.com/realtime/fastorder/fastorder.jsp?platform=mm&frameHeight=60",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "method": "POST"
}

const key = "xxxxxxxxxxxxxxxxxxxxxxxx";

// --
// const url = `https://pokeapi.co/api/v2/pokemon/{(number)}`
// const url = `https://pokeapi.co/api/v2/pokemon/1`
const url = `https://wen043.settrade.com/webrealtime/data/fastquote.jsp`

export default {
    url,
    options,
    key,
}; 
