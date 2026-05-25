/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { useConfig } from '@/hooks/useConfig'
import { http } from '@/http/http'

/**
 * 测试数据 API
 */

/**
 * 获取测试数据表单
 * @param params - 查询参数
 */
export function testDataForm(params?: Record<string, any>) {
  const config = useConfig()
  return http.post<any>(`${config.adminPath}/test/testData/form`, params)
}

/**
 * 获取测试数据列表
 * @param params - 查询参数
 */
export function testDataListData(params?: Record<string, any>) {
  const config = useConfig()
  return http.post<any>(`${config.adminPath}/test/testData/listData`, params)
}

/**
 * 保存测试数据（JSON格式）
 * @param params - 表单数据
 */
export function testDataSave(params: Record<string, any>, data: Record<string, any>) {
  const config = useConfig()
  return http.postJson<any>(`${config.adminPath}/test/testData/save`, params, data)
}

/**
 * 禁用测试数据
 * @param params - 表单数据
 */
export function testDataDisable(params: Record<string, any>) {
  const config = useConfig()
  return http.post<any>(`${config.adminPath}/test/testData/disable`, params)
}

/**
 * 启用测试数据
 * @param params - 表单数据
 */
export function testDataEnable(params: Record<string, any>) {
  const config = useConfig()
  return http.post<any>(`${config.adminPath}/test/testData/enable`, params)
}

/**
 * 删除测试数据
 * @param params - 表单数据
 */
export function testDataDelete(params: Record<string, any>) {
  const config = useConfig()
  return http.post<any>(`${config.adminPath}/test/testData/delete`, params)
}
