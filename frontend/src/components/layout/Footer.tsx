export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-sm text-ink-400 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} TradeIQ. All rights reserved.</p>
        <p>AI-assisted analysis — always verify with a licensed customs broker.</p>
      </div>
    </footer>
  );
}
