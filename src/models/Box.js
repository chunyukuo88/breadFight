import * as THREE from 'three';
import { boxFellOffGround } from '../utils';
import { colors } from '../constants';
export class Box extends THREE.Mesh {
    constructor({
        height, 
        width, 
        depth, 
        color = colors.greenDefault, 
        velocity = {
            x: 0,
            y: 0,
            z: 0,
        },
        initPosition = {
            x: 0,
            y: 0,
            z: 0,
        },
        zAcceleration
    }) {
        super(
            new THREE.BoxGeometry(height, width, depth), 
            new THREE.MeshStandardMaterial({ color })
        );
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.color = color;
        this.velocity = velocity;
        this.initPosition = initPosition;
        this.gravity = -0.02;
        this.coefficientOfFriction = 0.8;
        this.position.set(initPosition.x, initPosition.y, initPosition.z);
        this.zAcceleration = zAcceleration;
        this.updateSides();
    }

    updateSides() {
        this.bottom = this.position.y - (this.height / 2);
        this.top = this.position.y + (this.height / 2);
        this.left = this.position.x - (this.width / 2);
        this.right = this.position.x + (this.width / 2);
        this.front = this.position.z + (this.depth / 2);
        this.back = this.position.z - (this.depth / 2);
    }

    applyGravity(ground = null) {
        if (!ground) {
            return this.position.y -= 0.23;
        }
        if (boxFellOffGround(this, ground)) {
            this.velocity.y *= this.coefficientOfFriction;
            this.velocity.y = -this.velocity.y;
        } else {
            this.position.y += this.velocity.y;
        }
    }

    #theCubeFell(ground) {
        const exitedGroundFromLeft = this.right <= (ground.left * 9);
        const exitedFromTheRight = this.left >= (ground.right * 9);
        const exitedFromBackOrFront = this.front <= ground.back || this.back >= ground.front;
        return exitedGroundFromLeft || exitedFromTheRight || exitedFromBackOrFront;
    }

    update(ground = null) {
        this.updateSides();
        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;
        
        if (this.zAcceleration) {
            this.velocity.z += 0.0004;
        }
        
        if (this.#theCubeFell(ground)) {
            return this.applyGravity();
        }

        this.velocity.y += this.gravity;
        if (ground) {
            this.applyGravity(ground);
        }
    }
}
