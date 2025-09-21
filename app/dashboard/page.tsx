"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sprout, MessageSquare, ShoppingCart, TrendingUp, Users, Sun, ArrowRight, Bell } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function DashboardPage() {
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
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{t("welcomeBack")}</p>
                  <p className="text-xs text-muted-foreground">Rajesh Kumar</p>
                </div>
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">RK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("todaysWeather")}</CardTitle>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Sun className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">28°C</div>
              <p className="text-sm text-muted-foreground">Sunny, Perfect for farming</p>
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">↗ +2°C from yesterday</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("activeListings")}</CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">3</div>
              <p className="text-sm text-muted-foreground">Products in marketplace</p>
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">+1 new this week</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("monthlyRevenue")}</CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹12,500</div>
              <p className="text-sm text-muted-foreground">This month's earnings</p>
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">↗ +15% from last month</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("aiInteractions")}</CardTitle>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">24</div>
              <p className="text-sm text-muted-foreground">Questions this week</p>
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">+8 from last week</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">AI Assistant</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Ask questions about farming, get instant voice responses powered by advanced AI
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full group">
                <Link href="/ai-assistant" className="flex items-center justify-center gap-2">
                  Start Conversation
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Marketplace</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Sell your crops directly to buyers, manage orders and track your sales performance
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full group">
                <Link href="/marketplace" className="flex items-center justify-center gap-2">
                  View Marketplace
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Smart Advisory</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Get weather updates, crop health insights, and personalized farming recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full group">
                <Link href="/advisory" className="flex items-center justify-center gap-2">
                  View Advisory
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Government Schemes</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Browse available schemes, subsidies, and support programs with easy application tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full group">
                <Link href="/schemes" className="flex items-center justify-center gap-2">
                  Browse Schemes
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">My Farm</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Manage your farm details, track crop progress, and monitor farming activities
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full group">
                <Link href="/farm" className="flex items-center justify-center gap-2">
                  Manage Farm
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-xl">Community</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Connect with other farmers, share experiences, tips, and learn from the community
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full group">
                <Link href="/community" className="flex items-center justify-center gap-2">
                  Join Community
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg animate-scale-in">
          <CardHeader>
            <CardTitle className="text-xl">{t("recentActivity")}</CardTitle>
            <CardDescription>Your latest farming activities and important updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Asked about wheat disease prevention</p>
                  <p className="text-sm text-muted-foreground">Got comprehensive advice on fungal treatments</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Listed 50kg premium basmati rice</p>
                  <p className="text-sm text-muted-foreground">₹2,500 per quintal • 3 interested buyers</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Received weather advisory alert</p>
                  <p className="text-sm text-muted-foreground">Heavy rainfall expected next week - take precautions</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
