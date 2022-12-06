import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Detailed, OrbitControls, Environment, BakeShadows } from '@react-three/drei'
import './shapes.css';


// Create 800 objects with random position and rotation data
const positions = [...Array(600)].map(() => ({
    position: [40 - Math.random() * 80, 40 - Math.random() * 80, 40 - Math.random() * 80],
    rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2],
  }))

export default function shapes() {

  return (
    <Suspense fallback={<span>loading...</span>}>
    <Canvas style={{backgroundColor: "black", height: "100vh", width: "100vw"}}
      // Quick shortcut for setting up shadow maps
      shadows
      // Only render on changes and movement
      frameloop="demand"
      camera={{ position: [0, 0, 40] }}>
      {/* Let's render 800 Bust components with the data above */}
      {positions.map((props, i) => (
        <Bust key={i} {...props} />
      ))}
      <OrbitControls zoomSpeed={1} />
      <pointLight position={[0, 0, 0]} intensity={0.5} />
      <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
      <Environment preset="city" />
      <BakeShadows />
    </Canvas>
  </Suspense>
  )
}

function Bust(props) {
    // This will load 4 GLTF in parallel using React Suspense
    const levels = useGLTF(['/gold.gltf', '/gold.gltf', '/gold.gltf', '/gold.gltf'])
    // By the time we're here these GLTFs exist, they're loaded
    // There are 800 instances of this component, but the GLTF data is cached and will be re-used ootb
    return (
      <Detailed distances={[0, 15, 25, 35, 100]} {...props}>
        {/* All we need to do is dump them into the Detailed component and define some distances
            Since we use a JSX mesh to represent each bust the geometry is being re-used w/o cloning */}
        {levels.map(({ nodes, materials }, index) => (
            <mesh key={index} geometry={nodes.Air_Jordan_One_not_smoothed_V02_lambert2_0.geometry} material={materials['Scratched Gold']} position={[-4.58, 0.48, 1.87]} scale={0.68} />
        ))}
        <group />
      </Detailed>
    )
  }