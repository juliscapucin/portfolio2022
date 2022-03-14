import AutoBind from 'auto-bind'
import Component from 'classes/Component'

export default class AnimationScroll extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })
    this.element = element
    this.elements = elements

    // this.target = animationTarget ? element.closest(animationTarget) : element

    this.isVisible = false

    if ('IntersectionObserver' in window) {
      this.createObserver()

      this.animateOut()
    } else {
      this.animateIn()
    }
  }

  createObserver() {
    this.observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!this.isVisible && entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    })
    this.observer.observe(this.element)
  }

  animateIn() {
    this.isVisible = true
  }

  animateOut() {
    this.isVisible = false
  }
}
