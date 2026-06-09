import { initCarousel, renderPages } from './features/carousel.js';
import { setupEditor } from './features/editor.js';
import { pageData } from './data/pages.js';
import { loadPagesData } from './utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const finalPageData = loadPagesData(pageData);
    
    initCarousel('app');
    renderPages(finalPageData, 'app', false);
    setupEditor(finalPageData, 'app');
});