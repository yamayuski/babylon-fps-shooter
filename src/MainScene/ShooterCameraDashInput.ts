/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
import { ICameraInput } from '@babylonjs/core/Cameras/cameraInputsManager'
import { Tools } from '@babylonjs/core/Misc/tools'

/**
 * Input with dash
 * @todo divide by root 2 when moved diagonal
 */
export class ShooterCameraDashInput implements ICameraInput<FreeCamera> {
    public camera: FreeCamera

    /**
     * Dash speed
     */
    public dashSpeed = 0.8
    /**
     * Walk speed(default)
     */
    public walkSpeed = 0.5

    private _onKeyboardObservable: any

    public constructor(camera: FreeCamera) {
        this.camera = camera

        // Use WASD to move instead of Arrow keys
        camera.keysUp = ["W".charCodeAt(0)]
        camera.keysDown = ["S".charCodeAt(0)]
        camera.keysLeft = ["A".charCodeAt(0)]
        camera.keysRight = ["D".charCodeAt(0)]
    }

    public attachControl(noPreventDefault?: boolean): void {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments)

        this._onKeyboardObservable = this.camera.getScene().onKeyboardObservable.add((info) => {
            if (info.type === 1 && info.event.code === 'ShiftLeft') {
                this.camera.speed = this.dashSpeed
            } else {
                this.camera.speed = this.walkSpeed
            }
            if (!noPreventDefault) {
                info.event.preventDefault()
            }
        })
    }

    public detachControl(): void;

    public detachControl(_?: any): void {
        if (this._onKeyboardObservable) {
            this.camera.getScene().onKeyboardObservable.remove(this._onKeyboardObservable)
            this._onKeyboardObservable = null
        }
    }

    public getClassName(): string {
        return 'ShooterCameraDashInput'
    }

    public getSimpleName(): string {
        return 'dash'
    }
}
