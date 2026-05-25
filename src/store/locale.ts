import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '@/locale'

/**
 * 支持的语言类型
 */
export type LocaleType = 'zh-Hans' | 'en'

/**
 * 语言配置
 */
const localeState = {
  // 当前语言
  locale: 'zh-Hans' as LocaleType,
  // 支持的语言列表
  supportedLocales: [
    { label: '简体中文', value: 'zh-Hans' },
    { label: 'English', value: 'en' },
  ],
}

export const useLocaleStore = defineStore(
  'locale',
  () => {
    // 当前语言
    const locale = ref<LocaleType>(localeState.locale)
    // 支持的语言列表
    const supportedLocales = ref(localeState.supportedLocales)

    /**
     * 设置语言
     * @param newLocale - 新的语言代码
     */
    const setLocale = (newLocale: LocaleType) => {
      locale.value = newLocale
      // 更新 i18n 实例
      i18n.global.locale = newLocale
      // 保存到本地存储，使用 jeesite_ 前缀
      uni.setStorageSync('jeesite_locale', newLocale)
      // 更新 uni-app 的语言设置
      uni.setLocale(newLocale)
    }

    /**
     * 初始化语言配置（从本地存储读取）
     */
    const initLocale = () => {
      // 从本地存储读取语言设置，使用 jeesite_ 前缀
      const savedLocale = uni.getStorageSync('jeesite_locale')
      if (savedLocale && (savedLocale === 'zh-Hans' || savedLocale === 'en')) {
        setLocale(savedLocale)
      }
      else {
        // 如果没有保存的设置，默认使用简体中文
        setLocale('zh-Hans')
      }
    }

    /**
     * 切换语言（在支持的语言之间切换）
     */
    const toggleLocale = () => {
      const currentIndex = supportedLocales.value.findIndex(
        item => item.value === locale.value,
      )
      const nextIndex = (currentIndex + 1) % supportedLocales.value.length
      const nextLocale = supportedLocales.value[nextIndex].value as LocaleType
      setLocale(nextLocale)
    }

    return {
      // 状态
      locale,
      supportedLocales,

      // 方法
      setLocale,
      initLocale,
      toggleLocale,
    }
  },
  {
    // 添加持久化配置
    persist: true,
  },
)
