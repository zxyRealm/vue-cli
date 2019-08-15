import World from '../scene/mapWorld'
import { ScreenToWorld } from '../util/TransformAlex'
import { SpriteText2D, MeshText2D, textAlign } from 'three-text2d'
import Sprite from '../object/Sprite';                    // sprite
class Gate {
  static textGateArr = []
  constructor() {}
  /**
   * handle drag and click down event, and picture will transform to sprite
   * 
   * @param { domElement } el     parent element
   * @param { event } e           window event
   */
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
        let newScreen = ScreenToWorld({x: event.clientX, y: event.clientY})
        let data = {}
        let object = new THREE.Object3D()
        object.name = 'schrodingerName'
        World.mainGroup.children[floor - 1].add(object)
        object.position.set(newScreen.x, 10, -newScreen.y)

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
        
        // create gate text
        let meshText = this.createText2(text, 'gateText', 6)
        meshText.position.z = 10
        object.add(meshText)

        World.schrodingerGate = {
          floor: floor,
          name: object.name,
          realName: 'gateGroup'
        }
      }
    }
  }

  createExistGate (gateInfo, spriteList) {
    let object = new THREE.Object3D()
    object.name = 'gateGroup'
    object.position.set(gateInfo.coord.x, 10, -gateInfo.coord.y)

    let pic = this.createPic(gateInfo.src)
    pic.info = data
    spriteList.push(pic)
    
    let text = this.createText2(gateInfo.name, 'gateText')
    object.add(text)
    
    return object
  }

  createPic (src, data, trigger = false) {
    let sprite = new Sprite()
    let scale = new THREE.Vector3(12, 7, 8)
    let mesh = sprite.createPic(src, scale)
    mesh.name = 'gate'
    
    return mesh
  }

  createText2 (context, name, fontSize) {
    const textScale = 9 / 100000
    var text = new SpriteText2D(context, { 
      align: textAlign.center, 
      font: 'bold ' + 100 + 'px Arial', 
      fillStyle: '#ffffff', 
      antialias: true 
    })
    text.name = name
    text.material.transparent = true
    text.material.opacity = true
    text.material.alphaTest = 0.5
    text.material.sizeAttenuation = false
    text.scale.set(textScale, textScale, 1)
    Gate.textGateArr.push(text)
    return text
  }

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
    Gate.textGateArr.push(earthLabel)
    return earthLabel
  }

  createRealGate (src, data, trigger = false) {
    // create gate sprite
    let sprite = new Sprite()
    let scale = new THREE.Vector3(12, 7, 8)
    let mesh = sprite.createPic(src, scale)
    mesh.name = 'gate'

    if (!trigger) {
      window.parent.postMessage({
        cmd: 'gate_info',
        data: data
      }, '*')
    }

    return mesh
  }

  createLevitateBox (screenAlex) {
    var levitaten = document.getElementById('device__popper--wrap')
    if (screenAlex) {
      var hl = document.getElementsByClassName('horizontal-line')[0]
      var line = document.getElementsByClassName('add-button')[0]
      line.setAttribute('data-visible', false)
      hl.style.width = '0px'
      var wy = screenAlex.y - 172
      var wx = screenAlex.x - 100
      if (wx < 0 ) {
        wx = 0
      }
      if (wy < 0) {
        if ((wx + 114 > screenAlex.x) && 150 > screenAlex.y) {
          hl.style.top = screenAlex.y + 'px'
          hl.style.right = -24 + 'px'
          hl.style.width = 22 + 'px'
          line.setAttribute('data-visible', true)
          wx -= 44
        }
        wy = 0
      }
      levitaten.style.top = wy + 'px'
      levitaten.style.left = wx + 'px'
      levitaten.style.display = 'block'
    } else {
      levitaten.style.display = 'none'
    }
  }
}
export default Gate