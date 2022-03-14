export default function Marquee() {
  let projectItems = [...document.querySelectorAll('.project__item')]

  // IMAGE TRAIL INITIAL VALUES
  let currentMouseX = 0
  let currentMouseY = 0
  let targetMouseX = 0
  let targetMouseY = 0
  let speed = 0.2

  /////////////////////////////
  /// EVENTS ON DOCUMENT

  const allImages = document.querySelectorAll('.marquee__item__image')

  // Set initial positions
  const setXPosition = (event) => {
    let x = event.pageX

    targetMouseX = x
  }

  // Animation function
  const animateX = () => {
    currentMouseX += (targetMouseX - currentMouseX) * speed

    // Animate all images X coordinates together
    allImages.forEach((image) => {
      image.style.left = `${currentMouseX}px`
    })

    requestAnimationFrame(animateX)
  }

  animateX()

  document.addEventListener('mousemove', setXPosition)

  /////////////////////////////
  /// EVENTS ON PROJECT ITEMS
  projectItems.forEach((project) => {
    let allMarquees = document.querySelectorAll('.project__marquee')
    let allImages = document.querySelectorAll('.marquee__item__image')
    let allProjectNames = document.querySelectorAll(
      '.marquee__item__link__wrapper'
    )

    /// MOUSE ENTER
    project.addEventListener('mouseenter', (event) => {
      let marquee = event.target.querySelector('.project__marquee')
      let image = event.target.querySelector('.marquee__item__image')
      let projectName = event.target.querySelector(
        '.marquee__item__link__wrapper'
      )

      // Make marquee and images visible
      marquee.classList.add('visible')
      image.classList.add('visible__image')
      projectName.classList.add('invisible')
    })

    /// MOUSE MOVE (IMAGE TRAIL Y COORDINATES)
    const image = project.querySelector('.marquee__item__image')

    const setYPosition = (event) => {
      let rect = event.target.getBoundingClientRect()
      let y = event.clientY - rect.top //y position within the element.

      targetMouseY = y
    }

    const animateY = () => {
      currentMouseY += (targetMouseY - currentMouseY) * speed

      // Animate images Y coordinates apart
      image.style.top = `${currentMouseY}px`

      requestAnimationFrame(animateY)
    }

    animateY()
    project.addEventListener('mousemove', setYPosition)

    /// MOUSE LEAVE
    project.addEventListener('mouseleave', (event) => {
      allMarquees.forEach((marquee) => {
        if (marquee.classList.contains('visible')) {
          marquee.classList.remove('visible')
        }
      })

      allImages.forEach((image) => {
        if (image.classList.contains('visible__image')) {
          image.classList.remove('visible__image')
        }
      })

      allProjectNames.forEach((projectName) => {
        if (projectName.classList.contains('invisible')) {
          projectName.classList.remove('invisible')
        }
      })
    })
  })
}
