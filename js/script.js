        function openModal() { document.getElementById('appModal').classList.add('open'); }
        
        // Quote Simulation
        document.getElementById('quoteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            let btn = document.querySelector('.btn-main');
            let old = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing...';
            btn.style.background = 'var(--text-main)';
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Initializing...';
                btn.style.background = '#10B981';
                window.location.href = "https://rater.alexai.cloud/quote-tool";
            }, 1500);
        });

        // Scroll Reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// =========================================
// SOCIAL PROOF: AURORA TECH EDITION
// =========================================

function initSocialProof() {
    // Evita duplicados si se llama varias veces
    if (document.getElementById('social-proof-container')) return;

    const container = document.createElement('div');
    container.id = 'social-proof-container';
    document.body.appendChild(container);

    const cities = ["Phoenix", "Scottsdale", "Mesa", "Chandler", "Gilbert", "Tucson", "Flagstaff", "Tempe"];
    const actions = [
        { type: 'auto', icon: 'fa-car', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)', label: 'Auto Insurance' },
        { type: 'home', icon: 'fa-house-chimney', color: 'linear-gradient(135deg, #10b981, #059669)', label: 'Home Policy' },
        { type: 'renters', icon: 'fa-key', color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', label: 'Renters Cover' }
    ];

    function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function getNum(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

    function createNotification() {
        const item = getRandom(actions);
        const city = getRandom(cities);
        const savings = getNum(320, 950);
        const time = getNum(2, 12);

        const toast = document.createElement('div');
        toast.className = 'sp-card-tech';
        
        // Estructura HTML enriquecida para efectos Aurora
        toast.innerHTML = `
            <div class="sp-aurora-border"></div>
            <div class="sp-shimmer-effect"></div>
            <div class="sp-glass-content">
                <div class="sp-icon-box" style="background: ${item.color}">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <div class="sp-info">
                    <div class="sp-top-row">
                        <span class="sp-type">${item.label}</span>
                        <span class="sp-ago">${time}m ago</span>
                    </div>
                    <div class="sp-details">
                        Bound in <strong>${city}, AZ</strong>
                    </div>
                    <div class="sp-saving-badge">
                        <i class="fa-solid fa-arrow-trend-down"></i> Saved $${savings}/yr
                    </div>
                </div>
                <button class="sp-close-btn" onclick="this.closest('.sp-card-tech').remove()"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `;

        container.appendChild(toast);

        // Animación de entrada
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });

        // Auto eliminar
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 600);
        }, 6000);
    }

    // Bucle infinito
    function loop() {
        setTimeout(() => {
            createNotification();
            loop();
        }, getNum(8000, 15000));
    }
    
    setTimeout(loop, 4000); // Primer inicio
}

document.addEventListener('DOMContentLoaded', initSocialProof);
