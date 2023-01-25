/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 flyingdunks.glb --transfrom --simplify
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/flyingdunks.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="GLTF_created_0" position={[0.2, -0.19, 0.17]} rotation={[-0.05, 0.32, 0.01]} scale={0.6}>
          <group name="polySurface151_wings_0001_73" />
          <group name="polySurface151_wings_0_72" />
          <primitive object={nodes.GLTF_created_0_rootJoint} />
          <primitive object={nodes.neutral_bone} />
          <primitive object={nodes.neutral_bone_1} />
          <group name="Object_52">
            <skinnedMesh name="Object_2" geometry={nodes.Object_2.geometry} material={materials.wings} skeleton={nodes.Object_2.skeleton} />
            <skinnedMesh name="Object_2_1" geometry={nodes.Object_2_1.geometry} material={materials['Scratched Gold']} skeleton={nodes.Object_2_1.skeleton} />
          </group>
          <skinnedMesh name="Object_54" geometry={nodes.Object_54.geometry} material={materials.wings} skeleton={nodes.Object_54.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/flyingdunks.glb')
