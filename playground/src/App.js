import * as THREE from "three";
import React, { useRef, Suspense, useEffect, useState  } from 'react'
import Nav from "./components/nav/nav";
import './App.css';
import { Canvas } from "@react-three/fiber";


function VideoShoe() {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/video/Shoes.mp4', crossOrigin: 'Anonymous', loop: true, muted: true, autoplay: true}))
  useEffect(() => void video.play(), [video])
  console.log(video)
  return (
    <mesh position={[-15, 10, 6]} rotation={[0, 0, 0]} scale={[17, 10, 14]}>
      <boxBufferGeometry />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  )
}

const Video = ({ muted, autoplay }) => {
  const vid = useRef();
  
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/video/Shoes.mp4', crossOrigin: 'Anonymous', loop: true, defaultMuted: true, autoplay: true}))


  console.log(video)
useEffect(() => void video.play(), [video] );


  return (
  

    <mesh position={[-15, 10, 6]} rotation={[0, 0, 0]} scale={[17, 10, 14]}>
      <boxBufferGeometry />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture  attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  );
};


export default function App() {
  return (
    <>
    <Canvas  camera={{ position: [0, 5, 50], fov: 75, near: 1, far: 20000 }}
     style={{backgroundColor: "white" , display: "block" , height: "100vh", width: "100vw"}}>

      <Video muted autoplay />
    </Canvas>
      <Nav />
    </>
  );
}
