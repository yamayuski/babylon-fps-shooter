/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache 2.0
 */

import { Engine } from '@babylonjs/core/Engines/engine';

import { ContextHolder } from './ContextHolder';
import { SceneNo } from './SceneNo';

import 'pepjs';
import './style.css';

/**
 * Entrypoint
 */
async function main(canvas: HTMLCanvasElement): Promise<void> {
    const engine = new Engine(
        canvas,
        true,
        {
            alpha: false,
            antialias: true,
            audioEngine: true,
            autoEnableWebVR: false,
            depth: true,
        },
        true
    );
    const context = new ContextHolder(engine);
    await context.switchSceneWithoutDispose(SceneNo.TitleScene);
    engine.runRenderLoop(() => {
        context.render();
    });
}

const canvas = document.querySelector<HTMLCanvasElement>('app');
if (!canvas) {
    throw new Error(`You should add canvas#app to html.`);
}
main(canvas).catch((reason) => console.error(reason));
