"use client";

import { useEffect } from "react";
import { LiveTranscript } from "@/components/LiveTranscript";
import { InterestTrendGraph } from "@/components/InterestTrendGraph";
import { SentimentMeter } from "@/components/SentimentMeter";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Clock, Settings, Target } from "lucide-react";
import { BuyerActivity } from "@/components/BuyerActivity";
import { useCallStore } from "@/store/useCallStore";
import Link from "next/link";

export default function Dashboard() {
    const connectSocket = useCallStore((state) => state.connectSocket);
    const disconnectSocket = useCallStore((state) => state.disconnectSocket);
    const startSimulation = useCallStore((state) => state.startSimulation);
    const stopSimulation = useCallStore((state) => state.stopSimulation);
    const customerSentiment = useCallStore((state) => state.customerSentiment);
    const purchaseIntent = useCallStore((state) => state.purchaseIntent);
    const isConnected = useCallStore((state) => state.isConnected);
    const connectionError = useCallStore((state) => state.connectionError);

    useEffect(() => {
        // Automatically connect to backend telemetry when dashboard mounts
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
        connectSocket(socketUrl);

        // To ensure the dashboard always looks alive for demo purposes,
        // we start a local client-side heartbeat simulation that mimics backend payloads
        const useSimulator = process.env.NEXT_PUBLIC_USE_SIMULATOR === 'true';
        if (useSimulator) {
            startSimulation();
        }

        return () => {
            disconnectSocket();
            if (useSimulator) {
                stopSimulation();
            }
        };
    }, [connectSocket, disconnectSocket, startSimulation, stopSimulation]);

    return (
        <div className="flex min-h-screen flex-col font-sans bg-background text-foreground">
            {/* Dashboard Header */}
            <header className="w-full h-16 border-b border-border/40 bg-card/50 backdrop-blur sticky top-0 z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                        Sell Matrix
                    </Link>
                    <span className="text-sm text-muted-foreground hidden sm:inline-block px-2">/ Dashboard</span>
                    {isConnected ? (
                        <div className="ml-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5 transition-all">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Live Backend Connected</span>
                        </div>
                    ) : (
                        <div className="ml-2 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center gap-1.5" title={connectionError || "Socket Disconnected"}>
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span className="text-xs font-medium text-red-600 dark:text-red-400 max-w-[250px] truncate">
                                {connectionError || "Socket Disconnected"}
                            </span>
                        </div>
                    )}
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
            <main className="flex-1 w-full max-w-[1600px] mx-auto p-2 sm:p-4 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:h-[calc(100vh-4rem)] lg:overflow-hidden h-auto overflow-y-auto">

                {/* Left Column (Main Content that fits on screen) */}
                <div className="flex-1 flex flex-col gap-4 lg:overflow-y-auto pr-0 lg:pr-2 pb-6">
                    {/* Top Row: Live Analytics */}
                    <div className="w-full flex flex-col gap-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h2 className="text-lg font-bold tracking-tight">Live Analytics</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <SentimentMeter
                                value={customerSentiment}
                                title="Customer Sentiment"
                                description="Real-time mood analysis"
                            />
                            <SentimentMeter
                                value={purchaseIntent}
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
                <div className="w-full lg:w-[420px] shrink-0 flex flex-col lg:overflow-y-auto pb-6 h-[500px] lg:h-auto border-t lg:border-t-0 pt-6 lg:pt-0 border-border/20">
                    <LiveTranscript />
                </div>
            </main>
        </div>
    );
}
