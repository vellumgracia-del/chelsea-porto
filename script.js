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

    // --- 3. (BARU) Logika Menu Hamburger Responsif ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Toggle menu saat hamburger di-klik
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Ganti ikon hamburger menjadi "X" (opsional)
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Tutup menu saat salah satu link di-klik (penting untuk single-page)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            // Kembalikan ikon ke "bars"
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- 4. (DIHAPUS) Logika Simulasi Form ---
    // Tidak diperlukan lagi karena kita menggunakan action "mailto:".

});
