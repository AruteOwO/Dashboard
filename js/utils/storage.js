export function savePagesData(pages) {
    localStorage.setItem('my-carousel-data', JSON.stringify(pages));
}

export function loadPagesData(defaultData) {
    const saved = localStorage.getItem('my-carousel-data');
    return saved ? JSON.parse(saved) : defaultData;
}