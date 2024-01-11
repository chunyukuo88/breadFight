import { describe, expect, test } from 'vitest';
import { Box } from '../models/Box.js';
import * as THREE from 'three';
import { colors } from '../constants.js';
import {
  boxFellOffGround,
  createCube,
  createGround,
  createLight,
  createStripe,
  boxesCollided,
} from '../utils';

describe('utils.js', () => {
  describe('boxFellOffGround()', ()=>{
      describe('boxFellOffGround', () => {
          test('should return true if the box fell off the ground', () => {
              const box = {
                  bottom: 5,
                  velocity: { x: 0, y: -8, z: 0 }
              };
              const ground = { top: 0 };
              expect(boxFellOffGround(box, ground)).toBe(true);
          });

          test('should return false if the box did not fall off the ground', () => {
              const box = {
                  bottom: 5,
                  velocity: { x: 0, y: 1, z: 0 }
              };
              const ground = { top: 0 };
              expect(boxFellOffGround(box, ground)).toBe(false);
          });

          test('should return false if the box is still on the ground', () => {
              const box = {
                  bottom: 5,
                  velocity: { x: 0, y: 0, z: 0 }
              };
              const ground = { top: 1 };
              expect(boxFellOffGround(box, ground)).toBe(false);
          });
      });
  });
  describe('createStripe()', () => {
      test('It creates a stripe that is of type `Box`', () => {
          const stripe = createStripe();

          expect(stripe).toBeInstanceOf(Box);
      });
      describe.each`
              attribute           |   expectedValue
              ${'position'}       |   ${{ x: 0.25, y: -1.75, z: -42 }}
              ${'velocity'}       |   ${{ x: 0, y: 0, z: 0.09 }}
              ${'color'}          |   ${colors.whiteStripe}
              ${'height'}         |   ${0.5}
              ${'width'}          |   ${0.01}
              ${'depth'}          |   ${3}
              ${'zAcceleration'}  |   ${false}
              ${'castShadow'}     |   ${true}
          `('createStripe', ({ attribute, expectedValue}) => {
          test(`stripe has field '${attribute}' equal to ${expectedValue}`, () => {
              const stripe = createStripe();

              expect(stripe).toBeInstanceOf(Box);
              expect(stripe[attribute]).toEqual(expectedValue);
          });
      });
  });
  describe('createCube()', () => {
     test('Result is an instance of Box', () => {
        const position = { x: 0, y: 0, z:0 };
        const velocity = { x: 0, y: 0, z:0 };

        const result = createCube(position, velocity);

        expect(result).toBeInstanceOf(Box);
     });
  });
  describe('createGround()', () => {
    test('Result is an instance of Box', () => {
      const result = createGround();

      expect(result).toBeInstanceOf(Box);
    });
  });
  describe('createLight()', () => {
    test('Result is an instance of DirectionalLight', () => {
      const result = createLight(0,0,0,);

      expect(result).toBeInstanceOf(THREE.DirectionalLight);
    });
  });
  describe('boxesCollided()', () => {
    describe('WHEN: box1 collides head-on with box2 (along the Z axis)', () => {
      test('THEN: returns true', () => {
        const back = 1;
        const front = 0.98;

        const box1 = {
          position: { x: 0, y: 0, z: 0 },
          back,
          front: 0,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        };
        const box2 = {
          position: { x: 0, y: 0, z: 0 },
          back: 0,
          front,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        };

        const result = boxesCollided(box1, box2);

        expect(result).toBeTruthy();
      });
    });
    describe('WHEN: box1 backs into box2 (along the Z axis)', () => {
      test('THEN: returns true', () => {
        const back = 1;
        const front = 0.98;

        const box1 = {
          position: { x: 0, y: 0, z: 0 },
          back: 0,
          front,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        };
        const box2 = {
          position: { x: 0, y: 0, z: 0 },
          back,
          front: 0,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        };

        const result = boxesCollided(box1, box2);

        expect(result).toBeTruthy();
      });
    });
    describe('WHEN: box1 collides with box2 from the right (along the X axis)', () => {
      test('THEN: returns true', () => {
        const left = 1;
        const right = 0.98;

        const box1 = {
          position: { x: 0, y: 0, z: 0 },
          back: 0,
          front: 0,
          left,
          right: 0,
          top: 0,
          bottom: 0,
        };
        const box2 = {
          position: { x: 0, y: 0, z: 0 },
          back: 0,
          front: 0,
          left: 0,
          right,
          top: 0,
          bottom: 0,
        };

        const result = boxesCollided(box1, box2);

        expect(result).toBeTruthy();
      });
    });
    describe('WHEN: box1 collides with box2 from the left (along the X axis)', () => {
      test('THEN: returns true', () => {
        const left = 0.98;
        const right = 1;

        const box1 = {
          position: { x: 0, y: 0, z: 0 },
          back: 0,
          front: 0,
          left: 0,
          right,
          top: 0,
          bottom: 0,
        };
        const box2 = {
          position: { x: 0, y: 0, z: 0 },
          back: 0,
          front: 0,
          left,
          right: 0,
          top: 0,
          bottom: 0,
        };

        const result = boxesCollided(box1, box2);

        expect(result).toBeTruthy();
      });
    });
  });
});
