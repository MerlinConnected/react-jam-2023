import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Sky } from '@react-three/drei'
import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { Physics, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'

import Car from './Car'

import Lights from './Lights'

export default function App() {
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
					<RigidBody type='fixed'>
						<mesh position={[0, -0.1, 0]} receiveShadow>
							<boxGeometry args={[200, 0.2, 200]} />
							<meshPhysicalMaterial color='darkblue' />
						</mesh>
					</RigidBody>
					<Car />
				</Physics>

				{/* <Lights /> */}
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
