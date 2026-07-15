'use client';

import { useState, useRef } from 'react';
import { Send, Mic, Square } from "lucide-react";
import { Button } from '@/components/ui/button';


interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export default function ChatInput({
    onSendMessage,
    isLoading,
}: ChatInputProps) {
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);

    const recognitionRef = useRef<any>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (!input.trim()) return;

        onSendMessage(input);
        setInput('');

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            e.key === 'Enter' &&
            !e.shiftKey &&
            !e.nativeEvent.isComposing
        ) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setInput(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height =
                Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    };

    const startListening = () => {
        if (isListening) {

            recognitionRef.current?.stop();

            setIsListening(false);

            return;

        }
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert("Speech Recognition is not supported in this browser.");

            return;

        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.interimResults = false;

        recognition.maxAlternatives = 1;

        recognitionRef.current = recognition;

        setIsListening(true);

        recognition.start();

        recognition.onresult = (event: any) => {

            const transcript =
                event.results[0][0].transcript;

            setInput(transcript);

            setIsListening(false);

        };

        recognition.onerror = () => {

            setIsListening(false);

        };

        recognition.onend = () => {

            setIsListening(false);

        };

    };

    return (
        <div className="glass-elevated border-t border-white/10 p-6">
            <div className="max-w-4xl mx-auto">

                <div className="relative flex gap-3">

                    <div className="flex-1 glass neon-border hover-lift rounded-2xl flex items-end p-4 smooth-transition focus-within:border-cyan-400/60 focus-within:ring-1 focus-within:ring-cyan-400/30">

                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            rows={1}
                            placeholder={
                                isListening
                                    ? "🎤 Listening... Speak now"
                                    : "Ask anything about your organization's knowledge base..."
                            }
                            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none max-h-[120px]"
                        />

                    </div>

                    <div className="flex gap-2">

                        <Button
                            onClick={startListening}
                            disabled={isLoading || isListening}
                            className={`h-12 w-12 rounded-2xl flex-shrink-0 transition shadow-lg ${isListening
                                ? "bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse ring-2 ring-cyan-300"
                                : "bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-105"
                                }`}
                        >
                            {isListening ? (
                                <Square className="w-5 h-5 text-white fill-white" />
                            ) : (
                                <Mic className="w-5 h-5 text-white" />
                            )}
                        </Button>

                        <Button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="h-12 w-12 rounded-2xl flex-shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-105 smooth-transition shadow-lg glow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5 text-white" />
                        </Button>

                    </div>

                </div>

                {isListening && (
                    <p className="text-sm text-cyan-400 text-center mt-2 animate-pulse font-medium">
                        🎤 Recording... Click the button again to stop.
                    </p>
                )}

                <p className="text-xs text-muted-foreground text-center mt-3">
                    Responses are generated using your organization's indexed knowledge base.
                </p>

            </div>
        </div>
    );
}