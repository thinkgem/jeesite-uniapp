/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { useConfig } from '@/hooks/useConfig'
import { http } from '@/http/http'

/**
 * 用户中心 API
 */

/**
 * 保存用户基本信息
 */
export function userInfoSaveBase(params: any = {}) {
  const config = useConfig()
  return http.post(`${config.adminPath}/sys/user/infoSaveBase`, params)
}

/**
 * 修改密码
 */
export function userInfoSavePwd(params: any = {}) {
  const config = useConfig()
  return http.post(`${config.adminPath}/sys/user/infoSavePwd`, params)
}

/**
 * 获取当前用户信息
 */
export function userIndex() {
  const config = useConfig()
  return http.get(`${config.adminPath}/index`)
}

/**
 * 退出登录
 */
export function logout() {
  const config = useConfig()
  return http.get(`${config.adminPath}/logout`)
}

/**
 * 保存意见反馈
 */
export function commentSave(params: any = {}) {
  return http.post('/app/comment/save', params)
}
