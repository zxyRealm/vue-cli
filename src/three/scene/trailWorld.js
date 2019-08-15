import Contour from '../util/CenterPoint' // 获取中心点
import { SpriteText2D, MeshText2D, textAlign } from 'three-text2d'

// 调色盘

// 方法

/**
 * TrailWorld
 *
 * init(): 初始化
 * createMall(): 创建商场
 * loadMap(): 创建地图
 * loadPlane(): 创建地图底
 */

const async = require('async') // asynchronous
const offset = 0

var floorData
var trailList
var faceList

class TrailWorld {
  constructor() {}

  static scene
  static camera
  static renderer
  static mainGroup = new THREE.Group()
  elevatorGroup = new THREE.Object3D()

  width = window.innerWidth // 画布宽
  height = window.innerHeight // 画布高
  container = document.body // canvas画布容器

  loader = new THREE.SVGLoader()

  storeList = []
  planeList = []

  clock = new THREE.Clock()
  duration = 1000 // 动画片段持续时间
  opacity = 0

  init() {
    TrailWorld.scene = new THREE.Scene()

    TrailWorld.camera = new THREE.PerspectiveCamera(25, this.width / this.height, 0.5, 10000)
    TrailWorld.camera.position.set(600, 300, 1200)

    TrailWorld.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    TrailWorld.renderer.setSize(this.width, this.height)
    this.container.appendChild(TrailWorld.renderer.domElement)

    this.labelRenderer = new THREE.CSS2DRenderer()
    this.labelRenderer.setSize(this.width, this.height)
    this.container.appendChild(this.labelRenderer.domElement)

    var controls = new THREE.OrbitControls(TrailWorld.camera)
    controls.enableZoom = true
    controls.screenSpacePanning = true
    controls.enableRotate = false

    this.elevatorGroup.name = 'elevator'
    TrailWorld.scene.add(this.elevatorGroup)

    this.createLight()
    this.createMall()
    this.render()

    window.addEventListener(
      'resize',
      () => {
        this.onWindowResize(event)
      },
      false
    )
  }

  createMall() {
    async.each(
      floorData,
      (item, cb) => {
        let group = new THREE.Group()
        group.name = item.floor
        group.userData.floor = item.floor
        group.userData.name = item.name
        this.loadMap(item, group, this.storeList, cb)
        this.loadPlane(item, group, this.planeList)
        TrailWorld.mainGroup.add(group)
      },
      () => {
        TrailWorld.scene.add(TrailWorld.mainGroup)
        this.createLogo()
        let firstPointFloor = parseInt(trailList[0].floorName)
        let firstFloor = TrailWorld.mainGroup.getObjectByName(firstPointFloor)
        if (firstFloor.userData.floor - 1 > 1) {
          TrailWorld.mainGroup.position.y = -120 * (firstFloor.userData.floor - 2)
        }
        this.createPath(firstPointFloor, 0)
        window.parent.postMessage(
          {
            cmd: 'get_face_info',
            data: faceList[0]
          },
          '*'
        )
      }
    )
  }

  logoArr = []

  onWindowResize() {
    var width = window.innerWidth
    var height = window.innerHeight
    TrailWorld.camera.aspect = width / height
    TrailWorld.camera.updateProjectionMatrix()
    TrailWorld.renderer.setSize(width, height)
    this.labelRenderer.setSize(width, height)
  }

  createLogo() {
    let arr = ['./static/16_tol.png', './static/16_ele.png', './static/16_fele.png']
    let index = 0
    TrailWorld.mainGroup.children.forEach(group => {
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

  faceCount = 0
  createPath(floorName, currentPathPointIndex) {
    let floorGroup = TrailWorld.mainGroup.children.filter(group => group.name === floorName)[0]
    let count = currentPathPointIndex
    let faceSprite
    floorGroup.isPathFloor = true

    this.setGroupOpacity()
    faceSprite = this.createTraceBall(this.faceCount)

    let timer1 = setInterval(() => {
      // 轨迹点数组长度为1时
      if (trailList.length === 1) {
        clearInterval(timer1)
        this.addFirstFaceSprite(faceSprite, trailList, floorGroup)
      }

      // 轨迹除倒数第一个点的行进中途
      if (count <= trailList.length - 2) {
        // 如果在途中遇到抓拍点，则新增一个人脸轨迹球
        if (trailList[count].capturePoint) {
          const startPoint = trailList[count].point
          const endPoint = trailList[count + 1].point
          const pathGroup = {
            start: { x: startPoint.x, y: startPoint.y },
            end: { x: endPoint.x, y: endPoint.y }
          }
          const position = { x: pathGroup.start.x, y: 10, z: pathGroup.start.y }
          const { x, y, z } = position
          this.faceCount++
          this.addFaceSprite(trailList, floorGroup, count)
          faceSprite = this.createTraceBall(this.faceCount)
          faceSprite.position.x = x
          faceSprite.position.y = y
          faceSprite.position.z = z
          floorGroup.add(faceSprite)
          this.postFaceInfo()
        } else {
          this.drawPathPoint(trailList, floorGroup, count) // 绘制轨迹
          this.faceSpriteTween(trailList, floorGroup, count, faceSprite) // 绘制人脸轨迹球
        }
      }

      // 最后一个点：
      // 如果是抓拍点，则添加一个人脸
      // 补间动画：位置回到初始值；透明度回到初始值
      if (count === trailList.length - 1) {
        clearInterval(timer1)
        this.finishTween()
      }

      if (count > currentPathPointIndex + 2 && trailList[count - 1].elevator === true) {
        clearInterval(timer1)
        floorGroup.isPathFloor = false
        faceSprite.element.style.opacity = '0'
        let nextFloorGroup = TrailWorld.mainGroup.getObjectByName(parseInt(trailList[count + 2].floorName))
        let lastFloorGroup = TrailWorld.mainGroup.getObjectByName(parseInt(trailList[count - 2].floorName))
        let nextFloorIndex = nextFloorGroup.userData.floor
        let lastFloorIndex = lastFloorGroup.userData.floor
        let heightDuration = Math.abs(nextFloorIndex - lastFloorIndex)
        let duration = (120 * heightDuration - 10) * 10
        this.createElevatorTrace(
          lastFloorIndex,
          nextFloorIndex,
          trailList[count - 1].point,
          lastFloorGroup,
          this.faceCount
        )
        this.moveTheFloor(nextFloorIndex, lastFloorIndex, duration)
        let timer2 = setTimeout(() => {
          clearTimeout(timer2)
          this.createPath(parseInt(trailList[count].floorName), count)
        }, duration)
      }

      count += 1
    }, 40)
  }

  // 绘制轨迹点
  drawPathPoint(trailList, floorGroup, count) {
    const offset = 4
    const startPoint = trailList[count].point
    const endPoint = trailList[count + 1].point
    const pathGroup = {
      start: { x: startPoint.x, y: startPoint.y },
      end: { x: endPoint.x, y: endPoint.y }
    }
    let path = this.createPathLine(pathGroup)
    path.position.set(startPoint.x, 1, startPoint.y + offset)
    path.rotation.x = 0.5 * Math.PI
    floorGroup.add(path)
  }

  faceSpriteTween(trailList, floorGroup, count, faceSprite) {
    const startPoint = trailList[count].point
    const endPoint = trailList[count + 1].point
    const pathGroup = {
      start: { x: startPoint.x, y: startPoint.y },
      end: { x: endPoint.x, y: endPoint.y }
    }
    let action1 = new TWEEN.Tween(pathGroup.start).to(pathGroup.end, 40).onUpdate(() => {
      faceSprite.position.x = pathGroup.start.x
      faceSprite.position.y = 10
      faceSprite.position.z = pathGroup.start.y
      floorGroup.add(faceSprite)
    })
    action1.start()
  }

  finishTween() {
    const position = TrailWorld.mainGroup.position
    const action = new TWEEN.Tween(position).to({ y: 0 }, 1000).onUpdate(() => {
      TrailWorld.mainGroup.position.y = position.y
      this.elevatorGroup.position.y = position.y
    })
    action.start()

    let toMoreEnd = { opacity: 1 },
      toMoreStart = { opacity: 0.1 }
    TrailWorld.mainGroup.children.forEach(group => {
      if (!group.isPathFloor) {
        let action1 = new TWEEN.Tween(toMoreStart).to(toMoreEnd, 1000).onUpdate(() => {
          group.children.forEach(mesh => {
            if (mesh.name !== 'store2dLabel' && mesh.name !== '2dFace') {
              if (mesh.name !== 'plane') mesh.material.opacity = toMoreStart.opacity
              else mesh.material.opacity = toMoreStart.opacity / 5
            }
          })
        })
        action1.start()
      }
    })
  }

  addFaceSprite(trailList, floorGroup, count) {
    const startPoint = trailList[count].point
    const endPoint = trailList[count + 1].point
    const pathGroup = {
      start: { x: startPoint.x, y: startPoint.y },
      end: { x: endPoint.x, y: endPoint.y }
    }
    const position = { x: pathGroup.start.x, y: 10, z: pathGroup.start.y }
    const { x, y, z } = position

    this.logo2dArr.forEach(cssObj => {
      if (cssObj.position.x === position.x) {
        cssObj.element.style.opacity = '0'
      }
    })
    
    let faceSprite = this.createTraceBall(this.faceCount)
    faceSprite.position.set(x, y, z)
    floorGroup.add(faceSprite)
  }

  // 当轨迹长度只有一个时，创建人脸
  addFirstFaceSprite(faceSprite, trailList, group) {
    const point = trailList[0].point
    const position = { x: point.x, y: 10, z: point.y }
    this.setFacePosition(faceSprite, position, group)
  }

  //
  setFacePosition(cssObject, position, group) {
    const { x, y, z } = position
    cssObject.position.x = x
    cssObject.position.y = y
    cssObject.position.z = z
    group.add(cssObject)
  }

  // 发送数据
  postFaceInfo() {
    window.parent.postMessage(
      {
        cmd: 'get_face_info',
        data: this.faceObj
      },
      '*'
    )
  }

  // 创建完整电梯路径
  createElevatorTrace(lastFloorIndex, nextFloorIndex, newPoint, lastFloorGroup, faceCount) {
    let positionY = lastFloorGroup.position.y
    let heightDuration = nextFloorIndex - lastFloorIndex

    if (heightDuration > 0) {
      // 设置电梯上下位置
      let pathGroup = {
        start: { x: newPoint.x, y: positionY, z: newPoint.y },
        end: { x: newPoint.x, y: positionY + 120 * heightDuration, z: newPoint.y }
      }
      var timeDuration = pathGroup.end.y - pathGroup.start.y
      var timeUnit = 0

      let faceSprite = this.createTraceBall(faceCount)
      this.elevatorGroup.add(faceSprite)

      var timer2 = setInterval(() => {
        var cube = this.createElevatorPath()
        cube.position.set(pathGroup.start.x, pathGroup.start.y + timeUnit, pathGroup.start.z)
        faceSprite.position.set(pathGroup.start.x, pathGroup.start.y + timeUnit, pathGroup.start.z)
        this.elevatorGroup.add(cube)
        if (timeUnit >= timeDuration) {
          this.elevatorGroup.remove(faceSprite)
          clearInterval(timer2)
        }
        timeUnit += 3
      }, 30)
    } else {
      // 设置电梯上下位置
      let pathGroup = {
        start: { x: newPoint.x, y: positionY, z: newPoint.y },
        end: { x: newPoint.x, y: positionY - 120 * heightDuration - 8, z: newPoint.y }
      }
      let faceSprite = this.createTraceBall(faceCount)
      this.elevatorGroup.add(faceSprite)

      let timeDuration = pathGroup.start.y - pathGroup.end.y
      let timeUnit = 0
      var timer2 = setInterval(() => {
        var cube = this.createElevatorPath()
        cube.position.set(pathGroup.start.x, pathGroup.start.y + timeUnit, pathGroup.start.z)
        faceSprite.position.set(pathGroup.start.x, pathGroup.start.y + timeUnit, pathGroup.start.z)
        this.elevatorGroup.add(cube)
        if (timeUnit <= timeDuration) {
          this.elevatorGroup.remove(faceSprite)
          clearInterval(timer2)
        }
        timeUnit -= 3
      }, 30)
    }
  }

  moveTheFloor(nextFloorIndex, lastFloorIndex, duration) {
    if (lastFloorIndex === 1) return
    let heightDuration = nextFloorIndex - lastFloorIndex
    if (nextFloorIndex === 1) heightDuration++
    let positionStart = { y: TrailWorld.mainGroup.position.y }
    let positionEnd = { y: TrailWorld.mainGroup.position.y - heightDuration * 120 }
    let action = new TWEEN.Tween(positionStart).to(positionEnd, duration).onUpdate(() => {
      TrailWorld.mainGroup.position.y = positionStart.y
      this.elevatorGroup.position.y = positionStart.y
    })
    action.start()
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
        if (maxLeft < items[0]) {
          maxLeft = items[0]
        }
        buffer.push({ x: items[0], y: items[1] })
      }
    }
    return { buffer: buffer, maxLeft: maxLeft }
  }

  setGroupOpacity() {
    let toMoreEnd = { opacity: 1 },
      toMoreStart = { opacity: 0.1 }
    TrailWorld.mainGroup.children.forEach(group => {
      if (group.isPathFloor) {
        let action1 = new TWEEN.Tween(toMoreStart).to(toMoreEnd, 1000).onUpdate(() => {
          group.children.forEach(mesh => {
            if (mesh.name !== 'store2dLabel' && mesh.name !== '2dFace') {
              if (mesh.name !== 'plane') mesh.material.opacity = toMoreStart.opacity
              else mesh.material.opacity = toMoreStart.opacity / 5
            } else {
              mesh.element.style.display = 'none'
            }
          })
        })
        action1.start()
      } else {
        group.children.forEach(mesh => {
          if (mesh.name !== 'path' && mesh.name !== 'store2dLabel' && mesh.name !== '2dFace')
            mesh.material.opacity = 0.1
        })
      }
    })
  }

  logo2dArr = []
  // 创建轨迹球
  createTraceBall(count) {
    this.faceObj = faceList[count]
    const trailBall = new TrailBall(this.faceObj)
    const label = trailBall.trailBall
    label.element.style.zIndex = count
    this.logo2dArr.push(label)
    return label
  }

  removeTraceBall(floorGroup) {
    let lastTrailBall = floorGroup.getObjectByName('2dFace')
    floorGroup.remove(lastTrailBall)
  }

  // 绑定商店名称
  createStoreText(item, mesh, floorIndex) {
    let text = new TextLabel(item.name)
    const textCoord = this._getCenterExtraPoint(mesh.geometryAttributeArray)
    if (textCoord) {
      text.label.position.set(textCoord.cx, 2, -textCoord.cy)
      TrailWorld.mainGroup.children[floorIndex - 1].add(text.label)
    }
  }

  // 创建单位路径
  createPathLine() {
    const path = new Path()
    return path.mesh
  }

  // 创建电梯单位路径
  createElevatorPath() {
    const elevator = new Elevator()
    return elevator.mesh
  }

  // 创建几何体
  createGeometry() {
    return new THREE.Geometry()
  }

  // 创建拉伸几何体
  createExtrudeGeometry(shape) {
    return new THREE.ExtrudeBufferGeometry(shape, {
      depth: 5,
      bevelEnabled: true,
      bevelThickness: 1.5,
      bevelSize: 1,
      bevelSegments: 5
    })
  }

  // 创建材质
  createMaterial(options) {
    return new THREE.MeshPhongMaterial(options)
  }

  createMesh(shape, options, name) {
    let geo = this.createGeometry()
    let geoPlane = new THREE.ShapeBufferGeometry(shape)
    let extrudeGeo = this.createExtrudeGeometry(shape)
    geo.fromBufferGeometry(extrudeGeo)
    geo.translate(-290, -214, 0)
    let mat = this.createMaterial(options, name)
    let mesh = new THREE.Mesh(geo, mat)
    mesh.geometryAttribute = [].slice.call(geoPlane.attributes.position.array).toString()
    mesh.geometryAttributeArray = geoPlane.attributes.position.array
    mesh.name = name
    return mesh
  }

  initTemplate(url, callback, asyncCb = () => {}) {
    this.loader.load(url, data => {
      let paths = data.paths
      paths.forEach(path => {
        let shapes = path.toShapes(true)
        shapes.forEach(shape => {
          callback(path, shape)
        })
      })
      asyncCb(null)
    })
  }

  // item:
  loadMap(item, group, storeList, callback) {
    const originPosition = (item.floor - 2) * 120 - 60
    this.initTemplate(
      item.floorMap,
      (path, shape) => {
        const options = {
          color: path.color,
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide
        }
        let mesh = this.createMesh(shape, options, 'store')
        item.trieNodeList.forEach(store => {
          if (mesh.geometryAttribute === store.coordinates && mesh.name !== 'floorText') {
            mesh.userData.storeInfo = store
            this.createStoreText(store, mesh, group.name)
          }
        })
        mesh.rotation.set(0.5 * Math.PI, 0, 0)
        mesh.userData.originPosition = originPosition
        mesh.userData.color = {
          r: mesh.material.color.r,
          g: mesh.material.color.g,
          b: mesh.material.color.b
        }
        storeList.push(mesh)
        group.add(mesh)
      },
      callback
    )
    group.position.y = originPosition
  }

  // board
  loadPlane(item, group, planeList) {
    const originPosition = (item.floor - 2) * 120 - 65
    group.userData.positionY = originPosition
    group.userData.positionZ = group.position.z
    this.initTemplate('./assets/14.svg', (path, shape) => {
      const options = {
        color: '#1a425e',
        transparent: true,
        // opacity: 0.3
        opacity: 0.3
      }

      let mesh = this.createMesh(shape, options, 'plane')
      mesh.rotation.set(0.5 * Math.PI, 0, 0)
      mesh.position.y = -5
      mesh.userData = {
        originPosition: originPosition,
        groupInfo: item
      }
      planeList.push(mesh)
      group.add(mesh)
      options.opacity ? (group.userData.isShow = true) : (group.userData.isShow = false)
    })
  }

  // create light
  createLight() {
    const light = new Light()
    TrailWorld.scene.add(light.ambient)
    TrailWorld.scene.add(light.hemisphere)
  }

  render() {
    TWEEN.update()
    requestAnimationFrame(() => {
      this.render()
    })
    this.logoArr.forEach(item => {
      item.lookAt(TrailWorld.camera.position)
    })
    TrailWorld.renderer.render(TrailWorld.scene, TrailWorld.camera)
    this.labelRenderer.render(TrailWorld.scene, TrailWorld.camera)
  }
}

class TrailBall {
  constructor(faceObj) {
    this.create(faceObj)
  }

  create(faceObj) {
    let earthDiv = document.createElement('img')
    earthDiv.className = 'imgLabel'
    earthDiv.src = faceObj.faceImgUrl
    earthDiv.style.position = 'absolute'
    earthDiv.style.opacity = '1'
    earthDiv.style.top = '0'
    earthDiv.style.width = '28px'
    earthDiv.style.height = '28px'
    earthDiv.style.border = '1px solid #fff'
    earthDiv.style.borderRadius = '16px'
    earthDiv.style.zIndex = '0'
    this.trailBall = new THREE.CSS2DObject(earthDiv)
    this.trailBall.name = '2dFace'
  }
}

class Path {
  constructor() {
    this.create()
  }

  create() {
    const geometry = new THREE.PlaneGeometry(4, 4)
    const material = new THREE.MeshPhongMaterial({
      color: '#FF9600',
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.name = 'path'
  }
}

class TextLabel {
  constructor(context) {
    this.create(context)
  }

  create(context) {
    var div = document.createElement('div')
    div.className = 'label'
    div.textContent = context
    div.style.position = 'absolute'
    div.style.top = '0px'
    div.style.color = '#fff'
    div.style.fontSize = 11 + 'px'
    div.style.fontWeight = '900'
    this.label = new THREE.CSS2DObject(div)
    this.label.name = 'store2dLabel'
    // this.label.position.z = 5
  }
}

class Elevator {
  constructor() {
    this.create()
  }

  create() {
    const geometry = new THREE.BoxGeometry(1, 2, 2)
    const material = new THREE.MeshBasicMaterial({
      color: '#FF9600',
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(geometry, material)
  }
}

class Map {}

class Light {
  constructor() {
    this.ambient = this.createAmbient()
    this.hemisphere = this.createHemisphere()
  }
  createAmbient() {
    return new THREE.AmbientLight(0xffffff, 0.3)
  }
  createHemisphere() {
    return new THREE.HemisphereLight(0xffffff, 0x000000, 0.9)
  }
}

let world2
window.parent.postMessage(
  {
    cmd: 'trail-load_signal'
  },
  '*'
)

window.addEventListener('message', () => {
  handleMessage(event)
})

function handleMessage(event) {
  const data = event.data
  switch (data.type) {
    case 'GET_TRAIL_DATA':
      trailList = data.trailData
      faceList = data.faceData
      floorData = data.communityInfo
      world2 = new TrailWorld()
      world2.init()
  }
}
