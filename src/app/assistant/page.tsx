"use client";

import { FormEvent, useState } from "react";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const starterMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "I can help you assess duty exposure, document requirements, and flag restricted trade lanes before a shipment moves.",
  },
  {
    id: 2,
    role: "user",
    content: "What documents are usually required for a mixed shipment to Germany?",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Typically you will need a commercial invoice, packing list, origin statement, and any sector-specific certificates such as CE marking for regulated goods.",
  },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState(starterMessages);
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: draft.trim(),
    };

    const assistantReply: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content:
        "I can review that lane in detail. For a fast answer, share the product category, destination, and approximate shipment value and I’ll outline the likely duty, documentation, and approval steps.",
    };

    setMessages((current) => [...current, userMessage, assistantReply]);
    setDraft("");
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[2rem] border border-[#E8DDD7] bg-[#FCFAF8] p-6 shadow-[0_18px_60px_-28px_rgba(122,31,43,0.2)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A15A]">
              AI Assistant
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#2B2523] sm:text-4xl">
              Ask before you ship.
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[#7A716D] sm:text-base">
            Clarify documents, approvals, and restricted goods without leaving the workflow.
          </p>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-[#E8DDD7] bg-[#FAF7F5] p-4 sm:p-6">
          <div className="flex max-h-[420px] flex-col gap-4 overflow-y-auto pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 sm:max-w-[70%] sm:text-base ${
                    message.role === "user"
                      ? "bg-[#7A1F2B] text-[#FAF7F5]"
                      : "bg-white text-[#2B2523] shadow-sm"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="assistant-input">
              Ask the assistant
            </label>
            <input
              id="assistant-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about duties, certifications, or shipment blockers"
              className="min-h-12 flex-1 rounded-full border border-[#D7C8BE] bg-white px-4 text-sm text-[#2B2523] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7A1F2B]"
            />
            <button
              type="submit"
              className="rounded-full bg-[#7A1F2B] px-5 py-3 text-sm font-semibold text-[#FAF7F5] transition hover:bg-[#5C1620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1F2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F5]"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
