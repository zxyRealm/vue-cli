// object => mesh
THREE.BloomGeometry = function(mesh) {
  this.mesh = mesh

  this.setGeometry = function(geometry, length) {
    let vertexNormals = new Array(geometry.vertices.length)
    // 把每个面归一化
    geometry.faces.forEach(face => {
      if (face instanceof THREE.Face4) {
        vertexNormals[face.a] = face.vertexNormals[0]
        vertexNormals[face.b] = face.vertexNormals[1]
        vertexNormals[face.c] = face.vertexNormals[2]
        vertexNormals[face.d] = face.vertexNormals[3]
      } else if (face instanceof THREE.Face3) {
        vertexNormals[face.a] = face.vertexNormals[0]
        vertexNormals[face.b] = face.vertexNormals[1]
        vertexNormals[face.c] = face.vertexNormals[2]
      } else console.assert(false)
    })

    // 通过法向量修改每个顶点
    geometry.vertices.forEach(function(vertex, idx) {
      var vertexNormal = vertexNormals[idx]
      vertex.x += vertexNormal.x * length
      vertex.y += vertexNormal.y * length
      vertex.z += vertexNormal.z * length
    })
  }

  this.createMaterial = function() {
    var vertexShader = `
		varying vec3 vVertexWorldPosition;					// 世界坐标系下顶点坐标
		varying vec3 vVertexNormal; 								// 法向量
		void main(){
			vVertexNormal	= normalize(normalMatrix * normal);
			vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
			gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`
    var fragmentShader = `
		uniform vec3 glowColor;											// 颜色
		uniform float coeficient; 									// 发光因子
		uniform float power; 												// 发光强度
		varying vec3 vVertexNormal;
		varying vec3 vVertexWorldPosition;
		void main(){
			vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
			vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
			viewCameraToVertex = normalize(viewCameraToVertex);
			float intensity = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);
			gl_FragColor = vec4(glowColor, intensity);
		}
	`
    var material = new THREE.ShaderMaterial({
      uniforms: {
        coeficient: {
          type: 'f',
          value: 1.0
        },
        power: {
          type: 'f',
          value: 2
        },
        glowColor: {
          type: 'c',
          value: new THREE.Color('#ffffff')
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    })

    return material
  }

  this.createMesh = function() {
    var object3d = new THREE.Object3D()
	
	var geometry = mesh.geometry.clone()
	this.setGeometry(geometry, 0.1)
	var material = this.createMaterial()
	material.uniforms.glowColor.value	= new THREE.Color('#ffffff')
	material.uniforms.coeficient.value = 1
	material.uniforms.power.value	= 0.9
	material.side	= THREE.FrontSide
	var insideMesh = new THREE.Mesh(geometry, material )
	object3d.add(insideMesh)

	var geometry	= mesh.geometry.clone()
	this.setGeometry(geometry, 0.1)
	var material = this.createMaterial()
	material.uniforms.glowColor.value	= new THREE.Color('#ffffff')
	material.uniforms.coeficient.value	= 0.7
	material.uniforms.power.value		= 0.9
	material.side	= THREE.BackSide
	var outsideMesh	= new THREE.Mesh(geometry, material)
	object3d.add(outsideMesh)

	this.object3d	= object3d
	this.insideMesh	= insideMesh
	this.outsideMesh = outsideMesh
  }

  this.createMesh()
}

// THREE.BloomGeometry.prototype.constructor = THREE.BloomGeometry

// Object.defineProperties(THREE.BloomGeometry.prototype, {})
