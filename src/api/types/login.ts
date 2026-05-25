/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
// 认证模式类型
export type AuthMode = 'single' | 'double'

// 单Token响应类型
export interface ISingleTokenRes {
  token: string
  expiresIn: number // 有效期(秒)
}

// 双Token响应类型
export interface IDoubleTokenRes {
  accessToken: string
  refreshToken: string
  accessExpiresIn: number // 访问令牌有效期(秒)
  refreshExpiresIn: number // 刷新令牌有效期(秒)
}

/**
 * 登录返回的信息，其实就是 token 信息
 */
export type IAuthLoginRes = ISingleTokenRes | IDoubleTokenRes

/**
 * 角色类型 - 支持角色代码字符串或角色对象
 */
export type UserRole = string | {
  roleCode: string
  roleName?: string
}

/**
 * 用户信息（JeeSite 后端返回的用户数据结构）
 */
export interface UserInfo {
  userCode: string | number
  loginCode: string
  userName: string
  avatarUrl: string
  remarks?: string
  roleList?: any[]
  postList?: any[]
  homePath?: string
  [key: string]: any
}

/**
 * JeeSite 登录完整响应结构
 */
export interface LoginResult {
  result: string
  message: string
  sessionid: string
  isValidCodeLogin: boolean
  user: UserInfo
  demoMode: boolean
  useCorpModel: boolean
  currentCorpCode: string
  currentCorpName: string
  modifyPasswordTip: string
  modifyPasswordMsg: string | null
  msgEnabled: boolean
  sysCode: string
  roleCode: string
  postCode: string
  title: string
  company: string
  version: string
  year: string
  lang: string
  timeZone: string
  postRolePermi: boolean
  switchOffice: boolean
  officeCode: string
  officeName: string
  [key: string]: any
}

/**
 * 用户信息 Store 使用的简化结构
 */
export interface IUserInfoRes {
  userId?: number | string
  username?: string // 对应 loginCode
  userName?: string // 对应 userName（显示名称）
  loginCode?: string // 登录账号
  nickname?: string // 昵称（可选，等同于 userName）
  avatar?: string // 头像（对应 avatarUrl）
  avatarUrl?: string // 头像 URL（原始字段）
  email?: string
  mobile?: string
  phone?: string
  /** 同时支持单角色和多角色，你自行选择一种就行 */
  role?: string
  roles?: string[]
  [key: string]: any // 允许其他扩展字段
}

// 认证存储数据结构
export interface AuthStorage {
  mode: AuthMode
  tokens: ISingleTokenRes | IDoubleTokenRes
  userInfo?: IUserInfoRes
  loginTime: number // 登录时间戳
}

/**
 * 获取验证码
 */
export interface ICaptcha {
  captchaEnabled: boolean
  uuid: string
  image: string
}
/**
 * 上传成功的信息
 */
export interface IUploadSuccessInfo {
  fileId: number
  originalName: string
  fileName: string
  storagePath: string
  fileHash: string
  fileType: string
  fileBusinessType: string
  fileSize: number
}
/**
 * 更新用户信息
 */
export interface IUpdateInfo {
  id: number
  name: string
  sex: string
}
/**
 * 更新用户信息
 */
export interface IUpdatePassword {
  id: number
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

/**
 * 判断是否为单Token响应
 * @param tokenRes 登录响应数据
 * @returns 是否为单Token响应
 */
export function isSingleTokenRes(tokenRes: IAuthLoginRes): tokenRes is ISingleTokenRes {
  return 'token' in tokenRes && !('refreshToken' in tokenRes)
}

/**
 * 判断是否为双Token响应
 * @param tokenRes 登录响应数据
 * @returns 是否为双Token响应
 */
export function isDoubleTokenRes(tokenRes: IAuthLoginRes): tokenRes is IDoubleTokenRes {
  return 'accessToken' in tokenRes && 'refreshToken' in tokenRes
}
