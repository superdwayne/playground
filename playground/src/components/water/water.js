import * as THREE from 'three'
import React, { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, useGLTF, useAnimations } from '@react-three/drei'
import { Water } from 'three-stdlib'

extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, 'images/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

function DPM() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20

  })
  const group = useRef()

  useEffect(() => {

    console.log(actions)
    actions.FLY.play()
    actions.SHOERIGHT.play()
    actions.SHOELEFT.play()
  
     });

  
  const { nodes, materials, animations } = useGLTF('/golddpm-fly-v4.gltf')
  const { actions } = useAnimations(animations, group)

     
  
  return (
    <mesh ref={ref} scale={20}>
    <OrbitControls enableZoom={true} makeDefault/>
     <group ref={group}  dispose={null}>
      <group name="Scene" >
        <group name="Armature" position={[20.84, 10.59, -12.11]} rotation={[Math.PI / 2, 1.54, 0]}>
          <primitive object={nodes.Hips} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials['Wolf3D_Body.003']} skeleton={nodes.Wolf3D_Body.skeleton} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Hair" geometry={nodes.Wolf3D_Hair.geometry} material={materials['Wolf3D_Hair.003']} skeleton={nodes.Wolf3D_Hair.skeleton} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials['Material.004']} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials['Material.006']} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
          <skinnedMesh frustumCulled={false} name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials['Wolf3D_Eye.003']} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
          <skinnedMesh frustumCulled={false} name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials['Wolf3D_Eye.003']} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Beard" geometry={nodes.Wolf3D_Beard.geometry} material={materials['Wolf3D_Beard.003']} skeleton={nodes.Wolf3D_Beard.skeleton} morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials['Wolf3D_Skin.003']} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        </group>
      </group>
    </group>
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas style={{backgroundColor: "black", height: "100vh", width: "100vw"}} camera={{ position: [0, 5, 50], fov: 75, near: 1, far: 20000 }}>
     
      <pointLight intensity={2.5} position={[100, 100, 100]} />
      <pointLight intensity={2.5} position={[-100, -100, -100]} />
      <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
      <Suspense fallback={null}>
        <Ocean />
        <DPM />
      </Suspense>
      <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
     
    </Canvas>
  )
}
