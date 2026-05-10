const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 60);
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.skill-fill').forEach(bar => {
      setTimeout(() => bar.style.width = bar.dataset.w + '%', 200);
    });
    skillObs.unobserve(entry.target);
  });
}, { threshold: 0.3 });
const sl = document.getElementById('skills-list');
if (sl) skillObs.observe(sl);

const progObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill = document.getElementById('prog-fill');
    const pct  = document.getElementById('prog-pct');
    if (!fill) return;
    const target = +fill.dataset.w;
    setTimeout(() => {
      fill.style.width = target + '%';
      let n = 0;
      const t = setInterval(() => {
        n++;
        pct.textContent = n + '%';
        if (n >= target) clearInterval(t);
      }, 14);
    }, 300);
    progObs.unobserve(entry.target);
  });
}, { threshold: 0.5 });
const pfill = document.getElementById('prog-fill');
if (pfill) progObs.observe(pfill.closest('.study-card'));

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.padding = window.scrollY > 40 ? '0.75rem 5rem' : '1.1rem 5rem';
});