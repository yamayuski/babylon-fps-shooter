/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { ICameraInput } from "@babylonjs/core/Cameras/cameraInputsManager";
import { KeyboardInfo } from "@babylonjs/core/Events/keyboardEvents";
import { Nullable } from "@babylonjs/core/types";
import { Observer } from "@babylonjs/core/Misc/observable";
import { Tools } from "@babylonjs/core/Misc/tools";

/**
 * Input with dash
 * @todo divide by root 2 when moved diagonal
 */
export class ShooterCameraDashInput implements ICameraInput<FreeCamera> {
    public readonly camera: FreeCamera;

    /**
     * Dash speed
     */
    public readonly dashSpeed = 0.8;
    /**
     * Walk speed(default)
     */
    public readonly walkSpeed = 0.5;

    /**
     * Gravity
     */
    readonly gravity = 0.1;

    /**
     * array of keycodes
     */
    keys: {
        [key: string]: boolean;
    } = {};

    private onKeyboardObservable: Nullable<Observer<KeyboardInfo>> = null;

    public constructor(camera: FreeCamera) {
        this.camera = camera;

        // Use WASD to move instead of Arrow keys
        camera.keysUp = ["W".charCodeAt(0)];
        camera.keysDown = ["S".charCodeAt(0)];
        camera.keysLeft = ["A".charCodeAt(0)];
        camera.keysRight = ["D".charCodeAt(0)];
    }

    public attachControl(noPreventDefault?: boolean): void {
        // eslint-disable-next-line prefer-rest-params
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        this.camera.getScene().gravity.y = -this.gravity;
        const observer = this.camera
            .getScene()
            .onKeyboardObservable.add((info) => {
                if (info.event.shiftKey) {
                    this.camera.speed = this.dashSpeed;
                } else {
                    this.camera.speed = this.walkSpeed;
                }
                if (info.type === 1) {
                    this.keys[info.event.code] = true;
                } else if (info.type === 2) {
                    this.keys[info.event.code] = false;
                }
                if (!noPreventDefault) {
                    info.event.preventDefault();
                }
            });
        this.onKeyboardObservable = observer;
    }

    public detachControl(): void {
        if (this.onKeyboardObservable) {
            this.camera
                .getScene()
                .onKeyboardObservable.remove(this.onKeyboardObservable);
            this.onKeyboardObservable = null;
        }
    }

    public getClassName(): string {
        return "ShooterCameraDashInput";
    }

    public getSimpleName(): string {
        return "dash";
    }

    checkInputs(): void {
        if (this.onKeyboardObservable) {
            if (this.camera.getScene().activeCamera !== this.camera) {
                return;
            }
            const camera = this.camera;
            // jump camera
            // needs to handle y velocity for jump force along the scene gravity
            if (this.keys["Space"]) {
                camera.cameraDirection.copyFromFloats(
                    0,
                    this.walkSpeed / 0.5,
                    0
                ); // jump (WIP)
            }
        }
    }
}
