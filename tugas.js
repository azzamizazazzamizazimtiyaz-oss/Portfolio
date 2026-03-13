// Menunggu hingga DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // Mendapatkan semua elemen card
    const cards = document.querySelectorAll('.card');
    
    // Mendapatkan elemen modal
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close-modal');
    
    // Fungsi untuk membuka modal
    function openModal(card) {
        const type = card.dataset.type; // Mendapatkan tipe media (image/video)
        const mediaWrapper = card.querySelector('.media-wrapper');
        
        if (type === 'image') {
            // Jika card berisi gambar
            const img = mediaWrapper.querySelector('img');
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
        } else if (type === 'video') {
            // Jika card berisi video
            const video = mediaWrapper.querySelector('video');
            modalVideo.src = video.querySelector('source').src;
            modalVideo.poster = video.poster;
            modalVideo.style.display = 'block';
            modalImage.style.display = 'none';
        }
        
        // Tampilkan modal dengan animasi
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Mencegah scroll saat modal terbuka
        
        // Jika video, putar otomatis
        if (type === 'video') {
            setTimeout(() => {
                modalVideo.play();
            }, 300);
        }
    }
    
    // Fungsi untuk menutup modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Kembalikan scroll
        
        // Pause video jika sedang diputar
        if (modalVideo.style.display === 'block') {
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    }
    
    // Event listener untuk setiap card
    cards.forEach(card => {
        card.addEventListener('click', function() {
            openModal(this);
        });
    });
    
    // Event listener untuk tombol close
    closeModal.addEventListener('click', closeModalFunc);
    
    // Event listener untuk menutup modal saat klik di luar area modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // Event listener untuk tombol ESC pada keyboard
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });
    
    // Fungsi untuk menambahkan efek lazy loading pada gambar
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.addEventListener('load', function() {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                });
                imageObserver.unobserve(img);
            }
        });
    }, imageOptions);
    
    // Menerapkan observer pada semua gambar
    images.forEach(img => imageObserver.observe(img));
    
    // Menambahkan animasi saat scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            
            // Cek apakah card visible di viewport
            if (cardTop < window.innerHeight && cardBottom > 0) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inisialisasi animasi
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Jalankan animasi saat load dan scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Console log untuk debugging
    console.log('Galeri Media berhasil dimuat!');
    console.log(`Total card: ${cards.length}`);
});