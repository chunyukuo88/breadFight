import { describe, expect, test } from 'vitest';
import { Box } from 'src/models/Box';
import * as THREE from 'three';
import { colors } from 'src/constants';
import { boxFellOffGround } from 'src/utils.js';

describe('Box class methods', () => {
  describe('WHEN: Not passed a ground argument', () => {
    test('THEN: the box falls no matter where it is located.', () => {
      const highUpOnTheScreen = 10;
      const args = {
        initPosition: {
          x: 10,
          y: highUpOnTheScreen,
          z: 0,
        },
        height: 1, width: 1, depth: 1,
        velocity: { x: 0, y: 1, z: 0 },
        zAcceleration: false,
      };

      const box = new Box(args);
      box.applyGravity();

      expect(box.position.y).toBe(9.77);
    });
  });
  describe('GIVEN: A ground exists', () => {
    describe(`WHEN: the cube falls off the ground,`, () => {
      test('THEN: the cube falls.', () => {
        const startingFromHighUp = 10;
        const args = {
          height: 1,
          width: 1,
          depth: 1,
          velocity: {
            x: 0,
            y: 1,
            z: 0,
          },
          initPosition: {
            x: 10,
            y: startingFromHighUp,
            z: 0,
          },
          zAcceleration: false,
        };

        const box = new Box(args);
        const ground = { top: 50 };
        box.applyGravity(ground);

        expect(box.velocity).toStrictEqual({ x: 0, y: -0.8, z: 0 });
      });
    });
  });
});
