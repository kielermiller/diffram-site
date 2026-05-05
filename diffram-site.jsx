/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakText, TweakToggle */
const { useState, useEffect, useRef } = React;

// ---------- shared mini-icons ----------
const ArrowRight = ({ className = "arrow" }) =>
<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
    <path d="M2 8 H13.5 M9 4 L13.5 8 L9 12" />
  </svg>;

const PlayIcon = () =>
<svg width="28" height="28" viewBox="0 0 24 24" fill="#fbfaf7">
    <path d="M7 4.5 L7 19.5 L20 12 Z" />
  </svg>;

const NavMark = () =>
<svg className="nav-mark" viewBox="0 0 240 240" aria-hidden="true">
    <g fill="none" stroke="var(--ink)" strokeWidth="18" strokeLinejoin="miter">
      <rect x="20" y="20" width="200" height="200" />
      <polygon points="60,20 220,20 220,180" />
      <polygon points="20,60 180,220 20,220" />
    </g>
    <rect x="100" y="100" width="40" height="40" fill="var(--signal)" />
  </svg>;

const HeroMark = () =>
<svg className="hero-mark" viewBox="0 0 240 240" aria-hidden="true">
    <g fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinejoin="miter">
      <rect x="20" y="20" width="200" height="200" />
      <polygon points="60,20 220,20 220,180" />
      <polygon points="20,60 180,220 20,220" />
    </g>
    <rect x="100" y="100" width="40" height="40" fill="var(--ink)" />
  </svg>;


// ---------- NAV ----------
function Nav({ onCta }) {
  return (
    <nav className="nav">
      <div className="page nav-inner">
        <a href="#" className="nav-brand" aria-label="Diffram">
          <NavMark />
          <span className="wordmark">Diffram.</span>
        </a>
        <div className="nav-meta">
          <span className="mono" style={{ display: 'none' }}><span className="dot" />Booking Q3</span>
          <a href="#how" className="mono">How it works</a>
          <a href="#offer" className="mono">The offer</a>
          <button className="btn" onClick={onCta}>Start campaign <ArrowRight /></button>
        </div>
      </div>
    </nav>);

}

// ---------- HERO ----------
function Hero({ headline, subhead, ctaLabel, availability, onCta }) {
  // split headline so we can color the last word with signal
  const words = headline.trim().split(' ');
  const last = words.pop();
  const lead = words.join(' ');
  return (
    <header className="hero page">
      <HeroMark />
      <div className="hero-eyebrow">
        <span className="rule" />
        <span className="mono">Diffram · Outbound studio · Est. 2026</span>
      </div>
      <h1 className="hero-h1">
        {lead} <span className="em">{last}</span>
      </h1>
      <p className="hero-sub">{subhead}</p>
      <div className="hero-cta">
        <button className="btn btn-lg" onClick={onCta}>{ctaLabel} <ArrowRight /></button>
        <span className="availability"><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--signal)', marginRight: 10, verticalAlign: 'middle' }} />{availability}</span>
      </div>
    </header>);

}

// ---------- VSL ----------
function VSL() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const s1 = document.createElement('script');
      s1.src = 'https://fast.wistia.com/player.js';
      s1.async = true;
      document.head.appendChild(s1);
    }
    if (!document.querySelector('script[src="https://fast.wistia.com/embed/wv2q1ttt8i.js"]')) {
      const s2 = document.createElement('script');
      s2.src = 'https://fast.wistia.com/embed/wv2q1ttt8i.js';
      s2.async = true;
      s2.type = 'module';
      document.head.appendChild(s2);
    }
    if (!document.getElementById('wistia-swatch-style')) {
      const style = document.createElement('style');
      style.id = 'wistia-swatch-style';
      style.textContent = `wistia-player[media-id='wv2q1ttt8i']:not(:defined){background:center/contain no-repeat url('https://fast.wistia.com/embed/medias/wv2q1ttt8i/swatch');display:block;filter:blur(5px);padding-top:62.08%;}`;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section className="vsl page">
      <wistia-player media-id="wv2q1ttt8i" aspect="1.610738255033557" style={{width:'100%',display:'block'}}></wistia-player>
    </section>);

}

// ---------- VALUE PROP ----------
function ValueProp({ title }) {
  const points = [
  { h: "Infrastructure that doesn't get flagged.", b: "Dedicated domains, warmed inboxes, distributed sending. We protect deliverability so your messages land in primary, not promotions." },
  { h: "Copy that reads like a person wrote it.", b: "No templates, no spintax, no {FirstName} accidents. Every sequence is hand-written for your offer and your ICP." },
  { h: "Replies tagged, leads in your CRM.", b: "Interested, OOO, referral, not-now — sorted and synced live. You wake up to qualified meetings, not a spreadsheet to triage." }];

  const titleWords = title.trim().split(' ');
  const lastTwo = titleWords.slice(-2).join(' ');
  const head = titleWords.slice(0, -2).join(' ');
  return (
    <section className="vp page" id="how">
      <div className="div-rule" />
      <div className="section-meta">
        <span className="mono">§ 01 — How it works</span>
        <span className="mono">Diffram / Engine</span>
      </div>
      <div className="vp-grid">
        <h2 className="vp-h">
          {head} <span className="em">{lastTwo}</span>
        </h2>
        <div className="vp-body">
          <p className="vp-lede">
            Most agencies sell volume. We sell <strong>fit</strong>: the right message reaching the right desk, in the inbox your buyer actually opens. We run the system end-to-end so you stop managing it and start closing it.
          </p>
          <div className="vp-points">
            {points.map((p, i) =>
            <div className="vp-point" key={i}>
                <span className="num">0{i + 1}</span>
                <div>
                  <h4 className="pt-h">{p.h}</h4>
                  <p className="pt-b">{p.b}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ---------- OFFER ----------
function Offer({ onCta }) {
  const steps = [
  { n: "01", h: "Book a call.", b: "15 minutes. We audit your offer, ICP, and current outbound. If we're not a fit, we'll tell you on the spot." },
  { n: "02", h: "We build + run a 14-day campaign.", b: "Domains, infrastructure, lead list, copy, sending, reply management — all of it. No setup fees, no card on file." },
  { n: "03", h: "You only pay if it works.", b: "At day 14 we look at the numbers together. If the meetings landed, we continue on a monthly retainer. If they didn't, you walk — no invoice." }];

  return (
    <section className="pf page" id="offer">
      <div className="div-rule" />
      <div className="section-meta">
        <span className="mono">§ 02 — The offer</span>
        <span className="mono">14 days · Risk-free</span>
      </div>
      <div className="offer-wrap">
        <div className="offer-head">
          <h2 className="pf-h">Run a campaign on us. <span style={{ color: 'var(--signal)' }}>Pay only if it lands.</span></h2>
          <p className="pf-sub">We'll build and run your first 14-day cold email campaign at our cost. After two weeks we look at the numbers together and decide if it's worth continuing.</p>
        </div>
        <div className="offer-grid">
          {steps.map((s, i) =>
          <div className="offer-card" key={i}>
              <span className="offer-num">{s.n}</span>
              <h4 className="offer-h">{s.h}</h4>
              <p className="offer-b">{s.b}</p>
            </div>
          )}
        </div>
        <div className="offer-cta-row">
          <button className="btn btn-lg" onClick={onCta}>Start your 14-day campaign <ArrowRight /></button>
          <span className="mono">No card. No setup fee. No commitment.</span>
        </div>
      </div>
    </section>);

}

// ---------- FINAL CTA ----------
function FinalCTA({ onCta }) {
  return (
    <section className="final">
      <div className="final-inner">
        <h2>Two weeks.<br />Zero risk. <span className="em">Real meetings.</span></h2>
        <div className="final-row">
          <p className="final-sub">We'll build and run your first cold email campaign at our cost. If it works, we keep going. If it doesn't, you owe nothing.</p>
          <button className="btn btn-lg btn-light" onClick={onCta}>Start your 14-day campaign <ArrowRight /></button>
        </div>
      </div>
    </section>);

}

// ---------- FOOTER ----------
function Foot() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="foot-inner">
        <span>© {year} Diffram</span>
        <span style={{display:'flex',gap:'20px',alignItems:'center'}}>
          <a href="mailto:kieler@diffram.com" style={{color:'inherit',textDecoration:'none'}}>kieler@diffram.com</a>
          <a href="https://www.linkedin.com/in/kieler-miller-870b93376/" target="_blank" rel="noopener noreferrer" style={{color:'inherit',textDecoration:'none'}}>LinkedIn</a>
        </span>
      </div>
    </footer>);

}

// ---------- APP ----------
function App() {
  const defaults = window.__DIFFRAM_TWEAKS;
  const [tweaks, setTweak] = useTweaks(defaults);

  const onCta = () => {
    window.open('https://cal.com/kieler-miller-ziw7qo/15min', '_blank', 'noopener,noreferrer');
  };

  // apply darkMode
  useEffect(() => {
    if (tweaks.darkMode) {
      document.documentElement.style.setProperty('--bg', '#0d1220');
      document.documentElement.style.setProperty('--paper', '#11172a');
      document.documentElement.style.setProperty('--ink', '#fbfaf7');
      document.documentElement.style.setProperty('--ink-2', 'rgba(251,250,247,.6)');
      document.documentElement.style.setProperty('--rule', 'rgba(251,250,247,.12)');
    } else {
      document.documentElement.style.setProperty('--bg', '#eef0f3');
      document.documentElement.style.setProperty('--paper', '#f7f8fa');
      document.documentElement.style.setProperty('--ink', '#0d1220');
      document.documentElement.style.setProperty('--ink-2', '#4a5063');
      document.documentElement.style.setProperty('--rule', '#d3d8e0');
    }
  }, [tweaks.darkMode]);

  // toggle signal accent (mono mode)
  useEffect(() => {
    document.documentElement.style.setProperty('--signal', tweaks.showSignal ? '#1f5fff' : tweaks.darkMode ? '#fbfaf7' : '#0d1220');
  }, [tweaks.showSignal, tweaks.darkMode]);

  return (
    <>
      <Nav onCta={onCta} />
      <Hero
        headline={tweaks.headline}
        subhead={tweaks.subhead}
        ctaLabel={tweaks.ctaLabel}
        availability={tweaks.availability}
        onCta={onCta} />
      
      <VSL />
      <ValueProp title={tweaks.valuePropTitle} />
      <Offer onCta={onCta} />
      <FinalCTA onCta={onCta} />
      <Foot />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Copy">
          <TweakText label="Headline" value={tweaks.headline} onChange={(v) => setTweak('headline', v)} multiline />
          <TweakText label="Subhead" value={tweaks.subhead} onChange={(v) => setTweak('subhead', v)} multiline />
          <TweakText label="CTA label" value={tweaks.ctaLabel} onChange={(v) => setTweak('ctaLabel', v)} />
          <TweakText label="Availability line" value={tweaks.availability} onChange={(v) => setTweak('availability', v)} />
          <TweakText label="Value-prop title" value={tweaks.valuePropTitle} onChange={(v) => setTweak('valuePropTitle', v)} multiline />
        </TweakSection>
        <TweakSection title="Palette">
          <TweakToggle label="Signal accent" value={tweaks.showSignal} onChange={(v) => setTweak('showSignal', v)} />
          <TweakToggle label="Dark mode" value={tweaks.darkMode} onChange={(v) => setTweak('darkMode', v)} />
        </TweakSection>
      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);