import { type NextRequest, NextResponse } from "next/server"

// Mock scheme details
const mockSchemeDetails = {
  "1": {
    id: "1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "financial-support",
    description:
      "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme launched on 24th February 2019 to provide income support to all landholding farmers' families across the country.",
    benefits: "₹6,000 per year in three equal installments of ₹2,000 each directly transferred to bank accounts",
    eligibility: [
      "Small and marginal farmers with cultivable land up to 2 hectares",
      "Land ownership documents required",
      "Valid Aadhaar card mandatory",
      "Bank account should be linked with Aadhaar",
    ],
    documents: ["Aadhaar Card", "Land Records", "Bank Account Details", "Mobile Number"],
    applicationProcess: [
      "Visit the official PM-KISAN website",
      "Click on 'New Farmer Registration' option",
      "Fill the registration form with required details",
      "Upload necessary documents",
      "Submit the application",
    ],
    deadline: "No deadline - Ongoing scheme",
    amount: "₹6,000 per year",
    status: "active",
    department: "Ministry of Agriculture & Farmers Welfare",
    contactNumber: "155261",
    website: "https://pmkisan.gov.in",
    state: "All India",
    lastUpdated: "2024-01-15",
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const schemeId = params.id
    const scheme = mockSchemeDetails[schemeId as keyof typeof mockSchemeDetails]

    if (!scheme) {
      return NextResponse.json({ error: "Scheme not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: scheme,
    })
  } catch (error) {
    console.error("Scheme details API error:", error)
    return NextResponse.json({ error: "Failed to fetch scheme details" }, { status: 500 })
  }
}
