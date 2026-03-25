// ============================================
// ALEX AI — IMPROVEMENTS JS
// Coverage tabs + Social Proof + Scroll Reveal
// ============================================

// ---- COVERAGE TABS ----
document.addEventListener('DOMContentLoaded', function () {

    // Tab switcher
    const tabs = document.querySelectorAll('.cov-tab');
    const panels = document.querySelectorAll('.coverage-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const panel = document.getElementById('panel-' + target);
            if (panel) {
                panel.classList.add('active');
                // Animate cards in
                const cards = panel.querySelectorAll('.cov-card');
                cards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 60);
                });
            }
        });
    });

    // ---- SCROLL REVEAL (extend original observer) ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ---- SOCIAL PROOF ----
    initSocialProof();
});

// ---- OPEN MODAL ----
function openModal() {
    document.getElementById('appModal').classList.add('open');
}

// ---- QUOTE FORM ----
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let btn = quoteForm.querySelector('.btn-main');
        let old = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing...';
        btn.style.background = 'var(--text-main)';
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Initializing...';
            btn.style.background = '#10B981';
            window.location.href = "https://rater.alexai.cloud/quote-tool";
        }, 1500);
    });
}

// ---- SOCIAL PROOF TOASTS ----
function initSocialProof() {
    if (document.getElementById('social-proof-container')) {
        const container = document.getElementById('social-proof-container');
        const cities = ["Phoenix", "Scottsdale", "Mesa", "Chandler", "Gilbert", "Tucson", "Flagstaff", "Tempe", "Glendale", "Peoria"];
        const actions = [
            { icon: 'fa-car', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)', label: 'Auto Policy' },
            { icon: 'fa-shield-halved', color: 'linear-gradient(135deg, #10b981, #059669)', label: 'Full Coverage' },
            { icon: 'fa-bolt', color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', label: 'Quick Quote' }
        ];

        function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
        function getNum(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

        function createNotification() {
            const item = getRandom(actions);
            const city = getRandom(cities);
            const savings = getNum(280, 980);
            const time = getNum(2, 18);

            const toast = document.createElement('div');
            toast.className = 'sp-card-tech';
            toast.innerHTML = `
                <div class="sp-aurora-border"></div>
                <div class="sp-glass-content">
                    <div class="sp-icon-box" style="background:${item.color}">
                        <i class="fa-solid ${item.icon}"></i>
                    </div>
                    <div class="sp-info">
                        <div class="sp-top-row">
                            <span class="sp-type">${item.label}</span>
                            <span class="sp-ago">${time}m ago</span>
                        </div>
                        <div class="sp-details">Bound in <strong>${city}, AZ</strong></div>
                        <div class="sp-saving-badge"><i class="fa-solid fa-arrow-trend-down"></i> Saved $${savings}/yr</div>
                    </div>
                    <button class="sp-close-btn" onclick="this.closest('.sp-card-tech').remove()"><i class="fa-solid fa-xmark"></i></button>
                </div>`;
            container.appendChild(toast);
            requestAnimationFrame(() => toast.classList.add('visible'));
            setTimeout(() => {
                toast.classList.remove('visible');
                setTimeout(() => toast.remove(), 600);
            }, 6000);
        }

        function loop() {
            setTimeout(() => { createNotification(); loop(); }, getNum(9000, 16000));
        }
        setTimeout(loop, 5000);
    }
}
