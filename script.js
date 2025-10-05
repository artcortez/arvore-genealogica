document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("canvas");
    const nodes = document.querySelectorAll('.node');
    const infoModal = document.getElementById('info-modal');
    const infoImg = infoModal.querySelector('img');
    const infoTitle = infoModal.querySelector('h2');
    const infoDesc = infoModal.querySelector('p');
    const closeInfoBtn = document.getElementById('close-info-modal');

    // Modal de boas-vindas
    const welcomeModal = document.getElementById("welcome-modal");
    const closeBtn = document.getElementById("close-modal");
    closeBtn.addEventListener("click", () => welcomeModal.style.display = "none");

    // Pan + Zoom
    let isDragging = false, startX, startY, offsetX = 0, offsetY = 0, scale = 1;

    canvas.addEventListener("mousedown", e => {
        if(e.target.classList.contains('node') || e.target.closest('.node')) return;
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        canvas.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        canvas.style.cursor = "grab";
    });

    window.addEventListener("mousemove", e => {
        if (!isDragging) return;
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    });

    window.addEventListener("wheel", e => {
        e.preventDefault();
        const zoomSpeed = 0.001;
        scale += e.deltaY * -zoomSpeed;
        scale = Math.min(Math.max(0.2, scale), 5);
        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    });

    // Clique nos nodes
    nodes.forEach(node => {
        node.addEventListener('click', e => {
            e.stopPropagation();
            infoImg.src = node.dataset.img;
            infoTitle.textContent = node.dataset.name;
            infoDesc.textContent = node.dataset.desc;
            infoModal.style.display = 'flex'; // centralizado
        });
    });

    // Fechar modal
    closeInfoBtn.addEventListener('click', () => infoModal.style.display = 'none');


    // Medir pixels ao clicar no canvas
    document.body.addEventListener('click', e => {
        const canvas = document.getElementById('canvas');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log(`Clique no canvas: top=${y}px, left=${x}px`);
    });

    // Mais informações
    const moreInfoBtn = document.getElementById('more-info-btn');
    const moreInfoModal = document.getElementById('more-info-modal');
    const closeMoreInfoBtn = document.getElementById('close-more-info');

    moreInfoBtn.addEventListener('click', () => {
    moreInfoModal.style.display = 'flex';
    });

    closeMoreInfoBtn.addEventListener('click', () => {
    moreInfoModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora da caixa
    moreInfoModal.addEventListener('click', e => {
    if (e.target === moreInfoModal) {
        moreInfoModal.style.display = 'none';
    }
    });
});

