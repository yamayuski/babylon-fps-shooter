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
 export function obstacle(scene: Scene): void {
     const material = new StandardMaterial('obstacle_mat', scene)
     const diffuse = new Texture('https://playground.babylonjs.com/textures/floor.png', scene)
     diffuse.uScale = 2
     diffuse.vScale = 2
     material.diffuseTexture = diffuse
     const bump = new Texture('https://playground.babylonjs.com/textures/normalmap.jpg', scene)
     bump.uScale = 2
     bump.vScale = 2
     material.bumpTexture = bump

     let box = BoxBuilder.CreateBox('obstacle', {
         size: 2,
     }, scene)
     box.checkCollisions = true
     box.receiveShadows = true
     box.setEnabled(false)

     for (let i = 0; i < 20; i++) {
         box = box.clone(`obstacle${i}`)
         box.material = material.clone(`obstacle_mat${i}`)
         const axis = new Vector3(
             Math.random() * Math.PI - (Math.PI / 2),
             Math.random() * Math.PI - (Math.PI / 2),
             Math.random() * Math.PI - (Math.PI / 2)
        );
        box.rotate(axis, Math.random() * Math.PI)
        box.position = new Vector3(
            Math.random() * 200 - 100,
            Math.random() * 3 - 1.5,
            Math.random() * 200 - 100
        )
     }
 }
