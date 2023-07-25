export default function Lights() {
	return (
		<>
			<hemisphereLight intensity={0.5} color='white' groundColor='#f88' />
			<directionalLight
				color='white'
				intensity={2}
				angle={0.3}
				penumbra={1}
				position={(20, 20, 30)}
				castShadow
				shadow-mapSize={1024}
			/>
		</>
	)
}
