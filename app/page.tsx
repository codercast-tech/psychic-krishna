"use client";

import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    id: "aura-photos",
    title: "Aura Photos",
    desc: "Capture the colors of your energy field and uncover insights into your emotional, spiritual, and physical wellbeing.",
    image: "/aura-photos.jpg",
  },
  {
    id: "tarot-readings",
    title: "Tarot Card\nReadings",
    desc: "Gain clarity and direction with personalized tarot card readings from our experienced and intuitive readers.",
    image: "/tarot-readings.jpg",
  },
  {
    id: "crystals",
    title: "Crystals",
    desc: "Discover the healing properties of our carefully selected crystals and learn how to harness their energy for emotional and spiritual balance.",
    image: "/crystals.jpg",
  },
  {
    id: "candles",
    title: "Candles & More",
    desc: "Enhance your space with our selection of spiritual candles, incense, and other mystical tools to support your practice.",
    image: "/candles.jpg",
  },
];

const TESTIMONIALS = [
  { text: "A truly transformative experience. The reading gave me clarity I'd been searching for.", author: "Maria L." },
  { text: "The crystals and candles from Krishna's Karma carry a beautiful energy. I keep coming back.", author: "David R." },
  { text: "My aura photo session was incredible. It opened my eyes to things I couldn't see before.", author: "Sarah T." },
];

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function StarField() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 3) * 100,
    y: seededRandom(i * 3 + 1) * 100,
    size: seededRandom(i * 3 + 2) * 2 + 0.5,
    delay: seededRandom(i * 7) * 4,
    dur: seededRandom(i * 7 + 1) * 3 + 2,
  }));

  if (!mounted) return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-amber-200"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [opacity, setOpacity] = useState(1);
  const fadeTime = 1.2;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const checkTime = () => {
      if (video.duration && video.currentTime > 0) {
        const timeLeft = video.duration - video.currentTime;
        if (timeLeft <= fadeTime) {
          setOpacity(Math.max(0, timeLeft / fadeTime));
        } else if (video.currentTime < fadeTime) {
          setOpacity(Math.min(1, video.currentTime / fadeTime));
        } else {
          setOpacity(1);
        }
      }
      rafId = requestAnimationFrame(checkTime);
    };

    rafId = requestAnimationFrame(checkTime);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 1,
        opacity,
        transition: "opacity 0.15s linear",
      }}
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "8px 0" }}>
      <div style={{ height: 1, width: 64, background: "linear-gradient(to right, transparent, rgba(180,130,50,0.4))" }} />
      <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, color: "rgba(180,130,50,0.5)" }} fill="currentColor">
        <polygon points="12,2 15,10 12,8 9,10" />
        <polygon points="12,22 9,14 12,16 15,14" />
        <polygon points="2,12 10,9 8,12 10,15" />
        <polygon points="22,12 14,15 16,12 14,9" />
      </svg>
      <div style={{ height: 1, width: 64, background: "linear-gradient(to left, transparent, rgba(180,130,50,0.4))" }} />
    </div>
  );
}

export default function KrishmasKarma() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const navBg = scrollY > 80;

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        background: "#0e0a07",
        color: "#e8d5b5",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(200,160,80,0.15); }
          50% { box-shadow: 0 0 40px rgba(200,160,80,0.3); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes revealLine {
          from { width: 0; }
          to { width: 100%; }
        }

        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'Jost', Helvetica, sans-serif; }

        .shimmer-text {
          background: linear-gradient(90deg, #e8d5b5 0%, #f0d78c 25%, #e8d5b5 50%, #c9a96e 75%, #e8d5b5 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 6s linear infinite;
        }

        .service-card {
          position: relative;
          background: linear-gradient(170deg, rgba(30,20,12,0.9) 0%, rgba(18,12,8,0.95) 100%);
          border: 1px solid rgba(200,160,80,0.12);
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(200,160,80,0.06) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .service-card:hover {
          border-color: rgba(200,160,80,0.35);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(200,160,80,0.08);
        }

        .service-card:hover::before { opacity: 1; }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 540px) {
          .services-grid {
            grid-template-columns: 1fr;
            max-width: 320px;
            margin: 0 auto;
          }
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(200,160,80,0.4);
          background: transparent;
          color: #e8d5b5;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200,160,80,0.15), rgba(200,160,80,0.05));
          opacity: 0;
          transition: opacity 0.4s;
        }

        .cta-btn:hover {
          border-color: rgba(200,160,80,0.7);
          box-shadow: 0 0 30px rgba(200,160,80,0.15);
          letter-spacing: 0.25em;
        }

        .cta-btn:hover::before { opacity: 1; }

        .cta-btn-primary {
          background: linear-gradient(135deg, #8a6914, #b8912a);
          border: none;
          color: #0e0a07;
        }

        .cta-btn-primary:hover {
          box-shadow: 0 0 40px rgba(184,145,42,0.3);
          background: linear-gradient(135deg, #9a7924, #c8a13a);
        }

        .nav-link {
          position: relative;
          color: rgba(232,213,181,0.7);
          transition: color 0.3s;
        }

        .nav-link:hover { color: #e8d5b5; }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #c9a96e, transparent);
          transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .nav-link:hover::after { width: 100%; }

        .grain-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        ::selection {
          background: rgba(200,160,80,0.3);
          color: #fff;
        }
      `}</style>

      {/* Film grain overlay */}
      <div className="grain-overlay" />

      {/* ─── NAVIGATION ─── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: navBg ? "16px 0" : "28px 0",
          background: navBg ? "rgba(14,10,7,0.92)" : "transparent",
          backdropFilter: navBg ? "blur(16px)" : "none",
          borderBottom: navBg ? "1px solid rgba(200,160,80,0.08)" : "none",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg viewBox="0 0 40 40" style={{ width: 36, height: 36 }} fill="none">
                <circle cx="20" cy="20" r="18" stroke="#c9a96e" strokeWidth="1" />
                <circle cx="20" cy="20" r="12" stroke="#c9a96e" strokeWidth="0.6" opacity="0.5" />
                <circle cx="20" cy="20" r="4" fill="#c9a96e" opacity="0.4" />
                <line x1="20" y1="2" x2="20" y2="38" stroke="#c9a96e" strokeWidth="0.4" opacity="0.3" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="#c9a96e" strokeWidth="0.4" opacity="0.3" />
              </svg>
              <div>
                <div className="font-display" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.04em", color: "#e8d5b5", lineHeight: 1.1 }}>
                  Krishna&apos;s Karma
                </div>
                <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,160,80,0.5)", marginTop: 2 }}>
                  Spiritual Guidance
                </div>
              </div>
            </div>
          </a>

          <div className="font-body" style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <div style={{ display: "flex", gap: 36 }}>
              <a href="/" className="nav-link" style={{ textDecoration: "none" }}>Home</a>
              <a href="/services" className="nav-link" style={{ textDecoration: "none" }}>Services</a>
              <a href="#about" className="nav-link" style={{ textDecoration: "none" }}>About</a>
              <a href="#contact" className="nav-link" style={{ textDecoration: "none" }}>Contact</a>
            </div>
            <a
              href="tel:6892997172"
              className="cta-btn font-body"
              style={{
                padding: "10px 24px",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Call Now
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#e8d5b5",
              cursor: "pointer",
              padding: 8,
            }}
            className="mobile-menu-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#0e0a07" }}>

          <HeroVideo />

          {/* Original overlay effect: lateral + vertical combined */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.35) 100%), linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(14,10,7,1) 100%)",
              zIndex: 2,
            }}
          />

          <div style={{ position: "relative", zIndex: 3 }}>
            <StarField />
          </div>

          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,160,80,0.08) 0%, transparent 60%)",
              animation: "float 8s ease-in-out infinite",
              zIndex: 3,
            }}
          />
        </div>

        <div style={{ position: "relative", zIndex: 10, textAlign: "left", maxWidth: 1200, width: "100%", margin: "0 auto", padding: "180px 48px 120px" }}>
          <div style={{ maxWidth: 540 }}>
          <FadeIn>
            <div
              className="font-body"
              style={{
                fontSize: 12,
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: "rgba(200,160,80,0.6)",
                marginBottom: 32,
              }}
            >
              ✦ &nbsp; Spiritual Guidance &amp; Sacred Goods &nbsp; ✦
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1
              className="font-display shimmer-text"
              style={{
                fontSize: "clamp(42px, 7vw, 82px)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                marginBottom: 28,
              }}
            >
              Krishna&apos;s
              <br />
              Karma
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              className="font-body"
              style={{
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(232,213,181,0.6)",
                maxWidth: 440,
                margin: "0 0 48px",
              }}
            >
              Aura photography, tarot readings, healing crystals, and spiritual tools
              to illuminate your path and awaken your inner truth.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <a
                href="/services"
                className="cta-btn-primary cta-btn font-body"
                style={{
                  padding: "16px 40px",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Explore Services
              </a>
              <a
                href="tel:6892997172"
                className="cta-btn font-body"
                style={{
                  padding: "16px 40px",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Book a Reading
              </a>
            </div>
          </FadeIn>
          </div>

          <FadeIn delay={0.7}>
            <div style={{ marginTop: 80, opacity: 0.4, textAlign: "center" }}>
              <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
                Scroll
              </div>
              <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #c9a96e, transparent)", margin: "0 auto" }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ padding: "60px 32px 120px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(200,160,80,0.2), transparent)",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, marginBottom: 16 }}>
                Services
              </h2>
              <Divider />
              <p className="font-body" style={{ fontSize: 16, fontWeight: 300, color: "rgba(232,213,181,0.55)", maxWidth: 560, margin: "24px auto 0", lineHeight: 1.8 }}>
                Explore our range of spiritual and mystical services designed to guide and
                inspire your journey towards enlightenment and healing.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <svg viewBox="0 0 300 20" fill="none" style={{ width: 200, height: 16, opacity: 0.4 }}>
                <line x1="0" y1="10" x2="120" y2="10" stroke="#c9a96e" strokeWidth="0.5" />
                <circle cx="130" cy="10" r="2" fill="#c9a96e" />
                <circle cx="150" cy="10" r="3" fill="#c9a96e" opacity="0.6" />
                <circle cx="170" cy="10" r="2" fill="#c9a96e" />
                <line x1="180" y1="10" x2="300" y2="10" stroke="#c9a96e" strokeWidth="0.5" />
              </svg>
            </div>
          </FadeIn>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.12}>
                <div
                  className="service-card"
                  style={{
                    padding: 0,
                    borderRadius: 4,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div style={{ padding: 14, paddingBottom: 0 }}>
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "1/1",
                        overflow: "hidden",
                        border: "1px solid rgba(200,160,80,0.3)",
                        borderRadius: 2,
                      }}
                    >
                      <div style={{ position: "absolute", top: 4, left: 4, width: 16, height: 16, borderTop: "1px solid rgba(200,160,80,0.5)", borderLeft: "1px solid rgba(200,160,80,0.5)", zIndex: 2 }} />
                      <div style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderTop: "1px solid rgba(200,160,80,0.5)", borderRight: "1px solid rgba(200,160,80,0.5)", zIndex: 2 }} />
                      <div style={{ position: "absolute", bottom: 4, left: 4, width: 16, height: 16, borderBottom: "1px solid rgba(200,160,80,0.5)", borderLeft: "1px solid rgba(200,160,80,0.5)", zIndex: 2 }} />
                      <div style={{ position: "absolute", bottom: 4, right: 4, width: 16, height: 16, borderBottom: "1px solid rgba(200,160,80,0.5)", borderRight: "1px solid rgba(200,160,80,0.5)", zIndex: 2 }} />

                      <img
                        src={s.image}
                        alt={s.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                        }}
                        onMouseOver={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                        onMouseOut={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
                      />
                    </div>
                  </div>

                  <div style={{ padding: "20px 18px 24px", textAlign: "center", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: 22,
                        fontWeight: 500,
                        marginBottom: 6,
                        letterSpacing: "0.02em",
                        lineHeight: 1.3,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {s.title}
                    </h3>

                    <div style={{ margin: "8px auto 14px", color: "rgba(200,160,80,0.4)", fontSize: 10 }}>✦</div>

                    <p
                      className="font-body"
                      style={{
                        fontSize: 13,
                        fontWeight: 300,
                        color: "rgba(232,213,181,0.5)",
                        lineHeight: 1.7,
                        flexGrow: 1,
                      }}
                    >
                      {s.desc}
                    </p>

                    <a
                      href={`/services#${s.id}`}
                      className="cta-btn font-body"
                      style={{
                        display: "inline-block",
                        marginTop: 20,
                        padding: "10px 28px",
                        fontSize: 12,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        alignSelf: "center",
                      }}
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT / PHILOSOPHY ─── */}
      <section id="about" style={{ padding: "100px 32px", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <FadeIn>
            <div>
              <div
                style={{
                  aspectRatio: "3/4",
                  background: "linear-gradient(170deg, rgba(60,40,15,0.3) 0%, rgba(14,10,7,0.6) 100%)",
                  border: "1px solid rgba(200,160,80,0.1)",
                  borderRadius: 4,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/sacred-space.jpg"
                  alt="Sacred Space"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                  <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,160,80,0.4)" }}>
                    Sacred Space
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <div className="font-body" style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(200,160,80,0.5)", marginBottom: 20 }}>
                Our Story
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, marginBottom: 24, lineHeight: 1.2 }}>
                A Sanctuary for the Spirit
              </h2>
              <p className="font-body" style={{ fontSize: 15, fontWeight: 300, color: "rgba(232,213,181,0.55)", lineHeight: 1.9, marginBottom: 20 }}>
                Krishna&apos;s Karma was born from a deep calling to serve those on their spiritual journey.
                We believe that every soul carries wisdom waiting to be unlocked — and we are here to guide you.
              </p>
              <p className="font-body" style={{ fontSize: 15, fontWeight: 300, color: "rgba(232,213,181,0.55)", lineHeight: 1.9, marginBottom: 36 }}>
                Our readings, products, and sacred spaces are designed with intention, love, and respect
                for the ancient traditions that guide our practice.
              </p>
              <a
                href="#contact"
                className="nav-link font-body"
                style={{
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "#c9a96e",
                }}
              >
                Learn More →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: "100px 32px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(200,160,80,0.15), transparent)",
          }}
        />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div className="font-body" style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(200,160,80,0.5)", marginBottom: 20 }}>
              Testimonials
            </div>
            <div style={{ minHeight: 180 }}>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    opacity: i === activeTestimonial ? 1 : 0,
                    position: i === activeTestimonial ? "relative" : "absolute",
                    transition: "opacity 0.8s ease",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <p className="font-display" style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.6, marginBottom: 24, color: "rgba(232,213,181,0.8)" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="font-body" style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,160,80,0.5)" }}>
                    — {t.author}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 32 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: "none",
                    background: i === activeTestimonial ? "#c9a96e" : "rgba(200,160,80,0.2)",
                    cursor: "pointer",
                    transition: "all 0.4s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA / CONTACT ─── */}
      <section
        id="contact"
        style={{
          padding: "120px 32px",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(200,160,80,0.2), transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,160,80,0.04) 0%, transparent 60%)",
          }}
        />

        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <FadeIn>
            <div className="font-body" style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(200,160,80,0.5)", marginBottom: 20 }}>
              Begin Your Journey
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 400, marginBottom: 24, lineHeight: 1.2 }}>
              Visit Us or Call
              <br />
              For an Appointment
            </h2>
            <Divider />
          </FadeIn>

          <FadeIn delay={0.15}>
            <a
              href="tel:6892997172"
              className="font-display"
              style={{
                display: "block",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 300,
                color: "#c9a96e",
                textDecoration: "none",
                margin: "32px 0 48px",
                letterSpacing: "0.06em",
              }}
            >
              689-299-7172
            </a>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="tel:#"
                className="cta-btn-primary cta-btn font-body"
                style={{
                  padding: "16px 44px",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Call Now
              </a>
              <a
                href="mailto:LunaPsychic1111@gmail.com"
                className="cta-btn font-body"
                style={{
                  padding: "16px 44px",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Email Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: "60px 32px 40px", borderTop: "1px solid rgba(200,160,80,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="font-display" style={{ fontSize: 20, fontWeight: 500, marginBottom: 6 }}>
              Krishna&apos;s Karma
            </div>
            <div className="font-body" style={{ fontSize: 12, color: "rgba(232,213,181,0.35)", letterSpacing: "0.1em" }}>
              Spiritual Guidance &amp; Sacred Goods
            </div>
          </div>

          <div className="font-body" style={{ display: "flex", gap: 28, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <a href="/" className="nav-link" style={{ textDecoration: "none" }}>Home</a>
            <a href="/services" className="nav-link" style={{ textDecoration: "none" }}>Services</a>
            <a href="#about" className="nav-link" style={{ textDecoration: "none" }}>About</a>
            <a href="#contact" className="nav-link" style={{ textDecoration: "none" }}>Contact</a>
          </div>

          <div className="font-body" style={{ fontSize: 11, color: "rgba(232,213,181,0.25)", letterSpacing: "0.05em" }}>
            © 2026 Krishna&apos;s Karma. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}