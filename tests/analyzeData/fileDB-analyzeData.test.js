import assert from 'assert';

// import { join, dirname } from 'path'
// import { fileURLToPath } from 'url';

import libFile2json from '../../src/fileDB/libFile2json.js';

// const __dirname = dirname(fileURLToPath(import.meta.url));


describe('fileDB-analyzeData', function () {
    describe('#readFile2json', function () {
        it('should fix-err(fileStr)', async function () {
            console.log('-- newDebug --');
            const errStr = ',{"a":1},{"a":1},{"a":1},{"a":1},{"a":1}';

            await libFile2json._fixInCompleteFile2json(
                errStr,
            );
            assert.equal(true, true);
        });
        it('should print Obj->symbol', async function () {
            console.log('-- newDebug --');
            const filename_id = '12';
            // const folder_path = __dirname + '/db/';
            const folder_path = 'db/';

            await libFile2json.readFile2json(
                filename_id,
                folder_path,
            );
            assert.equal(true, true);
        });
    });

});