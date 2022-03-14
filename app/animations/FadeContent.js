import GSAP from 'gsap'
import { delay } from 'lodash'

export default function fadeContent() {
  const content = document.querySelectorAll('h1, p, a, img')
  const tl = GSAP.timeline()

  tl.set(content, { autoAlpha: 0 }).to(content, {
    delay: 0.8,
    autoAlpha: 1,
    duration: 1.4,
    ease: 'Power1.easeInOut',
  })

  //   content.forEach((item) => {
  //     GSAP.set(item, { autoAlpha: 0, delay: 2 })
  //     GSAP.to(item, {
  //       autoAlpha: 1,
  //       duration: 3,
  //       ease: 'Power2.easeInOut',
  //     })
  //   })
}
