import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { serviceCategories } from "@/data/siteContent";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// GET /api/services — List all services
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const all = searchParams.get("all");

    let count = await Service.countDocuments();

    // Auto-seed from siteContent.js if collection is empty
    if (count === 0) {
      const seedData = [];
      let order = 0;
      for (const cat of serviceCategories) {
        for (const s of cat.services) {
          seedData.push({
            name: s.name,
            slug: s.slug || slugify(s.name),
            subtitle: s.subtitle || "",
            category: cat.title,
            shortSummary: s.shortSummary || "",
            description: s.description || "",
            icon: s.icon || "Compass",
            price: s.price || "₹1,500",
            duration: s.duration || "45-60 mins",
            bhavasAnalyzed: s.bhavasAnalyzed || "",
            karakaPlanets: s.karakaPlanets || "",
            methodology: s.methodology || "",
            inclusions: Array.isArray(s.inclusions) ? s.inclusions : [],
            active: true,
            isPopular: order < 3,
            order: order++,
          });
        }
      }
      if (seedData.length > 0) {
        await Service.insertMany(seedData);
      }
    }

    const filter = {};
    if (all !== "1") {
      filter.active = true;
    }
    if (category && category !== "All") {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
        { shortSummary: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 }).lean();
    return Response.json(services.map((s) => ({ ...s, _id: s._id.toString(), id: s._id.toString() })));
  } catch (error) {
    console.error("GET /api/services error:", error);
    return Response.json({ error: "Failed to fetch services: " + error.message }, { status: 500 });
  }
}

// POST /api/services — Create a new service
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      name,
      slug,
      subtitle,
      category,
      shortSummary,
      description,
      icon,
      price,
      duration,
      bhavasAnalyzed,
      karakaPlanets,
      methodology,
      inclusions,
      image,
      active,
      isPopular,
    } = body;

    if (!name || !name.trim()) {
      return Response.json({ error: "Service name is required." }, { status: 400 });
    }

    const cleanSlug = slug ? slugify(slug) : slugify(name);

    // Check slug collision
    const existing = await Service.findOne({ slug: cleanSlug });
    if (existing) {
      return Response.json({ error: `Service with slug "${cleanSlug}" already exists.` }, { status: 400 });
    }

    const maxOrder = await Service.countDocuments();
    const service = await Service.create({
      name: name.trim(),
      slug: cleanSlug,
      subtitle: subtitle || "",
      category: category || "Astrology Consultation",
      shortSummary: shortSummary || "",
      description: description || "",
      icon: icon || "Compass",
      price: price || "",
      duration: duration || "45-60 mins",
      bhavasAnalyzed: bhavasAnalyzed || "",
      karakaPlanets: karakaPlanets || "",
      methodology: methodology || "",
      inclusions: Array.isArray(inclusions) ? inclusions : [],
      image: image || { url: "", publicId: "", alt: "" },
      active: active !== false,
      isPopular: !!isPopular,
      order: maxOrder,
    });

    return Response.json(
      { ...service.toObject(), _id: service._id.toString(), id: service._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/services error:", error);
    return Response.json({ error: "Failed to create service: " + error.message }, { status: 500 });
  }
}
