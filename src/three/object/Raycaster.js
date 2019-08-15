import World from '../scene/mapWorld'

class Raycaster{

  constructor (event) {
    this.event = event
    this.raycaster = new THREE.Raycaster()
  }

  handleEvent (rayList, callback, emptyCallback = () => {}) {
    const mouse = new THREE.Vector2()
    const container = World.renderer.domElement
  
    mouse.x = (this.event.clientX / container.clientWidth) * 2 - 1
    mouse.y = - (this.event.clientY / container.clientHeight) * 2 + 1
    this.raycaster.setFromCamera(mouse, World.camera)
    
    let intersects = this.raycaster.intersectObjects(rayList)
    if (intersects.length > 0) {
      callback(intersects)
    } else {
      emptyCallback()
    }
  }
}

export default Raycaster