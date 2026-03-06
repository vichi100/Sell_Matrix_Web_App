"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Delete, X } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";

export function DialPad() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const pressTimer = useRef<NodeJS.Timeout | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to end when number gets long
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [phoneNumber]);

    const handleKeyPress = (key: string) => {
        setPhoneNumber((prev) => prev + key);
    };

    const handleDelete = () => {
        setPhoneNumber((prev) => prev.slice(0, -1));
    };

    // Handle long press specifically for '0' to output '+'
    const handlePointerDown = (key: string) => {
        if (key === "0") {
            pressTimer.current = setTimeout(() => {
                handleKeyPress("+");
                pressTimer.current = null; // Clear it so pointerUp knows it was handled
            }, 600); // 600ms = long press
        }
    };

    const handlePointerUp = (key: string) => {
        if (key === "0") {
            if (pressTimer.current) {
                // Timer is still running = short press
                clearTimeout(pressTimer.current);
                handleKeyPress("0");
            }
        } else {
            handleKeyPress(key);
        }
    };

    const handlePointerLeave = () => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    };

    const handleCall = () => {
        if (phoneNumber) {
            alert(`Calling ${phoneNumber}...`);
        }
    };

    const keys = [
        { value: "1", letters: "" },
        { value: "2", letters: "ABC" },
        { value: "3", letters: "DEF" },
        { value: "4", letters: "GHI" },
        { value: "5", letters: "JKL" },
        { value: "6", letters: "MNO" },
        { value: "7", letters: "PQRS" },
        { value: "8", letters: "TUV" },
        { value: "9", letters: "WXYZ" },
        { value: "*", letters: "" },
        { value: "0", letters: "+" },
        { value: "#", letters: "" },
    ];

    return (
        <div className="w-full max-w-[320px] mx-auto p-6 bg-card rounded-3xl shadow-xl border border-border relative">
            {/* Display */}
            <div className="mb-6 flex flex-col items-center justify-center h-16 w-full rounded-2xl bg-muted/20 border border-border/40 select-text cursor-text shadow-sm">
                <div
                    ref={scrollContainerRef}
                    className={`font-normal tracking-wide text-foreground w-full px-4 overflow-x-auto whitespace-nowrap scrollbar-hide py-3 flex items-center justify-center transition-all ${phoneNumber.length > 14 ? 'text-lg' :
                        phoneNumber.length > 10 ? 'text-xl' : 'text-2xl'
                        }`}
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    {phoneNumber || " "}
                </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {keys.map((key) => (
                    <Button
                        key={key.value}
                        variant="ghost"
                        className="h-14 w-14 rounded-full flex flex-col items-center justify-center gap-0 bg-secondary/20 hover:bg-secondary/60 transition-colors mx-auto"
                        onPointerDown={() => handlePointerDown(key.value)}
                        onPointerUp={() => handlePointerUp(key.value)}
                        onPointerLeave={handlePointerLeave}
                    >
                        <span className="text-xl font-medium">{key.value}</span>
                        <span className="text-[9px] text-muted-foreground uppercase font-medium tracking-widest h-2 leading-none mt-0.5">
                            {key.letters}
                        </span>
                    </Button>
                ))}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-3 items-center">
                <div className="flex justify-center">
                    {/* Empty spacer for alignment */}
                </div>
                <div className="flex justify-center">
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 transition-all hover:scale-105"
                        onClick={handleCall}
                    >
                        <Phone className="h-6 w-6 fill-current" />
                    </Button>
                </div>
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
                        onClick={handleDelete}
                        disabled={!phoneNumber}
                    >
                        <Delete className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
