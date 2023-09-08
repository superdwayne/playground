import React, { Suspense, useRef, useMemo, useEffect } from 'react'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'


function Model(props) {


  
    useEffect(() => {

       
        const ani6 = "alp_SupportoTPU"
        const ani7 = "alp_SupportoTPU.001"

        console.log(actions)
        actions.Action.play()
        actions[ani6].play()
        actions[ani7].play()
      
         });
        

    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/falling.glb')
    const { actions } = useAnimations(animations, group)
    console.log( actions)



    return (
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Armature001" position={[-1.61, 0.05, -0.29]} scale={[16, 16, 16]} >
            <primitive object={nodes.Hips} />
            <skinnedMesh frustumCulled={false} name="Wolf3D_Body002" geometry={nodes.Wolf3D_Body002.geometry} material={materials['Wolf3D_Body.003']} skeleton={nodes.Wolf3D_Body002.skeleton} />
            <skinnedMesh frustumCulled={false} name="Wolf3D_Hair002" geometry={nodes.Wolf3D_Hair002.geometry} material={materials['Wolf3D_Hair.003']} skeleton={nodes.Wolf3D_Hair002.skeleton} />
            <skinnedMesh frustumCulled={false} name="Wolf3D_Outfit_Bottom002" geometry={nodes.Wolf3D_Outfit_Bottom002.geometry} material={materials['Wolf3D_Outfit_Bottom.003']} skeleton={nodes.Wolf3D_Outfit_Bottom002.skeleton} />
            <skinnedMesh frustumCulled={false} name="Wolf3D_Outfit_Top002" geometry={nodes.Wolf3D_Outfit_Top002.geometry} material={materials['Material.003']} skeleton={nodes.Wolf3D_Outfit_Top002.skeleton} />
            <skinnedMesh frustumCulled={false} name="EyeLeft002" geometry={nodes.EyeLeft002.geometry} material={materials['Wolf3D_Eye.003']} skeleton={nodes.EyeLeft002.skeleton} morphTargetDictionary={nodes.EyeLeft002.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft002.morphTargetInfluences} />
            <skinnedMesh frustumCulled={false} name="EyeRight002" geometry={nodes.EyeRight002.geometry} material={materials['Wolf3D_Eye.003']} skeleton={nodes.EyeRight002.skeleton} morphTargetDictionary={nodes.EyeRight002.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight002.morphTargetInfluences} />
            <skinnedMesh frustumCulled={false} name="Wolf3D_Beard002" geometry={nodes.Wolf3D_Beard002.geometry} material={materials['Wolf3D_Beard.003']} skeleton={nodes.Wolf3D_Beard002.skeleton} morphTargetDictionary={nodes.Wolf3D_Beard002.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Beard002.morphTargetInfluences} />
            <skinnedMesh frustumCulled={false} name="Wolf3D_Head002" geometry={nodes.Wolf3D_Head002.geometry} material={materials['Wolf3D_Skin.003']} skeleton={nodes.Wolf3D_Head002.skeleton} morphTargetDictionary={nodes.Wolf3D_Head002.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head002.morphTargetInfluences} />
            <skinnedMesh frustumCulled={false} name="Wolf3D_Teeth002" geometry={nodes.Wolf3D_Teeth002.geometry} material={materials['Wolf3D_Teeth.005']} skeleton={nodes.Wolf3D_Teeth002.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth002.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth002.morphTargetInfluences} />
          </group>
        </group>
      </group>
    )
  }
  
  useGLTF.preload('/falling.glb')
  

export default function FallingGucci() {

  return (
    <>
    <Canvas style={{backgroundColor: "black", height: "100vh", width: "100vw"}} camera={{ position: [0, 5, 50], fov: 75, near: 1, far: 20000 }}>
    <spotLight intensity={2.5} position={[50, 0, -150]} castShadow />
    {/* <gridHelper /> */}
    <OrbitControls enableZoom={true} makeDefault/>
   <Suspense fallback={null}>
    <Model scale={[10, 10, 10]} />
    </Suspense>

    <spotLight intensity={2.5} position={[0, 0, 150]} castShadow />
   </Canvas>
   </>
  )
}
