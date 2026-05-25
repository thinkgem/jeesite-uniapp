/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { useConfig } from '@/hooks/useConfig'
import { useTokenStore } from '@/store/token'

/**
 * BPM 工具函数
 */
export const bpmUtils = {
  /**
   * 构建表单 URL
   * @param url - 原始 URL
   * @returns 处理后的 URL
   */
  buildFormUrl(url: string): string {
    if (!url) {
      return ''
    }

    const config = useConfig()
    let ctx = config.getBaseUrl() + config.adminPath

    // 移除协议部分 (http:// 或 https://)
    const protocolIdx = ctx.indexOf('://')
    if (protocolIdx !== -1) {
      ctx = ctx.substring(protocolIdx + 3)
    }

    // 获取路径部分（从第一个 / 开始）
    const pathIdx = ctx.indexOf('/')
    if (pathIdx !== -1) {
      ctx = ctx.substring(pathIdx)
    }
    else {
      ctx = ''
    }

    // 如果 URL 以 ctx 开头，则移除 ctx 前缀
    if (ctx.length > 0 && url.substring(0, ctx.length) === ctx) {
      return url.substring(ctx.length)
    }

    return url
  },

  /**
   * 导航到流程追踪
   * @param procInsId - 流程实例 ID
   */
  navTrace(queryString: string) {
    const config = useConfig()
    const tokenStore = useTokenStore()
    const token = tokenStore.tokenInfo.token || ''
    const url = `${config.getBaseUrl() + config.adminPath}/bpm/bpmRuntime/trace?${queryString}&__sid=${token}&app=true`
    uni.navigateTo({
      url: `/pages/sys/common/webview?title=流程追踪&url=${encodeURIComponent(url)}`,
    })
  },

  /**
   * 导航到表单
   * @param res - 表单响应数据
   * @param onSuccess - 成功回调
   * @param onError - 错误回调
   */
  navForm(res: any, onSuccess?: (url: string) => void, onError?: (message: string) => void) {
    if (res.result !== 'true') {
      if (onError) {
        onError(res.message)
      }
      else {
        uni.showToast({
          title: res.message,
          icon: 'none',
        })
      }
      return
    }

    let url = res.mobileUrl

    // 如果手机表单未设置，则获取 PC 表单地址
    if (!url && res.pcUrl) {
      url = `/pages${bpmUtils.buildFormUrl(res.pcUrl)}`
      console.log('mobileUrl is not set, used pcUrl:', url)
    }
    else {
      url = bpmUtils.buildFormUrl(url)
      console.log('mobileUrl:', url)
    }

    if (url) {
      if (onSuccess) {
        onSuccess(url)
      }
      else {
        uni.navigateTo({ url })
      }
    }
    else {
      if (onError) {
        onError('未设置表单地址')
      }
      else {
        uni.showToast({
          title: '未设置表单地址',
          icon: 'none',
        })
      }
    }
  },
}
