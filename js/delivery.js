// ============================================
// ALEX INSURTECH — DELIVERY / RIDESHARE JS
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

    // ---- LEAD FORM SUBMIT ----
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-main');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Securing Rates...';
            btn.style.opacity = '0.85';
            btn.disabled = true;

            // Simulamos una carga de 1.5 segundos para que se vea el spinner del botón
            setTimeout(() => {
                form.reset(); // Limpiamos el formulario
                document.getElementById('appModal').classList.remove('open'); // Cerramos el modal viejo
                
                // Abrimos tu nuevo modal
                const targetModal = document.getElementById('quote-processing-modal');
                if (targetModal) {
                    targetModal.style.display = 'flex'; 
                    
                    const card = targetModal.querySelector('.zlight-card');
                    if (card) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    }
                }

                // Restauramos el botón a su estado original (por si el usuario cierra el modal)
                btn.innerHTML = 'Unlock Driver Rates <i class="fa-solid fa-unlock-keyhole"></i>';
                btn.style.opacity = '1';
                btn.disabled = false;

            }, 1500); // 1500 milisegundos = 1.5 segundos

        });
    }

    const btnGoHome = document.getElementById('btnGoHome');
    if (btnGoHome) {
        btnGoHome.addEventListener('click', () => {
            // Cierra el modal (o redirige a la página que necesites)
            document.getElementById('quote-processing-modal').style.display = 'none';
            window.location.href = "https://alexai.cloud/"; 
        });
    }

    // ---- SOCIAL PROOF ----
    initSocialProof();
});

function initSocialProof() {
    const container = document.getElementById('social-proof-container');
    if (!container) return;

    const cities = ["Phoenix", "Scottsdale", "Mesa", "Chandler", "Gilbert", "Tucson", "Tempe", "Glendale"];
    const actions = [
        { icon: 'fa-car-side', color: 'linear-gradient(135deg,#10b981,#059669)', label: 'Rideshare Gap Closed' },
        { icon: 'fa-burger', color: 'linear-gradient(135deg,#ef4444,#b91c1c)', label: 'DoorDash Driver Covered' },
        { icon: 'fa-box', color: 'linear-gradient(135deg,#3b82f6,#06b6d4)', label: 'Amazon Flex Endorsed' }
    ];

    function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function getNum(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

    function createNotification() {
        const item = getRandom(actions);
        const city = getRandom(cities);
        const savings = getNum(180, 580);
        const time = getNum(1, 15);

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
                    <div class="sp-saving-badge"><i class="fa-solid fa-arrow-trend-down"></i> Saved $${savings} vs. commercial</div>
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
        setTimeout(() => { createNotification(); loop(); }, getNum(8000, 14000));
    }
    setTimeout(loop, 4000);
}

