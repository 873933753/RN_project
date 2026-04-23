export default function screenOptions(colors) {
  return {
    title: '', // 设置默认标题为空。否则双端表现不一致，ios会有默认标题，android没有
    headerTitleAlign: 'center', // android标题居中
    animation: 'slide_from_right', // android左右滑动效果

    headerStyle: {
      backgroundColor: colors.primary, // 设置标题栏背景色
    },
    headerTintColor: colors.onPrimary, // 设置标题栏文字颜色
    headerTitleStyle: {
      fontWeight: 'bold', // 设置标题栏文字样式
      color: colors.onPrimary, // 设置标题栏文字颜色
      fontSize: 18,
    },
    headerBackButtonDisplayMode: 'minimal', // 设置返回按钮样式,只显示箭头
  }
}
