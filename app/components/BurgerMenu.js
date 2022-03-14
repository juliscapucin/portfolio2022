import GSAP from 'gsap'

export default function burgerMenu() {
  let burgerButton = document.querySelector('.burger')
  let burgerBg = document.querySelector('.burger__bg')
  let burgerBgToggle = document.querySelector('.burger__bg__toggle')
  let toggleLinks = document.querySelectorAll('.toggle__nav__item')
  let toggleNav = document.querySelector('.toggle__nav')

  burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('active')
    burgerBg.classList.toggle('active')
    burgerBgToggle.classList.toggle('active')
    toggleNav.classList.toggle('active')

    toggleLinks.forEach((element) => {
      if (element.classList.contains('active')) {
        element.classList.remove('active')
      }
    })

    if (burgerButton.classList.contains('active')) {
      for (let i = 0; i < toggleLinks.length; i++) {
        setTimeout(() => {
          toggleLinks[i].classList.add('active')
        }, i * 100)
      }
    }
  })

  const tl = GSAP.timeline()

  //   tl.set(content, { autoAlpha: 0 }).to(content, {
  //     delay: 0.8,
  //     autoAlpha: 1,
  //     duration: 1.4,
  //     ease: "Power1.easeInOut",
  //   });
}
