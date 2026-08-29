import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    category: { type: String, default: "Jyotish" },
    readTime: { type: String, default: "5 min read" },
    // Cloudinary image data
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "" },
    },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Prevent model recompilation in Next.js hot reload
export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
