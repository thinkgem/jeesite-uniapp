/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { useConfig } from '@/hooks/useConfig'
import { http } from '@/http/http'

/**
 * APP版本检查
 */
export function upgradeCheck() {
  const config = useConfig()
  return http.post('/app/upgrade/check', {
    appCode: config.appCode,
    appVersion: config.appVersion,
  })
}

/**
 * 保存评论
 * @param params - 表单数据
 */
export function commentSave(params: Record<string, any>) {
  return http.post('/app/comment/save', params)
}
