import { useState } from 'react'

import './App.css'
import Flixfinder from './components/Flixfinder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Flixfinder/>
    </>
  )
}

export default App
