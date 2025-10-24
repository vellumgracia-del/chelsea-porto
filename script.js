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

    // --- 3. (BARU) Logika Navigasi Aktif saat Scroll ---
    // Logika ini menggantikan toggle hamburger
    const sections = document.querySelectorAll('section, header'); // Ambil semua section dan header
    const navLinks = document.querySelectorAll('.nav-link'); // Ambil semua link (desktop & mobile)

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Tentukan section mana yang sedang terlihat di layar
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Cek jika href dari link sama dengan ID section yang sedang terlihat
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});
