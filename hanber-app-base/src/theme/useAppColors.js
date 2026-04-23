import { useColorScheme } from 'react-native'
import { getThemeColors } from '@/theme/colors'

export default function useAppColors() {
  const scheme = useColorScheme()
  return getThemeColors(scheme || 'light')
}
