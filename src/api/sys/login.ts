/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { useConfig } from '@/hooks/useConfig'
import { http } from '@/http/http'

/**
 * 语言切换
 * @param lang - 语言代码 (zh-Hans/en)
 */
export function switchLang(lang: string) {
  return http.get(`/lang/${lang}`, {}, {}, { timeout: 3000 })
}

/**
 * 获取首页数据
 * @param params - 查询参数
 */
export function getIndexData(params?: Record<string, any>) {
  const config = useConfig()
  return http.get(`${config.adminPath}/index`, params, {}, { timeout: 3000 })
}

/**
 * 登录
 * @param params - 登录表单数据
 */
export function login(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`${config.adminPath}/login`, params, {}, { timeout: 3000 })
}

/**
 * 登出
 * @param params - 登出参数
 */
export function logout(params?: Record<string, any>) {
  const config = useConfig()
  return http.get(`${config.adminPath}/logout`, params, {}, { timeout: 3000 })
}

/**
 * 获取认证信息
 * @param params - 查询参数
 */
export function getAuthInfo(params?: Record<string, any>) {
  const config = useConfig()
  return http.get(`${config.adminPath}/authInfo`, params)
}

/**
 * 获取菜单树
 */
export function getMenuTree() {
  const config = useConfig()
  return http.get(`${config.adminPath}/menuTree`)
}

/**
 * 切换系统
 * @param sysCode - 系统代码
 */
export function switchSystem(sysCode: string) {
  const config = useConfig()
  return http.get(`${config.adminPath}/switch/${sysCode}`)
}

/**
 * 获取字典数据树
 * @param params - 查询参数
 */
export function dictTreeData(params?: Record<string, any>) {
  const config = useConfig()
  return http.get(`${config.adminPath}/sys/dictData/treeData`, params)
}

/**
 * 获取忘记密码验证码
 * @param params - 表单数据
 */
export function getFpValidCode(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`/account/getFpValidCode`, params)
}

/**
 * 通过验证码保存密码
 * @param params - 表单数据
 */
export function savePwdByValidCode(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`/account/savePwdByValidCode`, params)
}

/**
 * 获取注册验证码
 * @param params - 表单数据
 */
export function getRegValidCode(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`/account/getRegValidCode`, params)
}

/**
 * 通过验证码保存注册信息
 * @param params - 表单数据
 */
export function saveRegByValidCode(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`/account/saveRegByValidCode`, params)
}

/**
 * 登录表单
 */
export interface ILoginForm {
  username: string
  password: string
}

/**
 * 获取验证码
 * @returns ICaptcha 验证码
 */
export function getCode() {
  return http.get<any>('/user/getCode')
}

/**
 * 用户登录（基于 auth 接口）
 * @param loginForm 登录表单
 */
export function authLogin(loginForm: ILoginForm) {
  return http.post<any>('/auth/login', loginForm)
}

/**
 * 刷新token
 * @param refreshToken 刷新token
 */
export function refreshToken(refreshToken: string) {
  return http.post<any>('/auth/refreshToken', { refreshToken })
}

/**
 * 获取用户信息
 * JeeSite 后端返回的数据结构包含 user 字段
 */
export function getUserInfo() {
  const config = useConfig()
  return http.get(`${config.adminPath}/index`, {}, {}, { timeout: 3000 }).then((res: any) => {
    const userData = res.user || res
    return {
      userId: userData.id,
      username: userData.loginCode,
      userName: userData.userName,
      loginCode: userData.loginCode,
      nickname: userData.userName,
      avatar: userData.avatarUrl,
      avatarUrl: userData.avatarUrl,
      email: userData.email,
      mobile: userData.mobile,
      phone: userData.phone,
      ...userData,
    }
  })
}

/**
 * 修改用户信息
 */
export function updateInfo(data: any) {
  return http.post('/user/updateInfo', data)
}

/**
 * 修改用户密码
 */
export function updateUserPassword(data: any) {
  return http.post('/user/updatePassword', data)
}

/**
 * 获取微信登录凭证
 * @returns Promise 包含微信登录凭证(code)
 */
export function getWxCode() {
  return new Promise<UniApp.LoginRes>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: res => resolve(res),
      fail: err => reject(new Error(err)),
    })
  })
}

/**
 * 微信登录
 * @param params 微信登录参数，包含code
 * @returns Promise 包含登录结果
 */
export function wxLogin(data: { code: string }) {
  return http.get<any>('/wx/ma/user/default/login', data)
}
