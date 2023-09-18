// Imports the Google Cloud Tasks library.
// const { CloudTasksClient } = require('@google-cloud/tasks');
import { CloudTasksClient } from '@google-cloud/tasks';

// Instantiates a client.
const clientTasks = new CloudTasksClient();

// in--console:
// gcloud tasks queues create my-queue001--location=asia-southeast1
// gcloud tasks queues describe my-queue001
// sample--q-details:
// rateLimits:
//   maxBurstSize: 100
//   maxConcurrentDispatches: 1000
//   maxDispatchesPerSecond: 500.0
// retryConfig:
//   maxAttempts: 100
//   maxBackoff: 3600s
//   maxDoublings: 16
//   minBackoff: 0.100s
// state: RUNNING

async function createHttpTask(payloadRefTable) {
    // TODO(developer): Uncomment these lines and replace with your values.
    // const project = 'my-project-id';
    const project = 'weewsv';
    // const queue = 'my-queue';
    // const queue = 'my-queue001';
    const queue = 'ss';
    // const location = 'us-central1';
    const location = 'asia-southeast1';
    // const url = 'https://example.com/taskhandler';
    // const url = 'https://tigger--self2-vwan4cfbja-as.a.run.app/?tiggedCounter=' + tiggedCounter;
    const reqAt = Date.now();
    const url = 'https://asia-southeast1-try-sv001.cloudfunctions.net/tiggerLogFirebase/?refTable=' + payloadRefTable + '&reqAt=' + reqAt;
    // const url = 'https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-0510fde6-ee6a-43d4-a327-79081cdb146b/default/handle--gCloud';
    // const payload = 'Hello, World!';
    // const inSeconds = 180;
    const inSeconds = 1;

    // Construct the fully qualified queue name.
    const parent = clientTasks.queuePath(project, location, queue);

    const task = {
        httpRequest: {
            // httpMethod: 'POST',
            httpMethod: 'GET',
            url,
        },
    };

    // if (payload) {
    //     task.httpRequest.body = Buffer.from(payload).toString('base64');
    // }

    if (inSeconds) {
        // The time when the task is scheduled to be attempted.
        task.scheduleTime = {
            seconds: inSeconds + Date.now() / 1000,
        };
    }

    // Send create task request.
    try {
        console.log('Sending task:');
        console.log(task);
        const request = { parent: parent, task: task };
        const [response] = await clientTasks.createTask(request);
        console.log(`Created task ${response.name}`);
    } catch (err) {
        return false;
    }

    return true;
}
// createHttpTask();

async function main() {
    let doingTasks = [];

    const payloadRefTable = 'x2/a1/aa001';

    // if (payloadStatusTigger == 'on') {
    //     await createHttpTask(tiggedCounter);
    // }

    // const numConn = 50;
    const numConn = 20;
    for (let i = 0; i < numConn; i++) {
        doingTasks.push(
         createHttpTask(payloadRefTable)
        )
    }
    await Promise.all(doingTasks).catch(function (err) {
        console.error(err);
        // return false;
    });
    
    console.log('End: console --');
}
main()