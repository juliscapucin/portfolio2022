import GSAP from 'gsap'
import each from 'lodash/each'

export default function latestWorkMouseover() {
  //select Latest Work items
  const latestItems = document.querySelectorAll('.home__project__item')

  latestItems.forEach((link) => {
    link.addEventListener('mouseenter', (event) => {
      let targetLink = event.target

      GSAP.to(targetLink, {
        xPercent: -50,
        duration: 1,
        ease: 'expo.out',
      })
    })

    link.addEventListener('mouseleave', (event) => {
      let targetLink = event.target

      GSAP.to(targetLink, {
        xPercent: 0,
        duration: 2,
        ease: 'expo.out',
      })
    })
  })
}
