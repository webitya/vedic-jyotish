import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";

// GET /api/blogs/[id] — get single blog by _id or slug
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    // Try by _id first, then by slug
    let blog;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id).lean();
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id }).lean();
    }

    if (!blog) {
      return Response.json({ error: "Blog not found." }, { status: 404 });
    }

    return Response.json({ ...blog, _id: blog._id.toString() });
  } catch (error) {
    console.error("GET /api/blogs/[id] error:", error);
    return Response.json({ error: "Failed to fetch blog." }, { status: 500 });
  }
}

// PUT /api/blogs/[id] — update blog
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!blog) {
      return Response.json({ error: "Blog not found." }, { status: 404 });
    }

    return Response.json({ ...blog, _id: blog._id.toString() });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: "Slug already in use." }, { status: 409 });
    }
    console.error("PUT /api/blogs/[id] error:", error);
    return Response.json({ error: "Failed to update blog." }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] — delete blog and its Cloudinary image
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return Response.json({ error: "Blog not found." }, { status: 404 });
    }

    // Delete image from Cloudinary if it exists
    if (blog.image?.publicId) {
      try {
        await cloudinary.uploader.destroy(blog.image.publicId);
      } catch (cdnErr) {
        console.warn("Cloudinary delete failed:", cdnErr.message);
      }
    }

    await Blog.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/blogs/[id] error:", error);
    return Response.json({ error: "Failed to delete blog." }, { status: 500 });
  }
}
