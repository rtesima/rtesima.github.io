// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Tema claro/escuro ----------
(function () {
  const root = document.documentElement;
  const btn = document.querySelector(".theme-toggle");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  btn.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

// ---------- Borda do cabeçalho ao rolar ----------
(function () {
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ---------- Filtro de projetos ----------
(function () {
  const buttons = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
      projects.forEach(function (p) {
        p.hidden = filter !== "todos" && p.dataset.category !== filter;
      });
    });
  });
})();

// ---------- Animação de entrada suave ----------
(function () {
  const items = document.querySelectorAll(".section-head, .prose, .project, .timeline li, .contact .container");
  if (!("IntersectionObserver" in window)) return;

  items.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
})();
