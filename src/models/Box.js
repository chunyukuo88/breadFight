import * as THREE from 'three';

export class Box extends THREE.Mesh {
    constructor({
        height, 
        width, 
        depth, 
        color = '#00ff00', 
        velocity = {
            x: 0,
            y: 0,
            z: 0,
        },
        initPosition = {
            x: 0,
            y: 0,
            z: 0,
        }
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
        this.gravity = -0.01;
        this.coefficientOfFriction = 0.8;
        this.position.set(initPosition.x, initPosition.y, initPosition.z);
        this.updateSides();
    }

    updateSides() {
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;
        this.left = this.position.x - this.width / 2;
        this.right = this.position.x + this.width / 2;
        this.front = this.position.z + this.depth / 2
        this.back = this.position.z - this.depth / 2
    }

    applyGravity(ground) {
        if (this.bottom + this.velocity.y <= ground.top - 2.25) {
            this.velocity.y *= this.coefficientOfFriction;
            this.velocity.y = -this.velocity.y;
        } else {
            this.position.y += this.velocity.y;
        }
    }

    update(ground = null) {
        this.updateSides();
        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;
               
        // collision detection with the ground.
        // console.log(`
        // this.right: ${this.right}
        // ground.left: ${ground.left}
        // `);
        // if (this.right <= ground.left && this.left <= ground.right) {
        if (this.right <= (ground.left * 9)) {
            console.count('moo');
        }

        this.velocity.y += this.gravity;
        if (ground) {
            this.applyGravity(ground);
        }
    }
}
