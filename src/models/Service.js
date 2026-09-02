import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
    subtitle: { type: String, default: "" },
    category: { type: String, required: true, trim: true },
    shortSummary: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "Compass" },
    price: { type: String, default: "" },
    duration: { type: String, default: "45-60 mins" },
    bhavasAnalyzed: { type: String, default: "" },
    karakaPlanets: { type: String, default: "" },
    methodology: { type: String, default: "" },
    inclusions: { type: [String], default: [] },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "" },
    },
    active: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
