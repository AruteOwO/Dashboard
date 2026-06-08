export function initCarousel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.style.display = 'flex';
    container.style.overflowX = 'scroll';
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollbarWidth = 'none';
    container.style.width = '100vw';
    container.style.height = '100vh';
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
    dot.onclick = () => {
        document.getElementById(containerId).scrollTo({ 
            left: index * window.innerWidth, 
            behavior: 'smooth' 
        });
    };
    nav.appendChild(dot);
}