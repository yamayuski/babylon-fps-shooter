import{S as e,T as a,B as t,V as n,C as s,G as o,a as i,D as r,b as c,c as l,R as h,d,e as m,f as u,g as p,F as b,h as w,E as g}from"./vendor.8790ce14.js";
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
class y{constructor(e){this.dashSpeed=.8,this.walkSpeed=.5,this.onKeyboardObservable=null,this.camera=e,e.keysUp=["W".charCodeAt(0)],e.keysDown=["S".charCodeAt(0)],e.keysLeft=["A".charCodeAt(0)],e.keysRight=["D".charCodeAt(0)]}attachControl(e){e=l.BackCompatCameraNoPreventDefault(arguments);const a=this.camera.getScene().onKeyboardObservable.add((a=>{1===a.type&&"ShiftLeft"===a.event.code?this.camera.speed=this.dashSpeed:this.camera.speed=this.walkSpeed,e||a.event.preventDefault()}));this.onKeyboardObservable=a}detachControl(){this.onKeyboardObservable&&(this.camera.getScene().onKeyboardObservable.remove(this.onKeyboardObservable),this.onKeyboardObservable=null)}getClassName(){return"ShooterCameraDashInput"}getSimpleName(){return"dash"}}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
class M{constructor(e,a){this.onMouseClick=()=>{this.engine.isPointerLock||this.engine.enterPointerlock();const e=this.camera.globalPosition.clone(),a=this.camera.getDirection(n.Forward()),t=new h(e,a,200);this.gunfireSound&&this.gunfireSound.play();const s=this.scene.pickWithRay(t,(e=>null!==e.name.match(/^Mob.+/)));s&&s.pickedMesh&&s.pickedMesh.dispose()},this.onResize=()=>{this.engine.resize()},this.engine=e;const t=this.engine.getRenderingCanvas();if(!t)throw new Error("Unknown canvas element");this.scene=new d(this.engine,a),this.scene.ambientColor=new s(.9,.9,.9),this.camera=function(e,a){const t=new n(200*Math.random()-100,2,200*Math.random()-100),s=new b("MainCamera",t,a);return s.setTarget(n.Zero()),s.inputs.add(new y(s)),s.attachControl(e,!0),s.applyGravity=!0,s.ellipsoid=new n(1.2,1.2,1.2),s.checkCollisions=!0,s}(t,this.scene),this.mainLight=
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){const a=new r("MainLight",new n(2,-5,2).normalize(),e);return a.intensity=1,a}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */(this.scene),this.shadowGenerator=new m(2048,this.mainLight),new u("ssaoPipeline",this.scene,.75,[this.camera])}async start(){!
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(n){const s=t.CreateBox("MainSkyBox",{size:4e3},n),o=new e("MainSkyBoxMaterial",n);o.backFaceCulling=!1,o.disableLighting=!0,o.reflectionTexture=new c("https://playground.babylonjs.com/textures/skybox",n),o.reflectionTexture.coordinatesMode=a.SKYBOX_MODE,s.infiniteDistance=!0,s.material=o}(this.scene),
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(t){const n=new e("ground",t);n.specularColor=s.Black();const i=new a("https://playground.babylonjs.com/textures/grass.png",t);i.uScale=60,i.vScale=60,n.diffuseTexture=i;const r=new a("https://playground.babylonjs.com/textures/grassn.png",t);r.uScale=60,r.vScale=60,n.bumpTexture=r;const c=o.CreateGround("MainGround",{width:200,height:200},t);c.material=n,c.checkCollisions=!0,c.receiveShadows=!0}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */(this.scene),function(s){const o=new e("wall",s),i=new a("https://playground.babylonjs.com/textures/floor.png",s);i.uScale=60,i.vScale=5,o.diffuseTexture=i;const r=new a("https://playground.babylonjs.com/textures/normalmap.jpg",s);r.uScale=60,r.vScale=5,o.bumpTexture=r;const c=new e("wall",s),l=new a("https://playground.babylonjs.com/textures/floor.png",s);l.uScale=5,l.vScale=60,c.diffuseTexture=l;const h=new a("https://playground.babylonjs.com/textures/normalmap.jpg",s);h.uScale=5,h.vScale=60,c.bumpTexture=h;let d=t.CreateBox("+z",{size:1},s);d.material=o.clone("mat+z"),d.scaling=new n(200,10,1),d.position.z=100,d.checkCollisions=!0,d.receiveShadows=!0,d=t.CreateBox("-z",{size:1},s),d.material=o.clone("mat-z"),d.scaling=new n(200,10,1),d.position.z=-100,d.checkCollisions=!0,d.receiveShadows=!0,d=t.CreateBox("+x",{size:1},s),d.material=c.clone("mat+x"),d.scaling=new n(1,10,200),d.position.x=100,d.checkCollisions=!0,d.receiveShadows=!0,d=t.CreateBox("-x",{size:1},s),d.material=c.clone("mat-x"),d.scaling=new n(1,10,200),d.position.x=-100,d.checkCollisions=!0,d.receiveShadows=!0}(this.scene),function(s){const o=new e("obstacle_mat",s),i=new a("https://playground.babylonjs.com/textures/floor.png",s);i.uScale=2,i.vScale=2,o.diffuseTexture=i;const r=new a("https://playground.babylonjs.com/textures/normalmap.jpg",s);r.uScale=2,r.vScale=2,o.bumpTexture=r;let c=t.CreateBox("obstacle",{size:2},s);c.checkCollisions=!0,c.receiveShadows=!0,c.setEnabled(!1);for(let e=0;e<20;e++){c=c.clone(`obstacle${e}`),c.material=o.clone(`obstacle_mat${e}`);const a=new n(Math.random()*Math.PI-Math.PI/2,Math.random()*Math.PI-Math.PI/2,Math.random()*Math.PI-Math.PI/2);c.rotate(a,Math.random()*Math.PI),c.position=new n(200*Math.random()-100,3*Math.random()-1.5,200*Math.random()-100)}}(this.scene),this.gunfireSound=await new Promise((e=>{const a=new p("Gunfire","/babylon-fps-shooter/assets/gunfire.6155ac88.mp3",this.scene,(()=>e(a)))})),await async function(e,a){const t=(await i.ImportMeshAsync("semi_house","https://assets.babylonjs.com/meshes/","both_houses_scene.babylon")).meshes[0];t.checkCollisions=!0;for(let s=0;s<30;s++){const e=t.clone(`house${s}`,null);if(!e)throw new Error("Error in cloning house");a.addShadowCaster(e),e.position=new n(200*Math.random()-100,0,200*Math.random()-100),e.scaling=new n(Math.random()+8,Math.random()+8,Math.random()+8),e.rotate(n.Up(),Math.random()*Math.PI*4)}t.isVisible=!1}(this.scene,this.shadowGenerator),await async function(a,t){const o=w.CreateCapsule("mobBase",{height:4,capSubdivisions:6,radius:1,subdivisions:4,tessellation:16},a);o.position.y=1;const i=new e("MobMaterialBase",a);o.material=i;for(let e=0;e<100;e++){const r=o.clone(`Mob${e}`,null);r.material=i.clone(`MobMaterial${e}`),r.material.diffuseColor=new s(Math.random(),Math.random(),Math.random()),t.addShadowCaster(r),r.position=new n(200*Math.random()-100,2,200*Math.random()-100),r.rotate(n.Up(),Math.random()*Math.PI*4),a.onBeforeRenderObservable.add((()=>{r.rotate(n.Up(),.5*Math.random()-.25);const e=a.getEngine().getDeltaTime()/100;r.moveWithCollisions(r.forward.multiplyByFloats(e,e,e))}))}o.isVisible=!1}(this.scene,this.shadowGenerator),window.addEventListener("resize",this.onResize),this.scene.activeCamera=this.camera,document.addEventListener("click",this.onMouseClick),this.engine.runRenderLoop((()=>{this.scene.render()}))}}(
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache 2.0
 */
async function(e){const a=new g(e,!0,{alpha:!1,antialias:!0,audioEngine:!0,autoEnableWebVR:!1,depth:!0},!0),t=new M(a);await t.start()})(document.getElementById("app")).catch((e=>console.error(e)));
