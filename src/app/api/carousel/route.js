import { connectDB } from "@/lib/mongodb";
import HeroSlide from "@/models/HeroSlide";
import cloudinary from "@/lib/cloudinary";

// GET /api/carousel — fetch slides
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    const filter = all === "1" ? {} : { active: true };
    const slides = await HeroSlide.find(filter).sort({ order: 1, createdAt: 1 }).lean();

    const serialized = slides.map((s) => ({
      ...s,
      _id: s._id.toString(),
      id: s._id.toString(),
      image: s.url,
    }));

    return Response.json(serialized);
  } catch (error) {
    console.error("GET /api/carousel error:", error);
    return Response.json({ error: "Failed to fetch carousel slides." }, { status: 500 });
  }
}

// POST /api/carousel — save / sync array of slides
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!Array.isArray(body)) {
      // Single slide creation
      const { url, publicId, alt, title, subtitle, link, order, active } = body;
      if (!url) {
        return Response.json({ error: "Image URL is required." }, { status: 400 });
      }

      const slide = await HeroSlide.create({
        url: url.trim(),
        publicId: publicId || "",
        alt: alt || "",
        title: title || "",
        subtitle: subtitle || "",
        link: link || "",
        order: order || 0,
        active: active !== false,
      });

      return Response.json({ ...slide.toObject(), _id: slide._id.toString() }, { status: 201 });
    }

    // Bulk sync slides: remove existing and re-insert in exact user-defined order
    const slidesData = body.map((s, idx) => ({
      url: s.url || s.image || "",
      publicId: s.publicId || "",
      alt: s.alt || "",
      title: s.title || "",
      subtitle: s.subtitle || "",
      link: s.link || "",
      order: idx,
      active: s.active !== false,
    })).filter((s) => !!s.url);

    // Delete existing slides
    await HeroSlide.deleteMany({});

    // Bulk insert new ordered slides
    if (slidesData.length > 0) {
      await HeroSlide.insertMany(slidesData);
    }

    const updated = await HeroSlide.find().sort({ order: 1 }).lean();
    return Response.json(updated.map((s) => ({ ...s, _id: s._id.toString(), id: s._id.toString(), image: s.url })));
  } catch (error) {
    console.error("POST /api/carousel error:", error);
    return Response.json({ error: "Failed to save carousel slides: " + error.message }, { status: 500 });
  }
}

// DELETE /api/carousel — delete slide
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Slide ID is required." }, { status: 400 });
    }

    const slide = await HeroSlide.findById(id);
    if (!slide) {
      return Response.json({ error: "Slide not found." }, { status: 404 });
    }

    if (slide.publicId) {
      try {
        await cloudinary.uploader.destroy(slide.publicId);
      } catch (e) {
        console.warn("Cloudinary delete failed:", e.message);
      }
    }

    await HeroSlide.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/carousel error:", error);
    return Response.json({ error: "Failed to delete slide." }, { status: 500 });
  }
}
