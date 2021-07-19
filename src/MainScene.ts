/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

import { Camera } from '@babylonjs/core/Cameras/camera'
import { CapsuleBuilder } from '@babylonjs/core/Meshes/Builders/capsuleBuilder'
import { CascadedShadowGenerator } from '@babylonjs/core/Lights/Shadows/cascadedShadowGenerator'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { Engine } from '@babylonjs/core/Engines/engine'
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
import { Light } from '@babylonjs/core/Lights/light'
import { Scene, SceneOptions } from '@babylonjs/core/scene'
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator'
import { SSAORenderingPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/ssaoRenderingPipeline'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

import { aroundWall } from './MainScene/Stage/aroundWall'
import { ground } from './MainScene/Stage/ground'
import { houses } from './MainScene/Stage/houses'
import { mainLight } from './MainScene/Stage/mainLight'
import { skybox } from './MainScene/Stage/skybox'
import { ShooterCameraDashInput } from './MainScene/ShooterCameraDashInput'

// side-effects
import '@babylonjs/core/Collisions/collisionCoordinator'
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'
import '@babylonjs/core/Loading/Plugins/babylonFileLoader'
import '@babylonjs/core/Rendering/depthRendererSceneComponent'
import '@babylonjs/loaders/glTF'

/**
 * Main in-game scene
 */
export class MainScene
{
    private readonly engine: Engine
    private readonly scene: Scene
    private readonly camera: Camera
    private readonly mainLight: Light
    private readonly shadowGenerator: ShadowGenerator

    /**
     * Constructor
     *
     * @param engine Main engine
     * @param sceneOptions Scene option
     */
    constructor(
        engine: Engine,
        sceneOptions?: SceneOptions,
    ) {
        this.engine = engine
        this.scene = new Scene(this.engine, sceneOptions)
        this.scene.ambientColor = new Color3(0.5, 0.5, 0.5)
        this.camera = setUpCamera(this.engine.getRenderingCanvas()!, this.scene)
        this.mainLight = mainLight(this.scene)
        this.shadowGenerator = new CascadedShadowGenerator(2048, <any>this.mainLight)
        new SSAORenderingPipeline(`ssaoPipeline`, this.scene, 0.75, [this.camera])
        skybox(this.scene)
        ground(this.scene)
        aroundWall(this.scene)
    }

    /**
     * Start main loop
     */
    public async start(): Promise<void> {
        await houses(this.scene, this.shadowGenerator)
        await loadMobs(this.scene, this.shadowGenerator)
        window.addEventListener('resize', this.onResize)
        this.scene.activeCamera = this.camera
        document.addEventListener('click', this.onMouseClick)
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    /**
     * Execute when mouse has clicked inside game
     */
    private readonly onMouseClick = (): void => {
        if (!this.engine.isPointerLock) {
            this.engine.enterPointerlock()
        }
    }

    /**
     * Execute when viewport has resized
     */
    private readonly onResize = (): void => {
        this.engine.resize()
    }
}

/**
 * Creates main camera
 *
 * @param canvas Target CanvasElement
 * @param scene Target Scene
 */
function setUpCamera(canvas: HTMLCanvasElement, scene: Scene): Camera {
    const initialPotision = new Vector3(Math.random() * 200 - 100, 2, Math.random() * 200 - 100)
    const camera = new FreeCamera(`MainCamera`, initialPotision, scene)
    camera.setTarget(Vector3.Zero())
    camera.inputs.add(new ShooterCameraDashInput(camera))
    camera.attachControl(canvas, true);
    camera.applyGravity = true
    camera.ellipsoid = new Vector3(1.2, 1.2, 1.2)
    camera.checkCollisions = true

    return camera
}

/**
 * Generate mobs
 *
 * @param scene Target Scene
 * @param shadowGenerator Shadow Generator
 */
async function loadMobs(scene: Scene, shadowGenerator: ShadowGenerator): Promise<void> {
    const capsuleBase = CapsuleBuilder.CreateCapsule(`mobBase`, {
        height: 4,
        capSubdivisions: 6,
        radius: 1,
        subdivisions: 4,
        tessellation: 16,
    }, scene)
    capsuleBase.position.y = 1
    const material = new StandardMaterial(`MobMaterialBase`, scene)
    capsuleBase.material = material

    for (let index = 0; index < 100; index++) {
        const capsule = capsuleBase.clone(`Mob${index}`, null)
        capsule.material = material.clone(`MobMaterial${index}`);
        (capsule.material as StandardMaterial).diffuseColor = new Color3(Math.random(), Math.random(), Math.random())
        shadowGenerator.addShadowCaster(capsule)
        capsule.position = new Vector3(Math.random() * 200 - 100, 2, Math.random() * 200 - 100)
        capsule.rotate(Vector3.Up(), Math.random() * Math.PI * 4)
        scene.onBeforeRenderObservable.add(() => {
            capsule.rotate(Vector3.Up(), Math.random() * 0.5 - 0.25)
            const delta = scene.getEngine().getDeltaTime() / 100
            capsule.moveWithCollisions(capsule.forward.multiplyByFloats(delta, delta, delta))
        })
    }

    capsuleBase.isVisible = false
}
