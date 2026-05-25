/**
 * 同步项目规则文件到各个 AI 工具目录
 * 保持单一数据源,避免重复维护
 */

const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

// 同步配置(单一数据源)
const SYNC_CONFIG = [
  {
    source: path.resolve(__dirname, '../.agents/project_rules.md'),
    targets: [
      path.resolve(__dirname, '../.lingma/rules/project_rules.md'),
      path.resolve(__dirname, '../.trae/rules/project_rules.md'),
    ],
  },
  {
    source: path.resolve(__dirname, '../.agents/wot-ui-v2.md'),
    targets: [
      path.resolve(__dirname, '../.lingma/rules/wot-ui-v2.md'),
      path.resolve(__dirname, '../.trae/rules/wot-ui-v2.md'),
    ],
  },
]

/**
 * 确保目录存在
 */
function ensureDir(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`创建目录: ${dir}`)
  }
}

/**
 * 同步文件
 */
function syncFile(source, target) {
  try {
    // 读取源文件
    const content = fs.readFileSync(source, 'utf-8')

    // 确保目标目录存在
    ensureDir(target)

    // 写入目标文件
    fs.writeFileSync(target, content, 'utf-8')

    // console.log(`✓ 已同步: ${path.relative(process.cwd(), target)}`)
    return true
  }
  catch (error) {
    console.error(`✗ 同步失败: ${path.relative(process.cwd(), target)}`)
    console.error(`  错误信息: ${error.message}`)
    return false
  }
}

/**
 * 主函数
 */
function main() {
  // console.log('开始同步项目规则文件...\n')

  let successCount = 0
  let failCount = 0

  // 遍历所有同步配置
  SYNC_CONFIG.forEach(({ source, targets }) => {
    // 检查源文件是否存在
    if (!fs.existsSync(source)) {
      console.warn(`警告: 源文件不存在: ${source}`)
      return
    }

    // 同步到所有目标文件
    targets.forEach((target) => {
      if (syncFile(source, target)) {
        successCount++
      }
      else {
        failCount++
      }
    })
  })

  // console.log(`\n同步完成: 成功 ${successCount} 个, 失败 ${failCount} 个`)

  if (failCount > 0) {
    process.exit(1)
  }
}

main()
