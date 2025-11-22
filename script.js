// Курсы криптовалют (примерные)
const rates = {
    BTC: 5800000,
    ETH: 280000,
    USDT: 95
};

// Элементы формы
const giveAmountInput = document.getElementById('give-amount');
const receiveAmountInput = document.getElementById('receive-amount');
const receiveCurrencySelect = document.getElementById('receive-currency');
const rateDisplay = document.getElementById('rate');
const tabButtons = document.querySelectorAll('.tab-btn');
const methodCards = document.querySelectorAll('.method-card');
const exchangeBtn = document.querySelector('.exchange-btn');

// Переключение вкладок (Купить/Продать)
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const tab = btn.dataset.tab;
        if (tab === 'buy') {
            exchangeBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Продолжить обмен';
        } else {
            exchangeBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Продолжить обмен';
        }
        
        calculateExchange();
    });
});

// Выбор способа оплаты
methodCards.forEach(card => {
    card.addEventListener('click', () => {
        methodCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// Расчет обмена
function calculateExchange() {
    const giveAmount = parseFloat(giveAmountInput.value) || 0;
    const currency = receiveCurrencySelect.value;
    const rate = rates[currency];
    const commission = 0.005; // 0.5%
    
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    
    let receiveAmount;
    if (activeTab === 'buy') {
        // Покупка криптовалюты
        receiveAmount = (giveAmount * (1 - commission)) / rate;
    } else {
        // Продажа криптовалюты
        receiveAmount = giveAmount * rate * (1 - commission);
    }
    
    receiveAmountInput.value = receiveAmount.toFixed(8);
    updateRateDisplay(currency, rate);
}

// Обновление отображения курса
function updateRateDisplay(currency, rate) {
    rateDisplay.textContent = `1 ${currency} = ${rate.toLocaleString('ru-RU')} RUB`;
}

// События изменения
giveAmountInput.addEventListener('input', calculateExchange);
receiveCurrencySelect.addEventListener('change', calculateExchange);

// Обработка кнопки обмена
exchangeBtn.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    const activeMethod = document.querySelector('.method-card.active');
    const giveAmount = giveAmountInput.value;
    const receiveAmount = receiveAmountInput.value;
    const currency = receiveCurrencySelect.value;
    
    if (!giveAmount || giveAmount <= 0) {
        alert('Пожалуйста, введите корректную сумму');
        return;
    }
    
    if (!activeMethod) {
        alert('Пожалуйста, выберите способ оплаты');
        return;
    }
    
    const method = activeMethod.dataset.method;
    const methodName = activeMethod.querySelector('span').textContent;
    
    const action = activeTab === 'buy' ? 'Покупка' : 'Продажа';
    
    alert(`${action} ${currency}\n\nВы отдаете: ${giveAmount} RUB\nВы получаете: ${receiveAmount} ${currency}\nСпособ оплаты: ${methodName}\n\nВ реальном приложении здесь будет переход к оформлению сделки.`);
});

// Инициализация
calculateExchange();

// Плавная прокрутка для навигации
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
