import { useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import { useQueries } from 'react-query'

import { useBackgroundPosition } from '../hooks/useBackgroundPosition'
import backgrounds from '../lib/pokemon/cardBackgrounds'

import {
	fetchPokemonData,
	fetchPokemonLikes,
	addLike,
} from '../lib/pokemon/pokemonLikes'
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

PokemonCard.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
}

export default function PokemonCard(props) {
	const { colorMode } = useColorMode() // chakra color mode

	const [backgroundIndex] = useState(
		Math.round(Math.random() * Math.floor(backgrounds.length - 1))
	)
	const backgroundPositionX = useBackgroundPosition()

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
			maxWidth={180}
			minWidth={120}
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
						onClick={() => addLike(props.id, pokemonLikes.refetch)}
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
