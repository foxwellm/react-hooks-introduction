import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = (props) => {
  // state = { loadedCharacter: {}, isLoading: false };
  const [loadedCharacter, setLoadedCharacter] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  
  console.log('new char')
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  // componentDidMount() {
  //   this.fetchData();
  // }

//componentDidMount & componentDidUpdate
  useEffect(() => {
    fetchData()
    return () => {
      console.log('cleaning up')
    }
  }, [props.selectedChar])

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true);
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  useEffect(() => {
    return () => {
      console.log('componentWillUnmount')
    }
  }, [])

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}

//shouldComponentUpdate
export default React.memo(Character, (prevProps, nextProps) => {
  //opposite of shouldComponentUpdate, return false if should rerender
  //React.memo(Character) works on own, knows to check if props change
  nextProps.selectedChar === prevProps.selectedChar
});
