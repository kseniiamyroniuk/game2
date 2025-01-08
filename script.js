// Додаємо змінну для відстеження прогресу
let levelProgress = {
    1: false,
    2: false,
    3: false,
    'sport': false,
    4: false
};

function toggleLevel(levelNum) {
    // Перевіряємо чи це не руханка
    if (levelNum === 'sport') {
        if (!levelProgress[3]) { // Перевіряємо чи пройдений 3-й рівень
            alert('Спочатку пройдіть попередній рівень!');
            return;
        }
    } else { //якщо не руханка, а звичайний рівень
        if (levelNum > 1 && !levelProgress[levelNum - 1]) {
            alert('Спочатку пройдіть попередній рівень!');
            return;
        }
    }
    
    // Створюємо ID для руханки та інших рівнів (як у html)
    const contentId = levelNum === 'sport' ? 'sport' : `level${levelNum}`;
    const content = document.getElementById(contentId);
    //Тобто коли користувач натискає на кнопку рівня:
    //Якщо рівень був прихований - він з'явиться
    //Якщо рівень був показаний - він приховається
    content.classList.toggle('active');
}

function startGame(levelNum) {
    const gameArea = document.getElementById(`gameArea${levelNum}`);
    gameArea.classList.add('active');
    window[`startLevel${levelNum}`](gameArea);
}

function startLevel1(gameArea) {
    const images = [
        { src: 'images/yellow-balloon.png', isYellow: true }, 
        { src: 'images/blue-balloon.png', isYellow: false },
        { src: 'images/yellow-ball.png', isYellow: true },
        { src: 'images/red-ball.png', isYellow: false },
        { src: 'images/red-apple.png', isYellow: false }, 
        { src: 'images/yellow-lemon.png', isYellow: true }  
    ];
    
    let correctClicks = 0;
    const totalYellowItems = images.filter(img => img.isYellow).length; // має бути 3
    
    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.classList.add('game-item', 'level1-item');
        imgElement.dataset.isYellow = img.isYellow;
        
        imgElement.addEventListener('click', function() {
            if (this.classList.contains('correct')) return;
            // клас correct відраховує чи користувач уже вибрав цю відповідь, щоб не зарахувати її як нову

            if(img.isYellow) {
                this.classList.add('correct');
                showGnomeSpeech('Молодець!!');
                correctClicks++;
                
                if (correctClicks === totalYellowItems) {
                    setTimeout(() => {
                        celebrateWin(1);
                    }, 500);
                }
            } else {
                this.classList.add('wrong');
                showGnomeSpeech('Це не жовтий. Спробуй ще!');
                setTimeout(() => this.classList.remove('wrong'), 500);
            }
        });
        gameArea.appendChild(imgElement);
    });
}

function startLevel2(gameArea) {
    // Визначаємо розміри екрану
    const screenWidth = window.innerWidth;
    
    // Обираємо відповідні координати залежно від розміру екрану
    const items = screenWidth >= 1200 ? [
        // Оригінальні координати для великих екранів
        { src: 'images/rock1.png', isYellow: false, top: '8%', left: '37%', width: '130px' },
        { src: 'images/rock2.png', isYellow: false, top: '26%', left: '24%', width: '50px' },
        { src: 'images/rock3.png', isYellow: false, top: '70%', left: '24%', width: '160px' },
        { src: 'images/rock4.png', isYellow: false, top: '70%', left: '55%', width: '120px' },

        { src: 'images/seed1.png', isYellow: true, top: '2%', left: '55%', width: '70px' },
        { src: 'images/seed2.png', isYellow: true, top: '44%', left: '24%', width: '60px' },
        { src: 'images/seed3.png', isYellow: true, top: '37%', left: '69%', width: '70px' },
        { src: 'images/seed4.png', isYellow: true, top: '55%', left: '52%', width: '60px' },
        { src: 'images/seed5.png', isYellow: true, top: '65%', left: '37%', width: '60px' },
        { src: 'images/seed6.png', isYellow: true, top: '72%', left: '46%', width: '60px' },
        { src: 'images/seed7.png', isYellow: true, top: '82%', left: '40%', width: '50px' },
        { src: 'images/seed8.png', isYellow: true, top: '67%', left: '70%', width: '50px' },
        { src: 'images/seed9.png', isYellow: true, top: '77%', left: '67%', width: '50px' },
    ] : [
       /////////// додати координати для маленьких екранів
    ];
    
    let correctClicks = 0;
    const totalYellowItems = items.filter(item => item.isYellow).length;
    
    items.forEach(item => {
        const itemElement = document.createElement('img');
        itemElement.src = item.src;
        itemElement.classList.add('game-item', 'level2-item');
        itemElement.style.top = item.top;
        itemElement.style.left = item.left;
        itemElement.style.width = item.width;
        
        itemElement.addEventListener('click', function() {
            if (this.classList.contains('correct')) return;

            if(item.isYellow) {
                this.classList.add('correct');
                this.style.transform = 'scale(0)';
                showGnomeSpeech('Молодець! Ти знайшов зернятко!');
                correctClicks++;
                
                if (correctClicks === totalYellowItems) {
                    setTimeout(() => {
                        celebrateWin(2);
                    }, 500);
                }
            } else {
                this.classList.add('wrong');
                showGnomeSpeech('Це камінчик, а не зернятко. Спробуй ще!');
                setTimeout(() => {
                    this.classList.remove('wrong');
                }, 500);
            }
        });
        const container = document.querySelector('.level2-container');
        container.appendChild(itemElement); 
        gameArea.appendChild(container);
    });
}

function startLevel3(gameArea) {
    const items = [
        { src: 'images/red-flower1.png', isYellow: false, top: '54%', left: '25%', width: '140px' },
        { src: 'images/yellow-flower1.png', isYellow: true, top: '57%', left: '39%', width: '100px' },
        { src: 'images/blue-flower1.png', isYellow: false, top: '60%', left: '52%', width: '110px' },
        { src: 'images/yellow-flower2.png', isYellow: true, top: '40%', left: '58%', width: '186px' },
    ];
    
    let correctClicks = 0;
    const totalYellowItems = items.filter(item => item.isYellow).length;
    
    items.forEach(item => {
        const itemElement = document.createElement('img');
        itemElement.src = item.src;
        itemElement.classList.add('game-item', 'level3-item');
        itemElement.style.top = item.top;
        itemElement.style.left = item.left;
        itemElement.style.width = item.width;
        
        itemElement.addEventListener('click', function() {
            if (this.classList.contains('correct')) return;

            if(item.isYellow) {
                this.classList.add('correct');
                showGnomeSpeech('Молодець! Бджілка зібрала нектар!');
                correctClicks++;
                
                if (correctClicks === totalYellowItems) {
                    setTimeout(() => {
                        celebrateWin(3);
                    }, 500);
                }
            } else {
                this.classList.add('wrong');
                showGnomeSpeech('Ой! Це не жовта квіточка!');
                setTimeout(() => {
                    this.classList.remove('wrong');
                }, 500);
            }
        });
        gameArea.appendChild(itemElement);
    });
}

function startLevel4(gameArea) {
    // Ініціалізуємо canvas
    const canvas = new fabric.Canvas('coloringCanvas', {
        width: 500,
        height: 500,
        isDrawingMode: true
    });

    // Налаштовуємо розмір пензлика
    canvas.freeDrawingBrush.width = 70;

    // Додаємо фонове зображення
    fabric.Image.fromURL('images/outline.png', function(img) {
        img.scaleToWidth(canvas.width);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    // Використовуємо делегування подій для палітри
    gameArea.querySelector('.color-palette').addEventListener('click', e => {
        const colorOption = e.target.closest('.color-option');
        if (!colorOption) return;

        // Оновлюємо вибраний колір
        document.querySelector('.color-option.selected')?.classList.remove('selected');
        colorOption.classList.add('selected');

        // Встановлюємо колір пензлика
        const {r, g, b} = hexToRgb(colorOption.dataset.color);
        canvas.freeDrawingBrush.color = `rgba(${r}, ${g}, ${b}, 0.9)`;
    });

    // Обробка завершення
    gameArea.querySelector('.complete-btn').addEventListener('click', () => {
        celebrateWin(4)
    });
}

function celebrateWin(levelNum) {
    // Звичайне святкування для всіх рівнів
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.9 },
        gravity: 0.8,
        startVelocity: 45
    });

    showGnomeSpeech('Вітаю! Рівень пройдено! 🎉');
    levelProgress[levelNum] = true;
    updateLevelButtons();
    
    // Спеціальне святкування для завершення гри
    if (levelNum === 4) {
        setTimeout(() => {
            // Великий салют
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 200,
                        spread: 100,
                        origin: { y: 0.9 },
                        colors: ['#FFD700', '#FFA500', '#FF4136', '#2ECC40', '#0074D9'],
                        gravity: 0.8,
                        startVelocity: 55
                    });
                }, i * 300);
            }
            // Показуємо нагороду
            showReward();
        }, 1000);
    }
}

function showReward() {
    const reward = document.createElement('div');
    reward.className = 'reward';
    reward.innerHTML = `
        <div class="reward-content">
            <h2>🏆 Вітаємо! 🏆</h2>
            <p>Ти успішно завершив всі рівні!</p>
            <div class="medal">🌟</div>
            <button class="reward-btn">Чудово!</button>
        </div>
    `;

    document.body.appendChild(reward);

    // Додаємо обробник для кнопки
    const closeBtn = reward.querySelector('.reward-btn');
    closeBtn.addEventListener('click', () => {
        reward.classList.add('fade-out');
        setTimeout(() => {
            reward.remove();
            confetti({
                particleCount: 300,
                spread: 180,
                origin: { y: 0.7 },
                gravity: 0.8,
                startVelocity: 45,
                colors: ['#FFD700', '#FFA500', '#FF4136', '#2ECC40', '#0074D9']
            });
        }, 500);
    });

    showGnomeSpeech('Вітаю! Ти справжній переможець! 🎉🌟');
}

function updateLevelButtons() {
    // Оновлюємо звичайні рівні
    for (let i = 1; i <= 4; i++) {
        const button = document.querySelector(`button[onclick="toggleLevel(${i})"]`);
        if (button) {  // Перевіряємо чи знайдена кнопка
            if (i === 1 || levelProgress[i - 1]) {
                button.classList.remove('disabled');
            } else {
                button.classList.add('disabled');
            }
        }
    }

    // Оновлюємо кнопку руханки
    const sportButton = document.querySelector(`button[onclick="toggleLevel('sport')"]`);
    if (sportButton) {  // Перевіряємо чи знайдена кнопка
        if (levelProgress[3]) { // Якщо пройдений 3-й рівень
            sportButton.classList.remove('disabled');
        } else {
            sportButton.classList.add('disabled');
        }
    }
}

function showGnomeSpeech(message) {
    const speechBubble = document.getElementById('gnomeSpeech');
    speechBubble.textContent = message;
    speechBubble.classList.add('active');
    
    setTimeout(() => {
        speechBubble.classList.remove('active');
    }, 3000);
}

// Допоміжна функція для конвертації HEX в RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

document.addEventListener('DOMContentLoaded', updateLevelButtons); 
