// подгрузка модалки по файлам
fetch('/pages/modal.html')
.then(res => {
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
            let formValid = true;

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

                if (!valid) formValid = false;
            });

            if (formValid) form.submit();
            else console.log('Форма не валидна!');
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
