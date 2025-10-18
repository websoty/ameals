// подгрузка модалки по файлам
const modalPath = 'pages/modal.html'; // путь от base


fetch(modalPath)
.then(res => {
    console.log('Загружаю модалку из:', modalPath);
    if (!res.ok) throw new Error('Ошибка при загрузке модалки');
    return res.text();
})
.then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const modal = document.querySelector('.modal');
    const btnModal = document.querySelectorAll('.btn__started, .btn__started-mobile');
    const btnModalClose = document.querySelector('.modal__close');

    // открыть/закрыть модалку
    btnModal.forEach(btn => 
      btn.addEventListener('click', () => 
        modal.classList.add('open')));

    btnModalClose.addEventListener('click', () => 
      modal.classList.remove('open'));
    
    modal.addEventListener('click', e => { 
      if (e.target === modal) modal.classList.remove('open'); 
    });

    // запускаем валидацию после вставки модалки
    validation();
})
.catch(err => console.error(err));


// Валидация форм
function validation() {
    const forms = document.querySelectorAll('.modal__form, .started__form');

    forms.forEach(form => {
        const requiredInputs = form.querySelectorAll('input[required], select[required]');

        form.addEventListener('submit', e => {
            e.preventDefault();
            let formValid = true; // отслежка формы валидации

            requiredInputs.forEach(input => {
                const val = input.value.trim();
                let valid = true;

                if (['name','country','city','state'].includes(input.name) || ['name','country','city','state'].includes(input.id)) {
                    valid = /^[A-Za-z\s]+$/.test(val);
                } else if (input.type === 'email' || input.id === 'email') {
                    valid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val);
                } else if (input.name === 'phone' || input.id === 'phone') {
                    valid = /^\+?\d+$/.test(val);
                } else if (input.name === 'zip' || input.id === 'zip-code') {
                    valid = /^\d+$/.test(val);
                } else if (input.tagName === 'SELECT') {
                    valid = val !== '';
                }
                

                if (!valid) {
                   formValid = false; 
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = '';
                }
            });
            if (formValid) {

            const successMsg = document.createElement('div');
            successMsg.classList.add('send');
            successMsg.innerHTML = `
                <div class="successMsg">
                <p>Thank you! Your form has been submitted! 🎉</p>
                <button class="successMsg__close">Close</button>
                </div>
            `;
            document.body.appendChild(successMsg);
            setTimeout(() => successMsg.classList.add('active'), 100);
            
            successMsg.querySelector('.successMsg__close').addEventListener('click', () => successMsg.remove());
            form.reset();
            } 
        });
    });
}



// Бургер меню
const menuBtn = document.querySelector('.burger__menu');
const menuList = document.querySelector('.nav__list');
const welcomeImage = document.querySelector('.welcome__image');
const menuClose = document.querySelector('.nav__btn-close');



menuBtn.addEventListener('click', () => {
    menuList.classList.add('open');
    menuClose.classList.add('open');
    welcomeImage.classList.add('static');
});

menuClose.addEventListener('click', () => {
    menuList.classList.remove('open');
    menuClose.classList.remove('open');
    welcomeImage.classList.remove('static');
});
