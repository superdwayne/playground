import React, { useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, MeshReflectorMaterial, Stage } from '@react-three/drei'
import Birksshoe from './birksshoe'

export default function Birks(props) {

  const { nodes, materials } = useGLTF('/birkenstock_shoes.glb')
  console.log(nodes)
  
  const [speed, set] = useState(1)

  return (


<Suspense fallback={<span>loading...</span>}>
    <Canvas style={{backgroundColor: "black", height: "100vh", width: "100vw"}}>
    <Stage environment={null} intensity={0.1} contactShadow={false} shadowBias={-0.0015}>
                     
    <group {...props} dispose={null} >
      <group scale={0.01}>
        <group position={[3.76, 8.22, -20.67]} rotation={[-Math.PI / 2, 0, 0.15]} scale={27.09}>
          <group position={[-0.33, -0.74, -0.64]} rotation={[0, 0, -0.03]} scale={4.05}>
            <group position={[0.02, 0, 0]} rotation={[0, 0, -0.13]} scale={0.91}>
              <mesh geometry={nodes.Plane004_laniere_0.geometry} material={materials.laniere} />
              <mesh geometry={nodes.BOUCLE002_boucle_0.geometry} material={materials.boucle} position={[-0.26, 0.05, 0.47]} rotation={[0.32, -1.01, 0.79]} scale={[0.81, 0.79, 1]} />
            </group>
            <mesh geometry={nodes.CHAUSSON_LOW_UV001_sabot_0.geometry} material={materials.sabot} />
          </group>
          <mesh geometry={nodes.Plane_SEMELLE_0.geometry} material={materials.SEMELLE} />
        </group>
      </group>
    </group>

    <Birksshoe speed={speed} />
                    </Stage> 

    <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
            />
      <OrbitControls zoomSpeed={1} />
      <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
      <pointLight position={[0, 0, 0]} intensity={0.5} />
      
    </Canvas>
  </Suspense>


    
  )
}

useGLTF.preload('/birkenstock_shoes.glb')
