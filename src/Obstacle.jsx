import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Obstacle({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh receiveShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="limegreen" />
      </mesh>
    </group>
  );
}
