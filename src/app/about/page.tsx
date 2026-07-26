export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-4xl border border-[#E8DDD7] bg-[#FCFAF8] p-6 shadow-[0_18px_60px_-28px_rgba(122,31,43,0.2)] sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A15A]">
            About us
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2B2523] sm:text-4xl">
            Export compliance should not be guesswork.
          </h1>
          <p className="mt-4 text-base leading-8 text-[#7A716D] sm:text-lg">
            Many teams lose margin or get stalled at customs because tax rules, restricted goods, and required approvals are scattered across forms, advisors, and outdated spreadsheets. We built a clearer way to see the real cost before a shipment is booked.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-[#E8DDD7] bg-[#FAF7F5] p-6">
            <h2 className="text-xl font-semibold text-[#2B2523]">Our mission</h2>
            <p className="mt-3 text-sm leading-7 text-[#7A716D] sm:text-base">
              Give finance, logistics, and export teams one calm place to understand landed cost, legal obligations, and potential blockers before they become costly surprises.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#E8DDD7] bg-[#FAF7F5] p-6">
            <h2 className="text-xl font-semibold text-[#2B2523]">Team</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#2B2523] sm:text-base">
              <li>
                <span className="font-semibold">Pranav P</span> — USN-1DS24EC150
              </li>
              <li>
                <span className="font-semibold">Krish R</span> — USN-1DS24EC101
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
