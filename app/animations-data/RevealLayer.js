import GSAP from 'gsap'

import AnimationScroll from 'classes/AnimationScroll'

export default class RevealLayer extends AnimationScroll {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })
  }

  animateIn() {
    this.animatedIn = true
    this.timelineIn = GSAP.timeline()

    console.log('reveal-layer')

    this.timelineIn.to(this.element, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 1,
      ease: 'expo.out',
      delay: 0.2,
    })
    this.isVisible = true
  }

  animateOut() {
    this.animatedIn = true
    // this.animatedIn = false;
    // this.timelineOut = GSAP.timeline();
    // this.timelineOut.fromTo(
    //   this.element,
    //   { autoAlpha: 1, y: 0 },
    //   { autoAlpha: 0, y: 40, duration: 2, ease: "expo.out" }
    // );
  }
  onResize() {}
}
