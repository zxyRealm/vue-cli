// Dom Options
import MapDom from '../html/MapDom' // create Dom
import MapStyle from '../html/MapStyle' // create Dom style
// 3D Object
import Map from '../object/Map' // 3D map
import Gate from '../object/Gate' // gate
import Raycaster from '../object/Raycaster' // raycaster
import Light from '../object/Light' // shining
// animate
import TrackFloor from '../animation/TrackFloor' // up & down animate
import TweenFloor from '../animation/TweenFloor' // change floor
import StateA from '../state/Floor' // up & down state
import Contour from '../util/CenterPoint' // 获取中心点
const async = require('async') // asynchronous

/**
 * 上帝类，定义社群和首页中的全部方法
 *
 * @class World
 * @param { Number } mode   场景模式
 * @paramDesc mode          0: 首页, 1: 社群
 */
export default class World {
  // 自然环境内的所有成员，允许在任何类中被修改
  static scene // 场景
  static camera // 相机
  static renderer // 渲染器
  static mainGroup = new THREE.Group() // 商场总分组
  static status = 'multi' // 场景状态
  static controls // 轨道

  // 成员变量
  // 初始化画板信息
  width = window.innerWidth // 画布宽
  height = window.innerHeight // 画布高
  container = document.body // canvas画布容器

  clock = new THREE.Clock() // 动画clock
  // 射线目标数组
  planeList = [] // 为 射线 提供 底数组
  storeList = [] // 为 射线 提供 商店数组
  shiningList = [] // 闪点数组
  logoArr = []
  // 初始化class
  tweenFloor // 初始化TweenFloor类 - 切换楼层动画
  gate // 出入口类
  map // 初始化map类 - 每一层中的所有元素
  animateFloor // TrackFloor类 - 上下楼动画

  constructor(floorIndex = 1) {
    this.floorIndex = floorIndex
  }

  // init scene
  init() {
    const CAM_POS = new THREE.Vector3(700, 450, 1100)
    World.scene = new THREE.Scene()
    // 调整整体位置
    World.mainGroup.position.y = 50
    World.mainGroup.position.z = -30

    World.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 1, 10000)
    World.camera.position.set(CAM_POS.x, CAM_POS.y, CAM_POS.z)
    World.camera.lookAt(new THREE.Vector3(0, 0, 0))
    World.camera.userData.position = CAM_POS // 备份相机初始位置值

    World.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    World.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(World.renderer.domElement)

    this.labelRenderer = new THREE.CSS2DRenderer()
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.labelRenderer.domElement)

    this.tweenFloor = new TweenFloor() // 初始化TweenFloor类 - 切换楼层动画
    this.gate = new Gate() // 出入口类
    this.map = new Map() // 初始化map类 - 每一层中的所有元素

    // 构建环境
    this.createControls()
    this.createLight()
    this.eventCollection()

    this.buildingRise() // 创建商场
    this.animateFloor = new TrackFloor(houseData) // TrackFloor类 - 上下楼动画
    this.animate()
  }

  // 创建时间流
  animate() {
    TWEEN.update()

    // 更新动画delta
    let delta = this.clock.getDelta()
    if (Light.mixer) {
      Light.mixer.update(delta)
    }

    // 检查上下楼state
    if (StateA.up) this.upFloor()
    if (StateA.down) this.downFloor()

    if (this.shiningList.length) {
      this.shiningList.forEach(item => {
        item.lookAt(World.camera.position)
      })
    }

    this.logoArr.forEach(item => {
      item.lookAt(World.camera.position)
    })

    World.controls.update()
    World.renderer.render(World.scene, World.camera)
    this.labelRenderer.render(World.scene, World.camera)
    requestAnimationFrame(() => {
      this.animate()
    })
  }

  // 创建商场元素
  buildingRise() {
    async.each(
      houseData,
      (item, cb) => {
        let group = new THREE.Group()
        group.name = item.floor || 1
        group.userData.floor = item.floor || 1
        group.userData.dynamicFloor = item.floor || 1
        group.userData.name = item.floor || 1
        group.userData.floorName = item.name
        this.map.loadMap(item, group, cb)
        this.map.loadPlane(item, group, this.planeList)
        this.map.createFloorName(item.name, group)
        World.mainGroup.add(group)
      },
      () => {
        this.createLogo()
        World.scene.add(World.mainGroup)
      }
    )
  }

  // go up - single frame
  upFloor() {
    const high = StateA.count + 3
    const low = StateA.count - 1
    this.animateFloor.up(high, low, World.mainGroup)
  }

  // go down - single frame
  downFloor() {
    const high = StateA.count + 4
    const low = StateA.count
    this.animateFloor.down(high, low, World.mainGroup)
  }

  // switch：s - m
  singleToMulti() {
    this.clear2DLogo(this.floorIndex)
    this.tweenFloor.singleToMulti()
  }

  // switch: s - s
  singleToSingle(floor) {
    this.storeList = []
    this.clearShine()
    this.clear2DLogo(this.floorIndex)
    this.floorIndex = floor
    this.create2DLogo(this.floorIndex)
    this.tweenFloor.singleToSingle(floor)
  }

  // switch: m - s
  multiToSingle(intersect, name) {
    this.storeList = []
    let basicData = {}
    if (typeof intersect === 'object') {
      basicData = {
        key: 'name',
        value: intersect.object.parent.name,
        groupInfo: intersect.object.userData.groupInfo
      }
    } else {
      basicData = {
        key: 'floor',
        value: intersect,
        groupInfo: this._getGroupInfo(parseInt(intersect) - 1)
      }
    }
    // 清除闪点
    this.clearShine()
    this.create2DLogo(basicData.value)
    this.floorIndex = basicData.value
    this.tweenFloor.multiToSingle(basicData, name)
  }

  _getGroupInfo (floor) {
    let group = World.mainGroup.children[floor]
    let groupInfo = group.userData.groupInfo
    return groupInfo
  }

  create2DLogo (value) {
    let group = World.mainGroup.children[value - 1]
    group.children.forEach(item => {
      if (item.name === 'logo') {
        this.createPicLabel(item, group)
      }
    })
  }

  clear2DLogo (value) {
    this.logo2dArr.forEach(mesh => {
      World.mainGroup.children[value - 1].remove(mesh)
    })
  }

  logo2dArr = []
  createPicLabel (item, group) {
    var earthDiv = document.createElement('img')
    earthDiv.className = 'imgLabel'
    earthDiv.src = item.url
    earthDiv.style.position = 'absolute'
    earthDiv.style.display = 'none'
    earthDiv.style.top = '0px'
    earthDiv.style.width = '25px'
    earthDiv.style.height = '25px'
    var earthLabel = new THREE.CSS2DObject(earthDiv)
    earthLabel.name = '2dLogo'
    earthLabel.position.set(item.center.cx, 10, -item.center.cy)
    this.logo2dArr.push(earthLabel)
    group.add(earthLabel)
  }

  // 创建闪点
  // data.coordinates: 坐标点位; data.floorIndex: 楼层编号;
  shiningTrigger(data) {
    // 判断状态：只在多层时显示闪点
    if (World.status === 'multi') {
      const coord = {
        x: parseInt(data.coordinates.split(',')[0]),
        z: parseInt(data.coordinates.split(',')[1])
      }
      this.drawBloomPoint(coord, data.floorIndex)
    }
  }

  // 以多层为入口切换楼层
  // 以单层为入口切换楼层
  changeFloor(floor, name = '') {
    if (World.status === 'multi') {
      this.multiToSingle(floor, name)
    } else {
      this.singleToSingle(floor)
    }
  }

  // 获取分组信息
  // floor：当前楼层编号
  _getGroupInfo(floor) {
    let group = World.mainGroup.children[floor]
    let groupInfo = group.userData.groupInfo
    return groupInfo
  }

  // 处理点击事件
  // 多层点击事件：进入单层
  // 单层点击事件：进入单店
  onDocumentMouseClick(event) {
    let raycaster = new Raycaster(event)
    let rayList = [] // raycaster field
    if (World.status === 'multi') {
      // rayList = this.planeList.slice(StateA.count, StateA.count + 4)
      rayList = this.planeList;
      raycaster.handleEvent(rayList, intersects => {
        this.multiToSingle(intersects[0])
        this._handleFloorNav(intersects[0].object)
      })
    } else {
      rayList = this.storeList
      raycaster.handleEvent(rayList, intersects => {
        let storeInfo = intersects[0].object.userData.storeInfo || {}
        this._intersectOption(intersects[0].object, 1)
        this.createSingleStoreDom(storeInfo.name, intersects[0].object.parent)
      })
    }
  }

  // 单层楼 点击传递数据 点击单店或贴图
  // 1. 遍历当前楼层内的商店数组
  // 2. 为mesh添加临时状态
  _intersectOption(object3d, isFromFloor = 0) {
    let mesh = object3d
    mesh.isSingle = true
    let group = object3d.parent
    this.deleteText(group)
    this.clear2DLogo(this.floorIndex)
    this.storeList.forEach(item => {
      if (item === mesh) {
        let start = { scale: 1, opacity: 1, opacityPlane: 0.3, opacityStore: 0.1 }
        let end = { scale: 1.1, opacity: 0.1, opacityPlane: 0.1, opacityStore: 1 }
        let action = new TWEEN.Tween(start).to(end, 500).onUpdate(() => {
          mesh.scale.x = start.scale
          mesh.scale.y = start.scale
          mesh.scale.z = start.scale
          if (mesh.material.opacity <= 0.98) {
            mesh.material.opacity = start.opacityStore
          }
          group.children.forEach(mesh => {
            if (!mesh.isSingle) {
              if (mesh.name === 'plane') {
                mesh.material.opacity = start.opacityPlane
              } else if (mesh.name !== 'plane' && mesh.name !== 'gateText' && mesh.name !== '2dLogo') {
                mesh.material.opacity = start.opacity
              }
            }
          })
        })
        action.start()
      } else if(item !== mesh && item.isSingle === true) {
        item.isSingle = false
        let start = { scale: 1.1, opacity: 1}
        let end = { scale: 1, opacity: 0.1}
        let action = new TWEEN.Tween(start).to(end, 500).onUpdate(() => {
          item.scale.x = start.scale
          item.scale.y = start.scale
          item.scale.z = start.scale
          item.material.opacity = start.opacity
        })
        action.start()
      }
    })

    if (isFromFloor) {
      window.parent.postMessage(
        {
          cmd: 'store_info',
          data: object3d.userData.storeInfo
        },
        '*'
      )
    }
  }

  deleteText (group) {
    Gate.textGateArr.forEach(label => { group.remove(label) })
  }

  backToFloor(data) {
    World.mainGroup.children.forEach(group => {
      if (group.userData.floorName === data.floor) {
        this.singleStoreToSingle(group)
        return
      }
    })
  }

  singleStoreToSingle(group) {
    let mesh = group.getObjectByProperty('isSingle', true)
    mesh.isSingle = false
    let start = {
      scale: 1.1,
      opacity: 0.1
    }
    let end = {
      scale: 1,
      opacity: 1
    }
    Gate.textGateArr.forEach(label => group.add(label))
    this.logo2dArr.forEach(logo => group.add(logo))
    let action = new TWEEN.Tween(start).to(end, 500).onUpdate(() => {
      mesh.scale.x = start.scale
      mesh.scale.y = start.scale
      mesh.scale.z = start.scale
      group.children.forEach(mesh => {
        if (mesh.name === 'plane') {
          mesh.material.opacity = start.opacity / (1 / 0.3)
        } else if (mesh.name !== 'plane' && mesh.name !== 'gateText' && mesh.name !== '2dLogo') {
          mesh.material.opacity = start.opacity
        }
      })
    })
    action.start()
    window.parent.postMessage({
      cmd: 'to_single',
      groupInfo: group.userData.groupInfo
    }, '*')
    window.parent.postMessage({
      cmd: 'floor-change-nav',
      data: group.name
    }, '*')
  }

  createSingleStoreDom(name, group) {
    window.parent.postMessage(
      {
        cmd: 'createSingleStore',
        data: { name: name, floor: group.userData.floorName }
      },
      '*'
    )
  }

  // 处理点击楼层切换时floornav的变化
  _handleFloorNav(mesh) {
    let floorIndex = mesh.parent ? mesh.parent.name : mesh.floorIndex
    window.parent.postMessage(
      {
        cmd: 'floor-change-nav',
        data: floorIndex
      },
      '*'
    )
  }

  onWindowResize() {
    var width = window.innerWidth
    var height = window.innerHeight
    World.camera.aspect = width / height
    World.camera.updateProjectionMatrix()
    World.renderer.setSize(width, height)
    this.labelRenderer.setSize(width, height)
  }

  // 清除闪点
  clearShine() {
    if (this.shiningList.length) {
      this.shiningList.forEach(() => {
        let shine = World.scene.getObjectByName('shine')
        World.scene.remove(shine)
      })
    }
  }

  drawBloomPoint(coord, groupIndex) {
    let group = World.mainGroup.getObjectByName(groupIndex)
    let texture = new THREE.TextureLoader().load('./static/shining.png')
    let geometry = new THREE.CircleGeometry(5, 32)
    let material = new THREE.MeshBasicMaterial({
      map: texture,
      // depthTest: false,
      depthWrite: false,
      transparent: true
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(coord.x, 10, -coord.z)
    mesh.scale.set(4, 4, 4)
    this.shiningList.push(mesh)
    Light.shining(mesh, group)
    group.add(mesh)
  }

  // create orbit controls
  createControls() {
    World.controls = new THREE.OrbitControls(World.camera)
    World.controls.screenSpacePanning = true
    // save the start status of object, then camera animation will know a reference value
    World.controls.saveState()
  }

  // create light
  createLight() {
    let AmbientLight = new THREE.AmbientLight(0xffffff, 0.2)
    World.scene.add(AmbientLight)
    let light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9)
    World.scene.add(light)
  }

  createAlex() {
    let axesHelper = new THREE.AxesHelper(100)
    World.scene.add(axesHelper)
  }

  callSingleStore(data) {
    let isFromFloor = World.status === 'single' ? 1 : 0
    let floor = parseInt(data.floorIndex)
    let group = World.mainGroup.getObjectByName(floor)
    this.clear2DLogo(this.floorIndex)
    let timeout
    group.children.forEach(mesh => {
      if (mesh.geometryAttribute && mesh.geometryAttribute === data.geometryAttribute) {
        this.changeFloor(floor, data.name)
        World.status === 'multi' ? (timeout = 2500) : (timeout = 500)
        setTimeout(() => {
          this._intersectOption(mesh, 1)
          this.createSingleStoreDom(data.name, group)
        }, timeout)
        return
      }
    })
  }

  // 首页：绑定颜色块
  receiveHeatColorInfo(data) {
    this.heatColorData = data
    this.heatColorData.forEach(item => {
      let floorIndex = item.floorIndex
      World.mainGroup.children[floorIndex - 1].children.forEach(mesh => {
        if (mesh.geometryAttribute === item.coordinates && mesh.name !== 'floorText') {
          mesh.material.color = this.setColor(item.type)
          mesh.userData.storeInfo = item
          this.storeList.push(mesh)
          this.bindGateText(item, mesh, floorIndex)
        }
      })
    })
  }

  // 创建已绑定商店的文字
  bindGateText(item, mesh, floorIndex) {
    let text = this.gate.createLabel(item.name, 'gateText', 14)
    let textCoord = this._getCenterExtraPoint(mesh.geometryAttributeArray)
    if (textCoord) {
      text.position.set(textCoord.cx, 10, -textCoord.cy)
      World.mainGroup.children[floorIndex - 1].add(text)
    }
  }

  // 根据热力设置颜色
  setColor(type) {
    const pallete = [
      { type: 0, color: new THREE.Color('#4A5ABA') },
      { type: 1, color: new THREE.Color('#4A5ABA') },
      { type: 2, color: new THREE.Color('#3249C9') },
      { type: 3, color: new THREE.Color('#2B51ED') },
      { type: 4, color: new THREE.Color('#6201ED') },
      { type: 5, color: new THREE.Color('#6201ED') }
    ]
    let target = pallete.filter(item => item.type === type)
    return target[0].color
  }

  createLogo() {
    let arr = ['./static/16_tol.png', './static/16_ele.png', './static/16_fele.png']
    let index = 0
    World.mainGroup.children.forEach(group => {
      group.children.forEach(mesh => {
        if (mesh.name === 'store') {
          let center = this._getCenterExtraPoint(mesh.geometryAttributeArray)
          let color = mesh.material.color.r * 255
          switch (color) {
            case 44:
              this.logoSet(group, arr[1], center)
              break
            case 45:
              this.logoSet(group, arr[2], center)
              break
            case 46:
              this.logoSet(group, arr[0], center)
              break
          }
        }
      })
    })
  }

  logoSet(group, url, center) {
    let scale = 3
    let texture = new THREE.TextureLoader().load(url)
    let geometry = new THREE.CircleGeometry(2, 32)
    let material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.FrontSide
    })
    let logo = new THREE.Mesh(geometry, material)
    logo.name = 'logo'
    logo.scale.set(scale, scale, scale)
    logo.position.set(center.cx, 10, -center.cy)
    logo.url = url
    logo.center = center
    group.add(logo)
    this.logoArr.push(logo)
  }

  logoSett () {

  }

  handleNavChangeFloor(data) {
    if (data.floorIndex) {
      const floor = data.floorIndex
      this.changeFloor(floor, data.name)
    } else {
      this.singleToMulti()
      this._handleFloorNav({ floorIndex: 0 })
    }
  }

  // 获取中心点和右侧点
  _getCenterExtraPoint = function(array) {
    if (!array) return
    var a = this._changeArrayLevel(array)
    var ps = new Contour(a.buffer).centroid()
    return {
      rx: a.maxLeft - 291,
      cx: ps.x - 291,
      cy: 214 - ps.y
    }
  }

  _changeArrayLevel(array) {
    if (!array) return
    var buffer = []
    var maxLeft = null
    for (var i = 0; i < array.length; i++) {
      var lot = (i + 1) % 3
      if (i && !lot) {
        var items = array.slice(i - 2, i)
        if (maxLeft < items[0]) maxLeft = items[0]
        buffer.push({ x: items[0], y: items[1] })
      }
    }
    return { buffer: buffer, maxLeft: maxLeft }
  }

  eventCollection() {
    window.addEventListener('mousedown', () => {
      this.onDocumentMouseClick(event)
    }, false)
    window.addEventListener('resize', () => {
      this.onWindowResize(event)
    }, false)
  }
}

// var world
const mode = parseInt(getQueryVariable('mode'))
let houseData = []

document.body.style.background = 'rgb(28, 29, 45)'
window.parent.postMessage({
  cmd: 'home-load_signal'
}, '*')

window.addEventListener('message', () => {
  handleMessage(event)
})

let world
function handleMessage(event) {
  const data = event.data
  switch (data.cmd) {
    case 'map_data':
      houseData = data.data
      new MapDom(mode, houseData)
      new MapStyle(mode)
      world = new World(data.floor)
      world.init()
      break
    case 'call_single_store':
      world.callSingleStore(data.data)
      break
    case 'shine_info':
      world.shiningTrigger(data.data)
      break
    case 'heat_color_data':
      world.receiveHeatColorInfo(data.data.trieNodeList)
      break
    case 'nav_change_floor':
      world.handleNavChangeFloor(data.data)
      break
    case 'back_to_floor':
      world.backToFloor(data.data)
  }
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}
