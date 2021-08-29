/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight'
import { Scene } from '@babylonjs/core/scene'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { Color3 } from '@babylonjs/core/Maths/math.color'

/**
 * Build main directional light
 *
 * @param scene Target Scene
 * @returns MainLight
 */
export function mainLight(scene: Scene): DirectionalLight {
    const light = new DirectionalLight(`MainLight`, new Vector3(2, -5, 2).normalize(), scene)
    light.shadowEnabled = true
    light.diffuse = new Color3(1.0, 0.95, 0.96)

    return light
}
