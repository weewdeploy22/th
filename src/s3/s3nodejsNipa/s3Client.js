
import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false,
    // endpoint: "arn:aws:s3:ap-southeast-1:094508795253:accesspoint/try--001s3",
    // +++++++++
    // https://docs.aws.amazon.com/general/latest/gr/s3.html
    // +++++++++
    // endpoint: "https://bkk-s3.s3-bkk.nipa.cloud",
    endpoint: "https://s3-bkk.nipa.cloud",
    region: "bkk-s3",
    // endpoint: "https://sgp1.digitaloceanspaces.com",
    // region: "us-east-1",
    // endpoint: "https://nyc3.digitaloceanspaces.com",
    // region: "sg1--try--001-js-upload",
    credentials: {
      accessKeyId: '1LSOEPXNFLNG6EPJJF7L',
      secretAccessKey: 'VH2cBnoCjPmSKUH2A1BZTxfLiGFsI4C6cssDn1pS'
    }
});
// const s3Client = new S3({
//     forcePathStyle: false,
//     endpoint: "https://nyc3.digitaloceanspaces.com",
//     region: "us-east-1",
//     credentials: {
//       accessKeyId: process.env.SPACES_KEY,
//       secretAccessKey: process.env.SPACES_SECRET
//     }
// });

export { s3Client };