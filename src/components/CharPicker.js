import React, { useState, useEffect } from 'react';

import './CharPicker.css';
import { useHttp } from '../hooks/http';

const CharPicker = (props) => {
  // state = { characters: [], isLoading: false };
  // const [characters, setCharacters] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

  const [isLoading, fetchedData] = useHttp('https://cors-anywhere.herokuapp.com/https://swapi.co/api/people', [])
  const selectedCharacters = fetchedData ? fetchedData.results.slice(0, 5).map((char, index) => ({
    name: char.name,
    id: index + 1
  }))
  : [];
  //   this.setState({ isLoading: true });
  //   fetch('https://swapi.co/api/people')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch.');
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       const selectedCharacters = charData.results.slice(0, 5);
  //       this.setState({
  //         characters: selectedCharacters.map((char, index) => ({
  //           name: char.name,
  //           id: index + 1
  //         })),
  //         isLoading: false
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  //useEffect runs after initial component has been rendered and after each time it rerenders
  //second argument, array of dependencies that says when should update
  //passing empty array, no data can change and so only runs once (componentDidMount)

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchStars = async () => {
  //     try {
  //       const response = await fetch('https://cors-anywhere.herokuapp.com/https://swapi.co/api/people')
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch.');
  //       }
  //       const data = await response.json()
  //       const selectedCharacters = data.results.slice(0, 5);
  //       setCharacters(
  //         selectedCharacters.map((char, index) => ({
  //           name: char.name,
  //           id: index + 1
  //         }))
  //       );
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchStars()
  //   // fetch('https://cors-anywhere.herokuapp.com/https://swapi.co/api/people')
  //   //   .then(response => {
  //   //     if (!response.ok) {
  //   //       throw new Error('Failed to fetch.');
  //   //     }
  //   //     return response.json();
  //   //   })
  //   //   .then(charData => {
  //   //     const selectedCharacters = charData.results.slice(0, 5);
  //   //     setCharacters(
  //   //       selectedCharacters.map((char, index) => ({
  //   //         name: char.name,
  //   //         id: index + 1
  //   //       }))
  //   //     );
  //   //     setIsLoading(false);
  //   //   })
  //   //   .catch(err => {
  //   //     console.log(err);
  //   //     setIsLoading(false);
  //   //   });
  // }, [])


  let content = <p>Loading characters...</p>;

  if (
    !isLoading &&
    selectedCharacters &&
    selectedCharacters.length > 0
  ) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {selectedCharacters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!selectedCharacters || selectedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
}

export default CharPicker;
