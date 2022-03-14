import Page from 'classes/Page'

export default class Archive extends Page {
  constructor() {
    super({
      id: 'archive',
      element: '.archive',
      elements: {
        navigation: document.querySelector('.navigation'),
        wrapper: '.archive__wrapper',
      },
    })
  }
}
