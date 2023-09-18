
import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false,
    // endpoint: "arn:aws:s3:ap-southeast-1:094508795253:accesspoint/try--001s3",
    // +++++++++
    // https://docs.aws.amazon.com/general/latest/gr/s3.html
    // +++++++++
    // -// endpoint: "https://try--001-1313768732.cos.ap-bangkok.myqcloud.com",
    endpoint: "https://cos.ap-bangkok.myqcloud.com",
    region: "ap-bangkok",
    // endpoint: "https://sgp1.digitaloceanspaces.com",
    // region: "us-east-1",
    // endpoint: "https://nyc3.digitaloceanspaces.com",
    // region: "sg1--try--001-js-upload",
    credentials: {
      accessKeyId: 'IKIDuhGdleIhuufBD0YrwlLHvSmspiXHtQsG',
      secretAccessKey: 'LaikfTDviQ3a0IUZYr4FJH8tX5VpSaXG'
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