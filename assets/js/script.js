const baseUrl = window.location.pathname.includes('/Portfolio') ? '/Portfolio' : '';

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

// --- HOMEPAGE MODAL CAROUSEL ---
const modal = document.getElementById('project-modal');
if (modal) {
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const link = document.getElementById('modal-link');
    const imgContainer = document.getElementById('modal-img-container');
    const nextBtn = document.getElementById('modal-next');
    let slideInterval;
    let currentSlide = 0;
    let slides = [];

    function setupSlides(galleryString) {
        imgContainer.querySelectorAll('.modal-slide').forEach(el => el.remove());
        if (!galleryString) return;

        const images = galleryString.split(',').filter(i => i.trim() !== '');
        images.forEach((img, index) => {
            const div = document.createElement('div');
            div.className = `modal-slide ${index === 0 ? 'active' : ''}`;

            // CORRECTED: Safely merge the baseUrl with the CMS image path
            const cleanImg = img.trim();
            const finalImgSrc = cleanImg.startsWith('http') ? cleanImg : `${baseUrl}${cleanImg.startsWith('/') ? cleanImg : '/' + cleanImg}`;

            div.style.backgroundImage = `url('${finalImgSrc}')`;
            imgContainer.insertBefore(div, nextBtn);
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
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let lightboxIndex = 0;

    imgs.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightboxIndex = index;
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the click from closing the modal
            lightboxIndex = (lightboxIndex + 1) % imgs.length;
            lightboxImg.src = imgs[lightboxIndex].src;
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the click from closing the modal
            lightboxIndex = (lightboxIndex - 1 + imgs.length) % imgs.length;
            lightboxImg.src = imgs[lightboxIndex].src;
        });
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}