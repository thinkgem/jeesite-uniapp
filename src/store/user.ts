import type { LoginResult, UserInfo } from '@/api/types/login'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  getUserInfo,
} from '@/api/sys/login'

// 初始化状态
const loginState: LoginResult = {
  result: '',
  message: '',
  sessionid: '',
  isValidCodeLogin: false,
  user: {
    userCode: '',
    loginCode: '',
    userName: '',
    avatarUrl: '/static/images/default-avatar.png',
  },
  demoMode: false,
  useCorpModel: false,
  currentCorpCode: '',
  currentCorpName: '',
  modifyPasswordTip: '',
  modifyPasswordMsg: null,
  msgEnabled: false,
  sysCode: '',
  roleCode: '',
  postCode: '',
  title: '',
  company: '',
  version: '',
  year: '',
  lang: '',
  timeZone: '',
  postRolePermi: false,
  switchOffice: false,
  officeCode: '',
  officeName: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义登录信息（包含完整的 JeeSite 登录响应）
    const loginInfo = ref<LoginResult>({ ...loginState })

    // 便捷访问用户信息
    const userInfo = computed(() => loginInfo.value.user)

    // 设置登录信息
    const setLoginInfo = (val: LoginResult) => {
      console.log('设置登录信息', val)
      loginInfo.value = val
    }

    // 设置用户信息（兼容旧接口）
    const setUserInfo = (val: UserInfo | Partial<UserInfo>) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      if (!val.avatarUrl) {
        val.avatarUrl = loginState.user.avatarUrl
      }
      loginInfo.value.user = { ...loginInfo.value.user, ...val } as UserInfo
    }

    const setUserAvatar = (avatar: string) => {
      loginInfo.value.user.avatarUrl = avatar
      console.log('设置用户头像', avatar)
      console.log('userInfo', loginInfo.value.user)
    }

    // 清除登录信息
    const clearUserInfo = () => {
      loginInfo.value = { ...loginState }
      uni.removeStorageSync('user')
    }

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
      const res = await getUserInfo()
      setUserInfo(res)
      return res
    }

    return {
      loginInfo,
      userInfo,
      clearUserInfo,
      fetchUserInfo,
      setLoginInfo,
      setUserInfo,
      setUserAvatar,
    }
  },
  {
    persist: true,
  },
)
