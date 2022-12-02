/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { Engine } from '@babylonjs/core/Engines/engine';
import { SceneInterface } from './SceneInterface';
import { SceneNo } from './SceneNo';

/**
 * holds data across multiple scenes
 */
export class ContextHolder {
    private readonly sceneInstances = new Map<SceneNo, SceneInterface>();
    private currentSceneNo?: SceneNo;

    public constructor(public readonly engine: Engine) {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('unload', this.onUnload);
    }

    private get currentScene(): SceneInterface|undefined {
        if (!this.currentSceneNo) {
            return undefined;
        }
        if (this.sceneInstances.has(this.currentSceneNo)) {
            const scene = this.sceneInstances.get(this.currentSceneNo);
            if (scene) {
                return scene;
            }
        }
        return undefined;
    }

    private onResize = () => {
        this.engine.resize();
    }

    private onUnload = () => {
        this.sceneInstances.forEach((scene) => {
            scene.dispose();
        });
        this.engine.dispose();
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('unload', this.onUnload);
    }

    /**
     * @param sceneNo target scene no
     * @param withDispose dispose current scene
     */
    private async switchScene(sceneNo: SceneNo, withDispose = true): Promise<void> {
        if (withDispose) {
            await this.currentScene?.dispose();
        }
        if (this.sceneInstances.has(sceneNo)) {
            // reuse existing scene
            this.currentSceneNo = sceneNo;
            return;
        }
        const scene = createScene(this.engine, sceneNo);
        await scene.start();
        this.sceneInstances.set(sceneNo, scene);
    }

    public async switchSceneWithDispose(sceneNo: SceneNo): Promise<void> {
        return this.switchScene(sceneNo, true);
    }

    public async switchSceneWithoutDispose(sceneNo: SceneNo): Promise<void> {
        return this.switchScene(sceneNo, false);
    }

    public async render(): Promise<void> {
        await this.currentScene?.render();
    }
}
