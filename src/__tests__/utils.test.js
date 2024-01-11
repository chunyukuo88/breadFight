import { describe, expect, test } from 'vitest';
import { Box } from '../models/Box.js';
import * as THREE from 'three';
import { colors } from '../constants.js';
import {
  boxFellOffGround,
  createCube, createGround, createLight,
  createStripe,
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
});
