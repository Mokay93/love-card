document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.body'); // Или другой элемент-контейнер для котят и сердечек

    // Функция для создания случайного котёнка и добавления его на страницу
    function createRandomKitten() {
        const kitten = document.createElement('img');
        kitten.src = 'output.png';
        kitten.alt = 'Милый котёнок';
        kitten.classList.add('kitten'); // Используем новый класс 'kitten'

        const startX = Math.random() * (window.innerWidth - 100);
        const startYOffset = Math.random() > 0.5 ? -150 : window.innerHeight + 50;
        const moveDistance = Math.random() * 200 + 100;
        const moveYEnd = startYOffset > window.innerHeight ? -moveDistance : moveDistance;

        kitten.style.left = `${startX}px`;
        kitten.style.top = `${startYOffset}px`;
        kitten.style.setProperty('--move-y-start', `0px`);
        kitten.style.setProperty('--move-y-end', `${moveYEnd}px`);

        body.appendChild(kitten);

        setTimeout(() => {
            kitten.classList.add('visible');
        }, 50);

        kitten.addEventListener('click', (event) => {
            const clickX = event.clientX;
            const clickY = event.clientY;

            const numberOfHearts = 15;
            for (let i = 0; i < numberOfHearts; i++) {
                 createScatterHeart(clickX, clickY);
            }

             kitten.remove();
        });

        setTimeout(() => {
            if (kitten.parentElement) {
                kitten.remove();
            }
        }, 20000);
    }

    // Функция для создания и анимации разлетающегося сердечка (теперь SVG)
    function createScatterHeart(x, y) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 200 200");
        svg.classList.add('scatter-heart-svg');

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M100 180 C20 100, 20 30, 100 80 C180 30, 180 100, 100 180");
        path.setAttribute("fill", "red");
        svg.appendChild(path);

        const heartSize = 20;
        svg.style.position = 'absolute';
        svg.style.left = `${x - heartSize / 2}px`;
        svg.style.top = `${y - heartSize / 2}px`;
        svg.style.width = `${heartSize}px`;
        svg.style.height = `${heartSize * (90/100)}px`;
        svg.style.pointerEvents = 'none';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 50;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        svg.style.setProperty('--scatter-x', `${offsetX}px`);
        svg.style.setProperty('--scatter-y', `${offsetY}px`);

        body.appendChild(svg);

        svg.addEventListener('animationend', () => {
            svg.remove();
        });
    }

    const kittenCreationInterval = setInterval(createRandomKitten, 3000);

    // Показываем котёнка и сообщение
    setTimeout(() => {
        document.getElementById('cat').classList.add('visible');
    }, 3500);

    setTimeout(() => {
        document.getElementById('message').classList.add('visible');
    }, 5000);

    // Сердечки
    const heartsContainer = document.getElementById('hearts');
    if (heartsContainer) {
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }
        setInterval(createHeart, 400);
    }

    // Автовоспроизведение музыки (с fallback на кнопку)
    const audio = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');

    if (audio && playBtn) {
        window.addEventListener('load', () => {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    playBtn.style.display = 'inline-block';
                });
            }
        });

        playBtn.addEventListener('click', () => {
            audio.play();
            playBtn.style.display = 'none';
        });
    }
});