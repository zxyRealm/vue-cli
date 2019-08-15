import World from '../scene/mapWorld'

class Bloom {
  constructor(scene, camera, renderer) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.renderScene = new THREE.RenderPass(scene, camera)
    var renderTargetParameters = { 
      minFilter: THREE.LinearFilter, 
      magFilter: THREE.LinearFilter, 
      format: THREE.RGBAFormat, 
      stencilBuffer: false, 
      depthBuffer:false 
    }
    this.renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, renderTargetParameters );
  }

  get mixer() { return this.mixer }
  set mixer(val) { this.mixer = val }

  vertexShader() {
    return `
    varying vec2 vUv;
    void main() {
      vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`
  }

  // fragmentShader() {
  //   return `
  //   uniform sampler2D baseTexture;
  //   uniform sampler2D bloomTexture;
  //   uniform float iTime;
  //   varying vec2 vUv;
  //   vec4 getTexture( sampler2D texture ) {
  //     return mapTexelToLinear( texture2D( texture , vUv ) );
  //   }
  //   vec3 v3( float x, float y, float z ){
  //     return vec3( x, y, z );
  //   }
  //   vec3 h2rgb( float hue ){
  //     float h = abs(hue - floor(hue)) * 6.;
  //     vec3 c = vec3( 0., 0., 0. );
       
  //     int f = int(floor( h ));
        
  //     if(f == 0)c = v3(1., h, 0.);
  //     else if(f == 1)c = v3(2.-h, 1., 0.);
  //     else if(f == 2)c = v3(0., 1., h-2.);
  //     else if(f == 3)c = v3(0., 4.-h, 1.);
  //     else if(f == 4)c = v3(h-4., 0., 1.);
  //     else c = v3(1., 0., 6. - h);
      
  //     return c;
  //   }
  //   void main() {
  //     vec3 originColor = h2rgb( iTime / 10. );
  //     gl_FragColor = ( getTexture( baseTexture ) + vec4( 1.0 ) * getTexture( bloomTexture ) );
  //   }`
  // }

  fragmentShader () {
    return `
    uniform sampler2D baseTexture;
		uniform sampler2D bloomTexture;
			varying vec2 vUv;
			vec4 getTexture( sampler2D texture ) {
				return mapTexelToLinear( texture2D( texture , vUv ) );
			}
			void main() {
				gl_FragColor = ( getTexture( baseTexture ) + vec4( 1.0 ) * getTexture( bloomTexture ) );
			}
    `
  }

  shining (pos) {
    let geometry = new THREE.CircleGeometry( 1.2, 128 )
    let material = new THREE.MeshBasicMaterial( { color: '#FFFF00', side: THREE.DoubleSide } )
    let sphere = new THREE.Mesh(geometry, material)
    this.scene.add( sphere )
    sphere.name = 'shine'
    sphere.layers.enable(1)

    var scaleKF = new THREE.VectorKeyframeTrack( '.scale', [ 0, 0.5, 1, 1.5, 2], [ 0.7, 0.7, 0.7, 1.2, 1.2, 1.2, 0.8, 0.8, 0.8, 1.2, 1.2, 1.2, 0, 0, 0] );
    var clip = new THREE.AnimationClip( 'Action', 3, [ scaleKF ] )
    Bloom.mixer = new THREE.AnimationMixer( sphere );
    var clipAction = Bloom.mixer.clipAction( clip );

    // clipAction.setLoop( THREE.LoopOnce )
    // clipAction.play();
    // Bloom.mixer.addEventListener( 'finished', ( e ) => { 
    //   sphere.visible = false
    // });

    return sphere;
  }

  removeEntity(object) {
    var selectedObject = this.scene.getObjectByName(object.name);
    this.scene.remove( selectedObject );
    // animate();
}

  setBloomPass () {
    let bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.1, 0.05)

    bloomPass.threshold = 0;
    bloomPass.strength = 6;
    bloomPass.radius = 1.1;

    this.bloomComposer = new THREE.EffectComposer(this.renderer)
    this.bloomComposer.renderToScreen = false
    this.bloomComposer.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)
    this.bloomComposer.addPass( this.renderScene )
    this.bloomComposer.addPass( bloomPass )
    // this.bloomComposer.needsSwap = true
    return this.bloomComposer
  }

  setFinalPass () {
    let finalPass = new THREE.ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          // iTime: World.time,
          baseTexture: {value: null},
          bloomTexture: {value: this.bloomComposer.renderTarget2.texture}
        },
        vertexShader: this.vertexShader(),
        fragmentShader: this.fragmentShader(),
        defines: {}
      }), 'baseTexture'
    );
    // finalPass.uniforms['resolution'].value.set(1 / (window.innerWidth * dpr), 1 / (window.innerHeight * dpr));
    // finalPass.renderToScreen = true;

    let finalComposer = new THREE.EffectComposer( this.renderer)
    finalComposer.setSize( window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)
    finalComposer.addPass( this.renderScene )
    finalComposer.addPass( finalPass )
    finalComposer.needsSwap = true
    
    return finalComposer
  }
}
export default Bloom