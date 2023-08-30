/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 DPM.gltf
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/DPM.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} position={[0.02, -2.34, 0.06]} scale={1.47} />
      <mesh geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} position={[0.02, -2.34, 0.06]} scale={1.47} />
      <mesh geometry={nodes.Wolf3D_Beard.geometry} material={materials.Wolf3D_Beard} position={[0.02, -2.34, 0.06]} scale={1.47} />
      <mesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} position={[0.02, -2.34, 0.06]} scale={1.47} />
      <mesh geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} position={[0.02, -2.34, 0.06]} scale={1.47} />
      <mesh geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} position={[0.02, -2.34, 0.06]} scale={1.47} />
    </group>
  )
}

useGLTF.preload('/DPM.gltf')
