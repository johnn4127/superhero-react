import React, { useState, useEffect } from 'react';

const Flixfinder = () => {
  const [searchNewFilm, setSearchNewFilm] = useState(""); 
  const [movies, setMovies] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const filmInfo = async (query) => {
    let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=4ec9a711`);
    let data = await response.json();
    setMovies(data.Search || []); 
  };

  const filmDetailedInfo = async (imdbID) => {
    let response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=4ec9a711`);
    let data = await response.json();
    setSelectedFilm(data);
    console.log(data)
  };

  
  const resetSelectedFilm = () => {
    setSelectedFilm(null);
  };
  
  const handleInputChange = (e) => {
    setSearchNewFilm(e.target.value); 
  };

  const handleSearch = () => {
    filmInfo(searchNewFilm); 
  };
  
  
  // Mortal Kombat related media will pop up on website initialization
  useEffect(()=> {
    filmInfo('Mortal Kombat')
  }, []);

  return (
    <div className='mainContainer'>
      <div className="titleSearch">
        <a href='' className='title'> <h1> FlixFinder <img className='logo' src="https://media2.giphy.com/media/2eKfq00HWfb91flICf/giphy.gif" alt="" /> </h1></a>
      </div>
      <div className='searchBar'>
        <input className='inputSearch' type="text" maxLength={50} placeholder="" value={searchNewFilm} onChange={handleInputChange} /> 
        <button className='searchButton' onClick={handleSearch}>Search</button>
      </div>
      <ul className='flix-list'>
        {movies.length === 0 ? ( // Check if no movies are found
          <li className='no-media-found'>
            <p>No media found</p>
          </li>
        ) : (
          movies.map((movie, index) => {
            return (
              <li key={index} className='flix-info'>
                <div className='flix-container'>
                  <div className='poster-container'>
                    <img
                      className='poster-img'
                      src={movie.Poster}
                      alt={movie.Title}
                      onClick={() => filmDetailedInfo(movie.imdbID)} // Make the image clickable
                    /> 
                  </div>
                  <div className='movie-details'>
                    <h2 className='movie-title'>{movie.Title}</h2>
                    <div className='info-container'>
                      {selectedFilm && selectedFilm.imdbID === movie.imdbID && (
                        <div className='description'>
                          <p>Year: {selectedFilm.Year}</p>
                          <p className='plot-description'>Plot: {selectedFilm.Plot}</p>
                          <p>Genre: {selectedFilm.Genre}</p>
                          <p>Actors: {selectedFilm.Actors}</p>
                          <p>imdbRating: {selectedFilm.imdbRating}</p>
                          <p>Metascore: {selectedFilm.Metascore}</p>                       
                          
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })
        )}
      </ul>
      <div className='footer'>
        <footer>
          <p> 2023 FlixFinder. All Rights Reserved to John Nguyen</p>
        </footer>
      </div>
    </div>
  );
};

export default Flixfinder;
