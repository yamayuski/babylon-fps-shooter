/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight'
import { Light } from '@babylonjs/core/Lights/light'
import { Scene } from '@babylonjs/core/scene'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

/**
 * Build main directional light
 *
 * @param scene Target Scene
 * @returns MainLight
 */
export function mainLight(scene: Scene): Light {
    const light = new DirectionalLight(`MainLight`, new Vector3(2, -5, 2).normalize(), scene)
    light.intensity = 1.0

    return light
}
