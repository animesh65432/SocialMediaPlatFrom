import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import config from "../Config";
const s3client = new S3Client({
  credentials: {
    secretAccessKey: config.S3SERECTACESSKEY || "",
    accessKeyId: config.S3ACESSKEYID || "",
  },
  region: config.S3REGION || "",
});

export const gethefile = async (key: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: config.S3BUCKETNAME,
      Key: key,
    });

    let url = await getSignedUrl(s3client, command);

    return url;
  } catch (error) {
    console.log(error);
  }
};

export const putthefile = async (ContentType: string, key: string) => {
  console.log(ContentType, key);
  try {
    const command = new PutObjectCommand({
      Bucket: config.S3BUCKETNAME,
      Key: key,
      ContentType: ContentType,
    });

    const url = await getSignedUrl(s3client, command);
    return url;
  } catch (error) {
    console.log(error);
  }
};
