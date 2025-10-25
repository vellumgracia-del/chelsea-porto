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
    
    // --- 4. (BARU) Logika Slideshow Presentasi ---
    let slideIndex = 0;
    showSlides(); // Panggil fungsinya
    
    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slide");
        
        // Sembunyikan semua slide
        for (i = 0; i < slides.length; i++) {
            slides[i].style.opacity = "0";  
        }
        
        // Pindah ke slide berikutnya
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1; // Kembali ke slide pertama
        }
        
        // Tampilkan slide saat ini
        if (slides[slideIndex - 1]) { // Cek jika slide ada
            slides[slideIndex - 1].style.opacity = "1";  
        }
        
        // Panggil fungsi ini lagi "setiap detik sekali" (1000ms)
        // Ini akan memulai transisi 0.5s setiap 1 detik
        setTimeout(showSlides, 1000); 
    }

});
