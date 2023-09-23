/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 Guccisole.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Sole(props) {
  const { nodes, materials } = useGLTF('/Guccisole.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.id_Punta1934.geometry} material={materials['Default.002']} position={[-0.748, 0.026, -0.931]} rotation={[0, 0.013, 0]} scale={6.592} />
    </group>
  )
}

useGLTF.preload('/Guccisole.glb')