fetch('/pages/modal.html')
.then(response => {
  if (!response.ok) {
    throw new Error ('Ошибка при загрузке модального окна');
  }
  return response.text();
})

.then(html => {
  document.body.insertAdjacentHTML('beforeend',html);
    const modal = document.querySelector('.modal');
    const btnModal = document.querySelectorAll('.btn__started');
    const btnModalClose = document.querySelector('.modal__close');

    function openModal() {
      btnModal.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.add('open');
          });
        });

        btnModalClose.addEventListener('click', () => {
          modal.classList.remove('open');
        });

        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('open');
            }
        });
      };
    openModal();
})
.catch(err => {
  console.error('Ошибка при загрузке модального окна', err);
});


const menuBtn = document.querySelector('.burger__menu');
const menuList = document.querySelector('.nav__list');
const welcomeImage = document.querySelector('.welcome__image');
const menuClose = document.querySelector('.nav__btn-close');


function menuOpen() {
  menuBtn.addEventListener('click', () => {
    menuList.classList.add('open');
    menuClose.classList.add('open');
    welcomeImage.classList.add('static');
  })
};
  menuOpen();

function menuClosed() {
  menuClose.addEventListener('click', () => {
    menuList.classList.remove('open');
    menuClose.classList.remove('open');
    welcomeImage.classList.remove('static');
  })
};
  menuClosed();




