import * as THREE from 'three';
import { Box } from './models/Box';
import { colors } from './constants.js';

function canAvoidCollision(box1, box2, dimension) {
    return (box1.position[dimension] - box2.position[dimension] > 1) 
    || (box2.position[dimension] - box1.position[dimension] > 1);
}

export function boxesCollided(box1, box2) {
    const avoidsCollisionX = canAvoidCollision(box1, box2, 'x');
    const avoidsCollisionY = canAvoidCollision(box1, box2, 'y')
    const avoidsCollisionZ = canAvoidCollision(box1, box2, 'z');
    const collisionMargin = 0.06;

    const headOnDelta = box1.back - box2.front;
    const rearDelta = box2.back - box1.front;

    const leftDelta = box1.left - box2.right;
    const rightDelta = box1.right - box2.left;

    const headOnCollision = (headOnDelta > 0) && (headOnDelta < collisionMargin);
    const rearCollision = (rearDelta > 0) && (rearDelta < collisionMargin);
    const rightCollision = (leftDelta > 0) && (leftDelta < collisionMargin);
    const leftCollision = (rightDelta > 0) && (rightDelta < collisionMargin);

    const xCollision = (headOnCollision || rearCollision) && !avoidsCollisionX && !avoidsCollisionY;
    const zCollision = (rightCollision || leftCollision) && !avoidsCollisionZ && !avoidsCollisionY;
    return xCollision || zCollision;
}

export function boxFellOffGround(box, ground) {
    const itFell = box.bottom + box.velocity.y <= ground.top - 2.25;
    return itFell;
}

export function createStripe() {
    const stripe = new Box({
        initPosition: { x: 0.25, y: -1.5, z: -42 },
        velocity: { x: 0, y: 0, z: 0.09 },
        color: 'white',
        height: 0.5,
        width: 0,
        depth: 3,
        zAcceleration: false
    });
    stripe.castShadow = false;
    return stripe;
}

export function createCube(position, velocity, color = undefined, zAcceleration = false) {
    const cubeSide = 1;
    const cube = new Box({
        initPosition: { 
            x: position.x, 
            y: position.y, 
            z: position.z 
        },
        velocity,
        color,
        height: cubeSide, 
        width: cubeSide, 
        depth: cubeSide,
        zAcceleration
    });
    cube.castShadow = true;
    return cube;
}

export function createGround() {
    const ground = new Box({
        height: 5, 
        width: 0.5, 
        depth: 100,
        color: 'gray',
        initPosition: {
            x: 0,
            y: -2,
            z: 0
        }
    });
    ground.receiveShadow = true;
    return ground;
}

export function createLight(xPosition, yPosition, zPosition) {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = xPosition;
    light.position.y = yPosition;
    light.position.z = zPosition;
    light.castShadow = true;
    return light;
}