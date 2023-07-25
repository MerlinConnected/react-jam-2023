import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import Lights from './Lights'

export default function Car(props) {
	const body = useRef()
	const mesh = useRef()
	const ref = useRef()
	const [subscribeKeys, getKeys] = useKeyboardControls()
	const cameraPosition = new THREE.Vector3()
	const cameraTarget = new THREE.Vector3()
	const lightPosition = new THREE.Vector3()

	useFrame((state, delta) => {
		const { leftward, rightward } = getKeys()
		const impulseStrength = 10 * delta

		if (leftward) {
			mesh.current.position.x -= impulseStrength * 2
		}
		if (rightward) {
			mesh.current.position.x += impulseStrength * 2
		}
		// mesh.current.position.z -= impulseStrength

		//CAMERA
		cameraPosition.copy(mesh.current.position)
		cameraPosition.z += 2.25
		cameraPosition.y += 2
		cameraTarget.copy(mesh.current.position)
		cameraTarget.y += 0.5
		state.camera.position.copy(cameraPosition)
		state.camera.lookAt(cameraTarget)

		//LIGHT
		lightPosition.copy(mesh.current.position)
		console.log(lightPosition)
	})
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
					position={[0, 1, 0]}
					scale={[0.25, 0.25, 0.25]}
				>
					<sphereGeometry castShadow receiveShadow />
					<meshPhysicalMaterial color={'hotpink'} />
				</mesh>
				{/* <directionalLight
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
				/> */}
			</RigidBody>
			<Lights ref={ref} />
		</group>
	)
}
