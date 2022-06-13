let frisBaseUrl: string

if (typeof window.frisBaseUrl === 'string') {
  // 客户自定义 url
  frisBaseUrl = window.frisBaseUrl
} else if (process.env.VUE_APP_ENV === 'dev') {
  frisBaseUrl = '//devfris.fftai.com/fftai-kf'
}

export {
  frisBaseUrl
}