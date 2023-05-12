document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search)
  const currentLang = urlParams.get('lang')

  if ((currentLang && currentLang === 'en') || currentLang === 'ru') {
    document.documentElement.setAttribute('lang', currentLang)
  }
})
