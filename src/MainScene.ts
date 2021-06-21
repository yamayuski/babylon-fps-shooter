import { BoxBuilder } from '@babylonjs/core/Meshes/Builders/boxBuilder'
import { Camera } from '@babylonjs/core/Cameras/camera'
import { CapsuleBuilder } from '@babylonjs/core/Meshes/Builders/capsuleBuilder'
import { CascadedShadowGenerator } from '@babylonjs/core/Lights/Shadows/cascadedShadowGenerator'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture'
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight'
import { Engine } from '@babylonjs/core/Engines/engine'
import { EngineOptions } from '@babylonjs/core/Engines/thinEngine'
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
import { GroundBuilder } from '@babylonjs/core/Meshes/Builders/groundBuilder'
import { ICameraInput } from '@babylonjs/core/Cameras/cameraInputsManager'
import { Light } from '@babylonjs/core/Lights/light'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { Scene, SceneOptions } from '@babylonjs/core/scene'
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator'
import { SSAORenderingPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/ssaoRenderingPipeline'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Texture } from '@babylonjs/core/Materials/Textures/texture'
import { Tools } from '@babylonjs/core/Misc/tools'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

// side-effects
import '@babylonjs/core/Collisions/collisionCoordinator'
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'
import '@babylonjs/core/Loading/Plugins/babylonFileLoader'
import '@babylonjs/core/Rendering/depthRendererSceneComponent'
import '@babylonjs/loaders/glTF'

/**
 * メインのインゲームシーン
 */
export class MainScene
{
    private readonly engine: Engine
    private readonly scene: Scene
    private readonly camera: Camera
    private readonly mainLight: Light
    private readonly shadowGenerator: ShadowGenerator

    /**
     * コンストラクタ
     *
     * @param canvas レンダリングするキャンバス要素
     * @param antialias アンチエイリアスを有効にするかどうか
     * @param options エンジンオプション
     * @param adoptToDeviceRatio デバイスレシオに適応するかどうか
     * @param sceneOptions シーンオプション
     */
    constructor(
        canvas: HTMLCanvasElement,
        antialias: boolean = true,
        options: EngineOptions = {},
        adoptToDeviceRatio: boolean = true,
        sceneOptions: SceneOptions = {},
    ) {
        this.engine = new Engine(canvas, antialias, options, adoptToDeviceRatio)
        this.scene = new Scene(this.engine, sceneOptions)
        this.scene.ambientColor = new Color3(0.2, 0.2, 0.2)
        this.camera = setUpCamera(canvas, this.scene)
        this.mainLight = setUpMainLight(this.scene)
        this.shadowGenerator = new CascadedShadowGenerator(2048, <any>this.mainLight)
        new SSAORenderingPipeline(`ssaoPipeline`, this.scene, 0.75, [this.camera])
        setUpSkybox(this.scene)
        setUpGround(this.scene)
        setUpWalls(this.scene)
        setUpMovingBox(this.scene)
    }

    /**
     * シーンの動作をスタートする
     */
    public async start(): Promise<void> {
        await loadHouses(this.shadowGenerator)
        await loadMobs(this.scene, this.shadowGenerator)
        window.addEventListener('resize', this.onResise)
        this.scene.activeCamera = this.camera
        document.addEventListener('click', this.onMouseClick)
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    private readonly onMouseClick = (): void => {
        if (!this.engine.isPointerLock) {
            this.engine.enterPointerlock()
        }
    }

    /**
     * 画面リサイズ時の挙動
     */
    private readonly onResise = (): void => {
        this.engine.resize()
    }
}

/**
 * ダッシュを行えるようにするインプット
 */
class ShooterCameraDashInput implements ICameraInput<FreeCamera> {
    public camera: FreeCamera

    /**
     * ダッシュ速度
     */
    public dashSpeed = 0.8
    /**
     * 歩き速度
     */
    public walkSpeed = 0.5

    private _onKeyboardObservable: any

    public constructor(camera: FreeCamera) {
        this.camera = camera
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
            this.camera.getScene().onActiveCameraChanged.remove(this._onKeyboardObservable)
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

/**
 * カメラを作成
 *
 * @param canvas Target Canvas
 * @param scene Target Scene
 * @returns MainCamera
 */
function setUpCamera(canvas: HTMLCanvasElement, scene: Scene): Camera {
    const initialPotision = new Vector3(Math.random() * 200 - 100, 2, Math.random() * 200 - 100)
    const camera = new FreeCamera(`MainCamera`, initialPotision, scene)
    camera.setTarget(Vector3.Zero())
    camera.inputs.add(new ShooterCameraDashInput(camera))
    camera.attachControl(canvas, true);
    // 矢印キーではなく WASD で移動
    camera.keysUp = ["W".charCodeAt(0)]
    camera.keysDown = ["S".charCodeAt(0)]
    camera.keysLeft = ["A".charCodeAt(0)]
    camera.keysRight = ["D".charCodeAt(0)]
    camera.applyGravity = true
    camera.ellipsoid = new Vector3(1.2, 1.2, 1.2)
    camera.checkCollisions = true
    camera.speed = 0.5

    return camera
}

/**
 * メインライトを作成
 *
 * @param scene Target Scene
 * @returns MainLight
 */
function setUpMainLight(scene: Scene): Light {
    const light = new DirectionalLight(`MainLight`, new Vector3(200, -700, 400), scene)
    light.intensity = 0.7

    return light
}

/**
 * スカイボックス背景を生成
 *
 * @param scene Target Scene
 * @returns Mesh
 * @see https://doc.babylonjs.com/start/chap5/sky
 */
function setUpSkybox(scene: Scene): Mesh {
    const mesh = BoxBuilder.CreateBox(`MainSkyBox`, { size: 400 }, scene)
    const material = new StandardMaterial(`MainSkyBoxMaterial`, scene)
    material.backFaceCulling = false
    material.reflectionTexture = new CubeTexture(`https://playground.babylonjs.com/textures/skybox`, scene)
    material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
    material.diffuseColor = Color3.Black()
    material.specularColor = Color3.Black()
    mesh.material = material

    return mesh
}

/**
 * 地面を生成
 *
 * @param scene Target Scene
 * @returns Ground Mesh
 */
function setUpGround(scene: Scene): Mesh {
    const material = new StandardMaterial('ground', scene)
    material.specularColor = Color3.Black()
    const groundDiffuse = new Texture('https://playground.babylonjs.com/textures/grass.png', scene)
    groundDiffuse.uScale = 60
    groundDiffuse.vScale = 60
    material.diffuseTexture =  groundDiffuse
    const groundBump = new Texture('https://playground.babylonjs.com/textures/grassn.png', scene)
    groundBump.uScale = 60
    groundBump.vScale = 60
    material.bumpTexture = groundBump
    const ground = GroundBuilder.CreateGround("MainGround", { width: 200, height: 200}, scene)
    ground.material = material
    ground.checkCollisions = true
    ground.receiveShadows = true

    return ground
}

/**
 * サンプル用の家メッシュを読み込む
 *
 * @param scene Target Scene
 */
async function loadHouses(shadowGenerator: ShadowGenerator): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
        `semi_house`,
        `https://assets.babylonjs.com/meshes/`,
        `both_houses_scene.babylon`,
    )
    const houseBase = result.meshes[0]
    houseBase.checkCollisions = true

    for (let index = 0; index < 100; index++) {
        const house = houseBase.clone(`house${index}`, null)
        shadowGenerator.addShadowCaster(house!)
        house!.position = new Vector3(Math.random() * 200 - 100, 0, Math.random() * 200 - 100)
        house!.scaling = new Vector3(Math.random() + 5, Math.random() + 5, Math.random() + 5)
        house!.rotate(Vector3.Up(), Math.random() * Math.PI * 4)
    }

    houseBase.isVisible = false
}

/**
 * 敵キャラクターを生成する
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
    material.ambientColor = new Color3(0.2, 0.2, 0.2)
    capsuleBase.material = material

    for (let index = 0; index < 100; index++) {
        const capsule = capsuleBase.clone(`Mob${index}`, null)
        capsule.material = material.clone(`MobMaterial${index}`);
        (capsule.material as StandardMaterial).diffuseColor = new Color3(Math.random(), Math.random(), Math.random())
        shadowGenerator.addShadowCaster(capsule)
        capsule.position = new Vector3(Math.random() * 200 - 100, 1, Math.random() * 200 - 100)
        capsule.rotate(Vector3.Up(), Math.random() * Math.PI * 4)
        scene.onBeforeRenderObservable.add(() => {
            // 毎フレームレンダー前に実行される
            capsule.rotate(Vector3.Up(), Math.random() * 0.5 - 0.25)
            const delta = scene.getEngine().getDeltaTime() / 100
            capsule.moveWithCollisions(capsule.forward.multiplyByFloats(delta, delta, delta))
        })
    }

    capsuleBase.isVisible = false
}

/**
 * フィールド端の壁を設置する
 *
 * @param scene Target Scene
 */
function setUpWalls(scene: Scene): void {
    const wallZMaterial = new StandardMaterial('wall', scene)
    const wallZDiffuse = new Texture('https://playground.babylonjs.com/textures/floor.png', scene)
    wallZDiffuse.uScale = 60
    wallZDiffuse.vScale = 5
    wallZMaterial.diffuseTexture = wallZDiffuse
    const wallZBump = new Texture('https://playground.babylonjs.com/textures/normalmap.jpg', scene)
    wallZBump.uScale = 60
    wallZBump.vScale = 5
    wallZMaterial.bumpTexture = wallZBump

    const wallXMaterial = new StandardMaterial('wall', scene)
    const wallXDiffuse = new Texture('https://playground.babylonjs.com/textures/floor.png', scene)
    wallXDiffuse.uScale = 5
    wallXDiffuse.vScale = 60
    wallXMaterial.diffuseTexture = wallXDiffuse
    const wallXBump = new Texture('https://playground.babylonjs.com/textures/normalmap.jpg', scene)
    wallXBump.uScale = 5
    wallXBump.vScale = 60
    wallXMaterial.bumpTexture = wallXBump

    let box = BoxBuilder.CreateBox('+z', {
        size: 1,
    }, scene)
    box.material = wallZMaterial.clone('mat+z')
    box.scaling = new Vector3(200, 10, 1)
    box.position.z = 100
    box.checkCollisions = true
    box.receiveShadows = true

    box = BoxBuilder.CreateBox('-z', {
        size: 1,
    }, scene)
    box.material = wallZMaterial.clone('mat-z')
    box.scaling = new Vector3(200, 10, 1)
    box.position.z = -100
    box.checkCollisions = true
    box.receiveShadows = true

    box = BoxBuilder.CreateBox('+x', {
        size: 1,
    }, scene)
    box.material = wallXMaterial.clone('mat+x')
    box.scaling = new Vector3(1, 10, 200)
    box.position.x = 100
    box.checkCollisions = true
    box.receiveShadows = true

    box = BoxBuilder.CreateBox('-x', {
        size: 1,
    }, scene)
    box.material = wallXMaterial.clone('mat-x')
    box.scaling = new Vector3(1, 10, 200)
    box.position.x = -100
    box.checkCollisions = true
    box.receiveShadows = true
}

/**
 * 動く箱を生成する
 *
 * @param scene Target Scene
 */
function setUpMovingBox(scene: Scene): void {
    const movingBox = BoxBuilder.CreateBox(`MovingBox`, {
        size: 5,
    }, scene)
    movingBox.position.y = -2.3
    movingBox.checkCollisions = true
    movingBox.receiveShadows = true

    scene.onBeforeRenderObservable.add(() => {
        const delta = scene.getEngine().getDeltaTime()
        movingBox.position.x += delta / 60
        if (movingBox.position.x > 100) {
            movingBox.position.x = -100
        }
    })
}
