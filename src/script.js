import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Define how many triangles you want (50 triangles in this case)
const count = 50

// Create a Float32Array to hold the positions of the vertices for all triangles (each triangle has 3 vertices, and each vertex has 3 values: x, y, z)
const positionsArray = new Float32Array(count * 3 * 3) // 50 triangles * 3 vertices * 3 values (x, y, z)

// Fill the positionsArray with random values
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4  // Random value between -2 and 2 (scaled by 4)
}

// Create a BufferAttribute for the positions array and assign it to the geometry
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

// Create a material for the mesh
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

// Create a mesh with the geometry and material
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resize event listener
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render the scene
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
