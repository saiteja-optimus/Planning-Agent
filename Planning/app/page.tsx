import Link from 'next/link'

const PIPELINE = [
  {
    step: '01',
    label: 'THINK',
    headline: 'Cinematic Analysis',
    body: 'Four lenses dissect your idea — audience, emotion, narrative DNA, and visual DNA. No generation until the concept has depth.',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    tags: ['Audience', 'Emotion', 'NarrativeDNA', 'VisualDNA'],
  },
  {
    step: '02',
    label: 'PLAN',
    headline: 'Story Architecture',
    body: 'A three-act structure with turning points, logline, and an emotional arc bar — before a single pixel is rendered.',
    accent: '#e879f9',
    glow: 'rgba(232,121,249,0.12)',
    tags: ['Logline', 'Acts', 'Arc', 'Turns'],
  },
  {
    step: '03',
    label: 'DIRECT',
    headline: 'Visual Direction',
    body: 'Color palette, shot list, and precision AI image prompts — ready to paste into Midjourney, DALL·E, or Flux.',
    accent: '#f87171',
    glow: 'rgba(248,113,113,0.12)',
    tags: ['Palette', 'Shots', 'Cinematography', 'Prompts'],
  },
]

const FEATURES = [
  { icon: '⬛', title: 'Forces Structured Thinking', body: 'You cannot skip to generation. Every idea must pass through all three stages.' },
  { icon: '◈', title: 'Streaming in Real-Time', body: 'Watch each stage develop live — no waiting for a wall of text to appear.' },
  { icon: '◉', title: 'Cinematic by Default', body: 'Trained on director logic: lenses, arcs, and visual grammar — not chat prompts.' },
  { icon: '▦', title: 'Exportable Output', body: 'Copy as Markdown or JSON. Paste directly into your AI image workflow.' },
  { icon: '◐', title: 'Tone-Aware', body: 'Tag your idea as noir, epic, intimate, surreal — the pipeline adapts its voice.' },
  { icon: '◳', title: 'No Generic Output', body: 'Powered by Llama 3.1 70B via NVIDIA NIM — prompted as a seasoned creative director.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-noir-950 text-ivory overflow-x-hidden">

      {/* Film grain */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 h-16 border-b border-white/5 backdrop-blur-md bg-noir-950/70">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          <span className="font-mono text-sm tracking-widest text-ivory/80 uppercase">CTE</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#pipeline" className="font-mono text-xs text-ivory/40 hover:text-ivory/80 transition-colors tracking-wider uppercase">Pipeline</a>
          <a href="#features" className="font-mono text-xs text-ivory/40 hover:text-ivory/80 transition-colors tracking-wider uppercase">Features</a>
          <Link href="/studio"
            className="font-mono text-xs px-4 py-2 border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/80 transition-all tracking-wider uppercase rounded">
            Open Studio →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">

        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(248,113,113,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(232,121,249,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        {/* Badge */}
        <div className="relative mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
          <span className="font-mono text-xs text-gold-400/80 tracking-widest uppercase">Cinematic Thinking Engine</span>
        </div>

        {/* Headline */}
        <h1 className="relative font-display text-6xl md:text-8xl lg:text-[108px] leading-[0.9] tracking-tight text-ivory max-w-5xl">
          AI builds generic.
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(245,158,11,0.6)' }}>
            We make it
          </span>
          <br />
          <span className="text-gold-400" style={{ textShadow: '0 0 80px rgba(245,158,11,0.4)' }}>
            cinematic.
          </span>
        </h1>

        {/* Sub */}
        <p className="relative mt-10 max-w-xl text-ivory/50 text-lg leading-relaxed font-light">
          A three-stage pipeline that forces structured thinking before generation —
          so every idea becomes a story with depth, arc, and visual direction.
        </p>

        {/* CTA row */}
        <div className="relative mt-12 flex items-center gap-4 flex-wrap justify-center">
          <Link href="/studio"
            className="group px-8 py-4 bg-gold-500 hover:bg-gold-400 text-noir-950 font-mono text-sm tracking-widest uppercase font-bold rounded transition-all shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]">
            Enter the Studio
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a href="#pipeline"
            className="px-8 py-4 border border-ivory/10 text-ivory/50 hover:border-ivory/30 hover:text-ivory/80 font-mono text-sm tracking-widest uppercase rounded transition-all">
            See How It Works
          </a>
        </div>

        {/* Scroll cue */}
        <div className="relative mt-24 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-ivory/40 to-transparent" />
          <span className="font-mono text-xs tracking-widest uppercase text-ivory/40">Scroll</span>
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section id="pipeline" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-px bg-gold-500/40" />
            <span className="font-mono text-xs text-gold-500/60 tracking-widest uppercase">The Pipeline</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4 max-w-2xl leading-tight">
            Three stages.<br />One coherent vision.
          </h2>
          <p className="text-ivory/40 text-lg mb-20 max-w-xl">
            Each stage unlocks only after the previous completes. No shortcuts. No generic output.
          </p>

          {/* Pipeline cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {PIPELINE.map((s, i) => (
              <div key={s.step} className="relative group rounded-2xl border bg-noir-900/60 backdrop-blur-sm p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{ borderColor: `${s.accent}20`, background: `linear-gradient(135deg, ${s.glow} 0%, transparent 60%)` }}>

                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ boxShadow: `inset 0 0 40px ${s.glow}` }} />

                {/* Step number */}
                <div className="font-mono text-xs tracking-widest mb-6 flex items-center justify-between" style={{ color: `${s.accent}60` }}>
                  <span>{s.step}</span>
                  <span className="w-5 h-px" style={{ background: s.accent, opacity: 0.3 }} />
                </div>

                {/* Stage label */}
                <div className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: s.accent }}>
                  {s.label}
                </div>

                <h3 className="font-display text-2xl text-ivory mb-3">{s.headline}</h3>
                <p className="text-ivory/40 text-sm leading-relaxed mb-6">{s.body}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(t => (
                    <span key={t} className="font-mono text-xs px-2 py-1 rounded border"
                      style={{ borderColor: `${s.accent}20`, color: `${s.accent}70`, background: `${s.accent}08` }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Connector arrow — between cards */}
                {i < 2 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                    <span className="text-ivory/20 text-lg">›</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-px bg-gold-500/40" />
            <span className="font-mono text-xs text-gold-500/60 tracking-widest uppercase">Why CTE</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-20 max-w-2xl leading-tight">
            Built for people who<br />think before they generate.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-noir-950 p-8 hover:bg-noir-900/80 transition-colors group">
                <div className="text-2xl mb-5 opacity-40 group-hover:opacity-70 transition-opacity">{f.icon}</div>
                <h3 className="font-display text-lg text-ivory mb-2">{f.title}</h3>
                <p className="text-ivory/35 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO PREVIEW ── */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">

          {/* Fake terminal / output preview */}
          <div className="relative rounded-2xl border border-white/10 bg-noir-900/50 backdrop-blur-sm p-8 md:p-12 overflow-hidden">

            {/* Glow behind */}
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.6) 0%, transparent 60%)' }} />

            <div className="relative">
              {/* Top bar */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-film-red/60" />
                <div className="w-3 h-3 rounded-full bg-gold-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/30" />
                <div className="ml-4 font-mono text-xs text-ivory/20 tracking-widest">cte-studio — think.json</div>
              </div>

              {/* Mock output */}
              <div className="text-left space-y-3 font-mono text-sm">
                <div className="flex gap-3">
                  <span className="text-gold-500/50 shrink-0">THINK</span>
                  <span className="text-ivory/60">audience <span className="text-ivory/90">→</span> <span className="text-gold-300">Urban millennials who've lost their sense of wonder</span></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gold-500/50 shrink-0 invisible">THINK</span>
                  <span className="text-ivory/60">emotion <span className="text-ivory/90">→</span> <span className="text-gold-300">Melancholic nostalgia bleeding into fragile hope</span></span>
                </div>
                <div className="h-px bg-white/5 my-4" />
                <div className="flex gap-3">
                  <span className="text-purple-400/50 shrink-0">PLAN</span>
                  <span className="text-ivory/60">logline <span className="text-ivory/90">→</span> <span className="text-purple-300">A lone archivist discovers that the city's forgotten dreams are stored in analog film</span></span>
                </div>
                <div className="h-px bg-white/5 my-4" />
                <div className="flex gap-3">
                  <span className="text-red-400/50 shrink-0">DIRECT</span>
                  <span className="text-ivory/60">palette <span className="text-ivory/90">→</span> <span className="text-red-300">Burnt sienna, midnight teal, oxidised silver, warm amber</span></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-400/50 shrink-0 invisible">DIRECT</span>
                  <span className="text-ivory/60">shot_01 <span className="text-ivory/90">→</span> <span className="text-red-300">ECU hands threading 16mm film, shallow DOF, warm practicals</span></span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-ivory/20">▌</span>
                  <span className="text-ivory/20 text-xs animate-pulse">generating…</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-40 px-6 text-center border-t border-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
            style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <p className="font-mono text-xs text-gold-500/50 tracking-widest uppercase mb-6">Ready to direct?</p>
          <h2 className="font-display text-5xl md:text-7xl text-ivory mb-8 leading-tight">
            Your idea deserves<br />
            <span className="text-gold-400" style={{ textShadow: '0 0 60px rgba(245,158,11,0.35)' }}>
              a story first.
            </span>
          </h2>
          <p className="text-ivory/40 text-lg mb-12 max-w-lg mx-auto">
            Enter the studio. Think. Plan. Direct. Export.
          </p>
          <Link href="/studio"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gold-500 hover:bg-gold-400 text-noir-950 font-mono text-sm tracking-widest uppercase font-bold rounded transition-all shadow-[0_0_60px_rgba(245,158,11,0.25)] hover:shadow-[0_0_80px_rgba(245,158,11,0.45)]">
            Open CTE Studio
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-8 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60" />
          <span className="font-mono text-xs text-ivory/20 tracking-widest uppercase">Cinematic Thinking Engine</span>
        </div>
        <span className="font-mono text-xs text-ivory/15">Powered by NVIDIA NIM · Llama 3.1 70B</span>
      </footer>
    </div>
  )
}
