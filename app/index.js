import NormalizeWheel from 'normalize-wheel'
import each from 'lodash/each'

import Detection from 'classes/Detection'

import Navigation from 'components/Navigation'
import Preloader from 'components/Preloader'

import About from 'pages/About'
import Archive from 'pages/Archive'
import Contact from 'pages/Contact'
import Home from 'pages/Home'
import Latest from 'pages/Latest'
import Playground from 'pages/Playground'
import Project from 'pages/Project'
import ProjectArchive from 'pages/ProjectArchive'

class App {
  constructor() {
    this.createContent()

    this.createPreloader()
    this.createNavigation()
    this.createPages()

    this.addEventListeners()
    this.addLinkListeners()

    this.update()
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }
  createNavigation() {
    this.navigation = new Navigation({
      template: this.template,
    })
  }

  createPages() {
    this.pages = {
      about: new About(),
      archive: new Archive(),
      contact: new Contact(),
      home: new Home(),
      latest: new Latest(),
      playground: new Playground(),
      project: new Project(),
      projectarchive: new ProjectArchive(),
    }
    this.page = this.pages[this.template]
    this.page.create()
  }
  //*****
  // EVENTS
  //*****
  onPreloaded() {
    this.preloader.destroy()
    this.onResize()
    this.page.show()
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false,
    })
  }

  // POPULATES HTML PAGE ON A FAKE DIV
  async onChange({ url, push = true }) {
    // Hide previous page
    await this.page.hide()

    // Fetch new page
    const request = await window.fetch(url)

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      if (push) {
        window.history.pushState({}, '', url)
      }

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')

      // this.navigation.onChange(this.template)

      this.content.setAttribute('data-template', this.template)

      this.content.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]

      this.page.create()

      this.onResize()

      // Show new page
      this.page.show()

      this.addLinkListeners()
    } else {
      console.log('Error')
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }

  //*****
  //LISTENERS
  //*****
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  //REMOVE DEFAULT ACTIONS FROM LINKS
  addLinkListeners() {
    const links = document.querySelectorAll('a')
    each(links, (link) => {
      // Exclude external links
      if (!link.classList.contains('external__link')) {
        link.onclick = (event) => {
          event.preventDefault()
          const { href } = link
          this.onChange({ url: href })
        }
      }
    })
  }
  //*****
  //SMOOTH SCROLL LOOP
  //*****
  update() {
    if (this.page && this.page.update) {
      this.page.update()
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }
}

new App()
