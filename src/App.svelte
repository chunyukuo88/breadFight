<script lang="ts" type="module">
    import * as THREE from 'three';
    import { 
        boxesCollided, 
        createCube, 
        createGround, 
        createLight 
    } from './utils';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4.61, 2.74, 8)

  
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    const controls = new OrbitControls(camera, renderer.domElement);
  
    const heroCubePosition = {
        x: 0,
        y: 0.25,
        z: 0,
    };
    const heroVelocity = {
        x: 0,
        y: 0,
        z: 0,
    };
    const cube = createCube(heroCubePosition, heroVelocity);
    scene.add(cube);

    const red = 0xFF0000;
    const enemyPosition = {
        x: 0,
        y: -1.25,
        z: -42,
    };
    const enemyVelocity = {
        x: 0,
        y: 0,
        z: 0.1,
    };
    const enemy = createCube(enemyPosition, enemyVelocity, red);
    scene.add(enemy);

    const ground = createGround();
    scene.add(ground);
    
    const light = createLight();
    scene.add(light);
    camera.position.z = 5;
  
    const keys = {
        w: { pressed: false },
        a: { pressed: false },
        s: { pressed: false },
        d: { pressed: false },
        Space: { pressed: false },
    };

    function handleKeyUp(e) {
        switch (e.code) {
        case 'KeyA':
            keys.a.pressed = false;
            break;
        case 'KeyD':
            keys.d.pressed = false;
            break;
        case 'KeyS':
            keys.s.pressed = false;
            break;
        case 'KeyW':
            keys.w.pressed = false;
            break;
        }
    }
    
    function handleKeydown(e){
        switch (e.code) {
        case 'KeyA':
            keys.a.pressed = true;
            break;
        case 'KeyD':
            keys.d.pressed = true;
            break;
        case 'KeyS':
            keys.s.pressed = true;
            break;
        case 'KeyW':
            keys.w.pressed = true;
            break;
        }
        if (e.code === 'Space' && cube.position.y < 1) {
            cube.velocity.y = 0.3;
        }
    }

    const enemies = [enemy];
    const movementDelta = 0.08;

    function animate() {
        const animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
        cube.update(ground);

        
        const { velocity } = cube;
        const { a, d, w, s } = keys;
        velocity.x = 0;
        velocity.z = 0;

        enemies.forEach(enemy => {
            enemy.update(ground)
            if (boxesCollided(cube,enemy)) {
                cancelAnimationFrame(animationId);
            }
        });

        if (a.pressed) {
            velocity.x = -1 * movementDelta;
        }
        if (d.pressed) {
            velocity.x = movementDelta;
        }
        if (w.pressed) {
            velocity.z = -1 * movementDelta;
        }   
        if (s.pressed) {
            velocity.z = movementDelta;
        }   
    }
    animate();

</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyUp} />

