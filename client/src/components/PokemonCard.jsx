import React from 'react'

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	chakra,
	Text,
	Flex,
	Image,
} from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function PokemonCard(props) {
	const fetchDittoData = () => {
		const data = axios
			.get(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
			.then(res => res.data)

		return data
	}

	const { isLoading, error, data } = useQuery('dittoData', fetchDittoData)

	if (isLoading) return 'Loading...'

	if (error) return 'An error has occurred:' + error.message
	return (
		<Card maxWidth={'250'}>
			<CardHeader>
				{' '}
				<Text
					bgClip={'text'}
					bgGradient='linear(to-r, red.500, blue.400)'
					color='transparent'
					fontSize={'xl'}
				>
					Name: {data.name}
				</Text>
			</CardHeader>
			<CardBody>
				<Image
					src={data.sprites.front_default}
					width={'full'}
					height={'half'}
					objectFit={'cover'}
				></Image>
			</CardBody>
			<CardFooter>
				<Flex gap={5}>
					<chakra.h4
						bgClip={'text'}
						bgGradient='linear(to-r, blue.600, white)'
						color='transparent'
					>
						No. {data.order}{' '}
					</chakra.h4>
					<chakra.h6
						bgClip={'text'}
						bgGradient='linear(to-r, blue.200, white)'
						color='transparent'
					>
						weight: {data.weight}
					</chakra.h6>
				</Flex>
			</CardFooter>
		</Card>
	)
}
