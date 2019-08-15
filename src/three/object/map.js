import Sprite from '../object/Sprite'

/**
 * @desc 地图类
 * @params shape 形状
 * @params options 材质对象
 */
class Map {
  constructor() {
    this.loader = new THREE.SVGLoader()
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

  // 创建网格
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

  loadMap(item, group, callback) {
    
    const originPosition = (item.floor - 2) * 140 - 60

    this.initTemplate(item.url, (path, shape) => {
      const options = {
        color: path.color,
        transparent: true,
        // depthTest: false,
        // depthWrite: false,
        side: THREE.FrontSide
      }

      let mesh = this.createMesh(shape, options, 'store')
      mesh.rotation.set(0.5 * Math.PI, 0, 0)
      mesh.userData.originPosition = originPosition
      mesh.userData.color = {
        r: mesh.material.color.r,
        g: mesh.material.color.g,
        b: mesh.material.color.b
      }
      // storeList.push(mesh)
      group.add(mesh)

    }, callback)
    group.position.y = originPosition
  }

  // board
  loadPlane(item, group, planeList) {
    const originPosition = (item.floor - 2) * 140 - 65
    let url = item.planeUrl || './static/bottom2.svg'
    group.userData.positionY = originPosition
    group.userData.positionZ = group.position.z
    this.initTemplate(url, (path, shape) => {
      const options = {
        color: '#1a425e',
        transparent: true,
        depthTest: true,
        depthWrite: true,
        opacity: 0.3
      }

      let mesh = this.createMesh(shape, options, 'plane')
      mesh.rotation.set(0.5 * Math.PI, 0, 0)
      mesh.position.y = -5
      mesh.userData = {
        originPosition: originPosition,
        groupInfo: item
      }
      group.userData.groupInfo = item
      planeList.push(mesh)
      group.add(mesh)
    })
  }
  
  // gate sprite
  createGateLogo(logo, group) {
    const sprite = new Sprite()
    const option = { opacity: 0 }
    const scale = new THREE.Vector3(20, 12, 15)
    let mesh = sprite.createPic(logo, scale, option)
    group.add(mesh)
  }

  // text sprite
  createFloorName(name, group) {
    const fontSize = 30
    let sprite = new Sprite()
    let option = { opacity: 1 }
    let mesh = sprite.createText(name, fontSize, option)
    group.add(mesh)
  }
}

export default Map;