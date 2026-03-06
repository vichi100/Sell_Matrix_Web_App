"use client";

import React from "react";
import { Clock, Timer, CheckCircle2, Phone, Briefcase, FileText, Wallet, Landmark, Banknote, History, Target, PhoneCall, User, Sparkles, ListTodo, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BuyerActivity() {
    const callHistory = [
        {
            id: 1,
            date: "Today, 10:30 AM",
            start: "10:30 AM",
            duration: "12m 45s",
            end: "10:42 AM",
            probability: 85,
            notes: "Discussed flexible payment options. Buyer showed strong interest in the customized pricing plan."
        },
        {
            id: 2,
            date: "Yesterday, 02:15 PM",
            start: "02:15 PM",
            duration: "08m 20s",
            end: "02:23 PM",
            probability: 60,
            notes: "Initial discovery call. Verified income, job security, and outstanding loan requirements."
        }
    ];

    return (
        <div className="flex flex-col h-full w-full gap-5">
            {/* Buyer Profile Snippet */}
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50 shadow-sm">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground/90">
                    <User className="h-4 w-4 text-primary" />
                    Buyer Intelligence
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-1 whitespace-nowrap bg-background text-muted-foreground shadow-sm">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span>+1 (555) 019-2834</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-1 whitespace-nowrap bg-background text-muted-foreground shadow-sm">
                        <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                        <span>Software Engineer</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-1 whitespace-nowrap bg-background text-muted-foreground shadow-sm">
                        <FileText className="w-3.5 h-3.5 text-amber-500" />
                        <span>CIBIL: 785</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-1 whitespace-nowrap bg-background text-muted-foreground shadow-sm">
                        <Wallet className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Apx Sal: ₹85,000/mo</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-1 whitespace-nowrap bg-background text-muted-foreground shadow-sm">
                        <Landmark className="w-3.5 h-3.5 text-rose-500" />
                        <span>Total Loan: ₹12,50,000</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-1 whitespace-nowrap bg-background text-muted-foreground shadow-sm">
                        <Banknote className="w-3.5 h-3.5 text-purple-500" />
                        <span>Outstanding: ₹8,20,000</span>
                    </Badge>
                </div>
            </div>

            {/* AI Call Summary & Next Steps */}
            <div className="flex flex-col gap-4 bg-muted/20 border border-primary/20 rounded-lg p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />

                <div className="flex flex-col gap-3 relative z-10">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground/90">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        AI Call Summary
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm text-muted-foreground ml-1">
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>Verified income and job security (Software Engineer, ₹85,000/mo).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>Confirmed total outstanding loan amount is ₹8,20,000 out of ₹12,50,000.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>High CIBIL score (785) indicates excellent creditworthiness.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>Buyer expressed strong interest in customized pricing plans during the latest call.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>Deal closing probability is tracking high at 85% due to positive engagement.</span>
                        </li>
                    </ul>
                </div>

                <div className="h-px w-full bg-border/50" />

                <div className="flex flex-col gap-3 relative z-10">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground/90">
                        <ListTodo className="h-4 w-4 text-blue-500" />
                        Next Steps to Close Deal
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm text-muted-foreground ml-1">
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>Propose a customized EMI plan tailored to their ₹85k/mo salary bracket.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>Emphasize the ease of transferring their ₹8.2L outstanding balance with zero processing fees.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>Share the interactive demo link discussed to lock in the commitment.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Call Reports */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-1">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground/80 sticky top-0 bg-card py-1 z-10">
                    <History className="h-4 w-4" />
                    Call Reports ({callHistory.length})
                </h3>

                {callHistory.map(call => (
                    <div key={call.id} className="bg-card border border-border/80 rounded-lg p-4 shadow-sm relative overflow-hidden group hover:border-primary/40 transition-colors">
                        {/* Status bar left */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 to-indigo-500/50" />

                        <div className="flex justify-between items-start mb-4 pl-2">
                            <span className="text-sm font-medium flex items-center gap-2">
                                <PhoneCall className="h-3.5 w-3.5 text-muted-foreground" />
                                {call.date}
                            </span>

                            {/* Deal Closing Probability */}
                            <div className="flex flex-col items-end gap-1.5">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider flex items-center gap-1">
                                    <Target className="w-3 h-3 text-primary" />
                                    Deal Closing Probability
                                </span>
                                <div className="flex items-center gap-2 w-32">
                                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 ${call.probability >= 80 ? 'bg-emerald-500' : call.probability >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                            style={{ width: `${call.probability}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-primary w-8 text-right">{call.probability}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Call Metrics Area (Re-using identical styling from Transcript) */}
                        <div className="flex justify-start text-xs mb-4 pl-2">
                            <div className="flex bg-muted/40 rounded-md border border-border/40 p-1 gap-1 w-max">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 rounded shadow-sm">
                                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                                    <div className="flex flex-col items-start justify-center">
                                        <span className="font-medium text-foreground leading-none mb-1">{call.start}</span>
                                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground leading-none">Start</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 rounded shadow-sm">
                                    <Timer className="w-3.5 h-3.5 text-amber-500" />
                                    <div className="flex flex-col items-start justify-center">
                                        <span className="font-medium text-foreground leading-none mb-1">{call.duration}</span>
                                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground leading-none">Duration</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 rounded shadow-sm">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    <div className="flex flex-col items-start justify-center">
                                        <span className="font-medium text-foreground leading-none mb-1">{call.end}</span>
                                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground leading-none">End</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="pl-2">
                            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-md border border-border/30">
                                {call.notes}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
