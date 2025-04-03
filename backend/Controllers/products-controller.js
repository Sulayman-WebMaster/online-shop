import { upload, imageUploadUtils } from "../config/cloudinary.js"; // Adjust path as needed
import Product from "../models/Product.js"; // Adjust path as needed

// Multer Middleware to handle image upload
export const uploadProductImage = upload.single("image");

// Function to Upload Product Image & Save Product
export const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Upload Image to Cloudinary
        const result = await imageUploadUtils(req.file.buffer);

        // Create new product with image URL
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: result.secure_url, // Cloudinary Image URL
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("Error in productController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
