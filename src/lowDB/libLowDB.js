import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// console.log(__dirname);


async function saveJson(dbInMem, filename_id) {

    // ------------------------------------
    // Use JSON file for storage
    // const file = join(__dirname, 'db.json')
    // const file = join(__dirname + '/db/', 'db.json')
    const file = join(__dirname + '/db/', `db--${filename_id}.json`)
    // --create-file
    await fs.writeFileSync(file, '{}');
    // await fs.open(file, 'w', function (err, fileParam) {
    //     if (err) throw err;
    //     fileParam.w
    //     // console.log('Saved!');
    // });
    const adapter = new JSONFile(file)
    const db = new Low(adapter)

    // ------------------------------------
    // Read data from JSON file, this will set db.data content
    await db.read()

    // If file.json doesn't exist, db.data will be null
    // Set default data
    // db.data = { id: filename_id, results: [] }

    // Create and query items using plain JS
    // const time_start = data.time_start;
    db.data = { filename_id, dbInMem };
    // db.data.results.push(
    //     {
    //         time_start: time_start,
    //         allResult: data.results,
    //     }
    // )

    // Write db.data content to db.json
    await db.write()

    return true;
}

export default { saveJson };

