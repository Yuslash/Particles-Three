import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

/**
 * canvas
 */
const canvas = document.querySelector('canvas.webgl')

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Texture Loader
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Particles
 */
const particleGeometry = new THREE.BufferGeometry()
const particleMaterial = new THREE.PointsMaterial()
particleMaterial.size = 0.1
particleMaterial.sizeAttenuation = true
const particles = new THREE.Points(particleGeometry,particleMaterial)
const count = 20000
const position = new Float32Array(count * 3)
for(let i =0; i < count * 3; i++)
    {
        position[i] = (Math.random() - 0.5) * 10
    }
    particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(position, 3)
    )
const particlesTexture = textureLoader.load('textures/particles/9.png')
particleMaterial.transparent = true
particleMaterial.alphaMap = particlesTexture
particleMaterial.alphaTest = 0.001
scene.add(particles)

/**
 * Size
 */
const size = {
    width : window.innerWidth,
    height : window.innerHeight
}

/**
 * Resize
 */
window.addEventListener('resize',()=>{
    size.width = window.innerWidth
    size.height = window.innerHeight

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    renderer.setSize(size.width, size.height)
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 5
// camera.position.y = 5
// camera.position.x = -3
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width,size.height)

const clock = new THREE.Clock()

/**
 * Animate
 */
const tick = () =>{

    const elapsedTime = clock.getElapsedTime()

    for(let i = 0; i < count ; i ++)
        {
            const i3 = i * 3

            const x = particleGeometry.attributes.position.array[i3]

            particleGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
        }
    
    particleGeometry.attributes.position.needsUpdate = true

    controls.update()

    renderer.render(scene,camera)

    window.requestAnimationFrame(tick)

}
tick()
