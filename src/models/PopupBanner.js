import mongoose from "mongoose";

const PopupBannerSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: true },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, default: "" },
        link: { type: String, default: "" },
        active: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PopupBanner || mongoose.model("PopupBanner", PopupBannerSchema);
