
import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false,
    endpoint: "https://sgp1.digitaloceanspaces.com",
    region: "us-east-1",
    // endpoint: "https://nyc3.digitaloceanspaces.com",
    // region: "sg1--try--001-js-upload",
    credentials: {
      accessKeyId: 'DO00KFXRUYBKLYKKAL63',
      secretAccessKey: 'lIuFXMyc+w9dqGQZ3HfwWJjqFeSB65hOrYQj06sU7BI'
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