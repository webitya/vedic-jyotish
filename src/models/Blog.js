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
    tags: { type: [String], default: [] },
    readTime: { type: String, default: "5 min read" },
    
    // SEO & Search Engine Optimization
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: [String], default: [] },
    focusKeyword: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    robotsDirectives: { type: String, default: "index, follow" },
    
    // Structured Data & Schema.org JSON-LD
    schemaMarkup: { type: String, default: "" },
    
    // Author Information
    author: {
      name: { type: String, default: "Ach. Dr. Mohit Shah" },
      role: { type: String, default: "Founder & Chief Astrologer" },
      avatar: { type: String, default: "" },
    },
    
    // Cloudinary Featured Image data
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "" },
      caption: { type: String, default: "" },
    },
    
    // Publishing & Analytics
    published: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Prevent model recompilation in Next.js hot reload
export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
