import assert from 'assert';
// import { saveJson } from '../../src/lowDB/libLowDB.js'
import libLowDB from '../../src/lowDB/libLowDB.js'

describe('lowDB', function () {
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
            const loop_i = 2;
            const tempDate = new Date();
            const filename =
                Intl.DateTimeFormat('en-US', { year: 'numeric', }).format(tempDate)
                + Intl.DateTimeFormat('en-US', { month: 'numeric', }).format(tempDate)
                + '-'
                + Intl.DateTimeFormat('en-US', { day: 'numeric', }).format(tempDate)
                + '--'
                + loop_i
                ;

            assert.equal(true, await libLowDB.saveJson(dataResults, filename));
        });
    });

});