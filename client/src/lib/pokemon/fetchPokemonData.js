import axios from 'axios'

export const fetchPokemonData = name => {
	const data = axios
		.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
		.then(res => res.data)
	return data
}
