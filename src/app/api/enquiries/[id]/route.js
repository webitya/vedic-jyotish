import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

// GET /api/enquiries/[id]
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const lead = await Lead.findById(id).lean();
    if (!lead) {
      return Response.json({ error: "Lead not found." }, { status: 404 });
    }
    return Response.json({ ...lead, _id: lead._id.toString(), id: lead._id.toString() });
  } catch (error) {
    console.error("GET /api/enquiries/[id] error:", error);
    return Response.json({ error: "Failed to fetch lead." }, { status: 500 });
  }
}

// PUT /api/enquiries/[id] — Update status / notes / priority
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await Lead.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return Response.json({ error: "Lead not found." }, { status: 404 });
    }

    return Response.json({ ...updated, _id: updated._id.toString(), id: updated._id.toString() });
  } catch (error) {
    console.error("PUT /api/enquiries/[id] error:", error);
    return Response.json({ error: "Failed to update lead: " + error.message }, { status: 500 });
  }
}

// DELETE /api/enquiries/[id] — Delete lead
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return Response.json({ error: "Lead not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/enquiries/[id] error:", error);
    return Response.json({ error: "Failed to delete lead." }, { status: 500 });
  }
}
