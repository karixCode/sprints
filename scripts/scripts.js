const languageBlocks = document.querySelectorAll('.languages')
const languageItems = document.querySelectorAll('.languages-item')
const burgerButton = document.querySelector('.header__burger')
const burger = document.querySelector('.burger')
const emoji = document.querySelectorAll('.emoji')
const questionItems = document.querySelectorAll('.questions__item')
const slides = document.querySelectorAll('.work__slides-item')
const titlesSlide = document.querySelectorAll('.work__item-text')
const sections = document.querySelectorAll('section')
const reviewsBlock = document.querySelector('.reviews__list')
const reviews = document.querySelectorAll('.reviews__item')
const reviewsButton = document.querySelector('.reviews__button')

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
burgerButton.addEventListener('click', () => {
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
    questionItem.addEventListener('click', () => {
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
    title.addEventListener('click', () => {
        const numberSlide = title.dataset.numberSlide
        goToSlide(numberSlide)
    })
})

goToSlide(0)

// Плавная прокрутка до секции
scrollToSection = (element, toTop=false) => {
    toTop
        ? window.scrollTo({ top: 0, behavior: 'smooth' })
        : element.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target === sections[0] ? scrollToSection(entry.target, true) : scrollToSection(entry.target)
        }
    })
}

const observerOptions = {
    threshold: 0.5,
}

const observer = new IntersectionObserver(handleIntersection, observerOptions)

sections.forEach(section => observer.observe(section))

// Анимация отзывов
const rotateReviews = () => {
    reviews.forEach(review => {
        const currentClass = Array.from(review.classList).find(reviewClass => reviewClass.startsWith('reviews__item-'))

            const currentNumber = parseInt(currentClass.split('-')[1])
            const nextNumber = currentNumber === reviews.length ? 1 : currentNumber + 1

            review.classList.replace(currentClass, `reviews__item-${nextNumber}`)
    })
}

reviews.forEach(review => review.addEventListener('click', rotateReviews))

// Структурирование отзывов
reviewsButton.addEventListener('click', () => {
    reviewsBlock.classList.add('reviews__list-grid')

    const infoText = document.createElement('p')
    infoText.textContent = 'Котики структурированы!'
    infoText.classList.add('reviews__structure-text')

    reviewsButton.remove()

    setTimeout(() => reviews.forEach(review => {
        review.style.position = 'static'
        reviewsBlock.style.height = 'auto'
        reviewsBlock.appendChild(infoText)
    }), 300)

    reviews.forEach(review => review.removeEventListener('click', rotateReviews))
})

//sale image rotate
const saleImage = document.querySelector('.sale__image')

const saleHandleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Попал в блок снизу
            if (saleImage.classList.contains('sale__image-down')) saleImage.classList.remove('sale__image-down')
            // Попал в блок сверху
            else saleImage.classList.add('sale__image-active')
        }

        if (!entry.isIntersecting) {
            // Вышел из блока вверх
            if (entry.boundingClientRect.top > 0 && saleImage.classList.contains('sale__image-active')) {
                saleImage.classList.remove('sale__image-active')
            // Вышел из блока вниз
            } else if (entry.boundingClientRect.top < 0) saleImage.classList.add('sale__image-active', 'sale__image-down')
        }
    })
}

const saleObserver = new IntersectionObserver(saleHandleIntersection, observerOptions)
saleObserver.observe(saleImage)