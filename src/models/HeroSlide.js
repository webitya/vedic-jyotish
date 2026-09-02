import mongoose from "mongoose";

// Ensure model cache is cleared so updated schema fields (like device) are always applied
if (mongoose.models && mongoose.models.HeroSlide) {
  delete mongoose.models.HeroSlide;
}

const HeroSlideSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, default: "" },
    alt: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    link: { type: String, default: "" },
    device: { type: String, default: "desktop" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.models.HeroSlide || mongoose.model("HeroSlide", HeroSlideSchema);
