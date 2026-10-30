// Intersection Observer for scroll fade-in effects
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it has faded in
        }
    });
}, observerOptions);

// Grab all elements with the class 'fade-in' and observe them
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});