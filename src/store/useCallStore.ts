import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export interface TrendDataPoint {
    time: string;
    value: number;
    event?: {
        type: "positive" | "negative" | "success" | "neutral";
        score?: string;
        text?: string;
    };
}

export interface TranscriptMessage {
    speaker: string;
    text: string;
}

interface CallStore {
    socket: Socket | null;
    activeCallId: string | null;
    customerSentiment: number;
    purchaseIntent: number;
    trendGraph: TrendDataPoint[];
    transcript: TranscriptMessage[];
    isConnected: boolean;
    connectionError: string | null;
    simulationInterval: NodeJS.Timeout | null;
    connectSocket: (url: string) => void;
    disconnectSocket: () => void;
    setActiveCallId: (id: string) => void;
    startSimulation: () => void;
    stopSimulation: () => void;
}

// Initial mock data to ensure dashboard looks great even without a backend running
const INITIAL_TRANSCRIPT: TranscriptMessage[] = [
    { speaker: "Agent", text: "We have flexible payment options available." },
    { speaker: "Buyer", text: "Hmm, can you tell me more about the pricing?" },
    { speaker: "Agent", text: "Sure, I can provide a demo for you to see it in action." },
    { speaker: "Buyer", text: "Yes, I'd like to see how it works." },
];

export const useCallStore = create<CallStore>((set, get) => ({
    socket: null,
    activeCallId: null, // Default to null so it accepts all incoming backend events
    customerSentiment: 45,
    purchaseIntent: 82,
    trendGraph: [],
    transcript: INITIAL_TRANSCRIPT,
    isConnected: false,
    connectionError: null,
    simulationInterval: null,

    connectSocket: (url: string) => {
        if (get().socket) return; // Already connected

        const socket = io(url, {
            transports: ['polling', 'websocket'],
            withCredentials: true,
            autoConnect: true,
            reconnection: true,
        });

        socket.on('connect', () => {
            console.log('Connected to Sell Matrix WebSocket tracking server');
            set({ isConnected: true, connectionError: null });
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            set({ isConnected: false, connectionError: error.message });
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected:', reason);
            set({ isConnected: false, connectionError: `Disconnected: ${reason}` });
        });

        // 1. The global backend event to update gauges and graph
        socket.on('call_updated', (updateData: any) => {
            const state = get();

            // Allow update if activeCallId matches or if none specified from backend
            if (updateData.call_id === state.activeCallId || !state.activeCallId || !updateData.call_id) {

                // Construct a new point for the Trend Graph widget
                const newTrendPoint: TrendDataPoint = {
                    time: updateData.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    value: typeof updateData.score === 'number' ? updateData.score : state.purchaseIntent,
                };

                // Optionally attach a 'signal' tooltip to the dot if signals are found
                if (updateData.signals && updateData.signals.length > 0) {
                    const isPositive = updateData.intent === 'Positive';
                    newTrendPoint.event = {
                        type: isPositive ? 'positive' : updateData.intent === 'Negative' ? 'negative' : 'neutral',
                        score: isPositive ? '+5' : '-5',
                        text: updateData.signals[0]
                    };
                }

                set((prev) => {
                    const newTrendMap = [...prev.trendGraph, newTrendPoint].slice(-30); // Keep last 30 data points
                    return {
                        // Sentiment: Usually mapped to intent (Positive/Negative) or an exact sentiment score tracking 0-100
                        customerSentiment: typeof updateData.sentiment_score === 'number'
                            ? updateData.sentiment_score
                            : (updateData.intent === 'Positive' ? 85 : updateData.intent === 'Negative' ? 25 : prev.customerSentiment),

                        // Score: Maps to purchase intent tracking 0-100
                        purchaseIntent: typeof updateData.score === 'number' ? updateData.score : prev.purchaseIntent,

                        // Append to graph
                        trendGraph: newTrendMap
                    };
                });
            }
        });

        // 2. The global backend event to stream raw conversation blocks as they happen
        socket.on('transcript_update', (data: any) => {
            const state = get();
            if (data.call_id === state.activeCallId || !state.activeCallId || !data.call_id) {
                set((prev) => {
                    // If this is the FIRST real-time message, we might want to clear the 'fake' fallback initial data
                    const currentTranscript = prev.transcript === INITIAL_TRANSCRIPT ? [] : prev.transcript;
                    return {
                        transcript: [...currentTranscript, { speaker: data.speaker || 'Unknown', text: data.text }]
                    };
                });
            }
        });

        set({ socket });
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            set({ socket: null, isConnected: false });
        }
    },

    setActiveCallId: (id: string) => {
        set({ activeCallId: id });
    },

    startSimulation: () => {
        // Prevent multiple intervals
        if (get().simulationInterval) return;

        let tick = 0;
        const MOCK_PHRASES = [
            { speaker: "Buyer", text: "Can you explain the hidden fees?" },
            { speaker: "Agent", text: "There are absolutely no hidden fees on this plan." },
            { speaker: "Buyer", text: "That sounds excellent, what is the next step?" },
            { speaker: "Agent", text: "I can send over the digital contract right now." },
            { speaker: "Buyer", text: "Let me check with my partner first." },
            { speaker: "Agent", text: "Of course, take your time!" },
            { speaker: "Buyer", text: "Actually, let's just go ahead and do it." },
        ];

        const interval = setInterval(() => {
            tick++;
            const state = get();

            // 1. Simulate Transcript Injection every ~6 seconds (every 2 ticks)
            if (tick % 2 === 0) {
                const phraseIndex = (tick / 2) % MOCK_PHRASES.length;
                const newPhrase = MOCK_PHRASES[phraseIndex];

                set((prev) => {
                    const currentTranscript = prev.transcript === INITIAL_TRANSCRIPT ? [] : prev.transcript;
                    return {
                        transcript: [...currentTranscript, newPhrase]
                    };
                });
            }

            // 2. Simulate AI Telemetry Injection every 3 seconds (every tick)
            const scoreChange = (Math.random() - 0.5) * 18; // Fluctuate by up to 9 points
            const newScore = Math.min(Math.max(state.purchaseIntent + scoreChange, 20), 100); // Clamp between 20 and 100

            const isPositive = scoreChange > 6;
            const isNegative = scoreChange < -6;

            const newPoint: TrendDataPoint = {
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                value: newScore,
            };

            // Inject random "Signals" mimicking the backend AI
            if (isPositive) {
                newPoint.event = { type: 'positive', score: `+${Math.round(scoreChange)}`, text: 'Strong Buying Signal' };
            } else if (isNegative) {
                newPoint.event = { type: 'negative', score: `${Math.round(scoreChange)}`, text: 'Hesitation Noted' };
            }

            set((prev) => ({
                purchaseIntent: newScore,
                // Make sentiment loosely follow intent score
                customerSentiment: Math.min(Math.max(prev.customerSentiment + (scoreChange * 0.5), 10), 100),
                trendGraph: [...prev.trendGraph, newPoint].slice(-20) // Keep rolling window of 20 points
            }));

        }, 3000); // 3-second heartbeat

        set({ simulationInterval: interval });
    },

    stopSimulation: () => {
        const { simulationInterval } = get();
        if (simulationInterval) {
            clearInterval(simulationInterval);
            set({ simulationInterval: null });
        }
    }
}));
