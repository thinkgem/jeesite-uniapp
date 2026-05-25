import type { CustomRequestOptions } from '@/http/types'
import { useConfig } from '@/hooks/useConfig'
import { useTokenStore } from '@/store'
import { useUserStore } from '@/store/user'
import { stringifyQuery } from './tools/queryString'

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = stringifyQuery(options.query)
      if (options.url.includes('?')) {
        options.url += `&${queryStr}`
      }
      else {
        options.url += `?${queryStr}`
      }
    }

    // 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      // #ifdef H5
      if (JSON.parse(import.meta.env.VITE_APP_PROXY_ENABLE)) {
        // 自动拼接代理前缀
        options.url = import.meta.env.VITE_APP_PROXY_PREFIX + options.url
      }
      else {
        // 使用 config store 中的 baseUrl
        const config = useConfig()
        options.url = config.getBaseUrl() + options.url
      }
      // #endif
      // 非H5正常拼接
      // #ifndef H5
      const config = useConfig()
      options.url = config.getBaseUrl() + options.url
      // #endif
      // TIPS: 如果需要对接多个后端服务，也可以在这里处理，拼接成所需要的地址
    }

    // 1. 请求超时
    options.timeout = 60000 // 60s

    // 2. 通用请求头设定（HTTP/2 约定 header 名称统一小写）
    // 先提取并清理 header，移除不应该出现在 header 中的字段
    const { timeout, url, query, ...restHeader } = options.header || {}

    // 判断是否是上传请求（通过检查是否有 filePath 或 formData）
    const isUploadRequest = !!(options as any).filePath || !!(options as any).formData

    // 判断是否已经设置了 Content-Type（如 application/json）
    const hasContentType = restHeader['Content-Type'] || restHeader['content-type']

    options.header = {
      // 上传请求不设置 Content-Type，让 uni.uploadFile 自动处理 multipart/form-data
      // 如果已经有 Content-Type，则不设置默认值
      ...(isUploadRequest ? {} : (hasContentType ? {} : { 'content-type': 'application/x-www-form-urlencoded' })),
      'x-requested-with': 'XMLHttpRequest',
      ...restHeader,
    }

    // 3. 默认指定返回 JSON 数据
    if (!options.header['x-ajax']) {
      options.header['x-ajax'] = 'json'
    }

    // 4. 添加 token 请求头标识
    const tokenStore = useTokenStore()
    const token = tokenStore.updateNowTime().validToken
    if (token) {
      options.header['x-token'] = token
    }

    // 5. 为节省流量，记住我数据不是每次都发送的，当会话失效后，尝试重试登录
    const remember = uni.getStorageSync('jeesite_remember')
    if (remember && (options as any).remember) {
      options.header['x-remember'] = remember
      ;(options as any).remember = false
    }

    return options
  },
}

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor)

    // 添加响应拦截器：处理响应中的 x-token 和 sessionid
    uni.addInterceptor('request', {
      success(res) {
        // 1. 检查响应数据是否存在
        if (!res.data) {
          uni.showToast({
            title: '连接不到服务器，在登录界面选择服务器地址。',
            icon: 'none',
            duration: 4000,
          })
          return false
        }

        const data = res.data

        // 2. 从响应头获取 token（HTTP 响应头）
        if (res.header && res.header['x-token']) {
          const tokenStore = useTokenStore()
          tokenStore.setTokenInfo({
            ...(tokenStore.tokenInfo || {}),
            token: res.header['x-token'],
          } as any)
        }

        // 3. 从响应体获取 sessionid（JeeSite 登录接口返回）
        if (data && typeof data === 'object') {
          if (data.sessionid) {
            const tokenStore = useTokenStore()
            const oldToken = (tokenStore.tokenInfo as any)?.token
            tokenStore.setTokenInfo({
              ...(tokenStore.tokenInfo || {}),
              token: data.sessionid,
            } as any)
            console.log('[Interceptor] Token 已更新:', oldToken ? '有旧token' : '无旧token', '->', `${data.sessionid.substring(0, 20)}...`)

            // 如果同时返回用户信息，保存到 userStore
            if (data.user) {
              const userStore = useUserStore()
              userStore.setLoginInfo(data)
              console.log('[Interceptor] 用户信息已保存:', data.user.loginCode || data.user.userCode)
              console.log('[Interceptor] UserStore loginInfo:', userStore.loginInfo)
            }
          }
        }

        // 4. 处理 remember me
        if (res.header && res.header['x-remember']) {
          const remember = res.header['x-remember']
          if (remember && remember !== 'deleteMe') {
            uni.setStorageSync('jeesite_remember', remember)
          }
          else {
            uni.removeStorageSync('jeesite_remember')
          }
        }

        // 重要：必须返回 res，否则原回调无法接收到响应数据
        return res
      },
    })
  },
}
