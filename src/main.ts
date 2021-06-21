import { MainScene } from './MainScene'

import 'pepjs'
import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('#app')!

const mainScene = new MainScene(canvas)
mainScene.start().catch(err => console.error(err))
