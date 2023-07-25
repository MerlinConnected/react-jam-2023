import * as THREE from "three";
import React, { useRef } from "react";
import {
  OrthographicCamera,
  PerspectiveCamera,
  PointerLockControls,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

const MyCamera = (props) => {
  return (
    <PerspectiveCamera
      fov={75}
      rotation={[0, 0, 0]}
      makeDefault={true}
      position={[0, 6, 10]}
    >
      {/* <PointerLockControls
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
      /> */}
    </PerspectiveCamera>
  );
};

const CarObject = ({ children }) => {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("/suzanne.gltf");
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const cameraPosition = new THREE.Vector3();
  const cameraTarget = new THREE.Vector3();
  const speed = 20;
  // const pointLight = useRef();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const direction = new THREE.Vector3();
  //UPDATE
  useFrame((state, delta) => {
    const { leftward, rightward } = getKeys();
    console.log(mesh);

    if (leftward) {
      mesh.current.rotation.y += 1 * delta;
    }
    if (rightward) {
      mesh.current.rotation.y -= 1 * delta;
    }
    frontVector.set(0, 0, 1);
    sideVector.set(Number(leftward) - Number(rightward), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .applyEuler(mesh.current.rotation);

    mesh.current.position.x -= direction.x * delta * speed;
    mesh.current.position.z -= direction.z * delta * speed;

  });
  return (
    // <RigidBody
    //   ref={body}
    //   restitution={0.2}
    //   friction={1}
    //   linearDamping={0.5}
    //   angularDamping={0.5}
    // >
    <group dispose={null}>
      <mesh
        ref={mesh}
        castShadow
        receiveShadow
        // geometry={nodes.Suzanne.geometry}
        // material={nodes.Suzanne.material}
        position={[0, 1, 0]}
        scale={[0.25, 0.25, 0.25]}
      >
        {children}
        <boxGeometry />
        <meshBasicMaterial color={"hotpink"} />
      </mesh>
    </group>
    /* <mesh
          ref={mesh}
          castShadow
          receiveShadow
          position={[0, 1, 0]}
          scale={[0.25, 0.25, 0.25]}
        >
          { <sphereGeometry /> }

          <meshBasicMaterial color={"hotpink"} wireframe />
        </mesh> */
    // <directionalLight
    //   castShadow
    //   position={[4, 4, 1]}
    //   intensity={1.5}
    //   shadow-mapSize={[1024, 1024]}
    //   shadow-camera-near={1}
    //   shadow-camera-far={10}
    //   shadow-camera-top={10}
    //   shadow-camera-right={10}
    //   shadow-camera-bottom={-10}
    //   shadow-camera-left={-10}
    // />
    // </RigidBody>
  );
};

export default function Car() {
  // const body = useRef();
  useFrame((state, delta) => {
    console.log(state.camera);
  });
  return (
    <CarObject>
      <MyCamera />
    </CarObject>
        </mesh> */}
        <directionalLight
          castShadow
          position={[4, 4, 1]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-top={10}
          shadow-camera-right={10}
          shadow-camera-bottom={-10}
          shadow-camera-left={-10}
        />
      </RigidBody>
      <Lights />
    </group>
  );
}
