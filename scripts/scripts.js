const emoji = document.querySelectorAll('.emoji')
const languageBlocks = document.querySelectorAll('.languages')
const languageItems = document.querySelectorAll('.languages-item')

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

languageBlocks.forEach(languageBlock => {
    languageBlock.addEventListener('click', (e) => {
        const activeLanguagesId = e.target.dataset.languageId

        if (!activeLanguagesId) return 0

        languageItems.forEach(languageEl => languageEl.classList.remove('languages-active'))

        const activeLanguages = document.querySelectorAll(`.languages-${activeLanguagesId}`)
        activeLanguages.forEach(languageEl => languageEl.classList.add('languages-active'))
    })
})