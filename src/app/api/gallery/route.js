import { connectDB } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import { galleryItems } from "@/data/siteContent";

// GET /api/gallery — List all gallery images
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const all = searchParams.get("all");

    const filter = {};
    if (all !== "1") {
      filter.active = true;
    }
    if (category && category !== "all" && category !== "All") {
      filter.category = { $regex: new RegExp(category, "i") };
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    return Response.json(items.map((i) => ({ ...i, _id: i._id.toString(), id: i._id.toString() })));
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return Response.json({ error: "Failed to fetch gallery items: " + error.message }, { status: 500 });
  }
}

// POST /api/gallery — Create a new gallery record
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { title, category, description, image, active, featured } = body;

    const imageUrl = typeof image === "string" ? image : image?.url;
    if (!imageUrl) {
      return Response.json({ error: "Image URL is required." }, { status: 400 });
    }

    const maxOrder = await GalleryItem.countDocuments();
    const item = await GalleryItem.create({
      title: title?.trim() || "Vedic Jyotish Kendra Record",
      category: category?.trim() || "Consultation Chamber",
      description: description?.trim() || "",
      image: {
        url: imageUrl,
        publicId: image?.publicId || "",
        alt: image?.alt || title || "Gallery Image",
      },
      order: maxOrder,
      active: active !== false,
      featured: !!featured,
    });

    return Response.json(
      { ...item.toObject(), _id: item._id.toString(), id: item._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return Response.json({ error: "Failed to create gallery item: " + error.message }, { status: 500 });
  }
}
