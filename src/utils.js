import * as THREE from 'three';
import { Box } from './models/Box';

export function canAvoidCollision(box1, box2) {
    return (box1.position.x - box2.position.x > 1) 
    || (box2.position.x - box1.position.x > 1);
}

export function boxesCollided(box1, box2) {
    const avoidsCollision = canAvoidCollision(box1, box2);
    const headOnDelta = box1.back - box2.front;
    const rearDelta = box2.back - box1.front;

    const headOnCollision = (headOnDelta > 0) && (headOnDelta < 0.1);
    const rearCollision = (rearDelta > 0) && (rearDelta < 0.1);

    const xCollision = (headOnCollision || rearCollision) && !avoidsCollision;

    return xCollision;
}

export function boxFellOffGround(box, ground) {
    const itFell = box.bottom + box.velocity.y <= ground.top - 2.25;
    return itFell;
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