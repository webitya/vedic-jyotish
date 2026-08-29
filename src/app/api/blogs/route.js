import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// GET /api/blogs — fetch all published blogs (public)
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all"); // admin uses ?all=1 to get unpublished too

    const filter = all === "1" ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).lean();

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

// POST /api/blogs — create new blog (admin only, session checked by layout)
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { title, slug, excerpt, content, category, readTime, image, published } = body;

    if (!title || !slug) {
      return Response.json({ error: "Title and slug are required." }, { status: 400 });
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt: excerpt || "",
      content: content || "",
      category: category || "Jyotish",
      readTime: readTime || "5 min read",
      image: image || { url: "", publicId: "", alt: "" },
      published: published !== false,
    });

    return Response.json({ ...blog.toObject(), _id: blog._id.toString() }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: "A blog with this slug already exists." }, { status: 409 });
    }
    console.error("POST /api/blogs error:", error);
    return Response.json({ error: "Failed to create blog." }, { status: 500 });
  }
}
