/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
/**
 * 服务器配置接口
 */
export interface IServerConfig {
  name: string
  baseUrl: string
  value: string
}

/**
 * 从环境变量读取服务器列表
 */
function loadServerListFromEnv(): IServerConfig[] {
  const servers: IServerConfig[] = []
  let index = 1

  while (true) {
    const name = import.meta.env[`VITE_SERVER_${index}_NAME`]
    const url = import.meta.env[`VITE_SERVER_${index}_URL`]
    const value = import.meta.env[`VITE_SERVER_${index}_VALUE`]

    if (!name || !url || !value) {
      break
    }

    servers.push({
      name: String(name),
      baseUrl: String(url),
      value: String(value),
    })

    index++
  }

  return servers
}

/**
 * 系统配置
 */
const config = {
  productName: String(import.meta.env.VITE_PRODUCT_NAME || 'JeeSite Mobile'),
  companyName: String(import.meta.env.VITE_COMPANY_NAME || 'ThinkGem'),
  productVersion: `V${String(import.meta.env.VITE_PRODUCT_VERSION || '5.0.0')}`,
  appCode: (() => {
    try {
      const systemInfo = uni.getSystemInfoSync()
      return systemInfo.platform || systemInfo.osName || 'unknown'
    }
    catch {
      return 'unknown'
    }
  })(),
  appVersion: 1,
  adminPath: String(import.meta.env.VITE_ADMIN_PATH || '/a'),
  baseUrlList: loadServerListFromEnv(),
  currentServerIndex: 0,
}

/**
 * 初始化配置（从本地存储读取）
 */
function initConfig() {
  const savedIndex = uni.getStorageSync('jeesite_serverIndex')
  if (savedIndex !== undefined && savedIndex !== null) {
    config.currentServerIndex = Number(savedIndex)
  }
}

/**
 * 获取当前服务器的 baseUrl
 */
function getBaseUrl(): string {
  const index = config.currentServerIndex
  if (index >= 0 && index < config.baseUrlList.length) {
    return config.baseUrlList[index].baseUrl
  }
  return config.baseUrlList[0]?.baseUrl || ''
}

/**
 * 设置当前服务器
 * @param index - 服务器索引
 */
function setCurrentServer(index: number) {
  if (index >= 0 && index < config.baseUrlList.length) {
    config.currentServerIndex = index
    uni.setStorageSync('jeesite_serverIndex', index)
  }
}

/**
 * 添加自定义服务器
 * @param serverConfig - 服务器配置
 */
function addCustomServer(serverConfig: IServerConfig) {
  const exists = config.baseUrlList.some(item => item.baseUrl === serverConfig.baseUrl)
  if (!exists) {
    config.baseUrlList.push(serverConfig)
  }
}

initConfig()

export function useConfig() {
  return {
    ...config,
    getBaseUrl,
    setCurrentServer,
    addCustomServer,
  }
}
