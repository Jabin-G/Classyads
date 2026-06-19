document.addEventListener('DOMContentLoaded', () => {
    // Mobile nav
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle && navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Year
    const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Counters
    const counters = document.querySelectorAll('.num');
    const runCounter = el => {
        const target = +el.dataset.target || 0; let cur = 0; const dur = 1400; const step = Math.max(1, Math.floor(target / (dur / 16)));
        const tick = () => { cur += step; if (cur >= target) { el.textContent = target.toLocaleString(); } else { el.textContent = cur.toLocaleString(); requestAnimationFrame(tick); } };
        tick();
    };
    if (counters.length) {
        const io = new IntersectionObserver((entries, obs) => { entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); } }); }, { threshold: 0.45 });
        counters.forEach(c => io.observe(c));
    }

    // Wishlist buttons
    document.querySelectorAll('.wish').forEach(b => b.addEventListener('click', () => { const cur = b.getAttribute('aria-pressed') === 'true'; b.setAttribute('aria-pressed', !cur); b.classList.toggle('active', !cur); }));

    // Add to cart
    const cartCount = document.getElementById('cartCount'); let cart = 0;
    document.querySelectorAll('.add-cart').forEach(btn => btn.addEventListener('click', () => { cart++; if (cartCount) cartCount.textContent = cart; btn.textContent = 'Added'; setTimeout(() => btn.textContent = 'Add to cart', 900); }));

    // Countdown timer (next 24 hours)
    const countdown = document.getElementById('countdown');
    if (countdown) {
        const end = Date.now() + 1000 * 60 * 60 * 6; // 6 hours demo
        const fmt = n => String(n).padStart(2, '0');
        const tick = () => {
            const diff = Math.max(0, end - Date.now());
            const h = Math.floor(diff / 3600000); const m = Math.floor((diff % 3600000) / 60000); const s = Math.floor((diff % 60000) / 1000);
            countdown.textContent = `${fmt(h)}:${fmt(m)}:${fmt(s)}`;
            if (diff > 0) requestAnimationFrame(tick);
        };
        tick();
    }

    // Simple reviews carousel
    const rc = document.querySelector('.reviews-carousel');
    if (rc) { let i = 0; const slides = [...rc.children]; const show = idx => { slides.forEach((s, si) => s.style.display = si === idx ? 'block' : 'none'); }; show(0); setInterval(() => { i = (i + 1) % slides.length; show(i); }, 4500); }

    // Brands marquee auto-scroll
    const marquee = document.querySelector('.brands-marquee');
    if (marquee) { let x = 0; setInterval(() => { x = (x + 1) % marquee.scrollWidth; marquee.scrollTo({ left: x, behavior: 'smooth' }); }, 2500); }

    // Newsletter form demo
    const nf = document.getElementById('newsletterForm'); if (nf) nf.addEventListener('submit', e => { e.preventDefault(); alert('Thanks — subscribed (demo)'); nf.reset(); });
});
