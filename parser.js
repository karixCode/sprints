const input = document.querySelector('#input-file');
const form = document.querySelector('#form-file');
const labelForm = document.querySelector('#label-file');
const resetButton  = document.querySelector('#reset-button');
const applicationForm = document.querySelector('#formApplication');

form.addEventListener('change', (event) => {
    let file = event.target.files[0];

    readFile(file);
})

const readFile = (file) => {
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
        const fileJson= JSON.parse(reader.result)
        parseToHtml(fileJson)
        resetButton.classList.remove('disabled')
        labelForm.textContent = 'JSON обработан:'
    }

    reader.onerror = () => console.log(reader.error);
}

const parseToHtml = (fileJson) => {
    reset();

    const { name, fields, references, buttons } = fileJson;

    const creators = {
        name: createName,
        fields: createFields,
        references: createReferences,
        buttons: createButtons,
    }

    for (const [key, value] of Object.entries({ name, fields, references, buttons })) {
        if (value) creators[key](value);
    }
}

const createName = (name) => {
    const title = document.createElement('h2')

    title.textContent = name
    applicationForm.appendChild(title)
}

createFields = (fields) => {
    fields.forEach(field => {
        const fieldsWrapper = document.createElement('div')

        const label = document.createElement('label')
        label.textContent = field['label']
        label.style.marginRight = '8px'
        label.textContent ? fieldsWrapper.appendChild(label) : null

        if (field['input']['colors']) {
            const colors = field['input']['colors']
            const colorsWrapper = document.createElement('div')
            colorsWrapper.classList.add('colors-wrapper')

            colors.forEach(color => {
                const colorsElement = document.createElement('div')
                colorsElement.classList.add('colors-element')
                const {label, input} = createInputColor(color)

                colorsElement.appendChild(input)
                colorsElement.appendChild(label)
                colorsWrapper.appendChild(colorsElement)
            })
            applicationForm.appendChild(colorsWrapper)
        } else {
            const inputType = field['input']['type'] === 'textarea'
                ? 'textarea'
                : 'input'

            const input = field['input']['technologies'] ? createTechnologies(field['input']['technologies']) : document.createElement(inputType)

            for (let [attributeKey, attributeValue] of Object.entries(field['input'])) {
                attributeKey === 'filetype'
                    ? input.setAttribute('accept', attributeValue.map(fileType => '.' + fileType).join(', '))
                    : input.setAttribute(attributeKey, attributeValue)
            }

            input.classList.add(
                input.getAttribute('type') === 'checkbox'
                    ? null
                    : 'form-control')

            fieldsWrapper.appendChild(input)
            applicationForm.appendChild(fieldsWrapper)
        }
    })
}

const createTechnologies = (technologies) => {
    const select = document.createElement('select')

    technologies.forEach(technology => {
        const option = document.createElement('option')
        option.value = option.textContent = technology

        select.appendChild(option)
    })

    return select
}

const createInputColor = (color) => {
    const input = document.createElement('input')
    const label = document.createElement('label')

    input.setAttribute('value', color)
    input.setAttribute('type', 'radio')
    input.setAttribute('name', 'color')
    input.id = color

    label.style.backgroundColor = color
    label.style.height = '30px'
    label.style.width = '30px'
    label.setAttribute('for', color)
    return {label, input}
}

const createButtons = (buttons) => {
    buttons.forEach(button => {
        const buttonHtmlElement = document.createElement('button')

        buttonHtmlElement.textContent = button.text
        buttonHtmlElement.classList.add('btn', 'btn-primary')

        applicationForm.appendChild(buttonHtmlElement)
    })
}

const createReferences = (references) => {
    const referencesWrapper = document.createElement('div')
    referencesWrapper.classList.add('references-wrapper')

    references.forEach(reference => {
        if(reference.input) {
            const input = document.createElement('input')

            for (let [attributeKey, attributeValue] of Object.entries(reference['input'])) {
                input.setAttribute(attributeKey, attributeValue)
            }

            const label = document.createElement('label')
            label.textContent = reference['label']

            label.textContent ? reference.appendChild(label) : null
            referencesWrapper.appendChild(input)
        } else {
            const referenceElement = document.createElement('a')

            referenceElement.textContent = reference['text']
            referenceElement.setAttribute('href', reference['ref'])

            if(reference['text without ref']) {
                const paragraph = document.createElement('p')
                paragraph.textContent = reference['text without ref'] + ' '
                paragraph.appendChild(referenceElement)
                referencesWrapper.appendChild(paragraph)
            } else {
                referencesWrapper.appendChild(referenceElement)
            }
        }
    })
    applicationForm.appendChild(referencesWrapper)
}

const reset = () => {
    applicationForm.innerHTML = ''
    resetButton.classList.add('disabled')
    labelForm.textContent = 'Загрузите JSON:'
}

form.addEventListener('reset', reset)

