import * as THREE from 'three'
import { useEffect, useState, useRef, Suspense } from 'react'
import { useAspect, useVideoTexture, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Shapes from './components/shapes/shapes'
import Water from './components/water/water'
import './App.css';


function VideoFlying() {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/video/Flying.mp4', crossOrigin: 'Anonymous', loop: true, muted: true, autoPlay: true }))
  useEffect(() => void video.play(), [video])

  
  return (
    <mesh position={[-3, 0, -20]} rotation={[0, 0, 0]} scale={[17, 10, 14]}>
      <boxBufferGeometry />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  )
}

function VideoAR() {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/video/Arhead.mp4', crossOrigin: 'Anonymous', loop: true, muted: true, autoPlay: true }))
  useEffect(() => void video.play(), [video])
  return (
    <mesh position={[10, 3, 2]} rotation={[0, 0, 0]} scale={[17, 10, 14]}>
      <boxBufferGeometry />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  )
}

function VideoShoe() {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/video/Shoes.mp4', crossOrigin: 'Anonymous', loop: true, muted: true, autoPlay: true }))
  useEffect(() => void video.play(), [video])
  return (
    <mesh position={[-15, 10, 6]} rotation={[0, 0, 0]} scale={[17, 10, 14]}>
      <boxBufferGeometry />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  )
}


export default function App() {
  return (
    <Canvas
    camera={{ position: [0, 5, 50], fov: 75, near: 1, far: 20000 }}
     style={{backgroundColor: "white" , display: "block" , height: "100vh", width: "100vw"}}>
        <OrbitControls />
        <VideoFlying />
        <VideoAR />
        <VideoShoe />
      </Canvas>
  );
}

