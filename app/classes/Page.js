import GSAP from 'gsap'
import NormalizeWheel from 'normalize-wheel'
import each from 'lodash/each'
import map from 'lodash/map'
import Prefix from 'prefix'

// Components
import burgerMenu from 'components/BurgerMenu'

// Loose animations
import Marquee from 'animations/Marquee'

// Data animations
import LatestItems from 'animations/LatestItems'
import RevealBottom from 'animations-data/RevealBottom'
import RevealLayer from 'animations-data/RevealLayer'

import AsyncLoad from 'classes/AsyncLoad'
import { forEach, set } from 'lodash'
import bodyParser from 'body-parser'

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element
    this.selectorChildren = {
      ...elements,

      animationsLatestItems: '[data-animation="latest-items"]',
      animationsRevealBottom: '[data-animation="reveal-bottom"]',
      animationsRevealLayer: '[data-animation="reveal-layer"]',

      imgSource: '[data-src]',
    }
    this.id = id

    this.transformPrefix = Prefix('transform')

    this.onMouseWheelEvent = this.onMouseWheel.bind(this)
  }

  create() {
    // this.element = document.querySelector(this.selectors.element)
    this.element = document.querySelector(this.selector)

    this.elements = {}

    this.scroll = {
      ease: 0.07,
      position: 0,
      current: 0,
      target: 0,
      limit: 0,
    }

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
    this.createAnimations()
    this.createAsyncLoad()
  }

  createAsyncLoad() {
    this.elements.imgSource = map(this.elements.imgSource, (element) => {
      return new AsyncLoad({ element })
    })
  }

  createAnimations() {
    this.animations = []

    /**
     * Home
     */

    this.animationsLatestItems = map(
      this.elements.animationsLatestItems,
      (element) => {
        return new LatestItems({ element })
      }
    )

    this.animations.push(...this.animationsLatestItems)

    /**
     * Reveal Bottom (text reveal from bottom)
     */

    this.animationsRevealBottom = map(
      this.elements.animationsRevealBottom,
      (element) => {
        return new RevealBottom({ element })
      }
    )

    this.animations.push(...this.animationsRevealBottom)

    /**
     * Reveal Layer (layer overlay reveal)
     */

    this.animationsRevealLayer = map(
      this.elements.animationsRevealLayer,
      (element) => {
        return new RevealLayer({ element })
      }
    )

    this.animations.push(...this.animationsRevealLayer)
  }

  show() {
    return new Promise((resolve) => {
      burgerMenu()
      // Define clicked link in menu
      const findPage = this.element.parentNode.getAttribute('data-template')
      // console.log(findPage)

      // Scroll page to top
      document.body.scrollTop = 0

      const pageTransition =
        this.element.parentNode.querySelector('.page__transition')

      // Breadcrumbs in NavBar
      const navBar = document.querySelector('.navigation')
      const buttonHome = navBar.querySelector('.Home')
      const buttonArchive = navBar.querySelector('.Archive')
      const buttonLatest = navBar.querySelector('.Latest')
      const buttonContact = navBar.querySelector('.Contact')
      const buttonAbout = navBar.querySelector('.About')

      const allButtons = document.querySelectorAll('.navigation__item__link')

      function removeBreadcrumb() {
        allButtons.forEach((button) => {
          button.id = ''
        })
        if (buttonHome.classList.contains('invisible')) {
          buttonHome.classList.remove('invisible')
        }
      }

      function addBreadcrumb(button) {
        if (button.id != 'breadcrumb') {
          button.id = 'breadcrumb'
        }
      }

      removeBreadcrumb()

      // Home animations
      if (findPage === 'home') {
        Marquee()
        if (!buttonHome.classList.contains('invisible')) {
          buttonHome.classList.add('invisible')
        }
        // About animations
      } else if (findPage === 'about') {
        addBreadcrumb(buttonAbout)
        // Archive animations
      } else if (findPage === 'archive') {
        addBreadcrumb(buttonArchive)
        Marquee()
        // Contact animations
      } else if (findPage === 'contact') {
        addBreadcrumb(buttonContact)
        // Latest animations
      } else if (findPage === 'latest') {
        addBreadcrumb(buttonLatest)
        Marquee()
        // Project animations
      } else if (findPage === 'project') {
        addBreadcrumb(buttonLatest)
        // Project Archive animations
      } else if (findPage === 'projectarchive') {
        addBreadcrumb(buttonArchive)
      }

      // Full page fade in

      this.animationIn = GSAP.timeline()
      this.animationIn.set(
        this.element,
        {
          autoAlpha: 1,
        },
        0
      )

      this.animationIn.to(
        pageTransition,
        {
          xPercent: -100,
          duration: 0.5,
          ease: 'Power1.easeInOut',
        },
        0
      )

      // this.animationIn.to(
      //   this.element,
      //   {
      //     clipPath: 'circle(2000px at 50% 50%)',
      //     duration: 1,
      //     ease: 'Power1.easeInOut',
      //   },
      //   0
      // )

      // fadeContent()

      this.animationIn.call((_) => {
        // add event listeners (scroll) after animationIn is finished
        this.addEventListeners()
        resolve()
      })
    })
  }

  hide() {
    return new Promise((resolve) => {
      const pageTransition =
        this.element.parentNode.querySelector('.page__transition')

      // remove event listeners (scroll) before animationOut starts
      this.removeEventListeners()
      this.animationOut = GSAP.timeline()

      this.animationOut.set(pageTransition, {
        xPercent: -100,
      })
      this.animationOut.to(pageTransition, {
        xPercent: 0,
        duration: 0.5,
        ease: 'Power1.easeInOut',
        onComplete: resolve,
      })

      // this.animationIn.set(this.element, {
      //   clipPath: 'circle(2000px at 1% 1%)',
      // })

      // this.animationOut.to(this.element, {
      //   clipPath: 'circle(50px at 1% 1%)',
      //   duration: 0.8,
      //   ease: 'Power1.easeInOut',
      //   onComplete: resolve,
      // })
    })
  }

  onMouseWheel(event) {
    const { pixelY } = NormalizeWheel(event)
    this.scroll.target += pixelY
  }

  // Sets limits for the smooth scroll
  onResize() {
    if (this.elements.wrapper) {
      setTimeout(() => {
        this.scroll.limit =
          this.elements.wrapper.clientHeight - window.innerHeight
      }, 500)
    }
    each(this.animations, (animation) => animation.onResize())
  }

  update() {
    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    )
    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    )
    if (this.scroll.current < 0.01) {
      this.scroll.current = 0
    }
    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`
    }
  }

  addEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheelEvent)
  }
  removeEventListeners() {
    window.removeEventListener('mousewheel', this.onMouseWheelEvent)
  }
}
