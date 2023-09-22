import React from 'react'

const Movies = () => {
    const heroData = async () => {
        let response = await fetch ('http://www.omdbapi.com/?i=tt3896198&apikey=4ec9a711')
        let data = await response.json()
        console.log(data)}
  return (
    <div>Hello world!</div>
  )
}

export default Movies