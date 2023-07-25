import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  OrbitControls,
  OrthographicCamera,
  PointerLockControls,
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Car from "./Car";
import Obstacle from "./Obstacle";

import { Perf } from "r3f-perf";
import { useGLTF } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Sky, useGLTF } from '@react-three/drei'
import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { Physics, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import React, { useRef } from "react";

import Car from './Car'

import Lights from './Lights'

export default function App() {
	const { nodes } = useGLTF("/track.gltf");
	
	return (
		<KeyboardControls
			map={[
				{ name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
				{ name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
			]}
		>
			<Canvas shadows gl={{ antialias: true }}>
				<Perf />
				<Physics>
					<RigidBody type="fixed">
            			<mesh
              				receiveShadow
              				geometry={nodes.Segment.geometry}
              				scale={[10, 10, 10]}
           					position={[0, 0, 0]}
            			/>
          			</RigidBody>
					<RigidBody type='fixed'>
						<mesh position={[0, -0.1, 0]} receiveShadow>
							<boxGeometry args={[200, 0.2, 200]} />
							<meshPhysicalMaterial color='darkblue' />
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
	)
}
