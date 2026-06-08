export function applyPageStyles(pageElement, data) {
    const isImage = data.background && (data.background.startsWith('http') || data.background.startsWith('data:image'));
    
    if (isImage) {
        pageElement.style.backgroundImage = `url('${data.background}')`;
        pageElement.style.backgroundSize = 'cover';
        pageElement.style.backgroundPosition = 'center';
        pageElement.style.backgroundColor = 'transparent';
    } else {
        pageElement.style.backgroundImage = 'none';
        pageElement.style.backgroundColor = data.background || '#121212';
    }
    
    pageElement.style.setProperty('--page-accent', data.accent);
}