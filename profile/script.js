/**
 * Portfolio — script.js
 * Features: Loader, Cursor, Particles, Typing, Navbar, Scroll Animations,
 *           Counters, Skill Bars, Radar Chart, Project Filter, Modals,
 *           Contact Form, Theme Toggle, Back to Top, Scroll Progress
 */

/* ═══════════════════════════════════════════════════════════════
   DATA — Replace with your actual content
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS_DATA = [
  {
    title: "TravelShield",
    category: "Web App",
    desc: "A comprehensive travel safety platform that provides real-time alerts, emergency assistance, and safety resources for travelers worldwide. The platform aggregates data from various sources to offer personalized safety recommendations, local emergency contacts, and a community forum for sharing travel experiences and tips.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/adityagarg0020/travelshield.git",
    demo: "https://travelsafeshild.netlify.app/"
  },
  {
    title: "Strike",
    category: "Frontend",
    desc: "A responsive web application built with modern frontend technologies. This project showcases a clean and intuitive user interface with interactive elements and smooth animations.",
    tags: ["HTML", "CSS"],
    github: "https://github.com/adityagarg0020/strike.git",
    demo: "https://strikewithcodearmy.netlify.app/"
  },
  {
    title: "SkillSwap",
    category: "Full Stack",
    desc: "A platform that allows users to exchange skills and knowledge with each other. The application features user profiles, skill listings, and a matching system to connect users with complementary skills.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/adityagarg0020/skillswap.git",
    demo: "Soon"
  },
];

const CERTS_DATA = [
  { title: "Binary Codes 4.0", org: "Binary Club", date: "August 2025", img: "certificates/cert-1.jpg" },
  { title: "Tranning in C Programming", org: "IT Skills", date: "July 2024", img: "certificates/cert-2.jpg" }
];

const TYPED_WORDS = [
  "web applications.",
  "clean interfaces.",
  "scalable systems.",
  "elegant solutions.",
  "things that matter."
];

const RADAR_DATA = {
  labels: ["Frontend", "Backend", "Algorithms", "Databases", "DevOps", "Problem Solving"],
  values: [82, 75, 80, 70, 60, 88]
};

/* ═══════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initCursor();
  initParticles();
  initNavbar();
  initTyping();
  initScrollProgress();
  initScrollAnimations();
  initCounters();
  initSkillBars();
  initRadarChart();
  initProjectFilter();
  initProjectModal();
  initCertModal();
  initContactForm();
  initThemeToggle();
  initBackToTop();
  document.getElementById("footer-year").textContent = new Date().getFullYear();
});

/* ═══════════════════════════════════════════════════════════════
   LOADER
   ═══════════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById("loader");
  const body = document.body;
  body.classList.add("loading");

  let sub = loader.querySelector(".loader-sub");
  const msgs = ["Initializing...", "Loading assets...", "Almost ready..."];
  let mi = 0;
  const interval = setInterval(() => {
    mi = (mi + 1) % msgs.length;
    if (sub) sub.textContent = msgs[mi];
  }, 500);

  window.addEventListener("load", () => {
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add("hidden");
      body.classList.remove("loading");
    }, 500);
  });

  // Fallback after 3s
  setTimeout(() => {
    loader.classList.add("hidden");
    body.classList.remove("loading");
  }, 3000);
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════════════════ */
function initCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  // Smooth ring lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect
  const interactables = "a, button, .project-card, .cert-card, .stat-card, input, textarea, .filter-btn";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(interactables)) ring.classList.add("hover");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(interactables)) ring.classList.remove("hover");
  });

  // Hide on mobile
  if (window.matchMedia("(pointer: coarse)").matches) {
    dot.style.display = "none";
    ring.style.display = "none";
    document.body.style.cursor = "auto";
  }
}

/* ═══════════════════════════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  let mouseX = W / 2, mouseY = H / 2;

  window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const isDark = () => document.documentElement.getAttribute("data-theme") !== "light";

  // Create particles
  const COUNT = 70;
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    color: Math.random() < 0.5 ? "#5eead4" : "#f472b6"
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Mouse attraction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        p.vx += dx / dist * 0.015;
        p.vy += dy / dist * 0.015;
      }

      // Speed limit
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.5) { p.vx /= speed; p.vy /= speed; }

      // Wrap edges
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark()
        ? p.color.replace(")", `,${p.opacity})`).replace("rgb", "rgba").replace("#5eead4", "rgba(94,234,212,")
          .replace("#f472b6", "rgba(244,114,182,")
        : "rgba(15,118,110,0.15)";
      ctx.fillStyle = p.color;
      ctx.globalAlpha = isDark() ? p.opacity * 0.7 : p.opacity * 0.3;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const cx = p.x - q.x, cy = p.y - q.y;
        const cd = Math.sqrt(cx * cx + cy * cy);
        if (cd < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = isDark()
            ? `rgba(94,234,212,${0.08 * (1 - cd / 120)})`
            : `rgba(15,118,110,${0.05 * (1 - cd / 120)})`;
          ctx.globalAlpha = 1;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const links = navLinks.querySelectorAll(".nav-link");

  // Scroll effect
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
    updateActiveLink();
  });

  // Hamburger
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close on link click (mobile)
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Active link on scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id], footer[id]");
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
    });
  }

  updateActiveLink();
}

/* ═══════════════════════════════════════════════════════════════
   TYPING ANIMATION
   ═══════════════════════════════════════════════════════════════ */
function initTyping() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  let wi = 0, ci = 0, isDeleting = false;

  function type() {
    const word = TYPED_WORDS[wi];
    el.textContent = isDeleting ? word.slice(0, ci--) : word.slice(0, ci++);

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && ci > word.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && ci < 0) {
      isDeleting = false;
      ci = 0;
      wi = (wi + 1) % TYPED_WORDS.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1200);
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ═══════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(window.scrollY / max) * 100}%`;
  });
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL ANIMATIONS — Intersection Observer
   ═══════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTERS
   ═══════════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num[data-count]");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 1600;
    const start = performance.now();

    function step(ts) {
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
}

/* ═══════════════════════════════════════════════════════════════
   SKILL BARS
   ═══════════════════════════════════════════════════════════════ */
function initSkillBars() {
  const fills = document.querySelectorAll(".sb-fill");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const item = fill.closest(".skill-bar-item");
          const pct = item ? item.dataset.pct : 0;
          setTimeout(() => {
            fill.style.width = pct + "%";
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach(f => observer.observe(f));
}

/* ═══════════════════════════════════════════════════════════════
   RADAR CHART — Pure Canvas JS
   ═══════════════════════════════════════════════════════════════ */
function initRadarChart() {
  const canvas = document.getElementById("radar-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const { labels, values } = RADAR_DATA;
  const N = labels.length;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const R = Math.min(cx, cy) - 50;
  const MAX = 100;
  const LEVELS = 5;

  function getColor(key) {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "light"
      ? { grid: "rgba(0,0,0,0.08)", label: "#475569", fill: "rgba(15,118,110,0.2)", stroke: "#0f766e", dot: "#0f766e" }
      : { grid: "rgba(255,255,255,0.06)", label: "#64748b", fill: "rgba(94,234,212,0.15)", stroke: "#5eead4", dot: "#5eead4" };
  }

  function getPoint(i, val) {
    const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
    const r = (val / MAX) * R;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  function draw() {
    const c = getColor();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid levels
    for (let l = 1; l <= LEVELS; l++) {
      const r = (l / LEVELS) * R;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = c.grid;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis lines
    for (let i = 0; i < N; i++) {
      const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
      ctx.strokeStyle = c.grid;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data polygon
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const pt = getPoint(i, values[i]);
      i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.fillStyle = c.fill;
    ctx.fill();
    ctx.strokeStyle = c.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data dots
    for (let i = 0; i < N; i++) {
      const pt = getPoint(i, values[i]);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = c.dot;
      ctx.fill();
      ctx.strokeStyle = c.dot;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Labels
    ctx.font = "600 11px 'DM Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < N; i++) {
      const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
      const lx = cx + (R + 28) * Math.cos(angle);
      const ly = cy + (R + 28) * Math.sin(angle);
      ctx.fillStyle = c.label;
      ctx.fillText(labels[i], lx, ly);
    }
  }

  draw();

  // Redraw on theme change
  const observer = new MutationObserver(draw);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Animate in
  const wrapObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { draw(); wrapObs.disconnect(); }
  }, { threshold: 0.5 });
  wrapObs.observe(canvas);
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT FILTER
   ═══════════════════════════════════════════════════════════════ */
function initProjectFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.transition = `all 0.4s ease ${i * 0.05}s`;
        if (match) {
          card.classList.remove("hidden");
          card.style.opacity = "1";
          card.style.transform = "";
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.9)";
          setTimeout(() => { if (btn.dataset.filter === filter) card.classList.add("hidden"); }, 400);
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT MODAL
   ═══════════════════════════════════════════════════════════════ */
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("project-modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  const mCategory = document.getElementById("modal-category");
  const mTitle = document.getElementById("modal-title");
  const mDesc = document.getElementById("modal-desc");
  const mTags = document.getElementById("modal-tags");
  const mGithub = document.getElementById("modal-github");
  const mDemo = document.getElementById("modal-demo");

  document.querySelectorAll(".pc-preview-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.project);
      const project = PROJECTS_DATA[idx];
      if (!project) return;

      mCategory.textContent = project.category;
      mTitle.textContent = project.title;
      mDesc.textContent = project.desc;
      mTags.innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join("");
      mGithub.href = project.github;
      mDemo.href = project.demo;

      openModal(modal);
    });
  });

  closeBtn.addEventListener("click", () => closeModal(modal));
  overlay.addEventListener("click", () => closeModal(modal));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal(modal);
  });
}

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE MODAL
   ═══════════════════════════════════════════════════════════════ */
function initCertModal() {
  const modal = document.getElementById("cert-modal");
  const closeBtn = document.getElementById("cert-modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  const cTitle = document.getElementById("cert-modal-title");
  const cOrg = document.getElementById("cert-modal-org");
  const cDate = document.getElementById("cert-modal-date");
  const cImgWrap = modal.querySelector(".cert-modal-img");

  document.querySelectorAll(".cert-view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.cert);
      const cert = CERTS_DATA[idx];
      if (!cert) return;

      cTitle.textContent = cert.title;
      cOrg.textContent = cert.org;
      cDate.textContent = `📅 ${cert.date}`;

      // Try to show actual image; fall back to placeholder
      const existingImg = cImgWrap.querySelector("img");
      if (existingImg) existingImg.remove();

      const img = new Image();
      img.src = cert.img;
      img.alt = cert.title;
      img.style.cssText = "width:100%;height:100%;object-fit:contain;";
      img.onload = () => {
        const placeholder = cImgWrap.querySelector(".cert-modal-placeholder");
        if (placeholder) placeholder.style.display = "none";
        cImgWrap.appendChild(img);
      };
      img.onerror = () => {
        const placeholder = cImgWrap.querySelector(".cert-modal-placeholder");
        if (placeholder) placeholder.style.display = "flex";
      };

      openModal(modal);
    });
  });

  closeBtn.addEventListener("click", () => closeModal(modal));
  overlay.addEventListener("click", () => closeModal(modal));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal(modal);
  });
}

function openModal(modal) {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameEl = document.getElementById("cf-name");
  const emailEl = document.getElementById("cf-email");
  const msgEl = document.getElementById("cf-message");
  const errName = document.getElementById("err-name");
  const errEmail = document.getElementById("err-email");
  const errMsg = document.getElementById("err-message");
  const submitBtn = document.getElementById("submit-btn");
  const successEl = document.getElementById("form-success");

  function validate() {
    let valid = true;

    // Name
    if (!nameEl.value.trim()) {
      errName.textContent = "Name is required.";
      nameEl.classList.add("error");
      valid = false;
    } else {
      errName.textContent = "";
      nameEl.classList.remove("error");
    }

    // Email
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl.value.trim()) {
      errEmail.textContent = "Email is required.";
      emailEl.classList.add("error");
      valid = false;
    } else if (!emailReg.test(emailEl.value)) {
      errEmail.textContent = "Please enter a valid email.";
      emailEl.classList.add("error");
      valid = false;
    } else {
      errEmail.textContent = "";
      emailEl.classList.remove("error");
    }

    // Message
    if (!msgEl.value.trim() || msgEl.value.trim().length < 10) {
      errMsg.textContent = "Message must be at least 10 characters.";
      msgEl.classList.add("error");
      valid = false;
    } else {
      errMsg.textContent = "";
      msgEl.classList.remove("error");
    }

    return valid;
  }

  // Live validation
  [nameEl, emailEl, msgEl].forEach(el => {
    el.addEventListener("input", () => {
      if (el.classList.contains("error")) validate();
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate send
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = "none";
    if (btnLoading) btnLoading.style.display = "inline";

    setTimeout(() => {
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = "inline";
      if (btnLoading) btnLoading.style.display = "none";
      successEl.style.display = "block";
      form.reset();
      setTimeout(() => { successEl.style.display = "none"; }, 5000);
    }, 1800);
  });
}

/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════════════════════ */
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem("portfolio-theme") || "dark";
  root.setAttribute("data-theme", saved);

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });
}

/* ═══════════════════════════════════════════════════════════════
   BACK TO TOP
   ═══════════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ═══════════════════════════════════════════════════════════════
   MOUSE PARALLAX (Hero orbs)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("mousemove", e => {
  const orbs = document.querySelectorAll(".floating-orb");
  const px = (e.clientX / window.innerWidth - 0.5) * 2;
  const py = (e.clientY / window.innerHeight - 0.5) * 2;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${px * factor}px, ${py * factor}px)`;
  });
});

/* ═══════════════════════════════════════════════════════════════
to recive the message in email
══════════════════════════════════════════════════════════════ */
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service",
    "template",
    this
  ).then(() => {
    alert("Message Sent Successfully!");
  }, (error) => {
    alert("Failed to send message");
    console.log(error);
  });
});
