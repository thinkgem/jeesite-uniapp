import { onShow } from '@dcloudio/uni-app'
import { watch } from 'vue'
import { useLocaleStore } from '@/store/locale'
import { getCurrentPageI18nKey } from '@/utils'
import { processNavigationBarTitle } from '@/utils/i18n'

export function useGlobalNavigationBarI18n() {
  const localeStore = useLocaleStore()

  const setNavigationBarTitle = () => {
    const pages = getCurrentPages()
    if (pages.length === 0)
      return

    const titleKey = getCurrentPageI18nKey()
    if (!titleKey)
      return

    const translatedTitle = processNavigationBarTitle(titleKey)
    if (translatedTitle && translatedTitle !== titleKey) {
      uni.setNavigationBarTitle({
        title: translatedTitle,
      })
    }
  }

  onShow(() => {
    // nextTick(() => {
    setNavigationBarTitle()
    // })
  })

  watch(
    () => localeStore.locale,
    () => {
      // nextTick(() => {
      setNavigationBarTitle()
      // })
    },
  )

  const navigationApis = ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack', 'reLaunch'] as const

  navigationApis.forEach((api) => {
    uni.addInterceptor(api, {
      success() {
        // nextTick(() => {
        setNavigationBarTitle()
        // })
      },
    })
  })
}
