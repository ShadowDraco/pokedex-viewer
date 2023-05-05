import axios from 'axios'

export const fetchPokemonLikes = async id => {
	const data = axios
		.get(`http://localhost:3000/pokemon/likes/${id}`)
		.then(res => res.data.likes)
	return data
}
