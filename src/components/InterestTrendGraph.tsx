"use client";

import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const data = [
    { time: "Call Start", value: 50 },
    { time: "t1", value: 48 },
    { time: "t2", value: 55 },
    {
        time: "t3",
        value: 68,
        event: { type: "positive", score: "+15", text: "Asked About Pricing" },
    },
    { time: "t4", value: 62 },
    { time: "t5", value: 72 },
    {
        time: "t6",
        value: 52,
        event: { type: "negative", score: "-10", text: "Hesitation Noted" },
    },
    { time: "t7", value: 53 },
    {
        time: "t8",
        value: 71,
        event: { type: "positive", score: "+12", text: "Requested a Demo" },
    },
    { time: "t9", value: 65 },
    { time: "t10", value: 85 },
    { time: "t11", value: 81 },
    { time: "Now", value: 92, event: { type: "success" } },
];

const CustomizedDot = (props: any) => {
    const { cx, cy, payload } = props;

    // Render nothing if no cx/cy
    if (cx == null || cy == null) return null;

    // Determine dot color based on value / event
    let dotColor = "#fbbf24"; // yellow warning by default for mid
    if (payload.value >= 70 || payload.event?.type === "positive" || payload.event?.type === "success") {
        dotColor = "#4ade80"; // green
    } else if (payload.value <= 55 || payload.event?.type === "negative") {
        dotColor = "#f87171"; // red
    }

    // Common inner dot style (yellowish glow/white depending on image)
    const isEvent = !!payload.event;

    return (
        <g>
            {/* Outer Glow / Base Dot */}
            {isEvent && (
                <circle cx={cx} cy={cy} r={8} fill={dotColor} fillOpacity={0.3} />
            )}
            <circle cx={cx} cy={cy} r={isEvent ? 5 : 4} fill={dotColor} stroke="#fff" strokeWidth={1.5} />

            {/* Persistent tooltips for events */}
            {payload.event && payload.event.type !== "success" && (
                <g>
                    {/* The Badge logic using raw SVG rendering for positioning */}
                    <foreignObject x={cx - 100} y={cy - (payload.event.type === 'negative' ? -15 : 45)} width="200" height="40" className="overflow-visible">
                        <div
                            className="flex items-center justify-center w-max bg-card/90 backdrop-blur-sm border border-border shadow-lg rounded-md px-2 py-1 text-xs"
                            style={{
                                transform: "translateX(calc(-50% + 100px))", // center it
                            }}
                        >
                            <span
                                className={`font-bold mr-1.5 ${payload.event.type === "positive" ? "text-green-500" : "text-red-500"}`}
                            >
                                {payload.event.score}
                            </span>
                            <span className="text-foreground/90 font-medium">
                                {payload.event.text}
                            </span>

                            {/* The triangle pointer */}
                            <div
                                className={`absolute w-2 h-2 bg-card/90 border-r border-b border-border transform rotate-45 ${payload.event.type === 'negative' ? '-top-1 left-1/2 -translate-x-1/2 rotate-[-135deg]' : '-bottom-1 left-1/2 -translate-x-1/2'}`}
                            />
                        </div>
                    </foreignObject>
                </g>
            )}

            {payload.event && payload.event.type === "success" && (
                <foreignObject x={cx - 12} y={cy - 12} width="24" height="24">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/50">
                        <Check className="w-4 h-4" strokeWidth={3} />
                    </div>
                </foreignObject>
            )}
        </g>
    );
};

export function InterestTrendGraph() {
    return (
        <Card className="col-span-1 border-border/50 bg-card/40 backdrop-blur-md shadow-xl overflow-hidden relative">
            <CardHeader className="flex flex-row items-center border-b border-border/20 pb-4">
                <CardTitle className="text-sm font-medium tracking-wide flex items-center gap-3">
                    Interest Trend Over Time
                    <div className="h-[1px] w-12 bg-border/60" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="h-[220px] w-full mt-4 pr-6 pb-2 pl-[-10px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                {/* Background Area Gradient */}
                                <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.15} />
                                    <stop offset="35%" stopColor="#fbbf24" stopOpacity={0.15} />
                                    <stop offset="55%" stopColor="#f87171" stopOpacity={0.15} />
                                    <stop offset="80%" stopColor="#4ade80" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.3} />
                                </linearGradient>

                                {/* Line Gradient to mimic varying colors on the track */}
                                <linearGradient id="lineColor" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#4ade80" />     {/* Green Start */}
                                    <stop offset="30%" stopColor="#fbbf24" />    {/* Yellowish */}
                                    <stop offset="50%" stopColor="#f87171" />    {/* Red Dip */}
                                    <stop offset="70%" stopColor="#fbbf24" />    {/* Yellowish Recover */}
                                    <stop offset="85%" stopColor="#4ade80" />    {/* Green High */}
                                    <stop offset="100%" stopColor="#22c55e" />   {/* Green Bright */}
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={true}
                                horizontal={true}
                                stroke="hsl(var(--border))"
                                strokeOpacity={0.4}
                            />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                ticks={["Call Start", "Now"]} // Only show first and last to mimic image mapping
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                tickFormatter={(val) => `${val}%`}
                                // Fixed domain 0-100 given it's interest percentage
                                domain={[0, 100]}
                                ticks={[0, 40, 60, 80, 100]} // Similar tick distribution
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="url(#lineColor)"
                                strokeWidth={3}
                                fill="url(#colorValue)"
                                activeDot={false}
                                dot={<CustomizedDot />}
                                isAnimationActive={true}
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
