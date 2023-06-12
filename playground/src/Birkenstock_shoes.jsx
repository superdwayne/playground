import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/birkenstock_shoes.glb')
  return (
    <group {...props} dispose={null}>
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
  )
}

useGLTF.preload('/birkenstock_shoes.glb')
