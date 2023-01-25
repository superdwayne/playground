import { Suspense, useMemo, useRef  } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Leva, folder, useControls } from "leva";
import { useGLTF,OrbitControls, useFBO,MeshReflectorMaterial  } from '@react-three/drei'
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import './gucci.css';

import vertexShader from '../../shaders/vertex';
import fragmentShader from '../../shaders/fragment';


const Geometries = () => {
    // This reference gives us direct access to our mesh
    const mesh = useRef();
    const backgroundGroup = useRef();
    const { nodes, materials } = useGLTF('/right.glb')
    // This is our main render target where we'll render and store the scene as a texture
    const mainRenderTarget = useFBO();
    const backRenderTarget = useFBO();
  
    const {
      light,
      shininess,
      diffuseness,
      fresnelPower,
      iorR,
      iorY,
      iorG,
      iorC,
      iorB,
      iorP,
      saturation,
      chromaticAberration,
      refraction
    } = useControls({
  
      light: {
        value: new THREE.Vector3(-1.0, 1.0, 1.0),
      },
      diffuseness: {
        value: 0.2,
      },
      shininess: {
        value: 15.0,
      },
      fresnelPower: {
        value: 8.0,
      },
      ior: folder({
        iorR: { min: 1.0, max: 2.333, step: 0.001, value: 1.15 },
        iorY: { min: 1.0, max: 2.333, step: 0.001, value: 1.16 },
        iorG: { min: 1.0, max: 2.333, step: 0.001, value: 1.18 },
        iorC: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
        iorB: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
        iorP: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
      }),
      saturation: { value: 1.14, min: 1, max: 1.25, step: 0.01 },
      chromaticAberration: {
        value: 0.5,
        min: 0,
        max: 1.5,
        step: 0.01,
      },
      refraction: {
        value: 0.25,
        min: 0,
        max: 1,
        step: 0.01,
      },
    })
  
    const uniforms = useMemo(() => ({
      uTexture: {
        value: null,
      },
      uIorR: { value: 1.0 },
      uIorY: { value: 1.0 },
      uIorG: { value: 1.0 },
      uIorC: { value: 1.0 },
      uIorB: { value: 1.0 },
      uIorP: { value: 1.0 },
      uRefractPower: {
        value: 0.2,
      },
      uChromaticAberration: {
        value: 1.0
      },
      uSaturation: { value: 0.0 },
      uShininess: { value: 40.0 },
      uDiffuseness: { value: 0.2 },
      uFresnelPower: { value: 8.0 },
      uLight: {
        value: new THREE.Vector3(-1.0, 1.0, 1.0),
      },
      winResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2)), // if DPR is 3 the shader glitches 🤷‍♂️
      },
    }), [])
  
    useFrame((state) => {
      const { gl, scene, camera } = state;
      mesh.current.visible = false;
  
      mesh.current.material.uniforms.uDiffuseness.value = diffuseness;
      mesh.current.material.uniforms.uShininess.value = shininess;
      mesh.current.material.uniforms.uLight.value = new THREE.Vector3(
        light.x,
        light.y,
        light.z
      );
      mesh.current.material.uniforms.uFresnelPower.value = fresnelPower;
  
      mesh.current.material.uniforms.uIorR.value = iorR;
      mesh.current.material.uniforms.uIorY.value = iorY;
      mesh.current.material.uniforms.uIorG.value = iorG;
      mesh.current.material.uniforms.uIorC.value = iorC;
      mesh.current.material.uniforms.uIorB.value = iorB;
      mesh.current.material.uniforms.uIorP.value = iorP;
  
      mesh.current.material.uniforms.uSaturation.value = saturation;
      mesh.current.material.uniforms.uChromaticAberration.value = chromaticAberration;
      mesh.current.material.uniforms.uRefractPower.value = refraction;
  
      gl.setRenderTarget(backRenderTarget);
      gl.render(scene, camera);
  
      mesh.current.material.uniforms.uTexture.value = backRenderTarget.texture;
      mesh.current.material.side = THREE.BackSide;
  
      mesh.current.visible = true;
  
      gl.setRenderTarget(mainRenderTarget);
      gl.render(scene, camera);
  
      mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;
      mesh.current.material.side = THREE.FrontSide;
  
      gl.setRenderTarget(null);
      
    });
  
    return (
      <>
        <color attach="background" args={["black"]} />
        <group ref={backgroundGroup} visible={false}>
      
             <mesh geometry={nodes.id_Punta001.geometry} material={materials.Default} position={[0, -1, 0]} rotation={[0, 0, 0]} scale={20} />
        </group>
        <mesh ref={mesh}>
        <planeBufferGeometry  args={[25, 15, 32, 100]} position={[10, 0 , -10]} />
          {/* <torusGeometry args={[3, 1, 32, 100]} /> */}
          <mesh geometry={nodes.id_Punta001.geometry} material={materials.Default} position={[0, -1, -1.3]} rotation={[0, 0, 0]} scale={20} />

          <shaderMaterial
            key={uuidv4()}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
          />
        </mesh>
      </>
    );
  };
  
  
  
  

function Gucci (props) {
    const { nodes, materials } = useGLTF('/right.glb')
    return (
      <group {...props} dispose={null}>
        <mesh geometry={nodes.id_Punta001.geometry} material={materials.Default} position={[0, -1, 0]} rotation={[0, 0, 0]} scale={20} />
      </group>
    )
  }

export default function lights(props) {

  return (
    <>
    <Leva collapsed />
    <Canvas style={{backgroundColor: "white", height: "100vh", width: "100vw"}}
      // Quick shortcut for setting up shadow maps
      shadows
      // Only render on changes and movement
      frameloop="demand"
      camera={{ position: [0, 5, 50], fov: 10, near: 1, far: 1500 }} dpr={[1, 2]}>
       <Suspense fallback={null}>
       <ambientLight/>
       {/* <gridHelper args={[10, 10, `white`, `gray`]} /> */}
       <OrbitControls />
       <Geometries />
       
       <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#ffffff"
              metalness={0.5}
            />
      </Suspense>
   
    </Canvas>
</>
  )
}

