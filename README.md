[README.md](https://github.com/user-attachments/files/27511484/README.md)
# 🏀 桌面 IKUN 宝

一个有趣的桌面宠物应用，展示 IKUN 形象并支持运球动画互动。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Electron](https://img.shields.io/badge/Electron-28.0.0-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-purple)

## ✨ 功能特性

- 🖼️ **桌面宠物展示**：可爱的 IKUN 形象显示在桌面右上角
- 🏀 **运球动画**：静态和动态两种显示模式，交替显示图片形成打篮球动画
- 🎮 **多种激活方式**：支持鼠标点击或键盘敲击激活动画
- 📊 **运球统计**：记录并统计今日、本周、本月、本年及历史总运球次数
- 🔊 **音效支持**：可开启/关闭运球音效
- 🌐 **全局监听**：支持全局键盘监听模式
- 🎯 **系统托盘**：右键托盘图标提供丰富的操作选项

## 🛠️ 技术栈

- **框架**: Electron 28.0.0
- **构建工具**: electron-builder 24.9.1
- **全局钩子**: uiohook-napi 1.5.5
- **前端**: HTML5 + CSS3 + JavaScript

## 📦 安装说明

### 环境要求

- Node.js 16.x 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/yourusername/ikun-baby.git
cd ikun-baby

# 安装依赖
npm install

# 启动开发模式
npm start
```

## 🚀 使用说明

### 基本操作

1. 启动应用后，桌面右上角会显示宠物图标
2. 点击宠物或按任意键触发运球动画
3. 右键托盘图标查看更多选项

### 托盘菜单功能

- 🏀 查看运球统计：显示统计数据面板
- 🌐 全局运球：开启/关闭全局键盘监听
- 🔊 音效：开启/关闭运球音效
- 🖼️ 显示宠物：显示宠物窗口
- 🙈 隐藏宠物：隐藏宠物窗口
- ❌ 退出：关闭应用程序

### 快捷键

- `Ctrl+Shift+I` (Windows) / `Cmd+Shift+I` (macOS)：打开开发者工具

## 📊 统计面板

点击托盘菜单中的"查看运球统计"，可查看：
- 今日运球次数
- 本周运球次数
- 本月运球次数
- 本年运球次数
- 历史总运球次数

## 🏗️ 项目结构

```
ikun-baby/
├── main.js              # Electron 主进程
├── renderer.js          # 渲染进程脚本
├── package.json         # 项目配置
├── images/              # 图片资源
│   ├── 1.png            # 静态姿势
│   └── 2.png            # 动态姿势
├── audio/               # 音效资源
│   └── 篮球1.mp3        # 运球音效
├── index.html           # 主页面
├── settings.html        # 设置页面
└── stats.html           # 统计页面
```

## 🔨 构建发布

```bash
# 清理构建目录
npm run clean

# Windows 构建
npm run build:win

# macOS 构建
npm run build:mac
```

构建完成后，可执行文件位于 `dist-v1.5` 目录下。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👤 作者

Your Name

## 🙏 致谢

- Electron 团队
- 所有开源贡献者
