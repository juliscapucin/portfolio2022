import Page from 'classes/Page'
import GSAP from 'gsap'
import each from 'lodash/each'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        latestLinks: '.home__project__item',
        navigation: document.querySelector('.navigation'),
        wrapper: '.home__wrapper',
      },
    })
  }
  // Add custom functions to original create() on Page
  // create() {
  //   super.create()

  // for (var i = 0; i < this.elements.latestLinks.length; i++) {
  //   this.elements.latestLinks[i].addEventListener(
  //     'mouseenter',
  //     console.log('Latest was clicked!')
  //   )
  // }

  // this.elements.latestLinks.forEach((item) => {
  //   item.addEventListener('click', console.log('Latest was touched!'))
  //   console.log(item)
  // })

  // this.elements.latestLinks.addEventListener('click', (_) =>
  //   console.log('Latest was clicked!')
  // )

  // this.elements.latestLinks.addEventListener('mouseenter', (_) =>
  //   gsap.to(this.latestLinks, {
  //     x: -100,
  //     duration: 1,
  //     ease: 'expo.out',
  //   })
  // )
  // this.elements.latestLinks.addEventListener('mouseleave', (_) =>
  //   gsap.to(this.latestLinks, {
  //     x: -100,
  //     duration: 1,
  //     ease: 'expo.out',
  //   })
  // )
  // }
}
