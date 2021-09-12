var e=Object.defineProperty,t=(t,n,a)=>(((t,n,a)=>{n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a})(t,"symbol"!=typeof n?n+"":n,a),a);import{B as n,V as a,S as s,C as o,T as i,G as r,a as c,D as l,b as h,c as d,d as u,e as m,f as p,g as b,R as w,F as g,A as f,h as y,i as M,E as v}from"./vendor.00afebc4.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
class C{constructor(e){t(this,"camera"),t(this,"dashSpeed",.8),t(this,"walkSpeed",.5),t(this,"onKeyboardObservable",null),this.camera=e,e.keysUp=["W".charCodeAt(0)],e.keysDown=["S".charCodeAt(0)],e.keysLeft=["A".charCodeAt(0)],e.keysRight=["D".charCodeAt(0)]}attachControl(e){e=d.BackCompatCameraNoPreventDefault(arguments),this.camera.angularSensibility=5e3,this.camera.getScene().gravity=new a(0,-.1,0);const t=this.camera.getScene().onKeyboardObservable.add((t=>{1===t.type&&"ShiftLeft"===t.event.code?this.camera.speed=this.dashSpeed:this.camera.speed=this.walkSpeed,1===t.type&&"Space"===t.event.code&&this.camera.position.y<=2.5&&(this.camera.cameraDirection.y+=.5),e||t.event.preventDefault()}));this.onKeyboardObservable=t}detachControl(){this.onKeyboardObservable&&(this.camera.getScene().onKeyboardObservable.remove(this.onKeyboardObservable),this.onKeyboardObservable=null)}getClassName(){return"ShooterCameraDashInput"}getSimpleName(){return"dash"}}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
class S{constructor(e,n){t(this,"engine"),t(this,"scene"),t(this,"camera"),t(this,"mainLight"),t(this,"shadowGenerator"),t(this,"gunfireSound"),t(this,"onMouseClick",(()=>{this.engine.isPointerLock||this.engine.enterPointerlock();const e=this.camera.globalPosition.clone(),t=this.camera.getDirection(a.Forward()),n=new w(e,t,200);this.gunfireSound&&this.gunfireSound.play();const s=this.scene.pickWithRay(n,(e=>null!==e.name.match(/^Mob.+/)));s&&s.pickedMesh&&s.pickedMesh.dispose()})),t(this,"onResize",(()=>{this.engine.resize()})),this.engine=e;const s=this.engine.getRenderingCanvas();if(!s)throw new Error("Unknown canvas element");this.scene=new u(this.engine,n),this.camera=function(e,t){const n=new a(200*Math.random()-100,2,200*Math.random()-100),s=new g("MainCamera",n,t);return s.setTarget(a.Zero()),s.inputs.add(new C(s)),s.attachControl(e,!0),s.applyGravity=!0,s.ellipsoid=new a(1.2,1.2,1.2),s.checkCollisions=!0,s}(s,this.scene),this.mainLight=
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){const t=new l("MainLight",new a(2,-5,2).normalize(),e);return t.shadowEnabled=!0,t.diffuse=new o(1,.95,.96),t}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */(this.scene),this.shadowGenerator=new m(2048,this.mainLight),function(){const e=f.CreateFullscreenUI("FullscreenUI"),t=new y("xRect");t.width="20px",t.height="2px",t.color="White",t.background="White",e.addControl(t);const n=new y("yRect");n.width="2px",n.height="20px",n.color="White",n.background="White",e.addControl(n)}(),new p("ssaoPipeline",this.scene,.75,[this.camera])}async start(){!
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){const t=n.CreateBox("MainSkyBox",{size:4e3},e),a=new s("MainSkyBoxMaterial",e);a.backFaceCulling=!1,a.disableLighting=!0,a.reflectionTexture=new h("https://playground.babylonjs.com/textures/skybox",e),a.reflectionTexture.coordinatesMode=i.SKYBOX_MODE,t.infiniteDistance=!0,t.material=a}(this.scene),
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){const t=new s("ground",e);t.specularColor=o.Black();const n=new i("https://playground.babylonjs.com/textures/grass.png",e);n.uScale=120,n.vScale=120,t.diffuseTexture=n;const a=new i("https://playground.babylonjs.com/textures/grassn.png",e);a.uScale=120,a.vScale=120,t.bumpTexture=a;const c=r.CreateGround("MainGround",{width:400,height:400},e);c.material=t,c.checkCollisions=!0,c.receiveShadows=!0}
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */(this.scene),
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */
function(e){let t=n.CreateBox("+z",{size:1},e);t.scaling=new a(200,10,1),t.position.z=100,t.checkCollisions=!0,t.receiveShadows=!0,t.visibility=0,t=n.CreateBox("-z",{size:1},e),t.scaling=new a(200,10,1),t.position.z=-100,t.checkCollisions=!0,t.receiveShadows=!0,t.visibility=0,t=n.CreateBox("+x",{size:1},e),t.scaling=new a(1,10,200),t.position.x=100,t.checkCollisions=!0,t.receiveShadows=!0,t.visibility=0,t=n.CreateBox("-x",{size:1},e),t.scaling=new a(1,10,200),t.position.x=-100,t.checkCollisions=!0,t.receiveShadows=!0,t.visibility=0}(this.scene),function(e){const t=new s("obstacle_mat",e),o=new i("https://playground.babylonjs.com/textures/floor.png",e);o.uScale=2,o.vScale=2,t.diffuseTexture=o;const r=new i("https://playground.babylonjs.com/textures/normalmap.jpg",e);r.uScale=2,r.vScale=2,t.bumpTexture=r;let c=n.CreateBox("obstacle",{size:2},e);c.checkCollisions=!0,c.receiveShadows=!0,c.setEnabled(!1);for(let n=0;n<20;n++){c=c.clone(`obstacle${n}`),c.material=t.clone(`obstacle_mat${n}`);const e=new a(Math.random()*Math.PI-Math.PI/2,Math.random()*Math.PI-Math.PI/2,Math.random()*Math.PI-Math.PI/2);c.rotate(e,Math.random()*Math.PI),c.position=new a(200*Math.random()-100,3*Math.random()-1.5,200*Math.random()-100)}}(this.scene),this.gunfireSound=await new Promise((e=>{const t=new b("Gunfire","/babylon-fps-shooter/assets/gunfire.6155ac88.mp3",this.scene,(()=>e(t)))})),await async function(e,t){const n=(await c.ImportMeshAsync("semi_house","https://assets.babylonjs.com/meshes/","both_houses_scene.babylon")).meshes[0];n.checkCollisions=!0;for(let s=0;s<30;s++){const e=n.clone(`house${s}`,null);if(!e)throw new Error("Error in cloning house");t.addShadowCaster(e),e.position=new a(200*Math.random()-100,0,200*Math.random()-100),e.scaling=new a(Math.random()+8,Math.random()+8,Math.random()+8),e.rotate(a.Up(),Math.random()*Math.PI*4)}n.isVisible=!1}(this.scene,this.shadowGenerator),await async function(e,t){const n=M.CreateCapsule("mobBase",{height:4,capSubdivisions:6,radius:1,subdivisions:4,tessellation:16},e);n.position.y=1;const i=new s("MobMaterialBase",e);n.material=i;for(let s=0;s<100;s++){const r=n.clone(`Mob${s}`,null);r.material=i.clone(`MobMaterial${s}`),r.material.diffuseColor=new o(Math.random(),Math.random(),Math.random()),t.addShadowCaster(r),r.position=new a(200*Math.random()-100,2,200*Math.random()-100),r.rotate(a.Up(),Math.random()*Math.PI*4),e.onBeforeRenderObservable.add((()=>{r.rotate(a.Up(),.5*Math.random()-.25);const t=e.getEngine().getDeltaTime()/100;r.moveWithCollisions(r.forward.multiplyByFloats(t,t,t))}))}n.isVisible=!1}(this.scene,this.shadowGenerator),window.addEventListener("resize",this.onResize),this.scene.activeCamera=this.camera,document.addEventListener("click",this.onMouseClick),this.engine.runRenderLoop((()=>{this.scene.render()}))}}(
/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache 2.0
 */
async function(e){const t=new v(e,!0,{alpha:!1,antialias:!0,audioEngine:!0,autoEnableWebVR:!1,depth:!0},!0),n=new S(t);await n.start()})(document.getElementById("app")).catch((e=>console.error(e)));
