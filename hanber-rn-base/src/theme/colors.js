const palettes = {
  light: {
    primary: '#2494fc',
    onPrimary: '#ffffff',
    accent: '#e91e63',
    warning: '#e09913',
    icon: '#1f99b0',
    iconMuted: '#dddddd',
    spinner: '#0000ff',
    textPrimary: '#222222',
    textSecondary: '#999999',
    surface: '#f5f5f5',
    background: '#ffffff',
    transparent: 'transparent',
  },
  dark: {
    primary: '#1677d1',
    onPrimary: '#ffffff',
    accent: '#ff5f8f',
    warning: '#f3b13f',
    icon: '#6ec8d8',
    iconMuted: '#686868',
    spinner: '#8ab4ff',
    textPrimary: '#f2f2f2',
    textSecondary: '#a7a7a7',
    surface: '#1f1f1f',
    background: '#121212',
    transparent: 'transparent',
  },
}

export function getThemeColors(theme = 'light') {
  return palettes[theme] || palettes.light
}

export const colors = getThemeColors('light')
