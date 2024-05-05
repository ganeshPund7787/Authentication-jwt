import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARI_CLOUD_NAME,
    api_key: process.env.CLOUDINARI_API_KEY,
    api_secret: process.env.CLOUDINARI_API_SECRET
});


export const upLoadOnCloudinary = async (loacalFilePath) => {
    try {
        if (!loacalFilePath) return null;
        // Upload on a cloudinary storage
        const responce = await cloudinary.uploader.upload(loacalFilePath, {
            resource_type: 'auto'
        });
        // file has been upoaded successfuly
        console.log("file is upload on cloud ", responce);
    } catch (error) {
        fs.unlinkSync(loacalFilePath);  // remove the local file if the upload faild from the server
        return null;
    }
}


