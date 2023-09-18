import assert from 'assert';
import libFileDB from '../../src/fileDB/libFileDB.js'


describe('fileDB', function () {
    describe('#saveResult to-jsonFile', function () {
        const dataResults = {
            time_start: Date.now(),
            results: [
                {
                    symbols: 'kbank',
                    raw_json: '...',
                    res_at: Date.now(),
                },

                // { symbols: 'kbank', resEncoded: '...', time_resAt: Date.now(), },
                // { symbols: 'kbank', resEncoded: '...', time_resAt: Date.now(), },
                // { symbols: 'kbank', resEncoded: '...', time_resAt: Date.now(), },
            ]
        }
        it('should create a json file[by(id)]', async function () {
            console.log('-- newDebug --');
            const filename_id = 1;
            const time_saving_at = Date.now();
            // const tempDate = new Date();
            const isNewFile = 'xx';

            const copyResults = ',' + JSON.stringify(
                {
                    saveFile_at: time_saving_at, results: dataResults,
                }
            );

            await libFileDB.saveJson(
                copyResults,
                filename_id,
                isNewFile,
            );
            assert.equal(true, true);
        });
    });

});