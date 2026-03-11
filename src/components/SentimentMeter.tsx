"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface SentimentMeterProps {
    value?: number; // 0 to 100
    title?: string;
    description?: string;
    compact?: boolean;
}

export function SentimentMeter({
    value = 50,
    title = "Customer Sentiment",
    description = "Real-time engagement analysis",
    compact = false
}: SentimentMeterProps) {
    // Use local state to animate to the provided value or simulate real-time data
    const [currentValue, setCurrentValue] = useState(value);

    // Real-time data is now driven directly by the WebSocket store via the value hook

    // Update if prop changes
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    // SVG Gauge calculations
    const radius = 60;
    const circumference = Math.PI * radius; // Half circle
    const strokeDashoffset = circumference - (currentValue / 100) * circumference;

    // Determine color based on value
    const getColor = (val: number) => {
        if (val < 33) return "stroke-destructive"; // Red
        if (val < 66) return "stroke-yellow-500"; // Yellow
        return "stroke-green-500"; // Green
    };

    const statusText = currentValue < 33 ? "Poor" : currentValue < 66 ? "Neutral" : "Excellent";
    const colorClass = getColor(currentValue);

    if (compact) {
        return (
            <div className="flex flex-col items-center justify-center relative w-full pt-1">
                <div className="relative flex items-end justify-center w-[72px] h-[40px] translate-y-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 140 80">
                        <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-muted" />
                        <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" strokeWidth="12" strokeLinecap="round" className={`${colorClass} transition-all duration-1000 ease-in-out`} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
                        <g style={{ transform: `rotate(${currentValue * 1.8}deg)`, transformOrigin: "70px 70px", transition: "transform 1s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                            <polygon points="70,66 70,74 20,70" className="fill-foreground" />
                            <circle cx="70" cy="70" r="6" className="fill-foreground shadow-2xl" />
                            <circle cx="70" cy="70" r="2" className="fill-background" />
                        </g>
                    </svg>
                </div>
                <div className="flex flex-col items-center mt-1">
                    <span className="text-lg font-bold tabular-nums tracking-tighter leading-none">
                        {Math.round(currentValue)}%
                    </span>
                    <span className={`font-medium mt-1 text-[10px] ${colorClass.replace('stroke-', 'text-')}`}>
                        {statusText}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <Card className="bg-card/50 shadow-sm border-border/50 overflow-hidden relative">
            <CardHeader className="pb-0 pt-4 px-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-base">{title}</CardTitle>
                        <CardDescription className="text-xs mt-0.5">{description}</CardDescription>
                    </div>
                    <div className={`p-1.5 rounded-full bg-background border border-border flex items-center justify-center`}>
                        <Activity className={`h-4 w-4 ${currentValue < 33 ? 'text-destructive' : currentValue < 66 ? 'text-yellow-500' : 'text-green-500'}`} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-2 pb-4 flex flex-col items-center justify-center relative">
                <div className="relative w-32 h-20 flex items-end justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 140 80">
                        <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-muted" />
                        <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" strokeWidth="12" strokeLinecap="round" className={`${colorClass} transition-all duration-1000 ease-in-out`} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
                        <g style={{ transform: `rotate(${currentValue * 1.8}deg)`, transformOrigin: "70px 70px", transition: "transform 1s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                            <polygon points="70,66 70,74 20,70" className="fill-foreground" />
                            <circle cx="70" cy="70" r="6" className="fill-foreground shadow-2xl" />
                            <circle cx="70" cy="70" r="2" className="fill-background" />
                        </g>
                    </svg>
                </div>
                <div className="flex flex-col items-center mt-1">
                    <span className="text-2xl font-bold tabular-nums tracking-tighter leading-none">
                        {Math.round(currentValue)}%
                    </span>
                    <span className={`text-xs font-medium mt-1 ${currentValue < 33 ? 'text-destructive' : currentValue < 66 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {statusText}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
