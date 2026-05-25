/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import SparkMD5 from 'spark-md5'

/**
 * 计算文件的 MD5 值(用于文件秒传)
 * 支持 H5、小程序、APP 多平台
 * @param file 文件对象（uni-app 的文件路径或 File 对象）
 * @returns Promise<string> MD5 值
 */
export async function calculateFileMD5(file: any): Promise<string> {
  let md5: string
  let scheme: string

  try {
    // #ifdef H5
    md5 = await calculateMD5ForH5(file)
    scheme = 'H5'
    // #endif

    // #ifdef MP
    md5 = await calculateMD5ForMiniProgram(file)
    scheme = 'MP'
    // #endif

    // #ifdef APP-PLUS
    md5 = await calculateMD5ForApp(file)
    scheme = 'APP'
    // #endif

    // 默认返回一个基于时间和随机数的标识符
    if (!md5) {
      md5 = generateFallbackMD5(file)
      scheme = 'Fallback'
    }

    console.log(`[MD5-${scheme}]`, getFileInfo(file), 'MD5:', md5)
    return md5
  }
  catch (error) {
    console.error('[MD5-Error]', getFileInfo(file), '计算失败:', error)
    md5 = generateFallbackMD5(file)
    console.log('[MD5-Fallback]', getFileInfo(file), 'MD5:', md5)
    return md5
  }
}

/**
 * 获取文件信息用于日志输出
 */
export function getFileInfo(file: any): string {
  // 尝试从多种可能的属性中获取文件名
  let fileName = file?.name
    || file?.fileName
    || file?.raw?.name
    || file?.files?.[0]?.name
    || file?.fileList?.[0]?.name

  // 如果还是没有文件名，从路径中提取
  if (!fileName) {
    const filePath = file?.path
      || file?.tempFilePath
      || file?.url
      || file?.filePath
      || file?.raw?.path
      || file?.raw?.url
      || file?.files?.[0]?.path
      || file?.files?.[0]?.tempFilePath
      || file?.fileList?.[0]?.path
      || file?.fileList?.[0]?.tempFilePath

    if (filePath && filePath !== '未知') {
      // 从路径中提取文件名（处理各种路径格式）
      const match = filePath.match(/[^/\\]+$/)
      fileName = match ? match[0] : '未知'
    }
  }

  fileName = fileName || '未知'

  // 尝试从多种可能的属性中获取文件路径
  const filePath = file?.path
    || file?.tempFilePath
    || file?.url
    || file?.filePath
    || file?.raw?.path
    || file?.raw?.url
    || file?.files?.[0]?.path
    || file?.files?.[0]?.tempFilePath
    || file?.fileList?.[0]?.path
    || file?.fileList?.[0]?.tempFilePath
    || '未知'

  return `文件: ${fileName}, 路径: ${filePath}`
}

/**
 * H5 环境：计算文件 MD5
 */
async function calculateMD5ForH5(file: any): Promise<string> {
  return null // 专业版提供支持
}

/**
 * 读取文件为 ArrayBuffer 并计算 MD5
 */
function readFileAsArrayBuffer(file: File | Blob): Promise<string> {
  return null // 专业版提供支持
}

/**
 * 小程序环境：计算文件 MD5
 */
async function calculateMD5ForMiniProgram(file: any): Promise<string> {
  return null // 专业版提供支持
}

/**
 * APP 环境：计算文件 MD5
 * 使用多级降级策略读取文件，兼容 Android 10+ 的 Scoped Storage 限制
 */
async function calculateMD5ForApp(file: any): Promise<string> {
  return null // 专业版提供支持
}

/**
 * 生成合法的伪 MD5（32 位 hex 字符串），用于文件内容无法读取时的降级上传
 * 使用文件名 + 路径 + 时间戳作为输入，确保格式合法且不与已有文件冲突
 */
function generateFallbackMD5(file: any): string {
  const info = getFileInfo(file)
  const input = `${info}_${Date.now()}_${Math.random().toString(36)}`
  return SparkMD5.hash(input)
}
