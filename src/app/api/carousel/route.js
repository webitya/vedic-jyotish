import { connectDB } from "@/lib/mongodb";
import HeroSlide from "@/models/HeroSlide";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/carousel — fetch slides with optional device filtering
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");
    const device = searchParams.get("device");

    const filter = all === "1" ? {} : { active: true };
    if (device && (device === "desktop" || device === "mobile")) {
      filter.$or = [{ device: device }, { device: "all" }];
    }

    const slides = await HeroSlide.find(filter).sort({ order: 1, createdAt: 1 }).lean();

    const serialized = slides.map((s) => {
      let dev = "desktop";
      if (s.device === "mobile") dev = "mobile";
      else if (s.device === "all" || s.device === "both") dev = "all";
      else dev = "desktop";

      return {
        ...s,
        _id: s._id.toString(),
        id: s._id.toString(),
        image: s.url,
        device: dev,
      };
    });

    return new Response(JSON.stringify(serialized), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("GET /api/carousel error:", error);
    return Response.json({ error: "Failed to fetch carousel slides." }, { status: 500 });
  }
}

// POST /api/carousel — save / sync array of slides with precise device targeting
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!Array.isArray(body)) {
      // Single slide creation
      const { url, publicId, alt, title, subtitle, link, device, order, active } = body;
      if (!url) {
        return Response.json({ error: "Image URL is required." }, { status: 400 });
      }

      let validDev = "desktop";
      if (device === "mobile") validDev = "mobile";
      else if (device === "all" || device === "both") validDev = "all";
      else validDev = "desktop";

      const slide = await HeroSlide.create({
        url: url.trim(),
        publicId: publicId || "",
        alt: alt || "",
        title: title || "",
        subtitle: subtitle || "",
        link: link || "",
        device: validDev,
        order: order || 0,
        active: active !== false,
      });

      return Response.json({
        ...slide.toObject(),
        _id: slide._id.toString(),
        id: slide._id.toString(),
        image: slide.url,
        device: validDev,
      }, { status: 201 });
    }

    // Bulk sync slides: preserve exact device setting selected by user
    const slidesData = body.map((s, idx) => {
      let validDev = "desktop";
      if (s.device === "mobile") validDev = "mobile";
      else if (s.device === "all" || s.device === "both") validDev = "all";
      else validDev = "desktop";

      return {
        url: (s.url || s.image || "").trim(),
        publicId: s.publicId || "",
        alt: s.alt || "",
        title: s.title || "",
        subtitle: s.subtitle || "",
        link: s.link || "",
        device: validDev,
        order: idx,
        active: s.active !== false,
      };
    }).filter((s) => !!s.url);

    // Delete existing slides
    await HeroSlide.deleteMany({});

    // Bulk insert new ordered slides with preserved device settings
    if (slidesData.length > 0) {
      await HeroSlide.insertMany(slidesData);
    }

    const updated = await HeroSlide.find().sort({ order: 1 }).lean();
    const responsePayload = updated.map((s) => {
      let dev = "desktop";
      if (s.device === "mobile") dev = "mobile";
      else if (s.device === "all" || s.device === "both") dev = "all";
      else dev = "desktop";

      return {
        ...s,
        _id: s._id.toString(),
        id: s._id.toString(),
        image: s.url,
        device: dev,
      };
    });

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
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
