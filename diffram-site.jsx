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
          <a href="#how" className="mono">How it works</a>
          <a href="#offer" className="mono">The offer</a>
          <button className="btn" onClick={onCta}>Book a call <ArrowRight /></button>
        </div>
      </div>
    </nav>);

}

// ---------- HERO (centered, eyebrow → headline → sub → video → dual CTA → context) ----------
function Hero({ eyebrow, headline, subhead, ctaLabel, ctaSecondaryLabel, context, onCta }) {
  // split headline so we can color the last 2-3 words with signal
  const words = headline.trim().split(' ');
  const tailCount = words.length >= 4 ? 2 : 1;
  const tail = words.slice(-tailCount).join(' ');
  const lead = words.slice(0, -tailCount).join(' ');

  return (
    <header className="hero page">
      <div className="hero-grid" />
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="dot" />
          {eyebrow}
        </div>

        <h1 className="hero-h1">
          {lead} <span className="em">{tail}</span>
        </h1>

        <p className="hero-sub">{subhead}</p>

        {/* Wistia VSL */}
        <div className="hero-vsl" dangerouslySetInnerHTML={{ __html: '<wistia-player media-id="k4mz3zzon8" aspect="1.7777777777777777"></wistia-player>' }} />

        <div className="hero-cta">
          <button className="btn btn-lg" onClick={onCta}>{ctaLabel} <ArrowRight /></button>
          <a href="#how" className="btn btn-lg btn-ghost">{ctaSecondaryLabel}</a>
        </div>

        <p className="hero-context">{context}</p>
      </div>
    </header>);

}

// ---------- VALUE PROP ----------
function ValueProp({ title }) {
  const points = [
  { h: "We carry the risk, not you.", b: "You pay per qualified meeting that lands on your calendar — and only after you accept it. If a booking doesn't fit, it's not billed." },
  { h: "You decide what counts as qualified.", b: "We agree on the criteria up front. If a booking doesn't match — wrong title, wrong company, no real intent — flag it and it's not billed. No arguments." },
  { h: "Month to month. Walk any time.", b: "No 6- or 12-month lock-ins. If the leads aren't moving your pipeline, you leave. We'd rather earn the next month than trap you in this one." }];

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
            Most agencies bill you for activity. We bill you for <strong>outcomes</strong>: qualified meetings on your calendar. If a booking doesn't meet the criteria you set, you don't pay for it. That's the whole deal.
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
  { n: "01", h: "Book a call.", b: "15 minutes. We map your offer, ICP, and what 'qualified' means for your team. If we're not a fit, we'll say so on the spot." },
  { n: "02", h: "We build + run the engine.", b: "Domains, infrastructure, list, copy, sending, reply management. You don't touch it. Meetings hit your calendar within ~2 weeks of go-live." },
  { n: "03", h: "Pay per qualified meeting.", b: "Flat rate per booking that fits the criteria you set. Reject anything that doesn't qualify and it's not billed. Cancel any month — no fees, no fight." }];

  return (
    <section className="pf page" id="offer">
      <div className="div-rule" />
      <div className="section-meta">
        <span className="mono">§ 02 — The offer</span>
        <span className="mono">Pay per result · Month to month</span>
      </div>
      <div className="offer-wrap">
        <div className="offer-head">
          <h2 className="pf-h">You only pay for meetings <span style={{ color: 'var(--signal)' }}>that actually qualify.</span></h2>
          <p className="pf-sub">Flat fee per qualified booking. If a meeting doesn't meet the criteria we agreed on, flag it — and it's not billed.</p>
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
          <button className="btn btn-lg" onClick={onCta}>Book a call <ArrowRight /></button>
          <span className="mono">No retainer · No setup fee · Month to month</span>
        </div>
      </div>
    </section>);

}

// ---------- BOOKING (Cal.com inline) ----------
function Booking() {
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) {a.q.push(ar);};
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;let ar = arguments;
        if (!cal.loaded) {cal.ns = {};cal.q = cal.q || [];d.head.appendChild(d.createElement("script")).src = A;cal.loaded = true;}
        if (ar[0] === L) {
          const api = function () {p(api, arguments);};
          const namespace = ar[1];api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "15min", { origin: "https://app.cal.com" });
    window.Cal.ns["15min"]("inline", {
      elementOrSelector: "#my-cal-inline-15min",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "kieler-miller-ziw7qo/15min"
    });
    window.Cal.ns["15min"]("ui", { hideEventTypeDetails: false, layout: "month_view" });
  }, []);

  return (
    <section className="booking page" id="booking">
      <div className="div-rule" />
      <div className="section-meta">
        <span className="mono">§ 03 — Book a call</span>
        <span className="mono">15-45 MIN · FREE · NO PRESSURE</span>
      </div>
      <div className="booking-head">
        <h2 className="pf-h">Pick a time.</h2>
        <p className="pf-sub">15-45 minutes. We'll map your offer and define what "qualified" means for your team. If we're not a fit, we'll say so on the call.</p>
      </div>
      <div className="booking-frame">
        <div id="my-cal-inline-15min"></div>
      </div>
    </section>);

}

// ---------- FINAL CTA ----------
function FinalCTA({ onCta }) {
  return (
    <section className="final">
      <div className="final-inner">
        <h2>Pay for meetings.<br />Not <span className="em">promises.</span></h2>
        <div className="final-row">
          <p className="final-sub">We run the system, you approve the bookings, and you're only billed for the ones that qualify. No retainer. No lock-in.</p>
          <button className="btn btn-lg btn-light" onClick={onCta}>Book a call <ArrowRight /></button>
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
        <span>DIFFRAM · KIELER@DIFFRAM.COM</span>
      </div>
    </footer>);

}

// ---------- APP ----------
function App() {
  const defaults = window.__DIFFRAM_TWEAKS;
  const [tweaks, setTweak] = useTweaks(defaults);

  const onCta = () => {
    const el = document.getElementById('booking');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    }
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
        eyebrow={tweaks.eyebrow}
        headline={tweaks.headline}
        subhead={tweaks.subhead}
        ctaLabel={tweaks.ctaLabel}
        ctaSecondaryLabel={tweaks.ctaSecondaryLabel}
        context={tweaks.context}
        onCta={onCta} />
      <ValueProp title={tweaks.valuePropTitle} />
      <Offer onCta={onCta} />
      <Booking />
      <FinalCTA onCta={onCta} />
      <Foot />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero copy">
          <TweakText label="Eyebrow" value={tweaks.eyebrow} onChange={(v) => setTweak('eyebrow', v)} />
          <TweakText label="Headline" value={tweaks.headline} onChange={(v) => setTweak('headline', v)} multiline />
          <TweakText label="Subhead" value={tweaks.subhead} onChange={(v) => setTweak('subhead', v)} multiline />
          <TweakText label="Primary CTA" value={tweaks.ctaLabel} onChange={(v) => setTweak('ctaLabel', v)} />
          <TweakText label="Secondary CTA" value={tweaks.ctaSecondaryLabel} onChange={(v) => setTweak('ctaSecondaryLabel', v)} />
          <TweakText label="Context line" value={tweaks.context} onChange={(v) => setTweak('context', v)} />
        </TweakSection>
        <TweakSection title="Sections">
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
