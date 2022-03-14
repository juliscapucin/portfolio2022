import GSAP from 'gsap'

import Component from 'classes/Component'

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.navigation',
      elements: {
        links: '.links',
        menuButtonAbout: '.links__about',
        menuButtonArchive: '.links__archive',
        menuButtonContact: '.links__contact',
        menuButtonHome: '.links__home',
      },
    })
  }
}
