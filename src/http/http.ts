import type { IDoubleTokenRes } from '@/api/types/login'
import type { CustomRequestOptions, IResponse } from '@/http/types'
import { useTokenStore } from '@/store/token'
import { isDoubleTokenMode } from '@/utils'
import { toLoginPage } from '@/utils/toLoginPage'

// 刷新 token 状态管理
let refreshing = false // 防止重复刷新 token 标识
let taskQueue: (() => void)[] = [] // 刷新 token 请求队列

export function http<T>(options: CustomRequestOptions) {
  // 1. 返回 Promise 对象
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success: async (res) => {
        const responseData = res.data as IResponse<T>
        const { code } = responseData
        const data = res.data as any

        // 检查是否登录失效(包括HTTP状态码401、业务码401、或result === 'login')
        const isTokenExpired = res.statusCode === 401 || code === 401 || (data && data.result === 'login')

        if (isTokenExpired) {
          const customOptions = options as CustomRequestOptions & { query?: any }

          // 如果是登录检查请求,直接返回响应数据,不抛出异常
          if (customOptions.query?.loginCheck) {
            return resolve(responseData as any)
          }

          const tokenStore = useTokenStore()

          // 检查是否有 remember me 存储
          const remember = uni.getStorageSync('jeesite_remember')

          if (!isDoubleTokenMode) {
            // 未启用双token策略
            if (remember) {
              // 有 remember,尝试使用 remember 重新请求
              const retryOptions = options as CustomRequestOptions & { tryagain?: boolean, remember?: boolean }
              retryOptions.remember = true

              try {
                const retryResult = await http<T>(retryOptions)
                return resolve(retryResult)
              }
              catch (retryErr) {
                console.error('Remember 自动重登失败:', retryErr)
                // Remember 登录失败,清理 token 和用户信息
                await tokenStore.logout()
                uni.showToast({
                  title: (data as any).message || '会话已失效,请重新登录',
                  icon: 'none',
                })
                toLoginPage()
                return reject(res)
              }
            }
            else {
              // 没有 remember,直接清理并跳转
              tokenStore.logout()
              uni.showToast({
                title: '会话已失效,请重新登录',
                icon: 'none',
              })
              toLoginPage()
              return reject(res)
            }
          }

          /* -------- 无感刷新 token ----------- */
          const { refreshToken } = tokenStore.tokenInfo as IDoubleTokenRes || {}
          // token 失效的，且有刷新 token 的，才放到请求队列里
          if (refreshToken) {
            taskQueue.push(() => {
              resolve(http<T>(options))
            })
          }

          // 如果有 refreshToken 且未在刷新中，发起刷新 token 请求
          if (refreshToken && !refreshing) {
            refreshing = true
            try {
              // 发起刷新 token 请求（使用 store 的 refreshToken 方法）
              await tokenStore.refreshToken()
              // 刷新 token 成功（无感刷新，不显示提示）
              refreshing = false
              // 将任务队列的所有任务重新请求
              taskQueue.forEach(task => task())
            }
            catch (refreshErr) {
              console.error('刷新 token 失败:', refreshErr)
              refreshing = false

              // 刷新 token 失败,检查是否有 remember
              const rememberAfterRefresh = uni.getStorageSync('jeesite_remember')
              if (rememberAfterRefresh) {
                // 有 remember,尝试使用 remember 重新请求
                const retryOptions = options as CustomRequestOptions & { tryagain?: boolean, remember?: boolean }
                retryOptions.remember = true

                try {
                  const retryResult = await http<T>(retryOptions)
                  return resolve(retryResult)
                }
                catch (retryErr) {
                  console.error('Remember 自动重登失败:', retryErr)
                  // Remember 登录失败,清理 token 和用户信息
                  await tokenStore.logout()
                  uni.showToast({
                    title: (data as any).message || '会话已失效,请重新登录',
                    icon: 'none',
                  })
                  toLoginPage()
                  return reject(res)
                }
              }
              else {
                // 没有 remember,清理并跳转
                await tokenStore.logout()
                uni.showToast({
                  title: '会话已失效,请重新登录',
                  icon: 'none',
                })
                setTimeout(() => {
                  toLoginPage()
                }, 2000)
              }
            }
            finally {
              // 不管刷新 token 成功与否，都清空任务队列
              taskQueue = []
            }
          }
          else if (remember) {
            // 没有 refreshToken 但有 remember,尝试使用 remember 重新请求
            const retryOptions = options as CustomRequestOptions & { tryagain?: boolean, remember?: boolean }
            retryOptions.remember = true

            try {
              const retryResult = await http<T>(retryOptions)
              return resolve(retryResult)
            }
            catch (retryErr) {
              console.error('Remember 自动重登失败:', retryErr)
              // Remember 登录失败,清理 token 和用户信息
              await tokenStore.logout()
              uni.showToast({
                title: (data as any).message || '会话已失效,请重新登录',
                icon: 'none',
              })
              toLoginPage()
              return reject(res)
            }
          }
          else {
            // 既没有 refreshToken 也没有 remember,直接清理并跳转
            await tokenStore.logout()
            uni.showToast({
              title: '会话已失效,请重新登录',
              icon: 'none',
            })
            toLoginPage()
            return reject(res)
          }

          return reject(res)
        }

        // 处理其他成功状态（HTTP状态码200-299）
        // JeeSite4 风格：不判断业务码，直接返回完整响应数据，由调用方判断 result 字段
        if (res.statusCode >= 200 && res.statusCode < 300) {
          return resolve(responseData as any)
        }

        // 处理其他错误
        !options.hideErrorToast
        && uni.showToast({
          icon: 'none',
          title: (res.data as any).msg || '请求错误',
        })
        reject(res.data)
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @param header 请求头，默认为json格式
 * @returns
 */
export function httpGet<T>(url: string, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
  return http<T>({
    url,
    query,
    method: 'GET',
    header,
    ...options,
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @param header 请求头，默认为json格式
 * @returns
 */
export function httpPost<T>(url: string, data?: Record<string, any>, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
  return http<T>({
    url,
    query,
    data,
    method: 'POST',
    header,
    ...options,
  })
}
/**
 * PUT 请求
 */
export function httpPut<T>(url: string, data?: Record<string, any>, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
  return http<T>({
    url,
    data,
    query,
    method: 'PUT',
    header,
    ...options,
  })
}

/**
 * DELETE 请求（无请求体，仅 query）
 */
export function httpDelete<T>(url: string, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
  return http<T>({
    url,
    query,
    method: 'DELETE',
    header,
    ...options,
  })
}

/**
 * 将对象转换为查询字符串（兼容微信小程序）
 * @param params - 参数对象
 * @returns 查询字符串
 */
function buildQueryString(params: Record<string, any>): string {
  return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

/**
 * POST 请求（JSON 格式）
 * @param url - 请求 URL
 * @param params - URL 查询参数（拼接在 URL 后面）
 * @param data - 请求体数据（RequestBody）
 * @param options - 其他配置选项
 */
export function httpPostJson<T>(
  url: string,
  params?: Record<string, any>,
  data?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) {
  // 如果有 params 且不为空对象，拼接到 URL 上
  const hasParams = params && Object.keys(params).length > 0
  let finalUrl = url
  if (hasParams) {
    const queryString = buildQueryString(params)
    finalUrl = `${url}?${queryString}`
  }

  return http<T>({
    url: finalUrl,
    data,
    method: 'POST',
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...options?.header,
    },
    ...options,
  })
}

// 支持与 axios 类似的API调用
http.get = httpGet
http.post = httpPost
http.put = httpPut
http.delete = httpDelete
http.postJson = httpPostJson
