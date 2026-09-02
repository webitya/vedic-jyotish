import { connectDB } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import cloudinary from "@/lib/cloudinary";

// GET /api/gallery/[id]
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await GalleryItem.findById(id).lean();
    if (!item) {
      return Response.json({ error: "Item not found." }, { status: 404 });
    }
    return Response.json({ ...item, _id: item._id.toString(), id: item._id.toString() });
  } catch (error) {
    console.error("GET /api/gallery/[id] error:", error);
    return Response.json({ error: "Failed to fetch item." }, { status: 500 });
  }
}

// PUT /api/gallery/[id]
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await GalleryItem.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return Response.json({ error: "Item not found." }, { status: 404 });
    }

    return Response.json({ ...updated, _id: updated._id.toString(), id: updated._id.toString() });
  } catch (error) {
    console.error("PUT /api/gallery/[id] error:", error);
    return Response.json({ error: "Failed to update item: " + error.message }, { status: 500 });
  }
}

// DELETE /api/gallery/[id]
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const item = await GalleryItem.findById(id);
    if (!item) {
      return Response.json({ error: "Item not found." }, { status: 404 });
    }

    // Delete image from Cloudinary if publicId exists
    if (item.image?.publicId) {
      try {
        await cloudinary.uploader.destroy(item.image.publicId);
      } catch (e) {
        console.warn("Cloudinary delete failed:", e.message);
      }
    }

    await GalleryItem.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return Response.json({ error: "Failed to delete item." }, { status: 500 });
  }
}
