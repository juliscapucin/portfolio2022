import Page from 'classes/Page'

export default class Playground extends Page {
  constructor() {
    super({
      id: 'playground',
      element: '.playground',
      elements: {
        navigation: document.querySelector('.navigation'),
        wrapper: '.playground__wrapper',
      },
    })
  }
}
