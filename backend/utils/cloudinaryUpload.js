import cloudinary from "../config/cloudinary.js";
import path from "path";

const streamUpload = (fileBuffer, originalname) => {
  return new Promise((resolve, reject) => {
    const ext = path.extname(originalname);
    const filename = path.basename(originalname, ext); // e.g., Kaushal_Nepal_CV
    const publicId = `resumes/${filename}`; // Ensure public_id is resumes/Kaushal_Nepal_CV

    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId, // Explicitly set public_id
        resource_type: "raw",
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};

export default streamUpload;