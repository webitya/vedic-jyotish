import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// GET /api/blogs — fetch blogs (public or admin)
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all"); // admin uses ?all=1 to get unpublished too
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    const filter = {};
    if (all !== "1") {
      filter.published = true;
    }
    if (category && category !== "All") {
      filter.category = new RegExp(`^${category}$`, "i");
    }
    if (tag) {
      filter.tags = tag;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { metaKeywords: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(filter).sort({ isFeatured: -1, createdAt: -1 }).lean();

    // Convert _id to string for serialization
    const serialized = blogs.map((b) => ({
      ...b,
      _id: b._id.toString(),
    }));

    return Response.json(serialized);
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return Response.json({ error: "Failed to fetch blogs." }, { status: 500 });
  }
}

// POST /api/blogs — create new blog
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      readTime,
      metaTitle,
      metaDescription,
      metaKeywords,
      focusKeyword,
      canonicalUrl,
      robotsDirectives,
      schemaMarkup,
      author,
      image,
      published,
      isFeatured,
    } = body;

    if (!title || !slug) {
      return Response.json({ error: "Title and slug are required." }, { status: 400 });
    }

    const blog = await Blog.create({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt || "",
      content: content || "",
      category: category || "Jyotish",
      tags: Array.isArray(tags) ? tags : [],
      readTime: readTime || "5 min read",
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      metaKeywords: Array.isArray(metaKeywords) ? metaKeywords : [],
      focusKeyword: focusKeyword || "",
      canonicalUrl: canonicalUrl || "",
      robotsDirectives: robotsDirectives || "index, follow",
      schemaMarkup: schemaMarkup || "",
      author: author || {
        name: "Ach. Dr. Mohit Shah",
        role: "Founder & Chief Astrologer",
        avatar: "",
      },
      image: image || { url: "", publicId: "", alt: "", caption: "" },
      published: published !== false,
      isFeatured: !!isFeatured,
    });

    return Response.json({ ...blog.toObject(), _id: blog._id.toString() }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: "A blog with this slug already exists." }, { status: 409 });
    }
    console.error("POST /api/blogs error:", error);
    return Response.json({ error: "Failed to create blog: " + error.message }, { status: 500 });
  }
}
