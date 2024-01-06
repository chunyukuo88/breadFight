<script lang="ts" type="module">
    import * as THREE from 'three';
    import { Box } from './models/Box';
    import { createCube, createGround, createLight } from './utils';
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
  
    const cube = createCube();
    scene.add(cube);

    const ground = createGround();
    scene.add(ground);
    
    const light = createLight();
    scene.add(light);
    camera.position.z = 5;
  
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      cube.update(ground);
    }
    animate();

    function handleKeydown(e){
        switch(e.code) {
            case 'KeyA': {
                cube.velocity.x = -0.105;
                cube.update();
                break;
            }
            case 'KeyD': {
                cube.velocity.x = 0.105;
                cube.update();
                break;
            }
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

