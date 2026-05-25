/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { useConfig } from '@/hooks/useConfig'
import { http } from '@/http/http'

/**
 * 获取行政区划树数据
 * @param params - 查询参数
 */
export function areaTreeData(params?: Record<string, any>) {
  const config = useConfig()
  return http.get(`${config.adminPath}/sys/area/treeData`, params)
}
