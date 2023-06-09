import './App.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'

import { Button, Flex, useColorMode } from '@chakra-ui/react'
import Pokedex from './components/Pokedex'

function App() {
	const { colorMode, toggleColorMode } = useColorMode('dark')
	const queryClient = new QueryClient()

	const [pokedexColumns, setPokedexColumns] = useState(
		Math.floor(window.innerWidth / 200) > 6
			? 6
			: Math.floor(window.innerWidth / 200)
	)

	useEffect(() => {
		const handleWindowResize = () => {
			let columns = Math.floor(window.innerWidth / 200)
			columns > 6 ? (columns = 6) : ''
			console.log(columns)
			setPokedexColumns(columns)
		}

		window.addEventListener('resize', handleWindowResize)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	})

	return (
		<Flex
			width={'full'}
			className='App'
			padding={3}
			margin={0}
			wrap={'wrap'}
			overflowX={'hidden'}
			justifyContent={'center'}
			minWidth={400}
		>
			<Button onClick={toggleColorMode} margin={5}>
				Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
			</Button>

			<QueryClientProvider client={queryClient}>
				<Pokedex pokedexColumns={pokedexColumns} />
			</QueryClientProvider>
		</Flex>
	)
}

export default App
