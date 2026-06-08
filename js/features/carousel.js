export function initCarousel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.style.display = 'flex';
    container.style.overflowX = 'scroll';
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollbarWidth = 'none';
    container.style.width = '100vw';
    container.style.height = '100vh';

    // Auto-update dots on scroll
    container.addEventListener('scroll', () => {
        const index = Math.round(container.scrollLeft / window.innerWidth);
        updateDots(index);
    });
}

export function addDot(index, containerId) {
    let nav = document.getElementById('nav-dots');
    if (!nav) {
        nav = document.createElement('div');
        nav.id = 'nav-dots';
        document.body.appendChild(nav);
    }
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    
    dot.onclick = () => {
        document.getElementById(containerId).scrollTo({ 
            left: index * window.innerWidth, 
            behavior: 'smooth' 
        });
    };
    nav.appendChild(dot);
}

function updateDots(activeIndex) {
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
    });
}