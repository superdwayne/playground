import { Suspense, useMemo, useRef, useEffect  } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Leva, folder, useControls } from "leva";
import { useGLTF,OrbitControls, useFBO, useAnimations  } from '@react-three/drei'
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";


import vertexShader from '../../shaders/vertex';
import fragmentShader from '../../shaders/fragment';


const Geometries = () => {
    // This reference gives us direct access to our mesh
    const mesh = useRef();
    const backgroundGroup = useRef();
    const group = useRef()
  const { nodes, materials, animations } = useGLTF('/birthday-dance.gltf')
  const { actions } = useAnimations(animations, group)
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
        iorB: { min: 1.0, max: 3.333, step: 0.001, value: 2.33 },
        iorP: { min: 1.0, max: 3.333, step: 0.001, value: 2.33 },
      }),
      saturation: { value: 1.14, min: 1, max: 1.25, step: 0.01 },
      chromaticAberration: {
        value: 0.10,
        min: 0,
        max: 1.5,
        step: 0.01,
      },
      refraction: {
        value: 1,
        min: 0,
        max: 2,
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

    useEffect(() => {

        actions.dance.play()
      
         });
    
  
    return (
      <>
        <color attach="background" args={["black"]} />
     
        <mesh ref={mesh}>
        <planeBufferGeometry  args={[25, 15, 32, 100]} position={[10, 0 , -10]} />
        {/* <MeshTransmissionMaterial color="hotpink"  /> */}

        <group ref={group}  dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[-0.02, -1, 0.24]}>
          <group name="Hips_1" position={[0, 1.02, 0.01]} rotation={[0.03, 0, 0]}>
            <group name="Spine_1" position={[0, 0.1, 0]} rotation={[-0.14, 0, 0]}>
              <group name="Spine1_1" position={[0, 0.13, 0]} rotation={[-0.06, 0, 0]}>
                <group name="Spine2_1" position={[0, 0.12, 0]} rotation={[0.09, 0, 0]}>
                  <group name="Neck_1" position={[0, 0.16, 0]} rotation={[0.41, 0, 0]}>
                    <group name="Head_1" position={[0, 0.12, 0]} rotation={[-0.33, 0, 0]}>
                      <group name="HeadTop_End_1" position={[0, 0.23, 0.04]} rotation={[-0.01, 0, 0]} />
                      <group name="LeftEye_1" position={[0.03, 0.09, 0.08]} rotation={[-0.01, 0, 0]} />
                      <group name="RightEye_1" position={[-0.03, 0.09, 0.08]} rotation={[-0.01, 0, 0]} />
                    </group>
                  </group>
                  <group name="LeftShoulder_1" position={[0.05, 0.14, -0.01]} rotation={[1.56, -0.04, -1.58]}>
                    <group name="LeftArm_1" position={[0, 0.12, 0]} rotation={[1, 0.02, -0.14]}>
                      <group name="LeftForeArm_1" position={[0, 0.29, 0]} rotation={[-0.11, 0.02, 0.45]}>
                        <group name="LeftHand_1" position={[0, 0.25, 0]} rotation={[0.09, 0.08, -0.04]}>
                          <group name="LeftHandThumb1_1" position={[-0.03, 0.03, 0.01]} rotation={[0.32, 0.12, 0.85]}>
                            <group name="LeftHandThumb2_1" position={[0, 0.04, 0]} rotation={[0.06, -0.17, -0.5]}>
                              <group name="LeftHandThumb3_1" position={[0, 0.03, 0]} rotation={[0.02, -0.05, -0.17]}>
                                <group name="LeftHandThumb4_1" position={[0, 0.04, 0]} rotation={[0.03, 0.1, -0.02]} />
                              </group>
                            </group>
                          </group>
                          <group name="LeftHandIndex1_1" position={[-0.04, 0.1, -0.01]} rotation={[0.19, -0.09, 0.15]}>
                            <group name="LeftHandIndex2_1" position={[0, 0.04, 0]} rotation={[0.19, -0.01, 0.05]}>
                              <group name="LeftHandIndex3_1" position={[0, 0.03, 0]} rotation={[0.17, -0.15, -0.03]}>
                                <group name="LeftHandIndex4_1" position={[0, 0.03, 0]} rotation={[0.09, 0.11, -0.02]} />
                              </group>
                            </group>
                          </group>
                          <group name="LeftHandMiddle1_1" position={[-0.01, 0.1, 0]} rotation={[0.08, -0.13, 0.04]}>
                            <group name="LeftHandMiddle2_1" position={[0, 0.05, 0]} rotation={[0.26, -0.01, 0.09]}>
                              <group name="LeftHandMiddle3_1" position={[0, 0.04, 0]} rotation={[0.4, -0.06, -0.08]}>
                                <group name="LeftHandMiddle4_1" position={[0, 0.03, 0]} rotation={[0.05, 0.04, 0]} />
                              </group>
                            </group>
                          </group>
                          <group name="LeftHandRing1_1" position={[0.02, 0.1, 0]} rotation={[0.12, -0.12, -0.11]}>
                            <group name="LeftHandRing2_1" position={[0, 0.04, 0]} rotation={[0.38, -0.01, 0.1]}>
                              <group name="LeftHandRing3_1" position={[0, 0.04, 0]} rotation={[0.08, -0.01, 0]}>
                                <group name="LeftHandRing4_1" position={[0, 0.03, 0]} rotation={[0.01, -0.01, 0.04]} />
                              </group>
                            </group>
                          </group>
                          <group name="LeftHandPinky1_1" position={[0.04, 0.09, 0.01]} rotation={[0.18, -0.17, -0.3]}>
                            <group name="LeftHandPinky2_1" position={[0, 0.03, 0]} rotation={[0.29, -0.4, 0.18]}>
                              <group name="LeftHandPinky3_1" position={[0, 0.02, 0]} rotation={[0.25, -0.02, 0.03]}>
                                <group name="LeftHandPinky4_1" position={[0, 0.03, 0]} rotation={[0.28, 0.2, -0.05]} />
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group name="RightShoulder_1" position={[-0.05, 0.14, -0.01]} rotation={[1.56, 0.04, 1.58]}>
                    <group name="RightArm_1" position={[0, 0.12, 0]} rotation={[1, -0.02, 0.14]}>
                      <group name="RightForeArm_1" position={[0, 0.29, 0]} rotation={[-0.11, -0.02, -0.45]}>
                        <group name="RightHand_1" position={[0, 0.25, 0]} rotation={[0.09, -0.08, 0.04]}>
                          <group name="RightHandThumb1_1" position={[0.03, 0.03, 0.01]} rotation={[0.32, -0.12, -0.85]}>
                            <group name="RightHandThumb2_1" position={[0, 0.04, 0]} rotation={[0.06, 0.17, 0.5]}>
                              <group name="RightHandThumb3_1" position={[0, 0.03, 0]} rotation={[0.02, 0.05, 0.17]}>
                                <group name="RightHandThumb4_1" position={[0, 0.04, 0]} rotation={[0.03, -0.1, 0.02]} />
                              </group>
                            </group>
                          </group>
                          <group name="RightHandIndex1_1" position={[0.04, 0.1, -0.01]} rotation={[0.19, 0.09, -0.15]}>
                            <group name="RightHandIndex2_1" position={[0, 0.04, 0]} rotation={[0.19, 0.01, -0.05]}>
                              <group name="RightHandIndex3_1" position={[0, 0.03, 0]} rotation={[0.17, 0.15, 0.03]}>
                                <group name="RightHandIndex4_1" position={[0, 0.03, 0]} rotation={[0.09, -0.11, 0.02]} />
                              </group>
                            </group>
                          </group>
                          <group name="RightHandMiddle1_1" position={[0.01, 0.1, 0]} rotation={[0.08, 0.13, -0.04]}>
                            <group name="RightHandMiddle2_1" position={[0, 0.05, 0]} rotation={[0.26, 0.01, -0.09]}>
                              <group name="RightHandMiddle3_1" position={[0, 0.04, 0]} rotation={[0.4, 0.06, 0.08]}>
                                <group name="RightHandMiddle4_1" position={[0, 0.03, 0]} rotation={[0.05, -0.04, 0]} />
                              </group>
                            </group>
                          </group>
                          <group name="RightHandRing1_1" position={[-0.02, 0.1, 0]} rotation={[0.12, 0.12, 0.11]}>
                            <group name="RightHandRing2_1" position={[0, 0.04, 0]} rotation={[0.38, 0.01, -0.1]}>
                              <group name="RightHandRing3_1" position={[0, 0.04, 0]} rotation={[0.08, 0.01, 0]}>
                                <group name="RightHandRing4_1" position={[0, 0.03, 0]} rotation={[0.01, 0.01, -0.04]} />
                              </group>
                            </group>
                          </group>
                          <group name="RightHandPinky1_1" position={[-0.04, 0.09, 0.01]} rotation={[0.18, 0.17, 0.3]}>
                            <group name="RightHandPinky2_1" position={[0, 0.03, 0]} rotation={[0.29, 0.4, -0.18]}>
                              <group name="RightHandPinky3_1" position={[0, 0.02, 0]} rotation={[0.25, 0.02, -0.03]}>
                                <group name="RightHandPinky4_1" position={[0, 0.03, 0]} rotation={[0.28, -0.2, 0.05]} />
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
            <group name="LeftUpLeg_1" position={[0.1, 0.01, 0]} rotation={[-0.02, 0, -3.08]}>
              <group name="LeftLeg_1" position={[0, 0.46, 0]} rotation={[-0.08, 0, -0.01]}>
                <group name="LeftFoot_1" position={[0, 0.44, 0]} rotation={[1.06, 0.03, -0.01]}>
                  <group name="LeftToeBase_1" position={[0, 0.15, 0]} rotation={[0.55, -0.07, 0.06]}>
                    <group name="LeftToe_End_1" position={[0, 0.1, 0]} rotation={[-0.55, 1.54, 0.58]} />
                  </group>
                </group>
              </group>
            </group>
            <group name="RightUpLeg_1" position={[-0.1, 0.01, 0]} rotation={[-0.02, 0, 3.08]}>
              <group name="RightLeg_1" position={[0, 0.46, 0]} rotation={[-0.08, 0, 0.01]}>
                <group name="RightFoot_1" position={[0, 0.44, 0]} rotation={[1.06, -0.03, 0.01]}>
                  <group name="RightToeBase_1" position={[0, 0.15, 0]} rotation={[0.55, 0.07, -0.06]}>
                    <group name="RightToe_End_1" position={[0, 0.1, 0]} rotation={[-0.55, -1.54, -0.58]} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
        <group name="Armature001" position={[-0.02, -1, 0.24]}>
          <primitive object={nodes.Hips} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Body001" geometry={nodes.Wolf3D_Body001.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body001.skeleton} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Hair001" geometry={nodes.Wolf3D_Hair001.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair001.skeleton} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Outfit_Bottom001" geometry={nodes.Wolf3D_Outfit_Bottom001.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials['Material.003']} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
          <skinnedMesh frustumCulled={false} name="EyeLeft001" geometry={nodes.EyeLeft001.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft001.skeleton} morphTargetDictionary={nodes.EyeLeft001.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft001.morphTargetInfluences} />
          <skinnedMesh frustumCulled={false} name="EyeRight001" geometry={nodes.EyeRight001.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight001.skeleton} morphTargetDictionary={nodes.EyeRight001.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight001.morphTargetInfluences} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Beard001" geometry={nodes.Wolf3D_Beard001.geometry} material={materials.Wolf3D_Beard} skeleton={nodes.Wolf3D_Beard001.skeleton} morphTargetDictionary={nodes.Wolf3D_Beard001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Beard001.morphTargetInfluences} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Head001" geometry={nodes.Wolf3D_Head001.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head001.skeleton} morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences} />
          <skinnedMesh frustumCulled={false} name="Wolf3D_Teeth001" geometry={nodes.Wolf3D_Teeth001.geometry} material={materials['Wolf3D_Teeth.001']} skeleton={nodes.Wolf3D_Teeth001.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences} />
        </group>
      </group>
    </group>
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
  
  
  
  



export default function lights(props) {

  return (
    <>
    <Leva collapsed />
    <Canvas style={{backgroundColor: "white", height: "100vh", width: "100vw"}}
      // Quick shortcut for setting up shadow maps
      shadows
      // Only render on changes and movement
      frameloop="demand"
      camera={{ position: [10, 0, 100], fov: 1.5, near: 1, far: 1500 }} dpr={[1, 2]}>
       <Suspense fallback={null}>
       <ambientLight/>
       {/* <gridHelper args={[10, 10, `white`, `gray`]} /> */}
       <OrbitControls />
       
       <Geometries  />
       
       
      </Suspense>
   
    </Canvas>
</>
  )
}

