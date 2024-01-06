<script lang="ts" type="module">
    import * as THREE from 'three';
    import { Box } from './models/Box';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
  
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    const controls = new OrbitControls(camera, renderer.domElement);
  
    const cubeSide = 1;
    const cube = new Box({
        height: cubeSide, 
        width: cubeSide, 
        depth: cubeSide,
        velocity: {
            x: 0,
            y: -0.01,
            z: 0,
        },
        initPosition: {
            x: 0,
            y: 1,
            z: 0
        }
    });
    cube.castShadow = true;
    scene.add(cube);


    const ground = new Box({
        height: 5, 
        width: 0.5, 
        depth: 10,
        color: 0x0000ff,
        initPosition: {
            x: 0,
            y: -2,
            z: 0
        }
    });
    ground.receiveShadow = true;
    scene.add(ground);
  
    
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.y = 3;
    light.position.z = 2;
    light.castShadow = true;
    scene.add(light);
    camera.position.z = 5;
  
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      cube.update(ground);
    }
    animate();
</script>

