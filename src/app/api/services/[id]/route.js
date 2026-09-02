import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import cloudinary from "@/lib/cloudinary";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// GET /api/services/[id] — Fetch single service by id or slug
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    let service = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(id).lean();
    }
    if (!service) {
      service = await Service.findOne({ slug: id }).lean();
    }

    if (!service) {
      return Response.json({ error: "Service not found." }, { status: 404 });
    }

    return Response.json({ ...service, _id: service._id.toString(), id: service._id.toString() });
  } catch (error) {
    console.error("GET /api/services/[id] error:", error);
    return Response.json({ error: "Failed to fetch service." }, { status: 500 });
  }
}

// PUT /api/services/[id] — Update service
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const existing = await Service.findById(id);
    if (!existing) {
      return Response.json({ error: "Service not found." }, { status: 404 });
    }

    if (body.slug && body.slug !== existing.slug) {
      const cleanSlug = slugify(body.slug);
      const conflict = await Service.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (conflict) {
        return Response.json({ error: `Slug "${cleanSlug}" is already in use.` }, { status: 400 });
      }
      body.slug = cleanSlug;
    }

    const updated = await Service.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true }).lean();
    return Response.json({ ...updated, _id: updated._id.toString(), id: updated._id.toString() });
  } catch (error) {
    console.error("PUT /api/services/[id] error:", error);
    return Response.json({ error: "Failed to update service: " + error.message }, { status: 500 });
  }
}

// DELETE /api/services/[id] — Delete service
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const service = await Service.findById(id);
    if (!service) {
      return Response.json({ error: "Service not found." }, { status: 404 });
    }

    // Clean up Cloudinary asset if present
    if (service.image?.publicId) {
      try {
        await cloudinary.uploader.destroy(service.image.publicId);
      } catch (e) {
        console.warn("Cloudinary delete failed:", e.message);
      }
    }

    await Service.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/services/[id] error:", error);
    return Response.json({ error: "Failed to delete service." }, { status: 500 });
  }
}
