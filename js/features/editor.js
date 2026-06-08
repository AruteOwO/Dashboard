import { renderPages, setScrollNavigation, scrollNavigationEnabled } from './carousel.js';

export function setupEditor(pagesArray, containerId) {
    let isEditMode = false;
    let sidebar = null;

    const btn = document.createElement('button');
    btn.id = 'toggle-editor';
    btn.textContent = '⚙️';
    document.body.appendChild(btn);

    const showGlobalSettings = () => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-box">
                <h3>Global Settings</h3>
                <div class="setting-row">
                    <label style="display:flex; align-items:center; gap:10px; justify-content:center; cursor:pointer;">
                        <input type="checkbox" ${scrollNavigationEnabled ? 'checked' : ''} id="scroll-toggle"> 
                        Enable Scroll Navigation
                    </label>
                </div>
                <button id="close-modal">Close</button>
            </div>
        `;
        overlay.querySelector('#close-modal').onclick = () => document.body.removeChild(overlay);
        overlay.querySelector('#scroll-toggle').onchange = (e) => setScrollNavigation(e.target.checked);
        document.body.appendChild(overlay);
    };

    const updateSidebar = () => {
        if (!sidebar) return;
        const container = document.getElementById(containerId);
        const idx = Math.round(container.scrollLeft / window.innerWidth);
        const p = pagesArray[idx];
        
        // Check state to maintain "Selected" feedback after re-rendering
        const fileStatus = p.background.startsWith('data:') ? 'Selected: Local Image' : '';

        sidebar.innerHTML = `
            <h3>Page Settings</h3>
            <div class="setting-row"><label>Accent Color</label><input type="color" value="${p.accent}" class="accent-input"></div>
            <div class="setting-row"><label>Background Color</label><input type="color" value="${p.background.startsWith('#') ? p.background : '#121212'}" class="bg-input"></div>
            <div class="setting-row">
                <label>Background Image URL</label>
                <input type="text" placeholder="https://image.jpg" value="${p.background.startsWith('http') ? p.background : ''}" class="bg-url-input">
                <label class="custom-file-upload">
                    <input type="file" accept="image/*" class="file-input">
                    Select File
                </label>
                <span id="file-name" style="font-size: 10px; margin-top: 5px;">${fileStatus}</span>
                <button class="remove-btn">Remove Background Image</button>
            </div>
            <div class="sidebar-footer">
                <button id="global-btn">Global Settings</button>
            </div>
        `;

        // Event Listeners
        sidebar.querySelector('.accent-input').oninput = (e) => { p.accent = e.target.value; renderPages(pagesArray, containerId, true); };
        sidebar.querySelector('.bg-input').oninput = (e) => { p.background = e.target.value; renderPages(pagesArray, containerId, true); };
        sidebar.querySelector('.bg-url-input').onchange = (e) => { p.background = e.target.value; renderPages(pagesArray, containerId, true); };
        
        sidebar.querySelector('.file-input').onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                sidebar.querySelector('#file-name').textContent = `Selected: ${file.name}`;
                const reader = new FileReader();
                reader.onload = (ev) => { p.background = ev.target.result; renderPages(pagesArray, containerId, true); };
                reader.readAsDataURL(file);
            }
        };

        sidebar.querySelector('.remove-btn').onclick = () => {
            p.background = '#121212';
            sidebar.querySelector('#file-name').textContent = '';
            renderPages(pagesArray, containerId, true);
        };
        
        sidebar.querySelector('#global-btn').onclick = showGlobalSettings;
    };

    btn.onclick = () => {
        isEditMode = !isEditMode;
        btn.textContent = isEditMode ? '💾' : '⚙️';
        if (isEditMode) {
            sidebar = document.createElement('div');
            sidebar.id = 'edit-sidebar';
            sidebar.className = 'open';
            document.body.appendChild(sidebar);
            updateSidebar();
            document.getElementById(containerId).addEventListener('scroll', updateSidebar);
        } else if (sidebar) {
            document.getElementById(containerId).removeEventListener('scroll', updateSidebar);
            document.body.removeChild(sidebar);
            sidebar = null;
        }
        renderPages(pagesArray, containerId, isEditMode);
    };
}