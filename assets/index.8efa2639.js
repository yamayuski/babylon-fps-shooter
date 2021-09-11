var e=Object.defineProperty,t=(t,a,n)=>(((t,a,n)=>{a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n})(t,"symbol"!=typeof a?a+"":a,n),n);import{B as a,V as n,S as s,C as o,T as i,G as r,a as c,D as h,b as l,c as d,d as u,e as m,f as p,g as b,R as g,F as w,A as y,h as f,i as M,E as v}from"./vendor.00afebc4.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
class C{constructor(e){t(this,"camera"),t(this,"dashSpeed",.8),t(this,"walkSpeed",.5),t(this,"gravity",.1),t(this,"keys",{}),t(this,"onKeyboardObservable",null),this.camera=e,e.keysUp=["W".charCodeAt(0)],e.keysDown=["S".charCodeAt(0)],e.keysLeft=["A".charCodeAt(0)],e.keysRight=["D".charCodeAt(0)]}attachControl(e){e=d.BackCompatCameraNoPreventDefault(arguments),this.camera.getScene().gravity.y=-this.gravity;const t=this.camera.getScene().onKeyboardObservable.add((t=>{t.event.shiftKey?this.camera.speed=this.dashSpeed:this.camera.speed=this.walkSpeed,1===t.type?this.keys[t.event.code]=!0:2===t.type&&(this.keys[t.event.code]=!1),e||t.event.preventDefault()}));this.onKeyboardObservable=t}detachControl(){this.onKeyboardObservable&&(this.camera.getScene().onKeyboardObservable.remove(this.onKeyboardObservable),this.onKeyboardObservable=null)}getClassName(){return"ShooterCameraDashInput"}getSimpleName(){return"dash"}checkInputs(){if(this.onKeyboardObservable){if(this.camera.getScene().activeCamera!==this.camera)return;const e=this.camera;this.keys.Space&&e.cameraDirection.copyFromFloats(0,this.walkSpeed/.5,0)}}}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
class k{constructor(e,a){t(this,"engine"),t(this,"scene"),t(this,"camera"),t(this,"mainLight"),t(this,"shadowGenerator"),t(this,"gunfireSound"),t(this,"onMouseClick",(()=>{this.engine.isPointerLock||this.engine.enterPointerlock();const e=this.camera.globalPosition.clone(),t=this.camera.getDirection(n.Forward()),a=new g(e,t,200);this.gunfireSound&&this.gunfireSound.play();const s=this.scene.pickWithRay(a,(e=>null!==e.name.match(/^Mob.+/)));s&&s.pickedMesh&&s.pickedMesh.dispose()})),t(this,"onResize",(()=>{this.engine.resize()})),this.engine=e;const s=this.engine.getRenderingCanvas();if(!s)throw new Error("Unknown canvas element");this.scene=new u(this.engine,a),this.camera=function(e,t){const a=new n(200*Math.random()-100,2,200*Math.random()-100),s=new w("MainCamera",a,t);return s.setTarget(n.Zero()),s.inputs.add(new C(s)),s.attachControl(e,!0),s._needMoveForGravity=!0,s.applyGravity=!0,s.ellipsoid=new n(1.2,1.2,1.2),s.checkCollisions=!0,s}(s,this.scene),this.mainLight=
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){const t=new h("MainLight",new n(2,-5,2).normalize(),e);return t.shadowEnabled=!0,t.diffuse=new o(1,.95,.96),t}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */(this.scene),this.shadowGenerator=new m(2048,this.mainLight),function(){const e=y.CreateFullscreenUI("FullscreenUI"),t=new f("xRect");t.width="20px",t.height="2px",t.color="White",t.background="White",e.addControl(t);const a=new f("yRect");a.width="2px",a.height="20px",a.color="White",a.background="White",e.addControl(a)}(),new p("ssaoPipeline",this.scene,.75,[this.camera])}async start(){!
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){const t=a.CreateBox("MainSkyBox",{size:4e3},e),n=new s("MainSkyBoxMaterial",e);n.backFaceCulling=!1,n.disableLighting=!0,n.reflectionTexture=new l("https://playground.babylonjs.com/textures/skybox",e),n.reflectionTexture.coordinatesMode=i.SKYBOX_MODE,t.infiniteDistance=!0,t.material=n}(this.scene),
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){const t=new s("ground",e);t.specularColor=o.Black();const a=new i("https://playground.babylonjs.com/textures/grass.png",e);a.uScale=120,a.vScale=120,t.diffuseTexture=a;const n=new i("https://playground.babylonjs.com/textures/grassn.png",e);n.uScale=120,n.vScale=120,t.bumpTexture=n;const c=r.CreateGround("MainGround",{width:400,height:400},e);c.material=t,c.checkCollisions=!0,c.receiveShadows=!0}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */(this.scene),
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){let t=a.CreateBox("+z",{size:1},e);t.scaling=new n(200,10,1),t.position.z=100,t.checkCollisions=!0,t.receiveShadows=!0,t.visibility=0,t=a.CreateBox("-z",{size:1},e),t.scaling=new n(200,10,1),t.position.z=-100,t.checkCollisions=!0,t.receiveShadows=!0,t.visibility=0,t=a.CreateBox("+x",{size:1},e),t.scaling=new n(1,10,200),t.position.x=100,t.checkCollisions=!0,t.receiveShadows=!0,t.visibility=0,t=a.CreateBox("-x",{size:1},e),t.scaling=new n(1,10,200),t.position.x=-100,t.checkCollisions=!0,t.receiveShadows=!0,t.visibility=0}(this.scene),function(e){const t=new s("obstacle_mat",e),o=new i("https://playground.babylonjs.com/textures/floor.png",e);o.uScale=2,o.vScale=2,t.diffuseTexture=o;const r=new i("https://playground.babylonjs.com/textures/normalmap.jpg",e);r.uScale=2,r.vScale=2,t.bumpTexture=r;let c=a.CreateBox("obstacle",{size:2},e);c.checkCollisions=!0,c.receiveShadows=!0,c.setEnabled(!1);for(let a=0;a<20;a++){c=c.clone(`obstacle${a}`),c.material=t.clone(`obstacle_mat${a}`);const e=new n(Math.random()*Math.PI-Math.PI/2,Math.random()*Math.PI-Math.PI/2,Math.random()*Math.PI-Math.PI/2);c.rotate(e,Math.random()*Math.PI),c.position=new n(200*Math.random()-100,3*Math.random()-1.5,200*Math.random()-100)}}(this.scene),this.gunfireSound=await new Promise((e=>{const t=new b("Gunfire","/babylon-fps-shooter/assets/gunfire.6155ac88.mp3",this.scene,(()=>e(t)))})),await async function(e,t){const a=(await c.ImportMeshAsync("semi_house","https://assets.babylonjs.com/meshes/","both_houses_scene.babylon")).meshes[0];a.checkCollisions=!0;for(let s=0;s<30;s++){const e=a.clone(`house${s}`,null);if(!e)throw new Error("Error in cloning house");t.addShadowCaster(e),e.position=new n(200*Math.random()-100,0,200*Math.random()-100),e.scaling=new n(Math.random()+8,Math.random()+8,Math.random()+8),e.rotate(n.Up(),Math.random()*Math.PI*4)}a.isVisible=!1}(this.scene,this.shadowGenerator),await async function(e,t){const a=M.CreateCapsule("mobBase",{height:4,capSubdivisions:6,radius:1,subdivisions:4,tessellation:16},e);a.position.y=1;const i=new s("MobMaterialBase",e);a.material=i;for(let s=0;s<100;s++){const r=a.clone(`Mob${s}`,null);r.material=i.clone(`MobMaterial${s}`),r.material.diffuseColor=new o(Math.random(),Math.random(),Math.random()),t.addShadowCaster(r),r.position=new n(200*Math.random()-100,2,200*Math.random()-100),r.rotate(n.Up(),Math.random()*Math.PI*4),e.onBeforeRenderObservable.add((()=>{r.rotate(n.Up(),.5*Math.random()-.25);const t=e.getEngine().getDeltaTime()/100;r.moveWithCollisions(r.forward.multiplyByFloats(t,t,t))}))}a.isVisible=!1}(this.scene,this.shadowGenerator),window.addEventListener("resize",this.onResize),this.scene.activeCamera=this.camera,document.addEventListener("click",this.onMouseClick),this.engine.runRenderLoop((()=>{this.scene.render()}))}}(
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache 2.0
 */
async function(e){const t=new v(e,!0,{alpha:!1,antialias:!0,audioEngine:!0,autoEnableWebVR:!1,depth:!0},!0),a=new k(t);await a.start()})(document.getElementById("app")).catch((e=>console.error(e)));
