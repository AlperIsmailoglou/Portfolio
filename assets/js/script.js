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

// --- MODAL LOGIC ---
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const closeBtn = document.getElementById('close-modal');

// Open Modal
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        // Pull data from the HTML attributes
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const img = card.getAttribute('data-img');
        const url = card.getAttribute('data-url');

        // Inject into modal
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalLink.href = url;
        
        if (img) {
            modalImg.style.backgroundImage = `url('${img}')`;
        } else {
            modalImg.style.backgroundImage = 'none';
        }

        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
});

// Close Modal Function
function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close on X click
closeBtn.addEventListener('click', closeModal);

// Close on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});