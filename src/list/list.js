import template from './template.js'
import emptyListTemplate from './template_empty.js'

const listLocation = document.querySelector('ul')

const onClick = cb => listLocation.addEventListener('click', cb)

const paint = (list, emptyExplainer) => {
  listLocation.innerHTML = ''
  list.length === 0 ?
    listLocation.innerHTML = emptyListTemplate(emptyExplainer):
    list.forEach(item => listLocation.innerHTML += template(item))
}

export default { paint, onClick }
