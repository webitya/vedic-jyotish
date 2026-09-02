import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true },
    gender: { type: String, default: "", trim: true },
    service: { type: String, default: "Birth Chart Analysis", trim: true },
    mode: { type: String, default: "In-Person (Ranchi Kendra)", trim: true },
    sourcePage: { type: String, default: "/", trim: true },
    sourceCard: { type: String, default: "", trim: true },
    dob: { type: String, default: "" },
    tob: { type: String, default: "" },
    pob: { type: String, default: "" },
    notes: { type: String, default: "" },

    status: {
      type: String,
      enum: ["new", "contacted", "converted", "completed", "fraud", "archived"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["high", "normal", "low"],
      default: "normal",
    },
    internalNotes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
