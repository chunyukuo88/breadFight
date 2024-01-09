import * as THREE from 'three';
import { Box } from './models/Box';

export function boxesCollided(box1, box2) {
    return box1.bottom + box1.velocity.y <= box2.top - 2.25;
}

export function createCube(x, y, z, color = undefined) {
    const cubeSide = 1;
    const cube = new Box({
        initPosition: { x, y, z },
        color,
        height: cubeSide, 
        width: cubeSide, 
        depth: cubeSide,
        velocity: {
            x: 0,
            y: -0.01,
            z: 0,
        },
    });
    cube.castShadow = true;
    return cube;
}

export function createGround() {
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
    return ground;
}

export function createLight() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.y = 3;
    light.position.z = 2;
    light.castShadow = true;
    return light;
}