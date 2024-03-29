const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
});

const uploadImage = async (path, buffer, minetype) => {
    const image = await s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: path,
        Body: buffer,
        ContentType: minetype
    }).promise();

    return {
        path: image.Key,
        url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${image.Key}`
    }
}

const deleteImage = async path => await s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: path }).promise()

module.exports = {
    uploadImage,
    deleteImage
}