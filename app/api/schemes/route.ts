import { type NextRequest, NextResponse } from "next/server"

// Mock schemes database
const mockSchemes = [
  {
    id: "1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "financial-support",
    description:
      "Direct income support scheme providing financial assistance to small and marginal farmers across the country.",
    benefits: "₹6,000 per year in three equal installments of ₹2,000 each",
    eligibility: [
      "Small and marginal farmers with cultivable land up to 2 hectares",
      "Land ownership documents required",
      "Valid Aadhaar card mandatory",
    ],
    documents: ["Aadhaar Card", "Land Records", "Bank Account Details", "Mobile Number"],
    applicationProcess: "Apply online through PM-KISAN portal or visit nearest Common Service Center",
    deadline: "No deadline - Ongoing scheme",
    amount: "₹6,000 per year",
    status: "active",
    department: "Ministry of Agriculture & Farmers Welfare",
    contactNumber: "155261",
    website: "https://pmkisan.gov.in",
    state: "All India",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "insurance",
    description:
      "Crop insurance scheme providing financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
    benefits: "Insurance coverage for crop loss due to natural calamities, pests, and diseases",
    eligibility: [
      "All farmers growing notified crops in notified areas",
      "Sharecroppers and tenant farmers eligible",
      "Both loanee and non-loanee farmers can apply",
    ],
    documents: ["Aadhaar Card", "Land Records", "Sowing Certificate", "Bank Account Details"],
    applicationProcess: "Apply through banks, insurance companies, or online portal",
    deadline: "Within 2 weeks of sowing",
    amount: "Premium: 2% for Kharif, 1.5% for Rabi crops",
    status: "active",
    department: "Ministry of Agriculture & Farmers Welfare",
    contactNumber: "18001801551",
    website: "https://pmfby.gov.in",
    state: "All India",
    lastUpdated: "2024-01-20",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let filteredSchemes = [...mockSchemes]

    // Filter by category
    if (category && category !== "all") {
      filteredSchemes = filteredSchemes.filter((scheme) => scheme.category === category)
    }

    // Filter by status
    if (status && status !== "all") {
      filteredSchemes = filteredSchemes.filter((scheme) => scheme.status === status)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredSchemes = filteredSchemes.filter(
        (scheme) =>
          scheme.name.toLowerCase().includes(searchLower) ||
          scheme.description.toLowerCase().includes(searchLower) ||
          scheme.department.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredSchemes,
    })
  } catch (error) {
    console.error("Schemes API error:", error)
    return NextResponse.json({ error: "Failed to fetch schemes" }, { status: 500 })
  }
}
