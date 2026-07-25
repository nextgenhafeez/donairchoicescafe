/* Donair Choices Cafe — interactions */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---- Sticky header shadow ---- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  const toggle = $("#navToggle");
  const links  = $("#navLinks");
  const scrim  = $("#navScrim");
  const setNav = (open) => {
    links.classList.toggle("open", open);
    scrim.classList.toggle("show", open);
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  };
  toggle.addEventListener("click", () => setNav(!links.classList.contains("open")));
  scrim.addEventListener("click", () => setNav(false));
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setNav(false); });

  /* ---- Menu category filter ---- */
  const filters = $$(".filter");
  const cats    = $$(".menu-cat");
  filters.forEach(btn => btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.cat;
    cats.forEach(c => {
      const show = cat === "all" || c.dataset.cat === cat;
      c.style.display = show ? "" : "none";
      if (show) { c.classList.remove("in"); requestAnimationFrame(() => c.classList.add("in")); }
    });
  }));

  /* ---- Scroll reveal ---- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("in"));
  }

  /* ---- Gallery lightbox ---- */
  const lb    = $("#lightbox");
  const lbImg = $("#lbImg");
  const close = () => lb.classList.remove("open");
  $$("#galGrid .gal-item img").forEach(img => {
    img.parentElement.addEventListener("click", () => {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lb.classList.add("open");
    });
  });
  $("#lbClose").addEventListener("click", close);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  /* ---- Highlight today's hours ---- */
  const today = new Date().getDay();
  const row = $('#hoursList li[data-day="' + today + '"]');
  if (row) { row.classList.add("today"); const b = row.querySelector("b"); if (b) b.insertAdjacentText("beforeend", " · Today"); }

  /* ---- Footer year ---- */
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
