import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage (Storing Files in Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to Upload Image to Cloudinary
async function imageUploadUtils(fileBuffer) {
    try {
        // Ensure the buffer is properly formatted
        const result = await cloudinaryV2.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    throw new Error("Image upload failed");
                }
                return result;
            }
        ).end(fileBuffer); // Use `.end()` to send buffer to Cloudinary

        return result;
    } catch (error) {
        console.error("Image Upload Error:", error);
        throw new Error("Image upload failed");
    }
}

export { upload, imageUploadUtils };
