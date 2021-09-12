/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache 2.0
 */

import { Engine } from '@babylonjs/core/Engines/engine';

import { MainScene } from './MainScene';

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
    const mainScene = new MainScene(engine);
    await mainScene.start();
}

const canvas = document.getElementById('app') as HTMLCanvasElement;
main(canvas).catch((reason) => console.error(reason));
