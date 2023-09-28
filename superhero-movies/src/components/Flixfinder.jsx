import React, { useState, useEffect } from 'react'; //imports the React package, I'm able to use the useState hook and the useEffect hook

const Flixfinder = () => { //arrow function FlixFinder
  const [searchNewFilm, setSearchNewFilm] = useState(""); //this is for my search bar when finding a new media keyword. Uses useState hook to allow setSearchNewFilm to update searchNewFilm's data. 
  //useState sets a variable and has a function that can update that variable
  const [movies, setMovies] = useState([]); //Using the useState hook. Setting the useState as a empty string. Sets movies and lets setMovies update the movie/data
  const [selectedFilm, setSelectedFilm] = useState(null); //setSelectedFilm will use the useState hook that will update the selectedFilm variable. It's currently at null but when the selectedFilm is updated then it'll update the keyword.

  const filmInfo = async (query) => { //arrow function filmInfo, async is for async functions. Async will return a new promise(either completion or failure of the async operation. Promise will return the resulting value) which will be completed with the value returned by the async function or rejected. Query is a parameter(placeholder varaible)
    let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=4ec9a711`); //response is a variable that awaits the fetch api data, query is the value in the input box which is defined by what the user types and will be stored. The fetch function is taking that as its parameter.
    let data = await response.json(); //a function that reads the response like fetch and interprets it as json data, making it into usable js object then stores it into the object variable
    setMovies(data.Search || []);  //setMovies is changing movies to equal data.search and putting it into a new array. The data is pulling from Search array.
  
  };

  const filmDetailedInfo = async (imdbID) => { //filmDetailedInfo arrow function. Asynchronous function. imdbID is a parameter
    let response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=4ec9a711`);
    //response is a variable that awaits the fetch api data. imdbID is 
    let data = await response.json(); //data is being updated to a json format
    setSelectedFilm(data); //setSelectedFilm(the function that can update the varaible) is changing SelectedFilm to equal data. Uses useState hook
    console.log(data) //trying to see what's in the array to decide what data to grab
  };

  
  // const resetSelectedFilm = () => {
  //   setSelectedFilm(null);
  // }; //did not use
  
  const handleInputChange = (e) => { //29-31 handleInputChange arrow function. setSearchNewFilm will update the searchNewFilm variable to whatever the user inputs.
    setSearchNewFilm(e.target.value); 
  };

  const handleSearch = () => { //33-35 handleSearch is an arrow function. Once handleSearch is clicked/submitted then filmInfo function will fetch the api and update the searchNewFilm to whatever the user had input. searchNewFilm is being updated by the handleInputChange function.
    filmInfo(searchNewFilm); 
  };
  
  
  //  38-40 Mortal Kombat related media will pop up on website initialization. filmInfo will fetch the api with the argument Mortal Kombat as the data shown. ()=> an anonymous function that lets another function be used with an argument.
  useEffect(()=> {
    filmInfo('Mortal Kombat')
  }, []);

  return (
    <div className='mainContainer'>
      <div className="titleSearch">
        {/* FlixFinder title and  adds gif to the title using img link*/}
        <a href='' className='title'> <h1> FlixFinder <img className='logo' src="https://media2.giphy.com/media/2eKfq00HWfb91flICf/giphy.gif" alt="" /> </h1></a>
      </div>
      <div className='searchBar'>
        {/* Creates an input field where the user will be able type in their own input. Whatever input that the user puts into the field then onChange(onChange is whenever anything changes within the field) event listener will run the handleInputChange function which will update the searchNewFilm variable */}
        <input className='inputSearch' type="text" maxLength={50} value={searchNewFilm} onChange={handleInputChange} /> 
        {/* Search button with onClick event listener. handleSearch will now use the filmInfo function to fetch new api data*/}
        <button className='searchButton' onClick={handleSearch}>Search</button>
      </div>
      <ul className='flix-list'>
        {movies.length === 0 ? ( // movies goes into the api data's array and looks through all of the array. If that compares to 0 then return no media found to the user
          <li className='no-media-found'>
            <p>No media found</p>
          </li>
        ) : (
          
          movies.map((movie, index) => { // movie is an element and index is functioning as an number/id for that particular keyword. map is a callback function  on each element of the array which will then return the array that contains the results. map is iterating over the map array and applying the function.
            return (
              <li key={index} className='flix-info'>
                {/*Keys are a  special attribute that react uses to identify individual components in the list(easy way to update component). A unique identifier. index is now the key */}
                <div className='flix-container'>
                  <div className='poster-container'>
                    <img
                      className='poster-img'
                      src={movie.Poster} //going through the movie array and grabbing Poster
                      alt={movie.Title} //going through movie array and grabbing Title. (this is not shown on the user side)
                      onClick={() => filmDetailedInfo(movie.imdbID)} // Makes the image clickable. filmDetailedInfo is fetching the "second api"(not really second api but different parameter within api key) fetching deeper into the array movie going through imdbID
                    /> 
                  </div>
                  <div className='movie-details'>
                    <h2 className='movie-title'>{movie.Title}</h2>
                    <div className='info-container'>
                      {/* conditional statement. selectedFilm  checks if the selectedFilm variable exists. If selectedFilm is undefined or null this condition will be false.
                      If selectedFilm.imdbID === movie.imdbID then this is used to determine if the detailed information should be displayed for the current movie.
                      If both are true then the content will show. */}
                      {selectedFilm && selectedFilm.imdbID === movie.imdbID && (
                        <div className='description'>
                          {/* selectedFilm is pulling all of the selected data like Year,Genre,Actors,etc.This is grabbing from the imdbID and going deeper into the array */}
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
         {/* //footer at the bottom of the page*/}
        <footer>
          <p> 2023 FlixFinder. All Rights Reserved to John Nguyen</p>
        </footer>
      </div>
    </div>
  );
};

export default Flixfinder;

