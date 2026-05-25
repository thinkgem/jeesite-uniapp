---
url: 'https://v2.wot-ui.cn/component/action-sheet.md'
---
# ActionSheet 动作面板

从底部弹出的动作菜单面板。

## 组件类型

### 基本用法

通过 `v-model` 设置显示隐藏。

`actions` 类型为 `Array`，数组内部对象结构如下：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| name | 选项名称 | string |
| description | 描述信息 | string |
| color | 颜色 | string |

```html
<wd-toast />
<wd-button @click="showActions">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" />
```

```typescript
const show = ref<boolean>(false)
const actions = ref([
  {
    name: '选项1'
  },
  {
    name: '选项2'
  },
  {
    name: '选项3',
    description: '描述信息'
  }
])

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}

const toast = useToast()

function select({ item, index }) {
  toast.show(`当前选中项: ${item.name}, 下标: ${index}`)
}
```

### 自定义单行面板

自定义单行面板时，`panels` 类型为一维数组，数组内部对象结构如下：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| icon | 图标名或图片地址 | string |
| title | 标题 | string |

```html
<wd-button @click="showActions">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :panels="panels" @close="close" @select="select" />
```

```typescript
const show = ref<boolean>(false)
const panels = ref([
  {
    icon: 'user',
    title: '微信好友'
  },
  {
    icon: 'share-internal',
    title: '朋友圈'
  },
  {
    icon: 'message',
    title: 'QQ 好友'
  },
  {
    icon: 'star-fill',
    title: '收藏'
  },
  {
    icon: 'share-internal',
    title: '更多分享'
  },
  {
    icon: 'user-add',
    title: '邀请好友'
  }
])
function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
const toast = useToast()

function select({ item, index }) {
  toast.show(`当前选中项: ${item.title}, 下标: ${index}`)
}
```

### 自定义多行面板

自定义多行面板时，`panels` 类型为多维数组，每个数组内部对象结构如下：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| icon | 图标名或图片地址 | string |
| title | 标题 | string |

```html
<wd-button @click="showActions">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :panels="panels" @close="close" @select="select1" />
```

```typescript
const show = ref<boolean>(false)
const panels = ref([
  [
    {
      icon: 'user',
      title: '微信好友'
    },
    {
      icon: 'share-internal',
      title: '朋友圈'
    },
    {
      icon: 'message',
      title: 'QQ 好友'
    },
    {
      icon: 'star-fill',
      title: '收藏'
    },
    {
      icon: 'user-add',
      title: '邀请'
    },
    {
      icon: 'share-external',
      title: '外部分享'
    },
    {
      icon: 'qrcode',
      title: '生成二维码'
    },
    {
      icon: 'save',
      title: '保存图片'
    }
  ],
  [
    {
      icon: 'file-image',
      title: '图片'
    },
    {
      icon: 'download',
      title: '下载'
    },
    {
      icon: 'copy',
      title: '复制链接'
    }
  ]
])

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
const toast = useToast()

function select1({ item, rowIndex, colIndex }) {
  toast.show(`当前选中项: ${item.title}, 行下标: ${rowIndex}, 列下标: ${colIndex}`)
}
```

## 组件状态

### 选项状态

可以设置颜色、禁用、加载等状态。

```html
<wd-button @click="showActions">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :actions="actions" @close="close" />
```

```typescript
const show = ref<boolean>(false)
const actions = ref([
  {
    name: '颜色',
    color: '#0083ff'
  },
  {
    name: '禁用',
    disabled: true
  },
  {
    loading: true
  }
])
function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
```

## 组件变体

### 取消按钮

设置 `cancel-text` 取消按钮文案，展示取消按钮。

```html
<wd-action-sheet v-model="show" :actions="actions" @close="close" cancel-text="取消" />
```

### 标题

设置 `title` 展示标题。

```html
<wd-action-sheet v-model="show" title="标题" @close="close">
  <view style="padding: 15px 15px 150px 15px;">内容</view>
</wd-action-sheet>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 设置菜单显示隐藏 | boolean | false |
| actions | 菜单选项，详见下方 Action 数据结构 | `Action[]` | `[]` |
| panels | 自定义宫格面板项，支持一维 `Panel[]` 与二维 `Panel[][]`（多行） | `Array<Panel \| Panel[]>` | `[]` |
| title | 标题 | string | - |
| cancel-text | 取消按钮文案 | string | - |
| close-on-click-action | 点击选项后是否关闭菜单 | boolean | true |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | true |
| duration | 动画持续时间（ms） | number | 200 |
| z-index | 菜单层级 | number | 10 |
| lazy-render | 弹层内容懒渲染，触发展示时才渲染内容 | boolean | true |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iPhone X 类型机型） | boolean | true |
| root-portal | 是否从页面中脱离出来（H5: teleport，App: renderjs，小程序: root-portal） | boolean | false |
| custom-title-class | 标题区域自定义类名 | string | - |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| select | 点击选项时触发 | 菜单选项或自定义面板一维数组：`{ item, index }`；自定义面板二维数组：`{ item, rowIndex, colIndex }` |
| enter | 打开动画开始时触发 | - |
| after-enter | 打开动画结束时触发 | - |
| leave | 关闭动画开始时触发 | - |
| after-leave | 关闭动画结束时触发 | - |
| close | 面板关闭时触发 | - |
| click-modal | 点击遮罩时触发 | - |
| cancel | 点击取消按钮时触发 | - |

## Action 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| name | 选项名称 | string |
| description | 描述信息 | string |
| color | 颜色 | string |
| disabled | 禁用 | boolean |
| loading | 加载中状态 | boolean |

## Panel 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| icon | 图标名或图片地址 | string |
| title | 标题内容 | string |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义内容区，传入后会覆盖默认 actions/panels 渲染 | - |
| close | 自定义标题栏右侧关闭区域 | `{ close }` |

---

---
url: 'https://v2.wot-ui.cn/component/avatar.md'
---
# Avatar 头像

用来代表用户或事物，支持图片、文本或图标展示。

## 组件类型

### 基础用法

头像支持三种类型：图片、文本、图标。

```typescript
const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
```

```html
<wd-avatar :src="avatarURL" />
<wd-avatar text="U" />
<wd-avatar icon="user" />
```

### 头像组基础用法

使用 `wd-avatar-group` 组件可以展示一组头像。

```html
<wd-avatar-group>
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>
```

## 组件状态

### 可点击

通过监听 `click` 事件实现点击功能。

```html
<wd-avatar size="large" :src="avatarURL" @click="handleClick" />
<wd-avatar size="large" text="点我" bg-color="#1E90FF" @click="handleClick" />
```

```typescript
import { useToast } from '@/uni_modules/wot-ui'

const toast = useToast()

const handleClick = () => {
  toast.show('点击头像')
}
```

## 组件样式

### 头像形状

使用 `shape` 属性设置头像形状，支持 `round`（圆形）和 `square`（方形），默认为 `round`。

```html
<wd-avatar :src="avatarURL" shape="square" />
<wd-avatar :src="avatarURL" shape="round" />
```

### 头像尺寸

支持预设尺寸：`large`、`medium`、`normal`、`small`，默认为 `normal`。也可以传入数字或带单位的字符串（如 `40px`、`100rpx`）自定义尺寸。

```html
<wd-avatar :src="avatarURL" size="large" />
<wd-avatar :src="avatarURL" size="medium" />
<wd-avatar :src="avatarURL" size="normal" />
<wd-avatar :src="avatarURL" size="small" />
<wd-avatar :src="avatarURL" :size="80" />
<wd-avatar :src="avatarURL" :size="60" />
<wd-avatar :src="avatarURL" size="40px" />
```

### 自定义颜色

使用 `bg-color` 和 `color` 属性自定义背景色和文字颜色。

```html
<wd-avatar bg-color="#DC143C" color="#fff" text="W" />
<wd-avatar bg-color="#228B22" color="#fff" text="O" />
<wd-avatar bg-color="#1E90FF" color="#fff" text="T" />
<wd-avatar bg-color="#EEEEEE" color="#7B8198" icon="user" />
```

## 特殊样式

### 带徽记的头像

结合 Badge 组件展示徽记。

```html
<wd-badge modelValue="10" type="primary">
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge modelValue="20" type="danger">
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge is-dot>
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge is-dot>
  <wd-avatar text="A" shape="square" bg-color="#1E90FF" />
</wd-badge>
```

## 内容形态

### 自定义内容

使用默认插槽自定义头像内容。

```html
<wd-avatar>
  <view class="custom-content">VIP</view>
</wd-avatar>
<wd-avatar>
  <wd-icon name="star-fill" size="24px" color="#f0883a" />
</wd-avatar>
```

## 布局能力

### 头像组最大数量

使用 `max-count` 属性限制显示的头像数量，超出部分会以 `+N` 形式展示。

```html
<wd-avatar-group :max-count="3">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### 头像组叠层方向

使用 `cascading` 属性设置叠层方向，支持 `left-up`（左侧叠在上层）和 `right-up`（右侧叠在上层）。

```html
<wd-avatar-group cascading="left-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>

<wd-avatar-group cascading="right-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### 头像组垂直堆叠

使用 `vertical` 属性开启垂直方向堆叠展示。

```html
<wd-avatar-group vertical :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>

<wd-avatar-group vertical cascading="right-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-fill" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

## Avatar Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | string | `''` |
| text | 文本内容 | string | `''` |
| icon | 图标名称，使用 wd-icon 组件 | string | `''` |
| size | 头像尺寸，支持 `large / medium / normal / small` 或自定义数值/单位字符串 | string | number | normal |
| shape | 头像形状，支持 `round / square` | string | round |
| bg-color | 背景颜色 | string | `''` |
| color | 文字颜色 | string | `''` |
| alt | 图片加载失败时的占位文本 | string | `''` |
| mode | 图片填充模式，同 uni-app image 组件的 mode | string | aspectFill |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

## Avatar Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击头像时触发 | - |
| error | 图片加载失败时触发 | `event` |

## Avatar Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义头像内容 |

## AvatarGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| max-count | 最大显示数量，超出后显示折叠头像 | number | - |
| cascading | 叠层方向，可选值为 `left-up`、`right-up` | string | left-up |
| shape | 统一设置组内头像形状，可选值为 `round`、`square` | string | round |
| size | 统一设置组内头像尺寸，支持预设尺寸或自定义数值/单位字符串 | string | number | normal |
| collapse-avatar | 超出最大数量时折叠头像显示文本 | string | `''` |
| vertical | 是否垂直展示 | boolean | false |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

## AvatarGroup Slots

| 名称 | 说明 |
| --- | --- |
| default | 头像列表，放置 wd-avatar 组件 |

---

---
url: 'https://v2.wot-ui.cn/component/backtop.md'
---
# Backtop 回到顶部

用于返回页面顶部的操作按钮。

## 组件类型

### 基本用法

由于回到顶部需要实时监听页面滚动位置，通常需要在页面的 `onPageScroll` 生命周期中获取滚动距离，再通过 `scroll-top` 传递给组件。

::: code-group

```html [vue]
<wd-backtop :scroll-top="scrollTop"></wd-backtop>
```

```ts [ts]
import { onPageScroll } from '@dcloudio/uni-app'
import { ref } from 'vue'

const scrollTop = ref(0)

onPageScroll((event) => {
  scrollTop.value = event.scrollTop
})
```

:::

## 组件变体

### 形状与文字

通过 `shape` 切换圆形或方形按钮，通过 `text` 显示按钮文字。

```html
<wd-backtop :scroll-top="scrollTop" shape="square" text="TOP"></wd-backtop>
```

### 自定义图标

默认插槽可以替换按钮内部内容。

```html
<wd-backtop :scroll-top="scrollTop">
  <text>TOP</text>
</wd-backtop>
```

## 组件样式

### 自定义显示距离

通过 `top` 设置滚动距离超过多少时显示按钮。

```html
<wd-backtop :scroll-top="scrollTop" :top="600"></wd-backtop>
```

### 自定义样式

通过 `custom-style` 和 `icon-style` 调整按钮与图标样式。

```html
<wd-backtop :scroll-top="scrollTop" custom-style="background: #007aff;color:white;" icon-style="color: white;"></wd-backtop>
```

### 自定义滚动时间

通过 `duration` 设置返回顶部滚动时长，单位为毫秒。

```html
<wd-backtop :scroll-top="scrollTop" :duration="1000"></wd-backtop>
```

## Backtop Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| scroll-top | 页面滚动距离 | `number` | - |
| text | 按钮文字 | `string` | - |
| top | 滚动距离超过该值时显示按钮，单位为 `px` | `number` | `300` |
| duration | 返回顶部滚动时间，单位为 `ms` | `number` | `100` |
| z-index | 组件层级 | `number` | `10` |
| icon-style | 自定义图标样式 | `string` | `''` |
| shape | 按钮形状，可选值为 `circle`、`square` | string | `circle` |
| bottom | 距离屏幕底部的距离，单位为 `px` | `number` | `100` |
| right | 距离屏幕右侧的距离，单位为 `px` | `number` | `20` |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |

## Backtop Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义按钮内容 |

---

---
url: 'https://v2.wot-ui.cn/component/badge.md'
---
# Badge 徽标

出现在按钮、图标旁的数字或状态标记。

## 组件类型

### 展示消息数量

通过 `value` 展示消息数量，支持数字或文本。

```html
<wd-badge custom-class="badge" :value="12">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="3" bg-color="green">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" type="primary">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="2" type="warning">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" type="success">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="2" type="info">
  <wd-button :round="false" type="danger" size="small">回复</wd-button>
</wd-badge>
```

## 组件状态

### 点状类型

设置 `is-dot` 以红点形式标注。

```html
<wd-badge custom-class="badge" is-dot>数据查询</wd-badge>
<wd-badge custom-class="badge" is-dot>
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
```

### 展示 0 值

通过 `show-zero` 控制 `value=0` 时是否显示。`is-dot` 优先级高于 `show-zero`。

```html
<wd-badge custom-class="badge" :value="0" show-zero>
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="0">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="0" is-dot>
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
```

## 组件变体

### 徽标形状

设置 `shape` 切换徽标形状。

```html
<wd-badge custom-class="badge" :value="12" shape="square">
  <wd-button :round="false" type="info" size="small">方形</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="12" shape="bubble">
  <wd-button :round="false" type="info" size="small">气泡</wd-button>
</wd-badge>
```

## 组件样式

### 可定义消息最大值

通过 `max` 设置最大显示值。仅当 `value` 为数字时生效。

```html
<wd-badge custom-class="badge" :value="200" :max="99">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="200" :max="10">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
```

## 特殊样式

### 描边徽标

设置 `border` 可展示描边徽标。

```html
<wd-badge custom-class="badge" :value="12" border>
  <wd-button :round="false" type="primary" size="small">描边</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" border type="primary">
  <wd-button :round="false" type="danger" size="small">描边</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="999" border type="warning">
  <wd-button :round="false" type="success" size="small">描边</wd-button>
</wd-badge>
```

## 内容形态

### 自定义内容

设置字符串 `value` 显示数字以外的文本内容。

```html
<wd-badge custom-class="badge" value="new">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" value="hot">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
```

```scss
:deep(.badge) {
  margin: 0 30px 20px 0;
  display: inline-block;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 显示值 | string | number | - |
| max | 最大值，超过后显示 `{max}+`，仅当 `value` 为 number 时生效 | number | - |
| top | 为正时，角标向下偏移对应像素 | string | number | - |
| right | 为正时，角标向左偏移对应像素 | string | number | - |
| is-dot | 红色点状标注 | boolean | false |
| hidden | 隐藏 badge | boolean | false |
| type | 类型，支持 `primary / success / warning / danger / info` | string | - |
| bg-color | 背景色 | string | - |
| show-zero | 是否显示 0 | boolean | false |
| shape | 徽标形状，支持 `circle / square / bubble` | string | circle |
| border | 是否显示白色描边 | boolean | false |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 徽标包裹的内容 |

---

---
url: 'https://v2.wot-ui.cn/component/button.md'
---
# Button 按钮

按钮用于触发一个操作，如提交表单或打开链接。

## 组件类型

### 类型

```html
<wd-button>主要按钮</wd-button>
<wd-button type="success">成功按钮</wd-button>
<wd-button type="info">信息按钮</wd-button>
<wd-button type="warning">警告按钮</wd-button>
<wd-button type="danger">危险按钮</wd-button>
```

## 组件状态

### 禁用

设置 `disabled` 属性。

```html
<wd-button disabled>默认按钮</wd-button>
```

### 加载

设置 `loading` 属性，让按钮处于加载中状态。加载中的按钮是禁止点击的。

```html
<wd-button loading>加载中</wd-button>
```

## 组件变体

### 镂空

设置 `variant="plain"`。

```html
<wd-button variant="plain">主要按钮</wd-button>
```

### 虚线

设置 `variant="dashed"`。

```html
<wd-button variant="dashed">主要按钮</wd-button>
```

### 柔和

设置 `variant="soft"`。

```html
<wd-button variant="soft">主要按钮</wd-button>
```

### 文字

设置 `variant="text"`。

```html
<wd-button variant="text">文字按钮</wd-button>
```

## 组件样式

### 尺寸

设置 `size` ，支持 'mini'、'small'、'medium'、'large'，默认为 'medium'。

```html
<wd-button size="mini">迷你按钮</wd-button>
<wd-button size="small">小号按钮</wd-button>
<wd-button size="medium">中号按钮</wd-button>
<wd-button size="large">大号按钮</wd-button>
```

### 细边框与圆角

设置 `hairline` 与 `round` 属性。

```html
<wd-button variant="plain" hairline>细边框</wd-button>
<wd-button variant="plain" round>圆角按钮</wd-button>
```

## 特殊样式

### custom-class 阴影

通过 `custom-class` 和 `custom-style` 属性可以自定义按钮样式，这里使用 `custom-class` 添加 `Material Design 3` 风格 `box-shadow`。

```html
<view class="page-class">
  <wd-button custom-class="custom-shadow">主要按钮</wd-button>
  <wd-button type="success" custom-class="custom-shadow">成功按钮</wd-button>
  <wd-button type="info" custom-class="custom-shadow">信息按钮</wd-button>
  <wd-button type="warning" custom-class="custom-shadow">警告按钮</wd-button>
  <wd-button type="danger" custom-class="custom-shadow">危险按钮</wd-button>
</view>
```

```scss
.page-class {
  :deep() {
    .custom-shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
}
```

## 内容形态

### 纯图标按钮

设置 `icon` 属性可展示图标按钮。

```html
<wd-button icon="edit-outline"></wd-button>
```

### 图文按钮

结合 `icon` 与内容展示图文按钮；结合 `class-prefix` 可使用自定义图标，参见 [Icon 自定义图标](/component/icon#自定义图标)。

```html
<wd-button icon="download">下载</wd-button>
<wd-button class-prefix="fish" icon="kehuishouwu">可回收</wd-button>
```

## 布局能力

### 块状按钮

设置 `block` 属性。

```html
<wd-button block>主要按钮</wd-button>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型，可选值为 `primary`、`success`、`info`、`warning`、`danger` | string | primary |
| variant | 按钮变体，可选值为 `base`、`plain`、`dashed`、`soft`、`text` | string | base |
| size | 按钮尺寸，可选值为 `mini`、`small`、`medium`、`large` | string | medium |
| round | 圆角按钮 | boolean | false |
| disabled | 禁用按钮 | boolean | false |
| hairline | 细边框 | boolean | false |
| block | 块状按钮 | boolean | false |
| loading | 加载中按钮 | boolean | false |
| text | 按钮文本 | string | - |
| icon | 图标类名 | string | - |
| class-prefix | 类名前缀，用于使用自定义图标，用法参考 Icon 组件 | string | wd-icon |
| css-icon | CSS 图标，用法参考 Icon 组件 | `boolean \| string` | false |
| loading-props | 加载配置项 | `Partial<LoadingProps>` | - |
| open-type | 开放能力类型，详见下方 `ButtonOpenType` | string | - |
| hover-stop-propagation | 阻止祖先节点点击态 | boolean | false |
| hover-start-time | 按下后多久出现点击态（ms） | number | 20 |
| hover-stay-time | 松开后多久移除点击态（ms） | number | 70 |
| lang | 用户信息语言，可选值为 `zh_CN`、`zh_TW`、`en` | string | - |
| session-from | 会话来源（`open-type=contact` 时有效） | string | - |
| send-message-title | 会话消息卡片标题（`open-type=contact` 时有效） | string | 当前标题 |
| send-message-path | 会话消息卡片路径（`open-type=contact` 时有效） | string | 当前分享路径 |
| send-message-img | 会话消息卡片图片（`open-type=contact` 时有效） | string | 截图 |
| app-parameter | 打开 APP 传参（`open-type=launchApp` 时有效） | string | - |
| show-message-card | 显示会话消息卡片（`open-type=contact` 时有效） | boolean | false |
| button-id | 按钮唯一标识 | string | - |
| scope | 支付宝授权范围，可选值为 `phoneNumber`、`userInfo`（open-type=getAuthorize 时有效） | string | - |
| loading-color | 加载图标颜色 | string | - |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

### ButtonOpenType 开放能力

| 属性 | 说明 |
| --- | --- |
| feedback | 打开“意见反馈”页 |
| share | 触发用户转发 |
| getUserInfo | 获取用户信息 |
| contact | 打开客服会话 |
| getPhoneNumber | 获取手机号 |
| getRealtimePhoneNumber | 实时获取手机号（仅微信） |
| launchApp | 在小程序中打开 APP |
| openSetting | 打开授权设置页 |
| chooseAvatar | 获取用户头像 |
| getAuthorize | 支持支付宝授权（配合 `scope`） |
| lifestyle | 关注生活号（支付宝） |
| contactShare | 分享到通讯录（支付宝） |
| openGroupProfile | 打开群资料卡（微信） |
| openGuildProfile | 打开频道资料卡（微信） |
| openPublicProfile | 打开公众号资料卡（微信） |
| shareMessageToFriend | 分享消息给朋友（微信） |
| addFriend | 添加好友（微信） |
| addColorSign | 添加彩签（微信） |
| addGroupApp | 添加群应用（微信） |
| addToFavorites | 收藏（微信） |
| chooseAddress | 选择收货地址（微信） |
| chooseInvoiceTitle | 选择发票抬头（微信） |
| login | 授权登录（平台能力） |
| subscribe | 订阅（平台能力） |
| favorite | 收藏（平台能力） |
| watchLater | 稍后再看（平台能力） |
| openProfile | 打开个人主页（平台能力） |
| agreePrivacyAuthorization | 用户同意隐私协议 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击事件 | `event` |
| getuserinfo | 获取用户信息回调 | `event` |
| contact | 客服消息回调（`open-type=contact`） | `event` |
| getphonenumber | 获取手机号回调（`open-type=getPhoneNumber`） | `event` |
| getrealtimephonenumber | 实时获取手机号回调（`open-type=getRealtimePhoneNumber`） | `event` |
| error | 开放能力错误回调（`open-type=launchApp`） | `event` |
| launchapp | 打开 APP 成功回调（`open-type=launchApp`） | `event` |
| opensetting | 打开授权设置页回调（`open-type=openSetting`） | `event` |
| chooseavatar | 获取用户头像回调（`open-type=chooseAvatar`） | `event` |
| agreeprivacyauthorization | 同意隐私协议回调（`open-type=agreePrivacyAuthorization`） | `event` |

## Slots

| name | 说明 |
| --- | --- |
| default | 按钮内容 |

---

---
url: 'https://v2.wot-ui.cn/component/calendar.md'
---
# Calendar 日历选择器

提供单选、多选、范围、周/月、日期时间等日历选择能力。

::: tip 性能提示
`min-date` 与 `max-date` 不建议设置差距过大，避免大量日期计算影响性能。若业务需要较大时间跨度，建议配合 `switch-mode`（如 `month` / `year-month`）减少一次性渲染压力。
:::

## 组件类型

### 单个日期选择

```html
<wd-cell-group border>
  <wd-cell title="单个日期选择" :value="formatValue(value1, 'date')" is-link @click="show1 = true" />
</wd-cell-group>
<wd-calendar v-model="value1" v-model:visible="show1" @confirm="handleConfirm" />
```

### 多个日期选择

```html
<wd-cell-group border>
  <wd-cell title="多个日期选择" :value="formatValue(value2, 'dates')" is-link @click="show2 = true" />
</wd-cell-group>
<wd-calendar type="dates" v-model="value2" v-model:visible="show2" />
```

### 范围选择

```html
<wd-cell-group border>
  <wd-cell title="日期范围选择" :value="formatValue(value3, 'daterange')" is-link @click="show3 = true" />
</wd-cell-group>
<wd-calendar type="daterange" v-model="value3" v-model:visible="show3" />
```

### 日期时间类型

```html
<wd-cell-group border>
  <wd-cell title="日期时间选择" :value="formatValue(value4, 'datetime')" is-link @click="show4 = true" />
</wd-cell-group>
<wd-calendar type="datetime" v-model="value4" v-model:visible="show4" />
```

```html
<wd-cell-group border>
  <wd-cell title="日期时间范围选择" :value="formatValue(value5, 'datetimerange')" is-link @click="show5 = true" />
</wd-cell-group>
<wd-calendar type="datetimerange" v-model="value5" v-model:visible="show5" />
```

### 周与月类型

```html
<wd-cell-group border>
  <wd-cell title="周选择" :value="formatValue(value6, 'week')" is-link @click="show6 = true" />
</wd-cell-group>
<wd-calendar type="week" v-model="value6" v-model:visible="show6" />
```

```html
<wd-cell-group border>
  <wd-cell title="月选择" :value="formatValue(value7, 'month')" is-link @click="show7 = true" />
</wd-cell-group>
<wd-calendar type="month" :min-date="minDate" v-model="value7" v-model:visible="show7" />
```

### 周范围与月范围选择

```html
<wd-cell-group border>
  <wd-cell title="周范围选择" :value="formatValue(value8, 'weekrange')" is-link @click="show8 = true" />
</wd-cell-group>
<wd-calendar :first-day-of-week="1" type="weekrange" v-model="value8" v-model:visible="show8" />
```

```html
<wd-cell-group border>
  <wd-cell title="月范围选择" :value="formatValue(value9, 'monthrange')" is-link @click="show9 = true" />
</wd-cell-group>
<wd-calendar type="monthrange" v-model="value9" v-model:visible="show9" />
```

## 组件状态

### 快捷操作

设置 `show-confirm="false"` 后，选中即确认。

```html
<wd-cell-group border>
  <wd-cell title="快捷操作" :value="formatValue(value16, 'date')" is-link @click="show16 = true" />
</wd-cell-group>
<wd-calendar v-model="value16" v-model:visible="show16" :show-confirm="false" />
```

### before-confirm

设置 `before-confirm` 在确认前拦截，返回 `false` 或 `Promise<false>` 可阻止确认。

```html
<wd-cell-group border>
  <wd-cell title="before-confirm" :value="formatValue(value14, 'date')" is-link @click="show14 = true" />
</wd-cell-group>
<wd-calendar v-model="value14" v-model:visible="show14" :before-confirm="beforeConfirm" />
```

## 组件变体

### 切换模式

设置 `switch-mode` 控制面板切换行为：

* `none`：平铺，不展示切换按钮
* `month`：按月切换
* `year-month`：支持按年与按月切换

```html
<wd-radio-group v-model="switchMode" type="button">
  <wd-radio value="none">none</wd-radio>
  <wd-radio value="month">month</wd-radio>
  <wd-radio value="year-month">year-month</wd-radio>
</wd-radio-group>
```

### 日周月切换

设置 `show-type-switch` 开启日/周/月切换。

```html
<wd-cell-group border>
  <wd-cell title="日周月切换" :value="formatValue(value10, 'date')" is-link @click="show10 = true" />
</wd-cell-group>
<wd-calendar :first-day-of-week="1" show-type-switch v-model="value10" v-model:visible="show10" :switch-mode="switchMode" />
```

## 组件样式

### 日期格式化

设置 `formatter` 可定制日期单元格文案与状态展示。

```html
<wd-cell-group border>
  <wd-cell title="日期格式化" :value="formatValue(value11, 'daterange')" is-link @click="show11 = true" />
</wd-cell-group>
<wd-calendar type="daterange" v-model="value11" v-model:visible="show11" :formatter="formatter" />
```

### 自定义展示

设置 `inner-display-format` 自定义范围选择面板中的起止文案。

```html
<wd-cell-group border>
  <wd-cell title="自定义展示" :value="displayFormat(value13)" is-link @click="show13 = true" />
</wd-cell-group>
<wd-calendar
  type="daterange"
  v-model="value13"
  v-model:visible="show13"
  :inner-display-format="innerDisplayFormat"
/>
```

## 特殊样式

### 快捷选项

设置 `shortcuts` 与 `on-shortcuts-click` 实现快捷日期区间。

```html
<wd-cell-group border>
  <wd-cell title="快捷选项" :value="formatValue(value12, 'daterange')" is-link @click="show12 = true" />
</wd-cell-group>
<wd-calendar
  :shortcuts="shortcuts"
  :on-shortcuts-click="onShortcutsClick"
  type="daterange"
  v-model="value12"
  v-model:visible="show12"
/>
```

### 拓展确定区域

通过 `confirm-left` / `confirm-right` 插槽拓展确定区按钮。

```html
<wd-cell-group border>
  <wd-cell title="拓展确定区域" :value="formatValue(value19, 'date')" is-link @click="show19 = true" />
</wd-cell-group>
<wd-calendar v-model="value19" v-model:visible="show19">
  <template #confirm-right>
    <wd-button block plain custom-style="margin-left: 10px;" @click="selectToday">选择今天</wd-button>
  </template>
</wd-calendar>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中值，13 位时间戳或时间戳数组 | `number \| number[] \| null` | - |
| v-model:visible | 是否显示弹层 | boolean | false |
| type | 日期类型，支持 `date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange` | string | date |
| min-date | 最小日期时间戳 | number | 当前日期往前 6 个月 |
| max-date | 最大日期时间戳 | number | 当前日期往后 6 个月 |
| first-day-of-week | 周起始日（0 表示周日） | number | 0 |
| formatter | 日期格式化函数 | `CalendarFormatter` | - |
| max-range | 范围类型的最大可选范围 | number | - |
| range-prompt | 超出最大范围提示文案 | string | - |
| allow-same-day | 范围类型是否允许同一天/同一周/同一月 | boolean | false |
| default-time | 日期默认时分秒 | `string \| string[]` | - |
| time-filter | 时间选项过滤函数（datetime / datetimerange） | `CalendarTimeFilter` | - |
| hide-second | 是否隐藏秒选择（datetime / datetimerange） | boolean | false |
| title | 弹层标题 | string | 选择日期（内置文案） |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | true |
| z-index | 弹层层级 | number | 15 |
| show-confirm | 是否显示确认按钮 | boolean | true |
| confirm-text | 确认按钮文案 | string | 确定（内置文案） |
| inner-display-format | 自定义范围面板内部回显 | `CalendarInnerDisplayFormat` | - |
| ellipsis | 范围文案是否省略显示 | boolean | false |
| show-type-switch | 是否显示日周月切换 | boolean | false |
| shortcuts | 快捷选项列表（项需包含 `text`） | `Record<string, any>[]` | `[]` |
| on-shortcuts-click | 快捷选项点击回调 | `CalendarOnShortcutsClick` | - |
| safe-area-inset-bottom | 是否开启底部安全区 | boolean | true |
| before-confirm | 确认前校验函数 | `CalendarBeforeConfirm` | - |
| custom-view-class | 面板内部视图类名 | string | `''` |
| immediate-change | 是否手指松开即触发时间选择 change 事件 | boolean | false |
| root-portal | 是否脱离页面渲染 | boolean | false |
| panel-height | 可滚动面板高度 | number | 316 |
| show-panel-title | 是否展示滚动面板标题 | boolean | true |
| switch-mode | 切换模式，可选值为`none`、`month`、`year-month`，`none` 平铺展示所有月份/年份且不展示切换按钮；`month` 支持按月切换并展示上个月/下个月按钮；`year-month` 支持按年与按月切换并展示上一年/下一年、上个月/下个月按钮。大跨度日期场景建议使用 `month` 或 `year-month` 以降低渲染压力 | string | none |
| duration | 弹层动画时长 | number | 200 |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击确认后触发 | `{ value, type }` |
| change | 面板日期变化时触发 | `{ value }` |
| cancel | 关闭且未确认时触发 | - |
| open | 日历打开时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开日历弹层 | - |
| close | 关闭日历弹层 | - |

## Slots

| name | 说明 |
| --- | --- |
| confirm-left | 确认区域左侧插槽 |
| confirm-right | 确认区域右侧插槽 |

## CalendarDayItem 数据结构

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| type | 日期状态类型 | CalendarDayType |
| date | 13 位时间戳 | number |
| text | 日期文本内容 | string |
| topInfo | 上方提示信息 | string |
| bottomInfo | 下方提示信息 | string |
| disabled | 是否禁用 | boolean |

### CalendarDayType

| 类型 | 说明 |
| --- | --- |
| selected | 单日期选中 |
| start | 范围开始日期 |
| end | 范围结束日期 |
| middle | 范围开始与结束之间的日期 |
| same | 范围开始与结束日期同一天 |
| current | 当前日期 |
| multiple-middle | 多日期范围选择，开始与结束之间的日期 |
| multiple-selected | 多日期范围选择，选中的日期 |

---

---
url: 'https://v2.wot-ui.cn/component/calendar-view.md'
---
# CalendarView 日历面板组件

提供单选、多选、范围、周/月、日期时间等日历选择能力，可作为业务日历选择器的底层面板组件。

::: tip 性能提示
`min-date` 与 `max-date` 不建议设置差距过大。若业务需要较大时间跨度，建议配合 `switch-mode`（`month` / `year-month`）降低一次性渲染压力。
:::

## 组件类型

### 单个日期选择

```html
<wd-calendar-view type="date" v-model="value" @change="handleChange" />
```

### 多个日期选择

```html
<wd-calendar-view type="dates" v-model="value" @change="handleChange" />
```

### 日期范围选择

```html
<wd-calendar-view type="daterange" v-model="value" @change="handleChange" />
```

### 日期时间类型

```html
<wd-calendar-view type="datetime" v-model="value" @change="handleChange" />
<wd-calendar-view type="datetimerange" v-model="valueRange" @change="handleChange" />
```

### 周与月类型

```html
<wd-calendar-view type="week" v-model="value" :first-day-of-week="1" @change="handleChange" />
<wd-calendar-view type="month" v-model="value" @change="handleChange" />
<wd-calendar-view type="weekrange" v-model="valueRange" @change="handleChange" />
<wd-calendar-view type="monthrange" v-model="valueRange" @change="handleChange" />
```

## 组件状态

### 范围选择允许同一天

```html
<wd-calendar-view type="daterange" v-model="valueRange" allow-same-day @change="handleChange" />
```

## 组件变体

### 切换模式

设置 `switch-mode` 控制面板切换行为：

* `none`：平铺展示所有月份/年份，不展示切换按钮
* `month`：支持按月切换，展示上个月/下个月按钮
* `year-month`：支持按年与按月切换，展示上一年/下一年、上个月/下个月按钮

```html
<wd-calendar-view type="date" v-model="value" switch-mode="month" @change="handleChange" />
```

## 组件样式

### 格式化日期

设置 `formatter` 可定制日期单元格文案与状态。

```html
<wd-calendar-view type="daterange" v-model="valueRange" allow-same-day :formatter="formatter" @change="handleChange" />
```

### 设置周起始日

```html
<wd-calendar-view :first-day-of-week="1" v-model="value" @change="handleChange" />
```

### 展示面板标题

```html
<wd-calendar-view type="daterange" :show-panel-title="false" v-model="valueRange" @change="handleChange" />
```

## 特殊样式

### 最大范围限制

```html
<wd-calendar-view type="daterange" :max-range="3" v-model="valueRange" @change="handleChange" />
```

### 时间选项过滤

设置 `hide-second` 与 `time-filter` 过滤时分秒选项。

```html
<wd-calendar-view type="datetime" v-model="value" hide-second :time-filter="timeFilter" @change="handleChange" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中值，13 位时间戳或时间戳数组 | `number \| number[] \| null` | - |
| type | 日期类型，支持 `date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange` | string | date |
| min-date | 最小日期时间戳 | number | 当前日期往前 6 个月 |
| max-date | 最大日期时间戳 | number | 当前日期往后 6 个月 |
| first-day-of-week | 周起始日（0 表示周日） | number | 0 |
| formatter | 日期格式化函数 | `CalendarFormatter` | - |
| max-range | 范围类型的最大可选范围 | number | - |
| range-prompt | 超出最大范围提示文案 | string | - |
| allow-same-day | 范围类型是否允许同一天/同一周/同一月 | boolean | false |
| show-panel-title | 是否展示面板标题 | boolean | true |
| default-time | 日期默认时分秒 | `string \| string[]` | `00:00:00` |
| panel-height | 可滚动面板高度 | number | 316 |
| time-filter | 时间选项过滤函数（datetime / datetimerange） | `CalendarTimeFilter` | - |
| time-item-height | 时间选项高度 | number | 44 |
| time-visible-item-count | 时间可见项数量 | number | 3 |
| hide-second | 是否隐藏秒选择（datetime / datetimerange） | boolean | false |
| immediate-change | 是否手指松开即触发时间选择 change 事件 | boolean | false |
| switch-mode | 切换模式，可选值为`none`、`month`、`year-month`，`none` 平铺展示所有月份/年份且不展示切换按钮；`month` 支持按月切换并展示上个月/下个月按钮；`year-month` 支持按年与按月切换并展示上一年/下一年、上个月/下个月按钮。大跨度日期场景建议使用 `month` 或 `year-month` 以降低渲染压力 | string | none |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 面板值变化时触发 | `{ value }` |
| pickstart | 时间选择滚动开始时触发 | - |
| pickend | 时间选择滚动结束时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| scrollIntoView | 使当前日期或选中日期滚动到可视区域（面板隐藏到显示时建议调用） | - |

## CalendarDayItem 数据结构

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| type | 日期状态类型 | CalendarDayType |
| date | 13 位时间戳 | number |
| text | 日期文本内容 | string |
| topInfo | 上方提示信息 | string |
| bottomInfo | 下方提示信息 | string |
| disabled | 是否禁用 | boolean |

### CalendarDayType

| 类型 | 说明 |
| --- | --- |
| selected | 单日期选中 |
| start | 范围开始日期 |
| end | 范围结束日期 |
| middle | 范围开始与结束之间的日期 |
| same | 范围开始与结束日期同一天 |
| current | 当前日期 |
| multiple-middle | 多日期范围选择，开始与结束之间的日期 |
| multiple-selected | 多日期范围选择，选中的日期 |

---

---
url: 'https://v2.wot-ui.cn/component/card.md'
---
# Card 卡片

用于展示商品的图片、价格等信息。

## 组件类型

### 基本使用

通过 `title` 设置标题，默认插槽传入内容，`footer` 插槽用于底部操作区。

```html
<wd-card title="岳阳楼记">
  <view class="content-text">
    至若春和景明，波澜不惊，上下天光，一碧万顷，沙鸥翔集，锦鳞游泳，岸芷汀兰，郁郁青青。
  </view>
  <template #footer>
    <wd-button size="small" plain>阅读全文</wd-button>
  </template>
</wd-card>
```

### 矩形卡片

设置 `type="rectangle"` 使用矩形卡片样式。

```html
<wd-card title="生活记录" type="rectangle">
  <view class="list-group">
    <view class="list-item">
      <image src="https://wot-ui.cn/assets/panda.jpg" class="list-item__image" mode="aspectFill" />
      <view class="list-item__content">
        <view class="list-item__title">今天天气真好</view>
        <view class="list-item__desc">2026年2月11日 晴天 22℃</view>
      </view>
    </view>
  </view>
  <template #footer>
    <wd-button size="small" plain>点赞</wd-button>
  </template>
</wd-card>
```

## 组件样式

### 复杂卡片

结合图片、标签、属性区块可构建信息密度更高的卡片内容。

```html
<wd-card title="宠物档案">
  <view class="info-card">...</view>
  <template #footer>
    <wd-button size="small" plain>点赞 (1.2w)</wd-button>
  </template>
</wd-card>
```

## 内容形态

### 自定义标题

使用 `title` 插槽自定义标题区域内容。

```html
<wd-card type="rectangle">
  <template #title>
    <view class="custom-title">
      <view>兴趣爱好</view>
      <view class="custom-title__tip">
        <wd-icon name="heart" size="14px" custom-style="vertical-align: bottom; margin-right: 4px;" />
        快乐源泉
      </view>
    </view>
  </template>
  <view class="list-group">...</view>
</wd-card>
```

## 特殊样式

### 去除 Footer

不传 `footer` 插槽时，底部区域不会渲染。

```html
<wd-card title="精彩瞬间" type="rectangle">
  <view class="moment-card">...</view>
</wd-card>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | string | - |
| type | 卡片类型，支持 `rectangle` | string | - |
| custom-title-class | 标题区域自定义类名 | string | `''` |
| custom-content-class | 内容区域自定义类名 | string | `''` |
| custom-footer-class | 底部区域自定义类名 | string | `''` |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Slots

| name | 说明 |
| --- | --- |
| default | 卡片内容 |
| title | 卡片标题 |
| footer | 底部操作内容 |

---

---
url: 'https://v2.wot-ui.cn/component/cascader.md'
---
# Cascader 级联选择器

用于处理树形结构数据的分级选择，支持静态数据与异步加载两种模式。

::: tip 提示
省市区场景可直接使用 `@vant/area-data` 的 `useCascaderAreaData` 作为数据源。
:::

## 组件类型

### 基础用法

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" @confirm="handleConfirm" />
```

### 初始选项

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" @confirm="handleConfirm" />
```

### 自定义字段

```html
<wd-cascader
  v-model="value"
  v-model:visible="show"
  :options="customOptions"
  value-key="id"
  text-key="name"
  children-key="items"
  @confirm="handleConfirm"
/>
```

## 组件状态

### 禁用选项

```html
<wd-cascader v-model="value" v-model:visible="show" :options="optionsWithDisabled" @confirm="handleConfirm" />
```

### 选项提示信息

```html
<wd-cascader v-model="value" v-model:visible="show" :options="optionsWithTip" @confirm="handleConfirm" />
```

### 确定前校验

`before-confirm` 支持返回 `boolean` 或 `Promise<boolean>`。

```html
<wd-cascader
  v-model="value"
  v-model:visible="show"
  :options="options"
  :before-confirm="beforeConfirm"
  @confirm="handleConfirm"
/>
```

```ts
const beforeConfirm = async (value, selectedOptions) => {
  if (String(value) === '120000') return false
  return true
}
```

## 组件样式

### 展示格式化

```ts
const handleConfirm = ({ selectedOptions }) => {
  displayValue.value = `${selectedOptions[selectedOptions.length - 2].text}-${selectedOptions[selectedOptions.length - 1].text}`
}
```

### 设置标题

```html
<wd-cascader v-model="value" v-model:visible="show" title="选择地址" :options="options" @confirm="handleConfirm" />
```

## 特殊样式

### 异步加载

传入 `lazy-load` 后进入异步模式：`option = null` 时加载根节点，`resolve([])` 表示当前节点为叶子节点。

```html
<wd-cascader v-model="value" v-model:visible="show" :lazy-load="lazyLoad" @confirm="handleConfirm" />
```

```ts
const lazyLoad = (option, tabIndex, resolve) => {
  fetchChildren(option ? String(option.value) : null).then(resolve)
}
```

### 异步加载（无初始值）

```html
<wd-cascader v-model="value" v-model:visible="show" :lazy-load="lazyLoad" @confirm="handleConfirm" />
```

### 任意级可选

开启 `check-strictly` 后，点击节点仅更新当前路径，通过右上角确认按钮提交。

```html
<wd-cascader v-model="value" v-model:visible="show" :options="options" check-strictly @confirm="handleConfirm" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中项。静态模式为叶子节点值；异步模式可传路径数组用于回显 | `string \| number \| (string \| number)[]` | - |
| visible / v-model:visible | 是否显示弹窗 | boolean | false |
| options | 层级选项数据（树形结构） | `CascaderOption[]` | `[]` |
| title | 弹出层标题 | string | - |
| before-confirm | 确定前校验函数，参数为 `(value, selectedOptions)`，返回 `boolean` 或 `Promise<boolean>` | `CascaderBeforeConfirm` | - |
| check-strictly | 是否开启任意级可选 | boolean | false |
| confirm-text | 严格模式下确认按钮文案 | string | `''` |
| value-key | 选项值字段名 | string | value |
| text-key | 选项文本字段名 | string | text |
| children-key | 子节点字段名 | string | children |
| tip-key | 提示文案字段名 | string | tip |
| is-leaf-key | 叶子节点标识字段名，值为 `true` 时点击即确认 | string | isLeaf |
| lazy-load | 异步加载回调，参数为 `(option, tabIndex, resolve)` | `CascaderLazyLoad` | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | true |
| z-index | 弹窗层级 | number | 15 |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iPhone X 类型机型） | boolean | true |
| line-width | 底部条宽度，支持 number 或带单位字符串 | `number \| string` | - |
| line-height | 底部条高度，支持 number 或带单位字符串 | `number \| string` | - |
| line-theme | 底部条位置样式，支持 `normal / text / underline / dot` | string | normal |
| root-portal | 是否脱离文档流渲染（H5: teleport，App: renderjs，小程序: root-portal） | boolean | false |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## CascaderOption 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项值 | `string \| number` |
| text | 选项文本 | string |
| children | 子选项 | `CascaderOption[]` |
| disabled | 是否禁用 | boolean |
| tip | 提示文案 | string |
| isLeaf | 是否为叶子节点（异步模式） | boolean |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 确认选择时触发 | 静态模式：`{ value, selectedOptions }`，`value` 为叶子值；异步模式：`{ value, selectedOptions }`，`value` 为路径数组 |
| close | 弹窗关闭时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开级联弹窗 | - |
| close | 关闭级联弹窗 | - |

---

---
url: 'https://v2.wot-ui.cn/component/cell.md'
---
# Cell 单元格

单元格用于信息展示与轻交互，可独立使用，也可通过 `wd-cell-group` 统一管理布局与样式。

## 组件类型

### 基本用法

```html
<wd-cell-group>
  <wd-cell title="标题文字" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

### 分组标题

```html
<wd-cell-group title="交易管理" value="内容">
  <wd-cell title="标题文字" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

## 组件状态

### 点击反馈

```html
<wd-cell title="标题文字" value="内容" clickable @click="showToast" />
```

## 组件变体

### Placeholder

```html
<wd-cell-group>
  <wd-cell title="用户名" placeholder="请输入用户名" />
  <wd-cell title="手机号" value="188****8888" placeholder="请输入手机号" />
  <wd-cell title="左对齐" placeholder="请输入内容" value-align="left" />
  <wd-cell title="居中对齐" placeholder="请输入内容" value-align="center" />
</wd-cell-group>
```

### 页面跳转

```html
<wd-cell-group>
  <wd-cell title="帮助与反馈" is-link to="/pages/index/Index" />
  <wd-cell title="设置" value="内容" is-link to="/pages/button/Index" replace />
</wd-cell-group>
```

### 箭头方向

```html
<wd-cell-group>
  <wd-cell title="向上箭头" is-link arrow-direction="up" />
  <wd-cell title="向下箭头" is-link arrow-direction="down" />
  <wd-cell title="向左箭头" is-link arrow-direction="left" />
  <wd-cell title="默认箭头(向右)" is-link />
</wd-cell-group>
```

## 组件样式

### 图标设置

设置 `prefix-icon` 使用内置图标，或使用 `prefix` 插槽自定义前置图标。

```html
<wd-cell-group>
  <wd-cell title="标题文字" value="内容" prefix-icon="settings" />
  <wd-cell title="标题文字" value="内容">
    <template #prefix>
      <view class="cell-icon"></view>
    </template>
  </wd-cell>
</wd-cell-group>
```

### 大尺寸

```html
<wd-cell-group>
  <wd-cell size="large" title="标题文字" value="内容" />
  <wd-cell size="large" title="标题文字" value="内容" prefix-icon="settings" is-link />
  <wd-cell size="large" title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

### 垂直居中

```html
<wd-cell-group>
  <wd-cell title="标题文字" value="内容" center />
  <wd-cell title="标题文字" label="描述信息" value="内容" center />
</wd-cell-group>
```

### 圆角卡片风格

```html
<wd-cell-group insert>
  <wd-cell title="标题文字" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

## 特殊样式

### 展示边框线

```html
<wd-cell-group title="交易管理" border>
  <wd-cell title="标题文字" value="内容" />
  <wd-cell :border="false" title="标题文字" label="这一个 cell 不想要边框" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

### 表单属性

```html
<wd-cell-group border>
  <wd-cell title="必填" required>
    <wd-rate v-model="rate" />
  </wd-cell>
  <wd-cell title="必填星号在右侧" required asterisk-position="end">
    <wd-rate v-model="rate1" />
  </wd-cell>
  <wd-cell title="上下结构" layout="vertical" required asterisk-position="end">
    <wd-slider v-model="slider" />
  </wd-cell>
</wd-cell-group>
```

### 设置左侧宽度

```html
<wd-cell
  title="标题文字"
  label="这里是文字描述这里是文字描述这里是文字描述"
  title-width="200px"
  value="内容"
/>
```

### 内容省略

```html
<wd-cell-group>
  <wd-cell title="正常显示" value="这是一段很长很长很长很长很长很长的内容" />
  <wd-cell title="省略号显示" value="这是一段很长很长很长很长很长很长的内容" ellipsis />
  <wd-cell title="左对齐省略" value="这是一段很长很长很长很长很长很长的内容" value-align="left" ellipsis />
</wd-cell-group>
```

### 自定义内容

```html
<wd-cell-group>
  <wd-cell title="标题文字" center>
    <wd-button size="small" plain>按钮</wd-button>
  </wd-cell>
  <wd-cell title="标题文字" center>
    <wd-switch v-model="switchValue" />
  </wd-cell>
  <wd-cell title="标题文字" is-link to="/pages/index/index">
    <view class="custom-text">订购</view>
  </wd-cell>
  <wd-cell>
    <template #title>
      <view>
        <view style="display: inline-block">标题文字</view>
        <view class="end-time">25天后到期</view>
      </view>
    </template>
  </wd-cell>
</wd-cell-group>
```

## CellGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | string | - |
| value | 分组右侧内容 | string | - |
| border | 是否展示外边框 | boolean | false |
| insert | 是否展示为圆角卡片风格 | boolean | false |
| center | 是否使内容垂直居中 | boolean | false |
| size | 单元格大小，支持 `large` | string | - |
| title-width | 左侧标题宽度 | `string \| number` | - |
| layout | 单元格布局方式，支持 `horizontal / vertical` | string | - |
| value-align | 右侧内容对齐方式，支持 `left / right / center` | string | - |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Cell Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | string | - |
| value | 右侧内容 | `string \| number` | `''` |
| placeholder | 占位符，仅在 value 为空时显示 | string | - |
| label | 标题下方描述信息 | string | - |
| prefix-icon | 前置图标名 | string | - |
| suffix-icon | 后置图标名 | string | - |
| icon-size | 图标大小 | `string \| number` | - |
| icon-prefix | 图标类名前缀 | string | - |
| to | 跳转地址 | string | - |
| replace | 跳转时是否替换当前页面历史 | boolean | false |
| clickable | 是否开启点击反馈 | boolean | false |
| is-link | 是否展示右侧箭头并开启点击反馈 | boolean | false |
| arrow-direction | 箭头方向（仅在 is-link 为 true 时生效），支持 `left / up / down / right` | string | right |
| size | 单元格大小，支持 `large` | string | - |
| border | 是否显示内边框，优先级高于 cell-group 同名属性 | boolean | 继承自 CellGroup |
| title-width | 左侧标题宽度 | `string \| number` | 继承自 CellGroup |
| center | 是否垂直居中 | boolean | 继承自 CellGroup |
| layout | 单元格布局方式，支持 `horizontal / vertical` | string | 继承自 CellGroup |
| value-align | 右侧内容对齐方式，支持 `left / right / center` | string | 继承自 CellGroup |
| required | 是否显示必填星号 | boolean | false |
| asterisk-position | 必填星号位置，支持 `start / end` | string | start |
| hide-asterisk | 是否隐藏必填星号 | boolean | false |
| ellipsis | 内容是否超出隐藏显示省略号 | boolean | false |
| use-title-slot | 是否启用 title 插槽 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |
| custom-prefix-class | 前置图标自定义样式类 | string | `''` |
| custom-suffix-class | 后置图标自定义样式类 | string | `''` |
| custom-label-class | label 区域自定义样式类 | string | `''` |
| custom-value-class | value 区域自定义样式类 | string | `''` |
| custom-title-class | title 区域自定义样式类 | string | `''` |

## Cell Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 当 clickable 或 is-link 为 true 时，点击单元格触发 | - |

## CellGroup Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| title | 分组标题 | - |
| value | 分组右侧内容 | - |

## Cell Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| prefix | 前置图标区域 | - |
| title | 标题区域 | - |
| label | 描述信息区域 | - |
| default | 右侧内容区域 | - |
| suffix | 后置图标区域（is-link 为 false 时生效） | - |

---

---
url: 'https://v2.wot-ui.cn/component/checkbox.md'
---
# Checkbox 复选框

用于在一组备选项中进行多选，支持普通样式、按钮样式、自定义图标及全选控制。

## 组件类型

### 基本用法

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
  <wd-checkbox :name="3" type="square">多选 3</wd-checkbox>
  <wd-checkbox :name="4" type="dot">多选 4</wd-checkbox>
</wd-checkbox-group>
```

### 单独使用

`wd-checkbox` 可以不依赖 `wd-checkbox-group` 单独使用，通过 `v-model` 绑定选中状态（默认 `true-value` 为 `true`，`false-value` 为 `false`），也可通过 `true-value` / `false-value` 自定义选中与非选中时的值。

```html
<wd-checkbox v-model="checked">同意协议</wd-checkbox>
```

```ts
const checked = ref(false)
```

**自定义选中/非选中值**

```html
<wd-checkbox v-model="agree" true-value="yes" false-value="no">同意协议</wd-checkbox>
```

```ts
const agree = ref('no')
```

## 组件状态

### 禁用状态

```html
<wd-checkbox-group v-model="value" disabled>
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>

<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2" disabled>多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 半选状态

```html
<wd-checkbox v-model="checked" :indeterminate="indeterminate" @change="indeterminate = false">半选状态</wd-checkbox>
```

### 只读状态

```html
<wd-checkbox-group v-model="value" readonly>
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

## 组件变体

### 勾选在右侧

```html
<wd-checkbox-group v-model="value" placement="right">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 按钮样式

```html
<wd-checkbox-group v-model="value" type="button">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 同行展示

```html
<wd-checkbox-group v-model="value" direction="horizontal">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 最小与最大可选数量

```html
<wd-checkbox-group v-model="value" :min="1" :max="3">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
  <wd-checkbox :name="3">多选 3</wd-checkbox>
  <wd-checkbox :name="4">多选 4</wd-checkbox>
</wd-checkbox-group>
```

## 组件样式

### 修改选中颜色

```html
<wd-checkbox-group v-model="value" checked-color="#fa4350">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 修改未选中颜色

```html
<wd-checkbox-group v-model="value" unchecked-color="#fa4350">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

### 自定义图标

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox :name="1">
    自定义图标
    <template #icon="{ isChecked }">
      <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
    </template>
  </wd-checkbox>
</wd-checkbox-group>
```

### 尺寸

```html
<wd-checkbox-group v-model="value" size="large">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
</wd-checkbox-group>
```

## 特殊样式

### 结合 Cell 使用

```html
<wd-checkbox-group v-model="value" direction="horizontal">
  <wd-cell-group border value-align="right">
    <wd-cell title="点赞" clickable @click="toggle(1)">
      <wd-checkbox :name="1" />
    </wd-cell>
    <wd-cell title="投币" clickable @click="toggle(2)">
      <wd-checkbox :name="2" />
    </wd-cell>
    <wd-cell title="一键三连" clickable @click="toggle(3)">
      <wd-checkbox :name="3" />
    </wd-cell>
  </wd-cell-group>
</wd-checkbox-group>
```

### 全选切换

```html
<wd-button @click="checkboxGroup?.toggleAll()">全部切换</wd-button>
<wd-button @click="checkboxGroup?.toggleAll(true)">全选</wd-button>
<wd-button @click="checkboxGroup?.toggleAll(false)">全不选</wd-button>
<wd-button @click="checkboxGroup?.toggleAll({ skipDisabled: true })">全部切换（跳过禁用）</wd-button>
<wd-button @click="checkboxGroup?.toggleAll({ checked: true, skipDisabled: true })">全选（跳过禁用）</wd-button>

<wd-checkbox-group v-model="value" ref="checkboxGroup">
  <wd-checkbox :name="1">多选 1</wd-checkbox>
  <wd-checkbox :name="2">多选 2</wd-checkbox>
  <wd-checkbox :name="3" disabled>多选 3</wd-checkbox>
  <wd-checkbox :name="4">多选 4</wd-checkbox>
</wd-checkbox-group>
```

## Checkbox Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 单独使用时的绑定值 | `string \| number \| boolean` | false |
| name | 在 CheckboxGroup 中的唯一标识值 | `string \| number \| boolean` | `''` |
| type | 形状类型，支持 `circle / square / button / dot` | string | 继承自 CheckboxGroup |
| checked-color | 选中颜色 | string | 继承自 CheckboxGroup |
| unchecked-color | 未选中颜色 | string | 继承自 CheckboxGroup |
| disabled | 是否禁用 | `boolean \| null` | 继承自 CheckboxGroup |
| readonly | 是否只读 | `boolean \| null` | 继承自 CheckboxGroup |
| indeterminate | 是否半选状态（样式优先级最高） | boolean | false |
| true-value | 单独使用时的选中值 | `string \| number \| boolean` | true |
| false-value | 单独使用时的非选中值 | `string \| number \| boolean` | false |
| size | 尺寸，支持 `large` | string | 继承自 CheckboxGroup |
| placement | 勾选图标位置，支持 `left / right` | string | 继承自 CheckboxGroup |
| direction | 布局方向，支持 `horizontal / vertical` | string | 继承自 CheckboxGroup |
| max-width | 文本最大宽度 | string | - |
| custom-label-class | label 文本自定义类名 | string | - |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## CheckboxGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值数组 | `Array<string \| number \| boolean>` | `[]` |
| type | 形状类型，支持 `circle / square / button / dot` | string | circle |
| checked-color | 选中颜色 | string | - |
| unchecked-color | 未选中颜色 | string | - |
| disabled | 是否禁用全部选项 | boolean | false |
| readonly | 是否只读全部选项 | boolean | false |
| min | 最小可选数量 | number | 0 |
| max | 最大可选数量，`0` 表示不限制 | number | 0 |
| size | 尺寸，支持 `large` | string | - |
| placement | 勾选图标位置，支持 `left / right` | string | left |
| direction | 布局方向，支持 `horizontal / vertical` | string | vertical |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Checkbox Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 单独使用时，绑定值变化后触发 | `{ value }` |

## CheckboxGroup Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 组选中值变化后触发 | `{ value }` |

## Checkbox Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| toggle | 切换当前选中状态 | - |

## CheckboxGroup Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| toggleAll | 批量切换全部选项状态 | `boolean \| { checked?: boolean; skipDisabled?: boolean }` |

## Checkbox Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义文本内容 | - |
| icon | 自定义图标 | `{ isChecked }` |

## CheckboxGroup Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 复选框列表内容 | - |

---

---
url: 'https://v2.wot-ui.cn/component/circle.md'
---
# Circle 环形进度条

圆环形进度条组件，支持颜色定制、渐变色、方向控制和插槽内容。

## 组件类型

### 基础用法

通过 `v-model` 绑定当前进度，`text` 控制中间文本。

```html
<wd-circle v-model="current" :text="`${current}%`" />
```

## 组件样式

### 宽度控制

通过 `stroke-width` 控制进度条宽度。

```html
<wd-circle v-model="current" :stroke-width="6" />
```

### 颜色定制

通过 `color` 控制进度条颜色，`layer-color` 控制轨道颜色。

```html
<wd-circle v-model="current" color="#ee0a24" layer-color="#eee" />
```

### 渐变色

`color` 支持对象格式定义渐变色。

```html
<wd-circle v-model="current" :color="gradientColor" />
```

```ts
const gradientColor = {
  '0': 'red',
  '100': 'white'
}
```

### 逆时针方向

设置 `clockwise` 为 `false`，进度从逆时针方向展开。

```html
<wd-circle v-model="current" :clockwise="false" />
```

### 大小定制

通过 `size` 控制圆环直径。

```html
<wd-circle v-model="current" :size="120" />
```

## 内容形态

### 使用默认插槽

不传 `text` 时可使用默认插槽自定义中心内容。

```html
<wd-circle v-model="current" :stroke-width="6">
  <view style="color: red">{{ current }}%</view>
</wd-circle>
```

## 特殊样式

### 进度控制

```html
<wd-button type="primary" size="small" @click="doAdd">增加</wd-button>
<wd-button type="danger" size="small" @click="doDecre">减少</wd-button>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前进度 | number | 0 |
| size | 圆环直径，单位 px | number | 120 |
| color | 进度条颜色，支持字符串或渐变对象 | `string \| Record<string, string>` | `#1C64FD` |
| layer-color | 轨道颜色 | string | `#F2F3F5` |
| fill | 填充颜色 | string | - |
| speed | 动画速度，单位 rate/s | number | 50 |
| text | 圆环中间文字 | string | - |
| stroke-width | 进度条宽度，单位 px | number | 18 |
| stroke-linecap | 端点形状，可选值为 `butt`、`round`、`square` | string | round |
| clockwise | 是否顺时针增加 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义圆环中心内容（仅在 `text` 为空时显示） | - |

---

---
url: 'https://v2.wot-ui.cn/guide/open-wot.md'
---

# CLI

我们在 [Open Wot](https://github.com/wot-ui/open-wot)  中维护了Wot UI 的 AI 工具链仓库，其中对外发布的核心包为 [@wot-ui/cli](https://www.npmjs.com/package/@wot-ui/cli)。它提供命令行工具、MCP Server、离线组件知识库与数据提取脚本，用于把 wot-ui v2 的组件知识接入编辑器、AI Agent 和本地工程分析流程。

## 亮点

* 完全离线：组件 Props、事件、CSS 变量、Demo、Changelog 等元数据随包安装，无需网络请求
* Agent 友好：多数命令支持 `--format json`，适合被工具/脚本消费
* 项目分析：提供 `doctor / usage / lint` 诊断与统计能力
* MCP 集成：通过 `wot mcp` 以 stdio 方式提供 tools，便于集成到支持 MCP 的客户端

## 安装

```bash
npm install -g @wot-ui/cli
```

安装完成后可直接使用 `wot` 命令。

## 快速开始

```bash
wot list
wot info Button
wot demo Button basic
wot doc Button
wot token Button
wot changelog
```

## 命令速查

### 组件知识

* `wot list`：列出可用的 wot-ui 组件
* `wot info <Component>`：查看组件 props、events、slots、CSS 变量
* `wot doc <Component>`：输出组件 Markdown 文档
* `wot demo <Component> [name]`：查看 demo 列表或输出指定 demo 源码
* `wot token [Component]`：查看组件 CSS 变量与默认值
* `wot changelog [version] [component]`：查看版本更新记录

### 项目分析

* `wot doctor [dir]`：检查项目依赖、运行环境与基础集成情况
* `wot usage [dir]`：统计 `.vue` 文件中的 `<wd-*>` 使用情况
* `wot lint [dir]`：检查未知组件、空按钮等规则

### MCP Server

启动 MCP Server：

```bash
wot mcp
```

在支持 MCP 的客户端中添加配置（示例）：

```json
{
  "mcpServers": {
    "wot-ui": {
      "command": "wot",
      "args": ["mcp"]
    }
  }
}
```

当前 MCP Server 提供的 tools 包括：

* `wot_list`
* `wot_info`
* `wot_doc`
* `wot_demo`
* `wot_token`
* `wot_changelog`
* `wot_lint`

## 通用参数

多数查询命令支持以下参数：

* `--format text|json`
* `--version v2`

---

---
url: 'https://v2.wot-ui.cn/component/collapse.md'
---
# Collapse 折叠面板

将一组内容放置在多个折叠面板中，点击面板标题可展开或收起内容。

## 组件类型

### 基本使用

`v-model` 绑定值可为：

* 普通折叠：`string[]`
* 手风琴模式：`string`
* 查看更多模式：`boolean`

```html
<wd-collapse v-model="value">
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
</wd-collapse>
```

## 组件状态

### 禁用

设置 `wd-collapse-item` 的 `disabled` 属性禁用单个面板。

```html
<wd-collapse v-model="value">
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2" disabled>这是一条简单的示例文字。</wd-collapse-item>
</wd-collapse>
```

### 异步更新

通过 `before-expend` 在面板打开前执行拦截，返回 `boolean` 或 `Promise<boolean>`。

```html
<wd-collapse v-model="value">
  <wd-collapse-item v-for="item in itemList" :key="item.name" :title="item.title" :name="item.name" :before-expend="beforeExpend">
    {{ item.body }}
  </wd-collapse-item>
</wd-collapse>
```

```ts
const beforeExpend = (name: string) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 500)
  })
}
```

## 组件变体

### 手风琴

设置 `accordion` 后同一时刻仅展开一项。

```html
<wd-collapse v-model="value" accordion>
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
</wd-collapse>
```

### 查看更多

设置 `viewmore` 后可折叠长文本，`line-num` 控制收起行数。

```html
<wd-collapse v-model="value" viewmore :line-num="3">
  这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
</wd-collapse>
```

## 组件样式

### 自定义标题

使用 `wd-collapse-item` 的 `title` 具名插槽，可获取 `expanded / disabled / isFirst`。

```html
<wd-collapse v-model="value">
  <wd-collapse-item name="item1">
    <template #title="{ expanded }">
      <view class="header">
        <text style="color: red">通过 slot 自定义标题</text>
        <text>{{ expanded ? '我展开了' : '我已收起' }}</text>
      </view>
    </template>
    这是一条简单的示例文字。
  </wd-collapse-item>
</wd-collapse>
```

### 查看更多插槽

查看更多模式下可通过 `use-more-slot` 启用 `more` 插槽，自定义“展开/收起”区域。

```html
<wd-collapse v-model="value" viewmore use-more-slot custom-more-slot-class="more-slot">
  这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
  <template #more>
    <view>显示全部</view>
  </template>
</wd-collapse>
```

## 特殊样式

### 嵌套使用

`collapse` 支持嵌套。由于 `collapse-item` 内容容器存在默认 `padding`，嵌套时建议用 `custom-body-style` 或 `custom-body-class` 覆盖。

```html
<wd-collapse v-model="collapseRoot">
  <wd-collapse-item v-for="item in 5" :key="item" :name="`${item}`" :title="`标签${item}`" custom-body-style="padding:0 0 0 14px">
    <wd-collapse v-model="collapseList[item - 1]">
      <wd-collapse-item v-for="child in itemList" :key="child.name" :name="child.name" :title="child.title">
        {{ child.body }}
      </wd-collapse-item>
    </wd-collapse>
  </wd-collapse-item>
</wd-collapse>
```

### toggleAll

通过 `Collapse` 实例方法 `toggleAll` 批量切换展开状态。

```html
<wd-collapse ref="collapseRef">...</wd-collapse>
```

```ts
collapseRef.value?.toggleAll()
collapseRef.value?.toggleAll(true)
collapseRef.value?.toggleAll(false)
collapseRef.value?.toggleAll({ skipDisabled: true })
collapseRef.value?.toggleAll({ expanded: true, skipDisabled: true })
```

## CollapseItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 折叠栏唯一标识符 | string | - |
| title | 折叠栏标题，支持 `title` 插槽覆盖 | string | `''` |
| disabled | 是否禁用该折叠栏 | boolean | false |
| before-expend | 打开前拦截函数，接收 `name` 参数，返回 `boolean` 或 `Promise<boolean>` | `CollapseItemBeforeExpand` | - |
| border | 是否显示边框 | boolean | true |
| custom-body-class | 折叠栏内容容器自定义类名 | string | `''` |
| custom-body-style | 折叠栏内容容器自定义样式 | string | `''` |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

### CollapseItemBeforeExpand 参数

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| name | 当前折叠栏唯一标识符 | string |

## Collapse Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值。普通模式为 `string[]`，手风琴模式为 `string`，查看更多模式为 `boolean` | `string \| string[] \| boolean` | - |
| accordion | 是否开启手风琴模式 | boolean | false |
| viewmore | 是否开启查看更多模式 | boolean | false |
| use-more-slot | 查看更多模式下是否启用 `more` 插槽 | boolean | false |
| line-num | 查看更多模式下收起显示行数 | number | 2 |
| custom-more-slot-class | 查看更多模式下 `more` 插槽外部自定义类名 | string | `''` |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 绑定值变化时触发 | `{ value }` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| toggleAll | 切换所有面板展开状态。传 `true` 全部展开，`false` 全部收起，不传为全部切换 | `options?: CollapseToggleAllOptions` |

### CollapseToggleAllOptions

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expanded | 是否展开，`true` 展开，`false` 收起 | boolean | - |
| skipDisabled | 是否跳过禁用项 | boolean | false |

## Collapse Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 面板内容或面板项列表 | - |
| more | 查看更多模式下自定义展开收起区域 | - |

## CollapseItem Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| title | 自定义标题区域 | `{ expanded, disabled, isFirst }` |
| default | 折叠栏内容 | - |

---

---
url: 'https://v2.wot-ui.cn/component/config-provider.md'
---
# ConfigProvider 全局配置

用于为 `Wot` 组件提供主题模式和主题变量配置，支持深色模式、主题定制和跨组件树共享配置。

## 组件类型

### 深色模式

将 `theme` 设置为 `dark` 后，可以让当前 `ConfigProvider` 包裹范围内的 `Wot` 组件切换为深色风格。

::: warning 注意
使用深色模式前，需要在入口文件（如 `App.vue`）中引入主题变量文件：

* npm 安装：`@use '@wot-ui/ui/styles/theme/index.scss' as *;`
* uni\_modules 安装：`@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;`
  :::

::: tip 提示
`ConfigProvider` 只影响 `Wot` 组件自身的主题表现，不会自动修改页面全局文本色或背景色。你可以结合全局样式自行处理页面背景和文本颜色。
:::

::: code-group

```vue [vue]
<wd-config-provider theme="dark">
  <wd-button type="primary">深色模式按钮</wd-button>
</wd-config-provider>
```

```scss [App.vue - npm]
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```

```scss [App.vue - uni_modules]
/* App.vue */
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```

:::

## 切换主题

通过响应式地更新 `theme`，可以在浅色和深色模式之间切换。

::: code-group

```vue [vue]
<wd-config-provider :theme="theme">
  <wd-button type="primary">当前模式：{{ theme }}</wd-button>
</wd-config-provider>
```

```ts [ts]
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')

setTimeout(() => {
  theme.value = 'dark'
}, 1000)
```

```scss [App.vue - npm]
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```

```scss [App.vue - uni_modules]
/* App.vue */
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```

:::

## 主题定制

### 通过 CSS 变量覆盖

`Wot UI` 组件通过 CSS 变量组织样式。你可以直接覆盖这些变量来调整组件外观。

```css
:root,
page {
  --wot-button-primary-bg: green;
}
```

### 通过 ConfigProvider 覆盖

`ConfigProvider` 支持通过 `theme-vars` 覆盖主题变量，仅影响当前包裹范围内的组件。

::: tip 提示
`ConfigProvider` 仅影响它的子组件样式，不会直接修改全局 `root` 节点样式。
:::

::: code-group

```html [vue]
<wd-config-provider :theme-vars="themeVars">
  <view style="margin: 16px">
    <wd-button round block type="primary">提交</wd-button>
  </view>
</wd-config-provider>
```

```ts [ts]
import { reactive } from 'vue'

const themeVars = reactive({
  buttonPrimaryBg: '#07c160',
  buttonPrimaryColor: '#ffffff'
})
```

:::

### 在 TypeScript 中使用

在 TypeScript 中定义 `themeVars` 时，建议使用组件库提供的 `ConfigProviderThemeVars` 类型，以获得完整的类型提示。

::: code-group

```ts [ts]
import type { ConfigProviderThemeVars } from '@wot-ui/ui'

const themeVars: ConfigProviderThemeVars = {
  buttonPrimaryBgColor: '#07c160',
  buttonPrimaryColor: '#ffffff'
}
```

```ts [ts]
import type { ConfigProviderThemeVars } from '@/uni_modules/wot-ui/components/wd-config-provider/types'

const localThemeVars: ConfigProviderThemeVars = {
  cellTitleColor: '#4d80f0'
}
```

:::

## 特殊样式

### 全局共享

如需在应用层共享主题配置，可以结合虚拟根组件 [uni-ku-root](https://github.com/uni-ku/root) 使用。

#### 安装

::: code-group

```bash [npm]
npm i -D @uni-ku/root
```

```bash [yarn]
yarn add -D @uni-ku/root
```

```bash [pnpm]
pnpm add -D @uni-ku/root
```

:::

#### 引入

* CLI 项目：直接编辑根目录下的 vite.config.(js|ts)
* HBuilderX 项目：需要在根目录下创建 vite.config.(js|ts)

```ts
import { defineConfig } from 'vite'
import UniKuRoot from '@uni-ku/root'
import Uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [UniKuRoot(), Uni()]
})
```

::: tip
若存在会修改 pages.json 的插件，需要将 `UniKuRoot` 放置在这些插件之后。
:::

#### 使用

1. 创建根组件并处理全局配置组件。

```vue
<script setup lang="ts">
import { useTheme } from './composables/useTheme'

const { theme, themeVars } = useTheme({
  buttonPrimaryBgColor: '#07c160',
  buttonPrimaryColor: '#ffffff'
})
</script>

<template>
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <KuRootView />
  </wd-config-provider>
</template>
```

2. 编写控制主题的组合式函数。

```ts
import type { ConfigProviderThemeVars } from '@wot-ui/ui'
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')
const themeVars = ref<ConfigProviderThemeVars>()

export function useTheme(vars?: ConfigProviderThemeVars) {
  if (vars) themeVars.value = vars

  function toggleTheme(mode?: 'light' | 'dark') {
    theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    themeVars,
    toggleTheme
  }
}
```

3. 在任意页面中使用切换主题模式。

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">切换主题，当前模式：{{ theme }}</button>
</template>
```

## 组合式函数

### useConfigProvider

详细文档请查看 [useConfigProvider](/component/use-config-provider)。

在微信小程序等环境中，由于组件渲染机制限制，被渲染在插槽中的组件或通过 `root-portal` 移动到根节点的组件，可能无法继承外层 `ConfigProvider` 的 provide 上下文。为了解决这个问题，组件库提供了 `useConfigProvider`，允许你在逻辑层显式注入配置。

#### 引入

```ts
import { useConfigProvider } from '@wot-ui/ui'
```

#### 使用

`useConfigProvider` 接受一个包含 `themeVars` 的对象，`themeVars` 支持普通对象、`reactive` 对象或 `Ref` 对象。

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { useConfigProvider } from '@wot-ui/ui'

const themeVars = reactive({
  buttonPrimaryBg: '#07c160',
  buttonPrimaryColor: '#ffffff'
})

useConfigProvider({ themeVars })
</script>
```

## ConfigProvider Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 主题风格，可选值为 `light`、`dark` | string | `light` |
| theme-vars | 自定义主题变量 | `ConfigProviderThemeVars` | `{}` |
| custom-class | 根节点自定义样式类 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## ConfigProvider Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于包裹需要应用主题的子组件 |

---

---
url: 'https://v2.wot-ui.cn/component/count-down.md'
---
# CountDown 倒计时

用于实时展示倒计时数值，支持毫秒级渲染与手动控制。

## 组件类型

### 基础用法

`time` 表示倒计时总时长，单位毫秒。

```html
<wd-count-down :time="time" />
```

```ts
const time = ref<number>(30 * 60 * 60 * 1000)
```

## 组件变体

### 自定义格式

通过 `format` 自定义展示格式。

```html
<wd-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
```

### 毫秒级渲染

设置 `millisecond` 开启毫秒级渲染。

```html
<wd-count-down :time="time" millisecond format="HH:mm:ss:SS" />
```

## 组件样式

### 自定义样式

使用默认插槽自定义倒计时内容，插槽参数见下方 `TimeData`。

```html
<wd-count-down :time="time">
  <template #default="{ current }">
    <span class="custom-count-down">{{ current.hours }}</span>
    <span class="custom-count-down-colon">:</span>
    <span class="custom-count-down">{{ current.minutes }}</span>
    <span class="custom-count-down-colon">:</span>
    <span class="custom-count-down">{{ current.seconds }}</span>
  </template>
</wd-count-down>
```

## 特殊样式

### 手动控制

通过实例方法控制开始、暂停、重置。

```html
<wd-count-down ref="countDown" :time="3000" millisecond :auto-start="false" format="ss:SSS" @finish="onFinish" />
<wd-grid clickable border>
  <wd-grid-item text="开始" icon="play-circle" @click="start" />
  <wd-grid-item text="暂停" icon="pause-circle" @click="pause" />
  <wd-grid-item text="重置" icon="refresh" @click="reset" />
</wd-grid>
```

```ts
const countDown = ref<CountDownInstance>()

const start = () => countDown.value?.start()
const pause = () => countDown.value?.pause()
const reset = () => countDown.value?.reset()
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| time | 倒计时时长，单位毫秒 | number | - |
| millisecond | 是否开启毫秒级渲染 | boolean | false |
| format | 倒计时格式化字符串 | string | `HH:mm:ss` |
| auto-start | 是否在初始化和重置后自动开始倒计时 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 倒计时变化时触发 | `current: TimeData` |
| finish | 倒计时结束时触发 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始倒计时 | - |
| pause | 暂停倒计时 | - |
| reset | 重置倒计时；若 `auto-start` 为 `true`，重置后自动开始 | - |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义倒计时展示内容 | `{ current: TimeData }` |

### format 格式

| 格式 | 说明 |
| --- | --- |
| DD | 天数 |
| HH | 小时 |
| mm | 分钟 |
| ss | 秒数 |
| S | 毫秒（1 位） |
| SS | 毫秒（2 位） |
| SSS | 毫秒（3 位） |

### TimeData 对象

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| total | 剩余总毫秒数 | number |
| days | 天 | number |
| hours | 小时 | number |
| minutes | 分钟 | number |
| seconds | 秒 | number |
| milliseconds | 毫秒 | number |

---

---
url: 'https://v2.wot-ui.cn/component/count-to.md'
---
# CountTo 数字滚动

用于数字滚动展示，支持主题、前后缀、小数精度与手动控制。

## 组件类型

### 基本用法

设置 `end-val` 指定最终值，`start-val` 指定起始值，`duration` 指定滚动时长（ms）。

```html
<wd-count-to :end-val="2024" suffix="年" color="#16baaa" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="186.321" suffix="%" color="#1e9fff" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="21286.321" suffix="%" color="#ff5722" />
<wd-count-to prefix="￥" :start-val="0" :decimals="2" :end-val="21286.321" suffix="%" color="#ffb800" :duration="2000" />
```

## 组件样式

### 设置主题

通过 `type` 设置文本主题，可选值为 `default`、`primary`、`success`、`warning`、`error`。

```html
<wd-count-to type="primary" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="error" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="success" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="warning" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
<wd-count-to type="default" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
```

## 特殊样式

### 手动控制

设置 `auto-start="false"` 后，可通过实例方法手动开始、暂停、重置。

```html
<wd-count-to ref="countTo" :auto-start="false" prefix="￥" :start-val="1000" :decimals="3" :end-val="9999.32" suffix="%" color="#1e9fff" />
<wd-grid clickable border>
  <wd-grid-item text="开始" icon="play-circle" @click="start" />
  <wd-grid-item text="暂停" icon="pause-circle" @click="pause" />
  <wd-grid-item text="重置" icon="refresh" @click="reset" />
</wd-grid>
```

```ts
import type { CountToInstance } from '@/uni_modules/wot-ui/components/wd-count-to/types'

const countTo = ref<CountToInstance>()

const start = () => countTo.value?.start()
const pause = () => countTo.value?.pause()
const reset = () => countTo.value?.reset()
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 文本颜色 | string | `''` |
| type | 主题类型，可选值为 `default`、`primary`、`success`、`warning`、`error` | string | default |
| start-val | 起始值 | number | 0 |
| end-val | 最终值 | number | 2024 |
| duration | 从起始值到结束值数字变动的时间（毫秒） | number | 3000 |
| auto-start | 是否自动开始 | boolean | true |
| decimals | 保留的小数位数，需大于等于 0 | number | 0 |
| decimal | 小数点符号 | string | `.` |
| separator | 千分位分隔符 | string | `,` |
| prefix | 前缀文本 | string | `''` |
| suffix | 后缀文本 | string | `''` |
| use-easing | 是否使用缓动动画 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| mounted | 组件加载完成时触发 | - |
| finish | 动画完成时触发 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始动画 | - |
| pause | 暂停动画 | - |
| reset | 重置动画；若 `auto-start` 为 `true`，重置后自动开始 | - |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 主体数字内容 | - |
| prefix | 前缀内容 | - |
| suffix | 后缀内容 | - |

---

---
url: 'https://v2.wot-ui.cn/component/curtain.md'
---
# Curtain 幕帘

一般用于公告类图片弹窗展示。

## 组件类型

### 基本用法

通过 `v-model` 控制显示与隐藏；`src` 为幕帘图片地址；`to` 为点击图片后的跳转链接；`width` 为图片宽度（高度按原图比例自动计算）。

```html
<wd-button @click="open = true">展示幕帘</wd-button>
<wd-curtain v-model="open" :src="img" :to="link" :width="280" />
```

## 组件样式

### 修改关闭按钮位置

`close-position` 可选值为 `inset`、`top`、`bottom`、`top-left`、`top-right`、`bottom-left`、`bottom-right`。

```html
<wd-curtain v-model="showTopLeft" :src="img" :to="link" close-position="top-left" :width="280" />
<wd-curtain v-model="showTop" :src="img" :to="link" close-position="top" :width="280" />
<wd-curtain v-model="showTopRight" :src="img" :to="link" close-position="top-right" :width="280" />
```

## 组件状态

### 点击遮罩可关闭

设置 `close-on-click-modal` 后，点击遮罩会关闭幕帘。

```html
<wd-curtain v-model="open" :src="img" :to="link" close-position="bottom-right" :width="280" close-on-click-modal />
```

## 特殊样式

### 自定义关闭按钮

通过 `close` 插槽自定义关闭按钮内容和交互。

```html
<wd-curtain v-model="open" :src="img" :width="280">
  <template #close>
    <view class="custom-close" @click="open = false">关闭</view>
  </template>
</wd-curtain>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 绑定值，控制幕帘显示与关闭 | boolean | false |
| value | 绑定值（已废弃，请使用 `modelValue`） | boolean | false |
| src | 幕帘图片地址，必须使用网络地址 | string | - |
| width | 幕帘图片宽度，默认单位 px | number | - |
| to | 幕帘图片点击链接 | string | - |
| close-position | 关闭按钮位置，可选值为 `inset`、`top`、`bottom`、`top-left`、`top-right`、`bottom-left`、`bottom-right` | string | `inset` |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | false |
| hide-when-close | 关闭时是否隐藏弹出层（`display: none`） | boolean | true |
| z-index | 设置层级 | number | 10 |
| custom-close-class | 关闭按钮自定义类名 | string | `''` |
| custom-close-style | 关闭按钮自定义样式 | string | `''` |
| root-portal | 是否从页面中脱离，用于解决 fixed 失效问题（H5: teleport，App: renderjs，小程序: root-portal） | boolean | false |
| show-menu-by-longpress | 开启长按图片显示识别小程序码菜单，仅微信小程序支持 | boolean | false |
| close-on-click | 点击图片时是否关闭幕帘 | boolean | true |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击幕帘图片时触发 | - |
| close | 弹出层关闭时触发 | - |
| closed | 弹出层关闭动画结束后触发 | - |
| click-modal | 点击遮罩时触发 | - |
| beforeenter | 进入前触发 | - |
| enter | 进入时触发 | - |
| afterenter | 进入后触发 | - |
| beforeleave | 离开前触发 | - |
| leave | 离开时触发 | - |
| afterleave | 离开后触发 | - |
| load | 图片加载完成时触发 | `event` |
| error | 图片加载失败时触发。图片加载失败后，即使 `modelValue` 为 `true` 也不会展示幕帘 | - |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| close | 自定义关闭按钮 | - |

---

---
url: 'https://v2.wot-ui.cn/component/datetime-picker.md'
---
# DatetimePicker 日期时间选择器

对 `DatetimePickerView` 的封装组件，内置日期时间列构建与弹窗交互。

## 组件类型

### 基本用法

`v-model` 绑定当前值，点击确认后通过 `confirm` 返回结果。

```html
<wd-datetime-picker v-model="value" v-model:visible="show" @confirm="handleConfirm" />
```

```ts
const value = ref<number>(Date.now())
const show = ref(false)
const handleConfirm = ({ value }: { value: number | string | Array<number | string> }) => {
  console.log(value)
}
```

### 限制可选时间范围

使用 `min-date` 和 `max-date` 约束日期范围。

```html
<wd-datetime-picker v-model="value" v-model:visible="show" :min-date="minDate" :max-date="maxDate" />
```

```ts
const value = ref<number>(Date.now())
const show = ref(false)
const minDate = new Date(new Date().getFullYear(), 0, 1).getTime()
const maxDate = new Date(new Date().getFullYear() + 1, 11, 31, 23, 59, 59).getTime()
```

## 组件状态

### 确定前校验

设置 `before-confirm`，在点击确定时执行拦截校验，支持返回 `boolean` 或 `Promise<boolean>`。

```html
<wd-datetime-picker v-model="value" v-model:visible="show" :before-confirm="beforeConfirm" />
```

```ts
const value = ref<number>(Date.now())
const show = ref(false)
const beforeConfirm = (value: number | string | Array<number | string>) => {
  if (Array.isArray(value)) return true
  if (typeof value === 'number') return value <= Date.now()
  return true
}
```

## 组件变体

### 类型切换

支持 `datetime`、`date`、`year-month`、`year`、`time` 五种类型。

::: code-group

```html [模板]
<wd-datetime-picker v-model="dateValue" type="date" />
<wd-datetime-picker v-model="yearMonthValue" type="year-month" />
<wd-datetime-picker v-model="yearValue" type="year" />
<wd-datetime-picker v-model="timeValue" type="time" />
<wd-datetime-picker v-model="datetimeValue" type="datetime" />
```

```ts [脚本]
const dateValue = ref<number>(Date.now())
const yearMonthValue = ref<number>(Date.now())
const yearValue = ref<number>(Date.now())
const timeValue = ref<string>('09:20')
const datetimeValue = ref<number>(Date.now())
```

:::

### 开启秒选择

在 `time` 和 `datetime` 类型下可通过 `use-second` 显示秒。

```html
<wd-datetime-picker v-model="timeValue" type="time" use-second />
<wd-datetime-picker v-model="value" type="datetime" use-second />
```

```ts
const timeValue = ref<string>('09:20:30')
const value = ref<number>(Date.now())
```

### 区间选择

当 `v-model` 为数组时开启区间选择模式。

```html
<wd-datetime-picker v-model="rangeValue" v-model:visible="show" />
```

```ts
const rangeValue = ref<(string | number)[]>(['', Date.now()])
const show = ref(false)
```

## 组件样式

### 自定义列项格式

通过 `formatter` 自定义滚筒内选项文案。

```html
<wd-datetime-picker v-model="value" :formatter="formatter" />
```

```ts
const formatter = (type: string, value: number) => {
  switch (type) {
    case 'year':
      return `${value}年`
    case 'month':
      return `${value}月`
    case 'date':
      return `${value}日`
    case 'hour':
      return `${value}时`
    case 'minute':
      return `${value}分`
    case 'second':
      return `${value}秒`
    default:
      return `${value}`
  }
}
```

### 过滤列选项

通过 `filter` 过滤可选项列表。

```html
<wd-datetime-picker v-model="value" :filter="filter" />
```

```ts
const filter = ({ type, values }: { type: string; values: number[] }) => {
  if (type === 'minute') {
    return values.filter((value) => value % 5 === 0)
  }
  return values
}
```

### 自定义区间 Tab 文案

区间选择模式下通过 `display-format-tab-label` 格式化开始/结束标签显示。

```html
<wd-datetime-picker v-model="rangeValue" :display-format-tab-label="displayFormatTabLabel" />
```

```ts
const displayFormatTabLabel = (items: Array<{ label: string | number }>) => {
  return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 绑定值。`time` 类型为字符串；区间模式为数组；其余类型为时间戳 | `string \| number \| Array<string \| number>` | - |
| visible / v-model:visible | 是否显示弹窗 | boolean | false |
| type | 选择器类型，可选值为 `datetime`、`date`、`year-month`、`time`、`year` | string | datetime |
| title | 弹出层标题 | string | - |
| cancel-button-text | 取消按钮文案 | string | - |
| confirm-button-text | 确认按钮文案 | string | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | true |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离 | boolean | true |
| item-height | 单项高度 | number | 44 |
| visible-item-count | 可见项数量 | number | 6 |
| value-key | 选项值字段名 | string | value |
| label-key | 选项文案字段名 | string | label |
| min-date | 最小日期（时间戳） | number | 当前年份前 10 年 1 月 1 日 |
| max-date | 最大日期（时间戳） | number | 当前年份后 10 年 12 月 31 日 23:59:59 |
| min-hour | 最小小时（`time` 类型生效） | number | 0 |
| max-hour | 最大小时（`time` 类型生效） | number | 23 |
| min-minute | 最小分钟（`time` 类型生效） | number | 0 |
| max-minute | 最大分钟（`time` 类型生效） | number | 59 |
| use-second | 是否显示秒选择，仅 `time` 和 `datetime` 生效 | boolean | false |
| min-second | 最小秒数，仅 `time` 和 `datetime` 生效 | number | 0 |
| max-second | 最大秒数，仅 `time` 和 `datetime` 生效 | number | 59 |
| formatter | 自定义滚筒选项格式化函数 | DatetimePickerViewFormatter | - |
| filter | 自定义过滤函数 | DatetimePickerViewFilter | - |
| before-confirm | 确定前校验函数，接收 `(value)`，返回 `boolean` 或 `Promise<boolean>` | DatetimePickerBeforeConfirm | - |
| display-format-tab-label | 区间模式下自定义 Tab 标签格式化函数 | DatetimePickerDisplayFormatTabLabel | - |
| z-index | 弹窗层级 | number | 15 |
| immediate-change | 是否在手指松开时立即触发 change（仅微信/支付宝小程序） | boolean | false |
| root-portal | 是否脱离文档流渲染（H5: teleport，App: renderjs，小程序: root-portal） | boolean | false |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |
| custom-view-class | pickerView 外部自定义样式类 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开弹窗时触发 | - |
| cancel | 点击取消或关闭弹窗时触发 | - |
| confirm | 点击确认按钮触发 | `{ value }` |
| change | 选中值变化时触发 | `{ value }` |
| toggle | 区间模式切换开始/结束 Tab 时触发 | 当前激活 Tab 对应的值 |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开 picker 弹框 | - |
| close | 关闭 picker 弹框 | - |

---

---
url: 'https://v2.wot-ui.cn/component/datetime-picker-view.md'
---
# DatetimePickerView 日期时间选择器视图

用于构建日期时间滚筒选项的基础视图组件。

## 组件类型

### 基本用法

`v-model` 绑定选中值；默认 `datetime` 类型，值为时间戳。

```html
<wd-datetime-picker-view v-model="value" @change="handleChange" />
```

```ts
const value = ref<number>(Date.now())
const handleChange = ({ value }: { value: number | string }) => {
  console.log(value)
}
```

## 组件变体

### 日期类型

支持 `datetime`、`date`、`year-month`、`year`、`time` 五种类型。

::: code-group

```html [模板]
<wd-datetime-picker-view type="date" v-model="dateValue" />
<wd-datetime-picker-view type="year-month" v-model="yearMonthValue" />
<wd-datetime-picker-view type="year" v-model="yearValue" />
<wd-datetime-picker-view type="time" v-model="timeValue" />
<wd-datetime-picker-view type="datetime" v-model="datetimeValue" />
```

```ts [脚本]
const dateValue = ref<number>(Date.now())
const yearMonthValue = ref<number>(Date.now())
const yearValue = ref<number>(Date.now())
const timeValue = ref<string>('11:12')
const datetimeValue = ref<number>(Date.now())
```

:::

### 开启秒选择

在 `time` 和 `datetime` 类型下可通过 `use-second` 展示秒列。

```html
<wd-datetime-picker-view type="time" v-model="timeValue" use-second />
<wd-datetime-picker-view type="datetime" v-model="value" use-second />
```

```ts
const timeValue = ref<string>('11:12:30')
const value = ref<number>(Date.now())
```

## 组件样式

### 修改内部格式

通过 `formatter` 自定义滚筒文案格式。

```html
<wd-datetime-picker-view v-model="value" :formatter="formatter" />
```

```ts
const formatter = (type: string, value: number) => {
  switch (type) {
    case 'year':
      return `${value}年`
    case 'month':
      return `${value}月`
    case 'date':
      return `${value}日`
    case 'hour':
      return `${value}时`
    case 'minute':
      return `${value}分`
    case 'second':
      return `${value}秒`
    default:
      return `${value}`
  }
}
```

### 过滤选项

通过 `filter` 按列过滤可选值。

```html
<wd-datetime-picker-view v-model="value" :filter="filter" />
```

```ts
const filter = ({ type, values }: { type: string; values: number[] }) => {
  if (type === 'minute') {
    return values.filter((value) => value % 5 === 0)
  }
  return values
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 选中项，`time` 类型为字符串，其余类型为时间戳 | `string \| number` | - |
| type | 选择器类型，可选值为 `datetime`、`date`、`year-month`、`time`、`year` | DateTimeType | datetime |
| item-height | 单项高度 | number | 44 |
| visible-item-count | 可见项数量 | number | 6 |
| value-key | 选项值字段名 | string | value |
| label-key | 选项文案字段名 | string | label |
| formatter | 自定义选项文案格式化函数 | DatetimePickerViewFormatter | - |
| filter | 自定义过滤函数 | DatetimePickerViewFilter | - |
| column-formatter | 自定义列格式化函数 | DatetimePickerViewColumnFormatter | - |
| min-date | 最小日期（时间戳） | number | 当前年份前 10 年 1 月 1 日 |
| max-date | 最大日期（时间戳） | number | 当前年份后 10 年 12 月 31 日 |
| min-hour | 最小小时（`time` 类型生效） | number | 0 |
| max-hour | 最大小时（`time` 类型生效） | number | 23 |
| min-minute | 最小分钟（`time` 类型生效） | number | 0 |
| max-minute | 最大分钟（`time` 类型生效） | number | 59 |
| use-second | 是否显示秒选择，仅 `time` 和 `datetime` 生效 | boolean | false |
| min-second | 最小秒数，仅 `time` 和 `datetime` 生效 | number | 0 |
| max-second | 最大秒数，仅 `time` 和 `datetime` 生效 | number | 59 |
| immediate-change | 是否在手指松开时立即触发 change（仅微信/支付宝小程序） | boolean | false |
| boundary-min-date | 区间模式开始时间最小边界（用于联动） | number | - |
| boundary-max-date | 区间模式结束时间最大边界（用于联动） | number | - |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选中项变化时触发 | `{ value, columns }` |
| pickstart | 滚动开始时触发 | - |
| pickend | 滚动结束时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| getSelectedOptions | 获取当前选中项对象数组 | - |
| correctValue | 纠正并返回合法值 | `value: string \| number` |
| getOriginColumns | 获取原始列定义 | - |

## Types

### DatetimePickerViewColumn

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| type | 列类型 | `year \| month \| date \| hour \| minute \| second` |
| values | 当前列可选值数组 | number\[] |

### DatetimePickerViewOption

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项值 | number |
| label | 选项展示文本 | string |
| disabled | 是否禁用 | boolean |

---

---
url: 'https://v2.wot-ui.cn/component/dialog.md'
---
# Dialog 弹框

弹出对话框，常用于消息提示、操作确认和输入收集，支持函数式调用。

:::tip 提示
全局调用方案见 [wot-starter](https://starter.wot-ui.cn/guide/feedback.html)，可用于路由守卫、请求拦截器等场景。
:::

## 组件类型

### Alert 弹框

Alert 仅展示确认按钮，常用于消息通知。

```html
<wd-dialog />
<wd-button @click="openAlert">打开 Alert</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openAlert = () => {
  dialog.alert({
    title: '提示',
    msg: '操作成功'
  })
}
```

### Confirm 弹框

Confirm 通过 `Promise` 返回用户操作结果，`then` 对应确认，`catch` 对应取消。

```html
<wd-dialog />
<wd-button @click="openConfirm">打开 Confirm</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openConfirm = () => {
  dialog
    .confirm({
      title: '提示',
      msg: '确认执行此操作吗？'
    })
    .then(() => {
      console.log('点击了确认')
    })
    .catch(() => {
      console.log('点击了取消')
    })
}
```

### Prompt 弹框

Prompt 会展示输入框，可用于采集文本并进行校验。

```html
<wd-dialog />
<wd-button @click="openPrompt">打开 Prompt</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openPrompt = () => {
  dialog
    .prompt({
      title: '请输入邮箱',
      inputPattern: /.+@.+\..+/i,
      inputError: '邮箱格式不正确'
    })
    .then((res) => {
      console.log(res.value)
    })
}
```

## 组件状态

### 确认前校验

`beforeConfirm` 接收当前输入值，支持返回 `boolean` 或 `Promise<boolean>`，返回 `false` 时会拦截关闭。

```html
<wd-dialog />
<wd-button @click="openBeforeConfirm">确认前校验</wd-button>
```

```ts
import { useDialog, useToast } from '@/uni_modules/wot-ui'

const dialog = useDialog()
const toast = useToast()

const openBeforeConfirm = () => {
  dialog.confirm({
    title: '删除确认',
    msg: '确定删除该记录吗？',
    beforeConfirm: () => {
      toast.loading('删除中...')
      return new Promise((resolve) => {
        setTimeout(() => {
          toast.close()
          resolve(true)
        }, 1500)
      })
    }
  })
}
```

### 输入校验

Prompt 同时支持正则校验 `input-pattern` 与函数校验 `input-validate`。

```html
<wd-dialog />
<wd-button @click="openPromptValidate">输入校验</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openPromptValidate = () => {
  dialog.prompt({
    title: '请输入手机号',
    inputProps: {
      type: 'tel',
      placeholder: '请输入 11 位手机号'
    },
    inputValidate: (value) => /^1[3-9]\d{9}$/.test(String(value)),
    inputError: '手机号格式不正确'
  })
}
```

## 组件变体

### 风格与布局

通过 `theme` 与 `action-layout` 控制弹框按钮风格和排列方式。

```html
<wd-dialog />
<wd-button @click="openTextTheme">Text 风格 + 纵向布局</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openTextTheme = () => {
  dialog.confirm({
    title: '版本更新',
    msg: '发现新版本，是否立即更新？',
    theme: 'text',
    actionLayout: 'vertical'
  })
}
```

### 自定义操作按钮

通过 `actions` 可以定义多个按钮。`actions` 与 `confirm-button-props` / `cancel-button-props` 同时配置时优先使用 `actions`。

```html
<wd-dialog />
<wd-button @click="openActions">自定义操作按钮</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openActions = () => {
  dialog.show({
    title: '选择支付方式',
    actionLayout: 'vertical',
    actions: [
      { text: '微信支付', type: 'success', block: true },
      { text: '支付宝', type: 'primary', block: true },
      { text: '取消', block: true }
    ]
  })
}
```

## 组件样式

### 图标与头图

可通过 `icon`、`icon-color`、`icon-props`、`header-image` 配置视觉样式。

```html
<wd-dialog />
<wd-button @click="openStyledDialog">图标和头图</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openStyledDialog = () => {
  dialog.alert({
    title: '活动通知',
    msg: '恭喜您获得专属权益',
    icon: 'success',
    headerImage: 'https://example.com/banner.png'
  })
}
```

### 自定义按钮样式

可通过 `confirm-button-props`、`cancel-button-props` 透传按钮属性。

```html
<wd-dialog />
<wd-button @click="openCustomButtons">自定义按钮样式</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openCustomButtons = () => {
  dialog.confirm({
    title: '提示',
    msg: '是否继续？',
    confirmButtonProps: {
      type: 'success',
      customClass: 'custom-shadow'
    },
    cancelButtonProps: {
      type: 'danger',
      customClass: 'custom-shadow'
    }
  })
}
```

## 特殊样式

### 插槽

通过 `selector` 区分多个实例，并使用 `useDialog(selector)` 调用指定弹框。

```html
<wd-dialog selector="wd-dialog-slot">
  <wd-rate v-model="rate" />
</wd-dialog>
<wd-button @click="openSlotDialog">打开插槽弹框</wd-button>
```

```ts
import { ref } from 'vue'
import { useDialog } from '@/uni_modules/wot-ui'

const rate = ref(1)
const slotDialog = useDialog('wd-dialog-slot')

const openSlotDialog = () => {
  slotDialog.confirm({
    title: '请为我们评分'
  })
}
```

### OpenType

`confirm-button-props`、`cancel-button-props` 与 `actions` 支持透传按钮开放能力属性（如 `openType`）及对应事件回调。

```html
<wd-dialog />
<wd-button @click="openOpenTypeDialog">获取手机号</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openOpenTypeDialog = () => {
  dialog.confirm({
    title: '获取手机号',
    confirmButtonProps: {
      text: '授权获取',
      openType: 'getPhoneNumber',
      onGetphonenumber: (detail) => {
        console.log(detail)
      }
    }
  })
}
```

## Methods

`useDialog()` 返回如下方法：

| 方法名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| show | 打开弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| alert | 打开 Alert 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| confirm | 打开 Confirm 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| prompt | 打开 Prompt 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| close | 关闭当前弹框 | - | `void` |

## Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | `''` |
| msg | 消息内容 | `string` | `''` |
| type | 弹框类型，可选值为 `alert`、`confirm`、`prompt` | `DialogType` | `'alert'` |
| theme | 按钮风格，可选值为 `button`、`text` | `DialogTheme` | `'button'` |
| zIndex | 弹窗层级 | `number` | `99` |
| lazyRender | 弹层内容懒渲染 | `boolean` | `true` |
| headerImage | 顶部通栏图片地址 | `string` | - |
| icon | 图标名称。可选值为 `success`、`info`、`warning`、`danger`，也可传自定义图标名 | `string` | - |
| iconColor | 图标颜色 | `string` | - |
| iconProps | 透传 `wd-icon` 的属性 | `Partial<IconProps>` | - |
| inputValue | Prompt 输入框初始值 | `string \| number` | - |
| inputProps | Prompt 模式下 `wd-input` 属性 | `Partial<InputProps>` | - |
| textareaProps | Prompt 模式下 `wd-textarea` 属性 | `Partial<TextareaProps>` | - |
| inputPattern | Prompt 输入正则校验规则 | `RegExp` | - |
| inputValidate | Prompt 输入函数校验规则，返回 `boolean` 或错误信息字符串 | `(inputValue: string \| number) => boolean \| string` | - |
| inputError | Prompt 校验失败提示文案 | `string` | - |
| showErr | 是否展示错误信息 | `boolean` | `false` |
| actionLayout | 操作按钮排列方式，可选值为 `horizontal`、`vertical` | `DialogActionLayout` | `'horizontal'` |
| showCancelButton | 是否显示取消按钮 | `boolean` | `alert` 为 false，`confirm/prompt` 为 true |
| confirmButtonText | 确认按钮文案 | `string` | - |
| cancelButtonText | 取消按钮文案 | `string` | - |
| confirmButtonProps | 确认按钮高级配置，支持传字符串、对象或 `null` | `DialogBoxButtonOption` | `{}` |
| cancelButtonProps | 取消按钮高级配置，支持传字符串、对象或 `null` | `DialogBoxButtonOption` | 由 `showCancelButton` 推导 |
| actions | 自定义操作按钮数组，配置后优先级高于确认/取消按钮 | `DialogAction[]` | - |
| closeOnClickModal | 是否支持点击遮罩关闭，触发 `fail` 回调，返回 `action` 为 `'modal'` | `boolean` | `false` |
| showClose | 是否显示右上角关闭按钮，点击后触发 `fail` 回调，返回 `action` 为 `'close'` | `boolean` | `false` |
| beforeConfirm | 确认前拦截函数，返回 `boolean` 或 `Promise<boolean>` | `DialogBeforeConfirm` | - |

## Attributes

`wd-dialog` 组件实例支持以下属性：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 指定唯一标识，用于区分页面中的多个实例 | `string` | `''` |
| root-portal | 是否脱离页面文档流渲染，用于解决 fixed 失效问题 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| header | 自定义头部区域 | - |
| image | 自定义图片区域 | - |
| title | 自定义标题区域 | `{ icon, title, iconProps }` |
| default | 自定义内容区域 | `{ msg, type, inputValue, showErr, inputError }` |
| actions | 自定义操作区 | `{ confirm, cancel, close }` |

---

---
url: 'https://v2.wot-ui.cn/component/divider.md'
---
# Divider 分割线

用于将内容分隔为多个区域。

## 组件类型

### 基本使用

默认渲染一条水平分割线。

```html
<wd-divider />
```

### 展示文本

使用默认插槽在分割线中间插入内容。

```html
<wd-divider>展示文本</wd-divider>
```

## 组件变体

### 内容位置

通过 `content-position` 指定内容所在位置。

```html
<wd-divider>中间</wd-divider>
<wd-divider content-position="left">左侧</wd-divider>
<wd-divider content-position="right">右侧</wd-divider>
```

### 虚线

添加 `dashed` 使分割线渲染为虚线。

```html
<wd-divider dashed>虚线分割</wd-divider>
```

## 组件样式

### 自定义渲染内容

使用默认插槽渲染自定义内容。

```html
<wd-divider>
  <wd-icon name="down" size="20" />
</wd-divider>
```

### 自定义颜色

设置 `color` 自定义分割线颜色。

```html
<wd-divider color="#4D80F0">自定义颜色</wd-divider>
```

## 特殊样式

### 垂直分割线

添加 `vertical` 使分割线渲染为垂直方向，垂直模式下默认插槽不生效。

```html
<view class="content">
  文本
  <wd-divider vertical />
  文本
  <wd-divider vertical dashed />
  文本
  <wd-divider vertical :hairline="false" />
  文本
  <wd-divider vertical color="#1989fa" />
  文本
</view>
```

```css
.content {
  padding: 12rpx 15px;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 自定义颜色，支持所有合法颜色值 | `string` | - |
| content-position | 内容位置，可选值为 `left`、`center`、`right` | `DividerPosition` | `'center'` |
| dashed | 是否显示为虚线 | `boolean` | `false` |
| vertical | 是否显示为垂直分割线 | `boolean` | `false` |
| hairline | 是否显示为 0.5px 细线 | `boolean` | `true` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 分割线内容，仅在 `vertical` 为 `false` 时生效 | - |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |

---

---
url: 'https://v2.wot-ui.cn/component/drop-menu.md'
---
# DropMenu 下拉菜单

向下或向上弹出的菜单列表。

## 组件类型

### 基础用法

基础用法需要绑定 `v-model` 和 `options`。

`options` 为对象数组，默认结构为 `{ label, value, tip }`。

因为 `uni-app` 组件无法直接监听组件外部点击，为了在点击页面其他区域时自动关闭下拉菜单，建议结合 `useQueue` 在页面根节点监听点击冒泡并调用 `closeOutside`。

:::warning 提示
如果存在点击外部按钮手动打开 `drop-menu` 的场景，需要在该按钮上添加 `@click.stop`，避免触发 `closeOutside` 后立即关闭。
:::

```html
<view @click="closeOutside">
  <wd-drop-menu>
    <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
    <wd-drop-menu-item v-model="value2" :options="option2" @change="handleChange2" />
  </wd-drop-menu>
</view>
```

```ts
import { ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
const value1 = ref(0)
const value2 = ref(0)

const option1 = ref([
  { label: '全部商品', value: 0 },
  { label: '新款商品', value: 1 },
  { label: '活动商品', value: 2 }
])
const option2 = ref([
  { label: '综合', value: 0 },
  { label: '销量', value: 1 },
  { label: '上架时间', value: 2 }
])

const handleChange1 = ({ value }: { value: string | number }) => {
  console.log(value)
}
const handleChange2 = ({ value }: { value: string | number }) => {
  console.log(value)
}
```

## 组件状态

### 禁用菜单

通过 `disabled` 禁用菜单项。

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value1" disabled :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>
```

## 组件变体

### 向上展开

将 `direction` 设为 `up` 可使菜单向上展开。

```html
<wd-drop-menu direction="up">
  <wd-drop-menu-item v-model="value1" :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>
```

### 异步打开/关闭

`before-toggle` 在菜单打开/关闭前触发，接收 `{ status }`，支持返回 `boolean` 或 `Promise<boolean>`。

:::warning 提示
`before-toggle` 仅作用于当前 `wd-drop-menu-item`，不能阻止其他菜单项的开关行为。
:::

```html
<wd-dialog />
<wd-drop-menu>
  <wd-drop-menu-item v-model="value" :options="option" :before-toggle="handleBeforeToggle" />
</wd-drop-menu>
```

```ts
import { ref } from 'vue'
import { useDialog } from '@/uni_modules/wot-ui'
import type { DropMenuItemBeforeToggle } from '@/uni_modules/wot-ui/components/wd-drop-menu-item/types'

const dialog = useDialog()
const value = ref(0)
const option = ref([
  { label: '全部商品', value: 0 },
  { label: '新款商品', value: 1, tip: '这是补充信息' },
  { label: '长筛选项', value: 2 }
])

const handleBeforeToggle: DropMenuItemBeforeToggle = ({ status }) => {
  return new Promise<boolean>((resolve) => {
    dialog
      .confirm({
        title: status ? '异步打开' : '异步关闭',
        msg: status ? '确定要打开下拉菜单吗' : '确定要关闭下拉菜单吗'
      })
      .then(() => resolve(true))
      .catch(() => resolve(false))
  })
}
```

## 组件样式

### 自定义菜单选项

可以结合布局组件实现筛选栏联动展示。

```html
<view style="display: flex; background: #fff; text-align: center">
  <wd-drop-menu style="flex: 1; min-width: 0">
    <wd-drop-menu-item v-model="value1" :options="option1" />
  </wd-drop-menu>
  <view style="flex: 1">
    <wd-sort-button v-model="value2" title="上架时间" />
  </view>
</view>
```

### 自定义菜单图标

可通过 `icon` 设置右侧图标，通过 `icon-size` 设置图标尺寸。

```html
<wd-drop-menu>
  <wd-drop-menu-item title="地图" icon="location" icon-size="14px" />
</wd-drop-menu>
```

## 特殊样式

### 自定义菜单内容

通过默认插槽自定义菜单内容；自定义内容场景下，通常通过实例方法 `close` 手动关闭菜单。

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value" :options="option" />
  <wd-drop-menu-item ref="dropMenu" title="筛选" @opened="handleOpened">
    <view>
      <wd-slider v-model="sliderValue" ref="slider" />
      <wd-cell title="标题文字" value="内容" />
      <wd-cell title="标题文字" label="描述信息" value="内容" />
      <view style="padding: 0 10px 20px; box-sizing: border-box">
        <wd-button block size="large" @click="confirm">主要按钮</wd-button>
      </view>
    </view>
  </wd-drop-menu-item>
</wd-drop-menu>
```

```ts
import { ref } from 'vue'
import type { SliderInstance } from '@/uni_modules/wot-ui/components/wd-slider/types'
import type { DropMenuItemInstance } from '@/uni_modules/wot-ui/components/wd-drop-menu-item/types'

const dropMenu = ref<DropMenuItemInstance>()
const slider = ref<SliderInstance>()
const sliderValue = ref(30)

const confirm = () => {
  dropMenu.value?.close()
}

const handleOpened = () => {
  slider.value?.initSlider()
}
```

## DropMenu Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| z-index | 弹层层级 | `number` | `12` |
| direction | 菜单展开方向，可选值为 `up`、`down` | `DropDirection` | `'down'` |
| modal | 是否展示蒙层 | `boolean` | `true` |
| close-on-click-modal | 是否点击蒙层时关闭 | `boolean` | `true` |
| duration | 菜单展开/收起动画时长，单位 ms | `number` | `200` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## DropMenuItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 当前选中值 | `string \| number` | - |
| disabled | 是否禁用菜单 | `boolean` | `false` |
| options | 菜单选项列表，默认结构为 `{ label, value, tip }` | `Array<Record<string, any>>` | `[]` |
| icon-name | 选中项图标名称 | `string` | `'check'` |
| title | 菜单标题，设置后优先展示标题文案 | `string` | - |
| icon | 菜单右侧图标 | `string` | `'caret-down'` |
| icon-size | 菜单图标尺寸 | `string \| number` | - |
| before-toggle | 菜单开关前拦截函数，接收 `{ status }`，返回 `boolean` 或 `Promise<boolean>` | `DropMenuItemBeforeToggle` | - |
| value-key | 选项值字段名 | `string` | `'value'` |
| label-key | 选项文本字段名 | `string` | `'label'` |
| tip-key | 选项说明字段名 | `string` | `'tip'` |
| custom-popup-class | 自定义下拉 popup 样式类 | `string` | `''` |
| custom-popup-style | 自定义下拉 popup 样式 | `string` | `''` |
| popup-height | popup 高度，未设置时默认最大高度为 80% | `string` | `''` |
| root-portal | 是否脱离页面文档流渲染，用于解决 fixed 失效问题 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## DropMenuItem Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选中值变化时触发 | `{ value, selectedItem }` |
| open | 菜单开始展开时触发 | - |
| opened | 菜单展开完成时触发 | - |
| close | 菜单开始关闭时触发 | - |
| closed | 菜单关闭完成时触发 | - |

## DropMenuItem Methods

通过 `ref` 可获取实例并调用以下方法：

| 方法名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| getShowPop | 获取当前菜单是否展开 | - | boolean |
| open | 打开菜单 | - | void |
| close | 关闭菜单 | - | void |
| toggle | 切换菜单开关 | - | void |

## DropMenu Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 菜单项容器插槽 | - |

## DropMenuItem Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义菜单内容 | - |

---

---
url: 'https://v2.wot-ui.cn/component/empty.md'
---
# Empty 缺省提示

一般用于兜底占位展示。

## 内容形态

设置 `icon` 修改展示缺省图标或图片，默认为 `empty`。支持内置的常见图标名如 `no-result`、`no-wifi`、`no-content`、`no-collection`、`no-comment`、`failpayment`、`no-message`。可设置 `tip` 来控制展示提示文案。

```html
<wd-empty icon="no-result" tip="当前搜索无结果" />
<wd-empty icon="no-wifi" tip="当前网络不可用，请检查你的网络设置" />
<wd-empty icon="no-content" tip="暂无内容" />
<wd-empty icon="no-collection" tip="暂无收藏" />
<wd-empty icon="no-comment" tip="暂无评论" />
<wd-empty icon="failpayment" tip="支付失败，请重新订购" />
<wd-empty icon="no-message" tip="已订阅全部消息" />
```

## 组件样式

### 自定义大小

通过 `icon-size` 属性自定义图标或图片的大小，默认单位为 `px`。

```html
<wd-empty :icon-size="140" icon="no-result" tip="当前搜索无结果" />
```

## 特殊样式

### 自定义图片

需要自定义外部图片时，可以直接在 `icon` 属性中传入完整的图片 URL。

```html
<wd-empty icon="https://wot-ui.cn/assets/panda.jpg" tip="查看我的头像" />
```

### 自定义图片内容

使用 `image` 插槽可以完全自定义图标或图片位置的渲染内容。

```html
<wd-empty tip="自定义图片内容">
  <template #image>
    <wd-icon name="sun-fill" size="100px"></wd-icon>
  </template>
</wd-empty>
```

### 自定义底部内容

使用 `bottom` 插槽可以在提示文本底部渲染自定义内容（如操作交互按钮）。建议在插槽内部包裹一层容器以便于控制与上方内容的间距。

```html
<wd-empty icon="no-content" tip="当前搜索无结果">
  <template #bottom>
    <view class="bottom-actions">
      <wd-button type="info">重新加载</wd-button>
    </view>
  </template>
</wd-empty>
```

建议样式（可在页面或全局样式中添加）：

```css
.bottom-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 缺省图标名称或图片 URL | string | `empty` |
| icon-size | 图标或图片大小，默认单位为 px | string / number | - |
| tip | 提示文案 | string | - |

## Slots

| name | 说明 |
| --- | --- |
| image | 自定义图片区域内容 |
| bottom | 自定义底部内容 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
| custom-style | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/fab.md'
---
# Fab 悬浮按钮

悬浮动作按钮组件，按下可显示一组动作按钮。

:::warning
因为 `uni-app` 组件无法监听点击自己以外的地方，为了在点击页面其他地方时，可以自动关闭 `fab` ，建议使用组件库的 `useQueue` hook（会关闭所有 dropmenu、popover、toast、swipeAction、fab），在页面的根元素上监听点击事件的冒泡。

如果存在用户手动点击 `fab` 以外某个地方如按钮滑出 `fab` 的场景，则需要在点击的元素（在这里是按钮）加上 `@click.stop=""` 阻止事件冒泡到根元素上，避免触发 `closeOutside` 把要手动打开的 `fab` 关闭了。
:::

## 组件类型

### 基本用法

通过 `type` 设置悬浮按钮触发器的类型，`disabled` 设置悬浮按钮是否禁用。

::: code-group

```html [vue/html]
<wd-fab :type="type">
  <wd-button @click="showToast('一键三连')" custom-class="custom-button" type="primary" round>
    <wd-icon name="github-filled" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('我要收藏')" custom-class="custom-button" type="success" round>
    <wd-icon name="star" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('我要投币')" custom-class="custom-button" type="danger" round>
    <wd-icon name="money-circle" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('我要点赞')" custom-class="custom-button" type="warning" round>
    <wd-icon name="thumb-up" size="22px"></wd-icon>
  </wd-button>
</wd-fab>
```

```ts [typescript]
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { FabType } from '@/uni_modules/wot-ui/components/wd-fab/types'

const { show: showToast } = useToast()
const type = ref<FabType>('primary')
```

```scss [scss]
:deep(.custom-button) {
  min-width: auto !important;
  box-sizing: border-box;
  width: 32px !important;
  height: 32px !important;
  border-radius: 16px !important;
  margin: 8rpx;
}
```

:::

## 组件变体

### 位置与方向

通过 `position` 设置悬浮按钮触发器的位置，`direction` 设置动作按钮的打开方向。

::: code-group

```html [vue/html]
<wd-fab :position="position" :direction="direction">
  <wd-button @click="showToast('一键三连')" custom-class="custom-button" type="primary" round>
    <wd-icon name="github-filled" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('我要收藏')" custom-class="custom-button" type="success" round>
    <wd-icon name="star" size="22px"></wd-icon>
  </wd-button>
</wd-fab>
```

```ts [typescript]
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { FabPosition, FabDirection } from '@/uni_modules/wot-ui/components/wd-fab/types'

const { show: showToast } = useToast()
const position = ref<FabPosition>('left-bottom')
const direction = ref<FabDirection>('top')
```

:::

## 组件状态

### 动作菜单展开/收起

通过 `v-model:active` 控制动作按钮菜单的展开/收起。

::: code-group

```html [vue/html]
<wd-button @click="active = !active">切换展示</wd-button>
<wd-fab v-model:active="active"></wd-fab>
```

```ts [typescript]
import { ref } from 'vue'

const active = ref<boolean>(false)
```

:::

### 可拖动按钮

设置 `draggable` 属性为 `true` 开启按钮拖动能力。

::: code-group

```html [vue/html]
<wd-fab :draggable="true"></wd-fab>
```

:::

:::warning
开启拖动后 `direction` 属性将失效，会根据拖动后的位置自动计算弹出方向。拖动完成后按钮将会自动吸边。
:::

## 特殊样式

### 自定义触发器

通过 `trigger` 插槽自定义触发器，`expandable` 控制点击触发器是否触发默认内部的展开/收起能力。

::: code-group

```html [vue/html]
<wd-fab position="left-bottom" :expandable="false">
  <template #trigger="{ disabled }">
    <wd-button @click="handleClick" icon="share" type="danger" :disabled="disabled">分享给朋友</wd-button>
  </template>
</wd-fab>
```

```ts [typescript]
import { useToast } from '@/uni_modules/wot-ui'

const { show: showToast } = useToast()

const handleClick = () => {
  showToast('分享给朋友')
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:active | 是否激活 | `boolean` | `false` |
| type | 悬浮按钮类型，可选值为 `primary`、`success`、`info`、`warning`、`danger` | `FabType` | `'primary'` |
| position | 悬浮按钮位置，可选值为 `left-top`、`right-top`、`left-bottom`、`right-bottom`、`left-center`、`right-center`、`top-center`、`bottom-center` | `FabPosition` | `'right-bottom'` |
| draggable | 按钮能否拖动 | `boolean` | `false` |
| direction | 悬浮按钮菜单弹出方向，可选值为 `top`、`right`、`bottom`、`left` | `FabDirection` | `'top'` |
| disabled | 是否禁用 | `boolean` | `false` |
| inactive-icon | 悬浮按钮未展开时的图标 | `string` | `'plus'` |
| active-icon | 悬浮按钮展开时的图标 | `string` | `'close'` |
| z-index | 自定义悬浮按钮层级 | `number` | `99` |
| gap | 自定义悬浮按钮与可视区域边缘的间距 | `FabGap` | `{ top: 16, right: 16, bottom: 16, left: 16 }` |
| expandable | 用于控制点击时是否展开菜单，设置为 `false` 时触发 `click` 事件 | `boolean` | `true` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

### FabGap

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| top | 距离顶部间距 | number |
| bottom | 距离底部间距 | number |
| left | 距离左边间距 | number |
| right | 距离右边间距 | number |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | `expandable` 设置为 `false` 时，点击悬浮组件内部但不触发内部逻辑时则抛出版事件 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 展开菜单 | - |
| close | 收起菜单 | - |

## Slots

| name | 说明 |
| --- | --- |
| default | 动作按钮区域内容 |
| trigger | 触发器插槽，用于完全自定义点击触发锚点区域 |

---

---
url: 'https://v2.wot-ui.cn/component/floating-panel.md'
---
# FloatingPanel 浮动面板

浮动在页面底部的面板，用户可以通过上下拖动秒板来浏览内容，从而在不离开当前视图的情况下访问更多信息，常用于地图导航。

## 组件类型

### 基础用法

FloatingPanel 的初始高度会取 `anchors[0]` 的值，也就是 `100px`，用户可以拖动来展开面板，使高度达到 `60%` 的屏幕高度。

::: code-group

```html [vue/html]
<wd-floating-panel>
  <wd-cell-group border>
    <wd-cell v-for="item in data" :key="item" :title="item" />
  </wd-cell-group>
</wd-floating-panel>
```

```ts [typescript]
import { ref } from 'vue'

const data = ref<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
```

:::

## 组件变体

### 自定义锚点

你可以通过 `anchors` 属性来设置 FloatingPanel 的锚点位置，并通过 `v-model:height` 来控制当前面板的显示高度。

比如，使面板的高度在 `100px`、`40%` 屏幕高度和 `70%` 屏幕高度三个位置停靠：

::: code-group

```html [vue/html]
<wd-floating-panel v-model:height="height" :anchors="anchors" @heightChange="handleHeightChange">
  <view class="inner-content">自定义锚点 {{ anchors }} - {{ height.toFixed(0) }}</view>
</wd-floating-panel>
```

```ts [typescript]
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const height = ref<number>(0)
const windowHeight = ref<number>(0)
const anchors = ref<number[]>([])

const handleHeightChange = ({ height }: { height: number }) => {
  console.log(height)
}

onLoad(() => {
  windowHeight.value = uni.getSystemInfoSync().windowHeight
  anchors.value = [100, Math.round(0.4 * windowHeight.value), Math.round(0.7 * windowHeight.value)]
  height.value = anchors.value[1]
})
```

```css [css]
.inner-content {
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
```

:::

## 组件状态

### 仅头部拖拽

默认情况下，FloatingPanel 的头部区域和内容区域都可以被拖拽，你可以通过 `contentDraggable` 属性来禁用内容区域的拖拽。

::: code-group

```html [vue/html]
<wd-floating-panel :content-draggable="false">
  <view class="inner-content">内容区不可以拖拽</view>
</wd-floating-panel>
```

```css [css]
.inner-content {
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:height | 当前面板的显示高度 | `number` | `0` |
| anchors | 设置自定义锚点, 单位 `px` | `number[]` | `[100, windowHeight * 0.6]` |
| duration | 动画时长，单位 `ms`，设置为 `0` 可以禁用动画 | `number` | `300` |
| content-draggable | 允许拖拽内容容器 | `boolean` | `true` |
| safe-area-inset-bottom | 是否开启底部安全区适配 | `boolean` | `false` |
| show-scrollbar | 是否开启滚动条 | `boolean` | `true` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 名称 | 说明 |
| ---- | -------- |
| default | 默认内容区域插槽 |

## Events

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| heightChange | 面板显示高度改变且结束拖动后触发 | `{ height: number }` |

---

---
url: 'https://v2.wot-ui.cn/component/form.md'
---
# Form 表单

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型。

表单采用 `wd-form` 和 `wd-form-item` 的结构。`wd-form-item` 内部继承了 `wd-cell` 的布局能力，负责展示标题描述和承载校验提示。各种输入组件（如 `Input`、`Textarea`、`Picker`、`Switch`、`Upload` 等）只需直接放入 `wd-form-item` 的默认插槽中即可。

结合 `wd-form` 组件，可以实现对内部组件的规则校验。如果需要让表单项之间有清晰的边框线分隔，你可以直接在 `wd-form` 上开启 `border` 属性。

:::tip 温馨提示
`wd-form-item` 与 `input` 和 `textarea` 结合使用时，会自动开启 `input` 和 `textarea` 的 `compact` 属性
:::

## 校验引擎说明

表单组件默认采用接口式校验方案，你可以根据 `FormSchema` 的结构自己编写校验逻辑，详见后文的[自定义校验引擎](#自定义校验引擎)。

同时，我们推荐使用 [Zod](https://zod.dev/) 作为表单校验引擎。Zod 是一个以 TypeScript 为首的模式声明和验证库，你可以非常方便地通过 `z.object()` 等声明组合来构建你的表单验证规则。

### Zod 安装

\~~内置了嫌组件库大，不内置又说安装麻烦，真想吊起来这种人来打。~~

出于组件库体积的考虑，我们不内置 Zod，所以在使用 Zod 前，你需要先将其安装到你的项目中：

::: code-group

```bash [npm]
npm install zod
```

```bash [yarn]
yarn add zod
```

```bash [pnpm]
pnpm add zod
```

:::

### 结合 zodAdapter 使用

组件库内置了 `zodAdapter` 适配器，你可以直接通过它将 `Zod` 的 schema 转化为组件能够识别的校验规则：

```ts
import { z } from 'zod'
import { zodAdapter } from '@/uni_modules/wot-ui'

// 通过 zodAdapter 转换 zod 的模式对象
const schema = zodAdapter(
  z.object({
    username: z.string().min(1, '请填写用户名'),
    password: z.string().min(6, '密码至少为6位')
  })
)
```

## 自定义校验引擎

如果你不想使用 Zod，你也可以直接编写一个符合 `FormSchema` 结构的校验对象，实现自定义的表单校验引擎。

自定义校验引擎需要提供 `validate` 函数，其接收整个表单数据 `model`，并返回（或异步返回）包含 `path` 和 `message` 字段的错误问题数组。
如果需要控制必填星号（`*`）的显示，你还可以提供 `isRequired` 方法：

```ts
import type { FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const customSchema: FormSchema = {
  // 校验逻辑
  validate(formModel) {
    const issues = []
    if (!formModel.username) {
      issues.push({ path: ['username'], message: '请填写用户名' })
    }
    if (!formModel.password || formModel.password.length < 6) {
      issues.push({ path: ['password'], message: '密码至少为6位' })
    }
    return issues
  },
  // 用于推导必填星号
  isRequired(path: string) {
    return path === 'username' || path === 'password'
  }
}
```

## 组件类型

### 基础用法

在表单中，使用 `model` 指定表单数据对象，每个 `表单项组件` 代表一个表单项，使用 `prop` 指定表单项字段，使用 `schema` 属性定义校验规则。

::: details 查看基础用法示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="schema" :title-width="100">
  <wd-form-item title="歪比巴卜" prop="value1">
    <wd-input type="text" v-model="model.value1" placeholder="请输入歪比巴卜" />
  </wd-form-item>

  <wd-form-item title="沙卡拉卡" prop="value2">
    <wd-input type="text" v-model="model.value2" placeholder="请输入沙卡拉卡" />
  </wd-form-item>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { z } from 'zod'
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance } from '@/uni_modules/wot-ui/components/wd-form/types'

const { success: showSuccess } = useToast()

const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const form = ref<FormInstance>()
const schema = zodAdapter(
  z
    .object({
      value1: z.string().min(1, '请输入歪比巴卜'),
      value2: z.string().min(1, '请输入沙卡拉卡')
    })
    .superRefine((data, ctx) => {
      if (data.value1 === data.value2) return
      const message = '两个输入框的内容必须一致'
      ctx.addIssue({ code: 'custom', message, path: ['value1'] })
      ctx.addIssue({ code: 'custom', message, path: ['value2'] })
    })
)

function handleSubmit() {
  form.value
    ?.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 16px;
}
```

:::

## 组件配置

### 校验错误提示方式

1. `message`：默认为输入框下方用文字进行提示
2. `toast`：以"toast"提示的方式弹出错误信息，每次只弹出最前面的那个表单域的错误信息
3. `none`：不会进行任何提示

::: details 错误提示方式
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="activeSchema" :error-type="errorType" :title-width="100" border>
  <wd-cell-group custom-class="group" title="配置切换">
    <wd-form-item title="校验引擎" value-align="left">
      <wd-switch size="20" v-model="useZodSchema" active-text="Zod" inactive-text="自定义" />
    </wd-form-item>
    <wd-form-item title="提示方式" value-align="left">
      <wd-radio-group v-model="errorType" direction="horizontal">
        <wd-radio :value="'toast'">toast</wd-radio>
        <wd-radio :value="'message'">message</wd-radio>
        <wd-radio :value="'none'">none</wd-radio>
      </wd-radio-group>
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="表单内容">
    <wd-form-item title="歪比巴卜" prop="value1">
      <wd-input clearable v-model="model.value1" placeholder="请输入歪比巴卜" />
    </wd-form-item>
    <wd-form-item title="沙卡拉卡" prop="value2">
      <wd-input show-password clearable v-model="model.value2" placeholder="请输入沙卡拉卡" />
    </wd-form-item>
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { z } from 'zod'
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const { success: showSuccess } = useToast()
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const useZodSchema = ref(true)
const errorType = ref<'toast' | 'message' | 'none'>('toast')

const customSchema: FormSchema = {
  validate(formModel) {
    const issues = []
    if (!formModel.value1) {
      issues.push({ path: ['value1'], message: '请输入歪比巴卜' })
    }
    if (!formModel.value2) {
      issues.push({ path: ['value2'], message: '请输入沙卡拉卡' })
    }
    return issues
  },
  isRequired(path: string) {
    return path === 'value1' || path === 'value2'
  }
}

const zodSchema = zodAdapter(
  z.object({
    value1: z.string().min(1, '请输入歪比巴卜'),
    value2: z.string().min(1, '请输入沙卡拉卡')
  }),
  {
    isRequired(path: string) {
      return path === 'value1' || path === 'value2'
    }
  }
)

const activeSchema = computed<FormSchema>(() => {
  return useZodSchema.value ? zodSchema : customSchema
})

const form = ref<FormInstance>()

watch(
  () => errorType.value,
  () => {
    form.value?.reset()
  }
)

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 16px;
}

:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
```

:::

### 动态表单

表单项动态增减。

::: details 查看动态表单示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="schema">
  <wd-cell-group border>
    <wd-form-item title="用户名" prop="name">
      <wd-input clearable v-model="model.name" placeholder="请输入用户名" />
    </wd-form-item>
    <wd-form-item
      v-for="(item, index) in model.phoneNumbers"
      :key="item.key"
      :title="'玛卡巴卡单号' + index"
      :prop="'phoneNumbers.' + index + '.value'"
    >
      <wd-input clearable v-model="item.value" placeholder="请输入玛卡巴卡单号" />
    </wd-form-item>

    <wd-cell title-width="0px">
      <view class="footer">
        <wd-button size="small" type="info" plain @click="addPhone">添加</wd-button>
        <wd-button size="small" type="info" plain @click="removePhone">删除</wd-button>
        <wd-button size="small" type="info" plain @click="reset">重置</wd-button>
        <wd-button type="primary" size="small" @click="submit">提交</wd-button>
      </view>
    </wd-cell>
  </wd-cell-group>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import { reactive, ref } from 'vue'
import { z } from 'zod'

interface PhoneItem {
  key: number
  value: string
}

const model = reactive<{
  name: string
  phoneNumbers: PhoneItem[]
}>({
  name: '',
  phoneNumbers: [
    {
      key: Date.now(),
      value: ''
    }
  ]
})

const schema = zodAdapter(
  z.object({
    name: z.string().min(1, '请填写用户名'),
    phoneNumbers: z.array(
      z.object({
        value: z.string().min(1, '请填写玛卡巴卡单号')
      })
    )
  })
)

const { success: showSuccess } = useToast()
const form = ref()

const removePhone = () => {
  model.phoneNumbers.splice(model.phoneNumbers.length - 1, 1)
}

const addPhone = () => {
  model.phoneNumbers.push({
    key: Date.now(),
    value: ''
  })
}

const reset = () => {
  form.value.reset()
}

const submit = () => {
  form.value.validate().then(({ valid, errors }) => {
    if (valid) {
      showSuccess('校验通过')
    }
  })
}
</script>
```

```css [css]
.footer {
  text-align: left;
  :deep(.wd-button) {
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}
```

:::

#### 校验触发时机

通过配置 `validate-trigger` 可以指定校验触发时机，可选值为 `change`、`blur`、`submit`。可以在 `wd-form` 上配置全局触发时机，也可以在 `wd-form-item` 上配置覆盖全局设置。

::: details 校验触发时机
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="activeSchema" validate-trigger="change" :reset-on-change="false" :title-width="120">
  <wd-cell-group custom-class="group" title="配置">
    <wd-form-item title="校验引擎" value-align="left">
      <wd-switch v-model="useZodSchema" size="20" active-text="Zod" inactive-text="自定义" />
    </wd-form-item>
    <wd-form-item title="触发说明" value-align="left">
      <text class="tip-text">表单级 change，字段覆盖：blur/change/submit</text>
    </wd-form-item>
  </wd-cell-group>

  <wd-cell-group custom-class="group" title="输入类字段">
    <wd-form-item title="金额（change）" prop="amount">
      <wd-input-number v-model="model.amount" :min="0" :update-on-init="false" :max="9999" />
    </wd-form-item>
    <wd-form-item title="备注（change）" prop="remark">
      <wd-textarea v-model="model.remark" placeholder="请输入至少 4 个字" auto-height :maxlength="50" show-word-limit />
    </wd-form-item>
    <wd-form-item title="账号（blur）" prop="account" validate-trigger="blur">
      <wd-input v-model="model.account" clearable placeholder="失焦后触发校验" />
    </wd-form-item>
    <wd-form-item title="邀请码（change）" prop="inviteCode" validate-trigger="change">
      <wd-input v-model="model.inviteCode" clearable placeholder="值变化后触发校验" />
    </wd-form-item>
    <wd-form-item title="城市（submit）" prop="city" validate-trigger="submit">
      <wd-input v-model="model.city" clearable placeholder="仅提交时触发校验" />
    </wd-form-item>
  </wd-cell-group>

  <wd-cell-group custom-class="group" title="Picker 字段（change）">
    <wd-form-item
      title="推广平台"
      prop="platform"
      is-link
      :value="platformText"
      placeholder="请选择推广平台"
      @click="showPlatformPicker = true"
    />
    <wd-form-item
      title="优惠方式"
      prop="promotion"
      is-link
      :value="promotionText"
      placeholder="请选择优惠方式"
      @click="showPromotionPicker = true"
    />
    <wd-form-item title="时间" prop="time" is-link :value="timeText" placeholder="请选择时间" @click="showTimePicker = true" />
    <wd-form-item title="日期" prop="date" is-link :value="dateText" placeholder="请选择日期" @click="showDatePicker = true" />
  </wd-cell-group>

  <view class="footer">
    <wd-button type="primary" @click="handleSubmit" block>提交并校验</wd-button>
  </view>
</wd-form>

<wd-select-picker v-model="model.platform" v-model:visible="showPlatformPicker" :columns="platformList" placeholder="请选择推广平台" />
<wd-picker v-model="model.promotion" v-model:visible="showPromotionPicker" :columns="promotionList" placeholder="请选择优惠方式" />
<wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" placeholder="请选择时间" />
<wd-calendar v-model="model.date" v-model:visible="showDatePicker" placeholder="请选择日期" />
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'
import dayjs from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'
import { z } from 'zod'

const { success: showSuccess } = useToast()

const form = ref<FormInstance>()
const useZodSchema = ref(true)
const showPlatformPicker = ref(false)
const showPromotionPicker = ref(false)
const showTimePicker = ref(false)
const showDatePicker = ref(false)

const model = reactive<{
  amount: number | string
  remark: string
  account: string
  inviteCode: string
  city: string
  platform: string[]
  promotion: string[]
  time: number | string
  date: number | null
}>({
  amount: '',
  remark: '',
  account: '',
  inviteCode: '',
  city: '',
  platform: [],
  promotion: [],
  time: '',
  date: null
})

const requiredFields = new Set(['amount', 'remark', 'account', 'inviteCode', 'city', 'platform', 'promotion', 'time', 'date'])

const customSchema: FormSchema = {
  validate(formModel) {
    const issues = []
    if (formModel.amount === '' || Number(formModel.amount) <= 0) {
      issues.push({ path: ['amount'], message: '请输入大于 0 的金额' })
    }
    if (!formModel.remark || String(formModel.remark).trim().length < 4) {
      issues.push({ path: ['remark'], message: '备注至少输入 4 个字' })
    }
    if (!formModel.account || formModel.account.length < 3) {
      issues.push({ path: ['account'], message: '账号至少 3 位' })
    }
    if (!formModel.inviteCode) {
      issues.push({ path: ['inviteCode'], message: '请输入邀请码' })
    }
    if (!formModel.city) {
      issues.push({ path: ['city'], message: '请输入城市' })
    }
    if (!Array.isArray(formModel.platform) || !formModel.platform.length) {
      issues.push({ path: ['platform'], message: '请选择推广平台' })
    }
    if (!Array.isArray(formModel.promotion) || !formModel.promotion.length) {
      issues.push({ path: ['promotion'], message: '请选择优惠方式' })
    }
    if (!formModel.time) {
      issues.push({ path: ['time'], message: '请选择时间' })
    }
    if (!formModel.date) {
      issues.push({ path: ['date'], message: '请选择日期' })
    }
    return issues
  },
  isRequired(path: string) {
    return requiredFields.has(path)
  }
}

const zodSchema: FormSchema = zodAdapter(
  z.object({
    amount: z.union([z.string(), z.number()]).refine((value) => value !== '' && Number(value) > 0, '请输入大于 0 的金额'),
    remark: z.string().refine((value) => value.trim().length >= 4, '备注至少输入 4 个字'),
    account: z.string().min(3, '账号至少 3 位'),
    inviteCode: z.string().min(1, '请输入邀请码'),
    city: z.string().min(1, '请输入城市'),
    platform: z.array(z.string()).min(1, '请选择推广平台'),
    promotion: z.array(z.string()).min(1, '请选择优惠方式'),
    time: z.union([z.string(), z.number()]).refine((value) => !!value, '请选择时间'),
    date: z.union([z.number(), z.null()]).refine((value) => !!value, '请选择日期')
  }),
  {
    isRequired(path: string) {
      return requiredFields.has(path)
    }
  }
)

const activeSchema = computed<FormSchema>(() => {
  return useZodSchema.value ? zodSchema : customSchema
})

const platformList = ref([
  { value: '1', label: '京东' },
  { value: '2', label: '微信' },
  { value: '3', label: '抖音' }
])

const promotionList = ref([
  { value: '1', label: '满减' },
  { value: '2', label: '无门槛' }
])

const platformText = computed(() => {
  if (!model.platform.length) return ''
  return model.platform
    .map((value) => {
      const item = platformList.value.find((option) => option.value === value)
      return item ? item.label : value
    })
    .join('、')
})

const promotionText = computed(() => {
  if (!model.promotion.length) return ''
  return model.promotion
    .map((value) => {
      const item = promotionList.value.find((option) => option.value === value)
      return item ? item.label : value
    })
    .join('、')
})

const timeText = computed(() => {
  if (!model.time) return ''
  if (typeof model.time === 'number') {
    return dayjs(model.time).format('YYYY-MM-DD HH:mm')
  }
  return model.time
})

const dateText = computed(() => {
  if (!model.date) return ''
  return dayjs(model.date).format('YYYY-MM-DD')
})

watch(
  () => useZodSchema.value,
  () => {
    form.value?.reset()
  }
)

function handleSubmit() {
  form.value?.validate().then(({ valid }) => {
    if (valid) {
      showSuccess('校验通过')
    }
  })
}
</script>
```

```css [css]
.footer {
  padding: 16px;
}

.tip-text {
  color: #666;
  font-size: 14px;
}

:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
```

:::

## 指定字段校验

`validate` 方法可以传入一个 `prop` 参数，指定校验的字段，可以实现在表单组件的`blur`、`change`等事件触发时对该字段的校验。`prop` 参数也可以是一个字段数组，指定多个字段进行校验。

::: details 查看指定字段校验示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="schema" error-type="toast" :title-width="100">
  <wd-cell-group border>
    <wd-form-item title="用户名" prop="value1">
      <wd-input clearable v-model="model.value1" placeholder="请输入用户名" />
    </wd-form-item>
    <wd-form-item title="密码" prop="value2">
      <wd-input show-password clearable v-model="model.value2" placeholder="请输入密码" />
    </wd-form-item>
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
    <wd-button type="primary" size="large" @click="handleValidate" block>校验用户名和密码</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance } from '@/uni_modules/wot-ui/components/wd-form/types'
import { reactive, ref } from 'vue'
import { z } from 'zod'

const { success: showSuccess } = useToast()
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const schema = zodAdapter(
  z.object({
    value1: z.string().min(1, '请填写用户名'),
    value2: z.string().min(6, '密码至少为6位')
  })
)

const form = ref<FormInstance>()

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleValidate() {
  form
    .value!.validate(['value1', 'value2'])
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 12px;
}
```

:::

### 复杂表单

结合`Input 输入框`、`Textarea 输入框`、`Picker 选择器`、 `Calendar 日历选择器`、 `Cascader 级联选择器`、`SelectPicker 单复选选择器`、`Cell 单元格` 和 `DatetimePicker 日期时间选择器`实现一个复杂表单。

::: details 查看复杂表单示例
::: code-group

```html [vue/html]
<wd-select-picker
  v-model="model.platform"
  v-model:visible="showPlatformPicker"
  :columns="platformList"
  placeholder="请选择推广平台"
/>
<wd-picker
  v-model="model.promotion"
  v-model:visible="showPromotionPicker"
  :columns="promotionlist"
  placeholder="请选择优惠方式"
/>
<wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" placeholder="请选择时间" />
<wd-calendar v-model="model.date" v-model:visible="showDatePicker" placeholder="请选择日期" />
<wd-cascader
  v-model="model.address"
  v-model:visible="showAddressPicker"
  placeholder="请选择地址"
  :options="area"
  @confirm="handleAddressConfirm"
/>
<wd-dialog />
<wd-form ref="form" :model="model" :schema="activeSchema" :title-width="100" :layout="formItemLayout" border asterisk-position="end">
  <wd-cell-group custom-class="group" title="布局切换示例">
    <wd-form-item title="表单项布局" value-align="left">
      <wd-switch size="20" v-model="isVerticalLayout" />
      <text class="layout-tip">{{ isVerticalLayout ? '上下布局' : '左右布局' }}</text>
    </wd-form-item>
    <wd-form-item title="校验引擎" value-align="left">
      <wd-switch size="20" v-model="useZodSchema" active-text="Zod" inactive-text="自定义" />
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="基础信息">
    <wd-form-item title="优惠券名称" prop="couponName" required>
      <wd-input
        :maxlength="20"
        show-word-limit
        suffix-icon="question-circle"
        v-model="model.couponName"
        placeholder="请输入优惠券名称"
        @clicksuffixicon="handleIconClick"
        compact
      />
    </wd-form-item>
    <wd-form-item
      ellipsis
      title="推广平台"
      prop="platform"
      is-link
      :value="platformText"
      placeholder="请选择推广平台"
      @click="showPlatformPicker = true"
    />
    <wd-form-item
      title="优惠方式"
      prop="promotion"
      is-link
      :value="promotionText"
      placeholder="请选择优惠方式"
      @click="showPromotionPicker = true"
    />
    <wd-form-item prop="threshold" title="券面额" required title-width="100px" custom-value-class="cell-left">
      <view style="text-align: left">
        <view class="inline-txt" style="margin-left: 0">满</view>
        <wd-input
          compact
          custom-style="display: inline-block; width: 70px; vertical-align: middle"
          placeholder="请输入金额"
          v-model="model.threshold"
        />
        <view class="inline-txt">减</view>
        <wd-input
          compact
          custom-style="display: inline-block; width: 70px; vertical-align: middle"
          placeholder="请输入金额"
          v-model="model.price"
        />
      </view>
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="时间和地址">
    <wd-form-item
      title="时间"
      prop="time"
      is-link
      :value="timeText"
      placeholder="请选择时间"
      @click="showTimePicker = true"
    />
    <wd-form-item
      title="日期"
      prop="date"
      is-link
      :value="dateText"
      placeholder="请选择日期"
      @click="showDatePicker = true"
    />
    <wd-form-item
      title="地区"
      prop="address"
      is-link
      :value="addressText"
      placeholder="请选择地区"
      @click="showAddressPicker = true"
    />
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="其他信息">
    <wd-form-item title="活动细则" prop="content">
      <wd-textarea
        type="textarea"
        v-model="model.content"
        :maxlength="300"
        show-word-limit
        placeholder="请输入活动细则信息"
        clearable
        auto-height
        compact
      />
    </wd-form-item>
    <wd-form-item title="发货数量" title-width="100px" prop="count" value-align="left">
      <wd-input-number v-model="model.count" />
    </wd-form-item>
    <wd-form-item title="开启折扣" title-width="100px" prop="switchVal" value-align="left" center>
      <wd-switch v-model="model.switchVal" size="20" />
    </wd-form-item>
    <wd-form-item v-if="model.switchVal" title="折扣" prop="discount">
      <wd-input placeholder="请输入优惠金额" clearable v-model="model.discount" compact />
    </wd-form-item>
    <wd-form-item title="歪比巴卜" prop="cardId">
      <wd-input suffix-icon="camera" placeholder="请输入歪比巴卜" clearable v-model="model.cardId" compact />
    </wd-form-item>
    <wd-form-item title="玛卡巴卡" prop="phone">
      <wd-input placeholder="请输入玛卡巴卡" clearable v-model="model.phone" compact />
    </wd-form-item>
    <wd-form-item title="活动图片" title-width="100px" prop="fileList">
      <wd-upload
        :file-list="model.fileList"
        action="https://69bd04402bc2a25b22ad0a49.mockapi.io/upload"
        @change="handleFileChange"
      ></wd-upload>
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="组合示例">
    <wd-form-item title="投放优先级" prop="priority">
      <wd-radio-group v-model="model.priority" direction="horizontal">
        <wd-radio :value="1">高</wd-radio>
        <wd-radio :value="2">中</wd-radio>
        <wd-radio :value="3">低</wd-radio>
      </wd-radio-group>
    </wd-form-item>
    <wd-form-item title="投放标签" prop="tags">
      <wd-checkbox-group v-model="model.tags" direction="horizontal">
        <wd-checkbox :name="1">新品</wd-checkbox>
        <wd-checkbox :name="2">爆款</wd-checkbox>
        <wd-checkbox :name="3">清仓</wd-checkbox>
      </wd-checkbox-group>
    </wd-form-item>
    <wd-form-item title="活动评分" prop="rate">
      <wd-rate v-model="model.rate" allow-half clearable />
    </wd-form-item>
    <wd-form-item title="预算强度" prop="budget">
      <wd-slider ref="sliderRef" v-model="model.budget" show-extreme-value />
    </wd-form-item>
    <wd-form-item title="滑块验证" prop="verified">
      <wd-slide-verify ref="slideVerifyRef" @success="handleVerifySuccess" @fail="handleVerifyFail" />
    </wd-form-item>
  </wd-cell-group>
  <view class="tip">
    <wd-form-item prop="read" title-width="0px" :border="false">
      <wd-checkbox v-model="model.read">
        已阅读并同意
        <text style="color: #4d80f0">《巴拉巴拉吧啦协议》</text>
      </wd-checkbox>
    </wd-form-item>
  </view>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
  </view>
</wd-form>
```

```ts [typescript]
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import { isArray } from '@/uni_modules/wot-ui/common/util'
import { useCascaderAreaData } from '@vant/area-data'
import { type FormInstance, type FormSchema, type FormSchemaIssue } from '@/uni_modules/wot-ui/components/wd-form/types'
import type { SliderInstance } from '@/uni_modules/wot-ui/components/wd-slider/types'
import type { SlideVerifyInstance } from '@/uni_modules/wot-ui/components/wd-slide-verify/types'
import type { UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'
import type { CascaderOption } from '@/uni_modules/wot-ui/components/wd-cascader/types'

import dayjs from 'dayjs'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { z } from 'zod'

const showPlatformPicker = ref(false)
const showPromotionPicker = ref(false)
const showTimePicker = ref(false)
const showDatePicker = ref(false)
const showAddressPicker = ref(false)
const addressText = ref('')
const isVerticalLayout = ref(false)
const useZodSchema = ref(true)
const formItemLayout = computed(() => (isVerticalLayout.value ? 'vertical' : 'horizontal'))
const sliderRef = ref<SliderInstance>()
const slideVerifyRef = ref<SlideVerifyInstance>()

const model = reactive<{
  couponName: string
  platform: any[]
  promotion: any[]
  threshold: string
  price: string
  time: number | string
  date: null | number
  address: string
  count: number
  content: string
  switchVal: boolean
  cardId: string
  phone: string
  read: boolean
  fileList: UploadFileItem[]
  discount: number
  priority: number
  tags: number[]
  rate: number
  budget: number
  verified: boolean
}>({
  couponName: '',
  platform: [],
  promotion: [],
  threshold: '',
  price: '',
  date: null,
  time: '',
  address: '',
  count: 1,
  content: '',
  switchVal: true,
  cardId: '',
  phone: '',
  read: false,
  fileList: [],
  discount: 1,
  priority: 2,
  tags: [],
  rate: 3.5,
  budget: 35,
  verified: false
})

const requiredFields = new Set([
  'couponName',
  'content',
  'threshold',
  'platform',
  'promotion',
  'time',
  'date',
  'address',
  'count',
  'cardId',
  'phone',
  'fileList',
  'discount',
  'priority',
  'tags',
  'rate',
  'budget',
  'verified'
])

const customSchema: FormSchema = {
  async validate(formModel) {
    const issues: FormSchemaIssue[] = []
    const pushIssue = (path: string, message: string) => {
      issues.push({ path: [path], message })
    }
    if (!formModel.couponName) {
      pushIssue('couponName', '请输入优惠券名称')
    } else if (!/\d{6}/.test(formModel.couponName)) {
      pushIssue('couponName', '优惠券名称6个字以上')
    }
    if (!formModel.content || formModel.content.length <= 2) {
      pushIssue('content', '请输入活动细则信息')
    }
    if (!formModel.threshold || !formModel.price) {
      pushIssue('threshold', '请输入满减金额')
    }
    if (!isArray(formModel.platform) || !formModel.platform.length) {
      pushIssue('platform', '请选择推广平台')
    }
    if (!isArray(formModel.promotion) || !formModel.promotion.length) {
      pushIssue('promotion', '请选择优惠方式')
    }
    if (!formModel.time) {
      pushIssue('time', '请选择时间')
    }
    if (!formModel.date) {
      pushIssue('date', '请选择日期')
    }
    if (!formModel.address) {
      pushIssue('address', '请选择地址')
    }
    if (formModel.count === '' || formModel.count === undefined || formModel.count === null) {
      pushIssue('count', '发货数量需要大于1')
    } else if (Number(formModel.count) <= 1) {
      pushIssue('count', '发货数量需要大于1')
    }
    if (!formModel.cardId) {
      pushIssue('cardId', '请输入歪比巴卜')
    }
    if (!formModel.phone) {
      pushIssue('phone', '请输入玛卡巴卡')
    }
    if (!isArray(formModel.fileList) || !formModel.fileList.length) {
      pushIssue('fileList', '请选择活动图片')
    }
    if (!formModel.discount) {
      pushIssue('discount', '请输入优惠金额')
    }
    if (formModel.priority === '' || formModel.priority === undefined || formModel.priority === null) {
      pushIssue('priority', '请选择投放优先级')
    }
    if (!isArray(formModel.tags) || !formModel.tags.length) {
      pushIssue('tags', '请至少选择一个投放标签')
    }
    if (formModel.rate === '' || formModel.rate === undefined || formModel.rate === null) {
      pushIssue('rate', '请完成活动评分')
    }
    if (formModel.budget === '' || formModel.budget === undefined || formModel.budget === null) {
      pushIssue('budget', '请设置预算强度')
    }
    if (!formModel.verified) {
      pushIssue('verified', '请完成滑块验证')
    }
    return issues
  },
  isRequired(path: string) {
    return requiredFields.has(path)
  }
}

const zodSchema: FormSchema = zodAdapter(
  z.object({
    couponName: z.string().regex(/\d{6}/, '优惠券名称6个字以上'),
    content: z.string().min(3, '请输入活动细则信息'),
    threshold: z.string().min(1, '请输入满减金额'),
    price: z.string().optional(),
    platform: z.array(z.any()).min(1, '请选择推广平台'),
    promotion: z.array(z.any()).min(1, '请选择优惠方式'),
    time: z.union([z.string(), z.number()]).refine((value) => !!value, '请选择时间'),
    date: z.union([z.number(), z.null()]).refine((value) => !!value, '请选择日期'),
    address: z.string().min(1, '请选择地址'),
    count: z.number().gt(1, '发货数量需要大于1'),
    switchVal: z.boolean().optional(),
    discount: z.number().optional(),
    cardId: z.string().min(1, '请输入歪比巴卜'),
    phone: z.string().min(1, '请输入玛卡巴卡'),
    fileList: z.array(z.any()).min(1, '请选择活动图片'),
    priority: z.number(),
    tags: z.array(z.number()).min(1, '请至少选择一个投放标签'),
    rate: z.number(),
    budget: z.number(),
    verified: z.boolean().refine((value) => value, '请完成滑块验证')
  }),
  {
    isRequired(path: string) {
      return requiredFields.has(path)
    }
  }
)

const activeSchema = computed<FormSchema>(() => {
  return useZodSchema.value ? zodSchema : customSchema
})

const platformList = ref<any>([
  { value: '1', label: '京东' },
  { value: '2', label: '开普勒' },
  { value: '3', label: '手Q' },
  { value: '4', label: '微信' },
  { value: '5', label: '1号店' },
  { value: '6', label: '十元街' },
  { value: '7', label: '京东极速版' }
])
const promotionlist = ref<any[]>([
  { value: '1', label: '满减' },
  { value: '2', label: '无门槛' }
])

const area = ref<any[]>([
  useCascaderAreaData().map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const toast = useToast()
const form = ref<FormInstance>()

watch(
  () => isVerticalLayout.value,
  async () => {
    await nextTick()
    sliderRef.value?.initSlider()
    await slideVerifyRef.value?.init()
    slideVerifyRef.value?.reset()
  }
)

const platformText = computed(() => {
  if (!isArray(model.platform) || !model.platform.length) return ''
  return model.platform
    .map((val: string) => {
      const item = platformList.value.find((option: any) => option.value === val)
      return item ? item.label : val
    })
    .join('、')
})

const promotionText = computed(() => {
  if (!isArray(model.promotion) || !model.promotion.length) return ''
  return model.promotion
    .map((val: string) => {
      const item = promotionlist.value.find((option: any) => option.value === val)
      return item ? item.label : val
    })
    .join('、')
})

const timeText = computed(() => {
  if (!model.time) return ''
  if (typeof model.time === 'number') return dayjs(model.time).format('YYYY-MM-DD HH:mm')
  return model.time
})

const dateText = computed(() => {
  if (!model.date) return ''
  return dayjs(model.date).format('YYYY-MM-DD')
})

function handleAddressConfirm({ selectedOptions }: { selectedOptions: CascaderOption[] }) {
  addressText.value = selectedOptions.map((item) => item.text).join('/')
}

function handleVerifySuccess() {
  model.verified = true
}

function handleVerifyFail() {
  model.verified = false
}

function handleFileChange({ fileList }: any) {
  model.fileList = fileList
}

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        toast.success('提交成功')
      }
      console.log(valid)
      console.log(errors)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleIconClick() {
  toast.info('优惠券提示信息')
}
</script>
```

```css [css]
.inline-txt {
  display: inline-block;
  font-size: 14px;
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
}
:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
.tip {
  margin: 12px 0 12px;
  color: #999;
  font-size: 12px;
}
.footer {
  padding: 0 24px 20px;
}
.layout-tip {
  margin-left: 8px;
  color: #666;
  font-size: 14px;
}
:deep(.label-class) {
  color: #999 !important;
  font-size: 12px !important;
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| ------------- | ----------------------------------------------------------------------------------- | --------------------- | --------- |
| model | 表单数据对象 | `Record<string, any>` | - |
| schema | 表单校验对象 | `FormSchema` | - |
| validate-trigger | 校验触发时机，可选值为 `change`、`blur`、`submit` | `string \| string[]` | `submit` |
| reset-on-change | 表单数据变化时是否重置表单提示信息（设置为 `false` 时需要开发者单独对变更项进行校验） | `boolean` | `true` |
| error-type | 校验错误提示方式，可选值为 `toast`、`message`、`none` | `string` | `message` |
| border | 是否展示边框线 | `boolean` | `false` |
| center | 是否使内容垂直居中 | `boolean` | `false` |
| size | 单元格大小，可选值为 `large` | `string` | - |
| title-width | 左侧标题宽度 | `string \| number` | - |
| layout | 单元格布局方式，可选值为 `horizontal`、`vertical` | `string` | - |
| value-align | 右侧内容对齐方式，可选值为 `left`、`right`、`center` | `string` | - |
| asterisk-position | 必填星号位置，可选值为 `start`、`end` | `string` | - |
| hide-asterisk | 是否隐藏必填星号 | `boolean` | `false` |
| ellipsis | 是否超出隐藏显示省略号 | `boolean` | `false` |

## Methods

| 方法名称 | 说明 | 参数 | 返回值 |
| -------- | ------------------------------------------------------------------------------ | --------------- | --------------- |
| validate | 验证表单，支持传入一个 prop 来验证单个表单项，不传入 prop 时，会验证所有表单项，1.6.0 版本起支持传入数组 | `prop?: string \| string[]` | `Promise<{ valid: boolean, errors: ErrorMessage[] }>` |
| reset | 重置表单项的验证提示 | - | - |

### FormItem Attributes

该组件的所有属性除了支持特定表单项配置外，同时也继承自 `Form` 组件的公共配置（如 `border`、`center`、`size`、`title-width` 等）。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 表单域 model 字段名 | `string` | - |
| title | 标题 | `string` | - |
| value | 右侧展示值，用于配合 placeholder 判断是否显示占位文字 | `string \| number` | - |
| placeholder | 值为空时显示的占位文字，需与 value 配合使用 | `string` | - |
| prefix-icon | 前置图标类名 | `string` | - |
| icon-size | 图标大小 | `string \| number` | - |
| icon-prefix | 类名前缀，用于使用自定义图标 | `string` | - |
| label | 描述信息 | `string` | - |
| clickable | 是否开启点击反馈 | `boolean` | `false` |
| is-link | 是否展示右侧箭头并开启点击反馈 | `boolean` | `false` |
| required | 是否必填 | `boolean` | - |
| validate-trigger | 校验触发时机，可选值为 `change`、`blur`、`submit` | `string \| string[]` | - |

### FormSchema 数据结构

| 键名       | 说明                           | 类型                                                          |
| ---------- | ------------------------------ | ------------------------------------------------------------- |
| validate   | 校验函数，返回问题数组         | `(model) => FormSchemaIssue[] \| Promise<FormSchemaIssue[]>` |
| isRequired | 可选，用于推导必填星号         | `(path: string) => boolean \| undefined`                     |

## FormItem Events

| 事件名称 | 说明 | 参数 |
| -------- | ------------------------------------------------------------------------------ | --------------- |
| click | 点击表单项时触发 | - |

## 外部样式类

### FormItem 外部样式类

| 类名 | 说明 |
| ------------ | ---------- |
| custom-class | 根节点样式 |
| custom-prefix-class | 前置图标自定义样式类 |
| custom-label-class | label 使用 slot 时的自定义样式 |
| custom-value-class | value 使用 slot 时的自定义样式 |
| custom-title-class | title 使用 slot 时的自定义样式 |

---

---
url: 'https://v2.wot-ui.cn/component/gap.md'
---
# Gap 间隔槽

用于页面布局中的间距占位，可替代 `margin` 或 `padding`，也可作为底部占位元素。

## 组件类型

### 基本使用

默认渲染一个高度为 `14px`、背景为透明色的间隔槽。

```html
<wd-gap />
```

## 组件变体

### 自定义背景色

通过 `bg-color` 设置背景颜色。

```html
<wd-gap bg-color="#4D80F0" />
```

### 自定义高度

通过 `height` 设置高度，支持数字和带单位字符串。

```html
<wd-gap bg-color="#4D80F0" height="120rpx" />
```

## 组件样式

### 自定义类名

通过 `custom-class` 扩展样式。

```html
<wd-gap custom-class="custom-gap" />
```

```css
.custom-gap {
  padding-bottom: 120rpx;
  background: #34d19d !important;
}
```

## 特殊样式

### 底部安全区

开启 `safe-area-bottom` 后会自动追加底部安全区内边距，适合底部固定占位场景。

```html
<wd-gap safe-area-bottom height="0" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 间隔槽高度，支持数字（单位 `px`）或字符串（如 `20rpx`） | `string \| number` | `14` |
| bg-color | 背景颜色 | `string` | `'transparent'` |
| safe-area-bottom | 是否开启底部安全区适配 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

---

---
url: 'https://v2.wot-ui.cn/component/grid.md'
---
# Grid 宫格

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

## 组件类型

### 基础用法

基础用法需要通过 `icon` 指定图标名称以及 `text` 属性指定文字。默认显示为一行。

```html
<wd-grid clickable>
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 内容插槽

通过 `wd-grid-item` 的默认插槽可以自定义宫格内容。

```html
<wd-grid>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
</wd-grid>
```

```scss
.img {
  width: 100%;
  height: 90px;
}
```

## 组件变体

### 自定义列数

通过 `column` 属性可以自定义宫格列数。未定义该属性时，默认显示为一行。

```html
<wd-grid :column="3">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 正方形格子

通过 `square` 属性开启正方形格属性。此时每一个 `GridItem` 宽高相等。

> 注意：开启 `square` 后，不建议再通过样式自定义 `GridItem` 的高度。

```html
<wd-grid square :column="4" border :gutter="10">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

## 组件样式

### 自定义背景颜色

通过 `bg-color` 属性可以自定义宫格背景颜色。

```html
<wd-grid bg-color="rgba(0, 0, 0, 0.02)">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 开启边框

通过 `border` 属性可以开启边框线展示。

```html
<wd-grid border :column="3">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 设定格间隙

通过 `gutter` 属性设置格子之间的距离。

```html
<wd-grid :gutter="10" :column="4">
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
  <wd-grid-item icon="image" text="文字" />
</wd-grid>
```

### 提示信息

设置 `is-dot` 属性后，会在图标右上角展示一个小红点。也可通过 `value`、`max` 设置徽标显示内容。

```html
<wd-grid>
  <wd-grid-item is-dot icon="gift" text="文字" />
  <wd-grid-item value="100" :max="99" icon="desktop" text="文字" />
</wd-grid>
```

## 布局能力

### 横向布局

通过 `direction` 属性可以设置内容的排列方向，默认为 `vertical`（纵向），可设置为 `horizontal`（横向）。配合 `reverse` 属性可以调换图标和文本的位置。

```html
<wd-grid direction="horizontal" :column="2">
  <wd-grid-item icon="image" text="图标居左" />
  <wd-grid-item icon="settings" text="设置选项" />
</wd-grid>

<wd-grid direction="horizontal" reverse :column="2" border>
  <wd-grid-item icon="image" text="图标居右" />
  <wd-grid-item icon="settings" text="设置选项" />
</wd-grid>
```

## 特殊样式

### 图标插槽

通过具名插槽 `icon` 可以自定义图标位的内容。

```html
<wd-grid>
  <wd-grid-item text="文字" icon-size="36px">
    <template #icon>
      <image class="slot-img" :src="joy" />
    </template>
  </wd-grid-item>
</wd-grid>
```

### 文字插槽

通过具名插槽 `text` 可以自定义文字位的内容。

```html
<wd-grid>
  <wd-grid-item icon="image">
    <template #text>
      <view class="text">自定义文字插槽</view>
    </template>
  </wd-grid-item>
</wd-grid>
```

### 自定义样式

通过 `custom-class` 或外部样式类可以深度定制样式。如果文字过长想单行显示并使用省略号，可以设置 `ellipsis` 为 `true`。

```html
<wd-grid>
  <wd-grid-item custom-class="custom-item" ellipsis icon="search-line" text="这是自定义样式的宫格项这是自定义样式的宫格项这是自定义样式的宫格项" />
</wd-grid>
```

```scss
:deep(.custom-item) {
  color: #e2231a;
  text-align: left !important;
}
```

### 页面导航

通过 `clickable` 属性开启可点击状态，并通过 `url` 和 `link-type` 属性设置页面跳转。

```html
<wd-grid clickable>
  <wd-grid-item link-type="navigateTo" url="/pages/button/Index" icon="edit" text="Navigate to ..." />
</wd-grid>
```

## Grid Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column | 列数 | `number` | - |
| border | 是否显示边框 | `boolean` | `false` |
| gutter | 格子之间的间距，默认单位为 `px` | `number` | - |
| square | 是否将格子固定为正方形 | `boolean` | `false` |
| clickable | 是否开启格子点击反馈 | `boolean` | `false` |
| bg-color | 背景颜色设置 | `string` | - |
| hover-class | 指定 grid-item 按下去的样式类 | `string` | `'wd-grid-item__content--hover'` |
| center | 是否将格子内容居中显示 | `boolean` | `true` |
| direction | 格子内容排列的方向，可选值为 `horizontal`、`vertical` | `string` | `'vertical'` |
| reverse | 是否调换图标和文本的位置 | `boolean` | `false` |
| icon-size | 图标大小，默认单位为 `px` | `string` | `'28px'` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## GridItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文字内容 | `string` | - |
| ellipsis | 是否超出隐藏显示省略号 | `boolean` | `false` |
| icon | 图标名称，可选值见 `wd-icon` 组件 | `string` | - |
| icon-color | 图标颜色 | `string` | - |
| icon-prefix | 图标类名前缀 | `string` | - |
| is-dot | 是否显示图标右上角小红点 | `boolean` | `false` |
| value | 图标右上角徽标显示值 | `string \| number` | - |
| max | 图标右上角徽标最大值，超过最大值会显示 `{max}+` | `number` | `99` |
| badge-props | 自定义徽标属性，透传给 [Badge 组件](/component/badge#attributes) | `BadgeProps` | - |
| url | 点击后跳转的链接地址 | `string` | - |
| link-type | 页面跳转方式，可选值为 `navigateTo`、`switchTab`、`reLaunch`、`redirectTo` | `string` | `'navigateTo'` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## GridItem Events

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击(跳转)事件 | - |

## Grid Slot

| name | 说明 |
| --- | --- |
| default | 宫格内容 |

## GridItem Slot

| name | 说明 |
| --- | --- |
| default | 宫格项默认内容（自定义全部内容） |
| icon | 图标位内容 |
| text | 文本位内容 |

## Grid 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

## GridItem 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
| custom-text | 文字样式 |
| custom-icon | 图标样式 |

---

---
url: 'https://v2.wot-ui.cn/component/icon.md'
---
# Icon 图标

基于字体的图标集。

## 组件类型

### 基础用法

通过 `name` 属性设置使用哪个图标。

```html
<wd-icon name="del" />
```

## 组件样式

### 图标颜色

设置 `color` 属性。

```html
<wd-icon name="del" color="#0083ff" />
```

### 图标大小

设置 `size` 属性。

```html
<wd-icon name="del" size="20px" />
```

## 特殊样式

### 自定义图标

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。

```css
/* 路径 src/iconfont/index.css */

@font-face {
  font-family: "fish";
  src: url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff2?t=1721314121733') format('woff2'),
       url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff?t=1721314121733') format('woff'),
       url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.ttf?t=1721314121733') format('truetype');
}

.fish {
  font-family: "fish" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fish-kehuishouwu:before {
  content: "\e627";
}

```

```html
<!-- app.vue -->
<style>
@import '@/iconfont/index.css';
</style>
```

```html
<!-- 通过 class-prefix 指定类名为 fish -->
<wd-icon class-prefix="fish" name="kehuishouwu" />
```

### CSS 类名图标 (UnoCSS)

如果项目中使用了 [UnoCSS](https://unocss.dev/) 等 CSS 引擎，你可以通过设置 `css-icon` 为 `true`，此时传入的 `name` 会直接被作为 CSS 类名使用，而不会拼接任何前缀。

```html
<wd-icon css-icon name="i-ep-apple" />
<wd-icon css-icon name="i-carbon-sun" />

<!-- 也可以直接传图标类名给 css-icon 而无需再传 name -->
<wd-icon css-icon="i-carbon-sun" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称或图片链接 | `string` | - |
| color	| 图标的颜色 | `string` | `inherit` |
| size | 图标的字体大小 | `string \| number` | `inherit` |
| class-prefix | 类名前缀，用于使用自定义图标 | `string` | `wd-icon` |
| css-icon | CSS 图标，为 `true` 时 `name` 直接作为 CSS class 而不会拼接 `class-prefix` 前缀，也可以直接传图标类名 | `boolean \| string` | `false` |
| custom-style | 根节点样式 | `string` | - |
| custom-class | 根节点样式 | `string` | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击图标时触发 | `event` |

---

---
url: 'https://v2.wot-ui.cn/component/image-preview.md'
---
# ImagePreview 图片预览

图片预览组件，支持多图预览、滑动切换和函数式调用。

## 组件类型

### useImagePreview

`useImagePreview` 用于函数式调用 `wd-image-preview`。调用前需要先在页面中声明一个 `wd-image-preview` 实例。

### 基本用法

通过 `useImagePreview` 函数式调用打开图片预览。

```html
<wd-button @click="handlePreview">预览图片</wd-button>
<wd-image-preview />
```

```typescript
import { useImagePreview } from '@wot-ui/ui'

const { previewImage } = useImagePreview()

function handlePreview() {
  previewImage({
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ]
  })
}
```

### 传入图片数组

可以直接传入图片 URL 数组，简化调用方式。

```typescript
previewImage([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])
```

## 组件变体

### 指定起始位置

通过 `startPosition` 指定预览时的起始位置（从 0 开始）。

```typescript
previewImage({
  images: ['url1', 'url2', 'url3'],
  startPosition: 1 // 从第二张图片开始预览
})
```

## 组件配置

### 隐藏页码

通过 `showIndex` 属性控制是否显示页码。

```typescript
previewImage({
  images: ['url1', 'url2'],
  showIndex: false
})
```

### 隐藏关闭按钮

通过 `closeable` 控制是否显示关闭按钮。

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeable: false
})
```

### 关闭按钮位置

通过 `closeIconPosition` 控制按钮位置。

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeIconPosition: 'top-left' // 或 'top-right'
})
```

### 禁用点击关闭

通过 `closeOnClick` 控制是否点击图片或遮罩时关闭。

```typescript
previewImage({
  images: ['url1', 'url2'],
  closeOnClick: false
})
```

### 禁用循环

通过 `loop` 属性禁用循环播放。

```typescript
previewImage({
  images: ['url1', 'url2'],
  loop: false
})
```

## 特殊用法

### 监听事件

通过回调函数监听预览事件。

```typescript
import { useImagePreview } from '@wot-ui/ui'

const { previewImage, closeImagePreview } = useImagePreview()

previewImage({
  images: ['url1', 'url2'],
  onOpen: () => {
    console.log('预览已打开')
  },
  onClose: () => {
    console.log('预览已关闭')
  },
  onChange: (index) => {
    console.log('当前图片索引:', index)
  }
})

function handleClose() {
  closeImagePreview()
}
```

### 使用插槽

可以通过具名插槽自定义指示器或底部内容。若页面中存在多个实例，需要通过 `selector` 区分，并在 `useImagePreview(selector)` 中传入相同标识。

```html
<wd-button @click="handleSlotPreview">自定义插槽</wd-button>

<wd-image-preview selector="slot-preview">
  <!-- 自定义指示器 -->
  <template #indicator="{ current, total }">
    <wd-swiper-nav :current="current" :total="total" type="dots-bar" custom-style="bottom: 64px;" />
  </template>
  <!-- 底部自定义内容 -->
  <template #default="{ current }">
    <view class="custom-bottom">
      <text class="custom-bottom__text">{{ imageDescriptions[current] }}</text>
    </view>
  </template>
</wd-image-preview>
```

```typescript
import { useImagePreview } from '@wot-ui/ui'

const { previewImage } = useImagePreview('slot-preview')

const images = [
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg'
]

const imageDescriptions = ['小熊猫', '水豚']

function handleSlotPreview() {
  previewImage({
    images,
    showIndex: false // 隐藏默认指示器
  })
}
```

### 组件式调用

也可以通过组件的方式使用，并通过 ref 控制。

```html
<wd-image-preview ref="imagePreviewRef" :images="images" />
<wd-button @click="openPreview">预览</wd-button>
```

```typescript
import { ref } from 'vue'
import type { ImagePreviewInstance } from '@wot-ui/ui'

const imagePreviewRef = ref<ImagePreviewInstance>()
const images = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])

function openPreview() {
  imagePreviewRef.value?.open()
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 选择器 | `string` | - |
| images | 图片 URL 数组 | `string[]` | `[]` |
| start-position | 起始位置索引 | `number` | `0` |
| show-index | 是否显示页码 | `boolean` | `true` |
| loop | 是否循环播放 | `boolean` | `true` |
| closeable | 是否显示关闭按钮 | `boolean` | `true` |
| close-icon | 关闭图标名称 | `string` | `close` |
| close-icon-position | 关闭图标位置，可选值为 `top-left`、`top-right` | `string` | `top-right` |
| close-on-click | 是否点击图片或遮罩时关闭 | `boolean` | `true` |
| show-menu-by-longpress | 开启长按图片显示识别小程序码菜单 | `boolean` | `true` |
| z-index | 层级 | `number` | `1000` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开预览时触发 | - |
| close | 关闭预览时触发 | - |
| change | 切换图片时触发 | `{ index: number }` |
| long-press | 长按图片时触发 | `{ image: string }` |

## Methods

通过 ref 调用组件实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| open | 打开图片预览 | `options?: ImagePreviewOptions \| string[]` | - |
| close | 关闭图片预览 | - | - |
| setActive | 切换到指定图片 | `index: number` | - |

## Slots

| name | 说明 |
| --- | --- |
| default | 底部自定义内容，参数为 `{ current: number }` |
| indicator | 自定义指示器，参数为 `{ current: number, total: number }` |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|------|------|----------|
| custom-class | 根节点样式类 | - |

## CSS 变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| --wot-image-preview-bg | 背景颜色 | `rgba(0, 0, 0, 0.9)` |
| --wot-image-preview-index-color | 页码颜色 | `#fff` |
| --wot-image-preview-index-font-size | 页码字号 | `15px` |
| --wot-image-preview-close-size | 关闭按钮尺寸 | `44px` |
| --wot-image-preview-close-margin | 关闭按钮边距 | `12px` |

---

---
url: 'https://v2.wot-ui.cn/component/img.md'
---
# Img 图片

增强版图片组件，支持填充模式、懒加载、加载态/失败态插槽，以及点击预览。

## 组件类型

### 基本用法

基础用法与原生 `image` 标签一致，可以设置 `src`、`width`、`height` 等属性。

使用本地资源时，建议通过文件导入方式传入 `src`。在微信小程序中，`image` 标签支持二进制数据和 base64 编码，单独使用导入路径时需要结合构建配置处理。

```html
<wd-img :width="100" :height="100" :src="imgURL" />
```

```typescript
import blackMao from './black_mao.png'

const imgURL = blackMao
```

:::tip 提示
可以配置 `transformAssetUrls`，让 `wd-img` 的 `src` 属性获得与原生 `image` 一致的资源转换体验。

```typescript
import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    uni({
      vueOptions: {
        template: {
          transformAssetUrls: {
            tags: {
              'wd-img': ['src']
            }
          }
        }
      }
    })
  ]
})
```

修改完成后重启开发服务即可生效，更多背景可参考 [uni-app issue#4997](https://github.com/dcloudio/uni-app/issues/4997#issuecomment-2456851123)。
:::

## 组件状态

### 加载中提示

图片加载时会显示默认占位内容，也可以通过 `loading` 插槽自定义加载态。若不希望显示默认加载态，可将 `show-loading` 设为 `false`。

```html
<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />

<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
  <template #loading>
    <wd-loading />
  </template>
</wd-img>
```

### 加载失败提示

图片加载失败时会显示默认占位内容，也可以通过 `error` 插槽自定义失败态。若不希望显示默认失败态，可将 `show-error` 设为 `false`。

```html
<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />

<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
  <template #error>
    <view class="error-wrap">加载失败</view>
  </template>
</wd-img>
```

```css
.error-wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  color: white;
  line-height: 100px;
  text-align: center;
}
```

## 组件样式

### 填充模式

通过 `mode` 设置图片填充模式。可选值为 `top left`、`top right`、`bottom left`、`bottom right`、`right`、`left`、`center`、`bottom`、`top`、`heightFix`、`widthFix`、`scaleToFill`、`aspectFit`、`aspectFill`。

```html
<wd-img :width="100" :height="100" :src="imgURL" mode="center" />
```

### 圆形

通过 `round` 将图片显示为圆形。

```html
<wd-img :width="100" :height="100" :src="imgURL" round />
```

### 圆角

通过 `radius` 设置图片圆角，默认单位为 `px`。

```html
<wd-img :width="100" :height="100" :src="imgURL" :radius="8" />
```

## 特殊用法

### 可预览

通过 `enable-preview` 开启点击预览，内部调用 `uni.previewImage` 实现。组件仅在图片加载成功后才会触发预览。

```html
<wd-img :width="100" :height="100" :src="imgURL" :enable-preview="true" />
```

### 指定预览图片

通过 `preview-src` 指定预览时展示的图片，可与组件当前显示的图片不同。

```html
<wd-img :width="100" :height="100" :src="imgURL" :preview-src="previewURL" :enable-preview="true" />
```

```typescript
import blackMao from './black_mao.png'
import blackMaoPreview from './black_mao_1.png'

const imgURL = blackMao
const previewURL = blackMaoPreview
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片链接 | `string` | - |
| preview-src | 预览图片链接 | `string` | - |
| width | 宽度，支持数字（单位 `px`）或字符串 | `string \| number` | - |
| height | 高度，支持数字（单位 `px`）或字符串 | `string \| number` | - |
| mode | 填充模式，可选值为 `top left`、`top right`、`bottom left`、`bottom right`、`right`、`left`、`center`、`bottom`、`top`、`heightFix`、`widthFix`、`scaleToFill`、`aspectFit`、`aspectFill` | `ImageMode` | `scaleToFill` |
| round | 是否显示为圆形 | `boolean` | `false` |
| radius | 圆角大小，默认单位为 `px` | `string \| number` | - |
| lazy-load | 是否开启图片懒加载 | `boolean` | `false` |
| enable-preview | 是否支持点击预览 | `boolean` | `false` |
| show-menu-by-longpress | 是否开启长按图片显示识别小程序码菜单，仅微信小程序平台有效 | `boolean` | `false` |
| show-loading | 是否展示默认加载态 | `boolean` | `true` |
| show-error | 是否展示默认失败态 | `boolean` | `true` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |
| custom-image | 内部 `image` 节点自定义类名 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击图片时触发 | `event: MouseEvent` |
| load | 图片加载完成时触发，返回图片加载事件对象 | `event: Event` |
| error | 图片加载失败时触发，返回图片错误事件对象 | `event: Event` |

## Slots

| 名称 | 说明 |
| --- | --- |
| loading | 自定义图片加载中的展示内容 |
| error | 自定义图片加载失败后的展示内容 |

---

---
url: 'https://v2.wot-ui.cn/component/img-cropper.md'
---
# ImgCropper 图片裁剪

图片剪裁组件，用于图片裁剪，支持拖拽、缩放、旋转等操作。

## 组件类型

### 基本用法

图片裁剪组件需要绑定 `v-model` 来控制组件的显示与隐藏，通过属性 `img-src` 控制展示的图片资源。进入组件后，可以对图片进行拖拽、双指缩放、旋转等操作，监听 `confirm` 事件获取裁剪结果。

> *注意：建议在新页面中使用图片裁剪组件，保持 `show` 为 true，完成裁剪后返回上一页。*

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
<view class="profile">
  <view v-if="!imgSrc" class="img" @click="upload">
    <wd-icon name="fill-camera" custom-class="img-icon"></wd-icon>
  </view>
  <wd-img v-if="imgSrc" round width="200px" height="200px" :src="imgSrc" mode="aspectFit" custom-class="profile-img" @click="upload" />
  <view style="font-size: 14px;">点击上传头像</view>
</view>
```

```typescript
const src = ref<string>('')
const imgSrc = ref<string>('')
const show = ref<boolean>(false)

function upload() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePaths = res.tempFilePaths[0]
      src.value = tempFilePaths
      show.value = true
    }
  })
}
function handleConfirm(event) {
  const { tempFilePath } = event
  imgSrc.value = tempFilePath
}
function imgLoaderror(res) {
  console.log('加载失败', res)
}
function imgLoaded(res) {
  console.log('加载成功', res)
}
function handleCancel(event) {
  console.log('取消', event)
}
```

## 组件配置

### 自定义裁剪比例

通过 `aspect-ratio` 属性可以设置裁剪框的宽高比，格式为 `width:height`。

#### 3:2 适合拍照

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="3:2"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

#### 16:9 影视比例

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="16:9"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

#### 16:10 这么阔 很有型

16:10 的显示比例非常适合展示风景照片或者电影海报等宽屏内容。

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="16:10"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

## 特殊用法

### 裁剪后上传

结合 `useUpload` 可以实现裁剪完成后自动上传图片的功能。

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  @confirm="handleConfirmUpload"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

```typescript
import { ref } from 'vue'
import { useUpload, useToast } from '@/uni_modules/wot-ui'
import { type UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'

const { startUpload, UPLOAD_STATUS } = useUpload()
const { show: showToast } = useToast()

const show = ref(false)
const src = ref('')
const imgSrc = ref('')

async function handleConfirmUpload(event) {
  const { tempFilePath } = event
  
  // 构建上传文件对象
  const file: UploadFileItem = {
    url: tempFilePath,
    status: UPLOAD_STATUS.PENDING,
    percent: 0,
    uid: new Date().getTime()
  }

  try {
    // 开始上传
    await startUpload(file, {
      action: 'https://your-upload-url',
      onSuccess() {
        imgSrc.value = tempFilePath
        showToast({
          msg: '上传成功'
        })
      },
      onError() {
        showToast({
          msg: '上传失败'
        })
      },
      onProgress(res) {
        console.log('上传进度:', res.progress)
      }
    })
  } catch (error) {
    console.error('上传失败:', error)
  }
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 打开图片裁剪组件 | `boolean` | `false` |
| img-src | 图片资源链接 | `string` | - |
| img-width | 截屏预览图片的初始宽度; `1、设置宽度不设置高度，按照宽度等比缩放；2、如果都不设置，预览时图片大小会根据裁剪框大小进行等比缩放，进行锁边处理；`; `string` 类型只支持 `%` 单位，`number` 类型时单位为 `px` | `number \| string` | - |
| img-height | 截屏预览图片的初始高度; `1、设置高度不设置宽度，按照高度等比缩放；2、如果都不设置，预览时图片大小会根据裁剪框大小进行等比缩放，进行锁边处理；`; `string` 类型只支持 `%` 单位，`number` 类型时单位为 `px` | `number \| string` | - |
| disabled-rotate | 禁止图片旋转 | `boolean` | `false` |
| export-scale | 设置导出图片尺寸 | `number` | `2` |
| max-scale | 最大缩放倍数 | `number` | `3` |
| cancel-button-text | 取消按钮文案 | `string` | `取消` |
| confirm-button-text | 确认按钮文案 | `string` | `完成` |
| quality | 生成的图片质量 [wx.canvasToTempFilePath属性介绍](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | `number` | `1` |
| file-type | 目标文件的类型，[wx.canvasToTempFilePath属性介绍](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | `string` | `png` |
| aspect-ratio | 裁剪框宽高比，格式为 `width:height` | `string` | `1:1` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 完成截图时触发 | `{tempFilePath, width, height}` 分别为生成文件的临时路径 (本地路径)、生成图片宽、生成图片高 |
| cancel | 当取消截图时触发 | - |
| imgloaderror | 当图片加载错误时触发 | `{err}` |
| imgloaded | 当图片加载完成时触发 | `{res}` |

## Methods

通过 `ref` 对外暴露组件内部函数：

| 方法名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| setRotate | 设置图片旋转角度 | `deg` (设置的旋转角度) | - |
| resetImg | 重置图片的角度、缩放、位置 | - | - |
| revertIsAnimation | 切换图片过渡动画效果 | `animation` (是否启用动画) | - |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/index-bar.md'
---
# IndexBar 索引栏

用于列表的索引分类显示和快速定位。

## 组件类型

### 基础用法

使用一个固定高度的元素包裹 `wd-index-bar` 组件，组件的宽高会和包裹元素相同。

将 `wd-index-anchor` 作为子组件使用，会根据 anchor 组件的 `index` 属性生成锚点以及侧边栏。

```vue
<template>
  <view class="wraper">
    <wd-index-bar sticky>
      <view v-for="item in data" :key="item.index">
        <wd-index-anchor :index="item.index" />
        <wd-cell border clickable v-for="city in item.data" :key="city" :title="city" @click="handleClick(item.index, city)"></wd-cell>
      </view>
    </wd-index-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([
  {
    index: 'A',
    data: ['阿坝', '阿拉善', '阿里', '安康', '安庆', '鞍山', '安顺', '安阳', '澳门']
  },
  {
    index: 'B',
    data: ['北京', '白银', '保定', '宝鸡', '保山', '包头', '巴中', '北海', '蚌埠', '本溪', '毕节', '滨州', '百色', '亳州']
  },
  {
    index: 'C',
    data: [
      '重庆',
      '成都',
      '长沙',
      '长春',
      '沧州',
      '常德',
      '昌都',
      '长治',
      '常州',
      '巢湖',
      '潮州',
      '承德',
      '郴州',
      '赤峰',
      '池州',
      '崇左',
      '楚雄',
      '滁州',
      '朝阳'
    ]
  },
  {
    index: 'D',
    data: ['大连', '东莞', '大理', '丹东', '大庆', '大同', '大兴安岭', '德宏', '德阳', '德州', '定西', '迪庆', '东营']
  },
  {
    index: 'E',
    data: ['鄂尔多斯', '恩施', '鄂州']
  },
  {
    index: 'F',
    data: ['福州', '防城港', '佛山', '抚顺', '抚州', '阜新', '阜阳']
  },
  {
    index: 'G',
    data: ['广州', '桂林', '贵阳', '甘南', '赣州', '甘孜', '广安', '广元', '贵港', '果洛']
  },
  {
    index: 'H',
    data: [
      '杭州',
      '哈尔滨',
      '合肥',
      '海口',
      '呼和浩特',
      '海北',
      '海东',
      '海南',
      '海西',
      '邯郸',
      '汉中',
      '鹤壁',
      '河池',
      '鹤岗',
      '黑河',
      '衡水',
      '衡阳',
      '河源',
      '贺州',
      '红河',
      '淮安',
      '淮北',
      '怀化',
      '淮南',
      '黄冈',
      '黄南',
      '黄山',
      '黄石',
      '惠州',
      '葫芦岛',
      '呼伦贝尔',
      '湖州',
      '菏泽'
    ]
  }
])

function handleClick(index: string, city: string) {
  console.log(`当前点击项：${index}，城市：${city}`)
}
</script>

<style lang="scss">
.wraper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}
</style>
```

## 特殊用法

### 更新列表数据

当前示例页仅提供基础用法演示。如果你的列表数据需要动态更新，可以参考下面这个扩展示例，配合 `wd-search` 组件使用：

::: details 查看更新列表数据示例
::: code-group

```html [vue/html]
<template>
  <view>
    <wd-search hide-cancel placeholder="我要去哪里？" v-model="keyword" @search="handleSearch" @clear="handleClear" />
    <view class="wraper">
      <wd-index-bar sticky v-if="showList.length">
        <view v-for="item in showList" :key="item.index">
          <wd-index-anchor :index="item.index" />
          <wd-cell border clickable v-for="city in item.data" :key="city" :title="city" @click="handleClick(item.index, city)"></wd-cell>
        </view>
      </wd-index-bar>
    </view>
  </view>
</template>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import { nextTick, onMounted, ref } from 'vue'

const { show: showToast } = useToast()
const keyword = ref('')
const showList = ref<any>([])

const indexList = [
  {
    index: 'A',
    data: ['阿坝', '阿拉善', '阿里', '安康', '安庆', '鞍山', '安顺', '安阳', '澳门']
  },
  {
    index: 'B',
    data: ['北京', '白银', '保定', '宝鸡', '保山', '包头', '巴中', '北海', '蚌埠', '本溪', '毕节', '滨州', '百色', '亳州']
  },
  {
    index: 'C',
    data: [
      '重庆',
      '成都',
      '长沙',
      '长春',
      '沧州',
      '常德',
      '昌都',
      '长治',
      '常州',
      '巢湖',
      '潮州',
      '承德',
      '郴州',
      '赤峰',
      '池州',
      '崇左',
      '楚雄',
      '滁州',
      '朝阳'
    ]
  },
  {
    index: 'D',
    data: ['大连', '东莞', '大理', '丹东', '大庆', '大同', '大兴安岭', '德宏', '德阳', '德州', '定西', '迪庆', '东营']
  },
  {
    index: 'E',
    data: ['鄂尔多斯', '恩施', '鄂州']
  },
  {
    index: 'F',
    data: ['福州', '防城港', '佛山', '抚顺', '抚州', '阜新', '阜阳']
  },
  {
    index: 'G',
    data: ['广州', '桂林', '贵阳', '甘南', '赣州', '甘孜', '广安', '广元', '贵港', '果洛']
  },
  {
    index: 'H',
    data: [
      '杭州',
      '哈尔滨',
      '合肥',
      '海口',
      '呼和浩特',
      '海北',
      '海东',
      '海南',
      '海西',
      '邯郸',
      '汉中',
      '鹤壁',
      '河池',
      '鹤岗',
      '黑河',
      '衡水',
      '衡阳',
      '河源',
      '贺州',
      '红河',
      '淮安',
      '淮北',
      '怀化',
      '淮南',
      '黄冈',
      '黄南',
      '黄山',
      '黄石',
      '惠州',
      '葫芦岛',
      '呼伦贝尔',
      '湖州',
      '菏泽'
    ]
  }
]

onMounted(() => {
  handleSearch()
})

function handleClick(index: string, city: string) {
  showToast(`当前点击项：${index}，城市：${city}`)
}

function handleSearch() {
  showList.value = []
  nextTick(() => {
    if (keyword.value) {
      showList.value = indexList.filter((item) => {
        return item.data.some((city) => {
          return city.includes(keyword.value)
        })
      })
    } else {
      showList.value = indexList
    }
  })
}

function handleClear() {
  keyword.value = ''
  handleSearch()
}
</script>
```

```css [css]
.wraper {
  height: calc(100vh - var(--window-top) - 54px);
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom) - 54px);
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom) - 54px);
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| sticky | 索引是否吸顶 | `boolean` | `false` |

## Slots

| name | 说明 |
| --- | --- |
| default | 自定义索引列表内容 |

## IndexAnchor Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index | 索引字符 | `string \| number` | - |
| custom-style | 根节点自定义样式 | `string` | - |
| custom-class | 根节点自定义类名 | `string` | - |

## IndexAnchor Slots

| name | 说明 |
| --- | --- |
| default | 自定义内容 |

---

---
url: 'https://v2.wot-ui.cn/component/input.md'
---
# Input 输入框

用户可以在文本框中输入内容。

## 组件类型

### 基本用法

通过 `v-model` 绑定输入值，通过 `placeholder` 设置占位提示。

```html
<wd-input v-model="value" type="text" placeholder="请输入用户名" @input="handleInput" />
```

```typescript
import { ref } from 'vue'

const value = ref('')

function handleInput(event) {
  console.log(event)
}
```

### 数字类型

将 `type` 设置为 `number` 后，仅允许输入数字。

```html
<wd-input v-model="value" type="number" />
```

## 组件状态

### 禁用

设置 `disabled` 后不可输入。

```html
<wd-input v-model="value" disabled />
```

### 只读

设置 `readonly` 后不可编辑，但仍会保留展示样式。

```html
<wd-input v-model="value" readonly />
```

### 错误状态

设置 `error` 后，输入内容会展示为错误态。

```html
<wd-input v-model="value" placeholder="请输入用户名" error />
```

## 组件变体

### 清空按钮

设置 `clearable` 后，在可清空条件满足时显示清空按钮。

```html
<wd-input v-model="value" clearable @clear="handleClear" />
```

### 聚焦时显示清空按钮

通过 `clear-trigger="focus"` 控制仅在输入框聚焦且有值时展示清空按钮。

:::warning 注意
支付宝小程序暂不支持 `clear-trigger`，且某些场景下清空按钮无法点击，可参考 [issue](https://github.com/ant-design/ant-design-mini/issues/1255)。
:::

```html
<wd-input v-model="value" clear-trigger="focus" clearable />
```

### 清空后不自动聚焦

通过 `focus-when-clear` 控制点击清空按钮后是否重新聚焦。

```html
<wd-input v-model="value" :focus-when-clear="false" clearable />
```

### 密码输入框

设置 `show-password` 后，可切换密码显隐状态。

```html
<wd-input v-model="value" clearable show-password />
```

## 内容形态

### 前后图标

通过 `prefix-icon` 和 `suffix-icon` 设置前后图标，图标名称可参考 [Icon](/component/icon)。

```html
<wd-input
  v-model="value"
  prefix-icon="sound"
  suffix-icon="send"
  clearable
  @clickprefixicon="handlePrefixClick"
  @clicksuffixicon="handleSuffixClick"
/>
```

### 后缀插槽

通过 `suffix` 插槽自定义后缀内容。

```html
<wd-input v-model="value" clearable placeholder="请输入">
  <template #suffix>
    <wd-button size="small">获取验证码</wd-button>
  </template>
</wd-input>
```

## 组件样式

### 字数限制

设置 `maxlength` 后，可以通过 `show-word-limit` 展示当前字数统计。

```html
<wd-input v-model="value" :maxlength="20" show-word-limit />
```

### 紧凑布局

设置 `compact` 后会移除输入框的默认内边距和背景，适合配合 `wd-cell` 或 `wd-form-item` 使用。

```html
<wd-input
  v-model="price"
  compact
  placeholder="请输入价格"
  custom-style="display: inline-block; width: 70px; vertical-align: middle;"
/>
<text style="margin-left: 8px;">元</text>
```

## 特殊用法

### 结合表单使用

当前表单场景推荐使用 `wd-form` 与 `wd-form-item` 承载标题、必填态与校验提示，`wd-input` 仅负责输入能力。

```html
<wd-form :model="formData" border title-width="98px">
  <wd-form-item title="基本用法" prop="basic">
    <wd-input v-model="formData.basic" placeholder="请输入" compact />
  </wd-form-item>

  <wd-form-item title="自定义插槽" prop="slot" center>
    <wd-input v-model="formData.slot" placeholder="请输入" clearable compact>
      <template #suffix>
        <wd-button size="small">获取验证码</wd-button>
      </template>
    </wd-input>
  </wd-form-item>
</wd-form>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 输入框绑定值 | `string \| number` | `''` |
| type | 输入框类型，可选值为 `text`、`number`、`digit`、`idcard`、`safe-password`、`nickname`、`tel` | `InputType` | `text` |
| placeholder | 占位文本 | `string` | `请输入...` |
| placeholder-style | placeholder 样式，目前支持 `color`、`font-size`、`font-weight` | `string` | - |
| placeholder-class | placeholder 样式类 | `string` | `''` |
| maxlength | 最大输入长度 | `number` | 支付宝小程序无默认值，其余平台为 `-1` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| clear-trigger | 清空按钮显示时机，可选值为 `focus`、`always` | `InputClearTrigger` | `always` |
| focus-when-clear | 点击清空按钮后是否自动聚焦 | `boolean` | `true` |
| show-password | 是否显示密码切换按钮 | `boolean` | `false` |
| prefix-icon | 前置图标名称 | `string` | - |
| suffix-icon | 后置图标名称 | `string` | - |
| show-word-limit | 是否显示字数统计，需要同时设置 `maxlength` | `boolean` | `false` |
| error | 是否展示错误状态 | `boolean` | `false` |
| align-right | 输入内容是否右对齐 | `boolean` | `false` |
| compact | 是否开启紧凑模式；未显式设置时，在 `wd-form-item` 中会自动启用 | `boolean` | - |
| focus | 是否获取焦点 | `boolean` | `false` |
| cursor-spacing | 光标与键盘的距离 | `number` | `0` |
| cursor | 获取焦点时的光标位置 | `number` | `-1` |
| selection-start | 光标起始位置，需与 `selection-end` 搭配使用 | `number` | `-1` |
| selection-end | 光标结束位置，需与 `selection-start` 搭配使用 | `number` | `-1` |
| adjust-position | 键盘弹起时是否自动上推页面 | `boolean` | `true` |
| hold-keyboard | 聚焦时点击页面是否保持键盘不收起 | `boolean` | `false` |
| confirm-type | 键盘右下角按钮文字，可选值为 `done`、`go`、`next`、`search`、`send` | `InputConfirmType` | `done` |
| confirm-hold | 点击键盘右下角按钮时是否保持键盘不收起 | `boolean` | `false` |
| always-embed | 是否强制 input 处于同层状态，仅微信小程序 iOS 生效 | `boolean` | `false` |
| ignore-composition-event | 是否忽略文本合成系统事件处理；为 `false` 时会触发 composition 相关事件，且合成期间会触发 `input` | `boolean` | `true` |
| inputmode | 输入模式提示，可选值为 `none`、`text`、`decimal`、`numeric`、`tel`、`search`、`email`、`url` | `InputMode` | `text` |
| enable-native | 支付宝小程序下是否启用原生输入框，设为 `false` 可避免弹起键盘后内容上移 | `boolean` | `true` |
| custom-input-class | 输入框自定义类名 | `string` | `''` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

### InputMode 可选值

`inputmode` 为 HTML 规范后期扩展能力，在符合条件的高版本 WebView 中可用于 uni-app 的 Web 与 App-Vue 平台，详见 [inputmode](https://uniapp.dcloud.net.cn/component/input.html#inputmode)。

| 值 | 说明 |
| --- | --- |
| none | 不弹出虚拟键盘 |
| text | 标准文本输入键盘 |
| decimal | 小数输入键盘 |
| numeric | 纯数字输入键盘 |
| tel | 电话输入键盘 |
| search | 搜索输入优化键盘 |
| email | 邮箱输入优化键盘 |
| url | URL 输入优化键盘 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| input | 输入时触发 | `{ value, cursor, keyCode }` |
| focus | 聚焦时触发 | `{ value, height }` |
| blur | 失焦时触发 | `{ value }` |
| clear | 点击清空按钮时触发 | - |
| confirm | 点击键盘完成按钮时触发 | `{ value }` |
| keyboardheightchange | 键盘高度变化时触发 | `{ height, duration }` |
| clickprefixicon | 点击前置图标时触发 | - |
| clicksuffixicon | 点击后置图标时触发 | - |
| click | 点击组件根节点时触发 | `event: MouseEvent` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 自定义前置内容 |
| suffix | 自定义后置内容 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-input-class | 输入框样式类 |

---

---
url: 'https://v2.wot-ui.cn/component/input-number.md'
---
# InputNumber 计数器

由增加按钮、减少按钮和输入框组成，用于在一定范围内输入或调整数字。

## 组件类型

### 基本用法

通过 `v-model` 绑定输入值，通过 `change` 事件监听数值变化。

```html
<wd-input-number v-model="value" @change="handleChange" />
```

```typescript
import { ref } from 'vue'

const value = ref<number>(1)

function handleChange({ value }) {
  console.log(value)
}
```

## 组件状态

### 禁用

设置 `disabled` 后，按钮和输入框都不可操作。

```html
<wd-input-number v-model="value" disabled />
```

### 禁用输入框

设置 `disable-input` 后，仅允许通过按钮调整数值。

```html
<wd-input-number v-model="value" disable-input @change="handleChange" />
```

### 禁用减号按钮

可以单独禁用减号按钮。

```html
<wd-input-number v-model="value" disable-minus @change="handleChange" />
```

### 禁用加号按钮

可以单独禁用加号按钮。

```html
<wd-input-number v-model="value" disable-plus @change="handleChange" />
```

## 组件变体

### 主题样式

通过 `theme` 切换不同视觉风格，可选值为 `default`、`primary`、`outline-split`、`outline`。

```html
<wd-input-number v-model="value1" theme="default" />
<wd-input-number v-model="value2" theme="primary" />
<wd-input-number v-model="value3" theme="outline-split" />
<wd-input-number v-model="value4" theme="outline" />
```

### 圆角样式

设置 `round` 后，可将按钮显示为圆角样式。

```html
<wd-input-number v-model="value" round theme="primary" />
```

## 组件样式

### 设置步长

设置 `step` 后，每次增减都会按对应步长变化。

```html
<wd-input-number v-model="value" :step="2" @change="handleChange" />
```

### 设置最小值与最大值

通过 `min` 和 `max` 控制可输入范围。

```html
<wd-input-number v-model="value" :min="3" :max="10" @change="handleChange" />
```

### 设置小数精度

通过 `precision` 控制结果精度。

```html
<wd-input-number v-model="value" :precision="1" :step="0.1" @change="handleChange" />
```

### 严格步进

设置 `step-strictly` 后，输入值会在变更完成时修正为 `step` 的倍数。

```html
<wd-input-number v-model="value" step-strictly :step="2" @change="handleChange" />
```

### 严格步进与边界限制

在同时设置 `step-strictly`、`min`、`max` 时，组件会自动修正到合法区间内最接近的步进值。

```html
<wd-input-number v-model="value" step-strictly :step="2" :min="3" :max="15" @change="handleChange" />
```

### 修改输入框宽度

通过 `input-width` 设置输入框宽度，支持数字和带单位字符串。

```html
<wd-input-number v-model="value" input-width="70px" @change="handleChange" />
```

## 特殊用法

### 无输入框

设置 `without-input` 后，仅展示加减按钮。

```html
<wd-input-number v-model="value" without-input @change="handleChange" />
```

### 允许空值

设置 `allow-null` 后，输入框允许为空，可配合 `placeholder` 使用。

```html
<wd-input-number v-model="value" allow-null placeholder="不限" input-width="70px" @change="handleChange" />
```

```typescript
const value = ref<number | string>('')
```

### 非允许空值但可临时删除

当 `allow-null` 为 `false` 时，输入框可以被临时清空，但在失焦后会自动修正回合法值。

```html
<wd-input-number v-model="value" :allow-null="false" :min="1" @change="handleChange" />
```

### 键盘弹起不上推页面

设置 `adjust-position="false"` 后，键盘弹起时不自动上推页面。

```html
<wd-input-number v-model="value" :adjust-position="false" @change="handleChange" />
```

### 非立即更新模式

设置 `immediate-change="false"` 后，输入框内容变化时不会立即触发 `change`，仅在失焦或点击按钮时触发。

```html
<wd-input-number v-model="value1" :immediate-change="true" @change="handleChange" />
<wd-input-number v-model="value2" :immediate-change="false" @change="handleChange" />
```

### 初始化时自动修正

设置 `update-on-init` 控制组件初始化时是否将值修正为符合规则的结果。

```html
<wd-input-number v-model="value1" :update-on-init="true" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
<wd-input-number v-model="value2" :update-on-init="false" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
```

### 异步变更

通过 `before-change` 可以在数值变化前进行校验和拦截。

```html
<wd-input-number v-model="value" :before-change="beforeChange" />
```

```typescript
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { InputNumberBeforeChange } from '@/uni_modules/wot-ui/components/wd-input-number/types'

const { loading, close } = useToast()
const value = ref<number>(1)

const beforeChange: InputNumberBeforeChange = (value) => {
  loading({ msg: `正在更新到${value}...` })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
```

### 长按加减

设置 `long-press` 后，支持长按按钮连续增减。

```html
<wd-input-number v-model="value" long-press @change="handleChange" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 | `number \| string` | - |
| min | 最小值 | `number` | `1` |
| max | 最大值 | `number` | `Number.MAX_SAFE_INTEGER` |
| step | 步进值 | `number` | `1` |
| step-strictly | 是否严格按步进值递增或递减 | `boolean` | `false` |
| precision | 数值精度 | `number \| string` | `0` |
| disabled | 是否禁用 | `boolean` | `false` |
| disable-input | 是否禁用输入框 | `boolean` | `false` |
| disable-minus | 是否禁用减号按钮 | `boolean` | `false` |
| disable-plus | 是否禁用加号按钮 | `boolean` | `false` |
| without-input | 是否不显示输入框 | `boolean` | `false` |
| input-width | 输入框宽度，支持数字和带单位字符串 | `number \| string` | - |
| allow-null | 是否允许输入值为空，设置为 `true` 后允许传入空字符串 | `boolean` | `false` |
| placeholder | 输入框占位文本 | `string` | `''` |
| adjust-position | 键盘弹起时是否自动上推页面 | `boolean` | `true` |
| before-change | 数值变更前触发，返回 `false` 可阻止值更新，支持返回 `Promise<boolean>` | `(value: number \| string) => boolean \| Promise<boolean>` | - |
| long-press | 是否允许长按进行加减 | `boolean` | `false` |
| immediate-change | 是否立即响应输入变化，`false` 时仅在失焦或按钮点击时更新 | `boolean` | `true` |
| update-on-init | 是否在初始化时更新 `v-model` 为修正后的值 | `boolean` | `true` |
| input-type | 输入框类型，可选值为 `number`、`digit` | `'number' \| 'digit'` | `digit` |
| theme | 主题风格，可选值为 `default`、`outline`、`outline-split`、`primary` | `InputNumberTheme` | `default` |
| round | 是否启用圆角样式 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值修改时触发 | `{ value }` |
| focus | 输入框获取焦点时触发 | `{ value, height }` |
| blur | 输入框失去焦点时触发 | `{ value }` |
| update:modelValue | `v-model` 更新时触发 | `number \| string` |

---

---
url: 'https://v2.wot-ui.cn/component/keyboard.md'
---
# Keyboard 虚拟键盘

虚拟数字键盘，用于输入数字、密码、身份证或车牌号等场景。

## 基本用法

可以通过 `v-model:visible` 控制键盘是否展示。

```html
<wd-cell title="默认键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 组件类型

### 带右侧栏的键盘

将 `mode` 属性设置为 `custom` 来展示键盘的右侧栏，常用于输入金额的场景。

```html
<wd-cell title="带右侧栏的键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" extra-key="." close-text="完成" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 身份证键盘

通过 `extra-key` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extra-key` 设置为 `X`。

```html
<wd-cell title="身份证键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="X" close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 车牌号键盘

将 `mode` 属性设置为 `car` 来展示车牌号键盘，常用于输入车牌号的场景。

```html
<wd-cell title="车牌号键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 组件变体

### 车牌号键盘语言控制

通过 `car-lang` 属性可以控制车牌键盘的语言模式，支持中文省份（`zh`）和英文字母（`en`）。通过 `auto-switch-lang` 属性可以控制是否自动切换语言。

```html
<!-- 受控模式：手动控制语言切换 -->
<wd-cell title="车牌号键盘（受控）" :value="value" is-link @click="showKeyBoard" />

<wd-keyboard v-model="value" v-model:visible="visible" v-model:car-lang="lang" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>

<!-- 非受控模式：启用自动切换 -->
<wd-cell title="车牌号键盘（非受控）" :value="value2" is-link @click="showKeyBoard2" />

<wd-keyboard v-model="value2" v-model:visible="visible2" mode="car" auto-switch-lang @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const value = ref<string>('')
const value2 = ref<string>('')
const lang = ref<'zh' | 'en'>('zh')

function showKeyBoard() {
  visible.value = true
}

function showKeyBoard2() {
  visible2.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 带标题的键盘

通过 `title` 属性可以设置键盘标题。

```html
<wd-cell title="带标题的键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" title="输入密码" extra-key="." close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 使用 slot 自定义标题

```html
<wd-cell title="使用 slot 自定义标题" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="." close-text="完成" @input="onInput" @delete="onDelete">
  <template #title>
    <text style="color: red">自定义标题</text>
  </template>
</wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 多个额外按键

当 `mode` 为 `custom` 时，支持以数组的形式配置两个 `extra-key`。

```html
<wd-cell title="多个额外按键" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" :extra-key="['00', '.']" close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 随机数字键盘

通过 `random-key-order` 属性可以随机排序数字键盘，常用于安全等级较高的场景。

```html
<wd-cell title="随机数字键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" random-key-order @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 特殊用法

### 双向绑定

可以通过 `v-model` 绑定键盘当前输入值，并通过 `maxlength` 属性来限制输入长度。

```html
<wd-cell title="双向绑定" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard
  v-model="value1"
  :maxlength="6"
  v-model:visible="visible"
  title="键盘标题"
  extra-key="."
  close-text="完成"
  @input="onInput"
  @delete="onDelete"
></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 展示蒙层遮罩

`hideOnClickOutside`控制键盘弹窗是否有遮罩，通过`modal`控制遮罩是否为透明。

::: tip 提示
当前`modal`仅控制遮罩是否为透明，`hideOnClickOutside`控制弹窗是否有遮罩，当存在遮罩时，点击遮罩就可以关闭键盘，但是键盘展开时必须点击遮罩关闭当前键盘后才可以再点击别的按钮。也可以关闭`hideOnClickOutside`，手动控制键盘是否展示来实现点击外部时收起键盘，这样更灵活。
:::

```html
<wd-cell title="双向绑定" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard :modal="true" :hide-on-click-outside="true" v-model:visible="visible" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:visible | 是否展开 | `boolean` | `false` |
| v-model | 当前输入值 | `string` | `''` |
| title | 键盘标题 | `string` | - |
| mode | 键盘模式，可选值为 `default`、`custom`、`car` | `KeyboardMode` | `default` |
| z-index | 层级 | `number` | `100` |
| maxlength | 最大输入长度 | `number` | `Infinity` |
| show-delete-key | 是否显示删除键；仅对默认数字键盘与右侧栏键盘生效 | `boolean` | `true` |
| random-key-order | 是否随机排序数字按键 | `boolean` | `false` |
| close-text | 关闭按钮文本；在默认/车牌模式中显示在头部，在 `custom` 模式中显示在右侧大按钮上 | `string` | - |
| delete-text | 删除按钮文本 | `string` | - |
| close-button-loading | 关闭按钮是否显示加载状态 | `boolean` | `false` |
| modal | 是否显示蒙层；设为 `false` 时蒙层透明 | `boolean` | `false` |
| hide-on-click-outside | 是否允许点击外部关闭键盘，同时控制是否渲染遮罩 | `boolean` | `true` |
| lock-scroll | 是否锁定背景滚动 | `boolean` | `true` |
| safe-area-inset-bottom | 是否适配底部安全区 | `boolean` | `true` |
| extra-key | 额外按键，可传单个字符串或字符串数组；`custom` 模式下支持两个额外按键 | `string \| string[]` | - |
| root-portal | 是否从页面中脱离出来，用于解决 fixed 失效问题 | `boolean` | `false` |
| v-model:car-lang | 车牌键盘语言模式，当 `mode=car` 时生效，可选值为 `zh`、`en` | `CarKeyboardLang` | - |
| auto-switch-lang | 是否自动切换车牌键盘语言，当 `mode=car` 且 `car-lang` 为非受控状态时生效 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题内容 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| input | 点击可输入按键时触发 | `key: string` |
| delete | 点击删除键时触发 | - |
| close | 点击关闭按钮或遮罩关闭时触发 | - |
| update:visible | 键盘显隐状态变化时触发 | `visible: boolean` |
| update:modelValue | 当前输入值变化时触发 | `value: string` |
| update:carLang | 车牌键盘语言变化时触发 | `lang: 'zh' \| 'en'` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/layout.md'
---
# Layout 布局

用于快速进行布局。

## 布局能力

### 基础用法

`Layout` 组件提供了 `24列` 栅格，通过在 `wd-col` 上设置 `span` 属性，通过计算当前内容所占百分比进行分栏。

注意：分栏布局仅提供布局，即元素宽度，内部样式用户可根据需要通过 `custom-class` 或修改内部标签来自行定义样式。

::: code-group

```html
<wd-row>
  <wd-col :span="24"><view class="bg-dark1">span: 24</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="12"><view class="bg-dark">span: 12</view></wd-col>
  <wd-col :span="12"><view class="bg-light">span: 12</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-light">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="6"><view class="bg-dark">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-light">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-light">span: 6</view></wd-col>
</wd-row>
```

```scss
.bg-dark1,
.bg-dark,
.bg-light {
  border-radius: 4px;
  min-height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.45);
}
.bg-dark1 {
  background: #99a9bf;
  color: #fff;
}
.bg-dark {
  background: #d3dce6;
}
.bg-light {
  background: #e5e9f2;
}
```

:::

### 分栏偏移

`offset` 属性可以设置分栏的偏移量，计算方式以及偏移大小与 `span` 相同。

```html
<wd-row>
  <wd-col :span="4"><view class="bg-dark">span: 4</view></wd-col>
  <wd-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="8" :offset="4"><view class="bg-dark">span: 8 offset: 4</view></wd-col>
  <wd-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></wd-col>
</wd-row>
```

### 分栏间隔

通过 `gutter` 属性可以设置列元素之间的间距，默认间距为 0。

```html
<wd-row :gutter="20">
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-light">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
</wd-row>
```

### Justify 对齐

通过 `justify` 属性可以设置主轴对齐方式，可选值为 `start`、`center`、`end`、`space-between`、`space-around`、`space-evenly`。

```html
<wd-row justify="center">
  <wd-col :span="6"><view class="bg-dark">center</view></wd-col>
  <wd-col :span="6"><view class="bg-light">center</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">center</view></wd-col>
</wd-row>
<wd-row justify="end">
  <wd-col :span="6"><view class="bg-dark">end</view></wd-col>
  <wd-col :span="6"><view class="bg-light">end</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">end</view></wd-col>
</wd-row>
<wd-row justify="space-between">
  <wd-col :span="6"><view class="bg-dark">between</view></wd-col>
  <wd-col :span="6"><view class="bg-light">between</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">between</view></wd-col>
</wd-row>
<wd-row justify="space-around">
  <wd-col :span="6"><view class="bg-dark">around</view></wd-col>
  <wd-col :span="6"><view class="bg-light">around</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">around</view></wd-col>
</wd-row>
```

### Align 对齐

通过 `align` 属性可以设置交叉轴对齐方式，可选值为 `top`、`middle`、`bottom`。

```html
<wd-row align="middle">
  <wd-col :span="8"><view class="bg-dark" style="height: 60px; line-height: 60px">middle</view></wd-col>
  <wd-col :span="8"><view class="bg-light" style="height: 30px; line-height: 30px">middle</view></wd-col>
  <wd-col :span="8"><view class="bg-dark" style="height: 50px; line-height: 50px">middle</view></wd-col>
</wd-row>
<wd-row align="bottom">
  <wd-col :span="8"><view class="bg-dark" style="height: 60px; line-height: 60px">bottom</view></wd-col>
  <wd-col :span="8"><view class="bg-light" style="height: 30px; line-height: 30px">bottom</view></wd-col>
  <wd-col :span="8"><view class="bg-dark" style="height: 50px; line-height: 50px">bottom</view></wd-col>
</wd-row>
```

## Row Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 列元素之间的间距（单位为 px） | `number` | `0` |
| justify | 主轴对齐方式，可选值为 `start`、`center`、`end`、`space-between`、`space-around`、`space-evenly` | `string` | `start` |
| align | 交叉轴对齐方式，可选值为 `top`、`middle`、`bottom` | `string` | `top` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## Col Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 列元素宽度（栅格占据的列数，共 24 列） | `number` | `24` |
| offset | 列元素偏移距离（栅格左侧的间隔列数） | `number` | `0` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## Row Slots

| name | 说明 |
| --- | --- |
| default | 行内容 |

## Col Slots

| name | 说明 |
| --- | --- |
| default | 列内容 |

---

---
url: 'https://v2.wot-ui.cn/guide/llms-txt.md'
---

# LLMs.txt

[llms.txt](https://llmstxt.org/) 是一个专为大型语言模型设计的文本文件，类似 robots.txt，但目标不同。robots.txt 告诉搜索引擎爬虫哪些页面可以爬取，而 llms.txt 为 AI 工具提供网站内容的结构化信息，帮助它们更好地理解和索引组件库文档、示例和最佳实践。

## 可用资源

我们也提供 2 个 `llms.txt` 路由来帮助 AI 工具访问文档：

* [llms.txt](https://wot-ui.cn/llms.txt) - 包含所有组件及其文档链接的结构化概览
* [llms-full.txt](https://wot-ui.cn/llms-full.txt) - 提供包含实现细节和示例的完整文档

## 在 AI 工具中使用

### Cursor

在 Cursor 中找到 `Indexing & Docs` 设置，并将 `llms.txt` 添加到 `Docs` 中，使用 `@Docs` 功能将 llms.txt 文件包含到项目中。

[详细了解 Cursor 中的 @Docs 功能](https://cursor.com/docs/agent/tools/search)

### TRAE

在 TRAE 中找到 `上下文/文档集` 设置，并将 `llms.txt` 添加到 `文档集` 中，使用 `#Docs` 功能将 llms.txt 文件包含到项目中。

[详细了解 TRAE 中的 #Docs 功能](https://docs.trae.ai/ide/number-sign)

### 其他工具

任何支持 `llms.txt` 标准，或支持通过 URL 摄取文档的工具，都可以使用我们提供的 llms.txt 文件。你可以将它加入工具的 `文档集`、`rules` 或知识库配置中，帮助 AI 更好地理解 Wot UI 组件库。

### context7

如果不使用 llms.txt，也可以通过 [context7](https://github.com/upstash/context7) 直接读取组件库文档。

[详细了解 context7](https://github.com/upstash/context7)

## 延伸阅读

* [Skills](/guide/skills)
* [llms.txt：让 AI 更好地理解你的文档](https://juejin.cn/post/7500981295105015847)

---

---
url: 'https://v2.wot-ui.cn/component/loading.md'
---
# Loading 加载指示器

加载动画，用于表示加载中的过渡状态。

## 组件类型

### 类型

通过 `type` 属性设置指示器类型，可选值为 `circular`、`spinner`、`dots`、`wave`，默认为 `circular`。

```html
<wd-loading />
<wd-loading type="spinner" />
<wd-loading type="dots" />
<wd-loading type="wave" />
```

## 组件样式

### 颜色

通过 `color` 属性修改指示器的颜色。

```html
<wd-loading color="#fa34aa" />
<wd-loading type="spinner" color="#fa34aa" />
<wd-loading type="dots" color="#fa34aa" />
<wd-loading type="wave" color="#fa34aa" />
```

### 大小

通过 `size` 属性设置指示器的大小，支持 `number` / `string` 类型。

```html
<wd-loading :size="20" type="wave" />
<wd-loading :size="30" type="wave" />
<wd-loading size="50px" type="wave" />
```

## 内容形态

### 显示文字

通过 `text` 属性或默认插槽设置加载文字。

```html
<wd-loading text="加载中..."></wd-loading>
<wd-loading>加载中...</wd-loading>
<wd-loading type="spinner">加载中...</wd-loading>
<wd-loading type="wave">加载中...</wd-loading>
```

### 水平方向

通过 `direction` 属性设置文字与指示器的排列方向，可选值为 `vertical`、`horizontal`，默认为 `vertical`。

```html
<wd-loading direction="horizontal" text="加载中..."></wd-loading>
<wd-loading direction="horizontal">加载中...</wd-loading>
<wd-loading direction="horizontal" type="spinner">加载中...</wd-loading>
<wd-loading direction="horizontal" type="wave">加载中...</wd-loading>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 加载指示器类型，可选值为 `circular`、`spinner`、`dots`、`wave` | `LoadingType` | `circular` |
| color | 设置加载指示器颜色 | `string` | - |
| size | 设置加载指示器大小 | `number \| string` | - |
| text | 加载指示器文字 | `string` | - |
| direction | 排列方向，可选值为 `vertical`、`horizontal` | `LoadingDirection` | `vertical` |
| inherit-color | 是否继承父元素颜色 | `boolean` | `false` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |
| custom-spinner-class | 自定义加载指示器样式类 | `string` | - |

## Slots

| name | 说明 |
| --- | --- |
| default | 加载文字内容 |

---

---
url: 'https://v2.wot-ui.cn/component/loadmore.md'
---
# loadmore 加载更多

用于在列表底部展示加载状态。

## 基本用法

在需要进行加载的列表的底部引入该组件即可。当滑动到列表底部时，通过设置`state`展示不同的文案。

```html
<wd-loadmore custom-class="loadmore" state="loading" />

<wd-loadmore custom-class="loadmore" state="finished" />

<wd-loadmore custom-class="loadmore" state="error" />
```

```scss
:deep(.loadmore) {
  background-color: #f4f4f4;
  margin: 20px 0;
}
```

## 自定义文案

通过设置`loading-text`、`finished-text`、`error-text`配合`state`展示不同状态时的文案

```html
<wd-loadmore custom-class="loadmore" state="loading" loading-text="自定义加载文案" />

<wd-loadmore custom-class="loadmore" state="finished" finished-text="自定义完成文案" />

<wd-loadmore custom-class="loadmore" state="error" error-text="自定义错误文案" />
```

## 点击继续加载

当 `state` 为 `error` 时，点击组件区域会触发 `reload` 事件。

```html
<wd-loadmore custom-class="loadmore" state="error" @reload="loadmore" />
```

## 应用实现

配合`onReachBottom`事件实现滚动到底部加载更多

```html
<view class="container">
  <view v-for="index in num" :key="index" class="list-item">
    <image src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/70325/36/14954/36690/5dcd3e3bEee5006e0/aed1ccf6d5ffc764.png" />
    <view class="right">这是一条测试{{ index + 1 }}</view>
  </view>
  <wd-loadmore :state="state" @reload="loadmore" />
</view>
```

```typescript
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'


const state = ref<string>('loading')
const num = ref<number>(0)
const max = ref<number>(60)

onReachBottom(() => {
  if (num.value === 45) {
    state.value = 'error'
  } else if (num.value < max.value) {
    loadmore()
  } else if (num.value === max.value) {
    state.value = 'finished'
  }
})

onLoad(() => {
  loadmore()
})

function loadmore() {
  setTimeout(() => {
    num.value = num.value + 15
    state.value = 'loading'
  }, 200)
}
```

```scss
.list-item {
  position: relative;
  display: flex;
  padding: 10px 15px;
  background: #fff;
  color: #464646;
}

.list-item:after {
  position: absolute;
  display: block;
  content: '';
  height: 1px;
  left: 0;
  width: 100%;
  bottom: 0;
  background: #eee;
  transform: scaleY(0.5);
}
image {
  display: block;
  width: 120px;
  height: 78px;
  margin-right: 15px;
}
.right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| state | 加载状态，可选值为 `loading`、`finished`、`error` | `LoadMoreState` | - |
| loading-text | 加载状态文案 | `string` | 国际化文案“正在努力加载中...” |
| finished-text | 加载完成文案 | `string` | 国际化文案“已加载完毕” |
| error-text | 加载失败文案；“点击重试”为组件内独立提示文案，不包含在该属性默认值中 | `string` | 国际化文案“加载失败” |
| loading-props | 内部 `wd-loading` 的属性配置，类型参见下方 `LoadingProps` | `Partial<LoadingProps>` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

#### LoadingProps

参见 [LoadingProps](/component/loading.html#attributes)。传入的 `customClass` 会自动追加 `wd-loadmore__loading` 类名。

## Slots

| name | 说明 |
| --- | --- |
| loading | 自定义加载中内容 |
| finished | 自定义加载完成内容 |
| error | 自定义加载失败内容 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| reload | `state` 为 `error` 时，点击组件触发 | - |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/navbar.md'
---
# Navbar 导航栏

为页面提供导航功能，常用于页面顶部。

::: tip 常见问题

**右图标被小程序胶囊挡住？**

在小程序平台开启自定义顶部导航时，右上角会固定显示胶囊，所以此时右侧插槽及选项是不建议使用。

**如何设置为背景透明？**

通过 `custom-style` 设置组件 `background-color` 为 `transparent`。

```html
<wd-navbar title="标题" custom-style="background-color: transparent !important;"></wd-navbar>
```

**组件会被 `video` 覆盖？**

`video` 为原生组件，层级较高，目前无法遮盖，需要具体平台具体分析。
:::

## 组件类型

### 基础用法

通过 `title` 属性设置导航栏标题。

```html
<wd-navbar title="标题"></wd-navbar>
```

### 返回上级

在导航栏实现返回上级功能。

::: code-group

```html
<wd-navbar title="标题" left-text="返回" left-arrow @click-left="handleClickLeft"></wd-navbar>
```

```ts
function handleClickLeft() {
  uni.navigateBack()
}
```

:::

### 右侧按钮

在导航栏右侧添加可点击的按钮。

::: code-group

```html
<wd-navbar title="标题" left-text="返回" left-arrow right-text="按钮" @click-left="handleClickLeft" @click-right="handleClickRight"></wd-navbar>
```

```ts
import { useToast } from '@/uni_modules/wot-ui'

const { show: showToast } = useToast()

function handleClickRight() {
  showToast('按钮')
}
```

:::

## 组件状态

### 禁用按钮

通过 `left-disabled` 或 `right-disabled` 属性来禁用两侧的按钮。按钮被禁用时透明度降低，且无法点击。

```html
<wd-navbar title="标题" left-text="返回" right-text="按钮" left-arrow left-disabled right-disabled></wd-navbar>
```

## 组件样式

### 固定在顶部

通过 `fixed` 属性设置导航栏固定在页面顶部，通过 `placeholder` 在顶部生成占位空间，通过 `safeAreaInsetTop` 开启顶部安全区的适配。

```html
<wd-navbar fixed placeholder title="Navbar 导航栏" left-arrow safeAreaInsetTop></wd-navbar>
```

## 内容形态

### 使用插槽

可以通过 `left` 和 `right` 插槽自定义导航栏两侧的内容。

```html
<wd-navbar title="标题">
  <template #left>
    <wd-icon name="left" size="24px" class="wd-navbar__arrow" />
  </template>
  <template #right>
    <wd-icon name="search-line" size="18" />
  </template>
</wd-navbar>
```

### 胶囊样式

通过 `capsule` 插槽和 `wd-navbar-capsule` 组件定制返回胶囊。

::: code-group

```html
<wd-navbar title="标题" left-text="返回" right-text="设置" left-arrow>
  <template #capsule>
    <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
  </template>
</wd-navbar>
```

```ts
function handleBack() {
  uni.navigateBack({})
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/index/Index' })
}
```

:::

### 带搜索栏

通过 `title` 插槽自定义标题区域。

::: code-group

```html
<wd-navbar left-text="返回" right-text="设置" left-arrow>
  <template #title>
    <view class="search-box">
      <wd-search v-model="keyword" hide-cancel placeholder-left></wd-search>
    </view>
  </template>
</wd-navbar>
```

```scss
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
  :deep() {
    .wd-search {
      background: transparent;
    }
  }
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题文字 | `string` | - |
| left-text | 左侧文案 | `string` | - |
| right-text | 右侧文案 | `string` | - |
| left-arrow | 是否显示左侧箭头 | `boolean` | `false` |
| bordered | 是否显示下边框 | `boolean` | `false` |
| fixed | 是否固定到顶部 | `boolean` | `false` |
| placeholder | 固定在顶部时，在标签位置生成一个等高的占位元素 | `boolean` | `false` |
| z-index | 导航栏 z-index | `number` | `10` |
| safe-area-inset-top | 是否开启顶部安全区适配 | `boolean` | `false` |
| left-disabled | 是否禁用左侧按钮，禁用时透明度降低，且无法点击 | `boolean` | `false` |
| right-disabled | 是否禁用右侧按钮，禁用时透明度降低，且无法点击 | `boolean` | `false` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click-left | 点击左侧按钮时触发 | - |
| click-right | 点击右侧按钮时触发 | - |

## Slots

| name | 说明 |
| --- | --- |
| capsule | 自定义胶囊（当存在胶囊时，left 不生效） |
| left | 左侧内容 |
| title | 标题内容 |
| right | 右侧内容 |

## NavbarCapsule Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## NavbarCapsule Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| back | 点击返回按钮时触发 | - |
| back-home | 点击返回首页按钮时触发 | - |

---

---
url: 'https://v2.wot-ui.cn/component/notice-bar.md'
---
# NoticeBar 通知栏

通知栏组件，用于在页面顶部展示通知提醒。

## 组件类型

### 基本用法

设置 `text` 文本内容和 `prefix` 左侧图标。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="warn-bold" />
```

## 组件变体

### 类型修改

设置 `type` 可修改通知类型，通知类型共有三种 `info`|`warning`|`danger`，默认值为`warning`。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="warn-bold" custom-class="space" />
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="check-outline" type="info" custom-class="space" />
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="wifi-error" type="danger" />
```

```scss
:deep(.space) {
  margin-bottom: 10px;
}
```

### 可关闭的

设置 `closable` 属性，使通知栏可以关闭。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" closable />
```

## 内容形态

### 禁止滚动

设置 `scrollable` 为 `false` 可以关闭滚动效果，通知栏会保持静态展示。

```html
<wd-notice-bar text="欲买桂花同载酒，终不似，少年游" :scrollable="false" prefix="stop" />
```

### 插槽演示

未传 `prefix` 属性时，可以通过 `prefix` 插槽自定义左侧内容；`suffix` 插槽会覆盖默认的关闭图标区域。

```html
<wd-notice-bar :scrollable="false">
  <template #prefix>
    <wd-icon class="prefix" name="warn-bold">占位符</wd-icon>
  </template>
  通知被禁或时段内消息屏蔽可能造成消…
  <template #suffix>
    <div style="color: #4d80f0">查看</div>
  </template>
</wd-notice-bar>
```

```scss
:deep(.prefix) {
  font-size: 18px;
  padding-right: 4px;
  width: 18px;
  height: 18px;
}
```

### 多行展示

设置 `wrapable` 属性为 `true` 且同时禁止滚动 `scrollable` 即可开启多行展示。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" wrapable :scrollable="false" />
```

## 组件样式

### 自定义颜色

设置 `color` 修改文字和图标颜色，设置 `background-color` 修改背景颜色。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="check-outline"
  color="#34D19D"
  background-color="#f0f9eb"
/>
```

## 特殊用法

### 多文本轮播

将一个`string[]`传递给`text`属性，即可开启多文本轮播，并且会在展示下一条文本时触发`next`事件，该事件接收一个`number`参数，代表的是当前展示的文本数组索引

```html
<wd-notice-bar :text="textArray" prefix="check-outline" @next="onNext" />
```

```javascript
import { ref } from 'vue'

const textArray = ref([
  '欢迎使用 wot-ui 组件库',
  '该组件库基于uniapp ->Vue3, ts构建',
  '项目地址：https://github.com/wot-ui/wot-ui',
  '我们的目标是打造最强uniapp组件库',
  '诚挚邀请大家共同建设',
  '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息'
])

const onNext = (index: number) => {
  console.log('展示下一条，index: ', index)
  console.log('文本是：' + textArray.value[index])
}
```

### 垂直滚动

1. `direction`传递`vertical`即可开启垂直滚动，目前仅支持一个方向的垂直滚动
2. `text`为数组时才会进行滚动

```html
<wd-notice-bar prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
<wd-notice-bar prefix="warn-bold" direction="vertical" text="只有一条消息不会滚动" :delay="3" custom-class="space" />
```

### 点击事件

点击通知内容区时会触发 `click` 事件，返回当前展示文本和对应索引。

```html
<wd-notice-bar :text="textArray" prefix="thunderbolt" @click="handleClick" />
```

```ts
function handleClick(result: { text: string; index: number }) {
  console.log(result)
}
```

### 重置播放动画

通过`ref`获取组件实例，调用`reset`方法即可重置播放动画。当你遇到`NoticeBar`的播放动画异常的情况时，可以调用`reset`方法重置动画。

例如：在`APP-VUE`端，`Tabbar`页面使用`NoticeBar`时，从其它界面返回到`NoticeBar`页面，会偶发`NoticeBar`动画异常，此时可以调用`reset`方法重置动画。

参考issues：[#358](https://github.com/Moonofweisheng/wot-design-uni/issues/358)、[#650](https://github.com/Moonofweisheng/wot-design-uni/issues/650)

```html
<wd-notice-bar ref="notice" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" />
<wd-button @click="handleReset">重置播放动画</wd-button>
```

```ts
// uni_modules
import { type NoticeBarInstance } from '@/uni_modules/wot-design-uni/components/wd-notice-bar/types'
// npm
// import { type NoticeBarInstance } from 'wot-design-uni/components/wd-notice-bar/types'

const notice = ref<NoticeBarInstance>()

const textArray = ref([
  '欢迎使用 wot-ui 组件库',
  '该组件库基于uniapp ->Vue3, ts构建',
  '项目地址：https://github.com/wot-ui/wot-ui',
  '我们的目标是打造最强uniapp组件库',
  '诚挚邀请大家共同建设',
  '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息'
])

function handleReset() {
  notice.value?.reset()
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 通知栏文案 | `string \| string[]` | `''` |
| type | 通知栏类型，可选值为 `warning`、`info`、`danger` | `NoticeBarType` | `warning` |
| prefix | 左侧图标名称 | `string` | - |
| scrollable | 是否开启滚动播放 | `boolean` | `true` |
| delay | 滚动动画初始延时，单位为秒 | `number` | `1` |
| speed | 滚动速度，单位为 `px/s` | `number` | `50` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| wrapable | 是否换行展示；仅在 `scrollable=false` 的横向模式下生效 | `boolean` | `false` |
| color | 文字和图标颜色 | `string` | - |
| background-color | 背景颜色 | `string` | - |
| direction | 滚动方向，可选值为 `horizontal`、`vertical` | `NoticeBarScrollDirection` | `horizontal` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| close | 点击关闭按钮时触发 | - |
| next | 切换到下一条文本时触发 | `index: number` |
| click | 点击内容区时触发 | `{ text: string, index: number }` |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| reset | 重置播放动画 | - |

## Slots

| name | 说明 |
| --- | --- |
| prefix | 自定义前置内容；传入 `prefix` 属性时该插槽不生效 |
| suffix | 自定义后置内容；会覆盖默认关闭图标 |
| default | 自定义通知文本内容；仅在 `direction='horizontal'` 时生效 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/notify.md'
---
# Notify 消息通知

通知类组件，用于在页面顶部展示通知信息。

## 组件状态

### 基础用法

需要在页面中引入该组件，作为挂载点。

::: code-group

```html
<wd-notify />
```

```ts
import { useNotify } from '@/uni_modules/wot-ui'

const { showNotify, closeNotify } = useNotify()

// 3 秒后自动关闭
showNotify('通知内容')

// 主动关闭
closeNotify()
```

:::

### 自定义配置

支持自定义颜色、弹出位置、展示时长以及是否显示关闭按钮。

::: code-group

```ts
// 自定义颜色
showNotify({
  message: '自定义颜色',
  color: '#ad0000',
  background: '#ffe1e1'
})

// 自定义位置
showNotify({
  message: '自定义位置',
  position: 'bottom'
})

// 自定义时长
showNotify({
  message: '自定义时长',
  duration: 1000
})

// 显示关闭按钮
showNotify({
  message: '通知内容',
  closable: true,
  duration: 0
})
```

:::

## 组件类型

### 通知类型

支持 `primary`、`success`、`warning`、`danger` 四种通知类型，默认为 `danger`。

::: code-group

```ts
// 主要通知
showNotify({ type: 'primary', message: '通知内容' })

// 成功通知
showNotify({ type: 'success', message: '通知内容' })

// 危险通知
showNotify({ type: 'danger', message: '通知内容' })

// 警告通知
showNotify({ type: 'warning', message: '通知内容' })
```

:::

## 组件样式

### 悬浮通知

通过 `variant` 属性设置为 `floating` 可展示悬浮卡片式通知。悬浮通知具有独立的外边距、圆角与阴影，并且其前缀图标会自动适配当前 `type` 的状态主色。

::: code-group

```ts
showNotify({
  type: 'primary',
  message: '通知内容',
  variant: 'floating',
  closable: true
})
```

:::

## 内容形态

### 使用 Notify 组件

如果需要在 Notify 内嵌入组件或其他自定义内容，可以直接使用 Notify 组件，并使用默认插槽进行定制。

::: code-group

```html
<wd-button type="primary" @click="showNotify">使用 Notify 组件调用</wd-button>
<wd-notify type="success" :safe-height="safeHeight" v-model:visible="visible">
  <wd-icon name="check-outline" size="inherit" color="inherit" />
  成功通知
</wd-notify>
```

```ts
import { ref, onMounted } from 'vue'

let timer: ReturnType<typeof setTimeout>
export default {
  setup() {
    const visible = ref(false)
    const safeHeight = ref(0)

    const showNotify = () => {
      visible.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        visible.value = false
      }, 3000)
    }

    onMounted(() => {
      // #ifdef H5
      safeHeight.value = 44
      // #endif
    })

    return {
      visible,
      showNotify,
      safeHeight
    }
  }
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `success` `warning` `danger` | `NotifyType` | `danger` |
| message | 展示文案，支持通过`\n`换行 | `string \| number` | - |
| duration | 展示时长(ms)，值为 0 时，notify 不会消失 | `number` | `3000` |
| visible | 显示状态（支持 v-model） | `boolean` | `false` |
| position | 弹出位置，可选值为 `top` `bottom` | `NotifyPosition` | `top` |
| color | 字体颜色 | `string` | - |
| background | 背景颜色 | `string` | - |
| z-index | 将组件的 z-index 层级设置为一个固定值 | `number` | `99` |
| safe-height | 顶部安全高度 | `number \| string` | - |
| selector | 指定唯一标识 | `string` | - |
| root-portal | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 | `boolean` | `false` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| variant | 展示形态，可选值为 `filled` `floating` | `NotifyVariant` | `filled` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击时的回调函数 | `(event: MouseEvent) => void` |
| closed | 关闭时的回调函数 | `() => void` |
| opened | 展示后的回调函数 | `() => void` |

## Slots

| name | 说明 |
| --- | --- |
| default | 自定义通知内容 |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| showNotify | 展示提示 | `NotifyOptions` / `string` |
| closeNotify | 关闭提示 | - |
| setNotifyDefaultOptions | 修改默认配置，影响所有的 `showNotify` 调用 | `NotifyOptions` |
| resetNotifyDefaultOptions | 重置默认配置，影响所有的 `showNotify` 调用 | - |

## Options

调用 `showNotify`、 `setNotifyDefaultOptions` 等方法时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `success` `warning` `danger` | `NotifyType` | `danger` |
| message | 展示文案，支持通过`\n`换行 | `string \| number` | - |
| duration | 展示时长(ms)，值为 0 时，notify 不会消失 | `number` | `3000` |
| position | 弹出位置，可选值为 `top` `bottom` | `NotifyPosition` | `top` |
| color | 字体颜色 | `string` | - |
| background | 背景颜色 | `string` | - |
| zIndex | 将组件的 z-index 层级设置为一个固定值 | `number` | `99` |
| safeHeight | 顶部安全高度 | `number \| string` | - |
| rootPortal | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 | `boolean` | `false` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| variant | 展示形态，可选值为 `filled` `floating` | `NotifyVariant` | `filled` |
| customClass | 根节点样式类名 | `string` | - |
| customStyle | 根节点样式 | `string` | - |
| onClick | 点击时的回调函数 | `(event: MouseEvent) => void` | - |
| onClosed | 关闭时的回调函数 | `() => void` | - |
| onOpened | 展示后的回调函数 | `() => void` | - |

---

---
url: 'https://v2.wot-ui.cn/component/overlay.md'
---
# Overlay 遮罩层

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

## 基础用法

### 基础组件

使用 `show` 控制遮罩层的显示/隐藏。

```html
<wd-button type="primary" @click="show = true">显示遮罩层</wd-button>
<wd-overlay :show="show" @click="show = false" />
```

## 特殊样式

### 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容。

::: code-group

```html
<wd-button type="primary" @click="show = true">嵌入内容</wd-button>
<wd-overlay :show="show" @click="show = false">
  <view class="wrapper">
    <view class="block" @click.stop="" />
  </view>
</wd-overlay>
```

```scss
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否展示遮罩层 | `boolean` | `false` |
| duration | 动画时长，单位为毫秒 | Record\<string, number> | number | boolean | `300` |
| lock-scroll | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | `boolean` | `true` |
| z-index | 层级 | `number` | `10` |
| custom-style | 根节点样式 | `string` | `''` |
| custom-class | 根节点样式类名 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击遮罩层时触发 | - |
| before-enter | 进入动画开始前触发 | - |
| enter | 进入动画开始时触发 | - |
| after-enter | 进入动画结束后触发 | - |
| before-leave | 离开动画开始前触发 | - |
| leave | 离开动画开始时触发 | - |
| after-leave | 离开动画结束后触发 | - |

## Slots

| name | 说明 |
| --- | --- |
| default | 遮罩层内容 |

---

---
url: 'https://v2.wot-ui.cn/component/pagination.md'
---
# Pagination 分页

当数据量过多时，使用分页分解数据。

## 组件类型

### 基本用法

通过 `v-model` 来绑定当前页码，`total`设置总条数，`page-size`设置一页展示条数，默认为10条，总页数通过`total`和`page-size`自动计算。

```html
<wd-pagination v-model="value" :total="190" @change="handleChange" />
```

```typescript
const value = ref<number>(1)
function handleChange({ value }) {
  console.log(value)
}
```

## 组件变体

### 按钮风格

通过 `button-variant` 设置按钮风格，可选值为 `text`、`plain`、`dashed`、`base`。

```html
<wd-pagination v-model="value1" :total="190" button-variant="plain" />
<wd-pagination v-model="value2" :total="190" button-variant="dashed" />
<wd-pagination v-model="value3" :total="190" button-variant="base" />
```

### Icon 图标

设置 `show-icon` 属性，将分页导航展示为Icon图标。

```html
<wd-pagination v-model="value" :total="19" @change="handleChange" show-icon />
```

### 文字提示

设置 `show-message` 属性，展示文字提示。

```html
<wd-pagination 
  v-model="value" 
  :total="total" 
  :page-size="pageSize" 
  @change="handleChange" 
  show-icon 
  show-message
/>
```

```typescript
const value = ref<number>(1)
const total = ref<number>(160)
const pageSize = ref<number>(20)
```

## 内容形态

### 自定义插槽

组件提供 `prev`、`size`、`next`、`message` 四个插槽，可用于自定义分页按钮、中间页码信息和底部提示。

```html
<wd-pagination v-model="value" :total="190" show-message>
  <template #prev="{ modelValue }">
    <wd-button :disabled="modelValue <= 1" size="small" type="danger" @click="value -= 1">上一页</wd-button>
  </template>
  <template #next="{ modelValue, totalPageNum }">
    <wd-button :disabled="modelValue >= totalPageNum" size="small" type="danger" @click="value += 1">下一页</wd-button>
  </template>
  <template #size="{ modelValue, totalPageNum }">
    <view class="custom-pagination__content">
      <text class="custom-pagination__page">{{ modelValue }}</text>
      <text class="custom-pagination__separator">/</text>
      <text class="custom-pagination__total">{{ totalPageNum }}</text>
    </view>
  </template>
  <template #message="{ total }">
    <view class="custom-pagination__message">当前第{{ value }}页，共{{ total }}条数据</view>
  </template>
</wd-pagination>
```

```scss
.custom-pagination__content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.custom-pagination__page {
  color: #f00;
}

.custom-pagination__separator {
  margin: 0 5px;
}

.custom-pagination__total {
  color: #00f;
}

.custom-pagination__message {
  margin-top: 10px;
  color: #999;
  text-align: center;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前页码 | `number` | - |
| total-page | 总页数；传入 `total` 时会优先根据 `total` 与 `page-size` 计算 | `number` | `1` |
| total | 总数据条数 | `number` | `0` |
| page-size | 每页条数 | `number` | `10` |
| prev-text | 上一页按钮文字；未设置时使用内置国际化文案 | `string` | - |
| next-text | 下一页按钮文字；未设置时使用内置国际化文案 | `string` | - |
| show-icon | 是否展示翻页图标 | `boolean` | `false` |
| show-message | 是否展示文字提示 | `boolean` | `false` |
| button-variant | 分页按钮风格，可选值为 `base`、`plain`、`dashed`、`text` | `ButtonVariant` | `text` |
| hide-if-one-page | 总页数只有一页时是否隐藏 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 页码变化时触发 | `{ value }` |
| update:modelValue | `v-model` 更新时触发 | `value: number` |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| prev | 自定义上一页按钮 | `{ modelValue, totalPageNum, total, pageSize }` |
| size | 自定义中间页码显示区域 | `{ modelValue, totalPageNum, total, pageSize }` |
| next | 自定义下一页按钮 | `{ modelValue, totalPageNum, total, pageSize }` |
| message | 自定义底部提示信息，仅在 `show-message` 为 `true` 时生效 | `{ modelValue, totalPageNum, total, pageSize }` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/password-input.md'
---
# PasswordInput 密码输入框

带网格的密码输入组件，适用于支付密码、短信验证码等场景，通常与 [Keyboard 键盘](./keyboard.md) 组件配合使用。

`wd-password-input` 仅负责展示输入值、光标和提示信息，不直接处理录入逻辑。通常将 `focused` 与键盘显隐状态绑定，并在 `focus` 事件中打开键盘。

## 组件类型

### 基础用法

搭配 `wd-keyboard` 组件实现密码输入。

```html
<wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

```typescript
import { ref } from 'vue'

const value = ref<string>('123')
const showKeyboard = ref<boolean>(false)
```

## 组件变体

### 自定义长度

通过 `length` 设置密码位数，并同步设置键盘的 `maxlength`。

```html
<wd-password-input v-model="value" :length="4" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="4" />
```

## 组件样式

### 格子间距

通过 `gutter` 设置格子之间的间距，默认单位为 `px`。

```html
<wd-password-input v-model="value" :gutter="10" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

## 内容形态

### 明文展示

将 `mask` 设置为 `false` 可以明文展示输入内容，适用于短信验证码等场景。

```html
<wd-password-input v-model="value" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

### 提示信息

通过 `info` 设置普通提示信息，通过 `error-info` 设置错误提示。

```html
<wd-password-input
  v-model="value"
  info="密码为 6 位数字"
  :error-info="errorInfo"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
```

```typescript
import { ref, watch } from 'vue'

const value = ref('123')
const errorInfo = ref('')
const showKeyboard = ref(false)

watch(value, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误'
  } else {
    errorInfo.value = ''
  }
})
```

## 特殊用法

### 随机键盘

结合 `wd-keyboard` 的 `random-key-order` 能力，可以提升数字输入场景的安全性。

```html
<wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" random-key-order />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前输入值 | `string` | `''` |
| mask | 是否隐藏密码内容 | `boolean` | `true` |
| info | 输入框下方文字提示 | `string` | `''` |
| error-info | 输入框下方错误提示 | `string` | `''` |
| gutter | 输入框格子之间的间距，默认单位为 `px` | `number \| string` | `0` |
| length | 密码长度 | `number` | `6` |
| focused | 是否处于聚焦状态；聚焦时显示光标，通常与键盘显隐状态联动 | `boolean` | `true` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| focus | 点击密码输入框时触发 | `event: Event` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/picker.md'
---
# Picker 选择器

Picker 包含了一个弹出层（`wd-popup`）与一个选择器视图（`wd-picker-view`），不包含外层的触发元素（如 Input、Cell 等）。通常需要结合 `wd-cell` 或表单相关组件来触发显示。

## 基础用法

需结合一个外部触发器，比如 `wd-cell`，并通过绑定 `v-model` 来保存选中的内容数组，利用 `v-model:visible` 控制 Picker 的显示或隐藏。

::: code-group

```html
<wd-cell title="单列选项" placeholder="请选择" :value="value[0]" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref<string[]>([])
const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
```

:::

## 多列

`columns` 属性传入二维数组，此时 `value` 为对应列选中项 `value` 的一维数组。

::: code-group

```html
<wd-cell title="多列" :value="displayValue" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" @confirm="handleConfirm" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref([])
const displayValue = ref('')

const columns = ref([
  [
    { label: '中山大学', value: '1' },
    { label: '中南大学', value: '2' },
    { label: '华南理工大学', value: '3' }
  ],
  [
    { label: '计算机科学与技术', value: '1' },
    { label: '软件工程', value: '2' },
    { label: '通信工程', value: '3' }
  ]
])

const handleConfirm = ({ selectedItems }: any) => {
  displayValue.value = selectedItems.map((item: any) => item.label).join(', ')
}
```

:::

## 多级联动

设置 `cascade` 属性，并将 `columns` 设定为带层级的树状结构（通过 `children` 嵌套子项）。
可以结合自定义的展示函数进行页面回填格式化。

::: code-group

```html
<wd-cell title="多级联动" :value="displayValue" is-link @click="show = true" />
<wd-picker v-model="value" v-model:visible="show" :columns="columns" cascade @confirm="handleConfirm" />
```

```typescript
import { ref } from 'vue'

const show = ref(false)
const value = ref(['110000', '110100', '110102'])
const displayValue = ref('北京 - 北京市 - 西城区')

const columns = ref([
  {
    label: '北京',
    value: '110000',
    children: [
      {
        label: '北京市',
        value: '110100',
        children: [
          { label: '东城区', value: '110101' },
          { label: '西城区', value: '110102' },
          { label: '朝阳区', value: '110105' }
        ]
      }
    ]
  }
])

function handleConfirm({ selectedItems }: any) {
  displayValue.value = selectedItems.map((item: any) => item.label).join(' - ')
}
```

:::

## 自定义弹窗标题

可通过 `title` 属性为内部弹窗配置顶部提示性文字标题。

::: code-group

```html
<wd-cell title="标题" :value="value[0]" is-link @click="showTitle = true" />
<wd-picker v-model="value" v-model:visible="showTitle" :columns="columns" title="请选择您心仪的选项" />
```

:::

## 确定前校验

设置 `before-confirm` 函数，在用户点击弹出层右上角“完成”按钮时进行拦截，支持返回 `boolean` 或 `Promise<boolean>` 控制是否允许选定并关闭弹窗。

::: code-group

```html
<wd-toast />
<wd-cell title="选项拦截" :value="value[0]" is-link @click="show = true" />
<wd-picker :columns="columns" v-model="value" v-model:visible="show" :before-confirm="beforeConfirm" />
```

```typescript
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'

const toast = useToast()
const show = ref(false)
const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
const value = ref<string[]>([])

const beforeConfirm = (value: string[]) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      // 假设选项2与选项3被判断为无效选择
      if (['2', '3'].includes(value[0])) {
        toast.error('该选项校验不通过，请重新选择')
        resolve(false)
      } else {
        resolve(true)
      }
    }, 1000)
  })
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中项。单列选择器为长度为 1 的数组，多列则为对应多项值组成的数组 | `(string \| number)[]` | `[]` |
| v-model:visible | 控制选择器弹出层的显示与隐藏 | `boolean` | `false` |
| columns | 选项数据结构数组配置，对于多列使用二维数组，多级联动结合 cascade 嵌套 children | `PickerOption[] \| PickerOption[][]` | `[]` |
| cascade | 是否开启级联模式 | `boolean` | `false` |
| title | 弹出层大标题 | `string` | - |
| cancel-button-text | 顶部操作栏左侧取消按钮文案 | `string` | - |
| confirm-button-text | 顶部操作栏右侧确认按钮文案 | `string` | - |
| value-key | 选项对象中负责标示值的键名 | `string` | `'value'` |
| label-key | 选项对象中负责呈现文本的键名 | `string` | `'label'` |
| children-key | 级联模式中对应的下一级子级键名 | `string` | `'children'` |
| item-height | 内部滚筒每个选项的单个高度（px） | `number` | `44` |
| visible-item-count | 单屏视窗内最多可见的选项数量 | `number` | `6` |
| before-confirm | 确定前校验函数，接收 `(value)` 参数，返回 `boolean` 或 `Promise<boolean>` | `Function` | - |
| close-on-click-modal | 点击遮罩层时是否关闭弹窗 | `boolean` | `true` |
| z-index | 弹出层层级深度 | `number` | `15` |
| safe-area-inset-bottom | 弹出面板是否设置默认的底部安全距离 | `boolean` | `true` |
| immediate-change | 是否在手指松开时立即触发 `change` 而非滚动结束 | `boolean` | `false` |
| root-portal | 是否开启 `root-portal` 将组件脱离当前节点进行渲染 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |
| custom-view-class | pickerView 组件的外部自定义样式类 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击完成按钮触发 | `{ value, selectedItems }` |
| cancel | 点击取消或蒙层关闭触发 | - |
| open | 打开弹出层选择器时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开 Picker 弹窗 | - |
| close | 关闭 Picker 弹窗 | - |

---

---
url: 'https://v2.wot-ui.cn/component/picker-view.md'
---
# PickerView 选择器视图

选择器视图，用于从一组数据中选择单个或多个值。

`wd-picker-view` 只负责滚筒选择区域本身，不包含弹出层与顶部操作栏；如果需要完整的弹窗选择器，可以使用 [Picker](./picker.md)。

当 `columns` 中的选项为对象时，组件默认读取 `label` 作为展示文本、读取 `value` 作为选中值；也可以通过 `label-key`、`value-key`、`children-key` 自定义字段映射。

## 组件类型

### 基本用法

单列选择器可直接传入字符串数组或对象数组，`v-model` 推荐始终使用数组形式保存当前选中值。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['选项1'])
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5'])
```

:::

当 `columns` 为对象数组时，单项数据结构如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number` | - |
| label | 选项文本 | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| children | 子选项列表，用于级联模式 | `PickerOption[]` | - |

## 组件状态

### 禁用选项

通过给选项对象设置 `disabled`，可以禁止某一项被选中。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['选项1'])
const columns = ref([
  { label: '选项1', value: '选项1' },
  { label: '选项2', value: '选项2' },
  { label: '选项3', value: '选项3', disabled: true },
  { label: '选项4', value: '选项4' }
])
```

:::

## 组件变体

### 立即触发

设置 `immediate-change` 后，手指松开时就会触发 `change` 事件；默认情况下会在滚动动画结束后再触发。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" immediate-change @change="handleChange" />
```

```typescript
import { ref } from 'vue'

const value = ref<string[]>(['选项1'])
const columns = ref([
  { label: '选项1', value: '选项1' },
  { label: '选项2', value: '选项2' },
  { label: '选项3', value: '选项3' }
])

function handleChange({ selectedValues, selectedLabels, columnIndex }: any) {
  console.log(selectedValues, selectedLabels, columnIndex)
}
```

:::

### 多列

将 `columns` 设为二维数组即可展示多列选择器，对应的 `v-model` 仍为一维数组，按列顺序保存每一列的选中值。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" />
```

```typescript
import { ref } from 'vue'

const value = ref(['中南大学', '软件工程'])
const columns = ref([
  ['中山大学', '中南大学', '华南理工大学'],
  ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
])
```

:::

### 多级联动

设置 `cascade` 后，`columns` 应传入树形数据结构。组件会根据当前选中值自动展开后续列。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" cascade />
```

```typescript
import { ref } from 'vue'

const value = ref(['110000', '110100', '110102'])
const columns = ref([
  {
    label: '北京',
    value: '110000',
    children: [
      {
        label: '北京市',
        value: '110100',
        children: [
          { label: '东城区', value: '110101' },
          { label: '西城区', value: '110102' },
          { label: '朝阳区', value: '110105' }
        ]
      }
    ]
  },
  {
    label: '广东省',
    value: '440000',
    children: [
      {
        label: '广州市',
        value: '440100',
        children: [
          { label: '荔湾区', value: '440103' },
          { label: '越秀区', value: '440104' },
          { label: '海珠区', value: '440105' }
        ]
      }
    ]
  }
])
```

:::

## 特殊用法

### 自定义字段名

通过 `value-key`、`label-key`、`children-key` 可以适配非标准字段名的数据结构。

::: code-group

```html
<wd-picker-view v-model="value" :columns="columns" value-key="id" label-key="text" />
```

```typescript
import { ref } from 'vue'

const value = ref<number[]>([1])
const columns = ref([
  { id: 1, text: '选项一' },
  { id: 2, text: '选项二' },
  { id: 3, text: '选项三' }
])
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中值；单列时通常为长度为 1 的数组，多列与级联时按列顺序保存各列选中值 | `(string \| number)[]` | `[]` |
| columns | 选择器数据；可传入一维数组、对象数组、二维数组，级联模式下传入树形数据 | `Array<string \| number \| PickerOption> \| Array<Array<string \| number \| PickerOption>>` | `[]` |
| item-height | 每个选项的高度 | `number` | `44` |
| visible-item-count | 可见选项数量 | `number` | `6` |
| value-key | 选项对象中值字段对应的键名 | `string` | `'value'` |
| label-key | 选项对象中文本字段对应的键名 | `string` | `'label'` |
| immediate-change | 是否在手指松开时立即触发 `change` 事件；若不开启，则在滚动动画结束后触发 | `boolean` | `false` |
| cascade | 是否开启级联模式；开启后 `columns` 应传入树形数据 | `boolean` | `false` |
| children-key | 级联模式下子节点字段对应的键名 | `string` | `'children'` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| getSelectedOptions | 获取所有列选中项 | - |
| getSelectedValues | 获取所有列的选中值 | - |
| getColumnsData | 获取所有列数据 | - |
| getColumnData | 获取指定列数据 | `columnIndex: number` |
| getColumnIndex | 获取指定列的选中下标 | `columnIndex: number` |
| getSelectedLabels | 获取所有列选中项的文本 | - |
| getSelectedIndex | 获取所有列的选中下标 | - |
| resetColumns | 重置列数据 | `columns: PickerOption[] \| PickerOption[][]` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选中值变化时触发 | `{ selectedValues, selectedOptions, selectedLabels, selectedIndexes, columnIndex }` |
| pickstart | 开始滚动选择时触发 | - |
| pickend | 结束滚动选择时触发 | - |
| update:modelValue | `v-model` 更新时触发 | `value: (string \| number)[]` |

### change 事件参数

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| selectedValues | 所有列的选中值数组 | `Array<string \| number>` |
| selectedOptions | 所有列的选中项对象数组 | `Array<PickerOption>` |
| selectedLabels | 所有列的选中文本数组 | `Array<string>` |
| selectedIndexes | 所有列的选中下标数组 | `Array<number>` |
| columnIndex | 当前发生变化的列索引；单列时为当前选项下标 | `number` |

## Slots

组件未提供插槽。

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/popover.md'
---
# Popover 气泡

常用于展示提示信息或菜单操作。

Popover 的定位规则与 [Tooltip](/component/tooltip.html) 保持一致，支持 12 个方向的弹出位置，并提供内容插槽和菜单模式。

:::warning
因为 `uni-app` 组件无法监听点击自己以外的地方，为了在点击页面其他地方时自动关闭 `popover`，建议使用组件库的 `useQueue` hook（会关闭所有 dropmenu、popover、toast、swipeAction、fab），并在页面根元素上监听点击事件冒泡。

如果存在用户手动点击 `popover` 以外某个地方如按钮弹出 `popover` 的场景，则需要在该元素上加 `@click.stop=""` 阻止事件冒泡到根元素上，避免触发 `closeOutside` 把要手动打开的 `popover` 关闭。
:::

## 组件类型

### 普通模式

默认使用 `normal` 模式，直接通过 `content` 展示一段文本内容。

::: code-group

```html [vue/html]
<view @click="closeOutside">
  <wd-popover v-model="showBasic" content="这是一段信息。">
    <wd-button>点击展示</wd-button>
  </wd-popover>
</view>
```

```ts [typescript]
import { ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
const showBasic = ref<boolean>(false)
```

:::

### 菜单模式

设置 `mode="menu"` 后，`content` 需要传入 `PopoverMenuItem[]`。点击菜单项后会自动关闭当前气泡，并触发 `menuclick` 事件。

::: code-group

```html [vue/html]
<wd-popover v-model="showMenu" mode="menu" :content="menuItems" @menuclick="handleMenuClick">
  <wd-button>列表</wd-button>
</wd-popover>
```

```ts [typescript]
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui'
import type { PopoverMenuItem } from '@/uni_modules/wot-ui/components/wd-popover/types'

const { show: showToast } = useToast()
const showMenu = ref<boolean>(false)
const menuItems: PopoverMenuItem[] = [
  {
    iconClass: 'check',
    content: '全部标记已读'
  },
  {
    iconClass: 'delete',
    content: '清空最近会话'
  },
  {
    iconClass: 'subscribe',
    content: '消息订阅设置'
  },
  {
    iconClass: 'scan',
    content: '消息异常检测'
  }
]

function handleMenuClick({ item }: { item: PopoverMenuItem }) {
  showToast('选择了' + item.content)
}
```

:::

### PopoverMenuItem

`mode="menu"` 时，`content` 数组内每一项的数据结构如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 菜单项文案 | string | - |
| iconClass | 菜单项图标类名，不设置时只展示标题 | string | - |

## 组件状态

### 受控显隐

通过 `v-model` 控制 Popover 的显示与隐藏，外部按钮和触发目标都可以驱动显隐状态变化。

::: code-group

```html [vue/html]
<wd-button plain size="small" @click.stop="showControlled = !showControlled">
  {{ showControlled ? '关闭' : '打开' }}
</wd-button>

<wd-popover v-model="showControlled" content="通过 v-model 控制显隐" placement="top">
  <wd-button>触发目标</wd-button>
</wd-popover>
```

```ts [typescript]
import { ref } from 'vue'

const showControlled = ref<boolean>(false)
```

:::

### 禁用

设置 `disabled` 后，点击触发目标不会打开气泡。

```html
<wd-popover disabled content="禁用状态">
  <wd-button>禁用状态</wd-button>
</wd-popover>
```

## 组件变体

### 弹出位置

通过 `placement` 指定弹出位置，支持 `top`、`bottom`、`left`、`right` 及各自的 `start`、`end` 对齐方式。

::: code-group

```html [vue/html]
<wd-radio-group v-model="placement" direction="horizontal" type="dot">
  <wd-radio v-for="item in placementItems" :key="item" :value="item">{{ item }}</wd-radio>
</wd-radio-group>

<wd-popover v-model="showPlacement" :content="'当前方向：' + placement" :placement="placement">
  <wd-button>{{ placement }}</wd-button>
</wd-popover>
```

```ts [typescript]
import { ref } from 'vue'
import type { PlacementType } from '@/uni_modules/wot-ui/components/wd-popover/types'

const placement = ref<PlacementType>('bottom')
const showPlacement = ref<boolean>(false)
const placementItems = [
  'bottom',
  'bottom-start',
  'bottom-end',
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
] as const
```

:::

## 组件样式

### 内容插槽

通过 `content` 插槽可以自定义气泡内容结构和样式，不需要额外开启开关属性。

::: code-group

```html [vue/html]
<wd-popover v-model="showCustom">
  <template #content>
    <view class="pop-content">这是一段自定义样式的内容。</view>
  </template>
  <wd-button>点击展示</wd-button>
</wd-popover>
```

```ts [typescript]
import { ref } from 'vue'

const showCustom = ref<boolean>(false)
```

```scss [scss]
.pop-content {
  position: relative;
  z-index: 500;
  border-radius: 4px;
  background: #fff;
  color: #8268de;
  font-weight: 600;
  padding: 10px;
  width: 150px;
}
```

:::

### 显示关闭按钮

设置 `show-close` 后，会在气泡内容区域右上角显示关闭按钮。

```html
<wd-popover v-model="showClosable" content="这是一段信息。" show-close>
  <wd-button>显示关闭按钮</wd-button>
</wd-popover>
```

## 特殊样式

### 动态内容与位置更新

当使用 `content` 插槽且插槽内容尺寸发生变化时，可以通过组件实例的 `updatePosition` 重新测量并更新定位。

::: code-group

```html [vue/html]
<wd-popover v-model="showDynamic" ref="popoverRef" :placement="placement">
  <template #content>
    <view class="pop-content" :style="{ width: `${dynamicWidth}px` }">
      <view class="status">当前宽度：{{ dynamicWidth }}px</view>
      <wd-button size="small" @click="changeSize">改变大小并更新</wd-button>
    </view>
  </template>
  <wd-button>动态内容</wd-button>
</wd-popover>
```

```ts [typescript]
import { nextTick, ref } from 'vue'
import type { PlacementType, PopoverInstance } from '@/uni_modules/wot-ui/components/wd-popover/types'

const placement = ref<PlacementType>('bottom')
const showDynamic = ref<boolean>(false)
const dynamicWidth = ref<number>(150)
const popoverRef = ref<PopoverInstance | null>(null)

function changeSize() {
  dynamicWidth.value = dynamicWidth.value === 150 ? 250 : 150
  nextTick(() => {
    popoverRef.value?.updatePosition()
  })
}
```

```scss [scss]
.status {
  margin-bottom: 10px;
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示气泡 | `boolean` | `false` |
| content | 显示内容，`normal` 模式下为字符串，`menu` 模式下为 `PopoverMenuItem[]`，也可以通过 `content` 插槽传入 | `string \| PopoverMenuItem[]` | - |
| mode | 当前显示模式，可选值为 `normal`、`menu` | `PopoverMode` | `normal` |
| placement | 弹出位置，可选值为 `top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end` | `PlacementType` | `bottom` |
| offset | 偏移量，支持 number、number\[] 或 `{ x: number, y: number }` | `PopoverOffset` | `0` |
| visible-arrow | 是否显示箭头 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-close | 是否显示关闭按钮 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |
| custom-arrow | 箭头节点自定义类名 | `string` | `''` |
| custom-pop | 气泡内容容器自定义类名 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 气泡显示时触发 | - |
| close | 气泡隐藏时触发 | - |
| change | 显隐状态变化时触发 | `{ show: boolean }` |
| menuclick | `menu` 模式下点击选项时触发 | `{ item: PopoverMenuItem; index: number }` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开气泡 | - |
| close | 关闭气泡 | - |
| updatePosition | 重新测量内容尺寸并更新定位 | - |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 触发器区域内容 | - |
| content | 自定义气泡内容 | - |

---

---
url: 'https://v2.wot-ui.cn/component/popup.md'
---
# Popup 弹出层

弹出层组件，用于展示弹窗、信息提示等内容。

## 组件类型

### 基本用法

`v-model` 为绑定值，表示是否展示弹出层。

```html
<wd-popup v-model="show" custom-style="border-radius: 32rpx;" @close="handleClose">
  <text class="custom-txt">弹弹弹</text>
</wd-popup>
```

```css
.custom-txt {
  color: black;
  width: 400rpx;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  border-radius: 32rpx;
}
```

### 弹出位置

设置 `position`，可选值为 `center`、`top`、`right`、`bottom`、`left`，默认值为 `center`。

```html
<wd-popup v-model="show" position="top" custom-style="height: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="right" custom-style="width: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="bottom" custom-style="height: 200px;" @close="handleClose"></wd-popup>
<wd-popup v-model="show" position="left" custom-style="width: 200px;" @close="handleClose"></wd-popup>
```

## 组件状态

### 关闭按钮

设置 `closable` 属性。

```html
<wd-popup v-model="show" position="bottom" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

### 禁用遮罩点击

通过设置 `close-on-click-modal="false"`，可以禁用点击遮罩层关闭弹出层。

```html
<wd-popup v-model="show" position="bottom" :close-on-click-modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

### 禁用遮罩

通过设置 `modal="false"`，可以关闭遮罩层，使底层内容仍可交互。

```html
<wd-popup v-model="show" position="bottom" :modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## 组件样式

### 底部安全区

通过设置 `safe-area-inset-bottom="true"`，可以确保底部弹层在刘海屏机型上不会被安全区域遮挡。

```html
<wd-popup v-model="show" position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## 特殊样式

### 锁定滚动

`lock-scroll` 用于锁定背景滚动。在小程序和 APP 中，如果还需要彻底防止页面滚动穿透，推荐配合 `page-meta` 控制页面 `overflow`。

```html
<!-- page-meta 只能作为页面第一个节点 -->
<page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`"></page-meta>

<wd-popup v-model="show" lock-scroll position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

:::tip 提示
H5 端默认已经处理滚动锁定，一般不需要额外处理滚动穿透。
:::

### 嵌套弹窗与 root-portal

当使用 `root-portal` 属性时，弹出层会从当前页面结构中脱离出来，用于避免父元素的 `transform`、`filter` 等样式影响弹层的 fixed 定位。

不同平台的实现方式如下：

* H5：使用 Vue 3 的 teleport 特性
* APP：使用 renderjs 将元素移动到 uni-app 根节点
* 微信小程序 / 支付宝小程序：使用 root-portal 组件
* 其他平台：不支持此能力

```html
<wd-popup v-model="showParent" position="center" custom-style="padding: 20px; border-radius: 16px;">
  <wd-button type="success" size="small" @click="showChild = true">打开传送子弹窗</wd-button>

  <wd-popup v-model="showChild" root-portal position="center" custom-style="padding: 20px; border-radius: 16px;">
    <text>这个子弹窗会脱离父层级渲染</text>
  </wd-popup>
</wd-popup>
```

:::tip 提示
`root-portal` 主要用于解决复杂布局中的层级和定位问题，建议在有明确需要时再开启。
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 弹出层是否显示 | `boolean` | `false` |
| transition | 动画类型，参见 `wd-transition` 组件的 `name` | `TransitionName` | - |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| position | 弹出位置，可选值为 `center`、`top`、`right`、`bottom`、`left` | `string` | `center` |
| close-on-click-modal | 点击遮罩是否关闭弹出层 | `boolean` | `true` |
| duration | 动画持续时间 | `number \| boolean` | `300` |
| modal | 是否显示遮罩 | `boolean` | `true` |
| z-index | 弹层层级 | `number` | `10` |
| hide-when-close | 关闭时是否隐藏弹层节点 | `boolean` | `true` |
| modal-style | 自定义遮罩样式 | `string` | - |
| safe-area-inset-bottom | 底部弹层是否适配底部安全区 | `boolean` | `false` |
| lazy-render | 弹层内容是否懒渲染 | `boolean` | `true` |
| lock-scroll | 是否锁定背景滚动，锁定后蒙层内内容也将无法滚动 | `boolean` | `true` |
| root-portal | 是否从页面结构中脱离出来，用于解决 fixed 失效问题 | `boolean` | `false` |
| round | 是否开启圆角，开启后根据弹出位置自动适配（底部弹出→上圆角，顶部弹出→下圆角，居中→四圆角） | `boolean` | `false` |
| custom-class | 自定义根节点类名 | `string` | - |
| custom-style | 自定义弹层样式 | `string` | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| close | 弹出层关闭时触发 | - |
| click-modal | 点击遮罩时触发 | - |
| before-enter | 进入前触发 | - |
| enter | 进入时触发 | - |
| after-enter | 进入后触发 | - |
| before-leave | 离开前触发 | - |
| leave | 离开时触发 | - |
| after-leave | 离开后触发 | - |

## Slots

| name | 说明 |
| --- | --- |
| default | 弹层内容 |

---

---
url: 'https://v2.wot-ui.cn/component/progress.md'
---
# Progress 进度条

用于展示操作的当前进度。

## 组件类型

### 基本用法

设置百分比 `percentage`。

```html
<wd-progress :percentage="50" />
```

### 内置百分比

通过 `percent-position` 配置百分比显示在进度条内部，并设置对齐方式。

```html
<wd-progress :percentage="50" :percent-position="{ type: 'inner', align: 'center' }" />
<wd-progress :percentage="50" status="success" :percent-position="{ type: 'inner', align: 'right' }" />
<wd-progress :percentage="50" status="danger" :percent-position="{ type: 'inner', align: 'left' }" />
```

## 组件状态

### 状态

设置 `status`，告知用户当前状态和预期。

```html
<wd-progress :percentage="50" status="success" hide-text />
<wd-progress :percentage="50" status="danger" hide-text />
<wd-progress :percentage="50" status="warning" hide-text />
```

## 组件样式

### 隐藏进度文字

设置 `hide-text` 隐藏进度文字。

```html
<wd-progress :percentage="50" hide-text />
```

### 修改颜色

设置 `color` 修改进度条颜色。

```html
<wd-progress :percentage="50" color="var(--wot-color-theme, #0083ff)" />
<wd-progress :percentage="50" color="var(--wot-color-success, #00c740)" />
<wd-progress :percentage="50" color="var(--wot-color-warning, #ffb300)" />
```

### 颜色数组

`color` 也可以设置为颜色数组或 `ProgressColor[]`。当传入字符串数组时，组件会自动计算每段颜色对应的进度边界。

```html
<wd-progress :percentage="50" :color="['#00c740', '#ffb300', '#e2231a', '#0083ff']" />
<wd-progress :percentage="50" :color="colorObject" />
```

```ts
import type { ProgressColor } from '@/uni_modules/wot-ui/components/wd-progress/types'

const colorObject: ProgressColor[] = [
  {
    color: 'yellow',
    percentage: 30
  },
  {
    color: 'red',
    percentage: 60
  },
  {
    color: 'blue',
    percentage: 80
  },
  {
    color: 'black',
    percentage: 90
  }
]
```

## 特殊样式

### 动态控制

通过修改 `percentage` 绑定值，可以实现动态进度控制。

```html
<wd-progress :percentage="percentage" />
<wd-button type="danger" size="small" @click="reduce">-10</wd-button>
<wd-button type="success" size="small" @click="add">+10</wd-button>
```

```ts
const percentage = ref(50)

function add() {
  percentage.value = Math.min(percentage.value + 10, 100)
}

function reduce() {
  percentage.value = Math.max(percentage.value - 10, 0)
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 进度数值，最大值为 `100` | `number` | `0` |
| hide-text | 是否隐藏进度文字 | `boolean` | `false` |
| color | 进度条颜色，可选值为 `string`、`string[]`、`ProgressColor[]` | `string \| string[] \| ProgressColor[]` | - |
| status | 进度条状态，可选值为 `success`、`danger`、`warning` | `string` | - |
| duration | 进度增加 `1%` 所需毫秒数 | `number` | `30` |
| percent-position | 百分比显示位置配置，`type` 可选 `inner`、`outer`，`align` 可选 `left`、`center`、`right` | `PercentPosition` | `{ align: 'right', type: 'outer' }` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

### ProgressColor

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 颜色值 | `string` | - |
| percentage | 颜色生效的进度阈值 | `number` | - |

### PercentPosition

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 百分比显示位置，可选值为 `inner`、`outer` | `string` | `'outer'` |
| align | 百分比文本对齐方式，可选值为 `left`、`center`、`right` | `string` | `'right'` |

---

---
url: 'https://v2.wot-ui.cn/component/radio.md'
---
# Radio 单选框

单选框用于在一组备选项中进行单选。

## 组件类型

### 基本用法

`v-model` 为绑定值，即当前选中的 `wd-radio` 的 `value`。

```html
<wd-radio-group v-model="value">
  <wd-radio :value="1">单选框 1</wd-radio>
  <wd-radio type="square" :value="2">单选框 2</wd-radio>
  <wd-radio type="dot" :value="3">单选框 3</wd-radio>
</wd-radio-group>
```

```ts
const value = ref(1)
```

### 按钮形态

设置 `type="button"`，可切换为按钮式单选。

```html
<wd-radio-group v-model="value" type="button">
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

## 组件状态

### 禁用

可以在 `wd-radio-group` 上设置 `disabled`，统一禁用整组单选框；也可以在单个 `wd-radio` 上单独设置。

```html
<wd-radio-group v-model="value" disabled>
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

### 只读状态

设置 `readonly` 后，单选项仍然展示当前值，但不会响应点击切换。

```html
<wd-radio-group v-model="value" readonly>
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

### 允许取消选中

设置 `allow-uncheck` 后，点击当前已选中的单选项可以取消选中。

```html
<wd-radio-group v-model="value" allow-uncheck>
  <wd-radio :value="1">支持取消选中</wd-radio>
  <wd-radio :value="2">支持取消选中</wd-radio>
</wd-radio-group>
```

## 组件样式

### 图标位置

设置 `placement` 控制图标显示在文本左侧还是右侧。

```html
<wd-radio-group v-model="value" placement="right">
  <wd-radio :value="1">单选框 1</wd-radio>
  <wd-radio :value="2">单选框 2</wd-radio>
</wd-radio-group>
```

### 修改选中的颜色

设置 `checked-color` 修改选中状态的图标颜色。

```html
<wd-radio-group v-model="value" checked-color="#fa4350">
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

### 修改未选中颜色

设置 `unchecked-color` 修改未选中状态的图标颜色。

```html
<wd-radio-group v-model="value" unchecked-color="#fa4350">
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

## 特殊样式

### Props 优先级

单个 `wd-radio` 上设置的属性优先级高于 `wd-radio-group`。

```html
<wd-radio-group v-model="value" type="button" disabled checked-color="#fa4350">
  <wd-radio :value="1" checked-color="#000" :disabled="false">选项一</wd-radio>
  <wd-radio :value="2" :disabled="false">选项二</wd-radio>
  <wd-radio :value="3">选项三</wd-radio>
</wd-radio-group>
```

### 结合 Cell 使用

可以将 `wd-radio` 放入 `wd-cell` 的右侧区域，配合整行点击实现列表选择效果。

```html
<wd-radio-group v-model="value">
  <wd-cell-group border insert>
    <wd-cell title="单选框 1" clickable @click="value = 1">
      <template #right-icon>
        <wd-radio :value="1" />
      </template>
    </wd-cell>
    <wd-cell title="单选框 2" clickable @click="value = 2">
      <template #right-icon>
        <wd-radio :value="2" />
      </template>
    </wd-cell>
  </wd-cell-group>
</wd-radio-group>
```

### 自定义图标

通过 `icon` 插槽可自定义选中与未选中图标。

```html
<wd-radio-group v-model="value">
  <wd-radio :value="1">
    自定义图标
    <template #icon="{ isChecked }">
      <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
    </template>
  </wd-radio>
</wd-radio-group>
```

## 布局能力

### 同行展示

设置 `direction="horizontal"`，可让单选框同行排列。

```html
<wd-radio-group v-model="value" direction="horizontal">
  <wd-radio :value="1">单选框 1</wd-radio>
  <wd-radio :value="2">单选框 2</wd-radio>
</wd-radio-group>
```

## RadioGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中的值，会自动匹配对应 `wd-radio` 的 `value` | `string \| number \| boolean` | - |
| type | 单选框类型，可选值为 `circle`、`dot`、`square`、`button` | `string` | `circle` |
| checked-color | 选中状态的图标颜色 | `string` | - |
| unchecked-color | 未选中状态的图标颜色 | `string` | - |
| disabled | 是否禁用整组单选框 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| placement | 图标位置，可选值为 `left`、`right` | `string` | `left` |
| direction | 布局方向，可选值为 `horizontal`、`vertical` | `string` | `vertical` |
| allow-uncheck | 是否允许取消当前已选中的值 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## RadioGroup Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 绑定值变化时触发 | `{ value }` |

## Radio Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 单选项的值，会与 `wd-radio-group` 的 `v-model` 匹配 | `string \| number \| boolean` | - |
| type | 单选框类型，可选值为 `circle`、`dot`、`square`、`button` | `string` | 继承自 `wd-radio-group` |
| checked-color | 选中状态的图标颜色 | `string` | 继承自 `wd-radio-group` |
| unchecked-color | 未选中状态的图标颜色 | `string` | 继承自 `wd-radio-group` |
| disabled | 是否禁用当前单选项 | `boolean` | 继承自 `wd-radio-group` |
| readonly | 是否只读 | `boolean` | 继承自 `wd-radio-group` |
| placement | 图标位置，可选值为 `left`、`right` | `string` | 继承自 `wd-radio-group` |
| direction | 布局方向，可选值为 `horizontal`、`vertical` | `string` | 继承自 `wd-radio-group` |
| custom-label-class | 自定义文本节点类名 | `string` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 组件 | name | 说明 | 参数 |
| --- | --- | --- | --- |
| wd-radio | default | 单选项文本内容 | - |
| wd-radio | icon | 自定义图标内容 | `{ isChecked }` |

---

---
url: 'https://v2.wot-ui.cn/component/rate.md'
---
# Rate 评分

用于快速评价，或展示评分结果。

## 组件类型

### 基本用法

设置 `v-model` 绑定当前分数，`num` 用于设置总分，默认值为 `5`。

```html
<wd-rate v-model="value" @change="handleChange" />
```

```ts
const value = ref(5)

function handleChange({ value }: { value: number }) {
  console.log(value)
}
```

## 组件状态

### 只读

设置 `readonly` 属性。

```html
<wd-rate v-model="value" readonly />
```

### 禁用

设置 `disabled` 属性。

```html
<wd-rate v-model="value" disabled />
```

## 组件样式

### 修改选中颜色

可以通过 `active-color` 修改选中图标颜色，也支持传入双色数组实现分段颜色。

```html
<wd-rate v-model="value" active-color="linear-gradient(180deg, rgba(255, 238, 0, 1) 0%, rgba(250, 176, 21, 1) 100%)" />
<wd-rate
  v-model="value"
  :active-color="[
    'linear-gradient(180deg, rgba(255, 238, 0, 1) 0%, rgba(250, 176, 21, 1) 100%)',
    'linear-gradient(315deg, rgba(245, 34, 34, 1) 0%, rgba(255, 117, 102, 1) 100%)'
  ]"
/>
```

### 修改图标与颜色

可以通过 `icon`、`active-icon` 分别设置未选中和选中图标，结合 `active-color` 自定义视觉风格。

```html
<wd-rate v-model="value" block icon="Fire" active-icon="Fire" active-color="var(--wot-red-6)" />
<wd-rate v-model="value" block icon="thumb-down-fill" active-icon="thumb-up-fill" active-color="var(--wot-green-6)" />
```

### 修改大小与间隔

通过 `size` 修改图标大小，`space` 修改图标间距。

```html
<wd-rate v-model="value" size="36" space="12px" />
```

## 特殊样式

### 允许半选

设置 `allow-half` 属性。

```html
<wd-rate v-model="value" allow-half />
```

### 允许清空评分

设置 `clearable` 属性后，再次点击当前最小分值时可清空评分。与 `allow-half` 组合时，可清空半星评分。

```html
<wd-rate v-model="value" clearable />
<wd-rate v-model="value" clearable allow-half />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前分数 | `number \| null` | `null` |
| num | 评分最大值 | `number` | `5` |
| readonly | 是否只读 | `boolean` | `false` |
| size | 图标大小 | `string` | - |
| space | 图标间距 | `string \| number` | - |
| color | 未选中图标颜色 | `string` | - |
| active-color | 选中图标颜色，支持 `string` 或 `string[]` | `string \| string[]` | - |
| icon | 未选中图标类名 | `string` | `'star-fill'` |
| active-icon | 选中图标类名 | `string` | `'star-fill'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allow-half | 是否允许半选 | `boolean` | `false` |
| clearable | 是否允许再次点击后清除 | `boolean` | `false` |
| block | 是否块级显示 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 点击图标修改分值时触发 | `{ value }` |

---

---
url: 'https://v2.wot-ui.cn/component/resize.md'
---
# Resize 监听元素尺寸变化

当组件包裹的文档流尺寸发生变化时，触发 `resize` 事件。一般用于监听内容更新引起的尺寸和位置信息变化，再据此重新进行布局计算。

## 组件类型

### 基本用法

不要给 `wd-resize` 自身增加额外布局样式，而是把需要被监听的内容放在默认插槽中。

::: code-group

```html [vue]
<wd-resize @resize="handleResize">
  <view :style="{ background: '#4d80f0', width, height }"></view>
</wd-resize>
```

```ts [ts]
import { onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

const width = ref('')
const height = ref('')

onReady(() => {
  setTimeout(() => {
    width.value = '100px'
    height.value = '100px'
  }, 1500)
})

function handleResize(detail: Record<string, string | number>) {
  const { height, width, top, right, bottom, left } = detail
}
```

:::

## Resize Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |
| custom-container-class | 自定义容器样式类 | `string` | `''` |

## Resize Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| resize | 尺寸发生变化时触发 | { width: number; height: number; top: number; right: number; bottom: number; left: number } |

## Resize Slots

| 名称 | 说明 |
| --- | --- |
| default | 需要监听尺寸变化的内容 |

---

---
url: 'https://v2.wot-ui.cn/component/root-portal.md'
---
# Root Portal 根节点传送

是否从页面中脱离出来，用于解决各种 fixed 失效问题，主要用于制作弹窗、弹出层等。

:::tip 提示
根节点传送组件仅支持`微信小程序`、`支付宝小程序`、`APP`和`H5`平台，组件会自动根据平台选择合适的实现方式：

* **H5 端**：使用 `teleport` 特性
* **微信小程序和支付宝小程序**：使用 `root-portal` 组件
* **App 端**：使用 renderjs 实现
* **其他平台**：不支持此功能

该功能主要用于解决复杂布局中弹窗的层级和定位问题，在需要时才建议使用。
:::

## 组件类型

### 基本用法

使用 `wd-root-portal` 将内容渲染到根节点，避免被父组件样式影响。

```html
<wd-button type="primary" @click="show = true">显示弹窗</wd-button>

<wd-root-portal v-if="show">
  <view class="modal">
    <view class="modal-content">
      <text>这是一个全局弹窗</text>
      <wd-button @click="show = false">关闭</wd-button>
    </view>
  </view>
</wd-root-portal>
```

```scss
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 280px;
  text-align: center;
}
```

## 特殊样式

### 与弹层组件配合使用

部分弹层组件本身支持 `root-portal` 属性，例如 `wd-select-picker`。这类场景仍然需要由外部触发器控制弹层显隐，再通过组件属性开启根节点传送能力。

```html
<wd-cell title="选择商品分类" :value="selectedLabel" is-link @click="showPicker = true" />
<wd-select-picker v-model="value" v-model:visible="showPicker" :columns="columns" root-portal @confirm="handleConfirm" />
```

```typescript
import { ref } from 'vue'

const showPicker = ref(false)
const value = ref<string[]>([])
const selectedLabel = ref('')
const columns = ref([
  { value: '101', label: '男装' },
  { value: '102', label: '奢侈品' },
  { value: '103', label: '女装' }
])

function handleConfirm({ value }: { value: string[] }) {
  selectedLabel.value = columns.value
    .filter((item) => value.includes(item.value))
    .map((item) => item.label)
    .join('、')
}
```

## Slots

| name | 说明 |
| --- | --- |
| default | 默认插槽，用于渲染传送内容 |

---

---
url: 'https://v2.wot-ui.cn/component/search.md'
---
# Search 搜索框

搜索框组件，支持输入框聚焦、失焦、输入、搜索、取消、清空事件。

## 组件类型

### 基本用法

`v-model` 设置输入框绑定值，`change` 监听输入事件，`search` 监听搜索事件，`cancel` 监听取消事件，`clear` 监听清空事件。

```html
<wd-search v-model="value" @search="search" @clear="clear" @cancel="cancel" @change="change" />
```

```ts
const value = ref<string>('')

function search({ value }: { value: string }) {
  console.log('搜索', value)
}
function clear() {
  console.log('重置')
}
function cancel({ value }: { value: string }) {
  console.log('取消', value)
}
function change({ value }: { value: string }) {
  console.log('输入', value)
}
```

## 组件状态

### 自动聚焦

设置 `focus` 属性，组件挂载后自动聚焦。

```html
<wd-search v-model="value" focus />
```

### 清空后自动聚焦

设置 `focus-when-clear`，点击清空按钮后重新聚焦输入框。

```html
<wd-search v-model="value" focus-when-clear />
```

### 禁用并隐藏取消按钮

设置 `disabled` 和 `hide-cancel`。可用于跳转到独立搜索页的入口场景。

```html
<wd-search disabled hide-cancel @click="handleDisabledClick" />
```

## 组件变体

### 样式变体

通过 `variant` 切换不同视觉样式，可选值为 `plain`、`filled`、`light`。

```html
<wd-search variant="plain" v-model="value" />
<wd-search variant="filled" v-model="value" />
<wd-search variant="light" v-model="value" />
```

## 组件样式

### 输入框提示文案靠左

设置 `placeholder-left` 属性。

```html
<wd-search placeholder-left />
```

### 设置最大长度

通过 `maxlength` 限制输入框最大长度，`-1` 表示不限制。

```html
<wd-search v-model="value" :maxlength="4" />
```

### 自定义文案

通过 `placeholder` 修改占位文本，`cancel-txt` 修改取消按钮文案。

```html
<wd-search placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
```

## 特殊样式

### 自定义左侧插槽

通过 `prefix` 插槽自定义搜索框左侧内容。

```html
<wd-search v-model="value">
  <template #prefix>
    <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
      <view class="search-type">
        <text>{{ searchType }}</text>
        <wd-icon custom-class="icon-arrow" name="fill-arrow-down"></wd-icon>
      </view>
    </wd-popover>
  </template>
</wd-search>
```

```typescript
const searchType = ref<string>('全部')
const value = ref<string>('')
const menu = ref([
  {
    content: '全部'
  },
  {
    content: '订单号'
  },
  {
    content: '退款单号'
  }
])

function changeSearchType({ item }) {
  searchType.value = item.content
}
```

```scss
.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;
}
.search-type::after {
  position: absolute;
  content: '';
  width: 1px;
  right: 0;
  top: 5px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.25);
}
.search-type {
  :deep(.icon-arrow) {
    display: inline-block;
    font-size: 20px;
    vertical-align: middle;
  }
}
```

### 自定义输入框右侧图标

```html
<wd-search v-model="value">
  <template #input-suffix>
    <wd-icon name="scan" size="20px"></wd-icon>
  </template>
</wd-search>
```

### 自定义右侧插槽

```html
<wd-search v-model="value">
  <template #suffix>
    <view>筛选条件</view>
  </template>
</wd-search>
```

### 多种插槽组合

```html
<wd-search variant="plain" v-model="value">
  <template #input-suffix>
    <wd-icon name="scan" size="20px"></wd-icon>
  </template>
  <template #suffix>
    <view class="action-icons">
      <wd-icon name="filter" size="20px"></wd-icon>
      <wd-icon name="plus-circle-fill" size="20px"></wd-icon>
    </view>
  </template>
</wd-search>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 输入框内容，双向绑定 | `string` | `''` |
| custom-input-class | 自定义输入框类名 | `string` | `''` |
| placeholder | 搜索框占位文本 | `string` | `'搜索'` |
| cancel-txt | 搜索框右侧文本 | `string` | `'取消'` |
| variant | 搜索框变体，可选值为 `plain`、`filled`、`light` | `string` | `'plain'` |
| hide-cancel | 是否隐藏右侧文本 | `boolean` | `false` |
| disabled | 是否禁用搜索框 | `boolean` | `false` |
| maxlength | 原生属性，设置最大长度，`-1` 表示无限制 | `number \| string` | `-1` |
| placeholder-left | placeholder 是否左对齐 | `boolean` | `false` |
| focus | 是否自动聚焦 | `boolean` | `false` |
| focus-when-clear | 是否在点击清空按钮后聚焦输入框 | `boolean` | `false` |
| placeholder-style | 原生属性，指定 placeholder 的样式，目前仅支持 `color`、`font-size` 和 `font-weight` | `string` | - |
| placeholder-class | 原生属性，指定 placeholder 的样式类 | `string` | `''` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| focus | 输入框聚焦事件 | `{ value }` |
| blur | 输入框失焦事件 | `{ value }` |
| search | 输入框搜索事件 | `{ value }` |
| clear | 点击清空按钮时触发 | - |
| cancel | 点击右侧文本时触发 | `{ value }` |
| change | 输入框内容变化时触发 | `{ value }` |
| click | 禁用状态下点击组件时触发 | - |

## Slots

| name | 说明 |
| --- | --- |
| prefix | 输入框左侧自定义内容 |
| input-suffix | 输入框内部右侧自定义内容 |
| suffix | 输入框右侧自定义内容 |

---

---
url: 'https://v2.wot-ui.cn/component/segmented.md'
---
# Segmented 分段器

分段器用于展示多个选项并允许用户选择其中单个选项。

## 何时使用

* 用于展示多个选项并允许用户选择其中单个选项；
* 当切换选中选项时，关联区域的内容会发生变化。

## 组件类型

### 基本用法

通过 `options` 设置选项列表，通过 `v-model:value` 绑定当前选中项。

```vue
<wd-segmented :options="list" v-model:value="current"></wd-segmented>
```

```ts
const list = ref<string[]>(['评论', '点赞', '贡献', '打赏'])

const current = ref('点赞')
```

## 组件状态

### 禁用

设置 `disabled` 属性禁用整个分段器。

```html
<wd-segmented :options="list" v-model:value="current" disabled></wd-segmented>
```

## 组件变体

### 轮廓主题

通过 `theme="outline"` 切换为轮廓样式。

```html
<wd-segmented :options="list" v-model:value="current" theme="outline"></wd-segmented>
```

## 组件样式

### 自定义渲染分段器标签

使用插槽 `label` 可以自定义渲染分段器的标签内容。

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true">
  <template #label="{ option }">
    <view class="section-slot">
      <image style="border-radius: 50%; width: 32px; height: 32px" :src="option.payload.avatar" />
      <view class="name">{{ option.value }}</view>
    </view>
  </template>
</wd-segmented>
```

```ts
const list = ref([
  {
    value: '李雷',
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/redpanda.jpg'
    }
  },
  {
    value: '韩梅梅',
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/capybara.jpg'
    }
  }
])
```

```scss
.section {
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;
  &-slot {
    padding: 4px;
  }
}
```

## 特殊样式

### 带振动效果的分段器

设置 `vibrate-short` 后，切换选项时会触发短振动反馈。

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true"></wd-segmented>
```

### 在弹出框中使用

微信小程序端，在弹出框中使用本组件时，需要调用 `updateActiveStyle` 方法更新分段器样式，参见[常见问题](/guide/common-problems.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%8A%E4%BD%BF%E7%94%A8popup%E3%80%81actionsheet%E3%80%81dropdownitem%E7%AD%89%E5%BC%B9%E5%87%BA%E6%A1%86%E7%BB%84%E4%BB%B6%E5%8C%85%E8%A3%B9slider%E3%80%81tabs%E7%AD%89%E7%BB%84%E4%BB%B6%E6%97%B6-slider%E3%80%81tabs%E8%A1%A8%E7%8E%B0%E5%BC%82%E5%B8%B8)。

```html
<wd-button @click="handleClick">打开弹窗</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable custom-style="height: 200px;padding: 0 24rpx;">
  <view class="title">在弹出框中使用</view>
  <wd-segmented :options="list" v-model:value="current" ref="segmentedRef"></wd-segmented>
</wd-popup>
```

```ts
const list = ref<string[]>(['评论', '点赞', '贡献', '打赏'])
const current = ref('点赞')

const segmentedRef = ref<SegmentedInstance>() // 获取分段器实例
const showPopup = ref(false) // 控制popup显示
/**
 * 点击按钮打开popup
 */
function handleClick() {
  showPopup.value = true
}
/**
 * popup打开后更新分段器样式
 */
function handlePopupShow() {
  segmentedRef.value?.updateActiveStyle()
}
```

```css
.title {
  display: flex;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  padding: 24rpx 0;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / v-model:value | 当前选中的值 | `string \| number` | - |
| disabled | 是否禁用分段器 | `boolean` | `false` |
| options | 数据集合 | `string[] \| number[] \| SegmentedOption[]` | `[]` |
| theme | 分段器主题，可选值为 `card`、`outline` | `string` | `'card'` |
| vibrate-short | 切换选项时是否触发短振动 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

### SegmentedOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |
| payload | 附加数据，可用于插槽渲染 | `any` | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选项切换时触发 | `SegmentedOption` |
| click | 选项点击时触发 | `SegmentedOption` |

## Methods

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| updateActiveStyle | 更新滑块偏移量，参数 `animation` 用于控制是否启用动画，默认开启 | `(animation?: boolean) => void` |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| label | 选项标签内容 | `{ option: SegmentedOption }` |

---

---
url: 'https://v2.wot-ui.cn/component/select-picker.md'
---
# SelectPicker 单复选选择器

用于从一组选项中进行单选或多选，通常配合外部单元格或按钮控制弹层显示。

## 组件类型

### 基本用法

默认 `type` 为 `checkbox`，`v-model` 的值类型为数组。通常配合 `v-model:visible` 控制弹层开关。

```html
<wd-cell title="选择地址" :value="getDisplayValue(value)" is-link @click="show = true" />
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" @confirm="handleConfirm" />
```

```ts
const columns = ref([
  { value: '101', label: '男装' },
  { value: '102', label: '奢侈品' },
  { value: '103', label: '女装' }
])

const value = ref<string[]>(['101'])
const show = ref(false)

function handleConfirm({ value }: { value: string[] }) {
  console.log(value)
}
```

### 类型切换

设置 `type="radio"` 开启单选模式，此时 `v-model` 的值类型为 `string`、`number` 或 `boolean`。

```html
<wd-select-picker type="radio" v-model="value" v-model:visible="show" :columns="columns" />
```

## 组件状态

### 禁用选项

选项数据支持 `disabled` 字段，用于禁用某一项。

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" />
```

```ts
const columns = ref([
  { value: '101', label: '男装', disabled: true },
  { value: '102', label: '奢侈品' },
  { value: '103', label: '女装' }
])
```

### 加载中

设置 `loading` 后会在内容区域显示加载状态。

```html
<wd-select-picker loading v-model="value" v-model:visible="show" :columns="columns" />
```

## 组件样式

### 设置标题

通过 `title` 自定义弹层标题。

```html
<wd-select-picker v-model="value" v-model:visible="show" title="多选" :columns="columns" />
```

### 可搜索

设置 `filterable` 开启本地搜索；单选和多选模式都支持。

```html
<wd-select-picker filterable v-model="value" v-model:visible="show" :columns="columns" />
<wd-select-picker filterable type="radio" v-model="singleValue" v-model:visible="show" :columns="columns" />
```

## 特殊样式

### 选项变化事件

选择器内部选项发生变化时，会触发 `change` 事件。

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" @change="handleChange" />
```

```ts
function handleChange({ value }: { value: string[] }) {
  console.log(value)
}
```

### 确定前校验

设置 `before-confirm`，可在点击确认按钮前执行同步或异步校验。返回 `false` 或 `Promise<false>` 时不会关闭弹层。

```html
<wd-select-picker v-model="value" v-model:visible="show" :columns="columns" :before-confirm="beforeConfirm" />
```

```ts
const beforeConfirm = (value: string[]) => {
  return new Promise<boolean>((resolve) => {
    if (value.length > 0) {
      resolve(false)
    } else {
      resolve(true)
    }
  })
}
```

### 自动完成

`radio` 模式下可通过 `show-confirm="false"` 隐藏确认按钮，选中后自动完成。

```html
<wd-select-picker type="radio" :show-confirm="false" v-model="value" v-model:visible="show" :columns="columns" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中项，`checkbox` 时为数组，`radio` 时为 `string`、`number` 或 `boolean` | `string \| number \| boolean \| (string \| number \| boolean)[]` | - |
| visible / v-model:visible | 控制弹层显示状态 | `boolean` | `false` |
| title | 弹出层标题 | `string` | `'选择器'` |
| checked-color | 单选框或复选框选中颜色 | `string` | - |
| min | 最小选中数量，仅 `checkbox` 生效 | `number` | `0` |
| max | 最大选中数量，`0` 表示不限制，仅 `checkbox` 生效 | `number` | `0` |
| select-size | 选择器内部选项尺寸 | `string` | - |
| loading | 是否显示加载状态 | `boolean` | `false` |
| loading-color | 加载图标颜色 | `string` | `'#4D80F0'` |
| close-on-click-modal | 点击遮罩是否关闭 | `boolean` | `true` |
| columns | 选择器数据，一维数组 | `Record<string, any>[]` | `[]` |
| type | 选择器类型，可选值为 `checkbox`、`radio` | `string` | `'checkbox'` |
| value-key | 选项对象中值字段的 key | `string` | `'value'` |
| label-key | 选项对象中展示文本字段的 key | `string` | `'label'` |
| confirm-button-text | 确认按钮文案 | `string` | `'确认'` |
| before-confirm | 确认前校验函数，接收当前选中值，返回 `boolean` 或 `Promise<boolean>` | `function` | - |
| z-index | 弹层层级 | `number` | `15` |
| safe-area-inset-bottom | 是否适配底部安全区 | `boolean` | `true` |
| filterable | 是否支持本地搜索 | `boolean` | `false` |
| filter-placeholder | 搜索框占位符 | `string` | `'搜索'` |
| scroll-into-view | 重新打开时是否滚动到选中项 | `boolean` | `true` |
| custom-content-class | 自定义弹层内容区域类名 | `string` | `''` |
| show-confirm | 是否显示确认按钮，仅 `radio` 模式生效 | `boolean` | `true` |
| root-portal | 是否从页面结构中脱离出来，用于解决 fixed 失效问题 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## 选项数据结构

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number \| boolean` | - |
| label | 选项文案 | `string` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选择器内部选项变化时触发 | `{ value }` |
| cancel | 点击关闭按钮或遮罩关闭时触发 | - |
| confirm | 点击确认时触发 | `{ value, selectedItems }` |
| open | 弹层打开时触发 | - |
| close | 弹层关闭时触发 | - |

## Methods

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| open | 打开弹层 | `() => void` |
| close | 关闭弹层 | `() => void` |

---

---
url: 'https://v2.wot-ui.cn/component/sidebar.md'
---
# Sidebar 侧边导航

垂直展示的导航栏，用于在不同内容区域之间进行切换。

## 组件类型

### 基础用法

通过 `v-model` 绑定当前选中项的值。

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="标签名称" />
  <wd-sidebar-item :value="1" label="标签名称" />
  <wd-sidebar-item :value="2" label="标签名称" />
</wd-sidebar>
```

```ts
const active = ref(0)
```

## 组件状态

### 徽标提示

设置 `is-dot` 可展示红点徽标；设置 `badge` 或 `badge-props` 可展示数字徽标。

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="标签名称" is-dot />
  <wd-sidebar-item :value="1" label="标签名称" badge="5" />
  <wd-sidebar-item :value="2" label="标签名称" :badge-props="{ type: 'warning', value: 55, max: 99 }" />
</wd-sidebar>
```

### 禁用与异步切换

设置 `disabled` 可禁用当前选项；设置 `before-change` 可在切换前执行同步或异步逻辑。

```html
<wd-sidebar v-model="active" :before-change="beforeChange">
  <wd-sidebar-item :value="0" label="标签名称" />
  <wd-sidebar-item :value="1" label="标签名称" disabled />
  <wd-sidebar-item :value="2" label="标签名称" />
</wd-sidebar>
```

```ts
import type { SidebarBeforeChange } from '@/uni_modules/wot-ui/components/wd-sidebar/types'

const beforeChange: SidebarBeforeChange = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000)
  })
}
```

## 特殊样式

### 锚点用法示例

sidebar 可以与 `scroll-view` 结合，实现长内容页的锚点切换。仓库中的示例可参考 `src/subPages/sidebar/demo1.vue`。

### 切换页面用法示例

sidebar 也可以作为左侧目录，右侧内容区按当前选中项整屏切换。仓库中的示例可参考 `src/subPages/sidebar/demo2.vue`。

### 自定义图标示例

设置 `wd-sidebar-item` 的 `icon` 属性，可在导航项中显示不同图标。仓库中的示例可参考 `src/subPages/sidebar/demo3.vue`。

## Sidebar Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前激活项的值 | `string \| number` | `0` |
| before-change | 切换前钩子，接收目标值，返回 `boolean` 或 `Promise<boolean>` | `function` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Sidebar Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 激活项切换时触发 | `{ value, label }` |

## Sidebar Slots

| name | 说明 |
| --- | --- |
| default | SidebarItem 列表 |

## Sidebar 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

## SidebarItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 当前选项标题 | `string` | - |
| value | 当前选项值，唯一标识 | `string \| number` | - |
| badge | 徽标显示值 | `string \| number` | - |
| badge-props | 自定义徽标属性，会透传给 Badge 组件 | `Partial<BadgeProps>` | - |
| icon | 图标名称 | `string` | - |
| is-dot | 是否显示点状徽标 | `boolean` | `false` |
| max | 徽标最大值 | `number` | `99` |
| disabled | 是否禁用当前选项 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## SidebarItem Slots

| name | 说明 |
| --- | --- |
| icon | 自定义图标内容 |

---

---
url: 'https://v2.wot-ui.cn/component/signature.md'
---
# Signature 签名

用于签名场景，基于 Canvas 实现的签名组件，支持导出图片、历史记录、笔锋效果、自定义底部操作等能力。

:::tip 提醒
如果遇到导出图片不清晰，可以将 `export-scale` 设置为 `2` 以上。
:::

## 组件类型

### 基础用法

设置 `@confirm` 监听确认事件，可在确认后获取签名结果。

```html
<wd-signature :export-scale="2" background-color="#ffffff" @confirm="handleConfirm" />
```

```ts
import type { SignatureResult } from '@/uni_modules/wot-ui/components/wd-signature/types'

function handleConfirm(result: SignatureResult) {
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}
```

### 历史记录

设置 `enable-history` 后，可使用撤销与恢复能力。

```html
<wd-signature enable-history background-color="#f5f5f5" />
```

## 组件变体

### 笔锋模式

设置 `pressure` 开启压感笔锋效果。

```html
<wd-signature pressure :height="300" />
```

### 笔锋模式结合历史记录

签名组件支持同时开启 `pressure` 与 `enable-history`，用于更完整的签字场景。

```html
<wd-signature pressure enable-history :height="300" :min-width="1" :max-width="6" background-color="#f5f5f5" />
```

## 组件样式

### 自定义底部按钮

设置 `footer` 插槽后，可完全自定义底部操作区。

```html
<wd-signature :disabled="disabled" enable-history :step="3">
  <template #footer="{ clear, confirm, currentStep, restore, revoke, historyList }">
    <wd-button v-if="disabled" block @click="disabled = false">开始签名</wd-button>
    <block v-else>
      <wd-button size="small" plain @click="revoke" :disabled="currentStep <= 0">撤回</wd-button>
      <wd-button size="small" plain @click="restore" :disabled="currentStep >= historyList.length">恢复</wd-button>
      <wd-button size="small" plain @click="clear">清除</wd-button>
      <wd-button size="small" @click="confirm">确定</wd-button>
    </block>
  </template>
</wd-signature>
```

```ts
const disabled = ref(true)
```

### 自定义画笔

通过 `pen-color`、`line-width` 设置画笔颜色与宽度。

```html
<wd-signature pen-color="#0083ff" :line-width="4" />
```

## 特殊样式

### 弹窗中使用

签名组件可以与 `wd-popup` 结合使用，建议在弹窗展示完成后调用实例的 `init` 方法完成初始化。

::: code-group

```html [vue]
<wd-button type="primary" @click="showPopup = true">打开签名板</wd-button>

<wd-popup
  v-model="showPopup"
  closable
  safe-area-inset-bottom
  position="bottom"
  custom-style="padding: 48px 20px 20px 20px; border-radius: 16px 16px 0 0;"
  @after-enter="signatureRef?.init()"
>
  <wd-signature ref="signatureRef" :height="300" enable-history pressure background-color="#f5f5f5" @confirm="handlePopupConfirm" />
</wd-popup>
```

```ts [ts]
import { ref } from 'vue'
import type { SignatureInstance, SignatureResult } from '@/uni_modules/wot-ui/components/wd-signature/types'

const showPopup = ref(false)
const signatureRef = ref<SignatureInstance>()

function handlePopupConfirm(result: SignatureResult) {
  showPopup.value = false
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}
```

:::

:::tip 提示
弹窗中使用签名板时，建议：

1. 开启 `closable` 显示关闭按钮。
2. 设置 `safe-area-inset-bottom` 适配底部安全区。
3. 使用 `custom-style` 调整弹窗内边距，为关闭按钮留出空间。
4. 在弹窗的 `after-enter` 事件中调用签名板的 `init` 方法，确保正确初始化。
   :::

### 横屏签名

支持以下两种横屏签名实现方案：

#### 1. 通用横屏方案 (推荐)

通过自定义布局和按钮旋转实现横屏效果，适用于所有平台。

:::tip 实现说明
通用横屏方案特点：

1. 使用 fixed 布局配合旋转实现左侧垂直按钮栏
2. 通过 footer 插槽自定义操作按钮
3. 使用 transform 实现按钮的旋转效果
4. 适用于所有平台,实现方式一致
5. 建议使用 inited 变量配合延迟加载避免画布初始化问题
   :::

::: code-group

```html [vue]
<template>
  <view class="landscape-signature">
    <wd-signature
      v-if="inited"
      :height="height"
      :width="width"
      enable-history
      pressure
      background-color="#f5f5f5"
      @confirm="handleConfirm"
    >
      <template #footer="{ clear, confirm, restore, revoke, canUndo, canRedo }">
        <view class="custom-actions">
          <view class="button-group">
            <wd-button size="small" plain @click="revoke" :disabled="!canUndo">撤回</wd-button>
            <wd-button size="small" plain @click="restore" :disabled="!canRedo">恢复</wd-button>
            <wd-button size="small" plain @click="clear">清除</wd-button>
            <wd-button size="small" type="primary" @click="confirm">完成</wd-button>
          </view>
        </view>
      </template>
    </wd-signature>
  </view>
</template>
```

```ts [ts]
import { pause } from '@/uni_modules/wot-ui/common/util'

const height = ref(0)
const width = ref(0)
const inited = ref(false)

onMounted(() => {
  const { windowWidth, windowHeight } = uni.getSystemInfoSync()
  width.value = windowWidth - 48
  height.value = windowHeight - 48
  
  pause(100).then(() => {
    inited.value = true
  })
})
```

```scss [css]
.landscape-signature {
  height: 100vh;
  // #ifdef H5
  height: calc(100vh - 44px);
  // #endif
  background: #fff;
  position: relative;
  padding: 24px 0;
  padding-left: 48px;
  box-sizing: border-box;

  .custom-actions {
    position: fixed;
    left: 0;
    top: 50%;
    width: 48px;
    transform: translateY(-50%) rotate(90deg);
    transform-origin: center;
    z-index: 10;

    .button-group {
      display: flex;
      flex-direction: row;
      gap: 12px;
      white-space: nowrap;
      width: max-content;
      transform: translateX(-50%);
    }
  }
}
```

:::

#### 2. 原生横屏方案 (仅微信小程序)

微信小程序提供了原生的横屏支持，使用时需要注意区分平台:

:::warning 注意事项

1. `pageOrientation` 配置仅在微信小程序端生效
2. 使用条件编译区分不同平台的布局结构
3. 微信小程序页面会自动旋转，按钮布局不需要特殊处理
4. 预留底部按钮空间时需要考虑横屏布局
5. 其他平台请使用通用横屏方案
   :::

::: code-group

```json [json]
{
  "path": "pages/signature/landscape",
  "style": {
    "navigationBarTitleText": "横屏签名",
    // #ifdef MP-WEIXIN
    "pageOrientation": "landscape"
    // #endif
  }
}
```

```html [vue]
<template>
  <view class="landscape-signature">
    <wd-signature
      v-if="inited"
      ref="signatureRef"
      :height="height" 
      :width="width"
      enable-history
      pressure
      background-color="#f5f5f5"
      @confirm="handleConfirm"
    >
    </wd-signature>
  </view>
</template>
```

```ts [ts]
import { pause } from '@/uni_modules/wot-ui/common/util'

const height = ref(0)
const width = ref(0)
const inited = ref(false)

onMounted(() => {
  const { windowWidth, windowHeight } = uni.getSystemInfoSync()
  width.value = windowWidth
  height.value = windowHeight - 60 // 预留底部按钮空间

  pause(100).then(() => {
    inited.value = true
  })
})
```

```scss [css]
.landscape-signature {
  height: 100vh;
  background: #fff;
  position: relative;
  box-sizing: border-box;

  // #ifdef MP-WEIXIN
  padding: 0;
  display: flex;
  flex-direction: column;

  .weixin-actions {
    padding: 12px;
    background-color: #f8f8f8;
    
    .button-group {
      display: flex;
      justify-content: center;
      gap: 12px;
    }
  }
  // #endif
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pen-color | 签名笔颜色 | `string` | `'#000'` |
| line-width | 签名笔宽度 | `number` | `3` |
| confirm-text | 确认按钮文本 | `string` | 内置文案 |
| clear-text | 清空按钮文本 | `string` | 内置文案 |
| revoke-text | 撤回按钮文本 | `string` | 内置文案 |
| restore-text | 恢复按钮文本 | `string` | 内置文案 |
| file-type | 导出图片类型，可选值为 `png`、`jpg` | `'png' \| 'jpg'` | `'png'` |
| quality | 导出图片质量，取值范围为 `0` 到 `1` | `number` | `1` |
| export-scale | 导出图片缩放比例 | `number` | `1` |
| disabled | 是否禁用签名板 | `boolean` | `false` |
| height | 画布高度 | `string \| number` | - |
| width | 画布宽度 | `string \| number` | - |
| background-color | 画板背景色 | `string` | - |
| disable-scroll | 是否禁用画布滚动 | `boolean` | `true` |
| enable-history | 是否开启历史记录 | `boolean` | `false` |
| step | 撤回和恢复的步长 | `number` | `1` |
| undo-text | 撤销按钮文本 | `string` | 内置文案 |
| redo-text | 恢复按钮文本 | `string` | 内置文案 |
| pressure | 是否开启压感模式 | `boolean` | `false` |
| max-width | 压感模式下的最大笔触宽度 | `number` | `6` |
| min-width | 压感模式下的最小笔触宽度 | `number` | `2` |
| min-speed | 压感模式下的最小速度阈值 | `number` | `1.5` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始签名时触发 | event |
| end | 结束签名时触发 | event |
| signing | 签名过程中持续触发 | event |
| confirm | 确认签名时触发 | `SignatureResult` |
| clear | 清空签名时触发 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| init | 初始化签名板 | `forceUpdate?: boolean` |
| confirm | 确认并导出签名图片 | - |
| clear | 清空签名 | - |
| restore | 恢复上一步 | - |
| revoke | 撤销上一步 | - |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| footer | 自定义底部操作区 | `{ clear, confirm, currentStep, revoke, restore, canUndo, canRedo, historyList }` |

---

---
url: 'https://v2.wot-ui.cn/component/skeleton.md'
---
# Skeleton 骨架屏

骨架屏用于内容加载时的占位展示，支持多种主题类型、行列自定义、动画效果和插槽内容。

## 组件类型

### 基本用法

通过 `theme` 设置不同骨架主题，常用于文本、头像、图片、段落等场景。

::: code-group

```html
<wd-skeleton theme="avatar" />
<wd-skeleton theme="image" />
<wd-skeleton theme="text" />
<wd-skeleton theme="paragraph" />
```

:::

## 组件样式

### 宫格骨架屏

通过 `row-col` 组合多行多列占位结构，可以构造宫格骨架屏。

::: code-group

```html
<wd-skeleton :row-col="grid" />
```

```ts
const grid = [
  [
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' }
  ],
  [
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' }
  ]
] as SkeletonRowCol[]
```

:::

### 单元格骨架屏

可以组合头像、矩形块与文本行，模拟常见单元格列表布局。

```html
<view style="display: flex">
  <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
</view>
<view style="display: flex; margin-top: 20px">
  <wd-skeleton :row-col="[{ size: '48px', type: 'rect' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
</view>
```

### 图片组合骨架屏

可以结合 `row-col` 自定义图片卡片与图文混排占位结构。

```html
<wd-skeleton :row-col="[{ height: '171px' }, 1, { width: '107px' }, [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]]" />
<wd-skeleton :custom-style="{ marginTop: '20px' }" :row-col="[{ height: '171px' }, 1, { width: '107px' }, [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]]" />
```

## 特殊样式

### 渐变加载动画

设置 `animation="gradient"` 开启渐变加载动画。

```html
<wd-skeleton animation="gradient" theme="paragraph" />
```

### 闪烁加载动画

设置 `animation="flashed"` 开启闪烁加载动画。

```html
<view style="display: flex">
  <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
  <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" animation="flashed" theme="paragraph" />
</view>
```

### 插槽内容

通过默认插槽写入实际内容，`loading` 为 `true` 时显示骨架屏，切换为 `false` 后显示插槽内容。

::: code-group

```html
<wd-skeleton :row-col="grid" :loading="showContent">
  <wd-grid>
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
    <wd-grid-item icon-size="32px" icon="camera" text="文字" />
  </wd-grid>
</wd-skeleton>
```

```ts
const showContent = ref(true)
```

:::

***

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 骨架屏主题，可选值为 `text`、`avatar`、`paragraph`、`image` | `SkeletonTheme` | `'text'` |
| row-col | 自定义每行占位配置，用于设置行列数量、宽高、间距、圆角和占位类型等，支持数字、对象、对象数组 | `SkeletonRowCol[]` | `[]` |
| loading | 是否显示骨架屏 | `boolean` | `true` |
| animation | 动画类型，可选值为 `gradient`、`flashed` | `SkeletonAnimation` | `''` |
| customClass | 自定义样式类名 | `string \| string[] \| Record<string, boolean>` | `''` |
| custom-style | 自定义内联样式 | `CSSProperties` | `{}` |

## Slots

| name | 说明 |
| --- | --- |
| default | `loading` 结束后展示的实际内容 |

## 类型说明

### SkeletonTheme

可选值：`'text' | 'avatar' | 'paragraph' | 'image'`

### SkeletonAnimation

可选值：`'gradient' | 'flashed'`

### SkeletonRowCol 配置示例

```ts
// 三行，分别显示为一列、一列、两列的占位符
[1, 1, 2]

// 三行，第三行自定义宽度
[1, 1, { width: '100px' }]

// 第三行包含两列，分别设置宽度和右外边距
[1, 1, [{ width: '50%' }, { width: '50%', marginRight: '10px' }]]
```

---

---
url: 'https://v2.wot-ui.cn/guide/skills.md'
---

# Skills

[Skills](https://agentskills.io/what-are-skills) 是 AI 的“超能力模板”，是一套完整的、可复用的、能解决特定问题的方案，我们专为 AI Agent（如 Trae, Cursor, Cline 等）设计了 Wot UI 相关的 Skills，以帮助 AI 更加准确、高效地处理 `wot-ui` 相关的开发任务。

## 🎯 内置技能

我们提供以下 AI 技能，可供 AI 智能体根据任务需求加载：

| Skill | 描述 | 适用场景 | 入口 |
| --- | --- | --- | --- |
| `wot-ui-v2` | 处理 wot-ui v2 组件库日常开发的核心技能。 | 组件选型、API 查询、生成 Vue3 + uni-app 页面代码、排查常见组件坑位（如 Toast, Dialog 挂载等）。 | [skills/wot-ui-v2/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-v2/SKILL.md) |
| `wot-ui-cli` | 专门用于回答、使用和调试 `@wot-ui/cli` 工具本身的技能。 | 查询 CLI 命令用法（list, info, doc 等）、配置 MCP Server、本地调试 CLI 源码、执行离线数据提取。 | [skills/wot-ui-cli/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-cli/SKILL.md) |
| `wot-ui-unocss-preset-guide` | 指导安装、配置并使用 `@wot-ui/unocss-preset`。 | 预设接入、`unocss.config.ts` 配置（如 `presetWot`）、`prefix/preflight/baseTokens` 使用示例、类名不生效/自动补全不出现等问题排查。 | [skills/wot-ui-unocss-preset-guide/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-unocss-preset-guide/SKILL.md) |
| `create-wot-ui-theme` | 生成 wot-ui 单文件主题 SCSS 的专项技能。 | 需要为 wot-ui 定制品牌主题，且要求遵循“单文件包含 mixin 和挂载选择器、App.vue 仅作 `@use` 引入”的约束时使用。 | [skills/create-wot-ui-theme/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/create-wot-ui-theme/SKILL.md) |

## 安装

推荐使用脚本安装 Skills，可以根据实际需求选择安装项：

```sh
pnpx skills add wot-ui/open-wot
# or
npx skills add wot-ui/open-wot
```

## 延伸阅读

* [llms.txt](/guide/llms-txt)
* [Agent Skills、Rules、Prompt、MCP，一文把它们理清楚了](https://juejin.cn/post/7599268297201958950)

---

---
url: 'https://v2.wot-ui.cn/component/slider.md'
---
# Slider 滑块

支持单向滑块和双向滑块，可用于在范围内选择一个值或一段区间。

## 组件类型

### 基本用法

`v-model` 为绑定值。值为 `number` 时显示一个滑块。

```html
<wd-slider v-model="value" />
```

```ts
const value = ref<number>(30)
```

### 双向滑块

设置 `range` 后，绑定值变为数组类型。

```html
<wd-slider v-model="value" range />
```

```ts
const value = ref<number[]>([20, 60])
```

## 组件状态

### 禁用状态

设置 `disabled` 禁用滑块。

```html
<wd-slider v-model="value" disabled />
```

## 组件样式

### 显示极值

设置 `show-extreme-value` 显示最小值和最大值。

```html
<wd-slider v-model="value" show-extreme-value />
```

### 管道样式

设置 `theme="capsule"` 使用管道样式。

```html
<wd-slider v-model="value" theme="capsule" />
```

### 指定步长

通过 `step` 设置步长。

```html
<wd-slider v-model="value" :step="10" />
```

### 指定选择范围

通过 `min` 和 `max` 设置取值范围。

```html
<wd-slider v-model="value" :min="-10" :max="10" show-extreme-value />
```

### 刻度标记

通过 `marks` 配置刻度标记。

```html
<wd-slider v-model="value" :marks="[0, 25, 50, 75, 100]" :step="25" />
```

### 刻度标记（管道）

刻度标记也可以与管道样式组合使用。

```html
<wd-slider v-model="value" :marks="[0, 25, 50, 75, 100]" :step="25" theme="capsule" />
```

## 布局能力

### 垂直方向

设置 `vertical` 以垂直方向展示。

```html
<wd-slider v-model="value" vertical />
<wd-slider v-model="rangeValue" vertical range />
```

### 垂直 + 管道

垂直方向支持与 `theme="capsule"` 组合使用。

```html
<wd-slider v-model="value" vertical theme="capsule" />
<wd-slider v-model="rangeValue" vertical theme="capsule" range show-extreme-value />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前滑块值，单滑块为 `number`，双滑块为 `number[]` | `SliderValue` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| range | 是否为双向滑块模式 | `boolean` | `false` |
| vertical | 是否垂直展示 | `boolean` | `false` |
| theme | 滑块风格，可选值为 `default`、`capsule` | `SliderTheme` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-extreme-value | 是否显示最小值和最大值文本 | `boolean` | `false` |
| popover-visible | 气泡显示模式，可选值为 `always`、`normal`、`never` | `SliderPopoverVisible` | `'normal'` |
| marks | 刻度标记，支持数组或对象形式 | `SliderMarks` | - |
| active-color | 进度条激活态颜色 | `string` | `''` |
| inactive-color | 进度条未激活态颜色 | `string` | `''` |
| custom-class | 根节点样式类 | `string` | `''` |
| custom-style | 根节点样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| dragstart | 开始拖动时触发 | `{ value }` |
| dragmove | 拖动过程中触发 | `{ value }` |
| dragend | 拖动结束时触发 | `{ value }` |
| change | 值变化时触发 | `value` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| initSlider | 初始化 slider 尺寸数据 | - |

---

---
url: 'https://v2.wot-ui.cn/component/slide-verify.md'
---
# SlideVerify 滑动验证

滑动验证组件，用于人机验证场景。

## 组件类型

### 基本用法

```html
<wd-slide-verify @success="handleSuccess" @fail="handleFail" />
```

```ts
const toast = useToast()

function handleSuccess() {
  toast.success('验证成功')
}

function handleFail() {
  toast.error('验证失败，请重试')
}
```

## 组件状态

### 禁用状态

设置 `disabled` 后禁用滑动验证。

```html
<wd-slide-verify disabled />
```

## 组件样式

### 自定义文案

通过 `text` 和 `success-text` 属性自定义提示文字。

```html
<wd-slide-verify text="请拖动滑块" success-text="验证成功" />
```

### 自定义颜色

通过 `background-color` 和 `active-background-color` 属性自定义颜色。

```html
<wd-slide-verify background-color="#E8F4FF" active-background-color="#4D94FF" />
```

### 自定义图标

通过 `icon` 和 `success-icon` 属性自定义图标。

```html
<wd-slide-verify icon="arrow-right" success-icon="thumb-up-fill" />
```

## 特殊样式

### 自定义容错范围

通过 `tolerance` 属性设置容错范围（单位：px），默认为 10px。

```html
<wd-slide-verify :tolerance="20" />
```

### 重置方法

通过 `ref` 获取组件实例，调用 `reset` 方法重置验证状态。

```html
<wd-slide-verify ref="slideVerifyRef" @success="handleSuccess" @fail="handleFail" />
<wd-button type="primary" @click="handleReset">重置</wd-button>
```

```ts
import { ref } from 'vue'
import type { SlideVerifyInstance } from '@/uni_modules/wot-ui/components/wd-slide-verify/types'

const slideVerifyRef = ref<SlideVerifyInstance>()

function handleReset() {
  slideVerifyRef.value?.reset()
}
```

### 插槽用法

支持通过插槽自定义内容。

```html
<wd-slide-verify>
  <template #text>
    <text>向右滑动完成验证</text>
  </template>
  <template #success-text>
    <text>验证通过</text>
  </template>
  <template #icon>
    <view>ICON</view>
  </template>
  <template #success-icon>
    <view style="color: red">OK</view>
  </template>
</wd-slide-verify>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tolerance | 容错范围，单位为 `px` | number | `10` |
| text | 提示文字，为空时显示内置文案 | string | `''` |
| success-text | 验证成功提示文字，为空时显示内置文案 | string | `''` |
| disabled | 是否禁用 | boolean | `false` |
| background-color | 背景颜色 | string | - |
| active-background-color | 激活时的背景颜色 | string | - |
| icon | 滑块图标名称 | string | `double-right` |
| success-icon | 成功图标名称 | string | `check-circle-fill` |
| icon-size | 图标大小 | string / number | - |
| success-icon-size | 成功图标大小 | string / number | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| success | 验证成功时触发 | - |
| fail | 验证失败时触发 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| init | 初始化尺寸信息 | - |
| reset | 重置验证组件到初始状态 | - |

## Slots

| name | 说明 |
| --- | --- |
| text | 自定义提示文字内容 |
| success-text | 自定义验证成功提示文字内容 |
| icon | 自定义滑块图标 |
| success-icon | 自定义成功图标 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/sort-button.md'
---
# SortButton 排序按钮

用于展示排序按钮，支持升序、降序、重置三种状态。

## 组件类型

### 基本用法

使用 `v-model` 绑定当前排序状态，取值为 `-1`、`0`、`1`，分别表示降序、重置状态、升序。

```html
<wd-sort-button v-model="value" title="价格" @change="handleChange" />
```

```ts
const value = ref(0)

function handleChange({ value }) {
  console.log(value)
}
```

## 组件变体

### 允许重置

设置 `allow-reset` 后，排序按钮可回到重置状态。

```html
<wd-sort-button v-model="value" title="价格" allow-reset />
```

### 优先切换为降序

设置 `desc-first` 后，首次切换优先进入降序。

```html
<wd-sort-button v-model="value" title="价格" desc-first />
```

## 组件样式

### 显示下划线

设置 `line` 显示下划线。

```html
<wd-sort-button v-model="value" title="价格" line />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前排序方向值，`1` 表示升序，`0` 表示重置状态，`-1` 表示降序 | `SortButtonValue` | `0` |
| title | 排序按钮文案 | `string` | `''` |
| allow-reset | 是否允许重置为未选中状态 | `boolean` | `false` |
| desc-first | 是否优先切换为降序 | `boolean` | `false` |
| line | 是否显示下划线 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 排序方向变化时触发 | `{ value }` |

---

---
url: 'https://v2.wot-ui.cn/component/steps.md'
---
# Steps 步骤条

用于引导用户按照流程完成任务，或向用户展示当前所处的步骤状态。

:::tip 提示
`wd-step` 已直接支持 `title`、`icon` 和 `description` 插槽，无需再设置旧版的 `*-slot` 控制字段。
:::

## 组件类型

### 基本用法

`active` 为当前步骤进度，对应步骤下标。

```html
<wd-steps :active="0">
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

### 标题和描述信息

通过 `title` 和 `description` 设置每个步骤的标题和描述。

```html
<wd-steps :active="active" align-center>
  <wd-step title="步骤1" description="注册1个账号" />
  <wd-step title="步骤2" description="登录账号并绑定手机" />
  <wd-step title="步骤3" description="完善个人信息" />
</wd-steps>
<wd-button size="small" @click="nextStep">下一步</wd-button>
```

```ts
const active = ref(0)

function nextStep() {
  active.value += 1
}
```

### 修改图标

通过 `icon` 设置步骤图标。

```html
<wd-steps :active="1" align-center>
  <wd-step icon="settings" />
  <wd-step icon="list" />
  <wd-step icon="clock-circle" />
</wd-steps>
```

## 组件状态

### 修改状态

通过 `status` 设置指定步骤的状态。

```html
<wd-steps :active="1" align-center>
  <wd-step title="绑定手机" />
  <wd-step title="重新绑定手机" status="error" />
  <wd-step title="步骤3" />
</wd-steps>
```

## 组件样式

### 水平居中

设置 `align-center` 水平居中，只对横向步骤条有效。

```html
<wd-steps :active="0" align-center>
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

## 布局能力

### 竖向步骤条

设置 `vertical` 以垂直方向展示。

```html
<wd-steps :active="1" vertical>
  <wd-step description="注册1个账号" />
  <wd-step description="登录账号并绑定手机" />
  <wd-step description="完善个人信息" />
</wd-steps>
```

## 特殊样式

### 点状步骤条

设置 `dot` 使用点状步骤条。

```html
<wd-steps :active="1" align-center dot>
  <wd-step title="步骤1" description="注册1个账号" />
  <wd-step title="步骤2" description="登录账号并绑定手机" />
  <wd-step title="步骤3" description="完善个人信息" />
</wd-steps>
```

### 可控制的点状步骤条

点状步骤条支持通过外部 `active` 控制当前步骤。

```html
<wd-steps :active="dotActive" align-center dot>
  <wd-step title="步骤1" description="注册一个账号" />
  <wd-step title="步骤2" description="登录账号并绑定手机" />
  <wd-step title="步骤3" description="完善个人信息" />
</wd-steps>
```

### 竖向点状步骤条

`vertical` 和 `dot` 可以组合使用。

```html
<wd-steps :active="1" vertical dot>
  <wd-step description="注册1个账号" />
  <wd-step description="登录账号并绑定手机" />
  <wd-step description="完善个人信息" />
</wd-steps>
```

## Steps Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前激活步骤下标 | `number` | `0` |
| vertical | 是否垂直方向展示 | `boolean` | `false` |
| dot | 是否使用点状步骤条 | `boolean` | `false` |
| space | 步骤条间距，默认自动计算 | `string` | `''` |
| align-center | 是否水平居中，只对横向步骤条有效 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Step Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题，不传时显示默认文案 | `string` | - |
| description | 步骤描述 | `string` | - |
| icon | 步骤图标 | `string` | - |
| status | 步骤状态，可选值为 `finished`、`process`、`error`、`wait` | `StepStatus` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Steps Slots

| name | 说明 |
| --- | --- |
| default | Step 列表 |

## Step Slots

| name | 说明 |
| --- | --- |
| icon | 自定义步骤图标 |
| title | 自定义步骤标题 |
| description | 自定义步骤描述 |

---

---
url: 'https://v2.wot-ui.cn/component/sticky.md'
---
# Sticky 粘性布局

粘性布局组件，用于在页面滚动时将元素固定在指定位置。

## 组件类型

### 基本用法

将需要吸顶的内容包裹在 `wd-sticky` 组件内即可。

> 注意：被包裹的元素在样式中使用百分比单位 `width:xx%;height:xx%;` 无效，建议使用 `vh`、`vw`。

```html
<wd-sticky>
  <wd-button type="success">基础用法</wd-button>
</wd-sticky>
```

### 指定容器

将 `wd-sticky` 放入相对容器中，再使用 `wd-sticky-box` 包裹该容器，可限制吸顶区域。

```html
<wd-sticky-box>
  <view class="container">
    <wd-sticky>
      <wd-button type="warning">指定容器</wd-button>
    </wd-sticky>
  </view>
</wd-sticky-box>
```

```scss
.container {
  height: 120px;
  width: 100vw;
}
```

## 组件样式

### 吸顶距离

通过 `offset-top` 设置组件吸顶时与顶部的距离。

::: tip 提醒
在 H5 端默认导航栏为普通元素，所以吸顶距离会自动在 `offset-top` 的基础上增加 `44px`。当 H5 端使用自定义导航栏时，需要自行扣除这部分高度。
:::

```html
<wd-sticky :offset-top="50">
  <wd-button>吸顶距离</wd-button>
</wd-sticky>
```

### 相对容器吸顶距离

`offset-top` 也可以与 `wd-sticky-box` 组合使用。

```html
<wd-sticky-box>
  <view class="container">
    <wd-sticky :offset-top="150">
      <wd-button type="warning">相对容器吸顶距离</wd-button>
    </wd-sticky>
  </view>
</wd-sticky-box>
```

## 特殊样式

### 动态插入

`wd-sticky` 支持包裹动态生成的内容。

> 注意包裹动态生成的内容时，内容的宽高不小于 `1px`

```html
<wd-button type="info" plain @click="insert">点击插入</wd-button>
<wd-sticky>
  <wd-button v-if="show" type="danger">动态生成</wd-button>
</wd-sticky>
```

```ts
const show = ref(false)

function display() {
  show.value = true
}

function insert() {
  display()
}

onShow(() => {
  setTimeout(display, 5000)
})
```

## Sticky Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| z-index | 层级 | `number` | `1` |
| offset-top | 吸顶距离 | `number` | `0` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Sticky Slots

| name | 说明 |
| --- | --- |
| default | 需要吸顶的内容 |

## Sticky 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |

## Sticky Box Slots

| name | 说明 |
| --- | --- |
| default | 相对容器内容 |

## Sticky Box 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |

---

---
url: 'https://v2.wot-ui.cn/component/swipe-action.md'
---
# SwipeAction 滑动操作

常用于单元格左右滑删除等手势操作。

:::warning
滑动操作组件对页面的功能隐藏较深，用户难以发现，建议优先使用更直接的交互方式，例如列表项按钮或 ActionSheet。

如果仍然使用滑动操作，建议在用户进入页面时提供显式提示，告知列表项支持左右滑动。
:::

## 组件类型

### 基本用法

`wd-swipe-action` 由三部分组成：左侧操作区、内容区、右侧操作区。左右操作区分别通过 `left` 和 `right` 插槽定义，内容区使用默认插槽。

在页面根节点上监听点击事件，并结合 `useQueue` 提供的 `closeOutside`，可以在点击组件外部区域时统一关闭已展开的滑动项。

:::warning
如果页面上存在“点击按钮后手动展开 `swipe-action`”之类的交互，需要在这些按钮外层使用 `@click.stop` 阻止事件冒泡，避免触发根节点上的 `closeOutside`。
:::

::: code-group

```html [vue]
<view @click="closeOutside">
  <wd-swipe-action>
    <wd-cell title="标题文字" value="内容" />
    <template #right>
      <view class="action">
        <view class="button" style="background: #E2231A;" @click="handleAction('操作1')">操作1</view>
        <view class="button" style="background: #FFB300;" @click="handleAction('操作2')">操作2</view>
        <view class="button" style="background: #4D80F0;" @click="handleAction('操作3')">操作3</view>
      </view>
    </template>
  </wd-swipe-action>
</view>
```

```ts [ts]
import { useToast, useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
const toast = useToast()

function handleAction(action: string) {
  toast.show(`点击了${action}`)
}
```

```scss [scss]
.action {
  height: 100%;
}

.button {
  display: inline-block;
  padding: 0 15px;
  height: 100%;
  color: #fff;
  line-height: 44px;
}
```

:::

### 左右滑动

通过 `left` 和 `right` 插槽可以同时配置左右两侧操作区。

```html
<wd-swipe-action>
  <template #left>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #4D80F0;">操作3</view>
    </view>
  </template>
  <wd-cell title="标题文字" value="内容" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作4</view>
      <view class="button" style="background: #FFB300;">操作5</view>
      <view class="button" style="background: #4D80F0;">操作6</view>
    </view>
  </template>
</wd-swipe-action>
```

## 组件状态

### 禁用滑动按钮

设置 `disabled` 后，组件不会响应滑动和点击关闭相关交互。

```html
<wd-swipe-action disabled>
  <wd-cell title="标题文字" value="内容" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #4D80F0;">操作3</view>
    </view>
  </template>
</wd-swipe-action>
```

## 特殊样式

### 切换按钮

通过 `v-model` 可以直接控制当前展开状态，可选值为 `left`、`close`、`right`，分别表示展开左侧、收起全部、展开右侧。

::: code-group

```html [vue]
<wd-swipe-action v-model="value">
  <template #left>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #4D80F0;">操作3</view>
    </view>
  </template>
  <wd-cell title="标题文字" value="内容" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作4</view>
      <view class="button" style="background: #FFB300;">操作5</view>
      <view class="button" style="background: #4D80F0;">操作6</view>
    </view>
  </template>
</wd-swipe-action>

<view class="button-group">
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('left')">打开左边</wd-button>
  </view>
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('close')">关闭所有</wd-button>
  </view>
  <view @click.stop="noop">
    <wd-button size="small" @click="changeState('right')">打开右边</wd-button>
  </view>
</view>
```

```ts [ts]
import { ref } from 'vue'
import type { SwipeActionStatus } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const value = ref<SwipeActionStatus>('close')

function changeState(position: SwipeActionStatus) {
  value.value = position
}

function noop() {}
```

:::

### 按钮关闭前的钩子函数

`before-close` 会在组件执行关闭逻辑前触发，可用于关闭前校验或异步确认。

钩子函数接收两个参数：

* `reason`：关闭原因，可选值为 `click`、`swipe`、`value`
* `position`：关闭位置，可选值为 `left`、`right`、`inside`

其中 `inside` 表示点击了内容区域内部但不属于左右操作按钮的位置。

需要显式返回 `true` 或 `Promise<true>` 才会继续关闭，返回 `false` 或 `Promise<false>` 会阻止关闭。

::: code-group

```html [vue]
<wd-swipe-action :before-close="beforeClose">
  <wd-cell title="标题文字" value="阻止点击内容区关闭" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">删除</view>
      <view class="button" style="background: #FFB300;">标记</view>
    </view>
  </template>
</wd-swipe-action>
```

```ts [ts]
import { useToast } from '@/uni_modules/wot-ui'
import type { SwipeActionBeforeClose } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const toast = useToast()

const beforeClose: SwipeActionBeforeClose = (reason, position) => {
  return new Promise((resolve) => {
    const shouldClose = !(reason === 'click' && position === 'inside')

    if (!shouldClose) {
      toast.show('已拦截点击内容区导致的关闭')
      resolve(false)
    } else {
      toast.loading('处理中...')
      setTimeout(() => {
        toast.close()
        if (reason === 'click') {
          toast.show(`${reason} ${position} 导致滑动按钮关闭`)
        } else {
          toast.show(`${reason} 导致 ${position} 滑动按钮关闭`)
        }
        resolve(true)
      }, 3000)
    }
  })
}
```

:::

### 点击事件

`click` 事件会在已展开状态下点击内容区、左侧操作区或右侧操作区，并且关闭成功后发出；若被 `before-close` 拦截则不会触发。

```html
<wd-swipe-action @click="handleClick">
  <wd-cell title="标题文字" value="内容" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #E2231A;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #4D80F0;">操作3</view>
    </view>
  </template>
</wd-swipe-action>
```

```ts
import { useToast } from '@/uni_modules/wot-ui'
import type { SwipeActionClickEvent } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'

const toast = useToast()

function handleClick({ value }: SwipeActionClickEvent) {
  toast.show(`点击 ${value} 关闭操作按钮`)
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前滑动状态，可选值为 `left`、`close`、`right` | `SwipeActionStatus` | `close` |
| disabled | 是否禁用滑动操作 | `boolean` | `false` |
| before-close | 关闭前拦截函数，接收 `(reason, position)`，返回 `true` 或 `Promise<boolean>` 时继续关闭，返回 `false` 时阻止关闭 | `SwipeActionBeforeClose` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 已展开状态下点击内容区或操作区并关闭时触发 | `SwipeActionClickEvent` |
| update:modelValue | 滑动状态变化时触发 | `SwipeActionStatus` |

## Methods

通过组件实例可以调用以下方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| close | 关闭已展开的操作按钮 | `reason: SwipeActionReason, position?: SwipeActionPosition` | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| left | 自定义左侧操作区 |
| default | 自定义内容区 |
| right | 自定义右侧操作区 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点内联样式 |

---

---
url: 'https://v2.wot-ui.cn/component/swiper.md'
---
# Swiper 轮播

用于创建轮播，支持水平和垂直方向滑动、自定义指示器、图片和视频资源展示，以及基于对象数据渲染标题。

::: danger 请注意
嵌入视频仅在 H5、微信小程序和钉钉小程序支持，其余端不支持，请了解后使用。
:::

## 组件类型

### 点状指示器

基础轮播可通过 `indicator` 配置展示点状指示器。

::: code-group

```html [vue]
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots' }"></wd-swiper>
```

```ts [ts]
import { ref } from 'vue'

const current = ref(0)

const swiperList = ref([
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg'
])
```

:::

### 点条状指示器

```html
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots-bar' }"></wd-swiper>
```

### 数字指示器

```html
<wd-swiper
  :list="swiperList"
  autoplay
  v-model:current="current"
  :indicator="{ type: 'fraction' }"
  indicator-position="bottom-right"
></wd-swiper>
```

## 组件变体

### 手动切换

关闭 `autoplay` 并开启 `showControls` 后，可通过控制按钮手动切换轮播项。

```html
<wd-swiper
  :list="swiperList"
  :autoplay="false"
  v-model:current="current"
  :indicator="{ showControls: true }"
  :loop="false"
></wd-swiper>
```

### 垂直方向

```html
<wd-swiper
  :list="swiperList"
  direction="vertical"
  indicator-position="right"
  autoplay
  v-model:current="current"
  :indicator="{ type: 'dots-bar' }"
></wd-swiper>
```

### 指定 value-key 和 text-key

当 `list` 为对象数组时，可通过 `value-key` 和 `text-key` 指定图片地址字段与标题字段。

::: code-group

```html [vue]
<wd-swiper value-key="url" text-key="title" :list="customSwiperList" autoplay v-model:current="current"></wd-swiper>
```

```ts [ts]
import { ref } from 'vue'

const current = ref(0)

const customSwiperList = ref([
  { url: 'https://wot-ui.cn/assets/redpanda.jpg', title: '小熊猫' },
  { url: 'https://wot-ui.cn/assets/capybara.jpg', title: '卡皮巴拉' },
  { url: 'https://wot-ui.cn/assets/panda.jpg', title: '大熊猫' },
  { url: 'https://wot-ui.cn/assets/moon.jpg', title: '诗画中国' }
])
```

:::

## 组件样式

### 卡片样式

设置 `previous-margin` 和 `next-margin`，并结合自定义类名，可以实现卡片轮播样式。

```html
<view class="card-swiper">
  <wd-swiper
    autoplay
    v-model:current="current"
    :indicator="{ type: 'dots' }"
    :list="swiperList"
    previous-margin="24px"
    next-margin="24px"
    custom-indicator-class="custom-indicator-class"
    custom-image-class="custom-image"
    custom-next-image-class="custom-image-prev"
    custom-prev-image-class="custom-image-prev"
  ></wd-swiper>
</view>
```

```scss
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #e7e7e7;
  --wot-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 24rpx;

  :deep(.custom-indicator-class) {
    bottom: -16px;
  }

  :deep(.custom-image) {
    border-radius: 12rpx;
  }

  :deep(.custom-image-prev) {
    height: 168px !important;
  }
}
```

### 同时展示 2 个滑块

通过 `display-multiple-items` 控制同时展示的滑块数量。

```html
<wd-swiper
  autoplay
  v-model:current="current"
  :display-multiple-items="2"
  :indicator="{ type: 'dots' }"
  :list="swiperList"
  previous-margin="24px"
  next-margin="24px"
></wd-swiper>
```

### 自定义指示器

通过 `indicator` 插槽可以完全自定义指示器展示。

```html
<wd-swiper :list="swiperList" direction="vertical" indicator-position="right" autoplay v-model:current="current">
  <template #indicator="{ current, total }">
    <view class="custom-indicator">{{ current + 1 }}/{{ total }}</view>
  </template>
</wd-swiper>
```

```scss
.custom-indicator {
  position: absolute;
  right: 24rpx;
  bottom: 24rpx;
  padding: 0 12rpx;
  height: 48rpx;
  line-height: 48rpx;
  border-radius: 45%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 24rpx;
}
```

## 特殊样式

### 视频轮播

```html
<wd-swiper :list="videoList" autoplay :indicator="{ type: 'fraction' }" indicator-position="top-right"></wd-swiper>
```

```ts
import { ref } from 'vue'

const videoList = ref([
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_150752.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_155516.mp4',
  'https://wot-ui.cn/assets/moon.jpg'
])
```

### 手动播放视频

```html
<wd-swiper
  :list="videoList"
  autoplay
  :autoplay-video="false"
  :indicator="{ type: 'fraction' }"
  indicator-position="top-right"
></wd-swiper>
```

### 播放视频时停止轮播

```html
<wd-swiper
  :list="videoList"
  autoplay
  stop-autoplay-when-video-play
  :autoplay-video="false"
  :indicator="{ type: 'fraction' }"
  indicator-position="top-right"
></wd-swiper>
```

### 属性控制切换

```html
<wd-swiper :loop="isLoop" :autoplay="false" :list="swiperList" v-model:current="current" />
<wd-gap />
<wd-cell-group>
  <wd-cell title="loop">
    <wd-switch v-model="isLoop" size="24px" />
  </wd-cell>
  <wd-cell title="current" :value="current.toString()" />
</wd-cell-group>
<view style="display: flex; justify-content: space-between">
  <wd-button @click="current--">prev</wd-button>
  <wd-button type="success" @click="current++">next</wd-button>
</view>
```

### 插槽用法

通过默认插槽可以自定义轮播项内容。

```html
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots-bar' }">
  <template #default="{ item }">
    <image :src="item as string" mode="aspectFill" style="width: 100%; height: 100%" />
  </template>
</wd-swiper>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoplay | 是否自动播放 | `boolean` | `true` |
| v-model:current | 当前轮播项索引 | `number` | `0` |
| direction | 轮播方向，可选值为 `horizontal`、`vertical` | `DirectionType` | `horizontal` |
| display-multiple-items | 同时显示的滑块数量 | `number` | `1` |
| duration | 滑动动画时长，单位为 `ms` | `number` | `300` |
| easing-function | 切换缓动动画类型，可选值为 `default`、`linear`、`easeInCubic`、`easeOutCubic`、`easeInOutCubic` | `EasingType` | `default` |
| height | 轮播高度 | string | number | `192` |
| interval | 自动轮播间隔时间，单位为 `ms` | `number` | `5000` |
| list | 轮播数据列表，支持字符串数组或对象数组 | string\[] | SwiperItem\[] | `[]` |
| loop | 是否循环播放 | `boolean` | `true` |
| video-loop | 视频是否循环播放 | `boolean` | `true` |
| muted | 视频是否静音播放 | `boolean` | `true` |
| next-margin | 后边距 | string | number | `0` |
| indicator-position | 指示器位置，可选值为 `left`、`top-left`、`top`、`top-right`、`bottom-left`、`bottom`、`bottom-right`、`right` | `IndicatorPositionType` | `bottom` |
| previous-margin | 前边距 | string | number | `0` |
| radius | 轮播圆角 | string | number | - |
| snap-to-edge | 是否将边距应用到首尾元素 | `boolean` | `false` |
| indicator | 指示器配置，传入 `false` 时隐藏指示器 | boolean | Partial\<SwiperIndicatorProps> | `true` |
| image-mode | 图片裁剪模式，取值参考 uni-app Image 组件 `mode` | `ImageMode` | `aspectFill` |
| show-menu-by-longpress | 是否开启长按图片显示识别小程序码菜单 | `boolean` | `false` |
| value-key | 选项对象中图片地址字段名 | `string` | `value` |
| text-key | 选项对象中标题字段名 | `string` | `text` |
| autoplay-video | 视频是否自动播放 | `boolean` | `true` |
| stop-previous-video | 切换轮播项时是否停止上一个视频播放 | `boolean` | `true` |
| stop-autoplay-when-video-play | 视频播放时是否停止自动轮播 | `boolean` | `false` |
| adjust-height | 自动根据滑块高度调整容器高度，可选值为 `first`、`current`、`highest`、`none`，仅支付宝小程序支持 | `AdjustHeightType` | `highest` |
| adjust-vertical-height | `vertical` 为 `true` 时强制让 `adjust-height` 生效，仅支付宝小程序支持 | `boolean` | `false` |
| custom-indicator-class | 自定义指示器类名 | `string` | `''` |
| custom-image-class | 自定义图片类名 | `string` | `''` |
| custom-prev-image-class | 自定义前一个图片类名 | `string` | `''` |
| custom-next-image-class | 自定义后一个图片类名 | `string` | `''` |
| custom-item-class | 自定义轮播项类名 | `string` | `''` |
| custom-prev-class | 自定义前一个轮播项类名 | `string` | `''` |
| custom-next-class | 自定义后一个轮播项类名 | `string` | `''` |
| custom-text-class | 自定义标题类名 | `string` | `''` |
| custom-text-style | 自定义标题样式 | `string` | `''` |
| custom-class | 根节点自定义样式类 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击轮播项时触发 | { index: number; item: SwiperItem | string } |
| change | 轮播切换时触发 | { current: number; source: string } |
| animationfinish | 轮播动画结束时触发 | { current: number; source: string } |
| update:current | 当前轮播项更新时触发 | `number` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义轮播项内容，参数为 { item, index } |
| indicator | 自定义指示器内容，参数为 { current, total } |

## 类型定义

### DirectionType

轮播方向，可选值为 `horizontal`、`vertical`。

### EasingType

切换缓动动画类型，可选值为 `default`、`linear`、`easeInCubic`、`easeOutCubic`、`easeInOutCubic`。

### IndicatorPositionType

指示器位置，可选值为 `left`、`top-left`、`top`、`top-right`、`bottom-left`、`bottom`、`bottom-right`、`right`。

### AdjustHeightType

自动高度策略，可选值为 `first`、`current`、`highest`、`none`。

### SwiperIndicatorType

指示器类型，可选值为 `dots`、`dots-bar`、`fraction`。

### SwiperItem

轮播项对象配置，支持扩展字段。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 图片或视频地址 | `string` | - |
| poster | 视频封面地址 | `string` | - |
| type | 资源类型，可选值为 `image`、`video` | `SwiperItemType` | - |

### SwiperIndicator Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前轮播项索引 | `number` | `0` |
| direction | 轮播方向，可选值为 `horizontal`、`vertical` | `DirectionType` | `horizontal` |
| min-show-num | 小于该数量时不显示导航器 | `number` | `2` |
| indicator-position | 指示器位置，可选值为 `left`、`top-left`、`top`、`top-right`、`bottom-left`、`bottom`、`bottom-right`、`right` | `IndicatorPositionType` | `bottom` |
| show-controls | 是否显示两侧控制按钮 | `boolean` | `false` |
| total | 轮播项总数 | `number` | `0` |
| type | 指示器类型，可选值为 `dots`、`dots-bar`、`fraction` | `SwiperIndicatorType` | `dots` |

---

---
url: 'https://v2.wot-ui.cn/component/switch.md'
---
# Switch 开关

用来打开或关闭选项。

## 组件类型

### 基本用法

`v-model` 为绑定值，默认为 boolean 类型。

```html
<wd-switch v-model="checked" />
```

```ts
const checked = ref<boolean>(true)
```

### 修改值

通过 `active-value` 属性修改开关打开时的值，`inactive-value` 属性修改开关关闭时的值。

```html
<wd-switch v-model="checked" active-value="沃特" inactive-value="商家后台" />
```

## 组件状态

### 加载状态

设置 `loading` 显示加载状态。

```html
<wd-switch v-model="checked" loading active-text="上班" inactive-text="下班" />
```

### 禁用状态

设置 `disabled` 禁用开关。

```html
<wd-switch v-model="checked" disabled />
```

## 组件样式

### 修改颜色

通过 `active-color` 属性修改开关打开时的颜色，`inactive-color` 属性修改开关关闭时的颜色。

```html
<wd-switch v-model="checked" active-color="#13ce66" inactive-color="#f00" />
```

### 文字描述

通过 `active-text` 和 `inactive-text` 设置开关内文案。

```html
<wd-switch v-model="checked" active-text="上班" inactive-text="下班" />
```

### 自定义显示图标

通过 `active-icon` 和 `inactive-icon` 自定义开关内部图标。

```html
<wd-switch v-model="checked" active-icon="check" inactive-icon="close" />
```

### 自定义动作图标

通过 `active-action-icon` 和 `inactive-action-icon` 自定义按钮图标。

```html
<wd-switch v-model="checked" active-action-icon="check" inactive-action-icon="close" />
```

### 形状

通过 `shape` 设置形状，可选值为 `round`、`square`。

```html
<wd-switch v-model="checked" shape="round" />
<wd-switch v-model="checked" shape="square" />
```

### 自定义大小

设置 `size` 修改开关大小。

```html
<wd-switch v-model="checked" size="24px" />
```

## 特殊样式

### 搭配表单使用

可以放入表单项中作为右侧操作控件。

```html
<wd-form-item title="搭配表单使用" center>
  <wd-switch v-model="checked" size="20" />
</wd-form-item>
```

### 修改前钩子

设置 `before-change` 属性，修改前钩子，接收目标 `value`，返回 `false` 表示不修改，支持返回 `Promise<boolean>`。

```html
<wd-switch v-model="checked" :before-change="beforeChange" @change="handleChange" />
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const message = useDialog()

const beforeChange = (value) => {
  return message.confirm('是否切换开关').then(() => true).catch(() => false)
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `boolean \| string \| number` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| inactive-action-icon | 非激活状态操作按钮图标 | `string` | - |
| active-action-icon | 激活状态操作按钮图标 | `string` | - |
| active-icon | 激活状态图标，设置后会忽略 `active-text` | `string` | - |
| inactive-icon | 非激活状态图标，设置后会忽略 `inactive-text` | `string` | - |
| class-prefix | 类名前缀，用于使用自定义图标，用法参考 Icon 组件 | `string` | `'wd-icon'` |
| inactive-action-css-icon | 非激活状态操作按钮 CSS 图标，用法参考 Icon 组件 | `boolean \| string` | `false` |
| active-action-css-icon | 激活状态操作按钮 CSS 图标，用法参考 Icon 组件 | `boolean \| string` | `false` |
| active-css-icon | 激活状态 CSS 图标，设置后将忽略 `active-text`，用法参考 Icon 组件 | `boolean \| string` | `false` |
| inactive-css-icon | 非激活状态 CSS 图标，设置后将忽略 `inactive-text`，用法参考 Icon 组件 | `boolean \| string` | `false` |
| active-text | 激活状态文本 | `string` | `''` |
| inactive-text | 非激活状态文本 | `string` | `''` |
| active-value | 激活值 | `boolean \| string \| number` | `true` |
| inactive-value | 非激活值 | `boolean \| string \| number` | `false` |
| active-color | 激活颜色 | `string` | - |
| inactive-color | 非激活颜色 | `string` | - |
| size | 开关大小 | `string \| number` | - |
| shape | 形状，可选值为 `round`、`square` | `SwitchShape` | `'round'` |
| loading | 是否显示加载中 | `boolean` | `false` |
| loading-props | 加载配置项 | `Partial<LoadingProps>` | - |
| before-change | 修改前钩子 | `SwitchBeforeChange` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值修改事件 | `{ value }` |

---

---
url: 'https://v2.wot-ui.cn/component/tabs.md'
---
# Tab 标签页

标签页组件，用于在不同内容区域之间进行切换。

## 组件类型

### 基本用法

`v-model` 可以使用数字下标，也可以使用字符串名称。

```html
<wd-tabs v-model="tab1" @change="handleChange">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ tab1 + 1 }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```ts
const tab1 = ref(0)

function handleChange(event) {
  console.log(event)
}
```

### name 匹配

为 `wd-tab` 设置 `name` 后，可通过字符串值匹配当前激活项。

```html
<wd-tabs v-model="tab">
  <wd-tab v-for="item in tabs" :key="item" :title="item" :name="item">
    <view class="content">内容{{ tab }}</view>
  </wd-tab>
</wd-tabs>
```

```ts
const tabs = ref(['this', 'is', 'a', 'individual', 'example'])
const tab = ref('a')
```

### 使用徽标

通过 `badge-props` 为标签添加徽标。

```html
<wd-tabs v-model="tabWithBadge">
  <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="item.title" :badge-props="item.badgeProps">
    <view class="content">{{ item.title }}徽标</view>
  </wd-tab>
</wd-tabs>
```

## 组件状态

### 粘性布局

设置 `sticky` 开启吸顶布局，可配合 `offset-top` 控制吸顶偏移量。

```html
<wd-tabs v-model="tab2" sticky>
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab2 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### 禁用 Tab

通过 `wd-tab` 的 `disabled` 属性禁用单个页签。

```html
<wd-tabs v-model="tab3">
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" :disabled="item === 1">
    <view class="content">内容{{ tab3 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

## 组件样式

### 底部条样式

通过 `line-theme` 调整底部条表现，支持 `normal`、`text`、`underline`、`dot`。

```html
<wd-tabs v-model="tabLineTheme.normal" line-theme="normal">
  <wd-tab v-for="item in 4" :key="item" :title="`normal ${item}`">
    <view class="content">内容{{ item }}</view>
  </wd-tab>
</wd-tabs>
```

## 特殊样式

### 点击事件

监听 `click` 获取当前点击的页签信息。

```html
<wd-tabs v-model="tab4" @click="handleClick" @change="handleChange">
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab4 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

```ts
function handleClick({ index, name }) {
  console.log(index, name)
}
```

### 切换动画

设置 `animated` 开启内容切换动画。

```html
<wd-tabs v-model="tab8" animated>
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab8 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### 手势滑动

设置 `swipeable` 开启手势滑动，常与 `animated` 组合使用。

```html
<wd-tabs v-model="tab5" swipeable animated>
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab5 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### 超出滚动与导航地图

标签数量超过 `slidable-num` 后可滑动，超过 `map-num` 后会显示导航地图；将 `slidable` 设为 `always` 时可始终左对齐滚动。

```html
<wd-tabs v-model="tab6">
  <wd-tab v-for="item in 7" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab6 + 1 }}</view>
  </wd-tab>
</wd-tabs>

<wd-tabs v-model="tab9" slidable="always">
  <wd-tab v-for="item in 5" :key="item" :title="`超大标签${item}`">
    <view class="content">内容{{ tab9 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### 在弹出框中使用

在微信小程序等场景中，弹出层打开后可调用 `updateLineStyle` 更新激活项样式。

::: code-group

```html [vue]
<wd-button @click="handleOpenClick">打开弹窗</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable>
  <wd-tabs v-model="tab10" ref="tabsRef">
    <wd-tab v-for="item in tabs" :key="item" :title="item" :name="item">
      <view class="content">内容{{ tab10 }}</view>
    </wd-tab>
  </wd-tabs>
</wd-popup>
```

```ts [ts]
import type { TabsInstance } from '@/uni_modules/wot-ui/components/wd-tabs/types'

const showPopup = ref(false)
const tabsRef = ref<TabsInstance>()

function handleOpenClick() {
  showPopup.value = true
}

function handlePopupShow() {
  tabsRef.value?.updateLineStyle(false)
}
```

:::

## Tabs Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前激活项，可为索引或名称 | `number | string` | `0` |
| slidable-num | 自动开启滚动的标签数量阈值 | `number` | `6` |
| map-num | 显示导航地图的标签数量阈值 | `number` | `10` |
| map-title | 导航地图标题 | `string` | - |
| sticky | 是否开启粘性布局 | `boolean` | `false` |
| offset-top | 吸顶偏移量 | `number` | `0` |
| swipeable | 是否开启手势滑动 | `boolean` | `false` |
| line-theme | 底部条样式，可选值为 `normal`、`text`、`underline`、`dot` | `TabsLineTheme` | `normal` |
| line-width | 底部条宽度 | `number | string` | - |
| line-height | 底部条高度 | `number | string` | - |
| color | 激活项文字颜色 | `string` | `''` |
| inactive-color | 非激活项文字颜色 | `string` | `''` |
| animated | 是否开启切换动画 | `boolean` | `false` |
| duration | 动画时长，单位毫秒 | `number` | `300` |
| slidable | 是否开启滚动导航，可选值为 `auto`、`always` | `TabsSlidable` | `auto` |
| show-scrollbar | 滚动时是否显示滚动条 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Tabs Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 激活项变化时触发 | `{ index, name }` |
| click | 点击页签标题时触发 | `{ index, name }` |
| disabled | 点击禁用页签时触发 | `{ index, name }` |
| update:modelValue | 激活项变化时触发 | `number | string` |

## Tabs Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| setActive | 设置激活项 | `(value: number \| string, init: boolean, setScroll: boolean)` | - |
| scrollIntoView | 使选中项滚动到可视区域 | - | - |
| updateLineStyle | 更新激活项底部条样式 | `(animation?: boolean)` | - |

## Tabs Slots

| 名称 | 说明 |
| --- | --- |
| default | Tab 内容 |

## Tab Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标签唯一标识，默认取索引 | `number | string` | - |
| title | 标签标题 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| lazy | 是否懒加载内容 | `boolean` | `true` |
| badge-props | 徽标属性，透传给 Badge 组件 | `Partial<BadgeProps>` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Tab Slots

| 名称 | 说明 |
| --- | --- |
| default | 页签内容 |

---

---
url: 'https://v2.wot-ui.cn/component/tabbar.md'
---
# Tabbar 标签栏

底部导航栏，用于在不同页面之间进行切换。

## 组件类型

### 基础用法

`v-model` 为绑定值，表示选中标签的索引值或者名称。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

### 通过名称匹配

通过设置 `name` 属性，可以通过名称匹配选中标签。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item name="home" title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item name="cart" title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item name="setting" title="设置" icon="setting"></wd-tabbar-item>
  <wd-tabbar-item name="user" title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref('home')
```

## 组件状态

### 徽标提示

通过设置 `value` 属性，可以显示徽标提示，而设置 is-dot 属性后，会在图标右上角展示一个小红点。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item is-dot :value="2" title="点状" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="最大值" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## 组件变体

### 悬浮标签栏

通过设置 `shape` 属性为 `round`，可以将标签栏设置为悬浮样式。

```html
<wd-tabbar shape="round" v-model="tabbar">
  <wd-tabbar-item title="首页" is-dot :value="2" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" :value="2" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="相册" :value="30" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="我的" :value="200" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## 组件样式

### 自定义图标

通过使用 `<template #icon>` 可以自定义标签页的图标。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item :value="2" title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类">
    <template #icon>
      <wd-img round height="40rpx" width="40rpx" src="https://wot-ui.cn/assets/panda.jpg"></wd-img>
    </template>
  </wd-tabbar-item>
  <wd-tabbar-item :value="3" title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

### 自定义颜色

通过设置 `active-color` 和 `inactive-color` 属性，可以自定义激活和未激活标签的颜色。

```html
<wd-tabbar v-model="tabbar" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item is-dot :value="2" title="点状" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="最大值" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## 特殊样式

### 监听切换事件

通过监听 `change` 事件，可以获取选中标签的值。

```html
<wd-tabbar v-model="tabbar" @change="handleChange" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item title="相册" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)

function handleChange({ value }: { value: string }) {
  show(`选中标签:${value}`)
}
```

### 默认插槽

可以通过 `wd-tabbar-item` 的默认插槽自定义中间按钮等特殊内容。

```html
<wd-tabbar v-model="tabbar" safeAreaInsetBottom placeholder>
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="store"></wd-tabbar-item>
  <wd-tabbar-item>
    <view class="custom-raised-button">
      <wd-icon name="plus" size="32px"></wd-icon>
    </view>
  </wd-tabbar-item>
  <wd-tabbar-item title="相册" icon="image"></wd-tabbar-item>
  <wd-tabbar-item title="客服" icon="message"></wd-tabbar-item>
</wd-tabbar>
```

### 切换前拦截

通过 `before-change` 可在切换前做同步或异步确认。

```html
<wd-tabbar v-model="tabbar" :before-change="beforeChange">
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="store"></wd-tabbar-item>
</wd-tabbar>
```

```ts
function beforeChange(value) {
  return Promise.resolve(true)
}
```

### 固定底部

通过设置 `fixed` 属性，可以将标签栏固定在底部；通过设置 `placeholder` 属性，可以在固定在底部时在标签位置生成一个等高的占位元素。

```html
<wd-tabbar fixed v-model="tabbar" bordered safeAreaInsetBottom placeholder>
  <wd-tabbar-item :value="2" is-dot title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="相册" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```

```ts
import { ref } from 'vue'

const tabbar = ref(1)
```

## Tabbar Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中标签的索引值或者名称 | `number \| string` | `0` |
| fixed | 是否固定在底部 | `boolean` | `false` |
| bordered | 是否显示顶部边框 | `boolean` | `false` |
| safe-area-inset-bottom | 是否设置底部安全区 | `boolean` | `false` |
| shape | 标签栏形状，可选值为 `default`、`round` | `TabbarShape` | `'default'` |
| active-color | 激活标签颜色 | `string` | - |
| inactive-color | 未激活标签颜色 | `string` | - |
| placeholder | 固定在底部时，是否生成等高占位元素 | `boolean` | `false` |
| z-index | 组件层级 | `number` | `10` |
| before-change | 切换前的回调函数，返回 `false` 可阻止切换，支持返回 `Promise<boolean>` | `TabbarBeforeChange` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 标签切换时触发 | `{ value }` |

## Tabbar Slots

| name | 说明 |
| --- | --- |
| default | TabbarItem 列表 |

## Tabbar 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |

## TabbarItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标签页标题 | `string` | - |
| name | 唯一标识符，不传时默认使用索引值 | `string \| number` | - |
| icon | 图标名称 | `string` | - |
| value | 徽标显示值 | `number \| string` | - |
| is-dot | 是否显示点状徽标 | `boolean` | `false` |
| max | 徽标最大值 | `number` | `99` |
| badge-props | 自定义徽标属性，会透传给 Badge 组件 | `BadgeProps` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## TabbarItem Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义整个标签项内容 | - |
| icon | 自定义图标 | `{ active }` |

---

---
url: 'https://v2.wot-ui.cn/component/table.md'
---
# Table 表格

用于展示多条结构类似的数据，支持固定列、排序、合并单元格与虚拟滚动等能力。

## 组件类型

### 基本用法

通过 `data` 传入表格数据，通过多个 `wd-table-column` 定义列结构。`sort-method` 事件在点击可排序列表头时触发，`row-click` 事件在点击行时触发。

::: code-group

```html [template]
<wd-table :data="dataList" :height="400" @sort-method="handleSort" @row-click="handleRowClick">
  <wd-table-column prop="name" label="姓名" align="center" width="50%"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center" width="50%"></wd-table-column>
</wd-table>
```

```ts [script]
import type { TableColumn } from '@/uni_modules/wot-ui/components/wd-table-column/types'
import { ref } from 'vue'

interface TableData {
  name: string
  school: string
  major: string
  gender: string
  graduation: string
  grade: number
  compare: string
  hobby: string
}

const dataList = ref<TableData[]>([
  {
    name: '关羽',
    school: '武汉市阳逻绿豆学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 66,
    compare: '48%',
    hobby: '颜良文丑，以吾观之，如土鸡瓦犬耳。'
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 68,
    compare: '21%',
    hobby: '我得孔明，如鱼得水也'
  }
])

function handleSort(column: TableColumn) {
  dataList.value = dataList.value.reverse()
}

function handleRowClick({ rowIndex }: { rowIndex: number }) {
  console.log(rowIndex)
}
```

:::

### 固定列

通过 `wd-table-column` 的 `fixed` 属性固定列。固定列仅支持固定在左侧，**固定列的书写顺序需要与最终展示顺序一致**。

```html
<wd-table :data="dataList" :height="400" @sort-method="handleSort" @row-click="handleRowClick">
  <wd-table-column prop="name" label="姓名" fixed sortable align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" fixed sortable align="center"></wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" sortable :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
</wd-table>
```

### 显示索引

通过 `index` 开启序号列。传入对象时，可配置索引列的宽度、对齐方式等属性（`prop` 除外的所有 `TableColumn` 属性）。

```html
<wd-table :data="dataList" :height="400" :index="{ align: 'center' }" @sort-method="handleSort">
  <wd-table-column prop="name" label="姓名" sortable align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" sortable align="center"></wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" sortable :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
</wd-table>
```

### 自定义列模板

`wd-table-column` 提供 `value` 作用域插槽，插槽参数为 `{ row, index }`，可拿到当前行数据与行索引，自定义单元格内容。

```html
<wd-table :data="dataList" :height="400" @sort-method="handleSort" @row-click="handleRowClick">
  <wd-table-column prop="name" label="姓名" fixed sortable align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" fixed sortable align="center">
    <template #value="{ row }">
      <view>
        <text>{{ row.grade }}</text>
        <text>同比{{ row.compare }}</text>
      </view>
    </template>
  </wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" sortable :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
  <wd-table-column prop="graduation" label="学成时间"></wd-table-column>
</wd-table>
```

### 合并单元格

通过 `span-method` 控制单元格跨行跨列。回调接收 `{ row, column, rowIndex, columnIndex }` 四个参数，返回 `{ rowspan, colspan }` 或 `void`（等同 `{ rowspan: 1, colspan: 1 }`）。`rowspan`/`colspan` 为 `0` 表示该单元格被合并隐藏。

::: code-group

```html [template]
<wd-table :data="spanData" :span-method="handleSpan" :height="400">
  <wd-table-column prop="name" label="姓名" align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center"></wd-table-column>
  <wd-table-column prop="school" label="求学之所"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
</wd-table>
```

```ts [script]
import type { SpanMethodParams } from '@/uni_modules/wot-ui/components/wd-table/types'
import { computed } from 'vue'

const spanData = computed(() => dataList.value.slice(0, 5))

function handleSpan({ rowIndex, columnIndex }: SpanMethodParams) {
  if (rowIndex === 0 && columnIndex === 0) {
    return { rowspan: 1, colspan: 2 }
  }
  if (rowIndex === 0 && columnIndex === 1) {
    return { rowspan: 0, colspan: 0 }
  }
  if (rowIndex === 2 && columnIndex === 0) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 3 && columnIndex === 0) {
    return { rowspan: 0, colspan: 0 }
  }
}
```

:::

### 合并自定义列

`span-method` 可以与 `value` 插槽组合使用，对自定义渲染的列同样生效。

::: code-group

```html [template]
<wd-table :data="spanData" :span-method="handleCustomSpan" :height="400">
  <wd-table-column prop="name" label="姓名" fixed sortable align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center">
    <template #value="{ row }">
      <view>
        <text>{{ row.grade }}</text>
        <text>同比{{ row.compare }}</text>
      </view>
    </template>
  </wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
</wd-table>
```

```ts [script]
function handleCustomSpan({ rowIndex, columnIndex }: SpanMethodParams) {
  if (rowIndex === 0 && columnIndex === 0) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 1 && columnIndex === 0) {
    return { rowspan: 0, colspan: 0 }
  }
  if (rowIndex === 3 && columnIndex === 2) {
    return { rowspan: 1, colspan: 2 }
  }
  if (rowIndex === 3 && columnIndex === 3) {
    return { rowspan: 0, colspan: 0 }
  }
}
```

:::

### 固定列合并

固定列场景下同样支持单元格合并，`span-method` 与 `fixed` 可同时使用。

::: code-group

```html [template]
<wd-table :data="spanData" :span-method="handleFixedSpan" :height="400">
  <wd-table-column prop="name" label="姓名" fixed align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center"></wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
</wd-table>
```

```ts [script]
function handleFixedSpan({ rowIndex, columnIndex }: SpanMethodParams) {
  if (rowIndex === 1 && columnIndex === 1) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 2 && columnIndex === 1) {
    return { rowspan: 0, colspan: 0 }
  }
  if (rowIndex === 3 && columnIndex === 3) {
    return { rowspan: 1, colspan: 2 }
  }
  if (rowIndex === 3 && columnIndex === 4) {
    return { rowspan: 0, colspan: 0 }
  }
}
```

:::

### 固定表头合并

设置 `height` 后表头默认固定（`fixed-header` 默认为 `true`），此时仍可通过 `span-method` 合并表体单元格。

::: code-group

```html [template]
<wd-table :data="dataList" :span-method="handleHeaderSpan" :height="300">
  <wd-table-column prop="name" label="姓名" align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center"></wd-table-column>
  <wd-table-column prop="school" label="求学之所"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
</wd-table>
```

```ts [script]
function handleHeaderSpan({ rowIndex, columnIndex }: SpanMethodParams) {
  if (rowIndex === 0 && columnIndex === 2) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 1 && columnIndex === 2) {
    return { rowspan: 0, colspan: 0 }
  }
  if (rowIndex === 4 && columnIndex === 3) {
    return { rowspan: 2, colspan: 1 }
  }
  if (rowIndex === 5 && columnIndex === 3) {
    return { rowspan: 0, colspan: 0 }
  }
}
```

:::

### 虚拟滚动

大数据量场景可开启 `virtual`，通过 `row-height` 指定固定行高（必填），`buffer` 控制可视区域上下额外预渲染行数。

::: code-group

```html [template]
<wd-table :data="virtualData" :height="400" virtual :row-height="50">
  <wd-table-column prop="index" label="序号" width="80" align="center"></wd-table-column>
  <wd-table-column prop="name" label="姓名" width="120" align="center"></wd-table-column>
  <wd-table-column prop="score" label="分数" width="100" align="center"></wd-table-column>
  <wd-table-column prop="remark" label="备注" width="200"></wd-table-column>
</wd-table>
```

```ts [script]
const virtualData = Array.from({ length: 10000 }, (_, index) => ({
  index: index + 1,
  name: `蜀兵${index + 1}号`,
  score: Math.floor(Math.random() * 100),
  remark: `这是蜀兵${index + 1}号的备注信息`
}))
```

:::

## 组件状态

### 无边框

设置 `border` 为 `false` 可隐藏单元格边框。

```html
<wd-table :data="dataList" :height="400" :border="false">
  <wd-table-column prop="name" label="姓名" align="center" width="50%"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center" width="50%"></wd-table-column>
</wd-table>
```

### 无斑马纹

设置 `stripe` 为 `false` 可关闭奇偶行区分背景。

```html
<wd-table :data="dataList" :height="400" :stripe="false">
  <wd-table-column prop="name" label="姓名" align="center" width="50%"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center" width="50%"></wd-table-column>
</wd-table>
```

### 不显示表头

设置 `show-header` 为 `false` 可隐藏表头区域。

```html
<wd-table :data="dataList" :height="400" :show-header="false">
  <wd-table-column prop="name" label="姓名" align="center" width="50%"></wd-table-column>
  <wd-table-column prop="grade" label="分数" align="center" width="50%"></wd-table-column>
</wd-table>
```

## 特殊样式

### 不固定表头结合分页器

将 `fixed-header` 设为 `false` 后，表头随表体一起滚动，可将表格与分页器组合展示。

::: code-group

```html [template]
<wd-table :data="paginationData" :fixed-header="false">
  <wd-table-column prop="name" label="姓名" fixed align="center"></wd-table-column>
  <wd-table-column prop="grade" label="分数" fixed align="center"></wd-table-column>
  <wd-table-column prop="hobby" label="一言一笔之" :width="160"></wd-table-column>
  <wd-table-column prop="school" label="求学之所" :width="180"></wd-table-column>
  <wd-table-column prop="major" label="专业"></wd-table-column>
  <wd-table-column prop="gender" label="性别"></wd-table-column>
</wd-table>
<wd-pagination v-model="page" :total="total"></wd-pagination>
```

```ts [script]
import { computed, ref } from 'vue'

const page = ref(1)
const pageSize = ref(10)
const total = ref(dataList.value.length)

const paginationData = computed(() => {
  return dataList.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
})
```

:::

## Table Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据源（必填） | Record\<string, any>\[] | - |
| border | 是否显示边框 | `boolean` | `true` |
| stripe | 是否显示斑马纹 | `boolean` | `true` |
| height | 表格最大高度，设置后可纵向滚动；开启虚拟滚动时必须传入数值类型 | string | number | - |
| show-header | 是否显示表头 | `boolean` | `true` |
| ellipsis | 单元格文本是否超出两行后省略 | `boolean` | `false` |
| index | 是否显示索引列，传入对象时可自定义索引列配置（`prop` 除外） | boolean | Omit\<Partial\<TableColumnProps>, 'prop'> | `false` |
| fixed-header | 是否固定表头（使用 CSS sticky 定位） | `boolean` | `true` |
| span-method | 合并单元格方法，回调参数为 `SpanMethodParams`，返回 `{ rowspan, colspan }` 或 `void`（等同 `{ rowspan: 1, colspan: 1 }`） | `SpanMethod` | - |
| virtual | 是否开启虚拟滚动，大数据量时只渲染可视区域行 | `boolean` | `false` |
| row-height | 虚拟滚动固定行高，开启 `virtual` 时必须传入 | `number` | `44` |
| buffer | 虚拟滚动可视区域上下各额外预渲染行数 | `number` | `5` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Table Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| sort-method | 点击可排序列表头后触发 | `column: TableColumn` |
| row-click | 点击表格行时触发 | `{ rowIndex: number }` |

## Table Slots

| 名称 | 说明 |
| --- | --- |
| default | 表格列内容，通常放置一个或多个 `wd-table-column` |

## TableColumn Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 列对应的数据字段名（必填） | `string` | - |
| label | 列标题（必填） | `string` | - |
| width | 列宽度 | string | number | `100` |
| sortable | 是否开启排序 | `boolean` | `false` |
| fixed | 是否固定当前列，仅支持固定在左侧 | `boolean` | `false` |
| align | 内容对齐方式，可选值为 `left`、`center`、`right` | `AlignType` | `left` |

## TableColumn Slots

| 名称 | 说明 |
| --- | --- |
| value | 自定义单元格内容，插槽参数为 `{ row: Record<string, any>, index: number }` |

## 类型定义

```ts
import type { SpanMethodParams, SpanMethodResult, SpanMethod } from '@/uni_modules/wot-ui/components/wd-table/types'
import type { TableColumn, AlignType } from '@/uni_modules/wot-ui/components/wd-table-column/types'

/** span-method 回调参数 */
interface SpanMethodParams {
  /** 当前行的数据对象 */
  row: Record<string, any>
  /** 当前列的配置 */
  column: { prop: string; label: string }
  /** 当前行索引，从 0 开始 */
  rowIndex: number
  /** 当前列索引，从 0 开始 */
  columnIndex: number
}

/** span-method 返回值 */
interface SpanMethodResult {
  /** 合并行数，0 表示该单元格被隐藏，大于 1 表示向下合并 N 行 */
  rowspan: number
  /** 合并列数，0 表示该单元格被隐藏，大于 1 表示向右合并 N 列 */
  colspan: number
}

type SpanMethod = (params: SpanMethodParams) => SpanMethodResult | void
```

---

---
url: 'https://v2.wot-ui.cn/component/tag.md'
---
# Tag 标签

用于标记状态或者概括主要内容。

## 组件类型

### 基本用法

通过 `type` 设置不同标签类型。

```html
<wd-tag>标签</wd-tag>
<wd-tag type="primary">常用标签</wd-tag>
<wd-tag type="danger">危险标签</wd-tag>
<wd-tag type="warning">警告标签</wd-tag>
<wd-tag type="success">成功标签</wd-tag>
```

## 组件变体

### 标签尺寸

通过 `size` 设置标签尺寸，支持 `small`、`medium`、`default`、`large`、`extra-large`。

```html
<wd-tag type="primary" size="small">小标签</wd-tag>
<wd-tag type="primary" size="medium">中标签</wd-tag>
<wd-tag type="primary">默认标签</wd-tag>
<wd-tag type="primary" size="large">较大标签</wd-tag>
<wd-tag type="primary" size="extra-large">特大标签</wd-tag>
```

### 浅色标签

设置 `variant="light"` 展示浅色标签。

```html
<wd-tag variant="light">标签</wd-tag>
<wd-tag type="primary" variant="light">常用标签</wd-tag>
<wd-tag type="danger" variant="light">危险标签</wd-tag>
```

### 镂空标签

设置 `variant="plain"` 展示镂空样式。

```html
<wd-tag variant="plain">标签</wd-tag>
<wd-tag type="primary" variant="plain">常用标签</wd-tag>
```

### 虚线标签

设置 `variant="dashed"` 展示虚线边框。

```html
<wd-tag variant="dashed">标签</wd-tag>
<wd-tag type="warning" variant="dashed">警告标签</wd-tag>
```

### 纯文本标签

设置 `variant="text"` 展示纯文本样式。

```html
<wd-tag variant="text">标签</wd-tag>
<wd-tag type="success" variant="text">成功标签</wd-tag>
```

## 组件样式

### 标记标签

设置 `mark` 生成标记样式。

```html
<wd-tag mark>标签</wd-tag>
<wd-tag type="primary" mark>常用标签</wd-tag>
```

### 幽灵标记标签

组合 `mark` 和 `variant="plain"` 展示幽灵标记样式。

```html
<wd-tag mark variant="plain">标签</wd-tag>
<wd-tag type="success" mark variant="plain">成功标签</wd-tag>
```

### 圆角标签

设置 `round` 生成圆角样式。

```html
<wd-tag round>标签</wd-tag>
<wd-tag type="primary" round>常用标签</wd-tag>
```

### 设置图标

可通过 `icon` 属性或 `icon` 插槽自定义左侧图标。

```html
<wd-tag icon="clock-circle" type="primary" mark>标签</wd-tag>

<wd-tag type="primary" mark>
  <text>插槽</text>
  <template #icon>
    <wd-icon name="thunderbolt" />
  </template>
</wd-tag>
```

### 自定义颜色

通过 `color` 设置文字颜色，通过 `bg-color` 设置背景色和边框色。

```html
<wd-tag color="#0083ff" bg-color="#d0e8ff">标签</wd-tag>
<wd-tag color="#FAA21E" bg-color="#FAA21E" variant="plain">标签</wd-tag>
```

## 特殊样式

### 可关闭

设置 `closable` 后，点击关闭按钮会触发 `close` 事件。

```html
<wd-tag v-for="(tag, index) in closableStrongTags" :key="index" :type="tag.type" closable @close="handleCloseStrongTag(index)">
  {{ tag.value }}
</wd-tag>
```

```ts
const closableStrongTags = ref([
  { type: 'default', value: '标签' },
  { type: 'primary', value: '常用' }
])

function handleCloseStrongTag(order: number) {
  closableStrongTags.value = closableStrongTags.value.filter((_, index) => index !== order)
}
```

### 新增标签

设置 `dynamic` 生成新增标签样式，输入确认后触发 `confirm` 事件；可通过 `add` 插槽自定义新增按钮内容。

::: code-group

```html [vue]
<wd-tag v-for="(tag, index) in dynamicTags" :key="index" type="primary" closable @close="handleClose1(index)">
  {{ tag }}
</wd-tag>
<wd-tag type="primary" dynamic @confirm="handleConfirm"></wd-tag>
<wd-tag type="primary" dynamic @confirm="handleConfirm">
  <template #add>
    <wd-icon name="pushpin" size="12px"></wd-icon>
    <text style="margin-left: 4px">自定义</text>
  </template>
</wd-tag>
```

```ts [ts]
const dynamicTags = ref(['标签一', '标签二'])

function handleClose1(order: number) {
  dynamicTags.value = dynamicTags.value.filter((item, index) => index !== order)
}

function handleConfirm({ value }: { value: string }) {
  if (!value) return
  dynamicTags.value = [...dynamicTags.value, value]
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 标签尺寸，可选值为 `small`、`medium`、`large`、`extra-large`、`default` | `TagSize` | `default` |
| type | 标签类型，可选值为 `default`、`primary`、`success`、`warning`、`danger`、`volcano`、`lightblue`、`cyan`、`pink`、`purple` | `TagType` | `default` |
| icon | 左侧图标 | `string` | `''` |
| closable | 是否可关闭 | `boolean` | `false` |
| dynamic | 是否为新增标签 | `boolean` | `false` |
| color | 文字颜色 | `string` | `''` |
| bg-color | 背景色和边框色 | `string` | `''` |
| round | 是否圆角 | `boolean` | `false` |
| mark | 是否标记样式 | `boolean` | `false` |
| variant | 标签变体，可选值为 `light`、`dark`、`plain`、`dashed`、`text` | `TagVariant` | `dark` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击标签时触发 | `MouseEvent` |
| close | 点击关闭按钮时触发 | `MouseEvent` |
| confirm | 新增标签输入确认后触发 | `{ value: string }` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 标签内容 |
| icon | 自定义图标 |
| add | 自定义新增标签内容，`dynamic` 为 `true` 时生效 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点内联样式 |

---

---
url: 'https://v2.wot-ui.cn/component/text.md'
---
# Text 文本

文本组件，用于展示文本信息。

## 组件类型

### 基本用法

通过 `text` 传入文本内容。

```html
<wd-text :text="text"></wd-text>
```

```ts
const text = ref('芦叶满汀洲，寒沙带浅流。二十年重过南楼。')
```

### 设置主题

通过 `type` 设置主题色，支持 `primary`、`error`、`success`、`warning`、`default`。

```html
<wd-text type="primary" text="主色"></wd-text>
<wd-text type="error" text="错误"></wd-text>
<wd-text type="success" text="成功"></wd-text>
<wd-text type="warning" text="警告"></wd-text>
<wd-text text="默认"></wd-text>
```

### 模式

通过 `mode` 对文本做格式化处理，支持 `text`、`date`、`phone`、`name`、`price`。

```html
<wd-text text="18888888888" mode="phone"></wd-text>
<wd-text text="王三" mode="name"></wd-text>
<wd-text text="1719976636911" mode="date"></wd-text>
```

### 金额

设置 `mode="price"` 可以展示金额格式化文本。

```html
<wd-text text="16354.156" mode="price" type="success" decoration="line-through" prefix="￥" />
```

## 组件样式

### 自定义字体颜色

通过 `color` 设置文字颜色。

```html
<wd-text :text="text" color="#36B8C2"></wd-text>
```

### 是否粗体

设置 `bold` 开启粗体。

```html
<wd-text :text="text" bold></wd-text>
```

### 字体大小

通过 `size` 设置字体大小。

```html
<wd-text :text="text" size="16px"></wd-text>
```

### lines

设置 `lines` 限制显示行数，超出后显示省略号。

```html
<wd-text :text="text" :lines="2" size="16px"></wd-text>
```

### lineHeight

通过 `lineHeight` 设置行高。

```html
<wd-text :text="text" :lines="2" lineHeight="20px"></wd-text>
```

### 文字装饰

通过 `decoration` 设置文字装饰线。

```html
<wd-text :text="text" type="warning" decoration="underline" />
```

## 特殊样式

### 脱敏

设置 `format` 后，在 `mode` 为 `phone` 或 `name` 时会进行脱敏展示。

```html
<wd-text text="张长三" mode="name" :format="true"></wd-text>
<wd-text text="18888888888" mode="phone" :format="true"></wd-text>
```

### 前后插槽

通过 `prefix`、`suffix` 属性或同名插槽扩展前后内容。

```html
<wd-text text="12345678901" mode="phone" format type="primary" prefix="Prefix" suffix="Suffix" />

<wd-text text="12345678901" mode="phone" format type="primary">
  <template #prefix>
    <text>Prefix</text>
  </template>
  <template #suffix>Suffix</template>
</wd-text>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 主题类型，可选值为 `default`、`primary`、`success`、`warning`、`error` | `TextType` | `default` |
| text | 文本内容 | `string | number` | `''` |
| size | 字体大小 | `string` | `''` |
| mode | 文本处理模式，可选值为 `text`、`date`、`phone`、`name`、`price` | `TextMode` | `text` |
| decoration | 文本装饰，可选值为 `none`、`underline`、`line-through`、`overline` | `TextDecoration` | `none` |
| call | `mode="phone"` 时点击文本是否拨号 | `boolean` | `false` |
| bold | 是否粗体 | `boolean` | `false` |
| format | 是否脱敏，仅在 `mode` 为 `phone` 和 `name` 时生效 | `boolean` | `false` |
| color | 文本颜色 | `string` | `''` |
| prefix | 前缀内容 | `string` | - |
| suffix | 后缀内容 | `string` | - |
| lines | 展示行数，超出后显示省略号 | `number` | - |
| line-height | 文本行高 | `string` | `''` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击文本时触发 | `Event` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 前缀内容 |
| suffix | 后缀内容 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点内联样式 |

---

---
url: 'https://v2.wot-ui.cn/component/textarea.md'
---
# Textarea 文本域

用于输入多行文本信息，支持清空、字数统计、高度自适应与紧凑布局。

## 组件类型

### 基本用法

通过 `v-model` 绑定文本域内容，通过 `placeholder` 设置占位提示。

```html
<wd-textarea v-model="value" placeholder="请填写评价" />
```

```typescript
import { ref } from 'vue'

const value = ref('')
```

## 组件状态

### 只读

通过 `readonly` 设置文本域为只读状态。

```html
<wd-textarea v-model="value" readonly clearable />
```

### 禁用

通过 `disabled` 禁用文本域。

```html
<wd-textarea v-model="value" disabled clearable />
```

## 组件变体

### 清空按钮与字数限制

通过 `clearable` 开启清空按钮，通过 `maxlength` 与 `show-word-limit` 展示字数统计。

```html
<wd-textarea v-model="value" :maxlength="120" clearable show-word-limit />
```

### 聚焦时显示清空按钮

通过 `clear-trigger="focus"` 控制仅在聚焦且有值时显示清空按钮。

:::warning 注意
支付宝小程序暂不支持 `clear-trigger`，且某些场景下清空按钮无法点击，可参考 [issue](https://github.com/ant-design/ant-design-mini/issues/1255)。
:::

```html
<wd-textarea v-model="value" clear-trigger="focus" :maxlength="120" clearable show-word-limit />
```

### 清空后不自动聚焦

通过 `focus-when-clear` 控制点击清空按钮后是否自动聚焦。

```html
<wd-textarea v-model="value" :focus-when-clear="false" :maxlength="120" clearable show-word-limit />
```

### 高度自适应

通过 `auto-height` 让文本域高度随内容变化。

```html
<wd-textarea v-model="value" auto-height clearable />
```

## 组件样式

### 紧凑布局

设置 `compact` 后会移除默认内边距和背景，适合与 `wd-form-item` 等容器配合使用。

```html
<wd-textarea v-model="value" compact placeholder="请填写评价" />
```

## 特殊样式

### 结合表单使用

当前表单场景推荐由 `wd-form` 与 `wd-form-item` 承载标题、必填态与校验提示，`wd-textarea` 仅负责多行输入能力。

```html
<wd-form :model="formData" border title-width="98px">
  <wd-form-item title="基本用法" prop="basic">
    <wd-textarea v-model="formData.basic" placeholder="请输入" compact />
  </wd-form-item>

  <wd-form-item title="字数限制" prop="limit">
    <wd-textarea v-model="formData.limit" :maxlength="240" show-word-limit clearable compact placeholder="请输入" />
  </wd-form-item>

  <wd-form-item title="只读" prop="readonly">
    <wd-textarea v-model="formData.readonly" readonly :maxlength="240" show-word-limit placeholder="请输入" compact />
  </wd-form-item>
</wd-form>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 文本域绑定值 | `string \| number` | `''` |
| placeholder | 占位文本 | `string` | `请输入...` |
| placeholder-style | placeholder 样式 | `string` | - |
| placeholder-class | placeholder 样式类 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| maxlength | 最大输入长度，设置为 `-1` 时不限制长度 | `number` | `-1` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| show-word-limit | 是否显示字数统计，需要同时设置 `maxlength` | `boolean` | `false` |
| clear-trigger | 清空按钮显示时机，可选值为 `focus`、`always` | `InputClearTrigger` | `always` |
| focus-when-clear | 点击清空按钮后是否自动聚焦 | `boolean` | `true` |
| error | 是否展示错误状态 | `boolean` | `false` |
| focus | 是否获取焦点 | `boolean` | `false` |
| auto-focus | 是否自动聚焦并拉起键盘 | `boolean` | `false` |
| auto-height | 是否自动增高输入框高度 | `boolean` | `false` |
| fixed | 在 `position: fixed` 区域时是否启用固定模式 | `boolean` | `false` |
| cursor-spacing | 光标与键盘的距离 | `number` | `0` |
| cursor | 获取焦点时的光标位置 | `number` | `-1` |
| confirm-type | 键盘右下角按钮文字，可选值为 `done`、`go`、`next`、`search`、`send` | `ConfirmType` | - |
| confirm-hold | 点击键盘右下角按钮时是否保持键盘不收起 | `boolean` | `false` |
| show-confirm-bar | 是否显示键盘上方带有“完成”按钮的工具栏 | `boolean` | `true` |
| selection-start | 光标起始位置，需与 `selection-end` 搭配使用 | `number` | `-1` |
| selection-end | 光标结束位置，需与 `selection-start` 搭配使用 | `number` | `-1` |
| adjust-position | 键盘弹起时是否自动上推页面 | `boolean` | `true` |
| disable-default-padding | 是否去掉 iOS 下默认内边距 | `boolean` | `false` |
| hold-keyboard | 聚焦时点击页面是否保持键盘不收起 | `boolean` | `false` |
| ignore-composition-event | 是否忽略文本合成系统事件处理；为 `false` 时会触发 composition 相关事件，且在合成期间会触发 `input` | `boolean` | `true` |
| inputmode | 输入模式提示，可选值为 `none`、`text`、`decimal`、`numeric`、`tel`、`search`、`email`、`url` | `InputMode` | `text` |
| enable-native | 支付宝小程序下是否启用原生输入框，设为 `false` 可避免弹起键盘后内容上移 | `boolean` | `true` |
| compact | 是否开启紧凑模式；未显式设置时，在 `wd-form-item` 中会自动启用 | `boolean` | - |
| custom-textarea-class | textarea 自定义类名 | `string` | `''` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

### InputMode 可选值

`inputmode` 为 HTML 规范后期扩展能力，在符合条件的高版本 WebView 中可用于 uni-app 的 Web 与 App-Vue 平台，详见 [inputmode](https://uniapp.dcloud.net.cn/component/input.html#inputmode)。

| 值 | 说明 |
| --- | --- |
| none | 不弹出虚拟键盘 |
| text | 标准文本输入键盘 |
| decimal | 小数输入键盘 |
| numeric | 纯数字输入键盘 |
| tel | 电话输入键盘 |
| search | 搜索输入优化键盘 |
| email | 邮箱输入优化键盘 |
| url | URL 输入优化键盘 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| input | 输入时触发 | `{ value, cursor, keyCode }` |
| focus | 聚焦时触发 | `{ value, height }` |
| blur | 失焦时触发 | `{ value, cursor }` |
| clear | 点击清空按钮时触发 | - |
| linechange | 行数变化时触发 | `{ height, heightRpx, lineCount }` |
| confirm | 点击键盘完成按钮时触发 | `{ value }` |
| keyboardheightchange | 键盘高度变化时触发 | `{ height, duration }` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-textarea-class | textarea 样式类 |

---

---
url: 'https://v2.wot-ui.cn/component/toast.md'
---
# Toast 轻提示

轻提示组件，用于消息通知、加载提示和操作结果反馈，支持组件挂载点配合 `useToast()` 进行函数式调用。

::: tip 提示
`Toast` 自 `1.7.0` 起支持通过组件 `props` 控制默认样式。函数式调用时，传入的 `options` 优先级高于组件 `props`。

全局调用方案可参考 [wot-starter](https://starter.wot-ui.cn/guide/feedback.html)，适合在路由守卫或请求拦截器中使用。
:::

## 组件类型

### 基本用法

需要先在页面中放置一个 `wd-toast` 作为挂载点，再通过 `useToast()` 调用提示。

::: code-group

```html [vue]
<wd-toast />
<wd-button @click="showToast">toast</wd-button>
```

```ts [ts]
import { useToast } from '@/uni_modules/wot-ui'

const toast = useToast()

function showToast() {
  toast.show('提示信息')
}
```

:::

### 类型提示

支持成功、错误、警告和常规四种快捷提示。

```ts
toast.success('操作成功')
toast.error('手机验证码输入错误，请重新输入')
toast.warning('提示信息')
toast.info('常规提示信息')
```

## 组件状态

### 加载提示

`loading()` 默认不会自动关闭，适合等待异步请求完成后手动调用 `close()`。

```ts
toast.loading('3s后自动关闭')

setTimeout(() => {
  toast.close()
}, 3000)
```

### 加载类型

通过 `loadingType` 可切换不同加载样式，支持 `circular`、`spinner`、`dots`。

```ts
toast.loading({
  msg: '3s后自动关闭',
  loadingType: 'spinner',
  loadingColor: '#fff'
})
```

## 组件样式

### 使用图标

可以通过 `iconClass` 使用组件库内置图标，也可以配合 `classPrefix` 使用自定义图标。

::: code-group

```ts [内置图标]
toast.show({
  iconClass: 'star',
  msg: '使用组件库内部图标'
})
```

```ts [自定义图标]
toast.show({
  iconClass: 'kehuishouwu',
  classPrefix: 'fish',
  msg: '使用自定义图标'
})
```

:::

### 提示位置

通过 `position` 调整提示出现位置，支持 `top`、`middle-top`、`middle`、`bottom`。

```ts
toast.show({
  position: 'top',
  msg: '提示信息'
})

toast.show({
  position: 'middle',
  msg: '提示信息'
})

toast.show({
  position: 'bottom',
  msg: '提示信息'
})
```

### 排版方向

通过 `direction` 控制横向或纵向排版，常用于长文案或加载提示。

```ts
toast.success({
  msg: '纵向排版',
  direction: 'vertical'
})
```

## Toast Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 唯一挂载标识，多实例场景下用于区分不同 toast | `string` | `''` |
| msg | 默认提示文案 | `string` | `''` |
| direction | 默认排版方向，可选值为 `horizontal`、`vertical` | `ToastDirection` | `horizontal` |
| icon-name | 默认图标类型，可选值为 `success`、`error`、`warning`、`loading`、`info` | `ToastIconType` | `''` |
| icon-size | 默认图标大小 | `number` | - |
| loading-type | 默认加载图标类型，可选值为 `circular`、`spinner`、`dots` | `ToastLoadingType` | `circular` |
| loading-color | 默认加载图标颜色 | `string` | `#ffffff` |
| loading-size | 默认加载图标大小 | `number` | - |
| icon-color | 默认图标颜色 | `string` | - |
| position | 默认提示位置，可选值为 `top`、`middle-top`、`middle`、`bottom` | `ToastPositionType` | `middle` |
| z-index | 默认层级 | `number` | `100` |
| cover | 是否显示透明遮罩层 | `boolean` | `false` |
| icon-class | 默认图标类名 | `string` | `''` |
| class-prefix | 类名前缀，用于使用自定义图标，用法参考 Icon 组件 | `string` | `wd-icon` |
| css-icon | CSS 图标，用法参考 Icon 组件 | `boolean \| string` | `false` |
| opened | 完全展示后的回调 | () => void | - |
| closed | 完全关闭后的回调 | () => void | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Toast Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| msg | 提示文案 | `string` | `''` |
| duration | 持续时间，单位毫秒，`0` 表示不自动关闭 | `number` | `2000` |
| direction | 排版方向，可选值为 `horizontal`、`vertical` | `ToastDirection` | `horizontal` |
| iconName | 图标类型，可选值为 `success`、`error`、`warning`、`loading`、`info` | `ToastIconType` | - |
| iconSize | 图标大小 | `number` | - |
| loadingType | 加载图标类型，可选值为 `circular`、`spinner`、`dots` | `ToastLoadingType` | - |
| loadingColor | 加载图标颜色 | `string` | - |
| loadingSize | 加载图标大小 | `number` | - |
| iconColor | 图标颜色 | `string` | - |
| position | 提示位置，可选值为 `top`、`middle-top`、`middle`、`bottom` | `ToastPositionType` | `middle` |
| show | 是否显示，仅内部状态使用 | `boolean` | - |
| zIndex | 层级 | `number` | `100` |
| cover | 是否显示透明遮罩层 | `boolean` | `false` |
| iconClass | 自定义图标类名 | `string` | `''` |
| classPrefix | 自定义图标类名前缀 | `string` | `wd-icon` |
| cssIcon | CSS 图标 | `boolean \| string` | `false` |
| opened | 完全展示后的回调 | () => void | - |
| closed | 完全关闭后的回调 | () => void | - |

## Toast Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| show | 展示普通提示 | (options: ToastOptions | string) | - |
| success | 展示成功提示 | (options: ToastOptions | string) | - |
| error | 展示错误提示 | (options: ToastOptions | string) | - |
| warning | 展示警告提示 | (options: ToastOptions | string) | - |
| info | 展示常规提示 | (options: ToastOptions | string) | - |
| loading | 展示加载提示 | (options: ToastOptions | string) | - |
| close | 手动关闭当前提示 | - | - |

---

---
url: 'https://v2.wot-ui.cn/component/tooltip.md'
---
# Tooltip 文字提示

用于展示简短提示信息，支持多方向定位、受控显隐、自定义内容和动态更新位置。

## 组件类型

### 基本用法

`placement` 用于控制提示出现位置，支持 12 种方向组合。

::: warning 注意
由于 `uni-app` 组件无法天然监听点击自身以外的区域，页面中如果需要点击空白处自动关闭 `tooltip`，建议配合 `useQueue()` 在根节点上统一处理 `closeOutside()`。
:::

::: code-group

```html [vue]
<view @click="closeOutside">
  <wd-tooltip placement="top" content="top 提示文字">
    <wd-button>top</wd-button>
  </wd-tooltip>
</view>
```

```ts [ts]
import { useQueue } from '@/uni_modules/wot-ui'

const { closeOutside } = useQueue()
```

:::

### 显示关闭按钮

通过 `show-close` 在提示层内部显示关闭按钮。

```html
<wd-tooltip content="显示关闭按钮" placement="right" show-close>
  <wd-button>显示关闭按钮</wd-button>
</wd-tooltip>
```

## 组件状态

### 控制显隐

通过 `v-model` 手动控制 `tooltip` 打开和关闭。

::: code-group

```html [vue]
<wd-button plain size="small" @click.stop="control">
  {{ show ? '关闭' : '打开' }}
</wd-button>

<wd-tooltip placement="top" content="控制显隐" v-model="show">
  <wd-button>top</wd-button>
</wd-tooltip>
```

```ts [ts]
import { ref } from 'vue'

const show = ref(false)

function control() {
  show.value = !show.value
}
```

:::

### 禁用

设置 `disabled` 后，点击目标元素不会再显示提示层。

```html
<wd-tooltip placement="right-end" content="禁用" disabled>
  <wd-button>禁用</wd-button>
</wd-tooltip>
```

## 内容形态

### 多行内容

使用 `content` 插槽时，需要同时开启 `use-content-slot`，适合展示多行文本或自定义布局。

::: warning 注意
使用 `content` 插槽时，组件内部无法自动推断复杂内容的最终尺寸。若内容大小发生变化，建议通过实例方法 `updatePosition()` 重新计算定位。
:::

```html
<wd-tooltip placement="right" use-content-slot>
  <wd-button>多行文本</wd-button>
  <template #content>
    <view class="lines-content">
      <view>多行文本1</view>
      <view>多行文本2</view>
      <view>多行文本3</view>
    </view>
  </template>
</wd-tooltip>
```

## 特殊样式

### 动态内容与位置更新

当提示内容尺寸会动态变化时，可通过组件实例的 `updatePosition()` 手动刷新定位。

::: code-group

```html [vue]
<wd-tooltip placement="right" use-content-slot ref="tooltipRef">
  <template #content>
    <view class="lines-content" :style="{ width: dynamicTooltipWidth + 'px' }">
      <view style="margin-bottom: 10px">当前宽度: {{ dynamicTooltipWidth }}px</view>
      <wd-button size="small" @click="changeTooltipSize">改变大小</wd-button>
    </view>
  </template>
  <wd-button>动态内容</wd-button>
</wd-tooltip>
```

```ts [ts]
import { ref } from 'vue'
import type { TooltipInstance } from '@/uni_modules/wot-ui/components/wd-tooltip/types'

const tooltipRef = ref<TooltipInstance>()
const dynamicTooltipWidth = ref(90)

function changeTooltipSize() {
  dynamicTooltipWidth.value = dynamicTooltipWidth.value === 90 ? 150 : 90
  setTimeout(() => {
    tooltipRef.value?.updatePosition()
  }, 50)
}
```

:::

### 绑定事件

可通过 `open`、`close`、`change` 监听提示状态变化。

```html
<wd-tooltip placement="right-end" :content="content" @open="onShow" @close="onHide" @change="handleChange">
  <wd-button>事件</wd-button>
</wd-tooltip>
```

## Tooltip Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 是否显示提示层，支持 `v-model` | `boolean` | `false` |
| content | 提示内容，也可以通过 `content` 插槽传入 | string | Array\<Record\<string, any>> | - |
| placement | 提示位置，可选值为 `top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end` | `PlacementType` | `bottom` |
| offset | 位置偏移量，支持数字、数组或对象配置 | `PopoverOffset` | `0` |
| visible-arrow | 是否显示箭头 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-close | 是否显示关闭按钮 | `boolean` | `false` |
| custom-arrow | 箭头自定义类名 | `string` | `''` |
| custom-pop | 提示层自定义类名 | `string` | `''` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Tooltip Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 提示层显示时触发 | - |
| close | 提示层关闭时触发 | - |
| change | 显隐状态变化时触发 | `{ show: boolean }` |
| update:modelValue | 显隐状态变化时触发 | `boolean` |

## Tooltip Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| open | 打开提示层 | - | - |
| close | 关闭提示层 | - | - |
| updatePosition | 重新测量弹层尺寸并更新定位 | - | - |

## Tooltip Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发提示层的目标内容 |
| content | 自定义提示层内容 |

---

---
url: 'https://v2.wot-ui.cn/component/tour.md'
---
# Tour 漫游组件

用于分步骤引导用户了解页面功能，可高亮目标元素并在其附近展示说明面板。

::: tip 提示
Tour 组件演示 demo 在 iframe 中表现异常，可以点击 demo 左上角箭头单独查看。
:::

## 组件类型

### 基本用法

通过 `steps` 定义引导步骤，通过 `v-model` 控制显隐，通过 `v-model:current` 同步当前步骤索引。

::: code-group

```html [vue]
<wd-tour v-model="showBasicTour" :steps="basicSteps" v-model:current="current" :padding="10" @finish="handleFinish" @change="handleChange" />
```

```ts [ts]
import type { TourChangeDetail, TourStep } from '@/uni_modules/wot-ui/components/wd-tour/types'
import { ref } from 'vue'

const showBasicTour = ref(false)
const current = ref(0)

const basicSteps: TourStep[] = [
  {
    element: '#step1',
    content: '欢迎使用引导组件，这是第一步的说明'
  },
  {
    element: '#step2',
    content: '这是第二步，展示了另一个功能点'
  }
]

function handleChange({ current }: TourChangeDetail) {
  console.log('当前步骤:', current)
}

function handleFinish() {
  showBasicTour.value = false
}
```

:::

## 组件状态

### 点击蒙版继续

设置 `click-mask-next` 后，点击遮罩层会自动进入下一步。

```html
<wd-tour v-model="showClickMaskTour" :steps="basicSteps" :click-mask-next="true" />
```

### 关闭蒙版

设置 `mask` 为 `false` 后，仅保留高亮区域与说明面板，不再显示整页遮罩。

```html
<wd-tour v-model="showNoMaskTour" :steps="noMaskSteps" :mask="false" />
```

## 组件样式

### 自定义蒙版

可以通过 `mask-color`、`offset`、`border-radius`、`padding` 等属性调整高亮区域和遮罩表现。

```html
<wd-tour
  v-model="showCustomMaskTour"
  :steps="customMaskSteps"
  mask-color="red"
  :offset="40"
  :border-radius="15"
  :padding="10"
  next-text="下一步"
  prev-text="上一步"
  skip-text="跳过"
  finish-text="完成"
/>
```

### 自定义高亮区域

通过 `highlight` 插槽可以完全接管高亮区域渲染。

::: code-group

```html [vue]
<wd-tour v-model="showCustomHighlightTour" :steps="customHighlightSteps" :padding="10">
  <template #highlight="{ elementInfo }">
    <view class="custom-highlight" :style="`${objToStyle(elementInfo)};${objToStyle(customHighlightStyle)}`"></view>
  </template>
</wd-tour>
```

```ts [ts]
import { objToStyle } from '@/uni_modules/wot-ui/common/util'

const customHighlightStyle = {
  border: '2px dashed #ff0000',
  borderRadius: '8px',
  background: 'rgba(255, 0, 0, 0.1)',
  boxSizing: 'border-box'
}
```

:::

### 自定义内容和按钮

支持通过 `content`、`prev`、`next`、`skip`、`finish` 插槽自定义引导内容和操作按钮。

```html
<wd-tour v-model="showCustomContentTour" :steps="customContentSteps" next-text="继续" prev-text="返回" skip-text="跳过" finish-text="知道了">
  <template #content>
    <view class="custom-content">
      <wd-icon name="help-circle-filled" size="22px"></wd-icon>
      <text class="custom-text">自定义引导内容区域</text>
    </view>
  </template>

  <template #next>
    <view class="custom-button custom-next">下一步</view>
  </template>

  <template #finish>
    <view class="custom-button custom-finish">完成</view>
  </template>
</wd-tour>
```

## 特殊样式

### 控制当前步骤

通过 `v-model:current` 可在外部直接跳转到指定步骤。

```ts
const controlCurrent = ref(0)

function startControlTour() {
  controlCurrent.value = 2
  showControlTour.value = true
}
```

## Tour Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 是否显示引导组件，支持 `v-model` | `boolean` | `false` |
| steps | 引导步骤列表 | TourStep\[] | `[]` |
| current | 当前步骤索引，支持 `v-model:current` | `number` | `0` |
| mask | 是否显示蒙版 | `boolean` | `true` |
| mask-color | 蒙版颜色 | `string` | - |
| offset | 引导面板与高亮区域的间距 | `number` | `20` |
| duration | 动画时长，单位毫秒 | `number` | `300` |
| border-radius | 高亮区域圆角 | `number` | `4` |
| padding | 高亮区域内边距 | `number` | `8` |
| prev-text | 上一步按钮文案 | `string` | `上一步` |
| next-text | 下一步按钮文案 | `string` | `下一步` |
| skip-text | 跳过按钮文案 | `string` | `跳过` |
| finish-text | 完成按钮文案 | `string` | `完成` |
| bottom-safety-offset | 底部安全偏移量，用于滚动计算 | `number` | `100` |
| top-safety-offset | 顶部安全偏移量，用于滚动计算 | `number` | `0` |
| custom-nav | 是否启用自定义导航栏模式 | `boolean` | `false` |
| click-mask-next | 点击遮罩层是否进入下一步 | `boolean` | `false` |
| highlight-style | 默认高亮区域样式 | CSSProperties | `{}` |
| z-index | 层级 | `number` | - |
| show-tour-buttons | 是否显示引导按钮 | `boolean` | `true` |
| scope | 查询作用域，限定选择器查找范围 | `unknown` | - |
| missing-strategy | 目标元素缺失时的处理策略，可选值为 `skip`、`stop`、`hide` | `MissingStrategy` | `stop` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## TourStep Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| element | 需要高亮的元素选择器 | `string` | - |
| content | 步骤说明，支持 `rich-text` 渲染 | `string` | - |
| padding | 覆盖当前步骤的高亮内边距 | `number` | - |
| offset | 覆盖当前步骤的面板间距 | `number` | - |
| placement | 强制指定提示位置，可选值为 `auto`、`top`、`bottom`、`left`、`right` | `TourPlacement` | `auto` |

## Tour Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 当前步骤变化时触发 | `{ current: number }` |
| prev | 点击上一步时触发 | `{ prevCurrent, current, total, isElementInTop }` |
| next | 点击下一步时触发 | `{ prevCurrent, current, total, isElementInTop }` |
| finish | 点击完成时触发 | `{ current, total }` |
| skip | 点击跳过时触发 | `{ current, total }` |
| error | 目标元素查询失败时触发 | `{ message, element }` |
| update:modelValue | 显隐状态变化时触发 | `boolean` |
| update:current | 当前步骤变化时触发 | `number` |

## Tour Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| handlePrev | 切换到上一步 | - | - |
| handleNext | 切换到下一步 | - | - |
| handleFinish | 完成引导并关闭组件 | - | - |
| handleSkip | 跳过引导并关闭组件 | - | - |

## Tour Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| highlight | 自定义高亮区域 | `{ elementInfo }` |
| content | 自定义引导内容 | - |
| prev | 自定义上一步按钮 | - |
| next | 自定义下一步按钮 | - |
| skip | 自定义跳过按钮 | - |
| finish | 自定义完成按钮 | - |

---

---
url: 'https://v2.wot-ui.cn/component/transition.md'
---
# Transition 动画

用于在元素进入或离开时应用过渡效果。

## 组件类型

### 淡入淡出

通过 `name` 指定淡入淡出相关动画，适合提示层、浮层、局部内容切换等场景。

```html
<wd-transition :show="show" name="fade">
  <view>内容</view>
</wd-transition>
```

### 滑动动画

内置 `slide-up`、`slide-down`、`slide-left`、`slide-right` 四种滑动方向。

```html
<wd-transition :show="show" name="slide-up">
  <view>内容</view>
</wd-transition>
```

### 缩放动画

内置 `zoom-in` 与 `zoom-out` 两种缩放动画。

```html
<wd-transition :show="show" name="zoom-in">
  <view>内容</view>
</wd-transition>
```

## 特殊样式

### 自定义动画

通过 `enter-class`、`enter-active-class`、`enter-to-class`、`leave-class`、`leave-active-class`、`leave-to-class` 自定义进入和离开动画类名。

`duration` 支持数字，也支持分别配置进入和离开时长，例如 `{ enter: 700, leave: 1000 }`。

::: code-group

```html [vue]
<wd-transition
  :show="customShow"
  :duration="{ enter: 700, leave: 1000 }"
  enter-class="custom-enter"
  enter-active-class="custom-enter-active"
  enter-to-class="custom-enter-to"
  leave-class="custom-leave"
  leave-active-class="custom-leave-active"
  leave-to-class="custom-leave-to"
  custom-class="block"
/>
```

```scss [scss]
:deep(.block) {
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
  width: 100px;
  height: 100px;
  background: #0083ff;
}

:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition-property: background, transform;
}

:deep(.custom-enter) {
  transform: translate3d(-100px, -100px, 0) rotate(-180deg);
  background: #ff0000;
}

:deep(.custom-leave-to) {
  transform: translate3d(100px, 100px, 0) rotate(180deg);
  background: #ff0000;
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否展示组件 | `boolean` | `false` |
| duration | 动画执行时间，支持统一时长或分别设置进入、离开时长 | number | boolean | Record\<string, number> | `300` |
| lazy-render | 是否在首次展示时再渲染内容 | `boolean` | `false` |
| name | 动画类型，可选值为 `fade`、`fade-up`、`fade-down`、`fade-left`、`fade-right`、`slide-up`、`slide-down`、`slide-left`、`slide-right`、`zoom-in`、`zoom-out`，也支持数组组合多个动画 | TransitionName | TransitionName\[] | - |
| destroy | 是否在动画结束后通过 `display: none` 隐藏内容 | `boolean` | `true` |
| enter-class | 进入过渡的开始状态类名 | `string` | `''` |
| enter-active-class | 进入过渡的激活状态类名 | `string` | `''` |
| enter-to-class | 进入过渡的结束状态类名 | `string` | `''` |
| leave-class | 离开过渡的开始状态类名 | `string` | `''` |
| leave-active-class | 离开过渡的激活状态类名 | `string` | `''` |
| leave-to-class | 离开过渡的结束状态类名 | `string` | `''` |
| disable-touch-move | 是否阻止触摸滚动 | `boolean` | `false` |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |

### TransitionName 动画类型

| 名称 | 说明 |
| --- | --- |
| fade | 淡入淡出 |
| fade-down | 向下淡入淡出 |
| fade-left | 向左淡入淡出 |
| fade-right | 向右淡入淡出 |
| fade-up | 向上淡入淡出 |
| slide-down | 向下滑动 |
| slide-left | 向左滑动 |
| slide-right | 向右滑动 |
| slide-up | 向上滑动 |
| zoom-in | 缩放进入 |
| zoom-out | 缩放离开 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| before-enter | 进入前触发 | - |
| enter | 进入时触发 | - |
| after-enter | 进入后触发 | - |
| before-leave | 离开前触发 | - |
| leave | 离开时触发 | - |
| after-leave | 离开后触发 | - |
| click | 点击组件时触发 | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 需要应用动画效果的内容 |

---

---
url: 'https://v2.wot-ui.cn/guide/unocss-preset.md'
---
# UnoCSS Preset

[@wot-ui/unocss-preset](https://github.com/wot-ui/unocss-preset) 是我们提供的 `UnoCSS` 预设，用来把 `wot-ui` 的设计 token 和主题变量映射成可直接使用的原子类。

接入后，你可以直接在模板中使用 `wot-` 前缀类名完成颜色、间距、圆角、字重、排版、透明度和描边等样式编排，而不需要手动维护一套额外的 CSS 变量映射。

```html
<view class="wot-bg-filled-oppo wot-rounded-xl wot-p-loose">
  <text class="wot-text-title-large wot-text-text-main wot-font-semibold">
    Wot UI UnoCSS Preset
  </text>
</view>
```

## 适用场景

如果你满足以下任一场景，推荐使用 `@wot-ui/unocss-preset`：

* 项目已经接入 `UnoCSS`
* 希望直接复用 `wot-ui` 的设计 token 与主题变量
* 希望通过原子类快速搭建 `uni-app` / `Vue` 页面样式

## 它提供了什么

这个预设主要提供三部分能力：

| 能力 | 说明 |
| --- | --- |
| `theme` | 把 `wot-ui` 的语义色和基础色映射到 `UnoCSS theme`，供颜色类规则使用 |
| `rules` | 生成 `wot-text-*`、`wot-bg-*`、`wot-m-*`、`wot-p-*`、`wot-rounded-*` 等原子类规则 |
| `preflights` | 自动注入 `wot-ui` 的 CSS 变量，确保这些原子类能拿到正确的变量值 |

默认情况下，类名前缀为 `wot-`，例如：

* `wot-text-primary`
* `wot-bg-danger-surface`
* `wot-m-main`
* `wot-rounded-md`
* `wot-text-body-main`

## 安装

::: code-group

```bash [npm]
npm i -D unocss
npm i @wot-ui/unocss-preset
```

```bash [yarn]
yarn add -D unocss
yarn add @wot-ui/unocss-preset
```

```bash [pnpm]
pnpm add -D unocss
pnpm add @wot-ui/unocss-preset
```

:::

## 使用

在项目根目录创建或更新 `unocss.config.ts`：

```ts
import { presetWot } from '@wot-ui/unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWot(),
  ],
})
```

完成配置后，就可以直接在模板中使用 `wot-` 前缀原子类：

```vue
<template>
  <view class="wot-bg-filled-oppo wot-rounded-lg wot-p-main">
    <view class="wot-text-title-large wot-text-text-main">标题</view>
    <view class="wot-mt-tight wot-text-body-main wot-text-text-secondary">
      使用 wot-ui 设计 token 快速组织页面样式
    </view>
  </view>
</template>
```

## 配置项

你可以通过 `presetWot()` 传入配置项来自定义行为：

```ts
presetWot({
  prefix: 'wot',
  preflight: true,
  baseTokens: false,
})
```

| 配置项 | 默认值 | 说明 | 示例 |
| --- | --- | --- | --- |
| `prefix` | `wot` | 工具类前缀 | `wot-text-primary`、`wot-m-main` |
| `preflight` | `true` | 是否自动注入 `wot-ui` CSS 变量 | `presetWot({ preflight: true })` |
| `baseTokens` | `false` | 是否开放基础色板和原始 token 类名 | `presetWot({ baseTokens: true })` |

### prefix

用于控制原子类前缀。默认是 `wot`，对应生成的类名格式为 `wot-*`。

```ts
presetWot({
  prefix: 'wot',
})
```

### preflight

开启后会自动注入 `wot-ui` 相关 CSS 变量，通常推荐保持默认值 `true`。如果关闭它，需要你自行确保这些变量已在项目中可用，否则类名可能存在但样式不生效。

### baseTokens

默认情况下，预设主要暴露语义化 token。开启 `baseTokens` 后，还会额外开放基础色板和原始 token 类名，适合需要更细粒度控制的场景。

## 支持的规则

| 规则类型 | 前缀模式 | 示例 |
| --- | --- | --- |
| 颜色 | `wot-text-*` / `wot-bg-*` / `wot-border-*` | `wot-text-primary`、`wot-bg-danger-surface`、`wot-border-border-main` |
| 间距 | `wot-m-*` / `wot-gap-*` | `wot-m-main`、`wot-gap-tight`、`wot-gap-x-loose` |
| 内边距 | `wot-p-*` | `wot-p-main`、`wot-px-tight`、`wot-pb-loose` |
| 圆角 | `wot-rounded-*` | `wot-rounded-md`、`wot-rounded-full` |
| 字重 | `wot-font-*` | `wot-font-medium`、`wot-font-semibold` |
| 排版 | `wot-text-*` | `wot-text-body-main`、`wot-text-title-large` |
| 透明度 | `wot-opacity-*` | `wot-opacity-disabled` |
| 描边 | `wot-border-stroke-*` | `wot-border-stroke-main` |

## 可用变量值

以下为各类原子类支持的主要变量值，使用时将它们拼接到对应规则后即可。

### 颜色类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-text-*`、`wot-bg-*`、`wot-border-*` |
| 主色 | `primary`、`primary-1` ~ `primary-10` |
| 危险色 | `danger`、`danger-main`、`danger-hover`、`danger-clicked`、`danger-disabled`、`danger-particular`、`danger-surface` |
| 成功色 | `success`、`success-main`、`success-hover`、`success-clicked`、`success-disabled`、`success-particular`、`success-surface` |
| 警告色 | `warning`、`warning-main`、`warning-hover`、`warning-clicked`、`warning-disabled`、`warning-particular`、`warning-surface` |
| 文字色 | `text-main`、`text-secondary`、`text-auxiliary`、`text-disabled`、`text-placeholder`、`text-white` |
| 图标色 | `icon-main`、`icon-secondary`、`icon-auxiliary`、`icon-disabled`、`icon-placeholder`、`icon-white` |
| 边框色 | `border-extra-strong`、`border-strong`、`border-main`、`border-light`、`border-white`、`border-zero` |
| 填充色 | `filled-extra-strong`、`filled-strong`、`filled-content`、`filled-bottom`、`filled-oppo`、`filled-zero` |
| 分割线 | `divider-main`、`divider-light`、`divider-strong`、`divider-white` |
| 反馈色 | `feedback-hover`、`feedback-active`、`feedback-accent` |
| 半透明填充 | `opacfilled-tooltip-toast-cover`、`opacfilled-main-cover`、`opacfilled-light-cover` |
| `Picker View Mask` | `picker-view-mask-start`、`picker-view-mask-end` |
| 分类色 | `classify-yellow-bg`、`classify-yellow-border`、`classify-yellow-content`、`classify-cyan-bg`、`classify-cyan-border`、`classify-cyan-content`、`classify-purple-bg`、`classify-purple-border`、`classify-purple-content`、`classify-grape-bg`、`classify-grape-border`、`classify-grape-content`、`classify-pink-bg`、`classify-pink-border`、`classify-pink-content` |
| 示例 | `wot-text-primary`、`wot-bg-filled-oppo`、`wot-border-border-main`、`wot-bg-classify-purple-content` |

### 间距类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-m-*`、`wot-mx-*`、`wot-my-*`、`wot-mt-*`、`wot-mr-*`、`wot-mb-*`、`wot-ml-*`、`wot-gap-*`、`wot-gap-x-*`、`wot-gap-y-*` |
| 可用值 | `zero`、`ultra-tight`、`super-tight`、`extra-tight`、`tight`、`main`、`loose`、`extra-loose`、`super-loose`、`ultra-loose`、`spacious`、`extra-spacious`、`super-spacious`、`ultra-spacious` |
| 示例 | `wot-m-main`、`wot-mt-tight`、`wot-gap-x-loose` |

### 内边距类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-p-*`、`wot-px-*`、`wot-py-*`、`wot-pt-*`、`wot-pr-*`、`wot-pb-*`、`wot-pl-*` |
| 可用值 | `zero`、`ultra-tight`、`super-tight`、`extra-tight`、`tight`、`main`、`loose`、`extra-loose`、`super-loose`、`ultra-loose`、`spacious`、`extra-spacious`、`super-spacious`、`ultra-spacious` |
| 示例 | `wot-p-main`、`wot-px-tight`、`wot-pb-loose` |

### 圆角类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-rounded-*` |
| 可用值 | `zero`、`sm`、`md`、`lg`、`xl`、`2xl`、`3xl`、`full` |
| 示例 | `wot-rounded-md`、`wot-rounded-full` |

### 字重类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-font-*` |
| 可用值 | `ultra-light`、`thin`、`light`、`regular`、`medium`、`semibold`、`bold` |
| 示例 | `wot-font-medium`、`wot-font-semibold` |

### 排版类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-text-*` |
| Title | `title-main`、`title-large`、`title-extra-large` |
| Body | `body-main`、`body-large`、`body-extra-large`、`body-super-large`、`body-ultra-large` |
| Label | `label-super-small`、`label-extra-small`、`label-small`、`label-main`、`label-large` |
| 示例 | `wot-text-body-main`、`wot-text-title-large`、`wot-text-label-large` |

### 透明度类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-opacity-*` |
| 可用值 | `disabled`、`dimmer`、`overlay`、`main`、`backdrop` |
| 示例 | `wot-opacity-disabled`、`wot-opacity-main` |

### 描边类

| 项目 | 内容 |
| --- | --- |
| 适用前缀 | `wot-border-stroke-*` |
| 可用值 | `zero`、`light`、`main`、`bold` |
| 示例 | `wot-border-stroke-main`、`wot-border-stroke-bold` |

### 开启 `baseTokens` 后可用

当 `baseTokens: true` 时，会额外开放基础色板与原始 token。

| 项目 | 内容 |
| --- | --- |
| 基础色 | `base-black`、`base-white`、`base-transparent` |
| 色阶家族 | `blue-*`、`lightblue-*`、`pink-*`、`red-*`、`volcano-*`、`orange-*`、`yellow-*`、`green-*`、`cyan-*`、`purple-*`、`grape-*`、`coolgrey-*`、`neutralgrey-*`、`warmgrey-*` |
| 色阶范围 | 每个家族支持 `1` ~ `10` |
| 额外透明色 | 非 `grey` 家族额外支持 `*-opac` |
| 透明阶 | `opac-1_02`、`opac-2_04`、`opac-3_08`、`opac-4_15`、`opac-5_20`、`opac-6_30`、`opac-7_45`、`opac-7_55`、`opac-8_65`、`opac-9_75`、`opac-10_85` |
| 白色透明阶 | `opacwhite-1_02`、`opacwhite-2_04`、`opacwhite-3_08`、`opacwhite-4_15`、`opacwhite-5_20`、`opacwhite-6_30`、`opacwhite-7_45`、`opacwhite-7_55`、`opacwhite-8_65`、`opacwhite-9_75`、`opacwhite-10_85` |
| 示例 | `wot-bg-base-black`、`wot-text-blue-6`、`wot-border-opac-3_08` |

## 导出内容

包默认导出 `presetWot`，并额外导出以下 token maps，便于业务侧复用：

* `SEMANTIC_COLOR_MAP`
* `BASE_COLOR_MAP`
* `SPACING_MAP`
* `PADDING_MAP`
* `RADIUS_MAP`
* `FONT_WEIGHT_MAP`
* `TYPOGRAPHY_MAP`
* `OPACITY_MAP`
* `STROKE_MAP`

---

---
url: 'https://v2.wot-ui.cn/component/upload.md'
---
# Upload 上传

图片、视频和文件上传组件。

::: tip 提示
目前组件库已兼容的平台都支持上传视频。使用 `video` 组件实现的视频封面在 H5、微信小程序和支付宝小程序平台得到支持，而在钉钉小程序和 App 平台受限于 `video` 标签能力无法直接作为视频封面。推荐在 `change` 事件中获取视频封面并给 `fileList` 对应视频补充 `thumb` 字段。
:::

::: warning 关于微信小程序隐私协议
`upload` 在微信小程序平台使用了 `wx.chooseImage`、`wx.chooseMedia`、`wx.chooseVideo` 三个隐私接口，需要按微信隐私协议进行配置，否则会导致上传能力不可用。可参考[小程序隐私协议开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)。
:::

## 组件类型

### 基本用法

通过 `file-list` 或 `v-model:file-list` 设置上传列表，`action` 指定上传地址。

::: code-group

```html [vue]
<wd-upload v-model:file-list="fileList" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]"></wd-upload>
```

```ts [ts]
import { ref } from 'vue'
import type { UploadFile } from '@/uni_modules/wot-ui/components/wd-upload/types'

const action = 'https://69bd04402bc2a25b22ad0a49.mockapi.io/upload'

const fileList = ref<UploadFile[]>([
  {
    url: 'https://wot-ui.cn/assets/panda.jpg'
  }
])
```

:::

### 上传视频

将 `accept` 设置为 `video` 后，可以上传视频文件。

```html
<wd-upload accept="video" multiple :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### 上传媒体与文件

`accept="media"` 支持图片和视频，`accept="file"` 支持普通文件，`accept="all"` 支持全部类型文件。不同平台支持范围不同，详见下方 `accept` 合法值说明。

```html
<wd-upload accept="all" multiple :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

## 组件状态

### 上传状态钩子

通过 `success`、`fail` 和 `progress` 事件可以展示上传状态反馈。

```html
<wd-upload
  :file-list="fileList"
  :action="action"
  :success-status="[200, 201]"
  @change="handleChange"
  @success="handleSuccess"
  @fail="handleFail"
  @progress="handleProgress"
></wd-upload>
```

### 禁用

```html
<wd-upload :file-list="fileList" disabled :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### 手动触发上传

设置 `auto-upload="false"` 后，可通过组件实例的 `submit` 方法手动开始上传。

::: code-group

```html [vue]
<wd-upload
  ref="uploadRef"
  :auto-upload="false"
  :file-list="fileList"
  :action="action"
  :success-status="[200, 201]"
  @change="handleChange"
></wd-upload>

<wd-button @click="uploadRef?.submit()">开始上传</wd-button>
```

```ts [ts]
import { ref } from 'vue'
import type { UploadFile, UploadInstance } from '@/uni_modules/wot-ui/components/wd-upload/types'

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadFile[]>([])
```

:::

## 组件变体

### 最大上传数限制

通过 `limit` 限制最多上传的文件数量。

```html
<wd-upload :file-list="fileList" :limit="3" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### 覆盖上传

设置 `reupload` 后，重新选择文件会替换上一项，适合头像等单文件覆盖场景。

```html
<wd-upload reupload v-model:file-list="fileList" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]"></wd-upload>
```

### 多选

```html
<wd-upload :file-list="fileList" multiple :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

## 组件样式

### 自定义唤起样式

通过默认插槽可以替换默认的上传唤起区域。

```html
<wd-upload :file-list="fileList" :limit="5" :action="action" :success-status="[200, 201]" @change="handleChange">
  <wd-button>自定义唤起样式</wd-button>
</wd-upload>
```

### 自定义预览样式

通过 `preview-cover` 插槽可以自定义覆盖在预览区域上的内容。

::: code-group

```html [vue]
<wd-upload v-model:file-list="fileList" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]">
  <template #preview-cover="{ file, index }">
    <view class="preview-cover">{{ file.name || `文件${index}` }}</view>
  </template>
</wd-upload>
```

```scss [scss]
.preview-cover {
  margin-top: 10rpx;
  text-align: center;
}
```

:::

## 特殊样式

### 拦截预览图片操作

`before-preview` 会在预览前触发，返回 `false` 或返回值为 `false` 的 Promise 时可阻止预览。

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-preview="beforePreview"></wd-upload>
```

### 上传前置处理

`before-upload` 会在确认选择文件后、发起上传前触发。

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-upload="beforeUpload"></wd-upload>
```

### 移除图片前置处理

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-remove="beforeRemove"></wd-upload>
```

### 选择文件前置处理

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-choose="beforeChoose"></wd-upload>
```

### 自定义上传方法

通过 `upload-method` 可以完全接管上传行为。

::: code-group

```html [vue]
<wd-upload v-model:file-list="fileList" :upload-method="customUpload" :success-status="[200, 201]"></wd-upload>
```

```ts [ts]
import type { UploadMethod } from '@/uni_modules/wot-ui/components/wd-upload/types'

const customUpload: UploadMethod = (file, formData, options) => {
  const task = uni.uploadFile({
    url: options.action,
    name: options.name,
    filePath: file.url,
    formData,
    header: options.header,
    success: (response) => options.onSuccess(response, file, formData),
    fail: (error) => options.onError(error, file, formData)
  })

  task.onProgressUpdate((response) => {
    options.onProgress(response, file)
  })

  return task
}
```

:::

### 根据文件拓展名过滤

设置 `extension` 后，可以限制选择文件的后缀。H5 支持全部类型过滤，微信小程序支持 `all` 和 `file` 场景过滤。

```html
<wd-upload v-model:file-list="fileList" :extension="['.jpg', '.png']" :action="action" :success-status="[200, 201]"></wd-upload>
```

## 业务能力

### 上传至云存储

`build-form-data` 用于在真正上传前动态构建签名字段，适合对接 OSS、COS、OBS 等云存储服务。

::: code-group

```html [vue]
<wd-upload :file-list="files" :action="host" :build-form-data="buildFormData" @change="handleChange"></wd-upload>
```

```ts [ts]
const host = 'https://examplebucket.oss-cn-zhangjiakou.aliyuncs.com'

function buildFormData({ file, formData }) {
  const imageName = file.url.substring(file.url.lastIndexOf('/') + 1)

  return {
    ...formData,
    key: `20231120/${imageName}`,
    OSSAccessKeyId: 'your-access-key',
    policy: 'your-policy',
    signature: 'your-signature',
    success_action_status: '200'
  }
}
```

:::

## Upload Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| file-list / v-model:file-list | 上传文件列表，例如 \[{ url: 'https://xxx.cdn.com/xxx.jpg' }] | `UploadFile[]` | `[]` |
| action | 上传地址 | `string` | `''` |
| header | 上传请求头 | `Record<string, any>` | `{}` |
| multiple | 是否支持多选文件 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| limit | 最大允许上传个数 | `number` | - |
| show-limit-num | 限制上传数量时，是否显示当前数量 | `boolean` | `true` |
| max-size | 文件大小限制，单位为 byte | `number` | `Number.MAX_VALUE` |
| source-type | 选择图片来源 | `UploadSourceType[]` | \['album', 'camera'] |
| size-type | 所选图片尺寸 | `UploadSizeType[]` | \['original', 'compressed'] |
| name | 上传文件字段名 | `string` | `file` |
| form-data | HTTP 请求附带的额外表单数据 | `Record<string, any>` | `{}` |
| on-preview-fail | 预览失败回调 | `UploadOnPreviewFail` | - |
| before-upload | 上传前置钩子 | `UploadBeforeUpload` | - |
| before-choose | 选择文件前置钩子 | `UploadBeforeChoose` | - |
| before-remove | 删除文件前置钩子 | `UploadBeforeRemove` | - |
| before-preview | 图片预览前置钩子 | `UploadBeforePreview` | - |
| build-form-data | 动态构建上传 `formData` 的钩子 | `UploadBuildFormData` | - |
| loading-type | 加载中图标类型 | `LoadingType` | `circular` |
| loading-color | 加载中图标颜色 | `string` | `#ffffff` |
| loading-size | 加载中图标尺寸 | `string` | `24px` |
| accept | 接受的文件类型，可选值为 `image`、`video`、`media`、`all`、`file` | `UploadFileType` | `image` |
| status-key | `file` 数据结构中状态字段对应的 key | `string` | `status` |
| compressed | 是否压缩视频，当 `accept` 为 `video` 或 `media` 时生效 | `boolean` | `true` |
| max-duration | 拍摄视频最大时长，单位为秒 | `number` | `60` |
| camera | 使用前置或后置相机，可选值为 `front`、`back` | `UploadCameraType` | `back` |
| image-mode | 预览图片的 `mode` 属性 | `ImageMode` | `aspectFit` |
| success-status | 接口响应成功状态码 | number | number\[] | `200` |
| custom-evoke-class | 自定义上传按钮样式类 | `string` | `''` |
| custom-preview-class | 自定义预览列表样式类 | `string` | `''` |
| auto-upload | 是否选择文件后自动上传，关闭后需手动调用 `submit` | `boolean` | `true` |
| reupload | 是否开启覆盖上传，开启后会关闭图片预览 | `boolean` | `false` |
| upload-method | 自定义上传方法 | `UploadMethod` | - |
| extension | 根据文件拓展名过滤，H5 支持全部类型过滤，微信小程序支持 `all` 和 `file` 场景过滤 | `string[]` | - |
| custom-class | 根节点自定义样式类 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## accept 的合法值

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片，全平台支持，微信小程序使用 `chooseMedia` 实现 | `UploadFileType` | - |
| video | 视频，全平台支持，微信小程序使用 `chooseMedia` 实现 | `UploadFileType` | - |
| media | 图片和视频，仅微信小程序支持，使用 `chooseMedia` 实现 | `UploadFileType` | - |
| file | 普通文件，仅微信小程序支持，使用 `chooseMessageFile` 实现 | `UploadFileType` | - |
| all | 全部类型文件，仅微信小程序和 H5 支持 | `UploadFileType` | - |

## file 数据结构

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| uid | 当前上传文件在列表中的唯一标识 | `number` | - |
| thumb | 缩略图地址 | `string` | - |
| name | 当前文件名称 | `string` | - |
| status | 当前文件上传状态，可选值为 `pending`、`loading`、`success`、`fail` | `UploadStatusType` | - |
| size | 文件大小 | `number` | - |
| url | 文件地址 | `string` | - |
| percent | 上传进度 | `number` | - |
| response | 后端返回内容，可能是字符串或对象 | string | Record\<string, any> | - |

## Upload Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义上传唤起区域 |
| preview-cover | 自定义覆盖在预览区域上方的内容，参数为 { file, index } |

## Upload Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| success | 上传成功时触发 | `UploadSuccessEvent` |
| fail | 上传失败时触发 | `UploadErrorEvent` |
| progress | 上传中时触发 | `UploadProgressEvent` |
| oversize | 文件大小超过限制时触发 | `UploadOversizeEvent` |
| chooseerror | 选择文件失败时触发 | `any` |
| change | 上传列表修改时触发 | `UploadChangeEvent` |
| remove | 移除文件时触发 | `UploadRemoveEvent` |
| update:fileList | `v-model:file-list` 对应的更新事件 | `UploadFileItem[]` |

## Upload Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| submit | 手动开始上传 | - |
| abort | 取消上传 | (task?: UniApp.UploadTask) => void |

---

---
url: 'https://v2.wot-ui.cn/component/use-config-provider.md'
---
# useConfigProvider

用于在 JS 逻辑中注入全局配置（如主题变量），解决在微信小程序等环境中，由于组件渲染机制限制（如原生插槽作用域隔离）或使用 `root-portal` 导致无法获取父级 `ConfigProvider` 配置的问题。

::: tip 提示
需要和 `ConfigProvider` 组件配合使用，使用 `ConfigProvider` 组件包裹你的组件。用于解决小程序端依赖注入的限制，导致部分场景下无法获取父级 `ConfigProvider` 配置的问题。
:::

## 基础用法

```ts
import { useConfigProvider } from '@/uni_modules/wot-ui'
import { reactive, ref } from 'vue'

// 使用 reactive
const themeVars = reactive({
  primary6: '#ff4d4f',
  buttonPrimaryBg: '#07c160'
})

useConfigProvider({ themeVars })

// 或者使用 ref
const themeVarsRef = ref({
  primary6: '#2c68ff'
})

useConfigProvider({ themeVars: themeVarsRef })
```

## API

### 参数

| 参数 | 说明 | 类型 | 默认值 | 最低版本 |
|-----|------|------|--------|---------|
| themeVars | 主题变量对象，支持响应式更新 | `ConfigProviderThemeVars` | `Ref<ConfigProviderThemeVars>` | - | 1.14.0 |

---

---
url: 'https://v2.wot-ui.cn/component/use-count-down.md'
---
# useCountDown

用于处理倒计时相关的逻辑。

## 基础用法

```ts
import { useCountDown } from '@/uni_modules/wot-ui'

const { start, pause, reset, current } = useCountDown({
  time: 60 * 1000,
  onChange(current) {
    console.log('剩余时间', current)
  },
  onFinish() {
    console.log('倒计时结束')
  }
})

// 开始倒计时
start()

// 暂停倒计时
pause()

// 重置倒计时
reset()

// 获取当前时间
console.log(current.value)
```

## API

### 参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|------|--------|
| time | 倒计时总时间(ms) | number | - |
| millisecond | 是否开启毫秒级渲染 | boolean | false |
| onChange | 倒计时变化回调 | (current: CurrentTime) => void | - |
| onFinish | 倒计时结束回调 | () => void | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|--------|
| start | 开始倒计时 | - | - |
| pause | 暂停倒计时 | - | - |
| reset | 重置倒计时 | time?: number | - |

### CurrentTime 结构

```ts
type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
}
```

---

---
url: 'https://v2.wot-ui.cn/component/use-dialog.md'
---
# useDialog

`useDialog` 用于函数式调用 `wd-dialog`，支持 `alert`、`confirm`、`prompt`、`show` 和 `close`。

## 基础用法

页面中先声明 `wd-dialog`，再通过 `useDialog()` 打开弹框。

```html
<wd-dialog />
<wd-button @click="openAlert">打开 Alert</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openAlert = () => {
  dialog.alert({
    title: '提示',
    msg: '操作成功'
  })
}
```

## Confirm 与 Prompt

`confirm` 和 `prompt` 返回 `Promise`，`then` 对应确认，`catch` 对应取消或关闭。

::: code-group

```html [模板]
<wd-dialog />
<wd-button @click="openConfirm">打开 Confirm</wd-button>
<wd-button @click="openPrompt">打开 Prompt</wd-button>
```

```ts [脚本]
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()

const openConfirm = () => {
  dialog
    .confirm({
      title: '删除确认',
      msg: '确定删除该记录吗？'
    })
    .then(() => {
      console.log('点击了确认')
    })
    .catch(() => {
      console.log('点击了取消')
    })
}

const openPrompt = () => {
  dialog
    .prompt({
      title: '请输入邮箱',
      inputPattern: /.+@.+\..+/i,
      inputError: '邮箱格式不正确'
    })
    .then((res) => {
      console.log(res.value)
    })
}
```

:::

## 多实例调用

通过 `selector` 区分页面内多个实例，`useDialog(selector)` 会绑定到指定实例。

```html
<wd-dialog selector="dialog-a" />
<wd-dialog selector="dialog-b" />
<wd-button @click="openA">打开 A</wd-button>
<wd-button @click="openB">打开 B</wd-button>
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialogA = useDialog('dialog-a')
const dialogB = useDialog('dialog-b')

const openA = () => {
  dialogA.alert({ title: 'A 实例', msg: '这是 A 弹框' })
}

const openB = () => {
  dialogB.alert({ title: 'B 实例', msg: '这是 B 弹框' })
}
```

## 确认前拦截

`beforeConfirm` 接收当前输入值，支持返回 `boolean` 或 `Promise<boolean>`。

```html
<wd-dialog />
<wd-button @click="openBeforeConfirm">确认前拦截</wd-button>
```

```ts
import { useDialog, useToast } from '@/uni_modules/wot-ui'

const dialog = useDialog()
const toast = useToast()

const openBeforeConfirm = () => {
  dialog.confirm({
    title: '确认提交',
    msg: '将进行校验后提交',
    beforeConfirm: () => {
      toast.loading('校验中...')
      return new Promise((resolve) => {
        setTimeout(() => {
          toast.close()
          resolve(true)
        }, 1200)
      })
    }
  })
}
```

## API

### Methods

| 方法名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| show | 打开弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| alert | 打开 Alert 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| confirm | 打开 Confirm 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| prompt | 打开 Prompt 弹框 | `string \| DialogOptions` | `Promise<DialogResult>` |
| close | 关闭当前弹框 | - | `void` |

### DialogResult

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 操作类型，可选值为 `confirm`、`cancel`、`modal`、`close` | ActionType | - |
| value | Prompt 模式下的输入值 | `string \| number` | - |

### useDialog

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 指定弹框实例标识，传空字符串时使用默认实例 | string | `''` |

### DialogOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | `''` |
| msg | 消息内容 | string | `''` |
| type | 弹框类型，可选值为 `alert`、`confirm`、`prompt` | DialogType | alert |
| theme | 操作区风格，可选值为 `button`、`text` | DialogTheme | button |
| zIndex | 弹窗层级 | number | 99 |
| lazyRender | 弹层内容懒渲染 | boolean | true |
| headerImage | 顶部通栏图片地址 | string | - |
| icon | 图标名称。可选值为 `success`、`info`、`warning`、`danger`，也支持自定义图标名 | string | - |
| iconColor | 图标颜色 | string | - |
| iconProps | 图标组件透传属性 | `Partial<IconProps>` | - |
| inputValue | Prompt 初始值 | `string \| number` | - |
| inputProps | Prompt 模式下 input 组件属性 | `Partial<InputProps>` | `{ type: 'text', modelValue: '' }` |
| textareaProps | Prompt 模式下 textarea 组件属性 | `Partial<TextareaProps>` | - |
| inputPattern | Prompt 输入正则校验规则 | RegExp | - |
| inputValidate | Prompt 输入函数校验规则，返回 `boolean` 或错误文本 | `(inputValue: string \| number) => boolean \| string` | - |
| inputError | Prompt 校验失败提示文案 | string | `''` |
| actionLayout | 操作按钮排列方式，可选值为 `horizontal`、`vertical` | DialogActionLayout | horizontal |
| showCancelButton | 是否显示取消按钮 | boolean | `alert` 为 false，`confirm/prompt` 为 true |
| confirmButtonText | 确认按钮文案 | string | - |
| cancelButtonText | 取消按钮文案 | string | - |
| confirmButtonProps | 确认按钮配置，支持字符串、对象或 `null` | DialogBoxButtonOption | `{}` |
| cancelButtonProps | 取消按钮配置，支持字符串、对象或 `null` | DialogBoxButtonOption | 由 `showCancelButton` 推导 |
| actions | 自定义操作按钮数组；配置后优先级高于确认/取消按钮 | DialogAction\[] | - |
| closeOnClickModal | 是否支持点击遮罩关闭 | boolean | false |
| showClose | 是否显示右上角关闭按钮 | boolean | false |
| beforeConfirm | 确认前拦截函数，返回 `boolean` 或 `Promise<boolean>` | DialogBeforeConfirm | - |

---

---
url: 'https://v2.wot-ui.cn/component/use-image-preview.md'
---
# useImagePreview

`useImagePreview` 用于函数式调用 `wd-image-preview`。

## 基础用法

页面中先声明 `wd-image-preview`，再通过 `useImagePreview()` 打开图片预览。

```html
<wd-image-preview />
<wd-button @click="openPreview">预览图片</wd-button>
```

```ts
import { useImagePreview } from '@/uni_modules/wot-ui'

const { previewImage } = useImagePreview()

const openPreview = () => {
  previewImage({
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ],
    startPosition: 0
  })
}
```

## 传入图片数组

可以直接传入图片 URL 数组，简化调用方式。

```typescript
previewImage([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
])
```

## 多实例调用

通过 `selector` 区分页面内多个实例，`useImagePreview(selector)` 会绑定到指定实例。`selector` 的值需要与 `wd-image-preview` 组件上的 `selector` 属性保持一致。

```html
<wd-button @click="handleSlotPreview">自定义插槽</wd-button>

<wd-image-preview selector="slot-preview">
  <!-- 自定义指示器 -->
  <template #indicator="{ current, total }">
    <wd-swiper-nav :current="current" :total="total" type="dots-bar" custom-style="bottom: 64px;" />
  </template>
  <!-- 底部自定义内容 -->
  <template #default="{ current }">
    <view class="custom-bottom">
      <text class="custom-bottom__text">{{ imageDescriptions[current] }}</text>
    </view>
  </template>
</wd-image-preview>
```

```typescript
import { useImagePreview } from '@/uni_modules/wot-ui'

const { previewImage } = useImagePreview('slot-preview')

const images = [
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg'
]

const imageDescriptions = ['小熊猫', '水豚']

function handleSlotPreview() {
  previewImage({
    images,
    showIndex: false // 隐藏默认指示器
  })
}
```

## API

### useImagePreview

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 指定图片预览实例标识，传空字符串时使用默认实例 | string | `''` |

### Methods

函数式调用返回的对象包含以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| previewImage | 打开图片预览 | `options: ImagePreviewOptions` | `string[]` |
| closeImagePreview | 关闭图片预览 | - |

### ImagePreviewOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| images | 图片 URL 数组 | `string[]` | `[]` |
| startPosition | 起始位置索引 | `number` | `0` |
| showIndex | 是否显示页码 | `boolean` | `true` |
| loop | 是否循环播放 | `boolean` | `true` |
| closeable | 是否显示关闭按钮 | `boolean` | `true` |
| closeIcon | 关闭图标名称 | `string` | `close` |
| closeIconPosition | 关闭图标位置，可选值为 `top-left`、`top-right` | `string` | `top-right` |
| closeOnClick | 是否点击图片或遮罩时关闭 | `boolean` | `true` |
| showMenuByLongpress | 开启长按图片显示识别小程序码菜单 | `boolean` | `true` |
| zIndex | zIndex 层级 | `number` | `1000` |
| onOpen | 打开时的回调 | `() => void` | - |
| onClose | 关闭时的回调 | `() => void` | - |
| onChange | 切换图片时的回调 | `(index: number) => void` | - |
| onLongPress | 长按图片时的回调 | `(image: string) => void` | - |

---

---
url: 'https://v2.wot-ui.cn/component/use-notify.md'
---
# useNotify

用于便捷地调用 Notify 消息通知组件。

## 基本用法

需要在页面中引入 wd-notify 组件作为挂载点。

```html
<wd-notify />
<wd-button @click="showNotify">notify</wd-button>
```

```ts
import { useNotify } from '@/uni_modules/wot-ui'

const { showNotify } = useNotify()

function showNotify() {
  showNotify('通知内容')
}
```

## 通知类型

支持 `primary`、`success`、`warning`、`danger` 四种通知类型，默认为 `danger`。

```ts
// 主要通知
showNotify({ type: 'primary', message: '通知内容' })

// 成功通知
showNotify({ type: 'success', message: '通知内容' })

// 危险通知
showNotify({ type: 'danger', message: '通知内容' })

// 警告通知
showNotify({ type: 'warning', message: '通知内容' })
```

## 自定义样式

```ts
showNotify({
  message: '自定义颜色',
  color: '#ad0000',
  background: '#ffe1e1'
})

showNotify({
  message: '自定义位置',
  position: 'bottom'
})

showNotify({
  message: '自定义时长',
  duration: 1000
})
```

## API

### Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| showNotify | 展示提示 | `NotifyOptions` / `string` |
| closeNotify | 关闭提示 | - |
| setNotifyDefaultOptions | 修改默认配置，影响所有的 `showNotify` 调用 | `NotifyOptions` |
| resetNotifyDefaultOptions | 重置默认配置，影响所有的 `showNotify` 调用 | - |

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|------|--------|--------|
| type | 类型 | NotifyType | `primary` `success` `warning` `danger` | `danger` |
| message | 展示文案，支持通过\n换行 | string | - | - |
| duration | 展示时长(ms)，值为 0 时，notify 不会消失 | number | - | 3000 |
| zIndex | 层级 | number | - | 99 |
| position | 弹出位置 | NotifyPosition | `top` `bottom` | `top` |
| color | 字体颜色 | string | - | - |
| background | 背景颜色 | string | - | - |
| safeHeight | 顶部安全高度 | number / string | - | - |
| onClick | 点击时的回调函数 | (event: MouseEvent) => void | - | - |
| onClosed | 关闭时的回调函数 | () => void | - | - |
| onOpened | 展示后的回调函数 | () => void | - | - |

---

---
url: 'https://v2.wot-ui.cn/component/use-toast.md'
---
# useToast

用于便捷地调用 Toast 轻提示组件。

## 基本用法

需要在页面中引入 wd-toast 组件作为挂载点。

```html
<wd-toast />
<wd-button @click="showToast">toast</wd-button>
```

```ts
import { useToast } from '@/uni_modules/wot-ui'

const toast = useToast()

function showToast() {
  toast.show('提示信息')
}
```

## 成功、异常、警告、常规

```ts
toast.show('提示信息')
toast.success('操作成功')
toast.error('手机验证码输入错误，请重新输入')
toast.warning('提示信息')
toast.info('常规提示信息')
```

## 使用图标

可以使用`iconClass`指定图标，结合`classPrefix`可以使用自定义图标，参见 [Icon 自定义图标](/component/icon#自定义图标)。

```ts
// 使用组件库内部图标
toast.show({
  iconClass: 'star',
  msg: '使用组件库内部图标'
})
```

```ts
// 使用自定义图标
toast.show({
  iconClass: 'kehuishouwu',
  classPrefix: 'fish',
  msg: '使用自定义图标'
})
```

## loading 提示

`loading` 开启后需要用户手动关闭，关闭可以调用 `close`，或者再调用一次 toast 提示，因为 toast 只会存在一个，新的 toast 会自动顶掉旧的 toast。

```ts
toast.loading('加载中...')
```

修改 loading 指示器类型：

```ts
toast.loading({
  loadingType: 'ring',
  msg: '加载中...'
})
```

手动关闭 loading:

```ts
toast.close()
```

## API

### Methods

| 方法名称 | 说明                   | 参数    |
| -------- | --------------------- | ------- |
| show     | 展示提示              | options |
| success  | 成功提示              | options |
| error    | 错误提示              | options |
| info     | 常规提示              | options |
| warning  | 警告提示              | options |
| loading  | 加载提示              | options |
| close    | 手动关闭消息提示框     | -       |

### Options

| 参数         | 说明                                    | 类型     | 可选值                    | 默认值     |
|--------------|----------------------------------------|----------|---------------------------|------------|
| msg          | 消息内容                                | string   | -                         | ''         |
| duration     | 持续时间，单位 ms，为 0 时表示不自动关闭  | number   | -                         | 2000       |
| direction    | 排版方向                                | string   | vertical / horizontal     | horizontal |
| iconName     | 图标类型                                | string   | success / error / warning | ''         |
| iconSize     | 左侧图标尺寸                            | number   | -                         | -          |
| iconClass    | 自定义图标类名                          | string   | -                         | ''         |
| classPrefix  | 类名前缀                                | string   | -                         | 'wd-icon'  |
| cssIcon      | CSS 图标                                | boolean | string   | -                  | false  |
| position     | 提示信息框的位置                        | string   | top / middle / bottom     | middle-top |
| zIndex       | toast 层级                              | number   | -                         | 100        |
| loadingType  | 加载中图标类型                          | string   | ring                      | outline    |
| loadingColor | 加载中图标颜色                          | string   | -                         | #4D80F0    |
| selector     | 指定唯一标识                            | string   | -                         | ''         |
| cover        | 是否存在一个透明遮罩                     | boolean  | -                         | false      |
| opened       | 完全展示后的回调函数                     | Function | -                         | -          |
| closed       | 完全关闭后的回调函数                     | Function | -                         | -          |

---

---
url: 'https://v2.wot-ui.cn/component/use-upload.md'
---
# useUpload

用于处理文件上传和选择相关的逻辑。

## 基础用法

```ts
import { useUpload } from '@/uni_modules/wot-ui'

const { startUpload, abort, chooseFile, UPLOAD_STATUS } = useUpload()

// 选择文件
const files = await chooseFile({
  accept: 'image',
  multiple: true,
  maxCount: 9
})

// 开始上传
const file = {
  url: 'file://temp/image.png',
  status: UPLOAD_STATUS.PENDING,
  percent: 0
}

startUpload(file, {
  action: 'https://upload-url',
  onSuccess(res) {
    console.log('上传成功', res)
  },
  onError(err) {
    console.log('上传失败', err) 
  },
  onProgress(progress) {
    console.log('上传进度', progress)
  }
})

// 中断上传
abort()
```

## API

### 方法

| 方法名 | 说明 | 参数 | 返回值 | 最低版本 |
|-------|------|------|--------|---------|
| startUpload | 开始上传文件 | file: UploadFileItem, options: UseUploadOptions | UniApp.UploadTask | void | - |
| abort | 中断上传 | task?: UniApp.UploadTask | void | - |
| chooseFile | 选择文件 | options: ChooseFileOption | Promise\<ChooseFile\[]> | - |

### UseUploadOptions

| 参数 | 说明 | 类型 | 默认值 | 最低版本 |
|-----|------|------|--------|---------|
| action | 上传地址 | string | - | - |
| header | 请求头 | Record\<string, any> | {} | - |
| name | 文件对应的 key | string | 'file' | - |
| formData | 其它表单数据 | Record\<string, any> | {} | - |
| fileType | 文件类型 | 'image' | 'video' | 'audio' | 'image' | - |
| statusCode | 成功状态码 | number | number\[] | 200 | - |
| uploadMethod | 自定义上传方法 | UploadMethod | - | - |
| onSuccess | 上传成功回调 | Function | - | - |
| onError | 上传失败回调 | Function | - | - |
| onProgress | 上传进度回调 | Function | - | - |

### ChooseFileOption

| 参数 | 说明 | 类型 | 默认值 | 最低版本 |
|-----|------|------|--------|---------|
| multiple | 是否支持多选文件 | boolean | false | - |
| sizeType | 所选的图片的尺寸 | Array | \['original', 'compressed'] | - |
| sourceType | 选择文件的来源 | Array | \['album', 'camera'] | - |
| maxCount | 最大可选数量 | number | 9 | - |
| accept | 接受的文件类型 | 'image' | 'video' | 'media' | 'file' | 'all' | 'image' | - |
| compressed | 是否压缩视频 | boolean | true | - |
| maxDuration | 视频最大时长(秒) | number | 60 | - |
| camera | 摄像头朝向 | 'back' | 'front' | 'back' | - |
| extension | 根据文件拓展名过滤(H5支持全部类型过滤,微信小程序支持all和file时过滤,其余平台不支持) | string\[] | - |

## 文件选择数量限制

不同平台对文件选择数量有不同的限制，这些限制由 uni-app 平台 API 本身决定：

### 微信平台

| 选择方法 | 最大数量 | 说明 | 适用场景 |
|---------|---------|------|----------|
| `chooseMedia` | 20 | 选择图片和视频时的最大数量限制 | accept 为 `image`、`video`、`media` 时使用 |
| `chooseMessageFile` | 100 | 选择文件时的最大数量限制 | accept 为 `file`、`all` 时使用 |

### H5平台

| 选择方法 | 最大数量 | 说明 | 适用场景 |
|---------|---------|------|----------|
| `chooseImage` | 9 | 选择图片时的最大数量限制 | accept 为 `image` 时使用 |
| `chooseVideo` | 1 | 不支持多选，只能选择单个视频文件 | accept 为 `video` 时使用 |
| `chooseFile` | 100 | 选择文件时的最大数量限制 | accept 为 `all` 时使用 |

::: warning H5平台特别说明
count 值在 H5 平台的表现基于浏览器本身的规范。目前测试结果来看，只能限制单选/多选，并不能限制具体数量。并且，在实际的手机浏览器中很少有能够支持多选的。
:::

### 其他平台

| 选择方法 | 最大数量 | 说明 | 适用场景 |
|---------|---------|------|----------|
| `chooseImage` | 9 | 选择图片时的最大数量限制 | accept 为 `image` 时使用 |
| `chooseVideo` | 1 | 不支持多选，只能选择单个视频文件 | accept 为 `video` 时使用 |

::: tip 提示

* 微信平台优先使用 `chooseMedia` 和 `chooseMessageFile`，具有更高的选择数量限制
* 视频选择在大多数平台都不支持多选
* 实际可选择的数量还会受到 `maxCount` 参数的进一步限制
  :::

---

---
url: 'https://v2.wot-ui.cn/component/use-video-preview.md'
---
# useVideoPreview

`useVideoPreview` 用于函数式调用 `wd-video-preview`。

## 基础用法

页面中先声明 `wd-video-preview`，再通过 `useVideoPreview()` 打开视频预览。

```html
<wd-video-preview />
<wd-button @click="openPreview">预览视频</wd-button>
```

```ts
import { useVideoPreview } from '@/uni_modules/wot-ui'

const { previewVideo } = useVideoPreview()

const openPreview = () => {
  previewVideo({
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    poster: 'https://wot-ui.cn/assets/panda.jpg',
    title: '视频预览'
  })
}
```

## 传入预览对象

可以直接传入 `PreviewVideo` 对象，最简配置只需要提供 `url`。

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4'
})
```

## 多实例调用

通过 `selector` 区分页面内多个实例，`useVideoPreview(selector)` 会绑定到指定实例。`selector` 的值需要与 `wd-video-preview` 组件上的 `selector` 属性保持一致。

```html
<wd-button @click="openMain">默认实例</wd-button>
<wd-button @click="openSub">指定实例</wd-button>

<wd-video-preview />
<wd-video-preview selector="sub-preview" />
```

```ts
import { useVideoPreview } from '@/uni_modules/wot-ui'

const { previewVideo } = useVideoPreview()
const { previewVideo: previewSubVideo } = useVideoPreview('sub-preview')

function openMain() {
  previewVideo({
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    title: '默认实例'
  })
}

function openSub() {
  previewSubVideo({
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    title: '指定实例'
  })
}
```

## 自定义配置

通过 `VideoPreviewOptions` 可同时配置层级与打开、关闭回调。

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: '视频预览',
  zIndex: 1200,
  onOpen: () => {
    console.log('打开预览')
  },
  onClose: () => {
    console.log('关闭预览')
  }
})
```

## API

### useVideoPreview

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 指定视频预览实例标识，传空字符串时使用默认实例 | string | `''` |

### Methods

函数式调用返回的对象包含以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| previewVideo | 打开视频预览 | options: VideoPreviewOptions | PreviewVideo |
| closeVideoPreview | 关闭视频预览 | - |

### VideoPreviewOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 视频资源地址 | `string` | `''` |
| poster | 视频封面地址 | `string` | `''` |
| title | 视频标题 | `string` | `''` |
| show | 是否显示预览层 | `boolean` | `false` |
| zIndex | zIndex 层级 | `number` | `1000` |
| onOpen | 打开时的回调 | `() => void` | - |
| onClose | 关闭时的回调 | `() => void` | - |

---

---
url: 'https://v2.wot-ui.cn/component/video-preview.md'
---
# VideoPreview 视频预览

视频预览组件，支持通过组件实例或 `useVideoPreview` 函数式调用打开全屏视频预览层。`useVideoPreview` 的独立用法与 API 说明见 [useVideoPreview](/component/use-video-preview)。

::: warning 注意
使用 `useVideoPreview()` 前，需要先在当前页面中声明一个 `wd-video-preview` 实例，否则无法建立注入关系。
:::

## 组件类型

### useVideoPreview

`useVideoPreview` 是 `wd-video-preview` 的推荐调用方式，适合在按钮点击、列表项点击等交互中直接拉起视频预览。详细说明见 [useVideoPreview](/component/use-video-preview)。

### 基本用法

对应当前 demo 页的用法是在页面中放置一个 `wd-video-preview` 实例，再通过 `previewVideo()` 打开预览。

::: code-group

```html [vue]
<wd-button @click="open">点击预览视频</wd-button>

<wd-video-preview />
```

```ts [ts]
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'
import type { PreviewVideo } from '@/uni_modules/wot-ui/components/wd-video-preview/types'

const { previewVideo } = useVideoPreview()

const video: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: '视频预览'
}

function open() {
  previewVideo(video)
}
```

:::

## 特殊样式

### 多实例调用

当同一页面存在多个 `wd-video-preview` 实例时，可通过 `selector` 区分，并在 `useVideoPreview(selector)` 中传入相同标识。

::: code-group

```html [vue]
<wd-button @click="openMain">打开主预览</wd-button>
<wd-button @click="openSub">打开次预览</wd-button>

<wd-video-preview />
<wd-video-preview selector="sub-preview" />
```

```ts [ts]
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'

const { previewVideo: openMainPreview } = useVideoPreview()
const { previewVideo: openSubPreview } = useVideoPreview('sub-preview')
```

:::

### 自定义层级与回调

函数式调用时可直接传入 `zIndex`、`onOpen`、`onClose`，组件会优先采用函数式传入的配置。

```ts
previewVideo({
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: '视频预览',
  zIndex: 1200,
  onOpen: () => console.log('打开预览'),
  onClose: () => console.log('关闭预览')
})
```

### 组件实例调用

如果更偏向组件式控制，也可以通过 `ref` 调用实例方法 `open` 和 `close`。

::: code-group

```html [vue]
<wd-video-preview ref="videoPreviewRef" />
<wd-button @click="openPreview">打开预览</wd-button>
```

```ts [ts]
import { ref } from 'vue'
import type { VideoPreviewInstance, PreviewVideo } from '@/uni_modules/wot-ui/components/wd-video-preview/types'

const videoPreviewRef = ref<VideoPreviewInstance>()

const video: PreviewVideo = {
  url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  poster: 'https://wot-ui.cn/assets/panda.jpg',
  title: '视频预览'
}

function openPreview() {
  videoPreviewRef.value?.open(video)
}
```

:::

## VideoPreview Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 实例标识，用于区分多个视频预览实例 | `string` | `''` |
| z-index | 预览层级 | `number` | `1000` |
| on-open | 组件打开时的回调 | () => void | - |
| on-close | 组件关闭时的回调 | () => void | - |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |

## VideoPreview Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开预览时触发 | - |
| close | 关闭预览时触发 | - |

## VideoPreview Methods

通过 `ref` 调用组件实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| open | 打开视频预览 | `video: PreviewVideo` | - |
| close | 关闭视频预览 | - | - |

## useVideoPreview

`useVideoPreview` 的基础用法、多实例调用、方法与 `VideoPreviewOptions` 说明已单独整理到 [useVideoPreview](/component/use-video-preview)，组件文档这里不再重复展开。

---

---
url: 'https://v2.wot-ui.cn/component/watermark.md'
---
# Watermark 水印

在页面或组件上添加指定的图片或文字，可用于版权保护、品牌宣传等场景。

## 组件类型

### 局部文字水印

通过 `content` 指定水印文字，并配合 `full-screen="false"` 将水印限定在局部容器内。

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" content="wot-ui"></wd-watermark>
</view>
```

### 局部图片水印

通过 `image` 指定图片地址，并使用 `image-width`、`image-height` 控制图片大小。

::: warning 注意
钉钉小程序仅支持网络图片，不支持 Base64 图片水印。
:::

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" image="https://v2.wot-ui.cn/logo.svg" :image-width="38" :image-height="38"></wd-watermark>
</view>
```

### 局部多行文字水印

增大 `width` 与 `height` 后，可以承载更长的文字内容，适合多行展示。

```html
<view class="watermark-wrap">
	<wd-watermark :full-screen="false" :width="150" :height="150" content="多行文字水印测试自动换行效果展示，这是一段很长的文本"></wd-watermark>
</view>
```

## 特殊样式

### 全局水印

默认情况下组件会铺满页面。结合 `layout` 可以在网格布局与错位布局之间切换，也可以在文字水印和图片水印之间切换。

```html
<wd-watermark content="wot-ui" :width="130" :height="140" layout="grid"></wd-watermark>
```

### 自定义层级和透明度

通过 `opacity` 设置透明度，通过 `z-index` 控制水印层级。

```html
<wd-watermark content="wot-ui" :opacity="0.4" :z-index="1200"></wd-watermark>
```

## Watermark Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 水印文字内容 | `string` | `''` |
| image | 水印图片地址，支持网络图片和 Base64 图片，钉钉小程序仅支持网络图片 | `string` | `''` |
| image-height | 图片高度 | `number` | `100` |
| image-width | 图片宽度 | `number` | `100` |
| gutter-x | X 轴间距，单位为 `px` | `number` | `0` |
| gutter-y | Y 轴间距，单位为 `px` | `number` | `0` |
| width | 单个水印画布宽度，单位为 `px` | `number` | `100` |
| height | 单个水印画布高度，单位为 `px` | `number` | `100` |
| full-screen | 是否铺满整个页面 | `boolean` | `true` |
| color | 水印文字颜色 | `string` | `#C9CBD4` |
| size | 水印文字大小，单位为 `px` | `number` | `14` |
| font-style | 水印字体样式，仅微信、支付宝和 H5 支持，可选值为 `normal`、`italic`、`oblique` | `WatermarkFontStyle` | `normal` |
| font-weight | 水印字体粗细，仅微信、支付宝和 H5 支持 | string | number | `normal` |
| font-family | 水印字体系列，仅微信、支付宝和 H5 支持 | `string` | `PingFang SC` |
| rotate | 水印旋转角度 | `number` | `-25` |
| z-index | 水印层级 | `number` | `1100` |
| opacity | 水印透明度，取值范围为 `0` 到 `1` | `number` | - |
| layout | 水印布局，可选值为 `grid`、`staggered` | `WatermarkLayout` | `grid` |
| custom-style | 自定义根节点样式 | `string` | `''` |
| custom-class | 自定义根节点样式类 | `string` | `''` |

---

---
url: 'https://v2.wot-ui.cn/guide/introduction.md'
---
# 介绍

在 `V1` 版本，`Wot UI` 基于 `vue3`+`Typescript`构建，参照`wot design`的设计规范进行开发。

在 `V2` 版本我们更加注重美观和 AI 友好度，采用了 AI 友好度更高的设计，提供了 80+ 高质量组件和 AI 编程实践方案，支持暗黑模式、国际化和自定义主题，旨在给开发者提供简洁高效的 UI 交互和`AI友好`的开发体验。

## 快速上手

请查看[快速上手](/guide/quick-use.html)文档。

## 扫码体验

## ✨ 特性

* 🎯 多平台覆盖，支持 微信小程序、支付宝小程序、钉钉小程序、H5、APP 等.
* 🚀 80+ 个高质量组件，覆盖移动端主流场景.
* 💪 使用 Typescript 构建，提供良好的组件类型系统.
* 🤖 提供 AI 友好的设计系统.
* 🌍 支持国际化，内置 15 种语言包.
* 📖 提供丰富的文档和组件示例.
* 🎨 支持修改 CSS 变量实现主题定制.
* 🍭 支持暗黑模式

## 赞助我们

如果您认为 Wot UI 帮助到了您的开发工作，您可以选择[赞助](/reward/reward.html)我们，赞助无门槛，哪怕是一杯柠檬水也好。

捐赠后您的昵称、留言等将会展示在[捐赠榜单](/reward/donor.html)中。

## 生态

| 分类 | 项目 | 描述 |
| --- | --- | --- |
| 官方生态 | [wot-starter](https://starter.wot-ui.cn/) | Wot UI 官方快速起手项目 |
| 官方生态 | [@wot-ui/router](https://my-uni.wot-ui.cn/) | Wot UI 官方路由与工程能力扩展 |
| 官方生态 | [@wot-ui/cli](https://github.com/wot-ui/open-wot) | Wot UI 官方 AI 工具链与 CLI |
| 官方生态 | [@wot-ui/unocss-preset](https://github.com/wot-ui/unocss-preset) | Wot UI 官方 UnoCSS 预设 |
| 官方生态 | [VS Code 插件](https://marketplace.visualstudio.com/items?itemName=wot-ui.wot-ui-intellisense) | Wot UI 官方 VS Code 代码提示插件 |
| 官方生态 | [小程序 CI 工具](https://github.com/Moonofweisheng/uni-mini-ci) | Wot UI 官方推荐的小程序 CI 工具 |
| 官方生态 | [wot-starter-retail](https://github.com/wot-ui/wot-starter-retail) | Wot UI 官方零售行业模板方案 |
| 开发资源 | [awesome-uni-app](https://github.com/uni-helper/awesome-uni-app) | 多端统一开发框架 uni-app 优秀开发资源汇总 |
| 开发资源 | [create-uni](https://github.com/uni-helper/create-uni) | 快速创建 uni-app 项目 |
| 开发资源 | [uni-ku](https://github.com/uni-ku) | uni-app 生态扩展与工具集合 |
| 开发资源 | [uni-echarts](https://uni-echarts.xiaohe.ink/) | uni-app 图表组件与接入方案 |
| 模板方案 | [vitesse-uni-app](https://vitesse-docs.netlify.app/) | 现代化 uni-app 基础模板 |
| 模板方案 | [unibest](https://unibest.tech/) | 功能完善的 uni-app 开发模板 |

## 鸣谢

* [wot-design](https://github.com/jd-ftf/wot-design-mini) - 感谢 wot-design 团队多年来的不断维护，让 wot-ui 能够站在巨人的肩膀上。
* [uni-helper](https://github.com/uni-helper) - 感谢 uni-helper 团队提供的 uni-app 工具库，让 wot-ui 能够更方便地使用。
* [捐赠者](https://wot-ui.cn/reward/donor.html) - 感谢所有捐赠者，是你们的捐赠让 wot-ui 能够更好地发展。

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。

---

---
url: 'https://v2.wot-ui.cn/guide/migration-v2.md'
---

# 从 v1 迁移到 v2

本文介绍如何将项目从 `Wot UI v1` 迁移到 `Wot UI v2`。

`v2` 不只是包名升级，也包含表单校验体系、主题变量、部分组件命名和工程配置的调整。迁移时建议先完成依赖和路径替换，再处理 `Form`、`Dialog`、`Cascader` 等高影响组件，最后做样式和平台回归。

## 迁移概览

| 类型 | v1 | v2 |
| --- | --- | --- |
| npm 包名 | `wot-design-uni` | `@wot-ui/ui` |
| uni\_modules 目录 | `wot-design-uni` | `wot-ui` |
| 组合式函数导入 | `@/uni_modules/wot-design-uni` | `@/uni_modules/wot-ui` |
| 弹框组件 | `wd-message-box` | `wd-dialog` |
| 弹框 Hook | `useMessage` | `useDialog` |
| 缺省提示 | `wd-status-tip` | `wd-empty` |
| 多列选择器 | `wd-col-picker` | `wd-cascader` |
| 表单校验 | `rules` / `FormRules` | `schema` / `FormSchema` |
| 按钮变体 | `plain` / `type="text"` / `type="icon"` | `variant` / 图标按钮 |
| 标签变体 | `plain` | `variant="plain"` |
| 单选 / 复选形态 | `shape` / `inline` / `cell` | `type` / `direction` / 手动组合 `wd-cell` |
| 搜索框浅色样式 | `light` | `variant="light"` |
| GridItem 点击事件 | `itemclick` | `click` |
| 工具函数路径 | `components/common/util` | `common/util` |
| 主题系统 | CSS 变量覆盖 | Design Token 三层变量体系 |
| Sass | 建议锁定较低版本 | 推荐 `1.98` 及以上版本 |

::: warning 注意
`v2` 的组件命名、包名和部分 API 与 `v1` 不完全兼容。请不要只升级依赖版本，建议按本文的顺序逐项检查。
:::

## 升级前检查

升级前建议先在项目中搜索旧包名和旧组件：

```bash
rg "wot-design-uni|wd-message-box|useMessage|wd-status-tip|wd-col-picker|wd-number-keyboard|@itemclick|shape=|inline|\\scell\\b|\\slight\\b|type=\"error\"|type=\"icon\"|type=\"text\"|\\splain\\b|classPrefix|components/common/util|hide-label|hide-min-max|autoLineWidth|disabled-color|setRoate|useContentSlot|useMoreSlot|\\bshow="
```

如果项目中有表单页面，请额外搜索：

```bash
rg "wd-form|FormRules|:rules=|rules=|errorType|resetOnChange"
```

重点确认以下内容：

* 项目使用 `npm` 安装还是 `uni_modules` 安装。
* 是否在 `pages.json` 中配置了 `easycom`。
* 是否在 `tsconfig.json` 中配置了全局组件类型。
* 是否使用了 `MessageBox`、`StatusTip`、`ColPicker`、`NumberKeyboard`。
* 是否使用了 `Button` 的 `plain`、`type="error"`、`type="text"`、`type="icon"`。
* 是否使用了 `Tag` 的 `plain`。
* 是否使用了 `Radio` / `Checkbox` 的 `shape`、`inline`、`cell`、`icon-placement`。
* 是否使用了 `Search` 的 `light`。
* 是否监听了 `wd-grid-item` 的 `itemclick` 事件。
* 是否调用了 `PickerView`、`ImgCropper`、`CountTo` 等组件实例方法。
* 是否在 `Badge`、`Slider`、`Tabs`、`Rate`、`SlideVerify`、`Steps`、`Swiper` 等组件上使用了旧属性。
* 是否在 `Tooltip`、`Popover`、`Collapse` 等组件中使用了旧显隐属性或旧插槽开关。
* 是否有复杂表单、动态表单、隐藏字段校验或自定义校验规则。
* 是否覆盖过组件内部样式或自定义过主题变量。

## 安装迁移

### npm 安装

将旧包替换为新包：

::: code-group

```bash [npm]
npm remove wot-design-uni
npm i @wot-ui/ui
```

```bash [yarn]
yarn remove wot-design-uni
yarn add @wot-ui/ui
```

```bash [pnpm]
pnpm remove wot-design-uni
pnpm add @wot-ui/ui
```

:::

导入路径需要同步替换：

```ts
// v1
import { useToast } from 'wot-design-uni'

// v2
import { useToast } from '@wot-ui/ui'
```

### uni\_modules 安装

如果你使用 `uni_modules`，需要将插件目录从 `wot-design-uni` 替换为 `wot-ui`。

```bash
uni_modules
└── wot-ui
```

导入路径需要同步替换：

```ts
// v1
import { useToast } from '@/uni_modules/wot-design-uni'

// v2
import { useToast } from '@/uni_modules/wot-ui'
```

## Sass 迁移

`v2` 推荐使用 `sass@^1.98.0`：

::: code-group

```bash [npm]
npm i sass@^1.98.0 -D
```

```bash [yarn]
yarn add sass@^1.98.0 -D
```

```bash [pnpm]
pnpm add sass@^1.98.0 -D
```

:::

升级 `sass` 后，项目中原有的业务样式也可能需要同步调整。新版 Sass 对旧语法和旧 API 的兼容提示更严格，如果你的项目中存在较早期的 Sass 写法，可能会在编译时出现警告或错误。

建议重点检查以下内容：

* 是否仍在使用 `@import` 引入 Sass 文件，必要时迁移为 `@use` 或 `@forward`。
* 是否依赖全局可见的变量、mixin 或 function。迁移到 `@use` 后，需要通过命名空间访问，或使用 `as *` 显式展开。
* 是否使用了旧的除法写法 `/`。如果用于数学计算，建议迁移为 `math.div()`。
* 是否调用了 Sass 废弃的内置函数或旧 API。
* 是否有第三方样式库锁定了较旧的 Sass 语法，需要同步升级对应依赖。

例如：

```scss
// 旧写法
@import './variables.scss';

.page {
  width: 100px / 2;
  color: $primary-color;
}
```

可以逐步迁移为：

```scss
@use 'sass:math';
@use './variables.scss' as *;

.page {
  width: math.div(100px, 2);
  color: $primary-color;
}
```

如果遇到 `legacy JS API` 相关警告，可以在 `vite.config.ts` 中配置：

```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api']
      }
    }
  }
})
```

## 自动导入迁移

### easycom

如果你使用 `npm` 安装，并通过 `easycom` 自动引入组件，需要将路径改为新包名：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^wd-(.*)": "@wot-ui/ui/components/wd-$1/wd-$1.vue"
    }
  }
}
```

如果你使用 `uni_modules` 安装，一般不需要额外配置；如果项目中手动写过旧目录路径，也需要替换为 `@/uni_modules/wot-ui`。

### vite 插件自动导入

如果通过 `@uni-helper/vite-plugin-uni-components` 自动导入组件，可以使用项目内自定义 resolver：

```ts
import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'
import { kebabCase } from '@uni-helper/vite-plugin-uni-components'

export function WotResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Wd[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `@wot-ui/ui/components/${compName}/${compName}.vue`
        }
      }
    }
  }
}
```

### Volar 类型

`npm` 安装时，`tsconfig.json` 中的类型声明需要替换：

```json
{
  "compilerOptions": {
    "types": ["@wot-ui/ui/global"]
  }
}
```

## Form 表单迁移

`Form` 是 `v2` 中变化最大的组件之一。`v1` 更偏向“表单组件直接承载校验规则”，`v2` 则统一为 `wd-form`、`wd-form-item` 和 `schema` 校验模型。

### 基础结构迁移

`v1` 中，输入组件通常直接放在 `wd-form` 内，并在组件上声明 `prop` 和 `rules`：

```vue
<wd-form ref="form" :model="model" :rules="rules">
  <wd-input
    label="用户名"
    prop="username"
    v-model="model.username"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
</wd-form>
```

`v2` 推荐使用 `wd-form-item` 承载标题、布局、校验提示和点击行为，输入组件只负责输入：

```vue
<wd-form ref="form" :model="model" :schema="schema" :title-width="100">
  <wd-form-item title="用户名" prop="username">
    <wd-input v-model="model.username" placeholder="请填写用户名" />
  </wd-form-item>
</wd-form>
```

::: tip 提醒
`wd-form-item` 与 `input`、`textarea` 结合使用时，会自动开启 `input` 和 `textarea` 的 `compact` 属性。迁移后如果表单项高度或间距有变化，请优先检查这里。
:::

### 校验规则迁移

`v1` 使用 `rules`：

```ts
import type { FormRules } from '@/uni_modules/wot-design-uni/components/wd-form/types'

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请填写用户名'
    }
  ]
}
```

`v2` 使用 `schema`。如果你希望获得更好的类型推导，推荐使用 `zodAdapter`：

```ts
import { z } from 'zod'
import { zodAdapter } from '@/uni_modules/wot-ui'

const schema = zodAdapter(
  z.object({
    username: z.string().min(1, '请填写用户名')
  })
)
```

使用 `npm` 安装时，导入路径改为：

```ts
import { zodAdapter } from '@wot-ui/ui'
```

`Zod` 不会随组件库内置安装，需要自行安装：

::: code-group

```bash [npm]
npm i zod
```

```bash [yarn]
yarn add zod
```

```bash [pnpm]
pnpm add zod
```

:::

如果你不想引入 `Zod`，也可以手写 `FormSchema`：

```ts
import type { FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const schema: FormSchema = {
  validate(model) {
    const issues = []
    if (!model.username) {
      issues.push({ path: ['username'], message: '请填写用户名' })
    }
    return issues
  },
  isRequired(path: string) {
    return path === 'username'
  }
}
```

### 必填星号迁移

`v2` 中，必填星号和校验规则是两个概念。你可以通过以下方式控制星号：

* 在 `wd-form-item` 上设置 `required`。
* 在 `FormSchema` 中提供 `isRequired(path)`。
* 在 `zodAdapter` 的第二个参数中提供 `isRequired(path)`。

```ts
const schema = zodAdapter(
  z.object({
    username: z.string().min(1, '请填写用户名')
  }),
  {
    isRequired(path: string) {
      return path === 'username'
    }
  }
)
```

如果迁移后校验正常但星号没有显示，请优先检查 `required` 或 `isRequired`。

### 选择器表单项迁移

`v1` 中，`Input`、`Textarea`、`Picker`、`Calendar`、`DatetimePicker`、`SelectPicker`、`ColPicker` 等组件经常直接作为表单项使用，组件自身支持 `label`、`label-width`、`prop`、`rules` 等表单相关属性：

```vue
<wd-col-picker
  label="地址"
  prop="address"
  v-model="model.address"
  :columns="area"
/>
```

`v2` 中，表单结构统一收口到 `wd-form-item`。输入组件和弹层选择器不再承担表单标题、校验展示和触发入口的职责，迁移时需要将 `label`、`label-width`、`prop`、`rules` 等配置迁移到 `wd-form`、`wd-form-item` 或 `schema`。

对于弹层选择器，推荐将选择器和表单展示拆开：选择器负责选择，`wd-form-item` 负责展示当前值、打开弹层和显示校验状态。

```vue
<wd-cascader
  v-model="model.address"
  v-model:visible="showAddressPicker"
  :options="area"
  @confirm="handleAddressConfirm"
/>

<wd-form-item
  title="地址"
  prop="address"
  is-link
  :value="addressText"
  placeholder="请选择地址"
  @click="showAddressPicker = true"
/>
```

```ts
import type { CascaderOption } from '@/uni_modules/wot-ui/components/wd-cascader/types'

const showAddressPicker = ref(false)
const addressText = ref('')

function handleAddressConfirm({ selectedOptions }: { selectedOptions: CascaderOption[] }) {
  addressText.value = selectedOptions.map((item) => item.text).join('/')
}
```

::: tip 提醒
选择类组件迁移后，请检查 `model` 保存的是组件值，还是用于展示的文本。`wd-form-item` 的 `value` 通常用于展示文本，不一定等同于提交给后端的字段值。
:::

### 布局属性迁移

`v2` 的 `Form` 和 `FormItem` 提供了更多布局能力，原来散落在各输入组件上的布局配置，可以优先上移到 `wd-form` 或 `wd-form-item`：

```vue
<wd-form
  :model="model"
  :schema="schema"
  :title-width="100"
  layout="horizontal"
  value-align="left"
  border
  asterisk-position="end"
>
  <wd-form-item title="用户名" prop="username">
    <wd-input v-model="model.username" />
  </wd-form-item>
</wd-form>
```

常用布局属性包括：

| 属性 | 说明 |
| --- | --- |
| `border` | 是否展示边框线 |
| `center` | 是否使内容垂直居中 |
| `size` | 单元格大小 |
| `title-width` | 左侧标题宽度 |
| `layout` | 表单项布局，可选 `horizontal`、`vertical` |
| `value-align` | 右侧内容对齐方式 |
| `asterisk-position` | 必填星号位置 |
| `hide-asterisk` | 是否隐藏必填星号 |
| `ellipsis` | 是否超出隐藏显示省略号 |

### 校验触发迁移

`v2` 支持通过 `validate-trigger` 控制校验触发时机：

```vue
<wd-form :model="model" :schema="schema" validate-trigger="change">
  <wd-form-item title="用户名" prop="username" validate-trigger="blur">
    <wd-input v-model="model.username" />
  </wd-form-item>
</wd-form>
```

`validate` 方法仍然支持校验全部字段、单个字段或多个字段：

```ts
await form.value?.validate()
await form.value?.validate('username')
await form.value?.validate(['username', 'password'])
```

### Form 迁移清单

* 将直接挂在输入组件上的 `prop`、`rules` 迁移到 `wd-form-item` 和 `schema`。
* 将 `rules` / `FormRules` / `FormItemRule` 替换为 `schema` / `FormSchema`。
* 如果使用 `Zod`，安装 `zod` 并通过 `zodAdapter` 转换校验规则。
* 检查必填星号是否需要通过 `required` 或 `isRequired` 单独控制。
* 将 `errorType` 改为 `error-type`，`resetOnChange` 改为 `reset-on-change`。
* 将 `ColPicker` 场景迁移为 `Cascader`，并确认回显文本和提交值。
* 检查动态字段、隐藏字段、数组字段和异步校验。
* 检查 `validate()`、`validate(prop)`、`reset()` 的调用是否仍符合业务预期。

## 组件迁移

### 模板属性命名

`v2` 文档中的模板示例统一使用 kebab-case 属性名。迁移时建议将模板中的 camelCase 写法同步调整，尤其是直接从旧文档复制过来的代码。

```vue
<!-- v1 中常见写法 -->
<wd-toast :zIndex="1000" classPrefix="custom" />
<wd-count-to :startVal="0" :endVal="100" />

<!-- v2 推荐写法 -->
<wd-toast :z-index="1000" class-prefix="custom" />
<wd-count-to :start-val="0" :end-val="100" />
```

常见属性包括 `z-index`、`class-prefix`、`custom-class`、`custom-style`、`safe-area-inset-bottom`、`start-val`、`end-val`、`auto-start`、`use-easing` 等。

### MessageBox 迁移为 Dialog

`v1`：

```vue
<wd-message-box />
```

```ts
import { useMessage } from '@/uni_modules/wot-design-uni'

const message = useMessage()
message.confirm({
  title: '提示',
  msg: '确认删除？'
})
```

`v2`：

```vue
<wd-dialog />
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()
dialog.confirm({
  title: '提示',
  msg: '确认删除？'
})
```

如果页面中存在多个弹框实例，请继续使用 `selector` 区分：

```vue
<wd-dialog selector="delete-dialog" />
```

```ts
const dialog = useDialog('delete-dialog')
```

`Dialog` 相比 `MessageBox` 还有以下行为差异需要检查：

* `closeOnClickModal` 默认值从 `true` 调整为 `false`，如果仍希望点击遮罩关闭，需要显式设置。
* `Prompt` 的返回值是 `DialogResult`，读取输入内容时通常使用 `res.value`。
* `inputType`、`inputPlaceholder` 等扁平配置推荐迁移到 `inputProps`；多行输入可以使用 `textareaProps`。
* 确认、取消按钮的高级配置使用 `confirmButtonProps`、`cancelButtonProps`，多按钮场景使用 `actions`。

```ts
dialog.prompt({
  title: '请输入手机号',
  inputProps: {
    type: 'tel',
    placeholder: '请输入 11 位手机号'
  }
}).then((res) => {
  console.log(res.value)
})
```

### Button 迁移

`v2` 对按钮类型和变体做了拆分。迁移时建议重点检查 `type`、`plain`、`round` 和图标按钮。

| v1 | v2 |
| --- | --- |
| `type="error"` | `type="danger"` |
| `plain` | `variant="plain"` |
| `type="text"` | `variant="text"` |
| `type="icon" icon="xxx"` | 只传 `icon="xxx"` |
| `classPrefix` | 模板中推荐写作 `class-prefix` |

```vue
<!-- v1 -->
<wd-button type="error" plain>删除</wd-button>
<wd-button type="text">文字按钮</wd-button>
<wd-button type="icon" icon="picture" />
```

```vue
<!-- v2 -->
<wd-button type="danger" variant="plain">删除</wd-button>
<wd-button variant="text">文字按钮</wd-button>
<wd-button icon="image" />
```

::: tip 提醒
`v2` 中 `Button` 的 `round` 默认值为 `false`，并且按钮高度由固定高度控制。如果项目依赖 `v1` 的圆角外观或通过内边距撑开的高度，需要做视觉回归。
:::

### Tag 迁移

`v2` 的 `Tag` 使用 `variant` 表达视觉变体，`plain` 需要迁移为 `variant="plain"`。

```vue
<!-- v1 -->
<wd-tag plain>标签</wd-tag>
<wd-tag mark plain>标签</wd-tag>
```

```vue
<!-- v2 -->
<wd-tag variant="plain">标签</wd-tag>
<wd-tag mark variant="plain">标签</wd-tag>
```

如果你在数据中维护标签配置，也需要同步调整：

```ts
// v1
const tag = { type: 'primary', plain: true }

// v2
const tag = { type: 'primary', variant: 'plain' }
```

### Radio 和 Checkbox 迁移

`v2` 对 `Radio`、`Checkbox` 的形态、排列和列表模式做了统一，旧的 `shape`、`inline`、`cell` 需要迁移。

| v1 | v2 |
| --- | --- |
| `shape="check"` | `type="circle"` |
| `shape="dot"` | `type="dot"` |
| `shape="button"` | `type="button"` |
| `shape="square"` | `type="square"` |
| `inline` | `direction="horizontal"` |
| `icon-placement="left/right"` | `placement="left/right"` |
| `cell` | 手动组合 `wd-cell` |

```vue
<!-- v1 -->
<wd-radio-group v-model="value" shape="button" inline>
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>

<!-- v2 -->
<wd-radio-group v-model="value" type="button" direction="horizontal">
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

`v1` 的 `cell` 模式在 `v2` 中不再作为 `RadioGroup` / `CheckboxGroup` 的内置属性提供。需要整行点击时，请将选项放入 `wd-cell` 中，并在 `wd-cell` 的点击事件里更新值或调用组件实例方法。

```vue
<wd-radio-group v-model="value">
  <wd-cell-group border>
    <wd-cell title="选项一" clickable @click="value = 1">
      <template #right-icon>
        <wd-radio :value="1" />
      </template>
    </wd-cell>
  </wd-cell-group>
</wd-radio-group>
```

`Checkbox` 迁移时还需要注意：在 `CheckboxGroup` 中选项值使用 `name` 表达，单独使用 `wd-checkbox` 时才使用 `v-model`、`true-value`、`false-value` 管理选中和未选中值。

### Search 迁移

`v1` 的 `light` 布尔属性在 `v2` 中迁移为 `variant="light"`。

```vue
<!-- v1 -->
<wd-search light />

<!-- v2 -->
<wd-search variant="light" />
```

如果使用了右侧输入框插槽，`v2` 推荐直接使用 `input-suffix`、`suffix` 等具名插槽，不再通过已废弃的 `use-suffix-slot` 控制。

### Cell、Input 和 Textarea 迁移

`v1` 中 `Cell`、`Input`、`Textarea` 曾承担一部分表单项职责，常见属性包括 `prop`、`rules`、`label`、`label-width`、`required`、`marker-side`、`no-border` 等。`v2` 中这些职责需要迁移到 `wd-form-item`、`wd-form` 或 `schema`。

```vue
<!-- v1 -->
<wd-input label="用户名" prop="username" v-model="model.username" required />

<!-- v2 -->
<wd-form-item title="用户名" prop="username" required>
  <wd-input v-model="model.username" />
</wd-form-item>
```

`Cell` 自身的图标和布局属性也有调整：

| v1 | v2 |
| --- | --- |
| `icon` | `prefix-icon` |
| `custom-icon-class` | `custom-prefix-class` 或 `custom-suffix-class` |
| `vertical` | `layout="vertical"` |
| `marker-side` | `asterisk-position` |

`Input`、`Textarea` 放入 `wd-cell` 或 `wd-form-item` 时，建议使用 `compact` 移除组件自身的内边距和背景；在 `wd-form-item` 中会自动开启。

### Fab 迁移

`Fab` 的主题类型与 `Button` 保持一致，旧的 `type="error"` 需要改为 `type="danger"`。

```vue
<!-- v1 -->
<wd-fab type="error" :zIndex="99" inactiveIcon="plus" activeIcon="close" />

<!-- v2 -->
<wd-fab type="danger" :z-index="99" inactive-icon="plus" active-icon="close" />
```

如果 `Fab` 插槽内的按钮仍使用 `type="error"`，也需要同步迁移为 `type="danger"`。

### Grid 迁移

`wd-grid-item` 的点击事件从 `itemclick` 调整为 `click`。

```vue
<!-- v1 -->
<wd-grid clickable>
  <wd-grid-item text="开始" icon="play-circle-stroke" @itemclick="start" />
</wd-grid>
```

```vue
<!-- v2 -->
<wd-grid clickable>
  <wd-grid-item text="开始" icon="play-circle-stroke" @click="start" />
</wd-grid>
```

::: tip 提醒
`wd-grid-item` 需要配合父级 `wd-grid` 的 `clickable` 使用，未开启 `clickable` 时不会触发点击逻辑。
:::

### StatusTip 迁移为 Empty

`v2` 使用 `wd-empty` 表达空状态、网络异常、无结果等场景：

```vue
<wd-empty icon="no-result" tip="当前搜索无结果" />
<wd-empty icon="no-wifi" tip="当前网络不可用，请检查你的网络设置" />
<wd-empty icon="no-content" tip="暂无内容" />
```

如果 `v1` 中使用了自定义图片或底部操作区，可以迁移到 `wd-empty` 的插槽：

```vue
<wd-empty icon="no-content" tip="暂无内容">
  <wd-button type="primary">重新加载</wd-button>
</wd-empty>
```

### ColPicker 迁移为 Cascader

`v2` 使用 `wd-cascader` 替代 `wd-col-picker`。迁移时需要重点检查数据结构、异步加载和回显逻辑。

```vue
<wd-cascader
  v-model="model.address"
  v-model:visible="showAddressPicker"
  :options="area"
  @confirm="handleAddressConfirm"
/>
```

`Cascader` 的选项支持通过 `value-key`、`text-key`、`children-key` 等属性适配自定义字段。迁移 `ColPicker` 的 `column-change` 逻辑时，可以改用 `lazy-load`。

### Picker、Calendar 和 DatetimePicker 触发方式

`v2` 中，`Picker`、`SelectPicker`、`Calendar`、`DatetimePicker` 等弹层选择器更偏向纯选择器职责，不再把外层触发单元格作为主要结构。旧代码中如果直接依赖这些组件的 `label`、`label-width`、`prop`、`rules` 等表单项能力，建议迁移为 `wd-cell` 或 `wd-form-item` 负责触发和展示。

```vue
<wd-picker v-model="model.type" v-model:visible="showTypePicker" :columns="typeList" />

<wd-form-item
  title="类型"
  prop="type"
  is-link
  :value="typeText"
  placeholder="请选择类型"
  @click="showTypePicker = true"
/>
```

### CountTo 迁移

`v2` 中 `CountTo` 的主题类型为 `default`、`primary`、`success`、`warning`、`error`。如果旧代码使用了 `type="info"`，需要替换为其他主题或通过 `color` 自定义颜色。

```vue
<!-- v1 -->
<wd-count-to type="info" :startVal="0" :endVal="888888" :autoplay="false" fontSize="24px" />

<!-- v2 -->
<wd-count-to type="primary" :start-val="0" :end-val="888888" :auto-start="false" custom-style="font-size: 24px;" />
```

在模板中也建议统一使用 kebab-case 属性，如 `start-val`、`end-val`、`auto-start`。如果旧代码使用 `fontSize` 控制字号，`v2` 可改为 `custom-style`、`custom-class` 或外层样式控制。

### Segmented 迁移

`v2` 的 `Segmented` 使用 `theme` 控制样式，不再提供 `size`。如果旧代码使用 `size="large"` 或 `size="small"`，需要按设计稿通过外层样式、`custom-class` 或组件变量调整尺寸。

```vue
<!-- v1 -->
<wd-segmented :options="list" v-model:value="current" size="large" />

<!-- v2 -->
<wd-segmented :options="list" v-model:value="current" theme="card" />
```

`vibrateShort` 在模板中建议改为 `vibrate-short`。

### PickerView 迁移

`PickerView` 的级联模型变化较大。`v1` 常通过 `column-change` 和实例方法 `setColumnData` 动态修改列数据，`v2` 推荐使用 `cascade` 和树形 `columns` 数据。

```vue
<!-- v2 -->
<wd-picker-view v-model="value" :columns="columns" cascade />
```

实例方法也有命名调整：

| v1 | v2 |
| --- | --- |
| `getLabels()` | `getSelectedLabels()` |
| `setColumnData()` | 使用 `cascade` 树形数据，或通过 `resetColumns()` 重置列数据 |
| `getColumnData()` | `getColumnData()` 保留 |
| `resetColumns()` | `resetColumns()` 保留 |

`v2` 的 `v-model` 推荐始终使用数组形式保存选中值，单列选择也建议写成 `['value']`。

### ImgCropper 迁移

如果项目中通过组件实例调用图片裁剪方法，需要将拼写错误的 `setRoate` 改为 `setRotate`。

```ts
// v1
cropper.value?.setRoate(90)

// v2
cropper.value?.setRotate(90)
```

### 更多组件迁移补充

下面这些组件的变化相对分散，但如果项目中用到对应旧属性，也需要一起调整。

| 组件 | v1 | v2 |
| --- | --- | --- |
| `Badge` | `v-model` / `modelValue` | `value` |
| `Slider` | 数组值自动双滑块 | 需要显式设置 `range` |
| `Slider` | `hide-label` | 使用 `popover-visible="never"` 隐藏气泡 |
| `Slider` | `hide-min-max` | 使用 `show-extreme-value` 控制是否展示极值 |
| `Tabs` | `autoLineWidth` | `line-theme="text"` |
| `Rate` | `disabled-color` | 通过 `color`、`active-color` 或自定义样式处理禁用态视觉 |
| `SlideVerify` | `width` / `height` | 通过外层容器、`custom-style` 或样式类控制尺寸 |
| `Steps` | `title-slot` / `description-slot` / `icon-slot` | 直接使用 `title`、`description`、`icon` 插槽 |
| `Swiper` | `pagination-position` | `indicator-position` |
| `DatetimePickerView` | `columns-height` | `item-height` / `visible-item-count` |

```vue
<!-- Badge -->
<wd-badge :value="12" />

<!-- Slider -->
<wd-slider v-model="rangeValue" range show-extreme-value popover-visible="never" />

<!-- Tabs -->
<wd-tabs v-model="tab" line-theme="text" />
```

`DatetimePickerView` 的 `loading`、`loading-color` 不再作为视图组件属性提供；如果旧页面依赖加载态，建议在外层自行控制 loading 展示，再渲染选择器。

`Swiper` 的指示器能力也做了收口，数字、点状、点条状等样式优先通过 `indicator` 配置，位置使用 `indicator-position`：

```vue
<wd-swiper
  v-model:current="current"
  :list="list"
  :indicator="{ type: 'fraction' }"
  indicator-position="bottom-right"
/>
```

### Tooltip、Popover 和 Collapse 迁移

`Tooltip` 的受控显隐从旧的 `show` 属性收口到 `v-model` / `model-value`。

```vue
<!-- v1 -->
<wd-tooltip :show="show" content="提示内容">
  <wd-button>提示</wd-button>
</wd-tooltip>

<!-- v2 -->
<wd-tooltip v-model="show" content="提示内容">
  <wd-button>提示</wd-button>
</wd-tooltip>
```

`Tooltip`、`Popover` 使用 `content` 插槽时，不再需要旧的 `useContentSlot` 开关。迁移后如果插槽内容尺寸会动态变化，可以通过实例方法 `updatePosition()` 重新计算定位。

```vue
<wd-popover v-model="showPopover" ref="popoverRef">
  <template #content>
    <view>自定义内容</view>
  </template>
  <wd-button>打开</wd-button>
</wd-popover>
```

`Collapse` 的绑定值从旧的 `value` 属性迁移为 `v-model`。如果使用查看更多模式，自定义 `more` 插槽时模板属性推荐写作 `use-more-slot`。

```vue
<!-- v1 -->
<wd-collapse :value="active" useMoreSlot>
  ...
</wd-collapse>

<!-- v2 -->
<wd-collapse v-model="active" use-more-slot>
  ...
</wd-collapse>
```

### NumberKeyboard

`v2` 不再提供独立的 `wd-number-keyboard`。如果项目中依赖该组件，可以优先评估迁移到 `wd-keyboard`：

```vue
<wd-keyboard v-model="value" v-model:visible="visible" mode="custom" extra-key="." close-text="完成" />
```

车牌号、身份证、随机数字键盘等场景也由 `wd-keyboard` 承载。迁移时请重点检查 `visible`、`v-model`、`extra-key`、`close-text`、`random-key-order`、`safe-area-inset-bottom` 等属性和事件。

### 新增预览组件

`v2` 新增了图片和视频预览能力：

* [ImagePreview 图片预览](/component/image-preview)
* [VideoPreview 视频预览](/component/video-preview)
* [useImagePreview](/component/use-image-preview)
* [useVideoPreview](/component/use-video-preview)

如果项目中原来直接调用 `uni.previewImage` 或维护自定义视频预览层，可以按需迁移到这些组件。

## 工具函数和类型导入迁移

如果项目中直接引用了组件库内部工具函数，路径需要同步调整：

```ts
// v1
import { isArray, getRect, pause } from '@/uni_modules/wot-design-uni/components/common/util'

// v2
import { isArray, getRect, pause } from '@/uni_modules/wot-ui/common/util'
```

`npm` 安装时，可以从包内路径导入：

```ts
import { isArray, getRect, pause } from '@wot-ui/ui/common/util'
```

也可以从包入口使用 `CommonUtil` 命名空间：

```ts
import { CommonUtil } from '@wot-ui/ui'

CommonUtil.isArray([])
```

组件类型导入也需要替换包名或目录名：

```ts
// v1
import type { UploadFileItem } from '@/uni_modules/wot-design-uni/components/wd-upload/types'

// v2
import type { UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'
```

## 图标迁移

`v2` 对图标示例和部分组件默认图标做了调整。迁移后如果页面出现空图标、图标名称不匹配或视觉含义不一致，请优先检查 `icon`、`prefix-icon`、`suffix-icon`、`class-prefix`、`css-icon` 等配置。

常见场景包括：

* `Button` 旧的 `type="icon"` 需要改为直接传 `icon`。
* 自定义图标类名前缀在模板中推荐使用 `class-prefix`。
* 旧示例中的部分图标名可能需要替换为 `v2` 图标文档中存在的名称。

## 主题与深色模式迁移

`v2` 的主题系统基于 Design Token，推荐优先覆盖语义变量，再按需覆盖组件变量。

如果使用深色模式或主题变量，需要在入口样式中引入主题文件：

::: code-group

```scss [npm]
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```

```scss [uni_modules]
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```

:::

全局品牌色建议覆盖语义变量：

```scss
page,
.wd-root-portal {
  --wot-primary-5: #4096ff;
  --wot-primary-6: #1677ff;
  --wot-primary-7: #0958d9;
}
```

局部主题建议使用 [ConfigProvider 全局配置](/component/config-provider)：

```vue
<wd-config-provider :theme-vars="themeVars">
  <wd-button type="primary">提交</wd-button>
</wd-config-provider>
```

更多主题说明请参考 [定制主题](/guide/custom-theme) 和 [深色模式](/guide/dark-mode)。

## 样式覆盖迁移

`v2` 推荐按以下优先级覆盖样式：

1. 优先使用组件提供的 `custom-class`、`custom-style`。
2. 需要统一品牌视觉时，优先覆盖 CSS 变量。
3. 页面内覆盖组件样式时，普通样式可以直接使用 `.wd-*` 类名。
4. 在 `scoped` 样式中覆盖组件内部样式时，使用 `:deep()`。
5. 在自定义组件内覆盖小程序组件样式时，检查 `styleIsolation: 'shared'`。

```css
:deep(.wd-button) {
  font-weight: 600;
}
```

更多说明请参考 [样式覆盖](/guide/custom-style)。

## 国际化迁移

如果使用 `npm` 安装，并配置过 Vite 预构建排除，需要将旧包名替换为新包名：

```ts
export default defineConfig({
  optimizeDeps: {
    exclude: ['@wot-ui/ui']
  }
})
```

导入路径同步替换：

```ts
import { Locale } from '@wot-ui/ui'
import enUS from '@wot-ui/ui/locale/lang/en-US'
```

`uni_modules` 安装时：

```ts
import { Locale } from '@/uni_modules/wot-ui/locale'
import enUS from '@/uni_modules/wot-ui/locale/lang/en-US'
```

## 回归测试清单

迁移完成后，建议至少检查以下内容：

* `H5` 和目标小程序端是否能正常编译。
* `easycom` 是否能正确解析所有 `wd-*` 组件。
* `Toast`、`Dialog`、`Notify` 等函数式调用组件是否已经在页面中声明实例。
* 表单提交、单字段校验、重置、隐藏字段和异步校验是否正常。
* 选择器类表单项的回显文本和提交值是否正确。
* `Button` 的 `type`、`variant`、`round` 和高度是否符合预期。
* `Tag` 的 `variant` 是否已从旧的 `plain` 迁移。
* `Radio` / `Checkbox` 的 `shape`、`inline`、`cell` 是否已迁移。
* `Search` 的 `light` 是否已迁移为 `variant="light"`。
* `GridItem` 点击事件是否已从 `itemclick` 迁移到 `click`。
* `Cell`、`Input`、`Textarea` 的表单相关属性是否已迁移到 `wd-form-item`。
* `PickerView`、`ImgCropper`、`CountTo` 等实例方法是否仍可正常调用。
* `Badge`、`Slider`、`Tabs`、`Steps`、`Swiper` 等旧属性是否已迁移。
* `Dialog` 点击遮罩关闭、Prompt 返回值和按钮配置是否符合预期。
* 深色模式、主题变量、品牌色覆盖是否生效。
* 弹层、遮罩、`Popup`、`DropMenu`、`ActionSheet` 在小程序端是否存在样式隔离问题。
* 自定义覆盖样式是否仍然生效。
* 图标名称是否仍然存在，按钮高度变化是否影响页面布局。

## 推荐迁移顺序

1. 升级依赖和 `sass`。
2. 替换包名、目录名和导入路径。
3. 更新 `easycom`、Volar、国际化配置。
4. 优先迁移 `Form` 页面。
5. 替换 `MessageBox`、`StatusTip`、`ColPicker`、`NumberKeyboard` 等组件。
6. 检查 `Button`、`Tag`、`Radio`、`Checkbox`、`Search`、`GridItem`、`CountTo`、`Slider`、`Tabs` 等 API 变化。
7. 迁移主题变量和样式覆盖。
8. 在 `H5` 和目标小程序端做完整回归。

如果你的项目表单页面很多，建议先挑一个复杂表单完成迁移样板，再批量迁移其他页面。

---

---
url: 'https://v2.wot-ui.cn/guide/locale.md'
---
# 国际化

Wot UI 默认使用中文语言，同时支持多语言切换，如果你希望使用其他语言，你可以参考下面的方案。

:::warning 注意点
目前 Vite 会将[预构建](https://cn.vitejs.dev/guide/dep-pre-bundling.html)的依赖项缓存到 `node_modules/.vite`，组件库的国际化的实现是基于`reactive`实现的数据共享，在`dev`阶段就会出现页面使用预构建产物中的国际化数据，而组件库使用组件库内部的国际化数据，所以在非`uni_modules`模式引入时，需要在`vite.config.ts`中增加以下配置:

```ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  ...
  optimizeDeps: {
    exclude: ['@wot-ui/ui']
  }
  ...
})

```

使用[optimizeDeps.exclude](https://cn.vitejs.dev/config/dep-optimization-options.html#optimizedeps-exclude)在预构建中强制排除`@wot-ui/ui`模块，在`uni_modules`模式下，不需要做任何处理。

:::

## 使用其他语言

我们通过 **Locale** 组件实现多语言支持，使用 **Locale.use** 方法可以切换当前使用的语言。

```typescript
import { Locale } from '@wot-ui/ui'
// 引入英文语言包
import enUS from '@wot-ui/ui/locale/lang/en-US'

Locale.use('en-US', enUS)
```

## 覆盖语言包

通过 **Locale.add** 方法可以实现文案的修改和扩展，示例如下：

```typescript
import { Locale } from '@wot-ui/ui'

const messages = {
  'zh-CN': {
    calendar: {
      title: '请选择日期' // 将'选择日期'修改为'请选择日期'
    }
  }
}

Locale.add(messages)
```

## 支持的语言

| 语言             | 文件名    | 版本      |
| ---------------- | --------- | --------- |
| 简体中文         | zh-CN     | `v0.2.20` |
| 繁体中文（台湾） | zh-TW     | `v0.2.20` |
| 繁体中文（香港） | zh-HK     | `v0.2.20` |
| 英语             | en-US     | `v0.2.20` |
| 泰语             | th-TH     | `v0.2.20` |
| 越南语             | vi-VN    | `v0.2.20` |
| 阿拉伯语             | ar-SA    | `v1.3.12` |
| 德语             | de-DE    | `v1.3.12` |
| 西班牙语             | es-ES    | `v1.3.12` |
| 葡萄牙语             | pt-PT    | `v1.3.12` |
| 法语             | fr-FR    | `v1.3.12` |
| 日语             | ja-JP    | `v1.3.12` |
| 韩语             | ko-KR    | `v1.3.12` |
| 土耳其语             | tr-TR    | `v1.3.12` |
| 俄语             | ru-RU    | `v1.3.12` |

如果你需要使用其他的语言，欢迎贡献 [PR](https://github.com/Moonofweisheng/@wot-ui/ui/pulls)，只需在[这里](https://github.com/Moonofweisheng/@wot-ui/ui/tree/master/src/uni_modules/@wot-ui/ui/locale/lang)添加一个语言配置文件即可。

---

---
url: 'https://v2.wot-ui.cn/guide/custom-theme.md'
---
# 定制主题

`V2` 版本，组件主题系统基于 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) 构建，通过覆盖这些 CSS 变量，可以实现定制主题、动态切换主题、局部定制和组件级覆盖等功能。

## 主题变量

`Design Token` 是设计上承载设计决策的最小实体 ，也就是主题变量，我们的 `Design Token` 采用三层架构：基础变量、语义变量和组件变量，通过修改 `Design Token` 可以实现不同的组件样式。在这里 [theme](https://github.com/wot-ui/wot-ui/tree/main/src/uni_modules/wot-ui/styles/theme) 你可以看到组件库的全部 `Design Token`。

### 基础变量

基础变量是纯粹的视觉常量，无业务语义，如：

```css
--wot-blue-6: #1C64FDFF;
```

### 语义变量

语义变量是赋予设计决策业务含义的变量，它将基础变量与具体的业务场景做出了映射，如：

```css
--wot-primary-6: var(--wot-blue-6);
```

### 组件变量

组件变量是 `Design Token` 三层架构的最顶层，直接关联具体的 UI 组件属性，通过引用语义变量，将设计决策映射到具体组件的特定部位（如背景色、文本色、边框、图标等），从而实现组件样式的封装与管理，如：

```css
--wot-button-primary-bg: var(--wot-primary-6);
```

## 全局自定义

当你希望整个应用都使用同一品牌视觉时，推荐通过全局覆盖 [语义变量](https://github.com/wot-ui/wot-ui/tree/main/src/uni_modules/wot-ui/styles/theme/light.scss) 来实现，如果你要实现完整主题的定制，建议使用 [预设主题](#预设主题)。

```scss
/* App.vue */
page,
.wd-root-portal {
  --wot-primary-5: #4096ff;
  --wot-primary-6: #1677ff;
  --wot-primary-7: #0958d9;
}
```

## 局部自定义

当你只希望主题在某个页面、某个模块或某个组件树内生效时，推荐使用 [ConfigProvider](/component/config-provider)。

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import type { ConfigProviderThemeVars } from '@wot-ui/ui'

const themeVars = reactive<ConfigProviderThemeVars>({
  primary6: '#07c160',
})
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <wd-button type="primary">提交</wd-button>
  </wd-config-provider>
</template>
```

### 组件级局部覆盖

如果你只想调整某个具体组件，也可以直接在类名作用域下覆盖组件变量：

```css
.marketing-banner {
  --wot-button-primary-bg: #7c3aed;
  --wot-button-primary-color: #ffffff;
}
```

## 预设主题

如果你需要维护多套可复用主题，例如品牌 A、品牌 B，又或者想要动态切换主题，建议使用独立的 SCSS 主题文件来组织。

当前我们在 [src/theme/presets.scss](https://github.com/wot-ui/wot-ui/tree/main/src/theme/presets.scss) 中提供了多个主题的示例，包含 `shadcn`、`cartoon`、`illustration`、`nutui`、`vant`、`tdesign` 等主题。
::: code-group

```scss [css]
/* src/theme/brand-a.scss */
@mixin brand-a-theme-vars {
  --wot-primary-1: #e8f3ff;
  --wot-primary-2: #c7e0ff;
  --wot-primary-6: #1677ff;
  --wot-primary-7: #0958d9;

  --wot-text-main: #1d1f29;
  --wot-text-secondary: #4e5369;
  --wot-border-main: #e5e6eb;
  --wot-filled-bottom: #f7f8fa;
}

.wot-theme-brand-a,
.wot-theme-brand-a .wd-root-portal {
  @include brand-a-theme-vars();
}
```

```scss [App.vue - npm]
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
@use './theme/brand-a.scss' as *;
```

```scss [App.vue - uni_modules]
/* App.vue */
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
@use './theme/brand-a.scss' as *;
```

```html [config-provider]
<!-- 在 `config-provider` 中配置主题变量 -->
<template>
  <wd-config-provider theme="brand-a">
    <wd-button type="primary">提交</wd-button>
  </wd-config-provider>
</template>
```

:::

### Skills

如果你是 `vibe coding` 用户，我们也提供了 [Skills](https://github.com/wot-ui/wot-ui/tree/main/.agents/skills/generate-theme) 用于帮助开发者生成自定义主题，欢迎使用。

## 相关文档

* [ConfigProvider 全局配置](/component/config-provider)
* [useConfigProvider](/component/use-config-provider)

---

---
url: 'https://v2.wot-ui.cn/guide/common-problems.md'
---
# 常见问题 FAQ

本节介绍在开发过程当中遇到的部分 **常见问题** 以及 **解决办法**

## 目前支持哪些平台？

目前支持 微信小程序、支付宝小程序、钉钉小程序、H5、APP 等平台。

## 有没有最佳实践分享？

有，可以关注我的公众号「不如摸鱼去」，也可以访问我的博客[不如摸鱼去](https://blog.wot-ui.cn/)，分享无数干货，等你来看。

## 组件库有没有提供可以单独引入的组件？

目前是没有的，首先在插件市场缺少`CI/CD`工具，无法实现自动化发布，维护一套单独引入的组件费时费力，其次组件库提供的安装方式均可以实现按需引入，所以是无需提供单独引入的组件的。

## 如何开启暗黑模式？

`Wot UI`支持深色模式、主题定制等能力，详见[ConfigProvider 全局配置](/component/config-provider.html)组件。

## 有没有技术交流群？

有！
可以加入[Wot UI 互助群](/guide/join-group.html)，分享心得、交流体会。

## Sass抛出大量警告？

如果遇到运行时抛出以下警告：

```sh
Deprecation Warning [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
```

可以在 `vite.config.ts` 中这样做：

```ts
export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
// ...
})
```

`Sass` 废弃了大批 API ，而 `uni-app` 仍然在使用这些 API ，导致警告的抛出。

## 小程序自定义组件渲染问题

微信/QQ/百度/抖音这四家小程序，自定义组件在渲染时会比 App/H5 端多一级节点，下面以`divider`组件举例：

```vue
<!-- 使用 -->
<wd-divider></wd-divider>

<!-- h5渲染 -->
<view class="wd-divider"></view>

<!-- 微信小程序渲染 -->
<wd-divider>
  <view class="wd-divider"></view>
</wd-divider>
```

### 解决办法

在微信端可以使用[virtualHost](https://uniapp.dcloud.net.cn/tutorial/vue-api.html#%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE)解决，`virtualHost`设为`true`之后会将自定义节点设置成虚拟的，更加接近 Vue 组件的表现，可以去掉微信小程序自定义组件多出的最外层标签，启用后还可以通过 [mergeVirtualHostAttributes](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin) 合并合并组件虚拟节点外层属性。

```js
// vue2使用virtualHost
export default {
  data() {
    return {}
  },
  options: {
    virtualHost: true
  }
}
```

```ts
// vue3 script setup 使用virtualHost
<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>
<script lang="ts" setup>
</script>
```

### 启用 virtualHost 效果

这里我们还是以`divider`组件举例：

```vue
<!-- 使用 -->
<wd-divider></wd-divider>

<!-- h5渲染 -->
<view class="wd-divider"></view>

<!-- 微信小程序渲染 -->
<view class="wd-divider"></view>
```

## 如何定制主题？

我们为每个组件提供了`css 变量`，可以参考[config-provider](../component/config-provider)组件的使用介绍来定制主题。

## Toast 和 Dialog 组件调用无效果？

首先要检查一下用法是否正确，`uni-app`平台不支持全局挂载组件，所以`Dialog`、`Toast`等组件仍需在 SFC 中显式使用，例如:

```html
<wd-toast></wd-toast>
```

`Dialog`、`Toast`的函数式调用是基于`provide/inject`实现的，所以你的调用要确保在`setup`中。

## 编译到支付宝小程序 Popup 组件的遮罩无法显示？

由于平台更新改变了默认的样式隔离策略导致的。详见 [样式覆盖 - 特定平台样式穿透失效](./custom-style.md#特定平台样式穿透失效)。

## 为什么组件库文档中都是从`@/uni_modules/wot-ui`导入方法和工具类？

当前组件库本身的开发方式是将组件库代码放到`@/uni_modules/wot-ui`这个目录的，所以文档中都是从`@/uni_modules/wot-ui`导入方法和工具类，使用`npm`方式安装组件库的时候可以这样调整：

```ts
// useToast、useNotify等同理
import { useDialog } from '@/uni_modules/wot-ui'
```

替换为

```ts
import { useDialog } from '@wot-ui/ui'
```

## uni-app 如何自定义编译平台，例如钉钉小程序？

可以参考`uni-app`文档中[package.json](https://uniapp.dcloud.net.cn/collocation/package.html#%E7%A4%BA%E4%BE%8B-%E9%92%89%E9%92%89%E5%B0%8F%E7%A8%8B%E5%BA%8F)章节。

钉钉小程序示例：

```JSON
{
    "uni-app": {
    "scripts": {
      "mp-dingtalk": {
        "title": "钉钉小程序",
        "env": {
          "UNI_PLATFORM": "mp-alipay"
        },
        "define": {
          "MP-DINGTALK": true
        }
      }
    }
  },
}
```

## 当前组件库提供的用于控制组件显示隐藏 hooks 不生效怎么办？

:::tip 注意
多次执行`use`后，`useToast`、`useDialog`、`useNotify`、`useQueue`等 hooks 不生效的问题已在1.3.14版本修复，请升级到最新版本。
:::

***可以按照以下步骤进行排查***

1. `uni-app`平台不支持全局挂载组件，所以`Message`、`Toast`、`Notify`等组件需在 SFC 中显式使用，例如：

```html
<wd-toast></wd-toast>
```

2. `useToast`、`useDialog`、`useNotify`、`useQueue`等 hooks 不生效，请检查是否在`setup`中调用，如果`setup`中调用，请检查当前页面是否存在多次执行`use`的场景，例如在多个组件中执行，这样会导致上一次`use`的失效。针对此场景，组件的函数式调用都支持传入`selector`参数，可以通过`selector`参数来指定组件，例如：

```html
<wd-toast></wd-toast>
<wd-toast selector="my-toast"></wd-toast>
```

```ts
const toast = useToast()
const myToast = useToast('my-toast')
```

## 为什么在微信小程序上使用`Popup`、`ActionSheet`、`DropDownItem`等弹出框组件包裹`Slider`、`Tabs`等组件时，`Slider`、`Tabs`表现异常？

目前uni-app使用`v-if`控制插槽是否显示编译到微信小程序端存在问题，具体可以参考issue:[4755](https://github.com/dcloudio/uni-app/issues/4755)、[4847](https://github.com/dcloudio/uni-app/issues/4847)。而`Popup`、`ActionSheet`、`DropDownItem`恰好正是使用`v-if`控制插槽是否显示，所以会导致`Slider`、`Tabs`在未渲染时执行了相关生命周期。`Slider`、`Tabs`等组件的一些数据如`Slider`的宽度，`Tabs`的滑块位置等会在onMounted等生命周期进行获取，此时这些数据将会存在异常。

解决办法：

1. 在`Slider`、`Tabs`等组件外部使用`v-if`控制弹框打开前不展示，例如：

```html
<wd-slider v-if="showSlider"></wd-slider>
```

1. 在`Popup`、`ActionSheet`、`DropDownItem`等组件完全打开时的钩子中重新初始化`Slider`、`Tabs`组件，例如：

```html
<wd-popup v-model="show" position="bottom" closable custom-style="height: 200px;" @after-enter="handleOpened">
<wd-slider v-model="value" ref="slider"></wd-slider>
</wd-popup>
```

```ts
const slider = ref()

function handleOpened() {
  slider.value!.initSlider()
}

```

## 为何 Dialog 弹出了多个？

检查一下弹出多个`Dialog`的页面是否存在多个相同`selector`或无`selector`的`<wd-dialog></wd-dialog>`标签(当前页面包括页面中使用的组件)。`toast`亦是同理，在子组件中使用`Dialog`等组件需要指定`selector`并确保`selector`唯一。

## Toast、Message、Loading 等如何全局调用？

全局调用方案见 [wot-starter](https://starter.wot-ui.cn/guide/feedback.html)，支持在路由导航守卫和网络请求拦截器等场景使用的可全局调用的反馈组件。

## 如何快速解决你的问题？

[提问的智慧](https://lug.ustc.edu.cn/wiki/doc/smart-questions/)，可以帮助你快速提出正确的问题，获得更快的解答。

## 关于我们

**如果您的问题不在上述列表中或您有更好的建议，请联系我们 [Moonofweisheng](https://github.com/wot-ui/wot-ui)**

---

---
url: 'https://v2.wot-ui.cn/guide/quick-use.md'
---
# 快速上手

本节介绍如何在 `uni-app` 项目中安装、配置并使用 `Wot UI`。

## 使用之前

使用前，请确保你已经学习过 Vue 官方的 [快速上手](https://cn.vuejs.org/guide/quick-start.html) 和 uni-app 提供的 [学习路线](https://uniapp.dcloud.net.cn/resource.html)。

## 安装

:::warning 关于安装

`Wot UI` 提供了 `uni_modules` 和 `npm` 两种安装方式，按需选择。

* 使用`uni_modules`安装无需额外配置，即插即用，但是每次更新组件库需要处理代码差异（一般直接覆盖就可以）。
* 使用`npm`安装需要额外配置，更新组件库时无需处理代码差异。

:::

### npm 安装

::: code-group

```bash [npm]
npm i @wot-ui/ui
```

```bash [yarn]
yarn add @wot-ui/ui
```

```bash [pnpm]
pnpm add @wot-ui/ui
```

:::

### uni\_modules 安装

`Wot UI` 支持 [uni\_modules](https://uniapp.dcloud.net.cn/plugin/uni_modules.html#uni-modules) 规范，已经上架到 uni-app 的插件市场。

在 `uni-app 插件市场` 选择使用 `HBuildX` 导入，或者选择手动在 src 目录下创建 uni\_modules 文件夹并将 `Wot UI` 解压到 uni\_modules 中，结构如下：

```bash
- uni_modules
- - - wot-ui 
```

下载地址：wot-ui

## Sass

`Wot UI` 依赖 `sass`，且 `sass` 版本要求高于 `1.78`，推荐使用 `1.98` 及以上版本。因此在使用之前需要确认项目中是否已经安装了符合版本要求的 `sass`，如果没有安装，可以通过以下命令进行安装：

::: code-group

```bash [npm]
npm i sass@^1.98.0 -D
```

```bash [yarn]
yarn add sass@^1.98.0 -D
```

```bash [pnpm]
pnpm add sass@^1.98.0 -D
```

:::

如果遇到编译或开发时抛出以下警告：

```sh
Deprecation Warning [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
```

可以在 `vite.config.ts` 中这样做：

```ts
export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
  // ...
})
```

`Sass` 废弃了大批 API，而 `uni-app` 仍然在使用这些 API，导致警告的抛出。

## 配置

### 导入组件

::: tip 提醒
使用 `uni_modules` 安装时 `Wot UI` 的组件天然支持 `easycom` 规范，无需额外配置就可以自动引入组件，而使用 `npm 安装` 需按照此步骤配置，以下两种方案二选一即可。
:::

#### 基于 vite 配置自动引入组件方案 1

如果不你不喜欢用 `easycom`，可以通过 [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components) 实现组件的自动引入。

:::tip 提醒

* 如果使用此方案时控制台打印很多 `Sourcemap for  points to missing source files​` ，可以尝试将 `Vite` 版本升级至 `4.5.x` 以上版本。

:::

::: code-group

```bash [npm]
npm i @uni-helper/vite-plugin-uni-components -D
```

```bash [yarn]
yarn add @uni-helper/vite-plugin-uni-components -D
```

```bash [pnpm]
pnpm add @uni-helper/vite-plugin-uni-components -D
```

:::

::: code-group

```ts [wot-ui-resolver.ts]
import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'

import { kebabCase } from '@uni-helper/vite-plugin-uni-components'

export function WotResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Wd[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `@wot-ui/ui/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}

```

```ts [vite.config.ts]
// vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@/resolvers/wot-ui-resolver'


export default defineConfig({
  plugins: [
    // make sure put it before `Uni()`
    Components({
    resolvers: [WotResolver()]
  }), uni()],
});
```

:::

如果你使用 `pnpm` ，请在根目录下创建一个 `.npmrc` 文件，参见 [Issue](https://github.com/antfu/unplugin-vue-components/issues/389)。

```text
// .npmrc
public-hoist-pattern[]=@vue*
// or
// shamefully-hoist = true
```

#### 配置 easycom 自动引入组件方案 2

传统 vue 组件，需要安装、引用、注册，三个步骤后才能使用组件。`easycom`将其精简为一步。\
只要组件路径符合规范（具体见[easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)），就可以不用引用、注册，直接在页面中使用。

:::tip 提醒

* uni-app 考虑到编译速度，直接在 `pages.json` 内修改 `easycom` 不会触发重新编译，需要改动页面内容触发。
* 请确保您的 `pages.json` 中只有一个 `easycom` 字段，否则请自行合并多个引入规则。

:::

```JSON
// pages.json
{
 "easycom": {
  "autoscan": true,
  "custom": {
    "^wd-(.*)": "@wot-ui/ui/components/wd-$1/wd-$1.vue"
  }
 },
 
 // 此为本身已有的内容
 "pages": [
  // ......
 ]
}
```

## Volar 支持

如果您使用 `Volar`，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

:::tip
cli 项目使用 `uni_modules` 安装无需配置，对 `Volar` 的支持自动生效，`HbuildX` 项目不支持此配置，故此步骤仅在 `cli` 项目使用 `npm` 安装时需要配置。
:::

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@wot-ui/ui/global"]
  }
}
```

## 使用

`Wot UI` 安装、配置完成之后，支持组件自动引入，故可以直接在 SFC 中使用，无需在页面内 import，也不需要在 components 内声明，即可在任意页面使用。值得注意的是，`uni-app` 平台不支持全局挂载组件，所以 `Message`、`Toast` 等组件仍需在 SFC 中显式使用，例如：

```html
<wd-toast></wd-toast>
```

## 脚手架

我们提供了快速上手项目 [wot-starter](https://github.com/wot-ui/wot-starter)，它集成了 `Wot UI` 和众多优秀插件，你可以直接克隆该项目。

你也可以使用[create-uni](https://github.com/uni-helper/create-uni)，通过以下命令快速创建一个起手项目：

```bash
pnpm create uni@latest -t wot-starter-v2 <你的项目名称>
```

更多脚手架与模板，请参见[脚手架与模板](./templates.html)。

---

---
url: 'https://v2.wot-ui.cn/guide/custom-style.md'
---
# 样式覆盖

通过本章节，你可以学习到使用 Wot UI 时，如何有效地覆盖组件的默认样式。

## 使用外部样式类

我们开放了大量的外部样式类供开发者使用，例如：`custom-style` 和 `custom-class`，具体的样式类名称可查阅对应组件文档。

使用时，直接将自定义的类名传递给对应的外部样式类属性即可：

```vue
<wd-button custom-class="custom-button" type="primary">主要按钮</wd-button>
```

```scss
/* 组件样式 */
:deep(.custom-button) {
  color: red !important;
}
```

## 页面级样式覆盖

在页面中使用 Wot UI 组件时，可直接在页面的样式文件中覆盖样式。

`Wot UI` 的组件通常在最外层或关键节点带有以 `wd-` 开头的特征类名。如果你在没有使用 `scoped` 的普通样式块中，可以直接通过类名覆盖样式：

```vue
<wd-button type="primary">主要按钮</wd-button>
```

```scss
/* 页面样式（非 scoped） */
.wd-button {
  color: red !important;
}
```

如果你在使用了 `scoped` 的样式块中，则需要通过 `:deep()` 伪类穿透组件来进行样式覆盖：

```vue
<wd-button type="primary">主要按钮</wd-button>
```

```scss
/* 页面样式（scoped） */
:deep(.wd-button) {
  color: red !important;
}
```

### 深入理解 :deep()

在多数情况下，直接使用类名即可覆盖样式。但是，如果你在**你自己的页面中**使用了 `scoped` 样式，那么你的 CSS 只会影响当前页面的元素。如果你想在 `scoped` 样式中影响到子组件（即 Wot UI 组件），就需要使用 `:deep()` 伪类：

```css
<style scoped>
.my-page :deep(.wd-button) {
  color: red !important;
}
</style>
```

上面的代码会被编译成类似这样（附带 data 属性）：

```css
.my-page[data-v-f3f3eg9] .wd-button {
  color: red !important;
}
```

详细可见 [单文件组件 CSS 功能](https://cn.vuejs.org/api/sfc-css-features.html#sfc-css-features)。

## 解除自定义组件样式隔离

如果你在**自己编写的自定义组件**中使用了 Wot UI 组件，并且想要在自定义组件内覆盖 Wot 组件的样式，那么你可能会发现样式不生效。

这是因为在小程序环境中，自定义组件默认开启了样式隔离。你需要显式地解除这一限制：开启 `styleIsolation: 'shared'` 选项。

```vue
<wd-button type="primary">主要按钮</wd-button>
```

**Vue 3.3+ 的配置方式：**
通过 `defineOptions` 宏：

```ts
<script lang="ts" setup>
defineOptions({
  options: {
    styleIsolation: 'shared'
  }
})
</script>
```

**Vue 3.2 及以下版本的配置方式：**

```ts
// vue
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
// ... 其他逻辑
</script>
```

开启 `shared` 后，你就可以在你的组件样式中覆盖 Wot 组件了：

```scss
/* 组件样式 */
:deep(.wd-button) {
  color: red !important;
}
```

## 使用 CSS 变量

我们为所有的组件都开放了基于 CSS 变量（CSS Variables）的定制方案。

相较于上面介绍的通过类名或穿透强制覆盖，这种方案更加优雅，支持在页面或应用级别对多个组件的样式做批量修改，以进行主题样式的定制。

当然，用它来修改单个组件的部分样式也是绰绰有余的：

```vue
<template>
  <view class="custom-theme-wrapper">
    <wd-button type="primary">主要按钮</wd-button>
  </view>
</template>

<style>
.custom-theme-wrapper {
  /* 覆盖按钮的主要背景色 */
  --wot-button-primary-bg: pink;
}
</style>
```

关于所有的 CSS 变量清单以及更深入的主题定制指南，请查阅 [定制主题](./custom-theme.md)。

## 特定平台样式穿透失效

在一些特定的平台（如支付宝小程序）版本更新中，可能会改变默认的样式隔离策略，导致原有的样式穿透失效。

例如，uni-app 在 `3.99.2023122704` 版本将支付宝小程序的 `styleIsolation` 默认值设置为了 `apply-shared`，而支付宝小程序原默认的 `styleIsolation` 为 `shared`，导致遮罩层等组件的样式穿透无法生效。

**解决办法：**
在项目根目录的 `manifest.json` 中强制将 `styleIsolation` 设为 `shared`。

```json
{
  // ...
  "mp-alipay": {
    // ...
    "styleIsolation": "shared"
    // ...
  }
  // ...
}
```

---

---
url: 'https://v2.wot-ui.cn/guide/templates.md'
---
# 模板

有非常多的优秀模板选择了 Wot UI 作为基础组件库，这里选取几个典型模板，方便你根据项目需求进行选择。

## wot-starter

🍀 [wot-starter](https://github.com/wot-ui/wot-starter) 是一个基于 [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) 深度整合 `Wot UI` 组件库的 `uni-app` 快速起手项目。它由 `Wot UI` 团队维护，告别 `HBuilderX`，拥抱现代前端开发工具链。

你也可以结合 [脚手架](/guide/cli) 中的 `create-uni` 直接创建该模板：

```bash
pnpm create uni <project-name> -t wot-starter-v2
```

在 VS Code 中打开项目文件夹：

```bash
code <project-name>
```

安装依赖：

```bash
pnpm install
```

运行项目：

```bash
pnpm dev
```

## vitesse-uni-app

[vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) 是一个由 `Vite & uni-app` 驱动的跨端快速启动模板，背靠 `Uni Helper` 团队。虽然没有深度整合 Wot UI，但它是一个很干净的现代化基础模板。

## unibest

[unibest](https://github.com/unibest-tech/unibest) 使用了较新的前端技术栈，无需依靠 `HBuilderX`，通过命令行方式运行，内置大量基础功能，并可选择接入 `Wot UI`。

## 更多模板

如果你正在开发整合 `Wot UI` 的 `uni-app` 模板，也欢迎发送邮件到 `1780903673@qq.com`，维护者会评估后加入列表。

| 模板 | Stars | 描述 |
|------|-------|-------------|
| [wot-starter](https://github.com/wot-ui/wot-starter) | ![stars](https://img.shields.io/github/stars/wot-ui/wot-starter) | 🍀 基于 vitesse-uni-app 深度整合 Wot UI 组件库的 uni-app 快速起手项目。 |
| [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) | ![stars](https://img.shields.io/github/stars/uni-helper/vitesse-uni-app) | 由 Vite & uni-app 驱动的跨端快速启动模板。 |
| [unibest](https://github.com/unibest-tech/unibest) | ![stars](https://img.shields.io/github/stars/unibest-tech/unibest) | 使用较新技术栈的 uni-app 开发模板。 |
| [vite-uniapp-template](https://github.com/viarotel-org/vite-uniapp-template) | ![stars](https://img.shields.io/github/stars/viarotel-org/vite-uniapp-template) | 以实用为先的 uni-app 起手模板。 |
| [uni-plus](https://github.com/DaMaiCoding/uni-plus) | ![stars](https://img.shields.io/github/stars/DaMaiCoding/uni-plus) | 一个注重开发体验的 uni-app 模板。 |
| [uniez-template](https://github.com/zhe-qi/uniez-template) | ![stars](https://img.shields.io/github/stars/zhe-qi/uniez-template) | 一个“功能”和“开发体验”优先的 uni-app 模板。 |
| [snail-uni](https://github.com/hu-snail/snail-uni) | ![stars](https://img.shields.io/github/stars/hu-snail/snail-uni) | 面向开发者的 UniApp 框架模板。 |

---

---
url: 'https://v2.wot-ui.cn/guide/dark-mode.md'
---
# 深色模式

我们内置了对深色模式的支持，开发者只需进行简单的配置即可在项目中使用，官网右上角可以切换至深色模式进行体验。

## 开启深色模式

通过 `wd-config-provider` 组件包裹应用或页面入口，并将 `theme` 设置为 `dark`，可以让当前 `wd-config-provider` 包裹范围内的 Wot 组件切换为深色风格。

::: warning 注意
使用深色模式前，需要在入口文件（如 `App.vue`）中引入主题变量文件：

* npm 安装：`@use '@wot-ui/ui/styles/theme/index.scss' as *;`
* uni\_modules 安装：`@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;`
  :::

::: code-group

```html [vue]
<wd-config-provider theme="dark">
  <wd-button type="primary">深色模式按钮</wd-button>
</wd-config-provider>
```

```scss [App.vue - npm]
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```

```scss [App.vue - uni_modules]
/* App.vue */
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```

:::

## 更多功能

参见 [ConfigProvider](/component/config-provider) 组件。

---

---
url: 'https://v2.wot-ui.cn/guide/cli.md'
---
# 脚手架

通过本章节你可以了解如何使用 [create-uni](https://github.com/uni-helper/create-uni) 脚手架快速创建集成了 `Wot UI` 的 `uni-app` 项目。

## create-uni

我们推荐使用 [create-uni](https://github.com/uni-helper/create-uni) 创建项目，它支持一键创建集成 Wot UI 的基础项目。使用以下命令：

```bash
pnpm create uni <你的项目名称> --ts -m pinia -u wot2 -e
```

将会完成以下工作：

* 创建一个 TypeScript 项目
* 集成 Pinia 状态管理
* 自动配置 WotUI 组件库
* 添加 ESLint 支持

更多信息请参见 [create-uni](https://github.com/uni-helper/create-uni)。

## 下一步

如果你希望直接从现成项目模板开始，可以继续查看 [模板](/guide/templates)。

---

---
url: 'https://v2.wot-ui.cn/guide/design.md'
---
# 设计价值观

## 从何而来

为了适应移动端跨端开发，为开发者带来一致的开发体验，我们建立了一套可践行的设计价值观，以提升产品体验一致性、开发设计调用的便利性。

## 价值观简谈

基于此诞生背景，我们的价值观可分为四个部分：归一、务实、开放、友好，此价值观环环相扣，以跨端归一为基础，以务实效率为核心，以稳定可扩展为架构，以主题热切换为体验，以工程化友好为协作标准，打造企业级 uni-app 移动端通用组件体系。

### 归一

一套组件，全端行为一致，内部抹平平台差异，对外提供完全统一的 API、交互、样式、事件，严格遵循 Design Token，拥有清晰一致的icon规则，信息传达稳定直观。

### 务实

提供高效简洁的界面，无冗余功能与装饰，密度可控，复用性强。

### 开放

组件开放但不失控、灵活但不混乱。采用三层可控架构原子层-语义层-组件配置层；逐层增加可定义范围，适合多业务线协作，共用底层、各自定制上层。

### 友好

符合用户体验友好和使用友好，深度适配 uni-app 工程化，设计与前端团队开箱即用、易维护、可协作。