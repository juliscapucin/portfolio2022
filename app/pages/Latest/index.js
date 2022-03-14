import Page from 'classes/Page'

export default class Latest extends Page {
  constructor() {
    super({
      id: 'latest',
      element: '.latest',
      elements: {
        navigation: document.querySelector('.navigation'),
        wrapper: '.latest__wrapper',
      },
    })
  }
}
