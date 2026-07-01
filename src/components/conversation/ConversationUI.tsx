"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Volume2, Send, Mic, User, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ConversationUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "გამარჯობა! მე ვარ ნინო. როგორ ხარ? (Bonjour ! Je suis Nino. Comment vas-tu ?)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSpeak = (text: string) => {
    const georgianPart = text.split("(")[0].trim();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(georgianPart);
      utterance.lang = "ka";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages.slice(0, -1).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "ბოდიში, მქონდა შეცდომა. (Désolé, j'ai eu une erreur.)",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col">
      <div className="flex-1 space-y-4 pb-4 max-h-[60vh] overflow-y-auto px-1">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-2 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`shrink-0 flex size-8 items-center justify-center rounded-full ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {msg.role === "user" ? (
                <User className="size-4" />
              ) : (
                <Bot className="size-4" />
              )}
            </div>
            <div
              className={`rounded-2xl px-4 py-2.5 max-w-[80%] ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              {msg.role === "assistant" && (
                <button
                  onClick={() => handleSpeak(msg.content)}
                  className="mt-1 p-1 rounded-full hover:bg-background/10 transition-colors"
                >
                  <Volume2 className="size-3 text-muted-foreground" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex items-start gap-2">
            <div className="shrink-0 flex size-8 items-center justify-center rounded-full bg-muted">
              <Bot className="size-4 text-muted-foreground" />
            </div>
            <div className="rounded-2xl bg-muted px-4 py-3">
              <div className="flex gap-1">
                <span className="size-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                <span
                  className="size-2 rounded-full bg-muted-foreground/40 animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="size-2 rounded-full bg-muted-foreground/40 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 border-t border-border pt-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez en français ou en géorgien..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1"
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || loading}
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
