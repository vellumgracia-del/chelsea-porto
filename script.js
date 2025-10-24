document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Animasi Pemuatan Halaman ---
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        loader.classList.add('hidden');
    });

    // --- 2. Animasi saat Menggulir (Scroll-triggered) ---
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- 3. Logika Navigasi Aktif saat Scroll (Hanya Desktop) ---
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // --- 4. (BARU) Logika Efek Kilau Mouse ---
    const glassElements = document.querySelectorAll('.glass-effect');

    glassElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            // Dapatkan posisi elemen relatif terhadap viewport
            const rect = el.getBoundingClientRect();
            
            // Hitung posisi mouse DI DALAM elemen
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set variabel CSS kustom pada elemen tersebut
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        });
    });

});
