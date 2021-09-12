/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { Color3 } from '@babylonjs/core/Maths/math.color';
import { GroundBuilder } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

/**
 * Build ground
 *
 * @param scene Target Scene
 * @returns Ground Mesh
 */
export function ground(scene: Scene): Mesh {
    const material = new StandardMaterial('ground', scene);
    material.specularColor = Color3.Black();
    const groundDiffuse = new Texture('https://playground.babylonjs.com/textures/grass.png', scene);
    groundDiffuse.uScale = 120;
    groundDiffuse.vScale = 120;
    material.diffuseTexture = groundDiffuse;
    const groundBump = new Texture('https://playground.babylonjs.com/textures/grassn.png', scene);
    groundBump.uScale = 120;
    groundBump.vScale = 120;
    material.bumpTexture = groundBump;
    const ground = GroundBuilder.CreateGround('MainGround', { width: 400, height: 400 }, scene);
    ground.material = material;
    ground.checkCollisions = true;
    ground.receiveShadows = true;

    return ground;
}
