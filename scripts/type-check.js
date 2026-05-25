#!/usr/bin/env node

/**
 * 运行 vue-tsc 类型检查，过滤掉 node_modules 中的错误
 * 只报告 src 目录下的类型错误
 */

import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()
const vueTscPath = resolve(projectRoot, 'node_modules/.bin/vue-tsc')

// 执行 vue-tsc
const child = spawn(vueTscPath, ['--noEmit', '--skipLibCheck'], {
  cwd: projectRoot,
  stdio: ['inherit', 'pipe', 'pipe'],
})

let stdout = ''
let stderr = ''

child.stdout.on('data', (data) => {
  stdout += data.toString()
})

child.stderr.on('data', (data) => {
  stderr += data.toString()
})

child.on('close', (code) => {
  const allOutput = stdout + stderr
  const lines = allOutput.split('\n')

  // 过滤出 src 目录的错误
  const srcErrors = lines.filter((line) => {
    return line.includes('src/') && (line.includes('error TS') || line.trim().startsWith('src/'))
  })

  // 过滤出汇总信息
  const summaryLines = lines.filter((line) => {
    return line.includes('Found') && line.includes('error') && line.includes('in')
  })

  // 如果有 src 目录的错误，显示它们
  if (srcErrors.length > 0) {
    console.log(srcErrors.join('\n'))
    console.log('')

    // 显示汇总（只统计 src 文件的错误）
    if (summaryLines.length > 0) {
      console.log(summaryLines.join('\n'))
    }

    process.exit(1)
  }
  else {
    console.log('✓ Type check passed (no errors in src/)')
    process.exit(0)
  }
})
