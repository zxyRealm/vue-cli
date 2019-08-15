class MapChainDom {
  constructor () {
    this.app = document.getElementById('chain')
    this.app.appendChild(MapChainDom.createBox())
  }

  static createBox () {
    let infoBoxUl = document.createElement('div')
    infoBoxUl.setAttribute('id', 'infoBox')
    return infoBoxUl;
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
export default MapChainDom
