const html = document.querySelector('html')!

export const isDarkTheme = (): boolean => {
  if (localStorage.getItem('dark-theme') === 'true') {
    return true
  } else {
    return html.classList.contains('dark-theme')
  }
}

export enum Theme {
  LIGHT,
  DARK,
}

export const changeTheme = (theme: Theme) => {
  if (theme === Theme.LIGHT) {
    localStorage.setItem('dark-theme', 'false')
    html.classList.remove('dark-theme')
  } else {
    localStorage.setItem('dark-theme', 'true')
    html.classList.add('dark-theme')
  }
}
