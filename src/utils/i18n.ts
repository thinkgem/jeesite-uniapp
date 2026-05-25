import { t } from '@/locale/index'

/** 非 vue 文件使用 i18n */
export function testI18n() {
  // 下面同样生效
  uni.showModal({
    title: 'i18n',
    content: t('i18n.title'),
  })
}

/**
 * 处理 navigationBarTitleText 的国际化
 * @param title 标题文本，可能是 %xxx% 格式的国际化键值
 * @returns 翻译后的标题文本
 */
export function processNavigationBarTitle(title: string): string {
  if (!title)
    return title

  // 检查是否是 %xxx% 格式的国际化键值
  const match = title.match(/^%(.+)%$/)
  if (match) {
    const key = match[1]
    try {
      return t(key)
    }
    catch (error) {
      console.warn(`[i18n] Failed to translate navigationBarTitleText key: ${key}`, error)
      return title
    }
  }

  return title
}
