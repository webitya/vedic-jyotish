import { connectDB } from "@/lib/mongodb";
import PopupBanner from "@/models/PopupBanner";
import cloudinary from "@/lib/cloudinary";

// GET /api/popup — fetch popup banner config
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "1";

    let config = await PopupBanner.findOne().lean();

    if (!config) {
      config = {
        enabled: false,
        images: [],
      };
    }

    if (!all) {
      // Public view: only send active images if enabled
      const activeImages = (config.images || [])
        .filter((img) => img.active !== false && !!img.url)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      return Response.json({
        enabled: !!config.enabled,
        images: activeImages,
      });
    }

    // Admin view: send complete configuration
    return Response.json({
      _id: config._id ? config._id.toString() : null,
      enabled: config.enabled !== false,
      images: (config.images || []).sort((a, b) => (a.order || 0) - (b.order || 0)),
    });
  } catch (error) {
    console.error("GET /api/popup error:", error);
    return Response.json({ error: "Failed to fetch popup configuration." }, { status: 500 });
  }
}

// POST /api/popup — save / update popup banner config
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { enabled, images } = body;

    const formattedImages = Array.isArray(images)
      ? images
          .map((img, idx) => ({
            url: (img.url || "").trim(),
            publicId: img.publicId || "",
            link: (img.link || "").trim(),
            active: img.active !== false,
            order: typeof img.order === "number" ? img.order : idx,
          }))
          .filter((img) => !!img.url)
      : [];

    let config = await PopupBanner.findOne();

    if (!config) {
      config = new PopupBanner({
        enabled: enabled !== false,
        images: formattedImages,
      });
    } else {
      config.enabled = enabled !== false;
      config.images = formattedImages;
    }

    await config.save();

    return Response.json({
      success: true,
      enabled: config.enabled,
      images: config.images,
    });
  } catch (error) {
    console.error("POST /api/popup error:", error);
    return Response.json({ error: "Failed to save popup settings: " + error.message }, { status: 500 });
  }
}

// DELETE /api/popup — delete single image from popup
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");
    const index = parseInt(searchParams.get("index") || "-1", 10);

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.warn("Cloudinary delete failed:", e.message);
      }
    }

    const config = await PopupBanner.findOne();
    if (config && config.images && index >= 0 && index < config.images.length) {
      config.images.splice(index, 1);
      await config.save();
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/popup error:", error);
    return Response.json({ error: "Failed to remove popup image." }, { status: 500 });
  }
}
