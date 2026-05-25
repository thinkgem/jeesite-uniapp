/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { useConfig } from '@/hooks/useConfig'
import { http } from '@/http/http'

/**
 * 获取验证码
 * @param params - 查询参数
 */
export function getValidCode(params?: Record<string, any>) {
  return http.get('/validCode', params)
}

/**
 * 获取忘记密码验证码
 * @param params - 表单数据
 */
export function getFpValidCode(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`${config.adminPath}/account/getFpValidCode`, params)
}

/**
 * 通过验证码保存密码
 * @param params - 表单数据
 */
export function savePwdByValidCode(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`${config.adminPath}/account/savePwdByValidCode`, params)
}

/**
 * 获取注册验证码
 * @param params - 表单数据
 */
export function getRegValidCode(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`${config.adminPath}/account/getRegValidCode`, params)
}

/**
 * 通过验证码保存注册信息
 * @param params - 表单数据
 */
export function saveRegByValidCode(params: Record<string, any>) {
  const config = useConfig()
  return http.post(`${config.adminPath}/account/saveRegByValidCode`, params)
}
