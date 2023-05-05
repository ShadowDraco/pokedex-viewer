import PropTypes from 'prop-types'

import PokemonCard from './PokemonCard'

import { Grid, GridItem } from '@chakra-ui/react'

Pokedex.propTypes = {
  pokedexColumns: PropTypes.number.isRequired,
}

export default function Pokedex(props) {
  return (
    <Grid
      templateColumns={`repeat(${props.pokedexColumns}, 1fr)`}
      gap={3}
      width={'full'}
      height={600}
      overflowY={'auto'}
      overflowX={'hidden'}
      className='pokedexGrid'
      paddingRight={3}
    >
      {[...Array(9)].map((pokemon, index) => (
        <GridItem key={index}>
          <PokemonCard name={`${index + 1}`} id={index} key={index} />
        </GridItem>
      ))}
    </Grid>
  )
}
