import React, { useRef, Suspense, useEffect, useState  } from 'react'
import {OrbitControls, Environment, Stage, Text, useCursor, MeshPortalMaterial } from '@react-three/drei'
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { easing, geometry } from 'maath'
import * as THREE from 'three'
extend(geometry)

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) {
  const portal = useRef()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((state, dt) => easing.damp(portal.current, 'blend'))
  return (
    <group {...props}>
      <Text  fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>
      <Text  fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      <Text  fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text>
      <mesh name={id} scale={30} onDoubleClick={(e) => (e.stopPropagation())} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial ref={portal}  side={THREE.DoubleSide}>
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

export default function environment() {

  

  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 75 }} style={{backgroundColor: "white", height: "100vh", width: "100vw"}}>
    <Suspense fallback={null}>
    <Frame id="02" name="DPM" author="Dwayne" position={[2,2,120]}>
    <Environment
          background={true} // Whether to affect scene.background
          files={'Anime_hdri-hdr_Galactic_core_spiraling_nebulae_1740787018.hdr'}
          path={'/'}
        >
        
        </Environment>
        
    </Frame>

    <Frame id="02" name="DPM" author="Dwayne" position={[2,2,10]}>
    <Environment
          background={true} // Whether to affect scene.background
          files={'Digital_Painting_hdri-hdr_A_glass_gaxley_1531582711.hdr'}
          path={'/'}
        >
        
        </Environment>
        
    </Frame>

    <Frame id="02" author="Dwayne" position={[2,2,50]}>
    <Environment
          background={true} // Whether to affect scene.background
          files={'Realistic_hdri-hdr_VR360_pixelated_cosmos_cubist_1667100354.hdr'}
          path={'/'}
        >
        
        </Environment>
        
    </Frame>

    
      <Stage environment={null} intensity={1} contactShadowOpacity={0.1} shadowBias={-0.0015}>
      <Environment
          background={true} // Whether to affect scene.background
          files={'Digital_Painting_hdri-hdr_VR360_view_vast_galaxy_1930154722.hdr'}
          path={'/'}
        />
      </Stage>
    </Suspense>
    <OrbitControls autoRotate={false} enableZoom={true} zoomSpeed={0.2} enablePan={false} />
  </Canvas>
  )
}
