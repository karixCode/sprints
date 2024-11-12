const languageBlocks = document.querySelectorAll('.languages')
const languageItems = document.querySelectorAll('.languages-item')
const burgerButton = document.querySelector('.header__burger')
const burger = document.querySelector('.burger')
const emoji = document.querySelectorAll('.emoji')
const questionItems = document.querySelectorAll('.questions__item')
const slides = document.querySelectorAll('.work__slides-item')
const titlesSlide = document.querySelectorAll('.work__item-text')

// Смена языка
languageBlocks.forEach(languageBlock => {
    languageBlock.addEventListener('click', (e) => {
        const activeLanguagesId = e.target.dataset.languageId

        if (!activeLanguagesId) return 0

        languageItems.forEach(languageEl => languageEl.classList.remove('languages-active'))

        const activeLanguages = document.querySelectorAll(`.languages-${activeLanguagesId}`)
        activeLanguages.forEach(languageEl => languageEl.classList.add('languages-active'))
    })
})

// Открытие/закрытие burger
burgerButton.addEventListener('click', (e) => {
    burgerButton.setAttribute('src', burger.classList.contains('burger-open') ? 'images/header/burger.svg' : 'images/header/cross.svg')
    burger.classList.toggle('burger-open')
})

// Закрытие burger при скролле
window.addEventListener('scroll', () => {
    if (burger.classList.contains('burger-open')) {
        burger.classList.remove('burger-open')
        burgerButton.setAttribute('src', 'images/header/burger.svg')
    }
})

// Смена png emoji на gif
emoji.forEach(emoji => {
    const imageSrc = emoji.getAttribute('src')
    const gifSrc = imageSrc.replace(imageSrc.split('.')[1], 'gif')

    const replaceEmoji = (newSrc) => {
        emoji.setAttribute('src', newSrc)
    }

    emoji.addEventListener('mouseenter', () => replaceEmoji(gifSrc))

    emoji.addEventListener('mouseleave', () => replaceEmoji(imageSrc))

    window.innerWidth <= 768 ? replaceEmoji(gifSrc) : null
})

// Открытие/закрытие ответов на вопросы(аккордеон)
questionItems.forEach(questionItem => {
    questionItem.addEventListener('click', (e) => {
        questionItem.classList.toggle('questions__item-active')
    })
})

// Слайдер
const goToSlide = function (numberSlide) {
    titlesSlide.forEach(title => title.classList.remove('work__item-active'))
    titlesSlide[numberSlide].classList.add('work__item-active')

    slides.forEach((slideEl, index) => slideEl.style.transform = `translateX(${100 * (index - numberSlide)}%)`)
};

titlesSlide.forEach(title => {
    title.addEventListener('click', (e) => {
        const numberSlide = title.dataset.numberSlide
        goToSlide(numberSlide)
    })
})

goToSlide(0)
