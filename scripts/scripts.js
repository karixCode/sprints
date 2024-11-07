const emoji = document.querySelectorAll('.emoji')

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