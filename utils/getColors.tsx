type IColors = {
  primary: '#C15A38'
  primaryDark: '#803b25'
  secondary: '#456990'
  white: '#FEFFFE'
  whiteSecondary: '#E9EBF8'
  gray: '#B4B8C5'
}

const getColors = (): IColors => {
  return require('./../tailwind.config').theme.colors
}

export { getColors }
