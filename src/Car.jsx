import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export default function Car(props) {
  const body = useRef();
  const { nodes, materials } = useGLTF("/suzanne.gltf");
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const cameraPosition = new THREE.Vector3();
  const cameraTarget = new THREE.Vector3();
  // const pointLight = useRef();

  useFrame((state, delta) => {
    const { leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const impulseStrength = 1 * delta;

    // impulse.z -= impulseStrength;
    if (impulse.z < 1) {
      impulse.z -= impulseStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength * 2;
    }
    if (rightward) {
      impulse.x += impulseStrength * 2;
    }
    // console.log(delta);
    // body.current.applyImpulse({ x: 0, y: 0, z: 0 });
    body.current.applyImpulse(impulse);
    // body.current.translation().z -= impulseStrength;

    const bodyPosition = body.current.translation();
    //CAMERA
    // const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 2;
    // const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.5;
    console.log();
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);

    // pointLight follow along
    // pointLight.current.position.z = body.current.position.z + 1;
    // pointLight.current.position.x = body.current.position.x;
    // pointLight.current.position.y -= slowSine / 80;
  });
  return (
    <group {...props} dispose={null}>
      <RigidBody ref={body}>
        {" "}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Suzanne.geometry}
          material={nodes.Suzanne.material}
          position={[0, 1, 0]}
          scale={[0.25, 0.25, 0.25]}
        />
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
    </group>
  );
}

useGLTF.preload("/suzanne.gltf");
