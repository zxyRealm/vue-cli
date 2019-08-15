class LineWorld {
  scene
  camera
  renderer
  controls

  width = window.innerWidth // 画布宽
  height = window.innerHeight // 画布高
  container = document.body // canvas画布容器

  constructor() {}

  init() {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.5, 10000)
    this.camera.position.set(0, 0, 200)

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setSize(this.width, this.height)
    document.body.appendChild(this.renderer.domElement)

    var controls = new THREE.OrbitControls(this.camera)
    controls.enableZoom = true
    // controls.enableRotate = false
    // controls.screenSpacePanning = false
    this.createMeshLine()
    this.render()
  }

  createMeshLine() {
    // var geometry = new THREE.Geometry()
    // for (var j = 0; j < 10; j += 1) {
    //   var v = new THREE.Vector3(j, j, j)
    //   geometry.vertices.push(v)
    // }

    const segmentLength = 1;
    const nbrOfPoints = 2;
    const points = [];
    for (let i = 0; i < nbrOfPoints; i++) {
      points.push(i * segmentLength, i * 2, 0);
    }
  
    const line = new MeshLine();
    line.setGeometry(points);
    const geometry = line.geometry;
    var material = new MeshLineMaterial({
      transparent: true,
      lineWidth: 0.3,
      color: new THREE.Color('#00ffff'),
      dashArray: 1,     // always has to be the double of the line
      dashOffset: 0,    // start the dash at zero
      dashRatio: 0.1,  // visible length range min: 0.99, max: 0.5
    })

    this.lineMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.lineMesh)
  }

  render() {

    this.lineMesh.material.uniforms.dashOffset.value -= 0.01

    requestAnimationFrame(() => {
      this.render()
    })
    this.renderer.render(this.scene, this.camera)
  }
}

let world = new LineWorld()
world.init()