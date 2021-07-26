/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { BoxBuilder } from '@babylonjs/core/Meshes/Builders/boxBuilder'
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { Scene } from '@babylonjs/core/scene'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Texture } from '@babylonjs/core/Materials/Textures/texture'

/**
 * Build skybox
 *
 * @param scene Target Scene
 * @returns Mesh
 * @see https://doc.babylonjs.com/start/chap5/sky
 */
export function skybox(scene: Scene): Mesh {
    const mesh = BoxBuilder.CreateBox(`MainSkyBox`, { size: 4000 }, scene)
    const material = new StandardMaterial(`MainSkyBoxMaterial`, scene)
    material.backFaceCulling = false
    material.disableLighting = true
    material.reflectionTexture = new CubeTexture(`https://playground.babylonjs.com/textures/skybox`, scene)
    material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
    mesh.infiniteDistance = true
    mesh.material = material

    return mesh
}
