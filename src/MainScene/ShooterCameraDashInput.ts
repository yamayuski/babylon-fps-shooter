/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { ICameraInput } from '@babylonjs/core/Cameras/cameraInputsManager';
import { KeyboardInfo } from '@babylonjs/core/Events/keyboardEvents';
import { Nullable } from '@babylonjs/core/types';
import { Observer } from '@babylonjs/core/Misc/observable';
import { Tools } from '@babylonjs/core/Misc/tools';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

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

    private isDash = false;
    private wantToJump = false;
    private isJumping = false;

    private onKeyboardObservable: Nullable<Observer<KeyboardInfo>> = null;

    /**
     * {@inheritdoc}
     */
    public constructor(camera: FreeCamera) {
        this.camera = camera;

        // Use WASD to move instead of Arrow keys
        camera.keysUp = ['W'.charCodeAt(0)];
        camera.keysDown = ['S'.charCodeAt(0)];
        camera.keysLeft = ['A'.charCodeAt(0)];
        camera.keysRight = ['D'.charCodeAt(0)];
    }

    /**
     * {@inheritdoc}
     */
    public attachControl(noPreventDefault?: boolean): void {
        // eslint-disable-next-line prefer-rest-params
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        this.camera.angularSensibility = 5000.0;
        this.camera.getScene().gravity = new Vector3(0, -0.1, 0);

        const observer = this.camera.getScene().onKeyboardObservable.add((info) => {
            this.isDash = (info.type === 1 && info.event.code === 'ShiftLeft');
            this.wantToJump = (info.type === 1 && info.event.code === 'Space');

            if (!noPreventDefault) {
                info.event.preventDefault();
            }
        });
        this.onKeyboardObservable = observer;
    }

    /**
     * {@inheritdoc}
     */
    public detachControl(): void {
        if (this.onKeyboardObservable) {
            this.camera.getScene().onKeyboardObservable.remove(this.onKeyboardObservable);
            this.onKeyboardObservable = null;
        }
    }

    /**
     * called when requestAnimationFrame
     */
    public checkInputs = (): void => {
        this.camera.speed = this.walkSpeed;
        if (this.isDash) {
            this.camera.speed = this.dashSpeed;
        }
        this.isJumping = this.camera.position.y >= 2.5;
        if (this.wantToJump && !this.isJumping) {
            this.camera.cameraDirection.y += 0.5;
        }
    }

    /**
     * {@inheritdoc}
     */
    public getClassName(): string {
        return 'ShooterCameraDashInput';
    }

    /**
     * {@inheritdoc}
     */
    public getSimpleName(): string {
        return 'dash';
    }
}
