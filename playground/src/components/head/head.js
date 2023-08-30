import React, { useRef } from 'react';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { MeshStandardMaterial, Color, BoxGeometry } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

const goldMaterial = new MeshStandardMaterial({
  color: new Color(0xFFD700),
  metalness: 1.0,
  roughness: 0.3,
  wireframe: true,
  wireframeLinewidth: 50,
});

const cubeMaterial = new MeshStandardMaterial({
  color: new Color(0x1A1A1A),
  metalness: 0,
  roughness: 0.1,
  transparent: true,
  opacity: 0.2,
  
});

const ReflectiveCube = () => {
  const cubeRef = useRef();

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.005;
      cubeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={cubeRef} geometry={new BoxGeometry(50, 50, 50)} material={cubeMaterial} position={[0, 0, 0]} />
  );
};

const HeadGroup = ({ nodes }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = -14
    }
  });

  return (
    <group ref={groupRef} dispose={null} scale={100} position={[0, -9, 0]} rotation={[0, 0, 0]}>
      <mesh frustumCulled={false} geometry={nodes.Wolf3D_Beard.geometry} material={goldMaterial} position={[0.02, -2.34, 0.06]} scale={1.47} />
      <mesh frustumCulled={false} geometry={nodes.Wolf3D_Hair.geometry} material={goldMaterial} position={[0.02, -2.34, 0.06]} scale={1.47} />
      <mesh frustumCulled={false} geometry={nodes.Wolf3D_Head.geometry} material={goldMaterial} position={[0.02, -2.34, 0.06]} scale={1.47} />
    </group>
  );
};

export default function Head(props) {
  const { nodes } = useGLTF('/DPM.gltf');
  return (
    <Canvas style={{ backgroundColor: '#0D0D0D', height: '100vh', width: '100vw' }} camera={{ position: [0, 5, 50], fov: 75, near: 1, far: 20000 }}>
      <Html><h1 className='white'>DPM</h1></Html>
      <OrbitControls makeDefault enableZoom={false} />
      <ambientLight />
      <pointLight position={[180, 180, 180]} intensity={5} />
      {/* <ReflectiveCube /> */}
      <HeadGroup nodes={nodes} />
    </Canvas>
  );
}

useGLTF.preload('/DPM.gltf');
