document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления элементов при скролле
    const fadeInElements = document.querySelectorAll('.services-grid > *, .portfolio-grid > *, .about-content, .about-image, .contact-form, .contact-info');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.classList.add('fade-element');
        fadeInObserver.observe(element);
    });

    // Мобильное меню
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.innerHTML = '<span></span><span></span><span></span>';
    
    const navElement = document.querySelector('nav');
    navElement.insertBefore(menuButton, navElement.firstChild);
    
    const navMenu = document.querySelector('nav ul');
    
    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    // Валидация формы обратной связи
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Проверка имени
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Пожалуйста, введите ваше имя');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Проверка email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Пожалуйста, введите корректный email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Проверка сообщения
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Пожалуйста, введите сообщение');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // Если форма валидна - отправляем
            if (isValid) {
                // Здесь будет код отправки формы
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Отправка...';
                
                // Имитация отправки формы
                setTimeout(function() {
                    submitButton.textContent = 'Отправлено!';
                    contactForm.reset();
                    
                    setTimeout(function() {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // Функция для отображения ошибки
    function showError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            inputElement.insertAdjacentElement('afterend', errorElement);
        }
        
        formGroup.classList.add('error');
    }
    
    // Функция для удаления ошибки
    function removeError(inputElement) {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        formGroup.classList.remove('error');
    }

    // Добавление дополнительных стилей для анимации
    const style = document.createElement('style');
    style.textContent = `
        .fade-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error-message {
            color: #e53e3e;
            font-size: 12px;
            margin-top: 5px;
        }
        
        .form-group.error input,
        .form-group.error textarea {
            border-color: #e53e3e;
        }
        
        .menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
        }
        
        .menu-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px 0;
            background-color: var(--primary-color);
            transition: all 0.3s ease;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }
            
            nav {
                align-items: flex-start;
            }
            
            nav ul {
                display: none;
                flex-direction: column;
                width: 100%;
                margin-top: 20px;
            }
            
            nav ul.active {
                display: flex;
            }
            
            nav ul li {
                margin: 10px 0;
            }
            
            nav .contact-button {
                margin-top: 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
}); 