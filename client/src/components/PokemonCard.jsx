import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import { useQueries } from 'react-query'

import backgrounds from '../lib/pokemon/cardBackgrounds'
import { fetchPokemonData } from '../lib/pokemon/fetchPokemonData'
import { fetchPokemonLikes } from '../lib/pokemon/fetchPokemonLikes'
import uppercaseFirstLetter from '../lib/utils/uppercaseFirstLetter'

import { AiOutlineHeart } from 'react-icons/ai'
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	chakra,
	Text,
	Flex,
	Image,
	useColorMode,
} from '@chakra-ui/react'
import axios from 'axios'

PokemonCard.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
}

export default function PokemonCard(props) {
	const { colorMode } = useColorMode()
	const [backgroundIndex] = useState(
		Math.round(Math.random() * Math.floor(backgrounds.length - 1))
	)

	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	})
	const [backgroundPositionX, setBackgroundPositionX] = useState(50)

	const addLike = async () => {
		await axios
			.put(`http://localhost:3000/pokemon/like/${props.id + 1}`)
			.then(res => {
				pokemonLikes.refetch()
			})
	}

	useEffect(() => {
		const updateMousePosition = e => {
			setMousePosition({
				x: e.clientX,
				y: e.clientY,
			})

			setBackgroundPositionX(
				e.clientX / (window.innerWidth / 5) + window.innerWidth / 2
			)
		}

		window.addEventListener('mousemove', updateMousePosition)

		return () => {
			window.removeEventListener('mousemove', updateMousePosition)
		}
	}, [])

	const [pokemonData, pokemonLikes] = useQueries([
		{
			queryKey: [`${props.name} pokemonData ${props.id}`],
			queryFn: () => {
				return fetchPokemonData(props.name)
			},
		},

		{
			queryKey: [`${props.name} pokemonLikes ${props.id}`],
			queryFn: () => {
				return fetchPokemonLikes(props.id + 1)
			},
		},
	])

	if (pokemonData.isLoading) return 'Loading...'

	if (pokemonData.error)
		return 'An error has occurred:' + pokemonData.error.message
	return (
		<Card
			as={motion.div}
			maxWidth={200}
			minWidth={150}
			maxHeight={320}
			backgroundImage={backgrounds[backgroundIndex]}
			backgroundPosition={`${backgroundPositionX}% 50%`}
		>
			<CardHeader
				padding={0}
				background={backgroundIndex == 1 ? 'blackAlpha.500' : 'whiteAlpha.600'}
			>
				<Text
					bgClip={'text'}
					bgGradient='linear(to-r, red.400, blue.500)'
					color='whiteAlpha.200'
					fontSize={'xl'}
					fontWeight={'bold'}
				>
					Name: <br></br>
					{uppercaseFirstLetter(pokemonData.data.name)}
				</Text>
			</CardHeader>
			<CardBody width={'full'} height={'50%'} paddingBottom={0}>
				<chakra.div
					style={{ touchAction: 'none' }}
					as={motion.div}
					drag
					dragElastic={0.1}
					dragConstraints={{
						top: -10,
						left: -10,
						right: 10,
						bottom: 10,
					}}
					width={'100%'}
				>
					<Image
						background={'blackAlpha.400'}
						borderRadius={50}
						pointerEvents='none'
						src={pokemonData.data.sprites.front_default}
						objectFit='cover'
						width={'full'}
					></Image>
				</chakra.div>
			</CardBody>
			<CardFooter>
				<Flex gap={3} background={'blackAlpha.600'}>
					<chakra.h4
						bgClip={colorMode == 'dark' ? 'text' : 'none'}
						bgGradient={
							colorMode == 'dark' ? 'linear(to-r, blue.400, white)' : 'none'
						}
						color={colorMode == 'dark' ? 'transparent' : 'blue.300'}
					>
						No. {pokemonData.data.order}{' '}
					</chakra.h4>
					<chakra.h6
						bgClip={colorMode == 'dark' ? 'text' : 'none'}
						bgGradient={
							colorMode == 'dark' ? 'linear(to-r, blue.400, white)' : 'none'
						}
						color={colorMode == 'dark' ? 'transparent' : 'blue.300'}
					>
						weight: {pokemonData.data.weight}
					</chakra.h6>

					<Flex
						justifyItems={'center'}
						alignItems={'center'}
						as={motion.div}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.8 }}
						direction={'column'}
						maxWidth={30}
						onClick={addLike}
					>
						<AiOutlineHeart size={30} color='red' />
						<Text color='white'>
							{pokemonLikes.isLoading ? '...' : pokemonLikes.data}
						</Text>
					</Flex>
				</Flex>
			</CardFooter>
		</Card>
	)
}
