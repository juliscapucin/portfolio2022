import AutoBind from 'auto-bind'
import Component from 'classes/Component'

export default class Animation extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })
    this.element = element
    this.elements = elements

    this.animateIn()
  }

  animateIn() {}
}
