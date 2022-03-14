import Component from 'classes/Component'
import each from 'lodash/each'
import GSAP from 'gsap'

import { split } from 'utils/text'

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        text: '.preloader__text',
        number: '.preloader__number__text',
      },
    })

    split({
      element: this.elements.text,
      expression: '<br>',
    })

    split({
      element: this.elements.text,
      expression: '<br>',
    })

    this.elements.textSpans = this.elements.text.querySelectorAll('span span')

    this.length = 0
    this.createLoader()
  }
  createLoader() {
    window.ASSETS.forEach((image) => {
      const media = new window.Image()

      media.src = image
      media.onload = (_) => {
        this.onAssetLoaded()
      }
    })
  }
  onAssetLoaded() {
    this.length += 1
    const percent = this.length / window.ASSETS.length

    this.elements.number.innerHTML = `${Math.round(percent * 100)}%`

    if (percent === 1) {
      this.onLoaded()
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 0.1,
      })

      this.animateOut
        .to(this.elements.number, {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'expo.out',
        })
        .to(this.elements.textSpans, {
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          y: '100%',
        })
        .set(this.element, {
          xPercent: 0,
        })
        .to(this.element, {
          xPercent: -100,
          duration: 1,
          ease: 'expo.out',
        })
        .call((_) => {
          this.emit('completed')
        })
    })
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}
