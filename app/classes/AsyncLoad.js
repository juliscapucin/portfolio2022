import Component from 'classes/Component'

export default class AsyncLoad extends Component {
  constructor({ element }) {
    super({ element })

    this.createObserver()
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log(this.element)
          if (this.element.getAttribute('data-src')) {
            this.imageSource = this.element.getAttribute('data-src')
            this.element.src = this.imageSource
            this.element.onload = (_) => {
              this.element.classList.add('loaded')
            }
          }
        }
      })
    })

    this.observer.observe(this.element)
  }
}
