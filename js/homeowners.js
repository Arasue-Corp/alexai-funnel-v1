// ============================================
// ALEX INSURTECH — HOMEOWNERS JS
// ============================================

function openModal() { document.getElementById('appModal').classList.add('open'); }

document.addEventListener('DOMContentLoaded', function () {

    // ---- SCROLL REVEAL ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ---- COVERAGE TABS ----
    const tabs = document.querySelectorAll('.hw-cov-tab');
    const panels = document.querySelectorAll('.hw-cov-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById(target);
            if (panel) {
                panel.classList.add('active');
                const cards = panel.querySelectorAll('.hw-cov-card, .hw-addon-card');
                cards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(18px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 55);
                });
            }
        });
    });

    // ---- LEAD FORM SUBMIT ----
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-main');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting...';
            btn.style.background = 'var(--alex-mid)';
            btn.disabled = true;

            // *** YOUR TEAM CONNECTS THIS ENDPOINT ***
            // Replace the URL below with your actual form handler
            fetch('https://alexai.cloud/form-homeowners/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Received!';
                btn.style.background = '#10B981';
                // Optional: redirect or show success message
                // window.location.href = '/thank-you-homeowners/';
            })
            .catch(() => {
                // Fallback even if fetch fails — redirect to backup URL
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Connected!';
                btn.style.background = '#10B981';
                setTimeout(() => {
                    window.location.href = 'https://alexai.cloud/form-homeowners/';
                }, 1200);
            });
        });
    }

    // ---- SOCIAL PROOF ----
    initSocialProof();
});

function initSocialProof() {
    const container = document.getElementById('social-proof-container');
    if (!container) return;

    const cities = ["Phoenix", "Scottsdale", "Mesa", "Chandler", "Gilbert", "Tucson", "Flagstaff", "Paradise Valley", "Peoria", "Glendale"];
    const actions = [
        { icon: 'fa-house-chimney', color: 'linear-gradient(135deg,#10b981,#059669)', label: 'Home Policy Bound' },
        { icon: 'fa-layer-group', color: 'linear-gradient(135deg,#3b82f6,#06b6d4)', label: 'Home + Auto Bundle' },
        { icon: 'fa-building', color: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', label: 'Condo Insured' }
    ];

    function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function getNum(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

    function createNotification() {
        const item = getRandom(actions);
        const city = getRandom(cities);
        const savings = getNum(350, 1100);
        const time = getNum(2, 15);

        const toast = document.createElement('div');
        toast.className = 'sp-card-tech';
        toast.innerHTML = `
            <div class="sp-aurora-border"></div>
            <div class="sp-shimmer-effect"></div>
            <div class="sp-glass-content">
                <div class="sp-icon-box" style="background:${item.color}">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <div class="sp-info">
                    <div class="sp-top-row">
                        <span class="sp-type">${item.label}</span>
                        <span class="sp-ago">${time}m ago</span>
                    </div>
                    <div class="sp-details">Protected in <strong>${city}, AZ</strong></div>
                    <div class="sp-saving-badge"><i class="fa-solid fa-arrow-trend-down"></i> Saved $${savings}/yr</div>
                </div>
                <button class="sp-close-btn" onclick="this.closest('.sp-card-tech').remove()"><i class="fa-solid fa-xmark"></i></button>
            </div>`;
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('visible'));
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 600);
        }, 6500);
    }

    function loop() {
        setTimeout(() => { createNotification(); loop(); }, getNum(9000, 16000));
    }
    setTimeout(loop, 4500);
}
