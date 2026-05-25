/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */

/**
 * H5 平台增强功能
 * 包含鼠标事件转触摸事件和滚动条样式优化
 * @author ThinkGem 2023-07-07
 */

let isDragging = false
let dragTarget: HTMLElement | null = null
let hasMoved = false // 标记是否发生了移动
let startX = 0
let startY = 0

export function initH5Enhance() {
  // 仅在 H5 平台执行
  // #ifdef H5

  // 添加 PC 端细滚动条样式
  thinScrollbarStyle()

  // 初始化鼠标事件监听
  initMouseEvents()

  // #endif
}

/**
 * 添加 PC 端细滚动条样式
 */
function thinScrollbarStyle() {
  const styleId = 'thin-scrollbar-style'
  // 避免重复添加
  if (document.getElementById(styleId)) {
    return
  }

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgb(144 147 153 / 20%);
        border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgb(144 147 153 / 50%);
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
  `
  document.head.appendChild(style)
}

/**
 * 初始化鼠标事件监听
 */
function initMouseEvents() {
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mouseleave', handleMouseLeave)
}

/**
 * 处理鼠标按下事件
 */
function handleMouseDown(e: MouseEvent) {
  // 只处理主鼠标按钮
  if (e.button !== 0)
    return

  isDragging = true
  hasMoved = false
  startX = e.clientX
  startY = e.clientY
  dragTarget = e.target as HTMLElement

  const touchEvent = createTouchEvent('touchstart', e.clientX, e.clientY, dragTarget)
  dragTarget.dispatchEvent(touchEvent)
}

/**
 * 处理鼠标移动事件
 */
function handleMouseMove(e: MouseEvent) {
  if (!isDragging || !dragTarget)
    return

  // 检测是否发生了明显的移动（超过 5 像素）
  const moveX = Math.abs(e.clientX - startX)
  const moveY = Math.abs(e.clientY - startY)
  if (moveX > 5 || moveY > 5) {
    hasMoved = true
  }

  const touchEvent = createTouchEvent('touchmove', e.clientX, e.clientY, dragTarget)
  dragTarget.dispatchEvent(touchEvent)

  // 阻止默认行为以防止文本选择
  e.preventDefault()
}

/**
 * 处理鼠标松开事件
 */
function handleMouseUp(e: MouseEvent) {
  if (!isDragging || !dragTarget)
    return

  isDragging = false

  const touchEvent = createTouchEvent('touchend', e.clientX, e.clientY, dragTarget)
  dragTarget.dispatchEvent(touchEvent)

  // 如果发生了拖动，阻止后续的点击事件
  if (hasMoved) {
    const preventClick = (clickEvent: MouseEvent) => {
      clickEvent.stopPropagation()
      clickEvent.preventDefault()
      document.removeEventListener('click', preventClick, true)
    }
    // 使用捕获阶段立即拦截点击事件
    document.addEventListener('click', preventClick, true)
  }

  dragTarget = null
}

/**
 * 处理鼠标离开事件
 */
function handleMouseLeave(e: MouseEvent) {
  if (!isDragging || !dragTarget)
    return

  isDragging = false

  const touchEvent = createTouchEvent('touchend', e.clientX, e.clientY, dragTarget)
  dragTarget.dispatchEvent(touchEvent)

  dragTarget = null
}

function createTouchEvent(type: string, x: number, y: number, target: HTMLElement): Event {
  const touch = {
    clientX: x,
    clientY: y,
    pageX: x,
    pageY: y,
    screenX: x,
    screenY: y,
    identifier: 0,
    target,
    force: 1,
  }

  const event = new CustomEvent(type, { bubbles: true, cancelable: true }) as any
  event.touches = [touch]
  event.changedTouches = [touch]

  return event
}
