# 桌面ikun宠物 - 实现计划

## [x] Task 1: 初始化Electron项目结构
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 创建package.json配置文件
  - 安装Electron和electron-builder依赖
  - 设置项目基本结构
- **Acceptance Criteria Addressed**: [AC-7]
- **Test Requirements**:
  - `programmatic` TR-1.1: package.json存在且包含正确的脚本和依赖
  - `programmatic` TR-1.2: npm install能成功安装所有依赖
- **Notes**: 使用npm作为包管理器

## [x] Task 2: 创建主进程(main.js)
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 创建主进程文件
  - 配置无边框窗口，设置透明背景
  - 设置窗口初始位置在桌面右上角
  - 允许窗口拖拽移动
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgment` TR-2.1: 应用启动后窗口显示在桌面右上角
  - `human-judgment` TR-2.2: 窗口无标题栏，可拖拽移动
- **Notes**: 使用frameless-window和transparent选项

## [x] Task 3: 创建渲染进程(index.html)和样式
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 创建index.html页面
  - 添加img标签显示宠物图片
  - 设置样式使图片居中显示，背景透明
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgment` TR-3.1: 静态状态下显示1.png
  - `human-judgment` TR-3.2: 图片居中显示，无多余边框
- **Notes**: 使用内联CSS保持简洁

## [x] Task 4: 实现动画逻辑(renderer.js)
- **Priority**: P0
- **Depends On**: Task 3
- **Description**: 
  - 实现静态显示1.png
  - 实现动画序列：1.png -> 2.png -> 1.png
  - 处理鼠标点击事件激活动画
  - 处理键盘事件激活动画
- **Acceptance Criteria Addressed**: [AC-2, AC-3, AC-4]
- **Test Requirements**:
  - `human-judgment` TR-4.1: 点击宠物可触发动画
  - `human-judgment` TR-4.2: 键盘任意键可触发动画
  - `human-judgment` TR-4.3: 动画播放完成后恢复静态
- **Notes**: 使用setTimeout控制动画帧间隔

## [x] Task 5: 实现统计数据存储和查询
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 
  - 创建stats.js模块处理统计数据
  - 动画完成后记录运球次数
  - 实现按日/周/月/年统计查询函数
  - 使用localStorage或文件存储数据
- **Acceptance Criteria Addressed**: [AC-5, AC-6]
- **Test Requirements**:
  - `programmatic` TR-5.1: 每次动画完成后数据+1
  - `programmatic` TR-5.2: 日/周/月/年统计函数返回正确结果
  - `programmatic` TR-5.3: 数据持久化存储，重启后数据不丢失
- **Notes**: 使用Node.js的fs模块写入JSON文件存储

## [x] Task 6: 打包配置和构建
- **Priority**: P1
- **Depends On**: Task 1-5
- **Description**: 
  - 配置electron-builder
  - 设置图标和资源路径
  - 构建Windows exe和macOS dmg安装包
- **Acceptance Criteria Addressed**: [AC-7]
- **Test Requirements**:
  - `human-judgment` TR-6.1: 成功生成dist目录
  - `human-judgment` TR-6.2: exe文件可正常运行
  - `human-judgment` TR-6.3: dmg文件可正常安装运行
- **Notes**: 需要在对应平台构建对应格式

## [x] Task 7: 资源整理
- **Priority**: P2
- **Depends On**: Task 1
- **Description**: 
  - 将图片资源复制到项目目录
  - 确保打包时资源正确包含
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4]
- **Test Requirements**:
  - `human-judgment` TR-7.1: 图片资源正确加载显示
- **Notes**: 使用copy-webpack-plugin或extraResources配置
