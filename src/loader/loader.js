import template from './template.js'

const list = document.querySelector('ul')

const display = () => list.innerHTML = template()

export default { display }
