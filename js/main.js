import { initCarousel, renderPages } from './features/carousel.js';
import { setupEditor } from './features/editor.js';
import { pageData } from './data/pages.js';

document.addEventListener('DOMContentLoaded', () => {
    initCarousel('app');
    renderPages(pageData, 'app', false);
    setupEditor(pageData, 'app');
});