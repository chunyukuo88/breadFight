import { describe, expect, test, vi } from 'vitest';
import { Box } from 'src/models/Box';
import * as THREE from 'three';
import { colors } from 'src/constants';

describe('Box class methods', () => {
  describe('GIVEN: A ground argument ', ()=>{
    describe('WHEN: the applyGravity method is ', ()=>{
      test('THEN: ', ()=>{
        const args = {
          height: 0,
          width: 0,
          depth: 0,
          zAcceleration: false,
        };

        const box = new Box(args);

        expect(box).toBeInstanceOf(THREE.Mesh);
      });
    });
  });
});
