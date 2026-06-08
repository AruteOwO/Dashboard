import { applyPageStyles } from '../utils/style-manager.js';

export let scrollNavigationEnabled = true;
export const setScrollNavigation = (enabled) => { scrollNavigationEnabled = enabled; };
const getIndex = (container) => Math.round(container.scrollLeft / window.innerWidth);

export function initCarousel(containerId) {
    const container = document.getElementById(containerId);
    container.addEventListener('wheel', (e) => {
        if (!scrollNavigationEnabled) return;
        e.preventDefault();
        const index = getIndex(container);
        const target = index + (e.deltaX > 0 || e.deltaY > 0 ? 1 : -1);
        if (target >= 0 && target < container.children.length) container.scrollTo({ left: target * window.innerWidth, behavior: 'smooth' });
    }, { passive: false });

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        const index = getIndex(container);
        const target = e.key === 'ArrowRight' ? index + 1 : e.key === 'ArrowLeft' ? index - 1 : null;
        if (target !== null && target >= 0 && target < container.children.length) container.scrollTo({ left: target * window.innerWidth, behavior: 'smooth' });
    });
    container.addEventListener('scroll', () => updateDots(getIndex(container)));
}

export function renderPages(pageList, containerId, isEditMode) {
    const container = document.getElementById(containerId);
    const nav = document.getElementById('nav-dots') || createNav();
    container.innerHTML = '';
    nav.innerHTML = '';

    pageList.forEach((data, i) => {
        const page = document.createElement('div');
        page.className = 'page';
        applyPageStyles(page, data);
        container.appendChild(page);

        const wrapper = document.createElement('div');
        wrapper.className = 'dot-wrapper';
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.style.setProperty('--accent', data.accent);
        dot.onclick = () => container.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' });
        wrapper.appendChild(dot);

        if (isEditMode && pageList.length > 1) {
            const delBtn = document.createElement('button');
            delBtn.textContent = '✕';
            delBtn.className = 'del-btn';
            delBtn.onclick = () => { pageList.splice(i, 1); renderPages(pageList, containerId, isEditMode); };
            wrapper.appendChild(delBtn);
        }
        nav.appendChild(wrapper);
    });

    if (isEditMode) {
        const addBtn = document.createElement('button');
        addBtn.textContent = '+';
        addBtn.className = 'add-page-btn';
        addBtn.onclick = () => { pageList.push({ background: '#121212', accent: '#ffffff' }); renderPages(pageList, containerId, isEditMode); };
        nav.appendChild(addBtn);
    }
}

function createNav() { const nav = document.createElement('div'); nav.id = 'nav-dots'; document.body.appendChild(nav); return nav; }
function updateDots(activeIndex) { document.querySelectorAll('.dot').forEach((dot, idx) => dot.classList.toggle('active', idx === activeIndex)); }