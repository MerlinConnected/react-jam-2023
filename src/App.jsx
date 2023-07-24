import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Car from "./Car";
import { Perf } from "r3f-perf";

export default function App() {
  return (
    <KeyboardControls
      map={[
        // { name: "forward", keys: ["ArrowUp", "KeyW"] },
        // { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        // { name: "jump", keys: ["Space"] },
      ]}
    >
      {" "}
      <Canvas shadows>
        <Perf />
        <ambientLight intensity={0.5} />
        <Physics>
          {" "}
          <RigidBody type="fixed">
            <mesh position={[0, -0.1, 0]} receiveShadow>
              <boxGeometry args={[200, 0.2, 200]} />
              <meshPhysicalMaterial color="darkblue" wireframe />
            </mesh>
          </RigidBody>
          <Car castShadow></Car>
        </Physics>
        {/* <OrbitControls /> */}
      </Canvas>
    </KeyboardControls>
  );
}
