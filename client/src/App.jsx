import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { Button, chakra, Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import PokemonCard from './components/PokemonCard'

function App() {
	const queryClient = new QueryClient()

	const [count, setCount] = useState(0)
	const [response, setResponse] = useState({})

	const getGot = async () => {
		axios.get('http://localhost:3000/get').then(response => {
			setResponse(response.data)
			console.log(response.data, count)
		})

		setCount(prev => {
			return prev + 1
		})
	}

	return (
		<>
			<chakra.h1 color={'blue.100'}>Wanna Get got?</chakra.h1>
			<div className='card'>
				<Button
					onClick={getGot}
					as={motion.button}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 2 }}
				>
					you got got {count} times
				</Button>
				<chakra.h3
					bgClip={'text'}
					bgGradient='linear(to-r, red.500, blue.600)'
					color='transparent'
					fontSize={25}
				>
					{response?.message}
				</chakra.h3>
			</div>

			<QueryClientProvider client={queryClient}>
				<PokemonCard name='charmander' />
			</QueryClientProvider>
		</>
	)
}

export default App
