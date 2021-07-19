/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache 2.0
 */

import { Engine } from '@babylonjs/core/Engines/engine'

import { MainScene } from './MainScene'

import 'pepjs'
import './style.css'

/**
 * Entrypoint
 */
const canvas = document.querySelector<HTMLCanvasElement>('#app')

if (!canvas) {
    throw new Error(`canvas element not found`);
}

const engine = new Engine(canvas, true, {
    alpha: false,
    antialias: true,
    audioEngine: false,
    autoEnableWebVR: false,
    depth: true,
}, true)
const mainScene = new MainScene(engine)
await mainScene.start()
