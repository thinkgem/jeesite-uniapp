<p align="center">
    <img alt="JeeSite" src="https://jeesite.com/assets/images/logo.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin:30px 0 30px;font-weight:bold;font-size:30px;">快速开发平台 - 手机端 Uni-App</h3>

## 引言

JeeSite Mobile Uni-App 基于最新的前端技术栈 uni-app + Vue 3 + TypeScript + Vite + UnoCSS 架构，使用 unibest 模版初始化，并集成 wot-ui-v2 组件库。本项目不强制依赖 HBuilderX，支持通过命令行方式运行 Web、小程序和 App 应用（推荐使用 VSCode 或 WebStorm 作为集成开发环境）。

JeeSite 内置了约定式路由、Layout 布局、请求封装、请求拦截、登录拦截、UnoCSS 原子化样式、i18n 多语言等核心功能，并提供代码智能提示、自动格式化、统一配置管理、代码片段等开发辅助工具，大幅提升开发效率。

## 特性

* 使用 TS + Vite + Vue3 + uni-app 一端开发，多端发布。
* 支持 H5，Android，iOS，鸿蒙，微信小程序等其它小程序平台。
* 封装移动端 Token 会话环境的，自动完成会话管理，有框架帮你完成。
* Wot-UI 提供 80+ 高质量组件，功能丰富，多端兼容，让您快速集成，开箱即用。
* 常用组件：下拉框、树选择、复选框、单选框、日期、图标、多语言、文件上传。
* 众多贴心的 TS 利器，让您飞镖在手，召之即来，百步穿杨。
* 众多的常用页面和布局，让您专注逻辑，事半功倍。
* 合理使用 style 的 scoped 减少包体积大小。
* 详尽的文档支持，现代化的演示效果。
* 按需引入，精简打包体积。
* 移动端完整开源。

## 功能列表

* 账号登录、记住我（下次免登录）
* 自助服务：找回密码功能、账号注册功能
* 我的主页：修改个人信息、修改头像和裁剪、修改密码
* 辅助功能：关于我们、意见反馈、检查更新、帮助中心
* 工作台功能列表主页、消息列表页面
* 增删改查示例
* 工作流引擎

## 快速体验

1、H5 APP 端访问地址：<a href="https://demo.jeesite.com/app" target="blank">https://demo.jeesite.com/app</a> （最新演示）
<br>&nbsp; &nbsp; &nbsp; 获得H5最佳体验，操作方法：Chrome 为例，在浏览器上按 F12 打开“开发者工具”，点击该工具左上角第二个按钮
“Toggle device toolbar”，显示“切换设备工具栏”，然后在该工具栏上点击“Responsive”下拉选择“iPhone6/7/8”，再按“F5”刷新页面，即可。

2、微信小程序端：通过**微信**扫码（最佳体验，但不是最新演示，更新延迟）<br><br>
<img src="https://jeesite.com/assets/images/wx_app.jpg" width="220" height="220" >

3、安卓 Android 安装包，点击下载：[JeeSite.apk](https://gitee.com/thinkgem/jeesite5/attach_files)

## 本地运行

- 执行 `pnpm i` 安装依赖
- Web H5：`pnpm dev:h5`, 然后打开 <http://localhost:9000>。
- 微信小程序：`pnpm dev:mp` 然后打开微信开发者工具，导入本地文件夹，选择本项目的`dist/dev/mp-weixin` 文件。
- APP 平台：`pnpm dev:app`, 然后打开 `HBuilderX`，导入刚刚生成的`dist/dev/app` 文件夹，选择运行到模拟器(开发时优先使用)，或者运行的安卓/ios基座。(如果是 `安卓` 和 `鸿蒙` 平台，则不用这个方式，可以把整个项目导入到 HBuilderX，通过 HBuilderX 的菜单来运行到对应的平台。)

### 本地环境

- Node.js -- >=v22.13.0
- Pnpm -- >=10.11.0
- VSCode -- 可选其他 IDE ：Trae、Lingma、Cursor、WebStorm 等
- HBuilderX -- APP 的运行和发布离不开它
- Git -- 必须有 git，否则 husky 会报错

## 应用发布

- Web H5：`pnpm build:h5`，打包后的文件在 `dist/build/h5`，可以放到web服务器，如nginx运行。如果最终不是放在根目录，可以在 `manifest.config.ts` 文件的 `h5.router.base` 属性进行修改。
- 微信小程序：`pnpm build:mp`, 打包后的文件在 `dist/build/mp-weixin`，然后通过微信开发者工具导入，并点击右上角的“上传”按钮进行上传。
- APP 平台：`pnpm build:app`, 然后打开 `HBuilderX`，导入刚刚生成的`dist/build/app` 文件夹，选择发行 - APP云打包。(如果是 `安卓` 和 `鸿蒙` 平台，则不用这个方式，可以把整个项目导入到 HBuilderX，通过 HBuilderX 的菜单来发行到对应的平台。)

## 学习路线

1. <a href="https://uniapp.dcloud.io/README" target="blank">什么是 uni-app、为什么选择 uni-app</a>
2. <a href="https://code.visualstudio.com/" target="blank">集成开发环境 VSCode 下载</a>
3. <a href="https://www.dcloud.io/hbuilderx.html" target="blank">集成开发环境 HBuilderX 下载</a>
4. <a href="https://uniapp.dcloud.net.cn/tutorial/vue3-basics.html" target="blank">uni-app vue 3 文档教程</a>

## 学习文档

1. <a href="https://jeesite.com/docs/" target="blank">JeeSite 平台文档</a>
2. <a href="https://uniapp.dcloud.io/collocation/pages" target="blank">uni-app 框架文档</a>
3. <a href="https://unibest.tech/base/1-introduction" target="blank">unibast 框架文档</a>
4. <a href="https://wot-ui.cn/guide/introduction.html" target="blank">Wot UI 2.x 文档</a>

## 授权许可协议条款

1. 基于 Apache License Version 2.0 协议发布，可用于商业项目，但必须遵守以下补充条款。
2. 不得将本软件应用于危害国家安全、荣誉和利益的行为，不能以任何形式用于非法为目的的行为。
3. 在延伸的代码中（修改和有源代码衍生的代码中）需要带有原来代码中的协议、版权声明和其他原作者
   规定需要包含的说明（请尊重原作者的著作权，不要删除或修改文件中的`Copyright`和`@author`信息）
   更不要全局替换源代码中的 jeesite 或 ThinkGem 等字样，否则你将违反本协议条款承担责任。
4. 基于本软件完成的软件作品，只能使用 JeeSite 作为后台服务，除外情况不允许二次分发或开源。
5. 您若套用本软件的一些代码或功能参考，请保留源文件中的版权和作者，需要在您的软件介绍明显位置
   说明出处，举例：本软件基于 JeeSite 快速开发平台-手机端，并附带链接：http://jeesite.com
6. 任何基于本软件而产生的一切法律纠纷和责任，均于我司无关。
7. 如果你对本软件有改进，希望可以贡献给我们，共同进步。
8. 本项目已申请软件著作权，请尊重开源，感谢阅读。

## 技术支持与服务

* 本软件免费，我们也提供了相应的收费服务，因为：
* 没有资金的支撑就很难得到发展，特别是一个好的产品，如果 JeeSite 帮助了您，请为我们点赞。支持我们，您可以获得更多回馈，我们会把公益事业做的更好，开放更多资源，回报社区和社会。请给我们一些动力吧，在此非常感谢已支持我们的朋友！
* **联系我们**：请访问技术支持与服务页面：<http://s.jeesite.com> 

## 专业版增加的功能

1. 工作流程办理
2. 文件上传秒传
3. 微信小程序登录
4. 语言国际化、本地化
