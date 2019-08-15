// Dom Options
import MapDom from '../html/MapDom' // create Dom
import MapStyle from '../html/MapStyle' // create Dom style
import Contour from '../util/CenterPoint' // 获取中心点

class ComWorld {
  static scene
  static camera
  static renderer
  static mainGroup
  static schrodingerGate
  
  width = window.innerWidth // 画布宽
  height = window.innerHeight // 画布高
  container = document.body // canvas画布容器

  loader = new THREE.SVGLoader
  clock = new THREE.Clock()

  storeList = []
  planeList = []
  spriteList = []
  
  constructor () {}

  init () {
    ComWorld.scene = new THREE.Scene()
    
    ComWorld.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 0.5, 10000)
    ComWorld.camera.position.set(0, 0, 900)

    ComWorld.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    ComWorld.renderer.setSize(this.width, this.height)
    this.container.appendChild(ComWorld.renderer.domElement)

    this.labelRenderer = new THREE.CSS2DRenderer();
		this.labelRenderer.setSize( window.innerWidth, window.innerHeight);
		this.container.appendChild( this.labelRenderer.domElement );

    // this.createAlex()
    this.createLight()
    this.createMall()
    this.render()

    const gateEl = document.getElementById('gate-group')
      gateEl.addEventListener('click', e => {
        let currentFloor = this.currentFloor
        this.createGate(gateEl, e, this.spriteList, currentFloor)
      }, false)
      window.addEventListener('mousedown', () => {
        this.onDocumentMouseClick(event)
      }, false)
      window.addEventListener('resize', () => {
        this.onWindowResize(event)
      }, false)
  }

  render() {
    requestAnimationFrame(() => { this.render() })
    this.labelRenderer.render( ComWorld.scene, ComWorld.camera );
    ComWorld.renderer.render(ComWorld.scene, ComWorld.camera)
  }

  // offsetY = 30
  // angle = - 0.28 * Math.PI
  offsetY = 0
  angle = 0

  createMall (floorInfo) {
    ComWorld.mainGroup = new THREE.Group()
    ComWorld.mainGroup.position.y = this.offsetY
    ComWorld.mainGroup.rotation.x = this.angle
    floorInfo = floorInfo || houseData[floorIndex - 1]
    console.log(floorInfo)
    ComWorld.mainGroup.name = floorInfo.floor
    ComWorld.mainGroup.userData.floor = floorInfo.floor
    ComWorld.mainGroup.userData.name = floorInfo.name
    this.storeList = []
    this.planeList = []
    this.createMap(floorInfo, ComWorld.mainGroup, this.storeList)
    this.loadPlane(floorInfo, ComWorld.mainGroup, this.planeList)
  }

  createAlex() {
    let axesHelper = new THREE.AxesHelper(100)
    ComWorld.scene.add(axesHelper)
  }

  createGeometry() {
    return new THREE.Geometry()
  }

  createControls() {
    ComWorld.controls = new THREE.OrbitControls(World.camera)
    World.controls.screenSpacePanning = false
    ComWorld.controls.saveState() 
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

  createMap (item, group, storeList) {
    const originPosition = 0
    const color = { r: 98/255, g: 108/255, b: 154/255 }
    this.loader.load(item.url, data => {
      let paths = data.paths
      paths.forEach(path => {
        let shapes = path.toShapes(true)
        shapes.forEach(shape => {
            const options = {
              color: 'rgb(98, 108, 154)',
              transparent: true,
              opacity: 1,
              side: THREE.DoubleSide
            }
            let mesh = this.createMesh(shape, options, 'store')
            
            mesh.scale.y = -1
            mesh.userData.originPosition = originPosition
            mesh.userData.color = {
              r: mesh.material.color.r,
              g: mesh.material.color.g,
              b: mesh.material.color.b
            }
            this.createLogo(mesh, path.color)
            storeList.push(mesh)
            group.add(mesh)
        })
      })
      window.parent.postMessage({
        cmd: 'to_single',
        data: floorIndex
      }, '*')
      ComWorld.scene.add(group)
      
    })
  }

  createLogo(mesh, pathColor) {
    let arr = ['./static/16_tol.png', './static/16_ele.png', './static/16_fele.png']
    if (mesh.name === 'store') {
      let center = this._getCenterExtraPoint(mesh.geometryAttributeArray)
      let color = pathColor.r * 255
      switch (color) {
        case 44:
          mesh.url = arr[1]
          mesh.center = center
          this.create2dLogo(mesh)
          break
        case 45:
          mesh.url = arr[2]
          mesh.center = center
          this.create2dLogo(mesh)
          break
        case 46:
          mesh.url = arr[0]
          mesh.center = center
          this.create2dLogo(mesh)
          break
      }
    }    
  }

  createLight() {
    // warm light
    let AmbientLight = new THREE.AmbientLight(0xffffff, 0.2)
    ComWorld.scene.add(AmbientLight)
    // sky light
    let light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9)
    ComWorld.scene.add(light)
  }

  initTemplate(url, callback) {
    this.loader.load(url, data => {
      let paths = data.paths
      paths.forEach(path => {
        let shapes = path.toShapes(true)
        shapes.forEach(shape => {
          callback(path, shape)
        })
      })
    })
  }

  // board
  loadPlane(item, group, planeList) {
    let url = item.mapBaseboard || './static/bottom2.svg'
    this.initTemplate(url, (path, shape) => {
      const options = {
        color: '#1a425e',
        transparent: true,
        opacity: 0.3
      }

      let mesh = this.createMesh(shape, options, 'plane')
      // mesh.rotation.set(0.5 * Math.PI, 0, 0)
      mesh.scale.set(1, -1, 1)
      mesh.position.z = -5
      mesh.userData = {
        groupInfo: item
      }
      planeList.push(mesh)
      group.add(mesh)
      options.opacity ? group.userData.isShow = true : group.userData.isShow = false
    })
  }

  spriteList = []
  receiveGateInfo(data) {
    this.spriteList = []
    this.gateData = data
    this.gateData.forEach(item => {
      if (item.type === 1) {
        item.src = './static/camera-inside.png'
      } else if (item.type === 2) {
        item.src = './static/camera-outside.png'
      } else {
        item.src = './static/camera-post.png'
      }
      
      let data = { id: item.portalGuid }
      let trigger = true

      let mesh = this.createRealGate(item.src, data, trigger)
      mesh.position.set(item.coord.x, item.coord.y, 10)
      mesh.info = data
      this.spriteList.push(mesh)
      
      // World.mainGroup.children[item.floor - 1].add(text)
      ComWorld.mainGroup.add(mesh)
    })
  }

  createRealGate (src, data, trigger = false) {
    // create gate sprite
    let scale = new THREE.Vector3(12, 7, 8)
    let mesh = this.createPic(src, scale)
    mesh.name = 'gate'

    if (!trigger) {
      window.parent.postMessage({
        cmd: 'gate_info',
        data: data
      }, '*')
    }

    return mesh
  }

  onDocumentMouseClick (event) {
    const mouse = new THREE.Vector2()
    const container = ComWorld.renderer.domElement
    const raycaster = new THREE.Raycaster()
    const rayList = this.spriteList
  
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1
    mouse.y = - (event.clientY / container.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, ComWorld.camera)
    
    let intersects = raycaster.intersectObjects(rayList)
    if (intersects.length > 0) {
      if (intersects[0].object.name === 'gate') {
        delete intersects[0].object.info.coord
        window.parent.postMessage({
          cmd: 'gate_info',
          data: intersects[0].object.info
        }, '*')
      }
    }
  }

  logo2dArr = []
  create2dLogo (item) {
    var earthDiv = document.createElement('img')
    earthDiv.className = 'imgLabel'
    earthDiv.src = item.url
    earthDiv.style.position = 'absolute'
    earthDiv.style.display = 'none'
    earthDiv.style.top = '0px'
    earthDiv.style.width = '17px'
    earthDiv.style.height = '17px'
    var earthLabel = new THREE.CSS2DObject(earthDiv)
    earthLabel.name = '2dLogo'
    earthLabel.position.set(item.center.cx, item.center.cy, 10)
    this.logo2dArr.push(earthLabel)
    ComWorld.mainGroup.add(earthLabel)
  }

  clear2dLogo () {
    this.logo2dArr.forEach(mesh => {
      ComWorld.mainGroup.remove(mesh)
    })
  }

  createPic (picUrl, scale, extraOption, name = 'flag') {
    if (!extraOption) {
      extraOption = {opacity: 1}
    }    
    let option = Object.assign({
      map: this.getTexture(picUrl),
      transparent:true,
      opacity:true,
      alphaTest: 0.5,
      // sizeAttenuation: false,
    }, extraOption)
    let sprite = this._createSprite(option)
    
    sprite.name = name
    sprite.scale.set(scale.x, scale.y, scale.z)
    sprite.position.set(0, 10, 0)
    
    return sprite
  }

  getTexture (picUrl) {
    let map = new THREE.TextureLoader().load(picUrl)
    return map
  }

  screenToWorld (screenPoint) {
    // 获取屏幕坐标投影在相机上的x和y轴的值
    let pX = (screenPoint.x / window.innerWidth) * 2 - 1
    let pY = -(screenPoint.y / window.innerHeight) * 2 + 1
    // let p = new THREE.Vector3(pX, pY, -1).unproject(camera);
    // set vector2
    // let p2 = new THREE.Vector2(pX, pY);
    // get z-depth
    
    let zd = ComWorld.camera.position.z - 10
    // get camera angle (180-30)/2
    let za = (180-30) / 2 * Math.PI / 180
    // 获取世界坐标中的x轴边界
    let bx = (zd / Math.tan(za)) * (window.innerWidth / window.innerHeight)
    // 获取世界坐标中的y轴边界
    let by = zd / Math.tan(za)
    // 获取世界坐标中x轴的实际坐标点
    let sx = pX * bx
    // 获取世界坐标中y轴的实际坐标点
    let sy = pY * by

    return {
      x: sx,
      y: sy
    }
  }

  _createSprite (obj) {
    let material = new THREE.SpriteMaterial(obj)
    let sprite = new THREE.Sprite(material)
    return sprite
  }

  cancelGate (type) {
    let schrodingerGate = ComWorld.mainGroup.getObjectByName(ComWorld.schrodingerGate.name)
    if (!type) {
      ComWorld.mainGroup.remove(schrodingerGate)
    } else {
      schrodingerGate.name = ComWorld.schrodingerGate.realName
    }
    schrodingerGate = {}
  }

  receiveColorInfo (data) {
    this.colorData = data
    this.colorData.forEach(item => {
      let floorIndex = item.floor
      ComWorld.mainGroup.children.forEach((mesh) => {
        if (mesh.geometryAttribute === item.coordinates && mesh.name !== 'floorText') {
          mesh.material.color = this.setColor(3)
          this.bindGateText(item, mesh, floorIndex)
        }
      })
    })
  }

  receiveExistGateInfo(data) {
    if (data) {
      let gateList = document.getElementById('gateList')
      this.currentExistGateData = data

      let item = `
      <% for(let i=0; i < data.existGate.length; i++) { %>
        <div class="gate-item gate-red" data-id="<%= data.existGate[i].id %>">
        <% if (data.existGate[i].type === 2) { %>
          <img src="./static/camera-outside.png" alt="">
        <% } else if (data.existGate[i].type === 1) {%>
          <img src="./static/camera-inside.png" alt="">
        <% } else if (data.existGate[i].type === 3) {%>
          <img src="./static/camera-post.png" alt="">
        <% } %>
          <span><%= data.existGate[i].name  %></span>
        </div>
      <% } %>`

      let parse = eval(MapDom.compile(item))
      gateList.innerHTML = parse({ existGate: data })

      gateList.addEventListener('click', e => {
        let floor = this.currentFloor
        this.createGate(gateList, e, this.spriteList, floor)
      }, false)
    }
  }

  // 创建已绑定商店的文字
  bindGateText (item, mesh, floorIndex) {
    let text = this.createLabel(item.name, 'gateText', 14)
    let textCoord = this._getCenterExtraPoint(mesh.geometryAttributeArray)
    if (textCoord) {
      text.position.set(textCoord.cx, textCoord.cy, 10)
      ComWorld.mainGroup.add(text)
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

  // 获取中心点和右侧点
  _getCenterExtraPoint = function(array) {
    if (!array) return
    var a = this._changeArrayLevel(array)
    var ps = new Contour(a.buffer).centroid()
    return {
      rx: (a.maxLeft - 291),
      cx: (ps.x - 291),
      cy: (214 - ps.y)
    }
  }

  handleNavChangeFloor (data) {
    floorIndex = data.floorIndex
    let floorInfo = {
      mapBaseboard: data.mapBaseboard,
      floor: floorIndex,
      name: data.name,
      url: data.floorMap.split('?')[0]
    }
    this._deleteText(ComWorld.mainGroup)
    this.clear2dLogo()
    ComWorld.scene.remove(ComWorld.mainGroup)
    this.createMall(floorInfo)
  }

  _deleteText (group) {
    this.textGateArr.forEach(textObject => {
      group.remove(textObject)      
    })
    this.textGateArr = []
  }

  textGateArr = []
  createLabel (context, name, fontSize) {
    var earthDiv = document.createElement('div')
    earthDiv.className = 'label'
    earthDiv.textContent = context
    earthDiv.style.position = 'absolute'
    earthDiv.style.top = '0px'
    earthDiv.style.color = '#ffffff'
    earthDiv.style.fontSize = fontSize + 'px'
    var earthLabel = new THREE.CSS2DObject(earthDiv)
    earthLabel.name = name
    earthLabel.position.z = 12
    this.textGateArr.push(earthLabel)
    return earthLabel
  }

  _changeArrayLevel (array) {
    if (!array) return
    var buffer = [];
    var maxLeft = null;
    for (var i = 0; i < array.length; i++) {
      var lot = ((i + 1) % 3);
      if (i && !lot) {
        var items = array.slice(i - 2, i)
        if (maxLeft < items[0]) maxLeft = items[0]
        buffer.push({x: items[0], y: items[1]})
      }
    }
    return {'buffer': buffer, 'maxLeft': maxLeft}
  }

  onWindowResize() {
    var width = window.innerWidth
    var height = window.innerHeight
    ComWorld.camera.aspect = width / height
    ComWorld.camera.updateProjectionMatrix()
    ComWorld.renderer.setSize(width, height)
    this.labelRenderer.setSize(width, height)
  }

  createGate (el, e, spriteList, floor, id) {
    if (e.target && (e.target.nodeName.toUpperCase() === 'IMG')) {
      // get img src
      let src = e.target.src.split('/').pop()

      if (!id) {
        id = e.target.parentNode.getAttribute('data-id')
      }
      let type = parseInt(e.target.parentNode.getAttribute('data-type'))
      let text = e.target.parentNode.children[1].innerText
      // gateEl -> div -> img
      let img = el.children[0].children[0]
      let box = document.createElement('img')
      // picture will position at the mouse center
      let divX = event.clientX - img.offsetWidth / 2
      let divY = event.clientY - img.offsetHeight / 2
      
      box.src = `./static/${src}`
      box.style.width = '20px'
      box.style.position = 'absolute'
      box.style.left = divX + 'px'
      box.style.top = divY + 'px'
      document.body.appendChild(box)
      
      // when mouse move, gate picture please follow my hand
      document.onmousemove = (event) => {
        event = event || window.event
        let divX = event.clientX - img.offsetWidth / 2
        let divY = event.clientY - img.offsetHeight / 2
        box.style.left = divX + 'px'
        box.style.top = divY + 'px'
      }

      // when mouse click, gate picture please breaking the dimension
      box.onmousedown = (event) => {
        event = event || window.event
        document.onmousemove = null
        document.body.removeChild(box)
        let newScreen = this.screenToWorld({x: event.clientX, y: event.clientY})
        let zLenTemp = 214 * Math.cos(this.angle / 2) * 2
        let zLen = zLenTemp * Math.sin(this.angle / 2)
        
        let data = {}
        let object = new THREE.Object3D()

        object.name = 'schrodingerName'
        
        ComWorld.mainGroup.add(object)
        object.position.set(newScreen.x, newScreen.y - (this.offsetY+10), 10)

        if (id) {
          data = { coord: newScreen, id: id }
        } else if (type) {
          data = { coord: newScreen, type: type }
        }
        // create gate sprite
        let meshPic = this.createRealGate(box.src, data)
        object.add(meshPic)
        meshPic.info = data
        spriteList.push(meshPic)
        
        ComWorld.schrodingerGate = {
          floor: floorIndex,
          name: object.name,
          realName: 'gateGroup'
        }
      }
    }
  }
}

let comWorld
let houseData = []
let floorIndex = 1

document.body.style.background = '#ffffff'
window.parent.postMessage({
  cmd: 'associate-load_signal'
}, '*')

window.addEventListener('message', () => {
  handleMessage(event)
})

function handleMessage(event) {
  const data = event.data
  switch (data.cmd) {
    case 'map_data':
      houseData = data.data;
      floorIndex = data.floor;
      new MapDom(1, houseData)
      new MapStyle(1)
      comWorld = new ComWorld()
      comWorld.init()

      let gateRedEl = document.getElementsByClassName('gate-red')[0]
      let gateOrangeEl = document.getElementsByClassName('gate-orange')[0]
      let gateGreenEl = document.getElementsByClassName('gate-green')[0]

      if (data.status === 'store') {
        gateRedEl.style.display = 'block'
        gateOrangeEl.style.display = 'block'
        gateGreenEl.style.display = 'block'
      } else if(data.status === 'single'){
        gateRedEl.style.display = 'block'
        gateOrangeEl.style.display = 'block'
        gateGreenEl.style.display = 'none'
      } else {
        gateRedEl.style.display = 'none'
        gateOrangeEl.style.display = 'none'
        gateGreenEl.style.display = 'none'
      }
      break;
    case 'gate_data':
      comWorld.receiveGateInfo(data.data)
      break
    case 'gate_cancel':
        comWorld.cancelGate(data.type)
      break
    case 'nav_change_floor':
      comWorld.handleNavChangeFloor(data.data)
      break
    case 'exist_gate_data':
      comWorld.receiveExistGateInfo(data.data)
    break

    case 'color_data':
      let data2
      if (data.data.trieNodeList) {
        data2 = data.data.trieNodeList
      } else {
        data2 = data.data
      }
      comWorld.receiveColorInfo(data.data)
      break
  }
}