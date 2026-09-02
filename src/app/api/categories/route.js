import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Blog from "@/models/Blog";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const DEFAULT_CATEGORIES = [
  "Jyotish",
  "Vastu Shastra",
  "Planetary Transits",
  "Gemology",
  "Muhurat",
  "Spiritual Remedies",
  "Panchang",
];

// GET /api/categories
export async function GET() {
  try {
    await connectDB();
    let categories = await Category.find().sort({ order: 1, name: 1 }).lean();

    // Auto-seed default categories if empty
    if (categories.length === 0) {
      const seedData = DEFAULT_CATEGORIES.map((name, idx) => ({
        name,
        slug: slugify(name),
        order: idx,
      }));
      await Category.insertMany(seedData);
      categories = await Category.find().sort({ order: 1, name: 1 }).lean();
    }

    // Compute blog counts per category dynamically
    const blogs = await Blog.find({}, "category").lean();
    const counts = {};
    blogs.forEach((b) => {
      if (b.category) counts[b.category] = (counts[b.category] || 0) + 1;
    });

    const serialized = categories.map((c) => ({
      ...c,
      _id: c._id.toString(),
      id: c._id.toString(),
      count: counts[c.name] || 0,
    }));

    return Response.json(serialized);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return Response.json({ error: "Failed to fetch categories: " + error.message }, { status: 500 });
  }
}

// POST /api/categories — Create new category
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, description } = body;

    if (!name || !name.trim()) {
      return Response.json({ error: "Category name is required." }, { status: 400 });
    }

    const trimmedName = name.trim();
    const slug = slugify(trimmedName);

    // Check if category already exists
    const existing = await Category.findOne({
      $or: [{ name: { $regex: new RegExp(`^${trimmedName}$`, "i") } }, { slug }],
    });

    if (existing) {
      return Response.json(
        { ...existing.toObject(), _id: existing._id.toString(), id: existing._id.toString() },
        { status: 200 }
      );
    }

    const maxOrder = await Category.countDocuments();
    const category = await Category.create({
      name: trimmedName,
      slug,
      description: description || "",
      order: maxOrder,
    });

    return Response.json(
      { ...category.toObject(), _id: category._id.toString(), id: category._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return Response.json({ error: "Failed to create category: " + error.message }, { status: 500 });
  }
}

// DELETE /api/categories — Delete category
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Category ID is required." }, { status: 400 });
    }

    await Category.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/categories error:", error);
    return Response.json({ error: "Failed to delete category: " + error.message }, { status: 500 });
  }
}
