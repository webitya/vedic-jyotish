import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "Consultation Chamber", trim: true },
    description: { type: String, default: "" },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.GalleryItem || mongoose.model("GalleryItem", GalleryItemSchema);
