/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { BoxBuilder } from '@babylonjs/core/Meshes/Builders/boxBuilder'
import { Scene } from '@babylonjs/core/scene'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Texture } from '@babylonjs/core/Materials/Textures/texture'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

/**
 * Build walls around the ground for not fall down
 *
 * @param scene Target Scene
 */
export function aroundWall(scene: Scene): void {
    const wallZMaterial = new StandardMaterial('wall', scene)
    const wallZDiffuse = new Texture('https://playground.babylonjs.com/textures/floor.png', scene)
    wallZDiffuse.uScale = 60
    wallZDiffuse.vScale = 5
    wallZMaterial.diffuseTexture = wallZDiffuse
    const wallZBump = new Texture('https://playground.babylonjs.com/textures/normalmap.jpg', scene)
    wallZBump.uScale = 60
    wallZBump.vScale = 5
    wallZMaterial.bumpTexture = wallZBump

    const wallXMaterial = new StandardMaterial('wall', scene)
    const wallXDiffuse = new Texture('https://playground.babylonjs.com/textures/floor.png', scene)
    wallXDiffuse.uScale = 5
    wallXDiffuse.vScale = 60
    wallXMaterial.diffuseTexture = wallXDiffuse
    const wallXBump = new Texture('https://playground.babylonjs.com/textures/normalmap.jpg', scene)
    wallXBump.uScale = 5
    wallXBump.vScale = 60
    wallXMaterial.bumpTexture = wallXBump

    let box = BoxBuilder.CreateBox('+z', {
        size: 1,
    }, scene)
    box.material = wallZMaterial.clone('mat+z')
    box.scaling = new Vector3(200, 10, 1)
    box.position.z = 100
    box.checkCollisions = true
    box.receiveShadows = true

    box = BoxBuilder.CreateBox('-z', {
        size: 1,
    }, scene)
    box.material = wallZMaterial.clone('mat-z')
    box.scaling = new Vector3(200, 10, 1)
    box.position.z = -100
    box.checkCollisions = true
    box.receiveShadows = true

    box = BoxBuilder.CreateBox('+x', {
        size: 1,
    }, scene)
    box.material = wallXMaterial.clone('mat+x')
    box.scaling = new Vector3(1, 10, 200)
    box.position.x = 100
    box.checkCollisions = true
    box.receiveShadows = true

    box = BoxBuilder.CreateBox('-x', {
        size: 1,
    }, scene)
    box.material = wallXMaterial.clone('mat-x')
    box.scaling = new Vector3(1, 10, 200)
    box.position.x = -100
    box.checkCollisions = true
    box.receiveShadows = true
}
