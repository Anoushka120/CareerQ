export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-t from-black/10 to-transparent border-t border-border/30">
      <div className="container mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/70 px-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center text-primary-foreground font-black">Q</div>
          <div>
            <p className="text-sm">© {new Date().getFullYear()} CareerQ</p>
            <p className="text-xs text-white/60">Designed with care · Built for learners</p>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
