/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 dance.glb
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/dance.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[-0.02, 0.05, 0.14]}>
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
        <group name="Armature001" position={[-0.02, 0.05, 0.14]}>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body001" geometry={nodes.Wolf3D_Body001.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body001.skeleton} />
          <skinnedMesh name="Wolf3D_Hair001" geometry={nodes.Wolf3D_Hair001.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom001" geometry={nodes.Wolf3D_Outfit_Bottom001.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials['Material.003']} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
          <skinnedMesh name="EyeLeft001" geometry={nodes.EyeLeft001.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft001.skeleton} morphTargetDictionary={nodes.EyeLeft001.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft001.morphTargetInfluences} />
          <skinnedMesh name="EyeRight001" geometry={nodes.EyeRight001.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight001.skeleton} morphTargetDictionary={nodes.EyeRight001.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Beard001" geometry={nodes.Wolf3D_Beard001.geometry} material={materials.Wolf3D_Beard} skeleton={nodes.Wolf3D_Beard001.skeleton} morphTargetDictionary={nodes.Wolf3D_Beard001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Beard001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head001" geometry={nodes.Wolf3D_Head001.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head001.skeleton} morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth001" geometry={nodes.Wolf3D_Teeth001.geometry} material={materials['Wolf3D_Teeth.001']} skeleton={nodes.Wolf3D_Teeth001.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/dance.glb')
