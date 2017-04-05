window.addEventListener('load', function() {
	const navigation = {
		profile: document.getElementById('navigation--profile'),
		resume: document.getElementById('navigation--resume'),
		contact: document.getElementById('navigation--contact'),
		activate: element => {
			navigation.deactivate('profile')
			navigation.deactivate('resume')
			navigation.deactivate('contact')
			navigation[element].className += ' active'
			navigation.active = navigation[element]
		},
		deactivate: element => {
			const changedClasses = navigation[element].className.replace(/ ?active/, '')
			navigation[element].className = changedClasses
		},
		active: undefined,
	}

	const sections = {
		profile: document.getElementById('profile'),
		showProfile: function() {
			const viewportHeight = window.innerHeight
			const profileHeight = sections.profile.offsetHeight
			const navigationHeight = sections.navigation.offsetHeight
			const profileTop = (viewportHeight - profileHeight - navigationHeight) / 2
			sections.profile.style.top = `${profileTop}px`
			sections.navigation.style.top = `initial`
			sections.navigation.style.bottom = `calc(100vh - ${navigationHeight}px)`
			setTimeout(() => {
				sections.navigation.style.top = `initial`
				sections.navigation.style.bottom = `0`
			}, 10)
		},
		hideProfile: function() {
			const profileHeight = sections.profile.offsetHeight
			const navigationHeight = sections.navigation.offsetHeight
			sections.profile.style.top = `-${profileHeight}px`
			sections.navigation.style.top = `initial`
			sections.navigation.style.bottom = `calc(100vh - ${navigationHeight}px)`
			setTimeout(() => {
				sections.navigation.style.top = `0`
				sections.navigation.style.bottom = `initial`
			}, 1000)
		},
		navigation: document.getElementById('navigation'),
		show: function(page) {
			sections.resume.style.top = '66px'
			sections.contact.style.top = '66px'

			sections[page].style.left = '0'
		},
		prepareStyle: function(page) {
			sections[page].style.position = 'fixed'
			sections[page].style.overflowY = 'scroll'
			sections[page].style.height = 'calc(100vh - 66px)'
			sections[page].style.transition = 'top 1s, left 1s'
		},
		resume: document.getElementById('resume'),
		contact: document.getElementById('contact'),
	}

	navigation.profile.addEventListener('click', event => {
		event.preventDefault()

		sections.resume.style.top = `100vh`
		sections.contact.style.top = `100vh`

		sections.showProfile()
		navigation.activate('profile')
	})

	navigation.resume.addEventListener('click', event => {
		event.preventDefault()

		sections.contact.style.left = `100vw`

		sections.hideProfile()
		sections.show('resume')
		navigation.activate('resume')
	})

	navigation.contact.addEventListener('click', event => {
		event.preventDefault()

		sections.resume.style.left = `-100vw`

		sections.hideProfile()
		sections.show('contact')
		navigation.activate('contact')
	})

	window.addEventListener('resize', event => {
		navigation.active.click()
	})

	document.body.style.overflow = 'hidden'
	document.body.style.width = '100vw'
	document.body.style.height = '100vh'

	sections.profile.style.position = 'fixed'
	sections.navigation.style.position = 'fixed'
	sections.prepareStyle('resume')
	sections.prepareStyle('contact')

	navigation.profile.click()
});
