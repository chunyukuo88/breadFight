<script lang="ts" type="module">
    import * as THREE from 'three';
    import { 
        boxesCollided, 
        createCube, 
        createGround, 
        createLight,
        createStripe
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
    camera.position.z = 5;
  
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xabcdef);
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    // This allows for the camera to be rotatable.
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

    const ground = createGround();
    scene.add(ground);
    
    const light1 = createLight(-1, 3, 2);
    scene.add(light1);
    
    const light2 = createLight(3, 5, -10);
    scene.add(light2);
  
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

    
    const roadStripes = [];
    const enemies = [];
    const movementDelta = 0.08;
    let frames = 0;

    function animate() {
        const animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
        cube.update(ground);

        if (frames % 120 === 0) {
            const newStripe = createStripe();
            newStripe.color = 'white';
            scene.add(newStripe);
            roadStripes.push(newStripe);
        }
        if (frames % 30 === 0) {
            const red = 0xFF0000;
            const randomLane = (Math.random() * 5) - 2.25;
            const enemyPosition = {
                x: randomLane,
                y: 0,
                z: -42,
            };
            const enemyVelocity = {
                x: 0,
                y: 0,
                z: 0.05,
            };
            const zAcceleration = true;
            const newEnemy = createCube(enemyPosition, enemyVelocity, red, zAcceleration);
            newEnemy.castShadow = true;
            scene.add(newEnemy);
            enemies.push(newEnemy);
        }

        
        const { velocity } = cube;
        const { a, d, w, s } = keys;
        velocity.x = 0;
        velocity.z = 0;

        roadStripes.forEach(stripe => {
            stripe.update(ground);
        });
        enemies.forEach(enemy => {
            enemy.update(ground);
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
        frames++;
    }
    animate();

</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyUp} />

