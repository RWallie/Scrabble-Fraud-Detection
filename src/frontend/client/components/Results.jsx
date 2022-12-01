import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Results = (props) => {
  const {results, setResults, coefs, setCoefs} = props;


  useEffect(() => {
    requestCoefs()
  }, []); // empty dependency array will call this effect only on website initialization


  async function requestCoefs() {
    console.log("Getting Coefficients!")
    axios.get('/coefs')
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    console.log("Request finished!")
  }

  if (results.length === 0){
  return (
    <div>
    </div>
  )
  }else{
    const coefficient_list = []
    for (const key in results[3]){
      coefficient_list.push(<p>{key}: {results[3][key]}</p>)
    }
    console.log(coefficient_list)
    if (results[2]){
      return (
        <div>
          <div>
            <p>Your Rating: {results[0]}</p>
            <p>Predicted Rating: {results[1]}</p>
            <p id="red">Fraud Detected!</p>
            <p className='coefs'>Coefficient Percentages</p>
          </div>
          <div>
            {coefficient_list}
          </div>
        </div>
      )
    }else{
      return (
        <div>
          <div>
            <p>Your Rating: {results[0]}</p>
            <p>Predicted Rating: {results[1]}</p>
            <p id="green">Fraud Not Detected</p>
            <p className='coefs'>Coefficient Percentages</p>

          </div>
          <div>
           {coefficient_list}
          </div>
        </div>
      )
    }
  }
}

export default Results
