const { ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs')

const pet = document.getElementById('pet')
const statsPanel = document.getElementById('stats-panel')
const closeBtn = document.getElementById('close-stats')
let isAnimating = false
let statsFilePath = ''
let globalDribbleEnabled = false
let soundEnabled = true
let animationFrameId = null
let pendingAnimation = false
let animationQueue = []

const imagePath = path.join(__dirname, 'images')
const image1 = `file://${path.join(imagePath, '1.png')}`
const image2 = `file://${path.join(imagePath, '2.png')}`

const ANIMATION_DELAY = 100

let audioContext = null

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
}

function playDribbleSound() {
  if (!soundEnabled) return
  
  initAudioContext()
  
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.1)
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.15)
}

function playBounceSound() {
  if (!soundEnabled) return
  
  initAudioContext()
  
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.08)
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

async function initStatsFilePath() {
  try {
    statsFilePath = path.join(await ipcRenderer.invoke('getUserDataPath'), 'stats.json')
    console.log('Stats file path:', statsFilePath)
  } catch (e) {
    console.error('Failed to get user data path:', e)
    statsFilePath = path.join(__dirname, 'stats.json')
  }
}

async function initGlobalDribble() {
  try {
    globalDribbleEnabled = await ipcRenderer.invoke('getGlobalDribble')
    console.log('Global dribble enabled:', globalDribbleEnabled)
  } catch (e) {
    console.error('Failed to get global dribble setting:', e)
  }
}

function loadStats() {
  try {
    if (fs.existsSync(statsFilePath)) {
      const data = fs.readFileSync(statsFilePath, 'utf8')
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('Failed to load stats:', e)
  }
  return { records: [] }
}

function saveStats(stats) {
  try {
    fs.writeFileSync(statsFilePath, JSON.stringify(stats, null, 2))
    console.log('Stats saved:', statsFilePath)
  } catch (e) {
    console.error('Failed to save stats:', e)
  }
}

function recordDribble() {
  const stats = loadStats()
  const now = new Date()
  const record = {
    date: now.toISOString().split('T')[0],
    timestamp: now.getTime()
  }
  stats.records.push(record)
  saveStats(stats)
  console.log('Dribble recorded! Total today:', getTodayStats())
}

function getTodayStats() {
  const stats = loadStats()
  const today = new Date().toISOString().split('T')[0]
  return stats.records.filter(r => r.date === today).length
}

function getWeekStats() {
  const stats = loadStats()
  const now = new Date()
  const dayOfWeek = now.getDay() || 7
  const monday = new Date(now)
  monday.setDate(now.getDate() - dayOfWeek + 1)
  monday.setHours(0, 0, 0, 0)
  return stats.records.filter(r => new Date(r.timestamp) >= monday).length
}

function getMonthStats() {
  const stats = loadStats()
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  return stats.records.filter(r => new Date(r.timestamp) >= firstDay).length
}

function getYearStats() {
  const stats = loadStats()
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), 0, 1)
  return stats.records.filter(r => new Date(r.timestamp) >= firstDay).length
}

function getTotalStats() {
  const stats = loadStats()
  return stats.records.length
}

function updateStatsDisplay() {
  document.getElementById('stat-today').textContent = getTodayStats()
  document.getElementById('stat-week').textContent = getWeekStats()
  document.getElementById('stat-month').textContent = getMonthStats()
  document.getElementById('stat-year').textContent = getYearStats()
  document.getElementById('stat-total').textContent = getTotalStats()
}

function showStatsPanel() {
  updateStatsDisplay()
  statsPanel.style.display = 'block'
}

function hideStatsPanel() {
  statsPanel.style.display = 'none'
}

function playAnimation() {
  if (isAnimating) {
    pendingAnimation = true
    return
  }
  
  isAnimating = true
  console.log('Playing animation...')
  
  playDribbleSound()
  pet.src = image1
  
  setTimeout(() => {
    playBounceSound()
    pet.src = image2
    console.log('Frame 2')
  }, ANIMATION_DELAY)
  
  setTimeout(() => {
    playDribbleSound()
    pet.src = image1
    isAnimating = false
    recordDribble()
    console.log('Animation completed')
    
    if (pendingAnimation) {
      pendingAnimation = false
      setTimeout(() => {
        playAnimation()
      }, 50)
    }
  }, ANIMATION_DELAY * 2)
}

pet.addEventListener('click', function(e) {
  e.preventDefault()
  console.log('Pet clicked!')
  playAnimation()
})

closeBtn.addEventListener('click', function(e) {
  e.preventDefault()
  e.stopPropagation()
  hideStatsPanel()
})

document.addEventListener('contextmenu', function(e) {
  e.preventDefault()
})

ipcRenderer.on('show-stats', () => {
  showStatsPanel()
})

ipcRenderer.on('global-dribble-change', (event, enabled) => {
  globalDribbleEnabled = enabled
  console.log('Global dribble changed to:', enabled)
})

ipcRenderer.on('sound-toggle', (event, enabled) => {
  soundEnabled = enabled
  console.log('Sound enabled:', enabled)
})

ipcRenderer.on('keypress', () => {
  console.log('Key pressed detected! Global enabled:', globalDribbleEnabled)
  if (globalDribbleEnabled) {
    playAnimation()
  }
})

window.addEventListener('keydown', function(e) {
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    console.log('Window keydown:', e.key)
    playAnimation()
  }
})

window.getStats = function() {
  return {
    today: getTodayStats(),
    week: getWeekStats(),
    month: getMonthStats(),
    year: getYearStats(),
    total: getTotalStats()
  }
}

async function init() {
  await initStatsFilePath()
  await initGlobalDribble()
  pet.src = image1
  console.log('ikun宠物已加载')
  console.log('图片路径:', image1, image2)
  console.log('统计数据:', window.getStats())
}

init()
