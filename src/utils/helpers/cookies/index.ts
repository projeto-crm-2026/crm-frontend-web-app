const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return null
}

const setCookie = (name: string, val: string, timeInDays = 7) => {
  const date = new Date()
  const value = val

  date.setTime(date.getTime() + timeInDays * 24 * 60 * 60 * 1000)
  document.cookie =
    name + '=' + value + '; expires=' + date.toUTCString() + '; path=/'
}

const isEmptyCookie = (value: string | null | undefined) => {
  return !value || value === 'null'
}

export { getCookie, setCookie, isEmptyCookie }
