import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	Grid,
} from "@material-ui/core";
import styles from '../styles/Home.module.css'


function Home() {	
	const [pokemones, setPokemones] = useState([])
	const [pokemon, setPokemon] = useState({})

	console.log('pokemon', pokemon)

	useEffect(() => {
		if (pokemones.length === 0) {
			getAllPromise()
		}
	}, [pokemones])

	const showPokemon = pokemon => {
			var config = {
			method: 'get',
			url: pokemon.url,
			headers: { }
		};

		axios(config)
		.then(function (response) {
			setPokemon(response.data)
		})
		.catch(function (error) {
			console.log(error);
		});

	}
	const getAllPromise = async() => {
		const response = await myFunction();
		setPokemones(response)
	}
const myFunction = () => {
    return new Promise((resolve, reject) => {
       var config = {
				method: 'get',
				url: 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0',
				headers: { }
			};

			axios(config)
			.then(function (response) {
				console.log('response.data', response.data.results)
				resolve(response.data.results)
			})
			.catch(function (error) {
				console.log(error);
				resolve ([])
			});
    });
}
  return (
    <Grid className={styles.container} id="tableLeadsId">
      <Grid className={styles.table} >
			<TableContainer>
				<Table >
					<TableHead>
						<TableRow >
							<TableCell>#</TableCell>
							<TableCell>pokemon</TableCell>
							<TableCell>nombre</TableCell>
							<TableCell>url</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{pokemones.map((pokemon, i) => (
							<TableRow key={i} onClick={() => showPokemon(pokemon) } >
								<TableCell>{i}</TableCell>
								<TableCell>{pokemon.name}</TableCell>
								<TableCell>{pokemon.name}</TableCell>
								<TableCell>{pokemon.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
        </TableContainer>
      </Grid>
			<Grid>
				{pokemon ? (
				<Grid>
					<img
						className={styles.container}
						src={pokemon?.sprites?.back_default}
						alt="pokemon"
					/>
				<Typography>
					{'el nombre del pokemon es: '} {' '}
					{pokemon.name}
				</Typography>
				<Typography>
					{'experiencia: '} {' '}
          {pokemon.base_experience}
        </Typography>
				<Typography>
						{'las habilidades son:  '} {' '}
					{pokemon?.abilities?.map(item => (
						<Typography>
							{item?.ability?.name}
          	</Typography>
        ))}
						</Typography>
			</Grid>
			) : null}
      </Grid>
		</Grid>
  )
}
export default Home