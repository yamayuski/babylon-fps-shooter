/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { BoxBuilder } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

/**
 * Build walls around the ground for not fall down
 *
 * @param scene Target Scene
 */
export function aroundWall(scene: Scene): void {
    let box = BoxBuilder.CreateBox(
        '+z',
        {
            size: 1,
        },
        scene
    );
    box.scaling = new Vector3(200, 10, 1);
    box.position.z = 100;
    box.checkCollisions = true;
    box.receiveShadows = true;
    box.visibility = 0.0;

    box = BoxBuilder.CreateBox(
        '-z',
        {
            size: 1,
        },
        scene
    );
    box.scaling = new Vector3(200, 10, 1);
    box.position.z = -100;
    box.checkCollisions = true;
    box.receiveShadows = true;
    box.visibility = 0.0;

    box = BoxBuilder.CreateBox(
        '+x',
        {
            size: 1,
        },
        scene
    );
    box.scaling = new Vector3(1, 10, 200);
    box.position.x = 100;
    box.checkCollisions = true;
    box.receiveShadows = true;
    box.visibility = 0.0;

    box = BoxBuilder.CreateBox(
        '-x',
        {
            size: 1,
        },
        scene
    );
    box.scaling = new Vector3(1, 10, 200);
    box.position.x = -100;
    box.checkCollisions = true;
    box.receiveShadows = true;
    box.visibility = 0.0;
}
