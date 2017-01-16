const navigation = {
  profile: document.getElementById('navigation--profile'),
  resume: document.getElementById('navigation--resume'),
  portfolio: document.getElementById('navigation--portfolio'),
  contact: document.getElementById('navigation--contact'),
  activate: element => {
    navigation.deactivate('profile')
    navigation.deactivate('resume')
    navigation.deactivate('portfolio')
    navigation.deactivate('contact')
    navigation[element].className += ' active'
  },
  deactivate: element => {
    const changedClasses = navigation[element].className.replace(/ ?active/, '')
    navigation[element].className = changedClasses
  }
}

const sections = {
  profile: document.getElementById('profile'),
  showProfile: function() {
    const viewportHeight = window.innerHeight
    const profileHeight = sections.profile.offsetHeight
    const navigationHeight = sections.navigation.offsetHeight
    const verticalMargin = (viewportHeight - profileHeight - navigationHeight) / 2
    sections.profile.style.marginTop = `${verticalMargin}px`
    sections.navigation.style.marginTop = `${verticalMargin}px`
  },
  hideProfile: function() {
    const profileHeight = sections.profile.offsetHeight
    const navigationHeight = sections.navigation.offsetHeight + 4
    sections.profile.style.marginTop = `-${profileHeight}px`
    sections.navigation.style.marginTop = '0px'
  },
  navigation: document.getElementById('navigation'),
  resume: document.getElementById('resume'),
  portfolio: document.getElementById('portfolio'),
  contact: document.getElementById('contact'),
}

navigation.profile.addEventListener('click', event => {
  event.preventDefault()
  sections.showProfile()

  sections.resume.style.top = `100vh`
  sections.portfolio.style.top = `100vh`
  sections.contact.style.top = `100vh`

  navigation.activate('profile')
})

navigation.resume.addEventListener('click', event => {
  event.preventDefault()
  sections.hideProfile()

  sections.resume.style.top = '66px'
  sections.portfolio.style.top = '66px'
  sections.contact.style.top = '66px'

  sections.resume.style.left = `0`
  sections.portfolio.style.left = `100vw`
  sections.contact.style.left = `200vw`
  navigation.activate('resume')
})

navigation.portfolio.addEventListener('click', event => {
  event.preventDefault()
  sections.hideProfile()

  sections.resume.style.top = '66px'
  sections.portfolio.style.top = '66px'
  sections.contact.style.top = '66px'

  sections.resume.style.left = `-100vw`
  sections.portfolio.style.left = `0`
  sections.contact.style.left = `100vw`
  navigation.activate('portfolio')
})

navigation.contact.addEventListener('click', event => {
  event.preventDefault()
  sections.hideProfile()

  sections.resume.style.top = '66px'
  sections.portfolio.style.top = '66px'
  sections.contact.style.top = '66px'

  sections.resume.style.left = `-200vw`
  sections.portfolio.style.left = `-100vw`
  sections.contact.style.left = `0`
  navigation.activate('contact')
})

document.body.style.overflowY = 'hidden'

navigation.profile.click()
