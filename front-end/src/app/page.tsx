"use client";

import { useMemo, useState } from "react";

type TradeForm = {
  origin: string;
  destination: string;
  productName: string;
  category: string;
  value: string;
};

const initialForm: TradeForm = {
  origin: "India",
  destination: "United States",
  productName: "",
  category: "Batteries / power banks",
  value: "",
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    const valueNumber = Number(form.value) || 24000;
    const dutyRate = form.destination === "Germany" ? 0.08 : 0.05;
    const vatRate = 0.2;
    const dutyAmount = valueNumber * dutyRate;
    const vatAmount = valueNumber * vatRate;
    const total = valueNumber + dutyAmount + vatAmount;

    return {
      dutyRate: `${(dutyRate * 100).toFixed(0)}%`,
      dutyAmount: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(dutyAmount),
      vatRate: `${(vatRate * 100).toFixed(0)}%`,
      vatAmount: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(vatAmount),
      total: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(total),
      documents: ["Commercial invoice", "Packing list", "Origin certificate", "HS code declaration"],
      restrictions: form.category.toLowerCase().includes("battery")
        ? ["Battery-powered goods require extra safety compliance review"]
        : [],
      legalRequirements: ["CE marking review", "EORI registration", "Product safety dossier"],
      suggestions: [
        "Check whether a preferential origin clause can reduce duty exposure.",
        "Bundle ancillary components into one invoice to simplify customs review.",
      ],
    };
  }, [form]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-4xl border border-[#E8DDD7] bg-[#FCFAF8] p-6 shadow-[0_18px_60px_-28px_rgba(122,31,43,0.2)] sm:p-8 lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A15A]">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2B2523] sm:text-4xl">
          Check a shipment before it leaves the warehouse
        </h1>
        <p className="mt-4 text-base leading-8 text-[#7A716D] sm:text-lg">
          Enter the trade details once. We'll classify the product, price the duty and tax, and flag anything that could block it at customs.
        </p>

        <div className="rounded-[1.5rem] border border-[#E8DDD7] bg-[#FAF7F5] p-6">
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-[#2B2523]">
                Origin country
                <select
                  value={form.origin}
                  onChange={(event) => setForm((current) => ({ ...current, origin: event.target.value }))}
                  className="min-h-12 rounded-2xl border border-[#D7C8BE] bg-white px-4 text-sm text-[#2B2523] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7A1F2B]"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-[#2B2523]">
                Destination country
                <select
                  value={form.destination}
                  onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
                  className="min-h-12 rounded-2xl border border-[#D7C8BE] bg-white px-4 text-sm text-[#2B2523] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7A1F2B]"
                >
                  <option>United States</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#2B2523]">
              Product name
              <input
                value={form.productName}
                onChange={(event) => setForm((current) => ({ ...current, productName: event.target.value }))}
                className="min-h-12 rounded-2xl border border-[#D7C8BE] bg-white px-4 text-sm text-[#2B2523] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7A1F2B]"
                placeholder="e.g. PowerCell 5K"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#2B2523]">
              Product category
              <select
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="min-h-12 rounded-2xl border border-[#D7C8BE] bg-white px-4 text-sm text-[#2B2523] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7A1F2B]"
              >
                <option>Batteries / power banks</option>
                <option>Electronics</option>
                <option>Clothing</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#2B2523]">
              Product value (USD)
              <input
                type="number"
                value={form.value}
                onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))}
                className="min-h-12 rounded-2xl border border-[#D7C8BE] bg-white px-4 text-sm text-[#2B2523] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7A1F2B]"
                placeholder="e.g. 25"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#7A1F2B] px-5 py-3 text-sm font-semibold text-[#FAF7F5] transition hover:bg-[#5C1620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1F2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F5]"
            >
              Analyze Trade
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
