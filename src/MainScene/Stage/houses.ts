/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { Scene } from '@babylonjs/core/scene'
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

/**
 * Load sample houses async
 *
 * @param {Scene} scene main scene
 * @param {ShadowGenerator} shadowGenerator main shadow generator
 * @returns {Promise<void>}
 * @async
 */
export async function houses(_: Scene, shadowGenerator: ShadowGenerator): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
        `semi_house`,
        `https://assets.babylonjs.com/meshes/`,
        `both_houses_scene.babylon`,
    )
    const houseBase = result.meshes[0]
    houseBase.checkCollisions = true

    for (let index = 0; index < 30; index++) {
        const house = houseBase.clone(`house${index}`, null)
        if (!house) {
            throw new Error(`Error in cloning house`)
        }
        shadowGenerator.addShadowCaster(house)
        house.position = new Vector3(Math.random() * 200 - 100, 0, Math.random() * 200 - 100)
        house.scaling = new Vector3(Math.random() + 8, Math.random() + 8, Math.random() + 8)
        house.rotate(Vector3.Up(), Math.random() * Math.PI * 4)
    }

    houseBase.isVisible = false
}
