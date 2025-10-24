document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Animasi Pemuatan Halaman ---
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        // Sembunyikan loader setelah semua konten (termasuk gambar) dimuat
        loader.classList.add('hidden');
    });

    // --- 2. Animasi saat Menggulir (Scroll-triggered) ---
    // Ini adalah cara modern dan sangat efisien (baik untuk performa)
    const observerOptions = {
        root: null, // 'viewport'
        rootMargin: '0px',
        threshold: 0.1 // 10% elemen harus terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Berhenti mengamati setelah animasi berjalan
            }
        });
    }, observerOptions);

    // Amati semua elemen dengan kelas 'animate-on-scroll'
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- 3. Animasi Umpan Balik (Micro-interaction) Formulir ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah pengiriman form sungguhan (untuk demo)
        
        const submitButton = contactForm.querySelector('button');
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';

        // Simulasikan proses pengiriman
        setTimeout(() => {
            // Tampilkan pesan sukses
            formStatus.textContent = "Pesan Anda telah terkirim! Terima kasih.";
            formStatus.className = 'success';
            submitButton.textContent = 'Terkirim ✅';
            
            // Reset form (opsional)
            contactForm.reset();

            // Kembalikan tombol ke keadaan semula setelah beberapa detik
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = '';
                submitButton.disabled = false;
                submitButton.textContent = 'Kirim Pesan';
            }, 4000);

        }, 1500); // Waktu simulasi 1.5 detik
    });

});
