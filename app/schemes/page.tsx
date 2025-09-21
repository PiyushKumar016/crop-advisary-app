"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  IndianRupee,
  FileText,
  ExternalLink,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Volume2,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

interface GovernmentScheme {
  id: string
  name: string
  category: string
  description: string
  benefits: string
  eligibility: string[]
  documents: string[]
  applicationProcess: string
  deadline: string
  amount: string
  status: "active" | "upcoming" | "closed"
  department: string
  contactNumber: string
  website: string
  state: string
  lastUpdated: string
}

const mockSchemes: GovernmentScheme[] = [
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
  {
    id: "3",
    name: "Soil Health Card Scheme",
    category: "technical-support",
    description:
      "Provides soil health cards to farmers with information on nutrient status of their soil and recommendations on appropriate dosage of nutrients.",
    benefits: "Free soil testing and customized fertilizer recommendations",
    eligibility: ["All farmers with agricultural land", "One card per 2.5 acres of land"],
    documents: ["Land Records", "Aadhaar Card", "Contact Details"],
    applicationProcess: "Contact local agriculture extension officer or soil testing laboratory",
    deadline: "No deadline - Ongoing scheme",
    amount: "Free of cost",
    status: "active",
    department: "Ministry of Agriculture & Farmers Welfare",
    contactNumber: "18001801551",
    website: "https://soilhealth.dac.gov.in",
    state: "All India",
    lastUpdated: "2024-01-18",
  },
  {
    id: "4",
    name: "Kisan Credit Card (KCC)",
    category: "credit-support",
    description:
      "Provides adequate and timely credit support for comprehensive credit requirements of farmers for cultivation and other needs.",
    benefits: "Credit limit up to ₹3 lakh without collateral, low interest rates",
    eligibility: [
      "All farmers - individual/joint borrowers who are owner cultivators",
      "Tenant farmers, oral lessees, and sharecroppers",
      "Self Help Group members or Joint Liability Group members",
    ],
    documents: ["Application Form", "Identity Proof", "Address Proof", "Land Documents"],
    applicationProcess: "Apply at nearest bank branch or through online banking",
    deadline: "No deadline - Ongoing scheme",
    amount: "Up to ₹3 lakh without collateral",
    status: "active",
    department: "Ministry of Agriculture & Farmers Welfare",
    contactNumber: "18001801551",
    website: "https://www.nabard.org",
    state: "All India",
    lastUpdated: "2024-01-22",
  },
  {
    id: "5",
    name: "National Agriculture Market (e-NAM)",
    category: "market-support",
    description:
      "Online trading platform for agricultural commodities to provide better price discovery and transparent auction process.",
    benefits: "Better price realization, reduced transaction costs, online payment",
    eligibility: ["All farmers selling in APMC markets", "Registered traders and commission agents"],
    documents: ["Registration at local APMC", "Bank Account Details", "Mobile Number"],
    applicationProcess: "Register at e-NAM portal or through local APMC",
    deadline: "No deadline - Ongoing platform",
    amount: "No fees for farmers",
    status: "active",
    department: "Ministry of Agriculture & Farmers Welfare",
    contactNumber: "18001801551",
    website: "https://enam.gov.in",
    state: "All India",
    lastUpdated: "2024-01-25",
  },
  {
    id: "6",
    name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    category: "irrigation",
    description:
      "Dedicated irrigation scheme to expand cultivated area with assured irrigation, improve water use efficiency, and introduce sustainable water conservation practices.",
    benefits: "Subsidy for drip/sprinkler irrigation, water conservation structures",
    eligibility: [
      "All categories of farmers",
      "Minimum 0.5 hectare land holding",
      "Water source availability required",
    ],
    documents: ["Land Records", "Water Source Certificate", "Bank Account Details", "Aadhaar Card"],
    applicationProcess: "Apply through state agriculture department or online portal",
    deadline: "March 31, 2024",
    amount: "Up to 55% subsidy for general farmers",
    status: "active",
    department: "Ministry of Agriculture & Farmers Welfare",
    contactNumber: "18001801551",
    website: "https://pmksy.gov.in",
    state: "All India",
    lastUpdated: "2024-01-10",
  },
]

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>(mockSchemes)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedState, setSelectedState] = useState("all")

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "financial-support", label: "Financial Support" },
    { value: "insurance", label: "Insurance" },
    { value: "credit-support", label: "Credit Support" },
    { value: "technical-support", label: "Technical Support" },
    { value: "market-support", label: "Market Support" },
    { value: "irrigation", label: "Irrigation" },
  ]

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "upcoming", label: "Upcoming" },
    { value: "closed", label: "Closed" },
  ]

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || scheme.status === selectedStatus
    const matchesState = selectedState === "all" || scheme.state === selectedState
    return matchesSearch && matchesCategory && matchesStatus && matchesState
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      case "closed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const speakSchemeDetails = (scheme: GovernmentScheme) => {
    if ("speechSynthesis" in window) {
      const text = `${scheme.name}. ${scheme.description}. Benefits: ${scheme.benefits}. Contact number: ${scheme.contactNumber}`
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "hi-IN"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-foreground">Government Schemes</h1>
            </div>
            <Badge variant="outline">{filteredSchemes.length} Schemes Available</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Schemes</TabsTrigger>
            <TabsTrigger value="applied">My Applications</TabsTrigger>
            <TabsTrigger value="help">Help & Support</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search schemes by name, description, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
                        <CardDescription className="text-sm">{scheme.department}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`text-xs ${getStatusColor(scheme.status)}`}>
                          {getStatusIcon(scheme.status)}
                          <span className="ml-1">{scheme.status}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {categories.find((c) => c.value === scheme.category)?.label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{scheme.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Benefits:</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">{scheme.benefits}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Deadline:</span>
                        <span className="text-sm">{scheme.deadline}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {scheme.state}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => speakSchemeDetails(scheme)}
                          className="text-xs"
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/schemes/${scheme.id}`}>
                            <FileText className="h-3 w-3 mr-1" />
                            Details
                          </Link>
                        </Button>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSchemes.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No schemes found matching your criteria.</p>
                  <Button className="mt-4" onClick={() => setSearchTerm("")}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applied" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track your scheme applications and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't applied to any schemes yet.</p>
                  <Button asChild>
                    <Link href="#browse">Browse Available Schemes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Helpline Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">PM-KISAN Helpline</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="tel:155261">155261</Link>
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Crop Insurance</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="tel:18001801551">18001801551</Link>
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Kisan Call Center</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="tel:18001801551">18001801551</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Useful Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="https://pmkisan.gov.in" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      PM-KISAN Portal
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="https://pmfby.gov.in" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Crop Insurance Portal
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="https://enam.gov.in" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      e-NAM Platform
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">How do I check my PM-KISAN status?</h4>
                  <p className="text-sm text-muted-foreground">
                    Visit pmkisan.gov.in and use the "Beneficiary Status" option with your Aadhaar number or mobile
                    number.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">What documents are required for crop insurance?</h4>
                  <p className="text-sm text-muted-foreground">
                    You need Aadhaar card, land records, sowing certificate, and bank account details for PMFBY
                    registration.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">How to get a Kisan Credit Card?</h4>
                  <p className="text-sm text-muted-foreground">
                    Visit your nearest bank branch with land documents, identity proof, and address proof to apply for
                    KCC.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
