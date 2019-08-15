const templateReg = /\${([^{}])+}/g;
class Compile {
  constructor(node, data) {
    this.compileNode(node);
    this.data = data;
    node.hasChildNodes() ? this.compileNodeList(node.childNodes) : null;
  }

  // 解析节点list
  compileNodeList(nodeList) {
    let childListFn, node;
    for (node of nodeList) {
      if (node.nodeType == 1 && node.hasAttribute("m-repeat")) {
        this.compileElement(node);
      } else {
        this.compileNode(node);
        node.hasChildNodes ? this.compileNodeList(node.childNodes) : null;
      }
    }
  }

  // 解析节点 
  compileNode(node) {
    if (node.nodeType == 1) {
      this.compileElement(node);
    } else if (node.nodeType == 3) {
      this.compileText(node, this.data);
    }
  }

  // 解析节点元素
  compileElement(node) {
    //解析指令
    var dirs = node.attributes;
    if (node.hasAttribute("m-repeat")) {
      this.dealDir("m-repeat", node, dirs);
    }

    if (node.getAttribute("m-show")) {
      this.dealDir("m-show", node, dirs);
    }

    if (node.getAttribute("m-hide")) {
      this.dealDir("m-hide", node, dirs);
    }
  }

  // 解析节点元素内容
  compileText(node, data) {
    //解析模板
    if (!node.data) {
      return;
    }
    node.data = this.compileTemplate(node.data)(data);
  }

  // 解析模板
  compileTemplate(textFragment) {
    let res = null;
    let keyArray = [];
    while (res = templateReg.exec(textFragment)) {
      let key = res[0].slice(2, res[0].length - 1);
      keyArray.push(key);
    }
    for (let item of keyArray) {
      let nReg = new RegExp("\\${" + item + "}", "g");
      let dataStr = this.dealText(item);
      dataStr = dataStr.replace(/\\/g, "");
      textFragment = textFragment.replace(/\\/g, "");
      textFragment = textFragment.replace(nReg, dataStr);
    }
    return new Function("data", "return `" + textFragment + "`");
  }

  // 处理模板内容
  dealText(text) {
    if (!text) {
      return;
    }
    let dataStrStart = "${data.";
    let dataStrEnd = "}";
    return dataStrStart + text + dataStrEnd;
  }

  createDocFragment() {
    let docFragment = null;
    return docFragment = document.createDocumentFragment();
  }

  // 处理指令
  dealDir(type, node, dirs) {
    switch (type) {
      case "m-repeat":
        ((node, dirs) => {
          let dirArr = node.getAttribute("m-repeat").split(" ");
          node.removeAttribute("m-repeat")
          let parentNode = node.parentNode;
          let docFragment = this.createDocFragment();
          let len = this.data[dirArr[2]].length;
          let i = 0;
          while (len) {
            let cloneNode = node.cloneNode(true);
            cloneNode.setAttribute("index", i);
            let nodeText = cloneNode.childNodes[0].data;
            let res = null;
            let keyArray = [];
            while (res = templateReg.exec(nodeText)) {
              let key = res[0].slice(3 + dirArr[0].length, res[0].length - 1);
              keyArray.push(key);
            }
            for (let item of keyArray) {
              let nReg = new RegExp("\\${" + dirArr[0] + "." + item + "}", "g");
              cloneNode.innerHTML = cloneNode.innerHTML.replace(nReg, "${" + dirArr[2] + "\\[" + i + "\\]\\." + item + "}");
            }
            docFragment.appendChild(cloneNode);
            len--;
            i++;
          }
          parentNode.appendChild(docFragment);
          parentNode.removeChild(node);
        })(node, dirs);
        break;
      case "m-show":
        ((node, dirs) => {
          let flag = node.getAttribute("m-show");
          let isShow = this.data[flag]
          if (isShow) {
            node.style.display = "none";
          }
        })(node, dirs)
        break;
      case "m-hide":
        ((node, dirs) => {
          let flag = node.getAttribute("m-hide");
          let isShow = this.data[flag]
          if (!isShow) {
            node.style.display = "none";
          }
        })(node, dirs)
        break;
    }
  }
}
export default Compile