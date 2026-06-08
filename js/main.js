import { initCarousel, addDot } from './features/carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = ''; 
    
    initCarousel('app');

    for(let i = 0; i < 3; i++) {
        const page = document.createElement('div');
        page.className = 'page';
        // Removed page numbering here
        app.appendChild(page);
        addDot(i, 'app');
    }
});