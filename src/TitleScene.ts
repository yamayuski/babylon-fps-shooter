/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Scene, SceneOptions } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { SceneInterface } from './SceneInterface';
import { ContextHolder } from './ContextHolder';

export class TitleScene implements SceneInterface {
    private readonly scene: Scene;

    public constructor(private readonly contextHolder: ContextHolder, sceneOptions?: SceneOptions) {
        const canvas = this.contextHolder.engine.getRenderingCanvas();
        if (!canvas) {
            throw new Error(`Unknown canvas element`);
        }
        this.scene = new Scene(this.contextHolder.engine, sceneOptions);
        new UniversalCamera(`TitleCam`, Vector3.Zero(), this.scene);
    }

    public async start(): Promise<void> {
        //
    }

    public async dispose(): Promise<void> {
        this.scene.dispose();
    }

    public async render(): Promise<void> {
        this.scene.render(true);
    }
}
