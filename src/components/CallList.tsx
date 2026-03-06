"use client";

import React from "react";
import { Phone, Briefcase, FileText, Wallet, Landmark, Banknote, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockBuyers = [
    {
        id: 1,
        name: "Alex Johnson",
        phone: "+1 (555) 019-2834",
        job: "Software Engineer",
        cibil: 785,
        salary: "₹85,000/mo",
        loan: "₹12,50,000",
        outstanding: "₹8,20,000",
        status: "active"
    },
    {
        id: 2,
        name: "Priya Sharma",
        phone: "+91 98765 43210",
        job: "Marketing Director",
        cibil: 810,
        salary: "₹1,20,000/mo",
        loan: "₹25,00,000",
        outstanding: "₹21,50,000",
        status: "pending"
    },
    {
        id: 3,
        name: "Michael Chen",
        phone: "+1 (555) 837-9921",
        job: "UX Designer",
        cibil: 710,
        salary: "₹65,000/mo",
        loan: "₹8,50,000",
        outstanding: "₹1,20,000",
        status: "completed"
    },
    {
        id: 4,
        name: "Sarah Connor",
        phone: "+1 (555) 123-4567",
        job: "Data Analyst",
        cibil: 650,
        salary: "₹45,000/mo",
        loan: "₹5,00,000",
        outstanding: "₹4,50,000",
        status: "pending"
    }
];

export function CallList() {
    return (
        <div className="flex flex-col w-full bg-card">
            <div className="p-5 border-b border-border/40 bg-muted/20">
                <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Buyer Pipeline
                </h2>
                <p className="text-xs text-muted-foreground mt-1">4 buyers currently waiting in queue</p>
            </div>

            <div className="flex flex-col max-h-[60vh] overflow-y-auto divide-y divide-border/20" style={{ scrollbarWidth: 'thin' }}>
                {mockBuyers.map((buyer) => (
                    <div key={buyer.id} className="p-5 hover:bg-muted/30 transition-colors cursor-pointer flex flex-col gap-3 group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0 ${buyer.status === 'active' ? 'bg-emerald-500 shadow-emerald-500/50' : buyer.status === 'pending' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-blue-500 shadow-blue-500/50'}`} />
                                <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">{buyer.name}</h3>
                            </div>
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-md w-fit">
                                <Phone className="w-3.5 h-3.5" />
                                {buyer.phone}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] whitespace-nowrap bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                <Briefcase className="w-3.5 h-3.5" />
                                {buyer.job}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] whitespace-nowrap bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                <FileText className="w-3.5 h-3.5" />
                                CIBIL: {buyer.cibil}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] whitespace-nowrap bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                <Wallet className="w-3.5 h-3.5" />
                                Apx Sal: {buyer.salary}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] whitespace-nowrap bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                                <Landmark className="w-3.5 h-3.5" />
                                Total Loan: {buyer.loan}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] whitespace-nowrap bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                <Banknote className="w-3.5 h-3.5" />
                                Outstanding: {buyer.outstanding}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
