class MapDom {
  constructor (mode, data) {
    this.mode = mode
    this.data = data
    this.createPage()
  }

  createPage () {
    this.app = document.getElementById('map')
    this.app.appendChild(MapDom.createButtonUlDom(this.mode, this.data))
    this.app.appendChild(MapDom.createGateDom(this.mode))
    this.app.appendChild(MapDom.createLevitatenDom(this.mode))
    this.app.appendChild(MapDom.createExistGateDom(this.mode))
  }

  static createButtonUlDom (mode, list) {
    let buttonUl = document.createElement('div')
    buttonUl.setAttribute('id', 'button-ul')
    let floor = `
    <% if (mode === 0) { %>
    <a href='javascript:;' id='all' class='active'>总</a>
    <% } %>
    <span id="floor">
    <% for(let i = 0; i < list.length; i++) { %>
      <a data-value='<%= list[i].floor %>'><%= list[i].name %></a>
    <% } %>
    </span>
    <% if (mode === 0 && list.length > 10000) { %>
    <a href='javascript:;' id='upfloor'>上升</a>
    <a href='javascript:;' id='downfloor'>下降</a>
    <% } %>
    <div style="none" id="singleStore"></div>
    `
    let parse = eval(MapDom.compile(floor))
    buttonUl.innerHTML = parse()
    return buttonUl
  }

  static createGateDom (mode) {
    let gateGroup = document.createElement('div')
    gateGroup.setAttribute('id', 'gate-group')

    let item = `
    <% if (mode === 1) { %>
    <div class="gate-item gate-orange" data-type="2">
      <img src="./static/camera-outside.png" alt="">
      <span>外部出入口</span>
    </div>
    <div class="gate-item gate-red" data-type="1">
      <img src="./static/camera-inside.png" alt="">
      <span>内部出入口</span>
    </div>
    <div class="gate-item gate-green" data-type="3">
      <img src="./static/camera-post.png" alt="">
      <span>通道</span>
    </div>
    <% } %>
    `
    let parse = eval(MapDom.compile(item))
    gateGroup.innerHTML = parse()
    return gateGroup
  }

  static createExistGateDom (mode, domString) {
    let existGateGroup = document.createElement('div')
    existGateGroup.setAttribute('id', 'existGate')

    let item = `
    <% if (mode === 1) { %>
      <div class="tip-text">
        已建出入口/通道可移动到地图对应位置
      </div>
      <div class="gate-list" id="gateList">
      </div>
    <% } %>
    `
    let parse = eval(MapDom.compile(item))
    existGateGroup.innerHTML = parse()
    return existGateGroup
  }

  static createLevitatenDom () {
    let levitaten = document.createElement('div')
    levitaten.setAttribute('id', 'device__popper--wrap')
    levitaten.setAttribute('class', 'levitaten')

    let context = `
    <div class="title">
      <div class="pull-right">
        <img src="./static/edit_icon2x.png" data-type="editPortal" alt="">
        <img src="./static/delete_icon.png" data-type="deletePortal" alt="">
      </div>
      <div class="pull-left">
        <p id="device--title" class="ellipsis"></p>
      </div>
    </div>
    <div class="device-list-wrap">
      <ul class="device-list" id="device--list">
      </ul>
    </div>
    <div class="add-button">
      <a href="javascript:void (0);" data-type="add">添加设备</a>
    </div>
    <div class="horizontal-line"></div>
    `
    levitaten.innerHTML = context
    return levitaten
  }

  static compile (template) {
    const evalExpr = /<%=(.+?)%>/g
    const expr = /<%([\s\S]+?)%>/g

    template = template.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`').replace(expr, '`); \n $1 \n  echo(`')

    template = 'echo(`' + template + '`);'

    let script = `(function parse(data){
      let output = "";
  
      function echo(html){
        output += html;
      }
  
      ${template}
  
      return output;
    })`

    return script
  }
}

export default MapDom
