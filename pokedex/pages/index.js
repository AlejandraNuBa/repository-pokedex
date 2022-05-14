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


function Home() {	
	const [pokemones, setPokemones] = useState([])
	const [pokemon, setPokemon] = useState({})
	const [indice, setIndice] = useState(0)

	console.log('pokemon', pokemon)

	useEffect(() => {
		if (pokemones.length === 0) {
			getAllPromise()
		}
	}, [pokemones])

	const showPokemon = (pokemon, i) => {
      setIndice(i)
      console.log( 'indice', i )
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
    console.log('indice', indice)
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
    <div className="container">
      <Grid className="d-md-flex" id="tableLeadsId">
        <Grid>
          <TableContainer className="table-pokemones">
            <Table>
            <TableHead>
              <TableRow >
                <TableCell className="title-table">#</TableCell>
                <TableCell className="title-table">Name</TableCell>
                <TableCell className="title-table">Weight</TableCell>
                <TableCell className="title-table">Width</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {pokemones.map((poke, i) => (
                  <TableRow key={i} onClick={() => showPokemon(poke, i) } >
                    <TableCell className="cursor-pointer select-celda">{i}</TableCell>
                    <TableCell className="cursor-pointer select-celda">{poke.name}</TableCell>
                    {indice === i ? (
                        <TableCell>{pokemon?.weight} kg</TableCell>
                      ) : ( 
                        <TableCell>{}</TableCell>
                      )               
                    }
                     {indice === i ? (
                        <TableCell>{pokemon?.height} m</TableCell>
                      ) : (
                        <TableCell>{}</TableCell>
                      )             
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid id="details-pokemon" className="card-pokemon">
          {indice > 0 ? (
            <Grid className="card-image">
              <img
                src={pokemon?.sprites?.back_default}
                alt="pokemon"
                className="pokemon-img"
              />
              <Typography className="name-card" >
                {''} {' '}
                {pokemon.name}
              </Typography>
              <Typography className="title-card">
                {'Experiencia: '} {' '}
              </Typography>
              <Typography className="data-card">
                {pokemon.base_experience}
              </Typography>
              <Typography className="title-card">
                  {'Habilidades:  '} {' '}
                {pokemon?.abilities?.map(item => (
                  <Typography className="data-card">
                    {item?.ability?.name}
                  </Typography>
              ))}
                  </Typography>
            </Grid>
          ) : <Grid className="no-pokemon">
                <h2 className="text-md-center">Select your Pokemon!</h2>
                <img
                src="https://media0.giphy.com/media/Gm7LdndVpiCs0/giphy.gif?cid=ecf05e47xu9cdhqc8jz37xsec497t3k7t8mtm0x3vjs64ouy&rid=giphy.gif&ct=g"
                alt="Pokebola"
                className="pokebola-img text-md-left"
                />
              </Grid> }
        </Grid>
      </Grid>
    </div>
  )
}
export default Home