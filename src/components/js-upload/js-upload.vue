<!--
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useConfig } from '@/hooks/useConfig'
import { http } from '@/http/http'
import { calculateFileMD5 } from '@/utils/md5'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  bizKey: '',
  bizType: 'images',
  uploadType: 'image',
  imageMaxWidth: 1024,
  imageMaxHeight: 768,
  maxCount: 20,
  loadTime: 0,
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
}>()

interface Props {
  modelValue?: Record<string, any>
  bizKey?: string
  bizType?: string
  uploadType?: 'image' | 'media' | 'file' | 'all' | 'video'
  imageMaxWidth?: number
  imageMaxHeight?: number
  maxCount?: number
  loadTime?: number
}

const config = useConfig()

// 上传文件数据
const dataMap = ref<object>({})

// 上传文件列表
const fileList = ref<any[]>([])

// 文件删除列表
const fileListDel = ref<any[]>([])

// 是否可删除（maxCount <= 0 时为只读模式）
const deletable = computed(() => props.maxCount > 0)

/**
 * 选择文件
 */
function chooseFile() {
  const remainingCount = props.maxCount - fileList.value.length
  if (remainingCount <= 0) {
    uni.showToast({
      title: '已达到最大上传数量',
      icon: 'none',
    })
    return
  }

  // 根据 uploadType 选择不同的文件选择API
  if (props.uploadType === 'image') {
    // 选择图片
    uni.chooseImage({
      count: remainingCount,
      sourceType: ['album', 'camera'],
      success: (res) => {
        handleSelectedFiles(res.tempFiles as any[])
      },
      fail: (err) => {
        console.error('选择图片失败', err)
        // uni.showToast({
        //   title: '选择图片失败',
        //   icon: 'none',
        // })
      },
    })
  }
  else if (props.uploadType === 'video') {
    // 选择视频
    uni.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      success: (res) => {
        const tempFiles = [{
          path: res.tempFilePath,
          name: res.tempFilePath?.split('/').pop() || 'video.mp4',
          size: res.size || 0,
        }]
        handleSelectedFiles(tempFiles)
      },
      fail: (err) => {
        console.error('选择视频失败', err)
        // uni.showToast({
        //   title: '选择视频失败',
        //   icon: 'none',
        // })
      },
    })
  }
  else {
    // uploadType 为 'all' 或 'file'
    // #ifdef H5
    uni.chooseFile({
      count: remainingCount,
      type: 'all',
      success: (res) => {
        handleSelectedFiles((res.tempFiles || []) as any[])
      },
      fail: (err) => {
        console.error('选择文件失败', err)
        // 降级到图片选择
        fallbackToImageChoose(remainingCount)
      },
    })
    // #endif

    // #ifdef MP-WEIXIN
    uni.chooseMessageFile({
      count: remainingCount,
      type: 'all',
      success: (res) => {
        handleSelectedFiles(res.tempFiles as any[])
      },
      fail: (err) => {
        console.error('选择文件失败', err)
        fallbackToImageChoose(remainingCount)
      },
    })
    // #endif

    // #ifdef APP-PLUS
    // APP 平台使用 plus.io.chooseFile 从文件管理器选择任意文件
    chooseFileFromManager(remainingCount)
    // #endif
  }
}

/**
 * 从文件管理器选择文件（APP平台专用）
 */
async function chooseFileFromManager(count: number) {
  // #ifdef APP-PLUS
  try {
    ;(plus.io as any).chooseFile(
      {
        title: '选择文件',
        filter: '*', // 所有文件类型
        multiple: count > 1,
      },
      async (result: any) => {
        // 如果 result.files 不存在但 result 是字符串（单个文件路径），直接处理
        if (!result.files && typeof result === 'string') {
          handleSelectedFiles([{
            tempFilePath: result,
            name: result.split('/').pop() || 'unknown',
            size: 0,
          }] as any[])
          return
        }

        const files = result.files || [result]
        const tempFiles: any[] = []

        for (let i = 0; i < files.length; i++) {
          const file = files[i]

          // 判断 file 是字符串还是对象
          let filePath: string
          let fileName: string
          let fileSize: number = 0

          if (typeof file === 'string') {
            // file 是字符串路径
            filePath = file
            fileName = filePath.split('/').pop() || 'unknown'
          }
          else {
            // file 是对象格式
            filePath = file.path
            fileName = file.name || file.path?.split('/').pop() || 'unknown'
            fileSize = file.size || 0
          }

          // 处理 content:// URI（Android 平台文件管理器返回的格式）
          if (filePath && filePath.startsWith('content://')) {
            try {
              const converted = await convertContentUriToFilePath(filePath, fileName)
              filePath = converted.path
              fileName = converted.name
              fileSize = converted.size
            }
            catch (e: any) {
              console.error(`[js-upload] 文件${i}: 转换 content URI 失败:`, e?.message || e)
              uni.showToast({
                title: '文件处理失败',
                icon: 'none',
              })
              continue
            }
          }

          tempFiles.push({
            tempFilePath: filePath,
            name: fileName,
            size: fileSize,
          })
        }

        handleSelectedFiles(tempFiles as any[])
      },
      (error: any) => {
        console.error('[js-upload] plus.io.chooseFile 选择失败:', error)
        uni.showToast({
          title: '无法打开文件管理器',
          icon: 'none',
        })
        // 降级到图片选择
        fallbackToImageChoose(count)
      },
    )
  }
  catch (e: any) {
    console.error('[js-upload] plus.io.chooseFile 调用失败:', e?.message || e)
    fallbackToImageChoose(count)
  }
  // #endif
}

/**
 * 将 content:// URI 转换为真实本地文件路径（Android APP平台专用）
 * @param contentUri content:// 格式的URI
 * @param fileName 文件名（用于生成目标文件）
 * @returns Promise<{path: string, name: string, size: number}>
 */
function convertContentUriToFilePath(contentUri: string, fileName: string): Promise<{ path: string, name: string, size: number }> {
  return new Promise((resolve, reject) => {
    // #ifdef APP-PLUS
    try {
      // 获取 Android 系统的 ContentResolver
      const main = plus.android.runtimeMainActivity()
      const contentResolver = plus.android.invoke(main, 'getContentResolver')

      // 查询文件信息
      const cursor = plus.android.invoke(contentResolver, 'query', [contentUri, null, null, null, null])

      // 获取文件名
      let displayName = fileName
      let fileSize = 0

      if (cursor && plus.android.invoke(cursor, 'moveToFirst')) {
        const nameIndex = plus.android.invoke(cursor, 'getColumnIndex', '_display_name')
        const sizeIndex = plus.android.invoke(cursor, 'getColumnIndex', '_size')

        if (nameIndex >= 0) {
          displayName = plus.android.invoke(cursor, 'getString', nameIndex) || fileName
        }
        if (sizeIndex >= 0) {
          fileSize = plus.android.invoke(cursor, 'getLong', sizeIndex) || 0
        }

        plus.android.invoke(cursor, 'close')
      }

      // 生成目标文件路径（应用私有目录）
      const targetDir = plus.io.PRIVATE_DOC
      const targetFileName = `${Date.now()}_${displayName}`
      const targetPath = `${targetDir}/${targetFileName}`

      // 使用 Java 复制文件
      const inputStream = plus.android.invoke(contentResolver, 'openInputStream', [contentUri])
      if (!inputStream) {
        console.error('[js-upload] convertContentUriToFilePath: 无法打开输入流')
        reject(new Error('无法打开输入流'))
        return
      }

      // 创建文件并写入
      const File = plus.android.importClass('java.io.File')
      const fileObj = plus.android.invoke(File, 'new', [targetPath])
      // createNewFile() 返回 boolean，不需要保存
      plus.android.invoke(fileObj, 'createNewFile')
      // 从同一个文件对象获取输出流
      const fosWriter = plus.android.invoke(fileObj, 'getOutputStream')

      const buffer = plus.android.newObject('byte[]', 8192)
      let len
      let totalRead = 0

      while (true) {
        len = plus.android.invoke(inputStream, 'read', [buffer])
        if (len === -1) {
          break
        }
        plus.android.invoke(fosWriter, 'write', [buffer, 0, len])
        totalRead += len
      }

      plus.android.invoke(inputStream, 'close')
      plus.android.invoke(fosWriter, 'close')

      // 转换为可访问的本地路径
      const localPath = plus.io.convertLocalFileSystemURL(targetPath)

      resolve({
        path: localPath,
        name: displayName,
        size: fileSize,
      })
    }
    catch (e: any) {
      console.error('[js-upload] convertContentUriToFilePath 异常:', e?.message || e)
      reject(e)
    }
    // #endif
  })
}

/**
 * 降级到图片选择（APP平台专用）
 */
function fallbackToImageChoose(count: number) {
  uni.chooseImage({
    count,
    sourceType: ['album', 'camera'],
    success: (res) => {
      handleSelectedFiles(res.tempFiles as any[])
    },
    fail: (err) => {
      console.error('选择图片失败', err)
      // uni.showToast({
      //   title: '无法选择文件，请检查权限设置',
      //   icon: 'none',
      // })
    },
  })
}

/**
 * 处理已选择的文件
 */
async function handleSelectedFiles(tempFiles: any[]) {
  for (let i = 0; i < tempFiles.length; i++) {
    const tempFile = tempFiles[i]

    const file = {
      uid: `${Date.now()}_${Math.random()}`,
      url: tempFile.path || tempFile.tempFilePath,
      name: tempFile.name || tempFile.filename || extractFileName(tempFile.path || tempFile.tempFilePath),
      fileName: tempFile.name || tempFile.filename || extractFileName(tempFile.path || tempFile.tempFilePath),
      size: tempFile.size || 0,
      status: 'pending' as const,
      percent: 0,
    }

    fileList.value.push(file)

    // 执行上传
    await uploadFile(file)
  }
}

/**
 * 上传单个文件
 */
async function uploadFile(file: any) {
  const fileIndex = fileList.value.findIndex(f => f.uid === file.uid)

  if (fileIndex === -1) {
    return
  }

  fileList.value[fileIndex].status = 'loading'

  try {
    const result = await handleCustomUpload(file, {}, {
      onSuccess: (response: any, f: any) => {
        const idx = fileList.value.findIndex(item => item.uid === f.uid)
        if (idx > -1) {
          fileList.value[idx].status = 'success'
          fileList.value[idx].fileUploadId = JSON.parse(response.data)?.fileUpload?.id
          const fileUpload = JSON.parse(response.data)?.fileUpload
          if (fileUpload?.fileUrl) {
            fileList.value[idx].url = config.getBaseUrl() + fileUpload.fileUrl
          }
          updateDataMap()
        }
      },
      onError: (error: any) => {
        console.error('[js-upload] uploadFile: onError 回调触发, error:', error)
        const idx = fileList.value.findIndex(item => item.uid === file.uid)
        if (idx > -1) {
          fileList.value[idx].status = 'fail'
        }
        console.error('上传失败', error)
      },
      onProgress: (progress: any, f: any) => {
        const idx = fileList.value.findIndex(item => item.uid === f.uid)
        if (idx > -1) {
          fileList.value[idx].percent = progress.progress
        }
      },
    })

    return result
  }
  catch (e: any) {
    console.error('[js-upload] uploadFile: 捕获异常:', e?.message || e)
    const idx = fileList.value.findIndex(item => item.uid === file.uid)
    if (idx > -1) {
      fileList.value[idx].status = 'fail'
    }
  }
}

/**
 * 删除文件
 */
function deleteFile(index: number) {
  const file = fileList.value[index]
  if (file && file.fileUploadId) {
    fileListDel.value.push(file.fileUploadId)
  }
  fileList.value.splice(index, 1)
  updateDataMap()
}

/**
 * 更新数据映射
 */
function updateDataMap() {
  dataMap.value[props.bizType] = fileList.value
    .filter((f: any) => f.fileUploadId)
    .map((f: any) => f.fileUploadId)
    .join(',')
  dataMap.value[`${props.bizType}__len`] = fileList.value.length
  emit('update:modelValue', dataMap.value)
}

/**
 * 从 URL 中提取文件名
 */
function extractFileName(url: string): string {
  if (!url)
    return 'file'
  const match = url.match(/[^/\\?#]+$/)
  const nameWithQuery = match ? match[0] : 'file'
  const name = nameWithQuery.split('?')[0].split('#')[0]
  return name || 'file'
}

/**
 * 判断是否是图片文件
 */
function isImage(fileName: string): boolean {
  if (!fileName)
    return false
  const ext = fileName.toLowerCase().split('.').pop()
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
  return imageExts.includes(ext || '')
}

/**
 * 点击文件预览区域时的处理
 * 图片直接预览，非图片文件下载
 */
function previewFile(file: any, index: number) {
  const fileUrl = file.url || file.fileName

  if (!fileUrl) {
    uni.showToast({
      title: '文件地址无效',
      icon: 'none',
    })
    return
  }

  // 判断是否是图片
  if (isImage(file.name || file.url)) {
    // 获取所有已上传的图片URL，用于预览
    const imageUrls = fileList.value
      .filter((f: any) => isImage(f.name || f.url))
      .map((f: any) => f.url || f.fileName)

    // 找到当前图片在列表中的索引
    const currentIndex = imageUrls.includes(fileUrl)
      ? imageUrls.indexOf(fileUrl)
      : index

    // 图片预览
    uni.previewImage({
      current: fileUrl,
      urls: imageUrls,
      fail: (err) => {
        console.error('图片预览失败', err)
        uni.showToast({
          title: '预览失败',
          icon: 'none',
        })
      },
    })
  }
  else {
    // 非图片文件下载
    uni.showLoading({ title: '正在下载...' })

    // 构建完整的文件 URL
    let fullUrl = fileUrl
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = config.getBaseUrl() + fullUrl
    }

    // 获取文件名
    const fileName = fileUrl.split('/').pop() || 'unknown'

    // #ifdef H5
    // H5 平台使用 window.open 下载
    try {
      if (typeof window !== 'undefined' && window && typeof window.open === 'function') {
        uni.hideLoading()
        window.open(fullUrl)
      }
      else {
        uni.hideLoading()
        uni.showToast({ title: '下载功能不可用', icon: 'none' })
      }
    }
    catch (e) {
      uni.hideLoading()
      uni.showToast({ title: '下载失败', icon: 'none' })
    }
    // #endif

    // #ifdef APP-PLUS
    // APP 平台使用 plus.downloader.createDownload 下载
    try {
      // 创建下载任务
      const dtask = plus.downloader.createDownload(
        fullUrl,
        {
          filename: `_downloads/${fileName}`, // 保存到下载目录
        },
        (d: any, status: number) => {
          uni.hideLoading()
          if (status === 200) {
            // 下载成功
            uni.showToast({
              title: '文件已保存到: 手机/JeeSite',
              icon: 'success',
              duration: 3000,
            })
            // 打开文件让用户确认
            plus.runtime.openFile(d.filename)
          }
          else {
            console.error('下载失败, status:', status)
            uni.showToast({
              title: `下载失败: ${status}`,
              icon: 'none',
            })
          }
        },
      )

      dtask.start()
    }
    catch (e: any) {
      console.error('下载异常:', e)
      uni.hideLoading()
      uni.showToast({ title: `下载异常: ${e.message}`, icon: 'none' })
    }
    // #endif

    // #ifdef MP-WEIXIN
    // 微信小程序使用 uni.downloadFile
    uni.downloadFile({
      url: fullUrl,
      success: (res: any) => {
        uni.hideLoading()
        if (res.statusCode === 200 && res.tempFilePath) {
          // 先获取文件系统管理器，了解文件保存位置
          const fs = uni.getFileSystemManager()

          uni.saveFile({
            tempFilePath: res.tempFilePath,
            success: (saveRes: any) => {
              console.log('[js-upload] 文件保存成功:', saveRes.savedFilePath)

              // 尝试打开文件（让用户可以直接使用）
              uni.openDocument({
                filePath: saveRes.savedFilePath,
                showMenu: true,
                success: () => {
                  console.log('[js-upload] 打开文档成功')
                },
                fail: (openErr: any) => {
                  console.log('[js-upload] 打开文档失败:', openErr)
                  // 打开失败不影响保存成功的提示
                },
              })

              uni.showToast({
                title: '文件已打开，可另存到手机',
                icon: 'success',
                duration: 2000,
              })

              // 提示用户文件保存位置和操作方式
              setTimeout(() => {
                uni.showModal({
                  title: '保存成功',
                  content: `文件已保存到微信缓存\n\n路径：${saveRes.savedFilePath}\n\n✅ 点击右上角「···」可发送到聊天或保存到手机`,
                  showCancel: false,
                })
              }, 500)
            },
            fail: (saveErr: any) => {
              console.error('[js-upload] 保存文件失败:', saveErr)

              // 保存失败时，尝试直接打开临时文件
              uni.openDocument({
                filePath: res.tempFilePath,
                showMenu: true,
                success: () => {
                  console.log('[js-upload] 直接打开临时文件成功')
                  uni.showToast({
                    title: '文件已打开，可保存到手机',
                    icon: 'success',
                    duration: 2000,
                  })
                },
                fail: (openErr: any) => {
                  console.error('[js-upload] 打开文件失败:', openErr)
                  uni.showToast({
                    title: `保存失败：${saveErr.errMsg || '未知错误'}`,
                    icon: 'none',
                    duration: 3000,
                  })
                },
              })
            },
          })
        }
        else {
          console.error('[js-upload] 下载失败，statusCode:', res.statusCode)
          uni.showToast({
            title: `下载失败：${res.statusCode}`,
            icon: 'none',
            duration: 3000,
          })
        }
      },
      fail: (err: any) => {
        console.error('[js-upload] downloadFile 失败:', err)
        uni.hideLoading()
        uni.showToast({
          title: `下载失败：${err.errMsg || '网络错误'}`,
          icon: 'none',
          duration: 3000,
        })
      },
    })
    // #endif
  }
}

/**
 * 加载已上传的文件
 */
async function loadFileList() {
  fileList.value = []
  fileListDel.value = []

  const bizKey = props.bizKey || props.modelValue?.id
  if (!bizKey) {
    return
  }

  try {
    const res: any = await http.post(`${config.getBaseUrl()}${config.adminPath}/file/fileList`, {}, {
      bizKey,
      bizType: props.bizType,
    })

    // 处理返回的文件列表
    if (res && Array.isArray(res)) {
      fileList.value = res.map((f: any) => ({
        url: config.getBaseUrl() + f.fileUrl,
        name: f.fileName || extractFileName(f.fileUrl),
        fileName: f.fileName || extractFileName(f.fileUrl),
        fileUploadId: f.id,
        status: 'success',
      }))

      dataMap.value[`${props.bizType}__len`] = fileList.value.length
      emit('update:modelValue', dataMap.value)
    }
  }
  catch (e) {
    console.error('加载文件列表失败', e)
  }
}

/**
 * 自定义上传方法（包含秒传逻辑）
 */
async function handleCustomUpload(file, formData, options): Promise<any> {
  try {
    // 计算文件MD5
    const md5 = await calculateFileMD5(file)

    const bizKey = props.bizKey || props.modelValue?.id

    // 获取文件名（兼容不同平台）
    let fileName = file.name
      || file.fileName
      || file.raw?.name
      || file.files?.[0]?.name
      || file.fileList?.[0]?.name

    // 如果还是没有文件名，从路径中提取
    if (!fileName) {
      const filePath = file.path
        || file.tempFilePath
        || file.url
        || file.filePath
        || file.raw?.path
        || file.raw?.url
        || file.files?.[0]?.path
        || file.files?.[0]?.tempFilePath
        || file.fileList?.[0]?.path
        || file.fileList?.[0]?.tempFilePath

      if (filePath) {
        // 从路径中提取文件名
        const match = filePath.match(/[^/\\]+$/)
        fileName = match ? match[0] : `file_${Date.now()}`
      }
      else {
        fileName = `file_${Date.now()}`
      }
    }

    // 保存文件名到文件对象
    file.name = fileName
    file.fileName = fileName

    // 上传地址
    const uploadUrl = `${config.getBaseUrl()}${config.adminPath}/file/upload`

    // 构建上传参数
    const uploadParams = {
      bizKey,
      bizType: props.bizType,
      fileMd5: md5,
      fileName,
      fileEntityId: '',
      fileUploadId: '',
      uploadType: props.uploadType,
      imageMaxWidth: props.imageMaxWidth,
      imageMaxHeight: props.imageMaxHeight,
    }

    // 检查文件是否已存在（秒传）
    const checkRes: any = await http.post(uploadUrl, {}, uploadParams)

    // 文件未上传过，执行实际上传
    if (checkRes.fileUploadId && checkRes.fileEntityId) {
      uploadParams.fileUploadId = checkRes.fileUploadId
      uploadParams.fileEntityId = checkRes.fileEntityId

      // 执行上传
      return new Promise((resolve, reject) => {
        const task = uni.uploadFile({
          url: uploadUrl,
          name: 'file',
          filePath: file.url,
          formData: uploadParams,
          // 不传 header 参数，让 uni.uploadFile 自动处理
          success: (response) => {
            file.fileUploadId = checkRes.fileUploadId
            options.onSuccess(response, file, uploadParams)
            resolve(response)
          },
          fail: (error) => {
            console.error('[js-upload] handleCustomUpload: uni.uploadFile fail, error:', error)
            options.onError(error, file, uploadParams)
            reject(error)
          },
        })

        task.onProgressUpdate((response) => {
          options.onProgress(response, file)
        })
      })
    }

    // 未知错误
    console.error('[js-upload] handleCustomUpload: 未知错误, checkRes:', checkRes)
    uni.showToast({
      title: checkRes.message || '上传失败',
      icon: 'none',
    })
    throw new Error(checkRes.message || '上传失败')
  }
  catch (e: any) {
    console.error('[js-upload] handleCustomUpload: 捕获异常:', e?.message || e)
    throw e
  }
}

/**
 * 上传成功
 */
function onSuccess(event: any) {
  const { fileList } = event
  dataMap.value[props.bizType] = fileList.map((f: any) => f.fileUploadId).join(',')
  dataMap.value[`${props.bizType}__len`] = fileList.length
  emit('update:modelValue', dataMap.value)
}

/**
 * 删除文件
 */
function onRemove(event: any) {
  const { file } = event
  if (file.fileUploadId) {
    fileListDel.value.push(file)
  }
  // 延迟获取，确保 fileList 更新后获取
  setTimeout(() => {
    dataMap.value[props.bizType] = fileList.value.map((f: any) => f.fileUploadId).join(',')
    dataMap.value[`${props.bizType}__del`] = fileListDel.value.map((f: any) => f.fileUploadId).join(',')
    dataMap.value[`${props.bizType}__len`] = fileList.value.length
    emit('update:modelValue', dataMap.value)
  }, 10)
}

// 监听 bizKey 变化，重新加载数据
watch(
  () => [props.bizKey, props.loadTime],
  () => {
    loadFileList()
  },
  { immediate: true },
)

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    dataMap.value = newVal
    emit('update:modelValue', dataMap.value)
  },
  { immediate: true },
)
</script>

<template>
  <view class="js-upload">
    <view class="upload-list">
      <view
        v-for="(file, index) in fileList"
        :key="file.uid || index"
        class="upload-item"
      >
        <view class="file-preview" @click="previewFile(file, index)">
          <image
            v-if="isImage(file.name || file.url) && (file.url || file.fileName)"
            :src="file.url || file.fileName"
            class="preview-image"
            mode="aspectFill"
          />
          <wd-icon v-else-if="isImage(file.name || file.url)" name="image" size="24" />
          <wd-icon v-else name="file" size="24" />
          <view class="file-name">
            {{ file.name || file.fileName || extractFileName(file.url) }}
          </view>
          <view v-if="file.status === 'loading'" class="upload-progress">
            {{ file.percent || 0 }}%
          </view>
        </view>
        <view v-if="deletable" class="delete-btn" @click="deleteFile(index)">
          <wd-icon name="delete" size="16" />
        </view>
      </view>

      <view v-if="fileList.length < maxCount || maxCount <= 0" class="upload-trigger" @click="chooseFile">
        <wd-icon name="plus-circle" size="25" />
        <view class="upload-text">
          {{ fileList.length }} / {{ maxCount > 0 ? maxCount : '∞' }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.js-upload {
  width: 100%;
}

.upload-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.upload-item {
  position: relative;
  width: 80px;
  height: 80px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #f9fafb;

  .file-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    width: 100%;
    height: 100%;

    .preview-image {
      width: 90%;
      height: 50px;
      object-fit: cover;
      border-radius: 6px;
    }

    .file-name {
      font-size: 12px;
      color: #333;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 90%;
    }
  }

  .upload-progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
  }

  .delete-btn {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    opacity: 0.6;
  }
}

.upload-trigger {
  width: 80px;
  height: 80px;
  border: 2px dashed #dadde2;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  background: #f9fafb;
  transition: all 0.3s ease;

  .upload-text {
    font-size: 12px;
    color: #666;
  }

  &:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
