import axios from 'axios'

export const addLike = async (id, refetch) => {
	return await axios
		.put(`http://localhost:3000/pokemon/like/${id + 1}`)
		.then(res => {
			refetch()
		})
}

export const fetchPokemonData = name => {
	const data = axios
		.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
		.then(res => res.data)

	return data
}

export const fetchPokemonLikes = async id => {
	const data = await axios
		.get(`http://localhost:3000/pokemon/likes/${id}`)
		.then(res => {
			return res.data.likes
		})

	return data
}
