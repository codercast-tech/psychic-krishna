"use client";

import { useState, useEffect, useRef } from "react";

const SERVICES_DETAIL = [
  {
    id: "aura-photos",
    title: "Aura Photos",
    subtitle: "See Your Energy in Living Color",
    price: "$75",
    image: "/aura-photos.jpg",
    description: [
      "An aura photograph captures the electromagnetic energy field that surrounds your body, revealing vibrant colors that reflect your emotional, spiritual, and physical state at that moment in time.",
      "Using specialized biofeedback imaging technology, our practitioners guide you through a brief session where sensors read your energy output and translate it into a stunning, full-color portrait of your aura.",
      "Each color in your aura carries meaning — from the passionate reds of vitality and grounding, to the serene blues of intuition and communication, to the radiant golds of spiritual awakening. Our experienced readers will walk you through every detail of your unique energy signature.",
    ],
    highlights: [
      "15–20 minute personalized session",
      "High-resolution printed aura portrait to take home",
      "Detailed color interpretation and energy reading",
      "Guidance on balancing and strengthening your aura",
    ],
  },
  {
    id: "tarot-readings",
    title: "Tarot Card Readings",
    subtitle: "Clarity Through Ancient Wisdom",
    price: "$125",
    image: "/tarot-readings.jpg",
    description: [
      "Tarot is one of the oldest and most trusted tools for spiritual guidance. Each card in the deck carries profound archetypal energy that, when drawn with intention, can illuminate the hidden forces shaping your life's path.",
      "Our experienced readers create a sacred, judgment-free space where you can explore questions about love, career, personal growth, family, and your spiritual journey. Whether you seek clarity on a specific decision or a broader understanding of where life is leading you, the cards reveal what your conscious mind may not yet see.",
      "Every reading is a deeply personal experience. Our practitioners combine traditional tarot wisdom with their own intuitive gifts to deliver messages that are meaningful, actionable, and empowering.",
    ],
    highlights: [
      "One-on-one private reading sessions",
      "Multiple spread options for different questions",
      "Experienced and intuitive readers",
      "Guidance for love, career, health, and spiritual growth",
    ],
  },
  {
    id: "palm-reading",
    title: "Palm Reading",
    subtitle: "Your Destiny Written in Your Hands",
    price: "$50",
    image: "/palm-reading.jpg",
    description: [
      "Palm reading, also known as palmistry or chiromancy, is an ancient practice that interprets the lines, shapes, and patterns of your hands to reveal deep insights about your personality, life path, and future possibilities.",
      "Our skilled palm readers examine the major lines of your hand — the heart line, head line, life line, and fate line — along with the mounts, finger shapes, and subtle markings that tell your unique story. Each hand holds different information: your dominant hand reflects the life you are creating, while your non-dominant hand reveals your innate potential.",
      "Whether you are curious about love, career direction, health tendencies, or your life's greater purpose, a palm reading offers a tangible and deeply personal form of spiritual guidance that has been trusted across cultures for thousands of years.",
    ],
    highlights: [
      "Detailed analysis of all major palm lines",
      "Insights into love, career, and life purpose",
      "Quick yet deeply revealing 15–20 minute session",
      "Ancient practice trusted across cultures worldwide",
    ],
  },
  {
    id: "crystals",
    title: "Crystals",
    subtitle: "Harness the Earth's Healing Energy",
    price: "",
    image: "/crystals.jpg",
    description: [
      "Crystals have been used for thousands of years across cultures as powerful tools for healing, protection, and spiritual connection. Each stone carries a unique vibrational frequency that can influence your energy, balance your chakras, and support your intentions.",
      "Our collection features hand-selected crystals sourced with care and intention — from protective black tourmaline and calming amethyst to heart-opening rose quartz and clarity-enhancing clear quartz. Every piece is chosen for its quality, beauty, and energetic potency.",
      "Whether you're a seasoned crystal practitioner or just beginning your journey, our knowledgeable staff will help you find the perfect stones for your needs and teach you how to cleanse, charge, and work with your crystals for maximum benefit.",
    ],
    highlights: [
      "Ethically sourced, high-quality crystals",
      "Wide selection for every intention and chakra",
      "Expert guidance on crystal selection and use",
      "Cleansing and charging instructions included",
    ],
  },
  {
    id: "candles",
    title: "Candles & More",
    subtitle: "Sacred Tools for Your Spiritual Practice",
    price: "",
    image: "/candles.jpg",
    description: [
      "Fire has been central to spiritual practice since the dawn of humanity. Our ritual candles are crafted with intention, infused with essential oils, herbs, and prayers to support your specific goals — whether you seek protection, abundance, love, clarity, or spiritual cleansing.",
      "Beyond candles, our shop offers a curated selection of incense, sage bundles, palo santo, spiritual oils, prayer beads, altar supplies, and other mystical tools. Each item is chosen to help you create and maintain a sacred space in your daily life.",
      "Our staff can guide you in selecting the right tools for your practice, explain traditional uses and rituals, and help you build a spiritual routine that resonates with your unique path.",
    ],
    highlights: [
      "Hand-crafted ritual candles with specific intentions",
      "Premium incense, sage, and palo santo",
      "Spiritual oils and altar supplies",
      "Personalized guidance for your practice",
    ],
  },
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

export default function ServicesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'Jost', Helvetica, sans-serif; }

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

        .service-section:nth-child(even) .service-layout {
          direction: rtl;
        }
        .service-section:nth-child(even) .service-layout > * {
          direction: ltr;
        }

        .grain-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        @media (max-width: 768px) {
          .service-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .service-section:nth-child(even) .service-layout {
            direction: ltr;
          }
        }

        ::selection {
          background: rgba(200,160,80,0.3);
          color: #fff;
        }
      `}</style>

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
              <a href="/services" className="nav-link" style={{ textDecoration: "none", color: "#e8d5b5" }}>Services</a>
              <a href="/#about" className="nav-link" style={{ textDecoration: "none" }}>About</a>
              <a href="/#contact" className="nav-link" style={{ textDecoration: "none" }}>Contact</a>
            </div>
            <a
              href="tel:5717285900"
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
        </div>
      </nav>

      {/* ─── PAGE HEADER ─── */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: "center", position: "relative" }}>
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,160,80,0.04) 0%, transparent 60%)",
          }}
        />

        <div style={{ position: "relative" }}>
          <FadeIn>
            <div className="font-body" style={{ fontSize: 12, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(200,160,80,0.5)", marginBottom: 24 }}>
              ✦ &nbsp; What We Offer &nbsp; ✦
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-display" style={{ fontSize: "clamp(42px, 6vw, 68px)", fontWeight: 400, marginBottom: 20 }}>
              Our Services
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Divider />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body" style={{ fontSize: 17, fontWeight: 300, color: "rgba(232,213,181,0.55)", maxWidth: 600, margin: "24px auto 0", lineHeight: 1.8 }}>
              Explore our range of spiritual and mystical services designed to guide and
              inspire your journey towards enlightenment and healing.
            </p>
            <p className="font-body" style={{ fontSize: 13, fontWeight: 400, color: "rgba(200,160,80,0.5)", marginTop: 16, letterSpacing: "0.05em" }}>
              All readings are by appointment only &nbsp;·&nbsp; Payment due at time of booking
            </p>
          </FadeIn>

          {/* Jump links */}
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 48 }}>
              {SERVICES_DETAIL.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="cta-btn font-body"
                  style={{
                    padding: "10px 24px",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SERVICE SECTIONS ─── */}
      {SERVICES_DETAIL.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className="service-section"
          style={{
            padding: "80px 32px",
            position: "relative",
          }}
        >
          {/* Top separator */}
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

          <div
            className="service-layout"
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Image */}
            <FadeIn delay={0.1}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  overflow: "hidden",
                  border: "1px solid rgba(200,160,80,0.2)",
                  borderRadius: 4,
                }}
              >
                {/* Corner ornaments */}
                <div style={{ position: "absolute", top: 8, left: 8, width: 24, height: 24, borderTop: "1px solid rgba(200,160,80,0.4)", borderLeft: "1px solid rgba(200,160,80,0.4)", zIndex: 2 }} />
                <div style={{ position: "absolute", top: 8, right: 8, width: 24, height: 24, borderTop: "1px solid rgba(200,160,80,0.4)", borderRight: "1px solid rgba(200,160,80,0.4)", zIndex: 2 }} />
                <div style={{ position: "absolute", bottom: 8, left: 8, width: 24, height: 24, borderBottom: "1px solid rgba(200,160,80,0.4)", borderLeft: "1px solid rgba(200,160,80,0.4)", zIndex: 2 }} />
                <div style={{ position: "absolute", bottom: 8, right: 8, width: 24, height: 24, borderBottom: "1px solid rgba(200,160,80,0.4)", borderRight: "1px solid rgba(200,160,80,0.4)", zIndex: 2 }} />

                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </FadeIn>

            {/* Content */}
            <div>
              <FadeIn delay={0.15}>
                <div className="font-body" style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(200,160,80,0.5)", marginBottom: 16 }}>
                  0{index + 1} — Service
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 400, marginBottom: 8, lineHeight: 1.2 }}>
                  {service.title}
                </h2>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p className="font-display" style={{ fontSize: 20, fontWeight: 300, fontStyle: "italic", color: "#c9a96e", marginBottom: service.price ? 8 : 32 }}>
                  {service.subtitle}
                </p>
                {service.price && (
                  <div className="font-body" style={{ fontSize: 28, fontWeight: 500, color: "#c9a96e", marginBottom: 32, letterSpacing: "0.02em" }}>
                    {service.price}
                  </div>
                )}
              </FadeIn>

              <FadeIn delay={0.3}>
                <div>
                  {service.description.map((para, i) => (
                    <p
                      key={i}
                      className="font-body"
                      style={{
                        fontSize: 15,
                        fontWeight: 300,
                        color: "rgba(232,213,181,0.55)",
                        lineHeight: 1.85,
                        marginBottom: 18,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </FadeIn>

              {/* Highlights */}
              <FadeIn delay={0.35}>
                <div style={{ margin: "28px 0 36px", padding: "20px 0", borderTop: "1px solid rgba(200,160,80,0.1)", borderBottom: "1px solid rgba(200,160,80,0.1)" }}>
                  {service.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="font-body"
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        color: "rgba(232,213,181,0.7)",
                        padding: "8px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <span style={{ color: "#c9a96e", fontSize: 8 }}>✦</span>
                      {h}
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* CTA Buttons */}
              <FadeIn delay={0.4}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <a
                    href="tel:5717285900"
                    className="cta-btn-primary cta-btn font-body"
                    style={{
                      padding: "14px 36px",
                      fontSize: 12,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Book Now
                  </a>
                  <a
                    href="tel:5717285900"
                    className="cta-btn font-body"
                    style={{
                      padding: "14px 36px",
                      fontSize: 12,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    Call 571-728-5900
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* ─── BOTTOM CTA ─── */}
      <section style={{ padding: "100px 32px", textAlign: "center", position: "relative" }}>
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

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,160,80,0.04) 0%, transparent 60%)",
          }}
        />

        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <FadeIn>
            <h2 className="font-display" style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 400, marginBottom: 24, lineHeight: 1.2 }}>
              Ready to Begin
              <br />
              Your Journey?
            </h2>
            <Divider />
            <p className="font-body" style={{ fontSize: 16, fontWeight: 300, color: "rgba(232,213,181,0.5)", maxWidth: 480, margin: "24px auto 40px", lineHeight: 1.8 }}>
              Visit us in person or call to schedule your appointment.
              Walk-ins are always welcome.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <a
              href="tel:5717285900"
              className="font-display"
              style={{
                display: "block",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 300,
                color: "#c9a96e",
                textDecoration: "none",
                marginBottom: 12,
                letterSpacing: "0.06em",
              }}
            >
              571-728-5900
            </a>
            <p className="font-body" style={{ fontSize: 14, color: "rgba(232,213,181,0.5)", marginBottom: 8 }}>
              LunaPsychic1111@gmail.com
            </p>
            <a
              href="https://maps.google.com/?q=5716+Telegraph+Rd+Alexandria+VA+22303"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body"
              style={{ fontSize: 14, color: "rgba(200,160,80,0.5)", textDecoration: "none", display: "block", marginBottom: 12 }}
            >
              5716 Telegraph Rd, Alexandria, VA 22303
            </a>
            <p className="font-body" style={{ fontSize: 13, color: "rgba(232,213,181,0.4)", marginBottom: 40, fontStyle: "italic" }}>
              All readings are by appointment only &nbsp;·&nbsp; Payment due at time of booking
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="tel:5717285900"
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
                href="/"
                className="cta-btn font-body"
                style={{
                  padding: "16px 44px",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Back to Home
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
              5716 Telegraph Rd, Alexandria, VA 22303
            </div>
            <div className="font-body" style={{ fontSize: 12, color: "rgba(232,213,181,0.35)", letterSpacing: "0.1em", marginTop: 4 }}>
              571-728-5900 &nbsp;·&nbsp; LunaPsychic1111@gmail.com
            </div>
          </div>

          <div className="font-body" style={{ display: "flex", gap: 28, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {["Home", "Services", "About", "Contact"].map((l) => (
              <a
                key={l}
                href={l === "Home" ? "/" : l === "Services" ? "/services" : `/#${l.toLowerCase()}`}
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
          </div>

          <div className="font-body" style={{ fontSize: 11, color: "rgba(232,213,181,0.25)", letterSpacing: "0.05em" }}>
            © 2026 Krishna&apos;s Karma. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
