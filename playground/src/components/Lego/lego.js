import { Suspense, useState, useRef  } from 'react'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { useGLTF,OrbitControls, useFBO, MeshTransmissionMaterial,  Points, PointMaterial, Html   } from '@react-three/drei'
import * as THREE from "three";
import { easing } from 'maath'
import * as random from 'maath/random/dist/maath-random.esm'


function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(15000), { radius: 4.5 }))
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#add8e6" size={0.085} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

  

function Lens({ children, damping = 0.15, ...props }) {
    const ref = useRef()
    const { nodes } = useGLTF('/lens-transformed.glb')
    const buffer = useFBO()
    const viewport = useThree((state) => state.viewport)
    const [scene] = useState(() => new THREE.Scene())
    useFrame((state, delta) => {
      // Tie lens to the pointer
      // getCurrentViewport gives us the width & height that would fill the screen in threejs units
      // By giving it a target coordinate we can offset these bounds, for instance width/height for a plane that
      // sits 15 units from 0/0/0 towards the camera (which is where the lens is)
      const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15])
      easing.damp3(
        ref.current.position,
        [(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 15],
        damping,
        delta
      )
      // This is entirely optional but spares us one extra render of the scene
      // The createPortal below will mount the children of <Lens> into the new THREE.Scene above
      // The following code will render that scene into a buffer, whose texture will then be fed into
      // a plane spanning the full screen and the lens transmission material
      state.gl.setRenderTarget(buffer)
      state.gl.setClearColor('#ccc')
      state.gl.render(scene, state.camera)
      state.gl.setRenderTarget(null)
    })
    return (
      <>
        {createPortal(children, scene)}
        <mesh scale={[viewport.width, viewport.height, 1]}>
          <boxGeometry />
          <meshBasicMaterial map={buffer.texture} />
        </mesh>
        <mesh scale={0.15} ref={ref} rotation-x={Math.PI / 2} geometry={nodes.Cylinder.geometry} {...props}>
          <MeshTransmissionMaterial buffer={buffer.texture} ior={1.2} thickness={1.5} anisotropy={0.1} chromaticAberration={1.5} />
        </mesh>
      </>
    )
  }


function Gucci (props) {
    const { nodes, materials } = useGLTF('/right.glb')
    return (
      <>
       <Stars />
      <group receiveShadow {...props} dispose={null}>
        <mesh geometry={nodes.id_Punta001.geometry} material={materials.Default} position={[0, -1, 0]} rotation={[0, 0, 0]} scale={15} />
      </group>
      </>
    )
  }

export default function Lego(props) {

  return (
    <>

<Canvas camera={{ position: [0, 0, 20], fov: 15 }}  style={{backgroundColor: "black", height: "100vh", width: "100vw"}} >

       <Suspense fallback={null}>
      
       <Lens>
       {/* <Html>
        <h1>Gucci</h1>
      </Html> */}
       {/* <spotLight intensity={1.5}/>
       <pointLight intensity={2.5} position={[10,0,0]}/> */}
       <spotLight intensity={60} position={[0.8,0,0.5]}/>
      <pointLight intensity={100}/> 
      <Gucci />
      
       </Lens>
       {/* <OrbitControls /> */}
      </Suspense>
    </Canvas>
</>
  )
}

