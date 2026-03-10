"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Timer, CheckCircle2, Phone, User, Users } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DialPad } from "@/components/DialPad";
import { CallList } from "@/components/CallList";
import { useCallStore } from "@/store/useCallStore";

export function LiveTranscript() {
    const transcript = useCallStore((state) => state.transcript);

    return (
        <Card className="bg-card/50 shadow-sm border-border/50 overflow-hidden h-full flex flex-col relative w-full">
            <CardHeader className="flex flex-col gap-4 border-b border-border/20 pb-4">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <CardTitle className="text-sm font-medium tracking-wide flex items-center gap-3">
                            Live Transcript
                            <div className="h-[1px] w-12 bg-border/60" />
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1.5 px-2 py-0 text-xs whitespace-nowrap bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                <User className="w-3 h-3" />
                                <span>Alex Johnson</span>
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1.5 px-2 py-0 text-xs whitespace-nowrap bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                <Phone className="w-3 h-3" />
                                <span>+1 (555) 019-2834</span>
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 self-start xl:self-auto">
                        {/* Call List Button */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-muted/50 transition-colors">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span className="sr-only">Call List</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[650px] bg-card border-border p-0 overflow-hidden shadow-2xl">
                                <DialogTitle className="sr-only">Buyer Pipeline</DialogTitle>
                                <CallList />
                            </DialogContent>
                        </Dialog>

                        {/* Dial Pad Modal */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-muted/50 transition-colors">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="sr-only">Open Dial Pad</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[320px] bg-transparent border-none p-0 overflow-hidden shadow-2xl">
                                <DialPad />
                            </DialogContent>
                        </Dialog>

                        {/* Status Dots */}
                        <div className="flex gap-1 ml-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        </div>
                    </div>
                </div>

                {/* Call Metrics Area */}
                <div className="flex justify-start text-xs w-full overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex bg-card/60 rounded-md border border-border/40 p-1 gap-1 w-max shrink-0">
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-background/80 rounded shadow-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-medium text-foreground leading-none mb-1">10:30 AM</span>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">Start</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-background/80 rounded shadow-sm">
                            <Timer className="w-4 h-4 text-amber-500" />
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-medium text-foreground leading-none mb-1">12m 45s</span>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">Duration</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-background/80 rounded shadow-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-medium text-foreground leading-none mb-1">10:42 AM</span>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">End</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
                <div className="flex flex-col">
                    {transcript.map((item, i) => (
                        <div
                            key={i}
                            className={`px-6 py-3 border-b border-border/10 last:border-0 transition-colors ${item.speaker === "Agent"
                                ? "bg-blue-500/5 hover:bg-blue-500/10"
                                : "hover:bg-muted/10"
                                }`}
                        >
                            <p className="text-sm leading-relaxed">
                                <span className={`font-semibold ${item.speaker === "Agent"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-emerald-600 dark:text-emerald-400"
                                    }`}>
                                    {item.speaker}:
                                </span>{" "}
                                <span className="text-foreground/80">{item.text}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
