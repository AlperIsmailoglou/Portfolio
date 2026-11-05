// --- SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- BASE URL SETUP ---
const baseUrl = window.location.pathname.includes('/Portfolio') ? '/Portfolio' : '';

// --- HOMEPAGE MODAL CAROUSEL ---
const modal = document.getElementById('project-modal');
if (modal) {
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const link = document.getElementById('modal-link');
    const imgContainer = document.getElementById('modal-img-container');
    let slideInterval;
    let currentSlide = 0;
    let slides = [];

    function setupSlides(galleryString) {
        // Remove only old slides, keep the buttons intact
        imgContainer.querySelectorAll('.modal-slide').forEach(el => el.remove());
        if (!galleryString) return;

        const images = galleryString.split(',').filter(i => i.trim() !== '');
        images.forEach((img, index) => {
            const div = document.createElement('div');
            div.className = `modal-slide ${index === 0 ? 'active' : ''}`;

            // Format the image path properly
            const finalImgSrc = img.startsWith('http') || img.startsWith('/') ? img : `${baseUrl}/${img}`;
            div.style.backgroundImage = `url('${finalImgSrc}')`;

            // Insert the image behind the next/prev buttons so arrows stay on top
            imgContainer.insertBefore(div, document.getElementById('modal-next'));
        });
        slides = imgContainer.querySelectorAll('.modal-slide');
    }

    function showSlide(index) {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            title.textContent = card.getAttribute('data-title');
            desc.textContent = card.getAttribute('data-desc');
            link.href = card.getAttribute('data-url');

            setupSlides(card.getAttribute('data-gallery'));
            currentSlide = 0;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            if (slides.length > 1) {
                slideInterval = setInterval(nextSlide, 5000);
            }
        });
    });

    document.getElementById('modal-next').addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        if (slides.length > 1) slideInterval = setInterval(nextSlide, 5000);
    });

    document.getElementById('modal-prev').addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        if (slides.length > 1) slideInterval = setInterval(nextSlide, 5000);
    });

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        clearInterval(slideInterval);
    }

    document.getElementById('close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

// --- DETAIL PAGE GALLERY & LIGHTBOX ---
const detailBox = document.querySelector('.detail-gallery-box');
if (detailBox) {
    const imgs = detailBox.querySelectorAll('.detail-img');
    let currentIndex = 0;

    document.querySelector('.detail-next').addEventListener('click', () => {
        imgs[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % imgs.length;
        imgs[currentIndex].classList.add('active');
    });

    document.querySelector('.detail-prev').addEventListener('click', () => {
        imgs[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
        imgs[currentIndex].classList.add('active');
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');

    imgs.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
}