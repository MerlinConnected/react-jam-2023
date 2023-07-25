import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  Sky,
  OrbitControls,
  useGLTF,
  OrthographicCamera,
  PointerLockControls,
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Obstacle from "./Obstacle";
import { Perf } from "r3f-perf";
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";
import React from "react";

import Car from "./Car";

import Lights from "./Lights";

export default function App() {
  const { nodes } = useGLTF("/track.gltf");

  return (
    <KeyboardControls
      map={[
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      ]}
    >
      <Canvas shadows gl={{ antialias: true }}>
        <Perf />
        <Physics>
          <RigidBody type="fixed">
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Segment.geometry}
              scale={[10, 10, 10]}
              position={[0, 0, 0]}
            />
          </RigidBody>
          <RigidBody type="fixed">
            <mesh position={[0, -0.1, 0]} receiveShadow>
              <boxGeometry args={[200, 0.2, 200]} />
              <meshPhysicalMaterial color="darkblue" />
            </mesh>
          </RigidBody>
          <Car />
        </Physics>

        <Sky />
        <EffectComposer disableNormalPass multisampling={8}>
          <N8AO
            aoRadius={50}
            distanceFalloff={0.2}
            intensity={8}
            screenSpaceRadius
            halfRes
          />
          <TiltShift2 />
        </EffectComposer>
      </Canvas>
    </KeyboardControls>
  );
}
