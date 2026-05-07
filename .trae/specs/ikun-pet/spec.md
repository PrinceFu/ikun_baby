# 桌面ikun宠物 - 产品需求文档

## Overview
- **Summary**: 一个桌面宠物应用，展示ikun形象。静态时显示1.png，动态时交替显示1.png和2.png形成打篮球的动画效果。支持鼠标点击和键盘敲击激活动画，并提供日/周/月/年的运球次数统计。
- **Purpose**: 为用户提供一个有趣的桌面宠物体验，让用户可以与ikun互动。
- **Target Users**: 喜欢ikun文化的用户，寻求桌面趣味小工具的用户。

## Goals
- 创建一个桌面悬浮宠物应用
- 支持静态和动态两种显示模式
- 实现鼠标点击和键盘敲击激活动画
- 记录并统计运球次数（日/周/月/年）
- 打包成exe和dmg格式的可执行文件

## Non-Goals (Out of Scope)
- 音效功能（用户后期自行添加）
- 宠物移动功能
- 复杂的交互功能

## Background & Context
- 用户已提供两张图片资源：1.png（持球姿势）和2.png（运球姿势）
- 需要使用Electron框架来创建跨平台桌面应用
- 使用本地存储来保存统计数据

## Functional Requirements
- **FR-1**: 静态显示模式下，宠物显示1.png
- **FR-2**: 动态激活时，交替显示1.png -> 2.png -> 1.png，形成打篮球动画
- **FR-3**: 鼠标靠近并点击时激活动画
- **FR-4**: 键盘任意按键敲击时激活动画
- **FR-5**: 记录每次动画激活作为一次运球
- **FR-6**: 支持按日、周、月、年统计运球次数

## Non-Functional Requirements
- **NFR-1**: 应用启动后自动显示在桌面右上角
- **NFR-2**: 窗口无标题栏，支持拖拽移动
- **NFR-3**: 动画流畅，切换无卡顿
- **NFR-4**: 统计数据持久化存储

## Constraints
- **Technical**: 使用Electron + Node.js + HTML/CSS/JavaScript
- **Business**: 无预算限制，用户给予最高权限
- **Dependencies**: Electron、electron-builder（打包工具）

## Assumptions
- 用户已提供两张PNG格式的图片资源
- 用户使用Windows或macOS系统
- 用户熟悉基本的桌面应用操作

## Acceptance Criteria

### AC-1: 静态显示
- **Given**: 应用启动完成
- **When**: 无用户交互
- **Then**: 显示1.png图片
- **Verification**: `human-judgment`

### AC-2: 鼠标点击激活动画
- **Given**: 鼠标悬停在宠物上
- **When**: 用户点击宠物
- **Then**: 播放动画（1.png -> 2.png -> 1.png）
- **Verification**: `human-judgment`

### AC-3: 键盘敲击激活动画
- **Given**: 应用处于活动状态
- **When**: 用户敲击任意键盘按键
- **Then**: 播放动画（1.png -> 2.png -> 1.png）
- **Verification**: `human-judgment`

### AC-4: 动画完成后恢复静态
- **Given**: 动画正在播放
- **When**: 动画播放完毕（三帧完成）
- **Then**: 恢复显示1.png
- **Verification**: `human-judgment`

### AC-5: 运球次数统计
- **Given**: 用户激活动画
- **When**: 动画播放完成
- **Then**: 运球次数+1，数据持久化存储
- **Verification**: `programmatic`

### AC-6: 多维度统计查询
- **Given**: 用户查看统计数据
- **When**: 请求日/周/月/年统计
- **Then**: 返回对应时间范围内的运球次数
- **Verification**: `programmatic`

### AC-7: 打包成可执行文件
- **Given**: 应用开发完成
- **When**: 执行打包命令
- **Then**: 生成exe（Windows）和dmg（macOS）文件
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要提供查看统计数据的UI界面？
- [ ] 是否需要设置动画播放的速度参数？
