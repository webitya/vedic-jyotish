import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

// GET /api/enquiries — List leads with filters & auto-seeding
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const count = await Lead.countDocuments();

    // Auto-seed sample leads if collection is completely empty
    if (count === 0) {
      const sampleLeads = [
        {
          name: "Rajesh Sharma",
          phone: "+91 98765 43210",
          email: "rajesh.sharma@example.com",
          service: "Birth Chart Analysis",
          mode: "In-Person (Ranchi Kendra)",
          sourcePage: "/services/birth_chart",
          sourceCard: "Birth Chart Analysis Card",
          dob: "14-05-1992",
          tob: "10:45 AM",
          pob: "Ranchi, Jharkhand",
          notes: "Need consultation regarding career transit and business expansion.",
          status: "new",
          priority: "high",
          internalNotes: "Prefers morning slots on weekends.",
        },
        {
          name: "Priyanka Verma",
          phone: "+91 88776 65544",
          email: "priyanka.v@example.com",
          service: "Marriage Problem & Gun Milan",
          mode: "Online Video Session",
          sourcePage: "/services",
          sourceCard: "Marriage Problem Card",
          dob: "22-11-1995",
          tob: "03:15 PM",
          pob: "Patna, Bihar",
          notes: "Kundali matching with partner and Mangal dosha evaluation.",
          status: "contacted",
          priority: "normal",
          internalNotes: "Sent initial questionnaire via WhatsApp.",
        },
        {
          name: "Amit Kumar Sinha",
          phone: "+91 94311 22334",
          email: "amit.sinha@example.com",
          service: "Commercial & Residential Vastu",
          mode: "In-Person (Site Visit)",
          sourcePage: "/contact",
          sourceCard: "Harmu Kendra Visit Form",
          dob: "",
          tob: "",
          pob: "Harmu, Ranchi",
          notes: "Vastu inspection required for newly purchased commercial shop.",
          status: "converted",
          priority: "high",
          internalNotes: "Fee paid. Scheduled for Saturday 11:00 AM.",
        },
      ];
      await Lead.insertMany(sampleLeads);
    }

    const filter = {};
    if (status && status !== "all" && status !== "All") {
      filter.status = status.toLowerCase();
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { service: { $regex: search, $options: "i" } },
        { sourcePage: { $regex: search, $options: "i" } },
        { sourceCard: { $regex: search, $options: "i" } },
        { pob: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 }).lean();
    return Response.json(leads.map((l) => ({ ...l, _id: l._id.toString(), id: l._id.toString() })));
  } catch (error) {
    console.error("GET /api/enquiries error:", error);
    return Response.json({ error: "Failed to fetch leads: " + error.message }, { status: 500 });
  }
}

// POST /api/enquiries — Create a new enquiry lead
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, phone, email, gender, service, mode, sourcePage, sourceCard, dob, tob, pob, notes, priority, internalNotes } = body;

    if (!name || !name.trim()) {
      return Response.json({ error: "Client name is required." }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return Response.json({ error: "Phone number is required." }, { status: 400 });
    }

    const lead = await Lead.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || "",
      gender: gender?.trim() || "",
      service: service || "Birth Chart Analysis",
      mode: mode || "In-Person (Ranchi Kendra)",
      sourcePage: sourcePage?.trim() || "/",
      sourceCard: sourceCard?.trim() || "",
      dob: dob || "",
      tob: tob || "",
      pob: pob || "",
      notes: notes || "",
      status: "new",
      priority: priority || "normal",
      internalNotes: internalNotes || "",
    });


    return Response.json(
      { ...lead.toObject(), _id: lead._id.toString(), id: lead._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/enquiries error:", error);
    return Response.json({ error: "Failed to create lead: " + error.message }, { status: 500 });
  }
}
