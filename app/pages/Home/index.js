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
}
