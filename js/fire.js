document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#F3FF33', '#FF33F3', '#33F3FF', '#FFC300', '#FFFFFF'];

    function createFirework(x, y) {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 150 + 100;
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            particle.style.setProperty('--move-x', `${moveX}px`);
            particle.style.setProperty('--move-y', `${moveY}px`);

            fragment.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 800);
        }

        document.body.appendChild(fragment);
    }

    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        createFirework(x, y);
    });

    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createFirework(x, y);
    }, 500);
});
