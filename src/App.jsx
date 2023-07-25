import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Car from "./Car";
import { Perf } from "r3f-perf";
import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export default function App() {
  const { nodes } = useGLTF("/track.gltf");

  return (
    <KeyboardControls
      map={[
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      ]}
    >
      <Canvas shadows>
        <Perf />
        <ambientLight intensity={0.5} />
        <Physics>
          <RigidBody type="fixed">
            <mesh
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
          <Car castShadow></Car>
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
