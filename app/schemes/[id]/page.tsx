"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  FileText,
  ExternalLink,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Clock,
  Volume2,
  Share,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in real app, this would come from API
const mockSchemeDetails = {
  id: "1",
  name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
  category: "financial-support",
  description:
    "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme launched on 24th February 2019 to provide income support to all landholding farmers' families across the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs.",
  benefits: "₹6,000 per year in three equal installments of ₹2,000 each directly transferred to bank accounts",
  eligibility: [
    "Small and marginal farmers with cultivable land up to 2 hectares",
    "Land ownership documents required",
    "Valid Aadhaar card mandatory",
    "Bank account should be linked with Aadhaar",
    "Farmers should not be income tax payees",
  ],
  documents: [
    "Aadhaar Card (mandatory)",
    "Land Records (Khatauni/Khesra)",
    "Bank Account Details (Passbook)",
    "Mobile Number (for OTP verification)",
    "Passport size photograph",
  ],
  applicationProcess: [
    "Visit the official PM-KISAN website (pmkisan.gov.in)",
    "Click on 'New Farmer Registration' option",
    "Fill the registration form with required details",
    "Upload necessary documents",
    "Submit the application and note down the reference number",
    "Alternatively, visit nearest Common Service Center (CSC)",
  ],
  deadline: "No deadline - Ongoing scheme with continuous registration",
  amount: "₹6,000 per year (₹2,000 per installment)",
  status: "active",
  department: "Ministry of Agriculture & Farmers Welfare, Government of India",
  contactNumber: "155261",
  website: "https://pmkisan.gov.in",
  state: "All India",
  lastUpdated: "2024-01-15",
  installmentSchedule: [
    "1st Installment: April - July",
    "2nd Installment: August - November",
    "3rd Installment: December - March",
  ],
  exclusions: [
    "Institutional landholders",
    "Farmer families holding constitutional posts",
    "Serving/retired employees of Central/State Government",
    "Income tax payees",
    "Professionals like doctors, engineers, lawyers, etc.",
  ],
}

export default function SchemeDetailsPage() {
  const params = useParams()
  const [scheme] = useState(mockSchemeDetails)

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

  const speakSchemeDetails = () => {
    if ("speechSynthesis" in window) {
      const text = `${scheme.name}. ${scheme.description}. Benefits: ${scheme.benefits}. Contact number: ${scheme.contactNumber}`
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "hi-IN"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const shareScheme = () => {
    if (navigator.share) {
      navigator.share({
        title: scheme.name,
        text: scheme.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
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
                <Link href="/schemes">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Schemes
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-foreground">Scheme Details</h1>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={shareScheme}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" variant="outline" onClick={speakSchemeDetails}>
                <Volume2 className="h-4 w-4 mr-2" />
                Listen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Scheme Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{scheme.name}</CardTitle>
                <CardDescription className="text-base">{scheme.department}</CardDescription>
              </div>
              <Badge className={`text-sm ${getStatusColor(scheme.status)}`}>
                {getStatusIcon(scheme.status)}
                <span className="ml-2">{scheme.status}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{scheme.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">{scheme.amount}</p>
                  <p className="text-xs text-muted-foreground">Financial Benefit</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{scheme.deadline}</p>
                  <p className="text-xs text-muted-foreground">Application Deadline</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">{scheme.state}</p>
                  <p className="text-xs text-muted-foreground">Coverage Area</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">Apply Now</Button>
              <Button variant="outline" asChild>
                <Link href={scheme.website} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Official Website
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`tel:${scheme.contactNumber}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{scheme.benefits}</p>

              {scheme.installmentSchedule && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Installment Schedule:</h4>
                  <ul className="text-sm space-y-1">
                    {scheme.installmentSchedule.map((installment, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {installment}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {scheme.eligibility.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {criteria}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {scheme.documents.map((document, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    {document}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Apply</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="text-sm space-y-2">
                {scheme.applicationProcess.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Exclusions */}
        {scheme.exclusions && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Who Cannot Apply</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>The following categories are not eligible for this scheme:</AlertDescription>
              </Alert>
              <ul className="text-sm space-y-1 mt-3">
                {scheme.exclusions.map((exclusion, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-red-600" />
                    {exclusion}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Contact & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Helpline Number</h4>
                <Button variant="outline" asChild>
                  <Link href={`tel:${scheme.contactNumber}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    {scheme.contactNumber}
                  </Link>
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Official Website</h4>
                <Button variant="outline" asChild>
                  <Link href={scheme.website} target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Link>
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(scheme.lastUpdated).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
