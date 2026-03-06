import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, Boxes, Target } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Navigation */}
        <header className="w-full h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex items-center justify-between px-6 md:px-12">
          <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Sell Matrix
          </div>
          <nav className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log in</Button>
            <Link href="/dashboard">
              <Button className="rounded-full shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
                Go to Dashboard
              </Button>
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="w-full max-w-6xl px-6 md:px-12 py-24 md:py-32 flex flex-col items-center text-center gap-8 relative overflow-hidden">
          {/* Background Gradient Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 ring-1 ring-inset ring-primary/20">
            Now in Public Beta
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
            Unlock your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">sales potential</span>.
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Sell Matrix is the ultimate command center for modern sales teams. Analyze patterns, forecast revenue, and optimize your conversions like never before.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Button size="lg" className="h-12 px-8 rounded-full text-base gap-2 group shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all">
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base bg-transparent border-border/50 hover:bg-muted/50 transition-colors">
              Book Demo
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl px-6 md:px-12 py-24 border-t border-border/40 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-2">
                Deep dive into your sales metrics with real-time dashboards and predictive AI-driven insights.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                <Boxes className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Inventory Matrix</CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-2">
                Seamlessly cross-reference your product catalogs with dynamic demand forecasting algorithms.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Conversion Engine</CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-2">
                Automate your outreach and supercharge your pipeline with intelligent lead scoring.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/40 py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
        <p>© 2026 Sell Matrix. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">System Status</a>
        </div>
      </footer>
    </div>
  );
}
