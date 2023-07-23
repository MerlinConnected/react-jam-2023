import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Car from "./Car";

export default function App() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="darkblue" />
      </mesh>
      <Car />
      <OrbitControls />
    </Canvas>
  );
}
