import React, { useEffect, useState} from 'react';import Features from './Features';
import Results from './Results'
const Home = () => {
  const [results, setResults] = useState([])
  const [coefs, setCoefs] = useState([])


  return (
    <div id="home">
      <Features results={results} setResults={setResults} coefs={coefs} setCoefs={setCoefs}/>
      <Results results={results} setResults={setResults} coefs={coefs} setCoefs={setCoefs}/>
    </div>
  )
}

export default Home
