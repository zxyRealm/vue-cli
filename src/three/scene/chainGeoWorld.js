// import BloomGeometry from '../util/BloomGeometry'
class ChainWorld {
  static flowData

  scene
  camera
  renderer

  controls

  width = window.innerWidth // 画布宽
  height = window.innerHeight // 画布高
  container = document.body // canvas画布容器

  provinceList = []

  clock = new THREE.Clock() // 动画clock

  countryGroup = new THREE.Object3D()
  countryLineGroup = new THREE.Object3D()
  provinceGroup = new THREE.Object3D()
  provinceLineGroup = new THREE.Object3D()
  cityGroup = new THREE.Object3D()
  cityLineGroup = new THREE.Object3D()

  status = 'country'
  coverMeshName

  constructor (mapData, flowData) {
    this.mapData = mapData
    ChainWorld.flowData = flowData
    this.chainEl = document.getElementById('chain')
    this.vector3json = []
    this.vector3object = {}
  }

  init () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.5, 1000)
    this.camera.position.set(0, 0, 150)

    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(this.width, this.height)
    document.body.appendChild(this.renderer.domElement)

    var controls = new THREE.OrbitControls(this.camera)
    controls.enableZoom = true
    controls.enableRotate = false
    controls.screenSpacePanning = false

    this.setInitDom()
    this.drawMap(this.mapData, 120, this.countryGroup, this.countryLineGroup, [105.0668, 38.8818])
    this.drawLightBar(lightBarData)
    this.render()

    window.addEventListener('mousedown', () => {
      this.onDocumentMouseClick(event)
    }, false)

    window.addEventListener('mousemove', () => {
      this.onDocumentMouseMove(event)
    }, false)

    window.addEventListener('resize', () => {
      this.onWindowResize(event)
    }, false)

    document.getElementById('back').addEventListener('click', () => {
      if (this.status === 'city') {
        window.parent.postMessage({
          cmd: 'province_signal',
          data: this.provinceId,
          center: this.provinceCenter,
          name: this.provinceName
        }, '*')
      } else if (this.status === 'province') {
        ChainWorld.flowData = flowData
        this.setInitDom()
        this.resetGroup()
        this.status = 'country'
        this.drawMap(this.mapData, 120, this.countryGroup, this.countryLineGroup, [105.0668, 38.8818])
      }
    })
  }

  setInitDom () {
    let item = `
      <div id="province">${ChainWorld.flowData.name}</div>
      <div id="store"><span>${ChainWorld.flowData.totalFlow}</span>家分店</div>
    `
    this.chainEl.innerHTML = item
  }

  onWindowResize () {
    var width = window.innerWidth
    var height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  drawBloomPoint () {
    let texture = new THREE.TextureLoader().load('./static/shining.png')
    let geometry = new THREE.CircleGeometry(5, 32)
    let material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('yellow'),
      map: texture,
      transparent: true
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 20)
    this.scene.add(mesh)
  }

  drawLightBar (data) {
    const group = new THREE.Group()
    group.rotation.x = -Math.PI
    group.name = 'light'
    data.forEach(d => {
      const { cp } = this.vector3object[d.name]
      const [x, y, z] = this._lnglatToVector3(cp, 120, [105.0668, 38.8818])
      let texture = new THREE.TextureLoader().load('./static/shining.png')
      let geometry = new THREE.CircleGeometry(5, 32)
      let material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('yellow'),
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      })
      let mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(x, y, z - 1)
      group.add(mesh)
    })
    this.scene.add(group)
  }

  drawMap (data, scale, group, lineGroup, center) {
    group.name = 'field'
    lineGroup.name = 'line'
    this.vector3json = []
    data.features.forEach(item => {
      let areas = []
      item.geometry.coordinates.forEach(arr => {
        areas = areas.concat(arr)
      })
      const areasData = { ...item.properties, coordinates: [] }
      areas.forEach((point, i) => {
        if (point[0] instanceof Array) {
          areasData.coordinates[i] = []
          point.forEach(pointInner => {
            areasData.coordinates[i].push(this._lnglatToVector3(pointInner, scale, center))
          })
        } else {
          areasData.coordinates.push(this._lnglatToVector3(point, scale, center))
        }
      })
      this.vector3object[item.properties.name] = areasData
      this.vector3json.push(areasData)
    })

    this.vector3json.forEach(provinces => {
      let line, mesh
      if (provinces.coordinates[0][0] instanceof Array) {
        provinces.coordinates.forEach(area => {
          line = this.getAreaLinesMesh(area)
          mesh = this.getAreaMesh(area, provinces)
          group.add(mesh)
          lineGroup.add(line)
        })
      } else {
        line = this.getAreaLinesMesh(provinces.coordinates)
        mesh = this.getAreaMesh(provinces.coordinates, provinces)
        group.add(mesh)
        lineGroup.add(line)
      }

      ChainWorld.flowData.children.forEach(data => {
        if (data.province === mesh.province) {
          mesh.material.color = this.setColor(data.type)
          mesh.color = mesh.material.color
          mesh.amount = data.totalFlow
        }
      })
    })

    this.scene.add(group)
    this.scene.add(lineGroup)
  }

  getAreaLinesMesh (points) {
    let material = new THREE.LineBasicMaterial({
      color: 0x2b51ed,
      transparent: true,
      opacity: 1
    })

    let geometry = new THREE.Geometry()
    let arr = []
    points.forEach(d => {
      const [x, y, z] = d
      arr.push(new THREE.Vector3(x, y, z - 0.1))
    })
    geometry.vertices.push(...arr)
    let line = new THREE.Line(geometry, material)
    line.rotation.x = -Math.PI
    return line
  }

  getAreaMesh (points, province) {
    const shape = new THREE.Shape()

    points.forEach((p, i) => {
      const [x, y] = p
      if (i === 0) {
        shape.moveTo(x, y)
      } else if (i === points.length - 1) {
        shape.quadraticCurveTo(x, y, x, y)
      } else {
        shape.lineTo(x, y, x, y)
      }
    })

    var extrudeSettings = {
      depth: 1,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1
    }

    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings)
    let material = new THREE.MeshBasicMaterial({
      color: mode ? 'rgb(255, 255, 255)' : 'rgb(28, 30, 54)',
      transparent: true,
      opacity: 1,
      side: THREE.FrontSide
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.centerPoint = province.cp
    mesh.name = province.name
    mesh.province = province.name
    mesh.provinceId = province.id
    mesh.rotation.x = -Math.PI
    mesh.color = mesh.material.color

    return mesh
  }

  onDocumentMouseClick (event) {
    let raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1

    raycaster.setFromCamera(mouse, this.camera)

    this.scene.children.forEach(group => {
      if (group.name === 'field') {
        let intersects = raycaster.intersectObjects(group.children)
        if (intersects.length > 0) {
          if (this.status === 'country') {
            window.parent.postMessage({
              cmd: 'province_signal',
              name: intersects[0].object.province,
              data: intersects[0].object.provinceId,
              center: intersects[0].object.centerPoint
            }, '*')
          }
          if (this.status === 'province') {
            window.parent.postMessage({
              cmd: 'city_signal',
              name: intersects[0].object.province,
              data: intersects[0].object.provinceId,
              center: intersects[0].object.centerPoint
            }, '*')
          }
          if (this.status === 'city') {
            alert(intersects[0].object.province)
          }
        }
      }
    })
  }

  lastCoverMeshName = '' // 保存当前Mesh Name，当鼠标移动到下一个mesh的时候作为比较
  onDocumentMouseMove () {
    let raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let infoBoxEl = document.getElementById('infoBox')
    mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1

    raycaster.setFromCamera(mouse, this.camera)

    // 遍历场景里所有组
    let group = this.scene.children.filter(item => item.name === 'field')[0]
    let intersects = raycaster.intersectObjects(group.children)
    if (intersects.length > 0) {
      // 遍历所有 mesh，也就是省份
      group.children.forEach(mesh => {
        mesh.material.color = mesh.color
        // 根据 name 判断是否为当前射线相交的 mesh
        if (mesh.name === intersects[0].object.name) {
          // 根据 mesh.amount 判断是否存在数量
          if (intersects[0].object.amount) {
            mesh.material.color = new THREE.Color('#7691FF')
            this.lastCoverMeshName = mesh.name

            let { province, amount } = mesh
            let item = `
              <div id="province">${province}</div>
              <div id="store"><span>${amount}</span>家分店</div>
            `
            this.chainEl.innerHTML = item
          } else {
            if (this.lastCoverMeshName) {
              let mesh = this.scene.getObjectByName(this.lastCoverMeshName)
              mesh.material.color = mesh.color
              let item = `
              <div id="province">${ChainWorld.flowData.name}</div>
              <div id="store"><span>${ChainWorld.flowData.totalFlow}</span>家分店</div>
              `
              this.chainEl.innerHTML = item
            }
          }
        }
      })
    } else {
      if (this.lastCoverMeshName) {
        let mesh = this.scene.getObjectByName(this.lastCoverMeshName)
        mesh.material.color = mesh.color
        let item = `
          <div id="province">${ChainWorld.flowData.name}</div>
          <div id="store"><span>${ChainWorld.flowData.totalFlow}</span>家分店</div>
        `
        this.chainEl.innerHTML = item
      }
    }
  }

  setColor (type) {
    const pallete = [
      { type: 0, color: new THREE.Color('rgb(28, 30, 54)') },
      { type: 1, color: new THREE.Color('#B8D8FF') },
      { type: 2, color: new THREE.Color('#64C0FF') },
      { type: 3, color: new THREE.Color('#3176FF') },
      { type: 4, color: new THREE.Color('#3333FF') },
      { type: 5, color: new THREE.Color('#1400D3') }
    ]
    let target = pallete.filter(item => item.type === type)
    return target[0].color
  }

  getProvinceMap (id, center, name) {
    $.get('./static/geometryProvince/' + id + '.json', data => {
      this.provinceId = id
      this.provinceCenter = center
      this.provinceName = name
      let scale = parseInt(data.size) / 100 * 50
      this.setInitDom()
      this.status = 'province'
      this.resetGroup()
      this.drawMap(data, scale, this.provinceGroup, this.provinceLineGroup, center)
    })
  }

  getCityMap (id, center) {
    $.get(`./static/geometryCouties/${id + (id.length === 6 ? '' : '00')}.json`, data => {
      this.setInitDom()
      let scale = 2800
      this.status = 'city'
      this.resetGroup()
      this.drawMap(data, scale, this.cityGroup, this.cityLineGroup, center)
    })
  }

  resetGroup () {
    this.lastCoverMeshName = ''

    let group = this.scene.getObjectByName('field')
    let lineGroup = this.scene.getObjectByName('line')
    this.scene.remove(group)
    this.scene.remove(lineGroup)

    this.cityGroup = new THREE.Object3D()
    this.cityLineGroup = new THREE.Object3D()
    this.countryGroup = new THREE.Object3D()
    this.countryLineGroup = new THREE.Object3D()
    this.provinceGroup = new THREE.Object3D()
    this.provinceLineGroup = new THREE.Object3D()
  }

  // 经纬度坐标转世界坐标
  _lnglatToVector3 (lnglat, scale, center) {
    const projection = d3.geoMercator().center(center).scale(scale).translate([0, 0])
    const [x, y] = projection([...lnglat])
    const z = 0
    return [x, y, z]
  }

  // 世界坐标转屏幕坐标
  worldToScreen (worldPoint) {
    var zd = this.camera.position.z
    var za = (67.5 * Math.PI) / 180
    var bx = (zd / Math.tan(za)) * (window.innerWidth / window.innerHeight)
    var by = zd / Math.tan(za)
    var pX = worldPoint.x / bx
    var pY = worldPoint.y / by
    var sX = ((pX + 1) * window.innerWidth) / 2
    var sY = (-(pY - 1) * window.innerHeight) / 2
    return { x: sX, y: sY }
  }

  render () {
    requestAnimationFrame(() => {
      this.render()
    })
    this.renderer.render(this.scene, this.camera)
  }
}

let world
let flowData = {}
let lightBarData = []
const mode = parseInt(getQueryVariable('mode'))
if (!mode) {
  document.getElementById('chain').style.display = 'none'
} else {
  document.getElementById('heatBar').style.display = 'none'
}

window.parent.postMessage({
  cmd: 'chain-load_signal'
}, '*')

window.addEventListener('message', () => {
  handleMessage(event)
})

function handleMessage (event) {
  const data = event.data
  switch (data.cmd) {
    case 'post_country_data':
      $.get(require('@/assets/public/three/map.json'), geoData => {
        flowData = data.data
        flowData.children.forEach(item => {
          // lightBarData.push({name: item.province})
        })
        world = new ChainWorld(geoData, flowData)
        world.init()
      })
      break
    case 'post_province_data':
      ChainWorld.flowData = data.data
      world.getProvinceMap(data.id, data.center, data.name)
      break
    case 'post_city_data':
      ChainWorld.flowData = data.data
      world.getCityMap(data.id, data.center, data.name)
      break
  }
}

function getQueryVariable (variable) {
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
