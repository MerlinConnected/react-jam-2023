import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export default function Car(props) {
  const body = useRef();
  const mesh = useRef();
  const { nodes, materials } = useGLTF("/suzanne.gltf");
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const cameraPosition = new THREE.Vector3();
  const cameraTarget = new THREE.Vector3();
  const forwardVector = new THREE.Vector3();
  // const pointLight = useRef();
  var angle = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const direction = new THREE.Vector3();

  //UPDATE
  useFrame((state, delta) => {
    const { leftward, rightward } = getKeys();
    const impulseStrength = 1 * delta;

    if (leftward) {
      mesh.current.rotation.y += 1 * delta;
    }
    if (rightward) {
      mesh.current.rotation.y -= 1 * delta;
    }
    // let euler = new THREE.Euler();
    // euler.setFromVector3(point.clone().cross(tempVector).normalize());
    // angle = mesh.current.rotation.setFromEuler;
    // angle.copy(mesh.current.rotation.setFromEuler);
    // mesh.current.position += angle;
    frontVector.set(0, 0, 1);
    sideVector.set(Number(leftward) - Number(rightward), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .applyEuler(mesh.current.rotation);

    angle.applyEuler(mesh.current.rotation);
    console.log(direction);
    console.log(mesh.current.rotation);
    mesh.current.position.x -= direction.x * delta * 10;
    mesh.current.position.z -= direction.z * delta * 10;
    // var x = 0.1 * Math.cos((angle.y * Math.PI) / 180);
    // var y = 0.1 * Math.sin((angle.y * Math.PI) / 180);
    // mesh.current.position.z -= impulseStrength;
    // mesh.current.applyImpulse(angle);
    // mesh.current.rotation;
    // forwardVector.applyAxisAngle(mesh.current.rotation.y);
    console.log(mesh);

    //CAMERA
    cameraPosition.copy(mesh.current.position);
    cameraPosition.z += 2.25;
    cameraPosition.y += 2;
    cameraTarget.copy(mesh.current.position);
    cameraTarget.y += 0.5;
    state.camera.position.copy(cameraPosition, 0);
    state.camera.lookAt(cameraTarget);

    // pointLight follow along
    // pointLight.current.position.z = body.current.position.z + 1;
    // pointLight.current.position.x = body.current.position.x;
    // pointLight.current.position.y -= slowSine / 80;
  });

  return (
    <group {...props} dispose={null}>
      <RigidBody
        ref={body}
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh
          ref={mesh}
          castShadow
          receiveShadow
          geometry={nodes.Suzanne.geometry}
          material={nodes.Suzanne.material}
          position={[0, 1, 0]}
          scale={[0.25, 0.25, 0.25]}
        />
        {/* <mesh
          ref={mesh}
          castShadow
          receiveShadow
          position={[0, 1, 0]}
          scale={[0.25, 0.25, 0.25]}
        >
          { <sphereGeometry /> }

          <meshBasicMaterial color={"hotpink"} wireframe />
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
    </group>
  );
}

useGLTF.preload("/suzanne.gltf");
