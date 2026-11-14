"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { about, artist, experiences, gallery, slides, type Piece } from "@/lib/data";

const SLIDE_MS = 3000;

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.2 3.2h9.6v9.6M12.8 3.2 3.2 12.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Lightbox({ piece, onClose }: { piece: Piece | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!piece) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [piece, onClose]);

  if (!piece) return null;

  return (
    <div className="lb" role="presentation" onClick={onClose}>
      <figure
        className="lb-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <img src={piece.src} alt={piece.alt} />
        <figcaption>
          <strong id={titleId}>{piece.title}</strong>
          <span>
            {piece.medium} · {piece.year}
          </span>
        </figcaption>
        <button ref={closeRef} type="button" className="lb-x" onClick={onClose} aria-label="Close">
          ×
        </button>
      </figure>
    </div>
  );
}

const NAV = {
  DE: [
    { id: "top", label: "Start" },
    { id: "about", label: "Über mich" },
    { id: "gallery", label: "Galerie" },
    { id: "experience", label: "Erfahrung" },
    { id: "contact", label: "Kontakt" },
  ],
  EN: [
    { id: "top", label: "Home" },
    { id: "about", label: "About" },
    { id: "gallery", label: "Gallery" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
} as const;

const LANG_LABEL = { DE: "Deutsch", EN: "English" } as const;

function coverSlot(itemIndex: number, active: number, total: number) {
  let delta = itemIndex - active;
  const half = total / 2;
  if (delta > half) delta -= total;
  if (delta < -half) delta += total;
  if (delta < -2 || delta > 2) return "far";
  return String(delta);
}

export function PortfolioBoard() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState<Piece | null>(null);
  const [section, setSection] = useState("top");
  const [lang, setLang] = useState<keyof typeof NAV>("EN");
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const opener = useRef<HTMLButtonElement | null>(null);
  const scrollLock = useRef<string | null>(null);
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const count = slides.length;

  const scrollToSection = useCallback((id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    scrollLock.current = id;
    setSection(id);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    }
    window.history.pushState(null, "", `#${id}`);
    window.setTimeout(() => {
      if (scrollLock.current === id) scrollLock.current = null;
    }, 900);
  }, []);

  const jump = useCallback(
    (id: string) => {
      setMenuOpen(false);
      setLangOpen(false);
      scrollToSection(id);
    },
    [scrollToSection],
  );

  useEffect(() => {
    if (!menuOpen && !langOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, langOpen]);

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [count]);

  useEffect(() => {
    const nodes = Object.values(NAV.EN)
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLock.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const open = useCallback((piece: Piece, el: HTMLButtonElement) => {
    opener.current = el;
    setActive(piece);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);

  const slide = slides[index];

  return (
    <div className="site">
      <a
        className="skip"
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("top");
        }}
      >
        Skip to content
      </a>
      {menuOpen && (
        <button type="button" className="nav-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      )}
      <div className="nav-shell">
        <header className={`nav ${menuOpen ? "is-open" : ""}`}>
          <a
            className="brand"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              jump("top");
            }}
          >
            {artist.name}
          </a>
          <nav id="site-menu" className="nav-links" aria-label="Sections">
            {NAV[lang].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={section === item.id ? "is-on" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  jump(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="lang-row" role="group" aria-label="Language">
              {(["EN", "DE"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  className={lang === code ? "is-on" : ""}
                  aria-pressed={lang === code}
                  onClick={() => setLang(code)}
                >
                  {LANG_LABEL[code]}
                </button>
              ))}
            </div>
          </nav>
          <div className="nav-tools">
            <div className="lang">
              <button
                type="button"
                className="lang-btn"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                onClick={() => setLangOpen((open) => !open)}
              >
                {lang}
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.2 4.2 6 8l3.8-3.8" />
                </svg>
              </button>
              {langOpen && (
                <ul className="lang-menu" role="listbox" aria-label="Language">
                  {(["EN", "DE"] as const).map((code) => (
                    <li key={code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={lang === code}
                        onClick={() => {
                          setLang(code);
                          setLangOpen(false);
                        }}
                      >
                        {LANG_LABEL[code]}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              className="burger"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setLangOpen(false);
                setMenuOpen((open) => !open);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>
      </div>

      <main>
        <section
          className="hero"
          id="top"
          aria-roledescription="carousel"
          aria-label="Selected paintings"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") go(index + 1);
            if (event.key === "ArrowLeft") go(index - 1);
          }}
        >
          {slides.map((item, itemIndex) => (
            <div key={item.id} className={`slide ${itemIndex === index ? "is-on" : ""}`} aria-hidden={itemIndex !== index}>
              <img src={item.src} alt="" style={{ background: item.tone }} />
              <div className="slide-shade" />
            </div>
          ))}

          <div className="hero-copy">
            <p className="eyebrow">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <h1>{slide.title}</h1>
            <p>
              {slide.medium} · {slide.year}
            </p>
          </div>

          <div className="hero-controls">
            <div className="dots" role="tablist" aria-label="Slides">
              <span className="thumb-frame" style={{ transform: `translateX(calc(${index} * (var(--thumb-w) + var(--gap))))` }} aria-hidden="true" />
              {slides.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  className={itemIndex === index ? "is-on" : ""}
                  aria-selected={itemIndex === index}
                  aria-label={`Show ${item.title}`}
                  onClick={() => go(itemIndex)}
                >
                  <img src={item.src} alt="" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="band about" id="about">
          <div className="wrap about-grid">
            <figure className="about-photo" style={{ background: about.image.tone }}>
              <img src={about.image.src} alt={about.image.alt} />
            </figure>
            <div>
              <h2>About Me</h2>
              <p className="lede">{artist.intro}</p>
              <p>{about.text}</p>
            </div>
          </div>
        </section>

        <section className="band gallery" id="gallery">
          <div className="cover">
            <div className="cover-copy">
              <h2>{gallery[galleryIndex].title}</h2>
              <p>{artist.name}</p>
            </div>
            <div
              className="cover-stage"
              aria-label="Paintings"
              onTouchStart={(event) => {
                const touch = event.changedTouches[0];
                swipe.current = { x: touch.clientX, y: touch.clientY, moved: false };
              }}
              onTouchEnd={(event) => {
                const start = swipe.current;
                if (!start) return;
                const touch = event.changedTouches[0];
                const dx = touch.clientX - start.x;
                const dy = touch.clientY - start.y;
                if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
                start.moved = true;
                setGalleryIndex((current) => (current + (dx < 0 ? 1 : -1) + gallery.length) % gallery.length);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") setGalleryIndex((current) => (current + 1) % gallery.length);
                if (event.key === "ArrowLeft") setGalleryIndex((current) => (current - 1 + gallery.length) % gallery.length);
              }}
            >
              {gallery.map((item, itemIndex) => {
                const slot = coverSlot(itemIndex, galleryIndex, gallery.length);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="cover-card"
                    data-pos={slot}
                    style={{ background: item.tone }}
                    aria-hidden={slot === "far"}
                    tabIndex={slot === "far" ? -1 : 0}
                    aria-label={slot === "0" ? `Open ${item.title}` : `Show ${item.title}`}
                    onClick={(event) => {
                      if (swipe.current?.moved) {
                        swipe.current.moved = false;
                        return;
                      }
                      if (slot === "0") open(item, event.currentTarget);
                      else if (slot !== "far") setGalleryIndex(itemIndex);
                    }}
                  >
                    <img src={item.src} alt="" />
                  </button>
                );
              })}
            </div>
            <div className="cover-arrows">
              <button
                type="button"
                aria-label="Previous painting"
                onClick={() => setGalleryIndex((current) => (current - 1 + gallery.length) % gallery.length)}
              >
                ‹
              </button>
              <button
                type="button"
                className="is-next"
                aria-label="Next painting"
                onClick={() => setGalleryIndex((current) => (current + 1) % gallery.length)}
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="band experience" id="experience">
          <div className="wrap">
            <h2>Experiences</h2>
            <ul className="exp-list">
              {experiences.map((item) => (
                <li key={item.place}>
                  <Arrow />
                  <div>
                    <strong>{item.place}</strong>
                    <small>{item.role}</small>
                  </div>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band contact" id="contact">
          <div className="wrap">
            <h2>
              Let&apos;s Work
              <br />
              Together
            </h2>
            <p>Commissions, exhibitions and studio visits.</p>
            <ul className="contact-lines">
              <li>
                <a href={`mailto:${artist.email}`}>{artist.email}</a>
              </li>
              <li>
                <a href={`tel:${artist.phone.replace(/\s/g, "")}`}>{artist.phone}</a>
              </li>
              <li>{artist.site}</li>
            </ul>
          </div>
        </section>
      </main>
      <footer className="site-foot">
        <div className="wrap">
          <strong>
            {artist.name} © {artist.year}
          </strong>
        </div>
      </footer>
      <Lightbox piece={active} onClose={close} />
    </div>
  );
}
