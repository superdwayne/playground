import { useRef, useCallback, useState,Suspense } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader, Canvas  } from '@react-three/fiber'
import { Stage, Center, Text3D , OrbitControls, useAspect, useVideoTexture, useTexture  } from "@react-three/drei";
import { Bloom, EffectComposer, LUT , Pixelation, Noise, DepthOfField, GodRays  } from "@react-three/postprocessing";
import { BlendFunction, LUTCubeLoader } from "postprocessing";
import { Beam } from './beam'
import { Rainbow } from './rainbow'
import { Prism } from './prism'
import { Flare } from './flare'
import { Box } from './box'
import { calculateRefractionAngle, lerp, lerpV3 } from './util'
import ReactPlayer from 'react-player'

import './data.css';
export default function Data() {
  const texture = useLoader(LUTCubeLoader, '/lut/F-6800-STD.cube')
  return (
   <>
     
    <Canvas orthographic gl={{ antialias: false }} camera={{ position: [0, 0, 100], zoom: 70 }} style={{ backgroundColor: "white", height: "100vh", width: "100vw"}}>
     {/* <OrbitControls /> */}
      <color attach="background" args={['black']} />
      <Scene />
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
        <LUT lut={texture} />
      </EffectComposer>
    </Canvas>
   </>
  )
}

function Scene() {
  const [isPrismHit, hitPrism] = useState(false)
  const flare = useRef(null)
  const ambient = useRef(null)
  const spot = useRef(null)
  const boxreflect = useRef(null)
  const rainbow = useRef(null)

  const rayOut = useCallback(() => hitPrism(false), [])
  const rayOver = useCallback((e) => {
    // Break raycast so the ray stops when it touches the prism
    e.stopPropagation()
    hitPrism(true)
    // Set the intensity really high on first contact
    rainbow.current.material.speed = 1
    rainbow.current.material.emissiveIntensity = 20
  }, [])

  const vec = new THREE.Vector3()
  const rayMove = useCallback(({ api, position, direction, normal }) => {
    if (!normal) return
    // Extend the line to the prisms center
    vec.toArray(api.positions, api.number++ * 3)
    // Set flare
    flare.current.position.set(position.x, position.y, -0.5)
    flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y))
    // Calculate refraction angles
    let angleScreenCenter = Math.atan2(-position.y, -position.x)
    const normalAngle = Math.atan2(normal.y, normal.x)
    // The angle between the ray and the normal
    const incidentAngle = angleScreenCenter - normalAngle
    // Calculate the refraction for the incident angle
    const refractionAngle = calculateRefractionAngle(incidentAngle) * 6
    // Apply the refraction
    angleScreenCenter += refractionAngle
    rainbow.current.rotation.z = angleScreenCenter
    // Set spot light
    lerpV3(spot.current.target.position, [Math.cos(angleScreenCenter), Math.sin(angleScreenCenter), 0], 0.05)
    spot.current.target.updateMatrixWorld()
  }, [])

  useFrame((state) => {
    // Tie beam to the mouse
    boxreflect.current.setRay([(state.pointer.x * state.viewport.width) / 2, (state.pointer.y * state.viewport.height) / 2, 0], [0, 0, 0])
    // Animate rainbow intensity
    lerp(rainbow.current.material, 'emissiveIntensity', isPrismHit ? 2.5 : 0, 0.1)
    spot.current.intensity = rainbow.current.material.emissiveIntensity
    // Animate ambience
    lerp(ambient.current, 'intensity', 0, 0.25)
  })
console.log(boxreflect)

const [videoMuted, setVideoMuted] = useState(true);

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = '1678883447406.mp4';
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = videoMuted;
    vid.play();
    return vid;
  });


  return (
    <>
      {/* Lights */}
      <ambientLight ref={ambient} intensity={1} />
      <pointLight position={[10, -10, 0]} intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.05} />
      <pointLight position={[-10, 0, 0]} intensity={0.05} />
      <pointLight position={[0, 0, 0]} intensity={0.05} />
      <spotLight ref={spot} intensity={1} distance={7} angle={1} penumbra={1} position={[0, 0, 1]} />
      {/* Caption */}
     
      <Center top bottom position={[0, 2, 0]}>
        <Text3D size={0.9} position={[6.5, 1, 0]} letterSpacing={-0.05} height={0.05} font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json">
        Growth Strategy  
          <meshStandardMaterial color="white" />
        </Text3D>

        <Text3D size={0.9} position={[-3.5, -4, 0]} letterSpacing={-0.05} height={0.05} font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json">
        Brand  
          <meshStandardMaterial color="white" />
        </Text3D>
       

      </Center>

      <mesh visible={!isPrismHit} scale={10} position={[-3.5, -4, 0]}>
      <planeGeometry   />
      <meshStandardMaterial emissive={"white"} emissiveIntensity={0.5} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
    </mesh>
      
      {/* Prism + blocks + reflect beam */}
      <Beam ref={boxreflect} bounce={50} far={20}>
        <Prism position={[0, -0.5, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
        <Box name="box1" position={[7, -3.5, 0]} rotation={[0, 0, Math.PI / 3.5]}  onPointerEnter={() => setVideoMuted(false)} onPointerLeave={() => setVideoMuted(true)}/>
        <Box position={[-4, 2, 0]} rotation={[0, 0, Math.PI / 4]} />
        
      
        
        <Box position={[-3.5, -4, 0]} rotation={[0, 0, Math.PI / 4]} />
        <Box position={[-1, 5, 0]} rotation={[0, 0, Math.PI / 3.5]} />

        <Box position={[6.5, 1, 0]} rotation={[0, 0, Math.PI / 3.5]} />
      </Beam>
      {/* Rainbow and flares */}
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
      <Flare ref={flare} visible={isPrismHit} renderOrder={10} scale={1.25} streak={[12.5, 20, 1]} />
    </>
  )
}
