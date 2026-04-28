import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

export function ScrollableTabBar({
  activeTab = 0,
  goToPage,
  tabs = [],
  tabBarActiveTextColor = '#000000',
  tabBarBackgroundColor = '#ffffff',
  tabBarInactiveTextColor = '#777777',
  tabBarTextStyle,
  tabBarUnderlineStyle,
}) {
  const scrollRef = useRef(null)
  const measurementsRef = useRef({})

  useEffect(() => {
    const currentTab = measurementsRef.current[activeTab]

    if (!currentTab || !scrollRef.current) {
      return
    }

    const offsetX = Math.max(currentTab.x - 24, 0)
    scrollRef.current.scrollTo({ x: offsetX, animated: true })
  }, [activeTab])

  return (
    <View style={[styles.tabBarContainer, { backgroundColor: tabBarBackgroundColor }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBarContent}
      >
        {tabs.map((tab, index) => {
          const active = index === activeTab

          return (
            <Pressable
              key={`${tab}-${index}`}
              onLayout={({ nativeEvent }) => {
                measurementsRef.current[index] = nativeEvent.layout
              }}
              onPress={() => goToPage(index)}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabText,
                  tabBarTextStyle,
                  { color: active ? tabBarActiveTextColor : tabBarInactiveTextColor },
                ]}
              >
                {tab}
              </Text>
              <View
                style={[
                  styles.tabUnderline,
                  tabBarUnderlineStyle,
                  !active && styles.tabUnderlineHidden,
                ]}
              />
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default function ScrollableTabView({
  children,
  initialPage = 0,
  onChangeTab,
  renderTabBar,
  style,
  ...tabBarProps
}) {
  const pages = Children.toArray(children).filter(Boolean)
  const safeInitialPage = Math.min(Math.max(initialPage, 0), Math.max(pages.length - 1, 0))
  const [activeTab, setActiveTab] = useState(safeInitialPage)

  useEffect(() => {
    setActiveTab(safeInitialPage)
  }, [safeInitialPage])

  const goToPage = (pageIndex) => {
    if (pageIndex === activeTab || !pages[pageIndex]) {
      return
    }

    setActiveTab(pageIndex)
    onChangeTab?.({
      i: pageIndex,
      ref: pages[pageIndex],
      from: activeTab,
    })
  }

  const tabs = pages.map((page, index) => page?.props?.tabLabel || `Tab ${index + 1}`)
  const currentPage = pages[activeTab]

  const tabBarElement = renderTabBar ? renderTabBar() : <ScrollableTabBar />
  const resolvedTabBar = isValidElement(tabBarElement)
    ? cloneElement(tabBarElement, {
        activeTab,
        goToPage,
        tabs,
        ...tabBarProps,
      })
    : null

  return (
    <View style={[styles.container, style]}>
      {resolvedTabBar}
      <View style={styles.sceneContainer}>{currentPage}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBarContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d8d8d8',
  },
  tabBarContent: {
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingTop: 14,
    // paddingBottom: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 15,
  },
  tabUnderline: {
    marginTop: 8,
    height: 2,
    minWidth: 24,
    borderRadius: 999,
    backgroundColor: '#000000',
  },
  tabUnderlineHidden: {
    opacity: 0,
  },
  sceneContainer: {
    flex: 1,
  },
})
