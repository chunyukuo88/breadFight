import { describe, expect, test } from 'vitest';
import { boxesCollided } from '../utils';

describe('GIVEN: Two box arguments of type Box,', ()=>{
    describe('WHEN: Boxes do not collide', () => {
        test('THEN: Return false', () => {
            const box1 = { 
                position: {
                    left: 0, 
                    right: 1, 
                    front: 0, 
                    back: 1, 
                    top: 0, 
                    bottom: 1,
                },
            };
            const box2 = {
                position: {
                    left: 2, 
                    right: 3, 
                    front: 2, 
                    back: 3,
                    top: 0, 
                    bottom: 1 
                },
            };
    
            const result = boxesCollided(box1, box2);
    
            expect(result).toBe(false);
        });
    });
    
    describe('WHEN: Boxes collide on the X-axis', () => {
        test('THEN: Return true', () => {
            const box1 = { 
                position: {
                    left: 0, 
                    right: 1, 
                    front: 0, 
                    back: 1, 
                    top: 0, 
                    bottom: 1 
                },
            };
            const box2 = { 
                position: {
                    left: 0.5, 
                    right: 1.5, 
                    front: 0, 
                    back: 1, 
                    top: 0, 
                    bottom: 1 
                },
            };
    
            const result = boxesCollided(box1, box2);
    
            expect(result).toBe(true);
        });
    });
    
    describe('WHEN: Boxes collide on the Z-axis', () => {
        test('THEN: Return true', () => {
            const box1 = { 
                position: {
                    left: 0, 
                    right: 1, 
                    front: 0, 
                    back: 1, 
                    top: 0, 
                    bottom: 1 
                },
            };
            const box2 = { 
                position: {
                    left: 0, 
                    right: 1, 
                    front: 0.5, 
                    back: 1.5, 
                    top: 0, 
                    bottom: 1 
                },
            };
    
            const result = boxesCollided(box1, box2);
    
            expect(result).toBe(true);
        });
    });
});