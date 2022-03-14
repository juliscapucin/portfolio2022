import GSAP from 'gsap'

import Animation from 'classes/Animation'

export default class LatestItems extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })
  }

  listen() {
    console.log(this.element)

    this.element.addEventListener('mouseenter', function () {
      this.timelineIn = GSAP.timeline({ delay: 1 })
      this.timelineIn.to(this.element, {
        autoAlpha: 0,
        duration: 2,
        ease: 'expo.out',
      })
    })
    this.element.addEventListener('mouseleave', function () {
      this.timelineOut = GSAP.timeline({ delay: 1 })
      this.timelineOut.to(this.element, {
        autoAlpha: 1,
        duration: 2,
        ease: 'expo.out',
      })
    })
  }

  //   animateIn() {
  //     this.timelineIn = GSAP.timeline({ delay: 1 })
  //     this.timelineIn.to(this.element, {
  //       autoAlpha: 0,
  //       duration: 2,
  //       ease: 'expo.out',
  //     })
  //   }

  //   animateOut() {
  //     this.timelineOut = GSAP.timeline({ delay: 1 })
  //     this.timelineOut.to(this.element, {
  //       autoAlpha: 1,
  //       duration: 2,
  //       ease: 'expo.out',
  //     })
  //   }
}
