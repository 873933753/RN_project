import ProgressWebView from '@/components/shared/ProgressWebView'
import { useLocalSearchParams } from 'expo-router'

export default function SettingDetail() {
  const { uri } = useLocalSearchParams()
  return <ProgressWebView source={{ uri }} />
}
