import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';

if (config.cloudinary.cloudName) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });
}

export async function uploadToCloudinary(
  file: Express.Multer.File,
  folder = 'green-rock'
): Promise<{ url: string; publicId: string }> {
  if (!config.cloudinary.cloudName) {
    return {
      url: `https://placehold.co/800x600?text=${encodeURIComponent(file.originalname)}`,
      publicId: 'placeholder',
    };
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(file.buffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (config.cloudinary.cloudName && publicId !== 'placeholder') {
    await cloudinary.uploader.destroy(publicId);
  }
}
