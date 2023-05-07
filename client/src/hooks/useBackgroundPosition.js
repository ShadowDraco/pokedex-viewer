import { useEffect, useState } from 'react'

export const useBackgroundPosition = () => {
	const [backgroundPositionX, setBackgroundPositionX] = useState(60)

	useEffect(() => {
		const updateBackgroundPosition = e => {
			setBackgroundPositionX(
				e.clientX / (window.innerWidth / 5) + window.innerWidth / 2
			)
		}

		window.addEventListener('mousemove', updateBackgroundPosition)

		return () => {
			window.removeEventListener('mousemove', updateBackgroundPosition)
		}
	}, [])

	return backgroundPositionX
}
