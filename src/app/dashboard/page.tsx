import { LiveTranscript } from "@/components/LiveTranscript";
import { InterestTrendGraph } from "@/components/InterestTrendGraph";
import { SentimentMeter } from "@/components/SentimentMeter";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Clock, Settings, Target } from "lucide-react";
import { BuyerActivity } from "@/components/BuyerActivity";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-background text-foreground">
            {/* Dashboard Header */}
            <header className="w-full h-16 border-b border-border/40 bg-card/50 backdrop-blur sticky top-0 z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                        Sell Matrix
                    </Link>
                    <span className="text-sm text-muted-foreground hidden sm:inline-block px-2">/ Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-sm font-medium text-primary">
                        JS
                    </div>
                </div>
            </header>

            {/* Main Dashboard Content */}
            <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 flex flex-col lg:flex-row gap-6 h-[calc(100vh-4rem)] overflow-hidden">

                {/* Left Column (Main Content that fits on screen) */}
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-6">
                    {/* Top Row: Live Analytics */}
                    <div className="w-full flex flex-col gap-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h2 className="text-lg font-bold tracking-tight">Live Analytics</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <SentimentMeter
                                value={45}
                                title="Customer Sentiment"
                                description="Real-time mood analysis"
                            />
                            <SentimentMeter
                                value={82}
                                title="Purchase Intent"
                                description="Likelihood to convert"
                            />
                        </div>
                    </div>

                    {/* Interest Trend Graph */}
                    <div className="w-full mt-1 shrink-0">
                        <InterestTrendGraph />
                    </div>

                    {/* Quick Stats & Activity (Flexible Space) */}
                    <div className="flex flex-col gap-3 mt-2 h-auto">
                        <h2 className="text-lg font-bold tracking-tight">Overview & Activity</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card className="bg-card/50 shadow-sm border-border/50">
                                <CardHeader className="pb-2">
                                    <CardDescription>Calls Made</CardDescription>
                                    <CardTitle className="text-2xl flex items-center gap-2">
                                        42 <PhoneCall className="h-4 w-4 text-green-500" />
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="bg-card/50 shadow-sm border-border/50">
                                <CardHeader className="pb-2">
                                    <CardDescription>Probability Range</CardDescription>
                                    <CardTitle className="text-2xl flex items-center gap-2">
                                        60-85% <Target className="h-4 w-4 text-blue-500" />
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="bg-card/50 shadow-sm border-border/50">
                                <CardHeader className="pb-2">
                                    <CardDescription>Talk Time</CardDescription>
                                    <CardTitle className="text-2xl flex items-center gap-2">
                                        2.4h <Clock className="h-4 w-4 text-orange-500" />
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Main Activity Area */}
                        <div className="flex-1 mt-2 mb-2 min-h-[300px]">
                            <BuyerActivity />
                        </div>
                    </div>
                </div>

                {/* Right Column (Live Transcript) */}
                <div className="w-full lg:w-[420px] flex flex-col overflow-y-auto pb-6">
                    <LiveTranscript />
                </div>
            </main>
        </div>
    );
}
