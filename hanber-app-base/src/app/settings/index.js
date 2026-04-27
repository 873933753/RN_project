import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useAppColors from '@/theme/useAppColors'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { router } from 'expo-router'

const primarySections = [
  {
    title: '内容与服务',
    items: [
      { label: 'Wiki', icon: 'book-outline', iconBg: '#2c7df7' },
      { label: '常用站点', icon: 'globe-model', iconBg: '#34c759' },
    ],
  },
  {
    title: '关于',
    items: [
      { label: '关于 hanber', icon: 'information-outline', iconBg: '#8e8e93' },
      { label: '使用条款', icon: 'file-document-outline', iconBg: '#ff9500' },
      { label: '隐私政策', icon: 'shield-check-outline', iconBg: '#5ac8fa' },
      { label: 'App 备案号', icon: 'card-bulleted-outline', iconBg: '#5856d6', value: '备案中' },
    ],
  },
]

const accountSection = {
  title: '账户',
  items: [
    { label: '安全账户', icon: 'lock-outline', iconBg: '#30b0c7', value: '已开启' },
    { label: '注销账户', icon: 'alert-circle-outline', iconBg: '#ff3b30', danger: true },
  ],
}

function SettingRow({ item, isLast, colors, styles }) {
  return (
    <TouchableOpacity activeOpacity={0.75} style={[styles.row, isLast && styles.rowLast]}>
      <View style={styles.rowLeft}>
        {/* <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
          <MaterialCommunityIcons name={item.icon} size={18} color="#ffffff" />
        </View> */}
        <Text
          style={[styles.rowLabel, item.danger && styles.dangerText]}
          /* 1）使用Linking打开网页
            -- 会跳出app打开浏览器，用户体验较差
          */
          // onPress={() => {
          //   Linking.openURL('https://docs.expo.dev/versions/latest/sdk/linking/')
          // }}

          /* 2）expo-web-browser
          -- 会在app内打开一个浏览器窗口，用户体验更好
          -- ios会有一个返回按钮，安卓会有一个关闭按钮
          -- 比Linking体验稍好
          */
          // onPress={async () => {
          //   await WebBrowser.openBrowserAsync('https://docs.expo.dev/versions/latest/sdk/linking/')
          // }}

          /* 3）webview 
          -- 可以完全自定义界面和交互，用户体验最佳 
          */
          onPress={() => {
            router.push({
              pathname: '/settings/[uri]',
              params: {
                // uri: 'https://docs.expo.dev/versions/latest/sdk/linking/',
                uri: 'https://clwy.cn/sites',
                title: item.label,
              },
            })
          }}
        >
          {item.label}
        </Text>
      </View>

      <View style={styles.rowRight}>
        {item.value ? <Text style={styles.rowValue}>{item.value}</Text> : null}
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  )
}

function SettingSection({ section, colors, styles }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.groupCard}>
        {section.items.map((item, index) => (
          <SettingRow
            key={item.label}
            item={item}
            isLast={index === section.items.length - 1}
            colors={colors}
            styles={styles}
          />
        ))}
      </View>
    </View>
  )
}

export default function Setting() {
  const colors = useAppColors()
  const styles = createStyles(colors)

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroEyebrow}>HANBER</Text>
            <Text style={styles.heroTitle}>设置</Text>
            <Text style={styles.heroSubtitle}>管理内容入口、账户安全与应用信息。</Text>
          </View>
          <View style={styles.heroBadge}>
            <Ionicons name="settings-outline" size={24} color={colors.primary} />
          </View>
        </View> */}

        {primarySections.map((section) => (
          <SettingSection key={section.title} section={section} colors={colors} styles={styles} />
        ))}

        <SettingSection section={accountSection} colors={colors} styles={styles} />

        {/* <Text style={styles.footerText}>hanber 会根据系统主题自动切换页面配色。</Text> */}
      </ScrollView>
    </View>
  )
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingTop: 18,
      paddingBottom: 40,
    },
    heroCard: {
      backgroundColor: colors.background,
      borderRadius: 24,
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.06,
      shadowRadius: 18,
      elevation: 3,
    },
    heroEyebrow: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: 6,
    },
    heroTitle: {
      color: colors.textPrimary,
      fontSize: 32,
      fontWeight: '700',
      marginBottom: 6,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 20,
      maxWidth: 220,
    },
    heroBadge: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    section: {
      marginBottom: 22,
    },
    sectionTitle: {
      color: colors.textSecondary,
      fontSize: 13,
      marginBottom: 8,
      marginLeft: 12,
    },
    groupCard: {
      backgroundColor: colors.background,
      borderRadius: 18,
      overflow: 'hidden',
    },
    row: {
      minHeight: 62,
      paddingLeft: 14,
      paddingRight: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'rgba(60, 60, 67, 0.18)',
    },
    rowLast: {
      borderBottomWidth: 0,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingRight: 12,
    },
    iconWrap: {
      width: 30,
      height: 30,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    rowLabel: {
      color: colors.textPrimary,
      fontSize: 16,
    },
    rowRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowValue: {
      color: colors.textSecondary,
      fontSize: 14,
      marginRight: 4,
    },
    dangerText: {
      color: '#d94136',
    },
    footerText: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      paddingHorizontal: 12,
    },
  })
}
