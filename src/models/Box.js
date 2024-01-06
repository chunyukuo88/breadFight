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

        this.position.set(initPosition.x, initPosition.y, initPosition.z);
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;
    }

    update(ground) {
        console.log('this.position.y: ', this.position.y);
        console.log('this.height: ', this.height);

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.position.y += this.velocity.y;

        console.log('cube bottom:', this.bottom);
        console.log('ground top:', ground.top);
        if (this.bottom + this.velocity.y <= ground.top - 2.25) {
            this.velocity.y = -this.velocity.y;
        }
    }
}
