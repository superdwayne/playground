import { useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useGLTF, useAnimations } from '@react-three/drei'
import React, { useRef } from 'react'

export function Prism({ onRayOver, onRayOut, onRayMove, ...props }) {

    // useFrame((state, delta) => {
    //     // console.log(delta)
    //     actions.LOGOspin.play()
      
    //      });

    const { nodes, materials, animations } = useGLTF('/AKQA.glb')
 
    const group = useRef()
    const { actions } = useAnimations(animations, group)
    console.log(nodes)
  return (
    // <group {...props}>
    //   {/* A low-res, invisible representation of the prism that gets hit by the raycaster */}
    //   <mesh visible={false} scale={1.9} rotation={[Math.PI / 2, Math.PI, 0]} onRayOver={onRayOver} onRayOut={onRayOut} onRayMove={onRayMove}>
    //     <cylinderGeometry args={[1, 1, 1, 3, 1]} />
    //   </mesh>
    //   {/* The visible hi-res prism */}
    //   <mesh position={[0, 0, 0.6]} renderOrder={10} scale={2} dispose={null} geometry={nodes.Cone.geometry}>
    //     <MeshTransmissionMaterial clearcoat={1} transmission={1} thickness={0.9} roughness={0} anisotropy={0.1} chromaticAberration={1} toneMapped={true} />
    //   </mesh>
    // </group>
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
      <mesh visible={false} scale={2} onRayOver={onRayOver} onRayOut={onRayOut} onRayMove={onRayMove}>
      <cylinderGeometry args={[2, 2, 1.2, 3, 1]} />
       </mesh>
        {/* <group name="path15948" position={[0.85, 0.14, -71]} rotation={[1.55, 0, 0]} scale={20}>
          <mesh name="path15948_1" geometry={nodes.path15948_1.geometry} material={materials['SVGMat.001']} />
          <mesh name="path15948_2" geometry={nodes.path15948_2.geometry} material={materials['SVGMat.002']} />
          <mesh name="path15948_3" geometry={nodes.path15948_3.geometry} material={materials['SVGMat.003']} />
          <mesh name="path15948_4" geometry={nodes.path15948_4.geometry} material={materials['SVGMat.004']} />
        </group> */}
        <mesh name="akqa"  renderOrder={10} scale={20} dispose={null} geometry={nodes.akqa.geometry} material={materials.black} position={[0, 0, -1]}  rotation={[90, 0, 0]} >
             <MeshTransmissionMaterial clearcoat={1} transmission={1} thickness={0.9} roughness={0} anisotropy={0.1} chromaticAberration={1} toneMapped={true} />
       </mesh>


      </group>
    </group>
  )
}
