"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, Users, MessageSquare, TrendingUp, Mic, Globe, ArrowRight, Sparkles } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">KisanSeva</h1>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button variant="ghost" asChild className="hover:bg-primary/5">
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button asChild className="shadow-glow">
                <Link href="/register">{t("getStarted")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto text-center relative">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              {t("heroSubtitle")}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 text-balance leading-tight">
              {t("heroTitle").split(" ").slice(0, 2).join(" ")}
              <span className="gradient-text block">{t("heroTitle").split(" ").slice(2).join(" ")}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
              {t("heroDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button size="lg" asChild className="shadow-glow group">
                <Link href="/register" className="flex items-center gap-2">
                  {t("startJourney")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="hover:bg-primary/5 bg-transparent">
                <Link href="/demo">{t("watchDemo")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl font-bold mb-4 text-foreground">{t("featuresTitle")}</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("featuresSubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("voiceAssistant")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("voiceAssistantDesc")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("marketAccess")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("marketAccessDesc")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("smartAdvisory")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("smartAdvisoryDesc")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("multilingual")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("multilingualDesc")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("governmentSchemes")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("governmentSchemesDesc")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("mobileFirst")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("mobileFirstDesc")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
        <div className="container mx-auto text-center relative">
          <Card className="max-w-3xl mx-auto border-0 shadow-2xl shadow-primary/10 animate-scale-in">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">{t("ctaTitle")}</CardTitle>
              <CardDescription className="text-xl leading-relaxed">{t("ctaDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button size="lg" asChild className="shadow-glow group">
                <Link href="/register" className="flex items-center gap-2">
                  {t("startJourney")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Free to start • No credit card required • Available in your language
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sprout className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">KisanSeva</span>
            </div>
            <p className="text-muted-foreground text-lg max-w-md">{t("footerTagline")}</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="hover:text-primary transition-colors">
                Support
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
