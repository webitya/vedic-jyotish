import cloudinary from "@/lib/cloudinary";

// POST /api/upload — upload image to Cloudinary
// Accepts multipart form data with a "file" field
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "vedic-jyotish/blogs";

    if (!file || typeof file === "string") {
      return Response.json({ error: "No file provided." }, { status: 400 });
    }

    // Convert file to base64 data URI for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: "image",
      transformation: [
        { width: 1200, crop: "limit", quality: "auto:good", fetch_format: "auto" },
      ],
    });

    return Response.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return Response.json({ error: "Image upload failed: " + error.message }, { status: 500 });
  }
}

export const config = {
  api: { bodyParser: false },
};
