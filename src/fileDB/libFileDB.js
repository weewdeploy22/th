import { join, dirname } from 'path'
import { fileURLToPath } from 'url'


import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));


async function saveJson(manyText, filename_id, isNewFile) {
    // console.log(isNewFile);
    // ------------------------------------
    // --path
    const file = join(__dirname + '/db/', `db--${filename_id}.json`)
    // --append-data
    await fs.appendFile(file, manyText).catch(function (err) {
        console.error(err);
    });

    return true;
}

export default { saveJson };

