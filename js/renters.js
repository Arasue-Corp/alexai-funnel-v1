// ============================================
// ALEX INSURTECH — RENTERS JS
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
    const tabs = document.querySelectorAll('.rt-cov-tab');
    const panels = document.querySelectorAll('.rt-cov-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById(target);
            if (panel) {
                panel.classList.add('active');
                const cards = panel.querySelectorAll('.rt-cov-card, .rt-scenario-card');
                cards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.38s cubic-bezier(0.34,1.56,0.64,1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 50);
                });
            }
        });
    });

    // ---- QUOTE FORM — direct to rater ----
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-main');
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating Quote...';
            btn.style.background = 'var(--alex-mid)';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Redirecting...';
                btn.style.background = '#10B981';
                window.location.href = 'https://alexai.cloud/form-renters/';
            }, 1000);
        });
    }

    // ---- SOCIAL PROOF ----
    initSocialProof();
});

function initSocialProof() {
    const container = document.getElementById('social-proof-container');
    if (!container) return;

    const cities = ["Tempe", "Downtown Phoenix", "Scottsdale", "Mesa", "Tucson", "Flagstaff", "Glendale", "Chandler"];
    const actions = [
        { icon: 'fa-key', color: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', label: 'Renters Policy Bound' },
        { icon: 'fa-file-pdf', color: 'linear-gradient(135deg,#10b981,#059669)', label: 'Proof Sent to Landlord' },
        { icon: 'fa-laptop', color: 'linear-gradient(135deg,#3b82f6,#06b6d4)', label: 'Tech & Gear Covered' }
    ];

    function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function getNum(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

    function createNotification() {
        const item = getRandom(actions);
        const city = getRandom(cities);
        const price = getNum(12, 22);
        const time = getNum(1, 8);

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
                    <div class="sp-details">Covered in <strong>${city}, AZ</strong></div>
                    <div class="sp-saving-badge"><i class="fa-solid fa-bolt"></i> Just $${price}/mo</div>
                </div>
                <button class="sp-close-btn" onclick="this.closest('.sp-card-tech').remove()"><i class="fa-solid fa-xmark"></i></button>
            </div>`;
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('visible'));
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 600);
        }, 5000);
    }

    function loop() {
        setTimeout(() => { createNotification(); loop(); }, getNum(7000, 12000));
    }
    setTimeout(loop, 3000);
}
