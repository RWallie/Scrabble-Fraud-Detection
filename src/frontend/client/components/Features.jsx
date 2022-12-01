import React, { Component, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios'

const Features = (props) => {
  const {register, handleSubmit, errors} = useForm();
  const {results, setResults, coefs, setCoefs} = props;

  const onSubmit = (data) => {
    const formattedData = {
      ...data,  
      time_control_name_blitz: 0.0,
      time_control_name_rapid: 0.0,
      time_control_name_regular: 0.0,
      time_control_name_ultrablitz: 0.0,
      game_end_reason_CONSECUTIVE_ZEROES: 0.0,
      game_end_reason_RESIGNED: 0.0,
      game_end_reason_STANDARD: 0.0,
      game_end_reason_TIME: 0.0,
      lexicon_CSW21: 0.0,
      lexicon_ECWL: 0.0,
      lexicon_NSWL20: 0.0,
      lexicon_NWL20: 0.0,
      rating_mode_CASUAL: 0.0,
      rating_mode_RATED: 0.0
    }
    
    // increment categorical data that was chosen
    formattedData["time_control_name_" + data.time_control_name.toLowerCase()] += 1
    formattedData["game_end_reason_" + data.game_end_reason.toUpperCase()] += 1
    formattedData["lexicon_" + data.lexicon.toUpperCase()] += 1  
    formattedData["rating_mode_" + data.rating_mode.toUpperCase()] += 1
    // delete key-value pairs that were categorical selections
    delete formattedData.time_control_name
    delete formattedData.game_end_reason
    delete formattedData.lexicon
    delete formattedData.rating_mode

    // convert all data to floating point values

    console.log(formattedData)

    // make a post request to the server for a prediction
    console.log("Submitting Request!")
    axios.post('/predict', formattedData)
      .then(response => {
        console.log(response)
        setResults(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    console.log("Request finished!")
  }

  return (
    <div id='form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" name="username" {...register("username")}/>
        <input type="text" placeholder="Score" name="score" {...register("score")}/>
        <input type="text" placeholder="Total Turns" name="total_turns" {...register("total_turns")}/>
        <input type="text" placeholder="First Five Turns Points" name="first_five_turns_points" {...register("first_five_turns_points")}/>
        <input type="text" placeholder="Max Points Turn" name="max_points_turn" {...register("max_points_turn")}/>
        <input type="text" placeholder="Min Points Turn" name="min_points_turn" {...register("min_points_turn")}/>
        <input type="text" placeholder="max_min_difference" name="max_min_difference" {...register("max_min_difference")}/>
        <input type="text" placeholder="Play First" name="first" {...register("first")}/>
        <input type="text" placeholder="Win" name="winner" {...register("winner")}/>
        <input type="text" placeholder="Initial Time Seconds" name="initial_time_seconds" {...register("initial_time_seconds")}/>
        <input type="text" placeholder="Increment Seconds" name="increment_seconds" {...register("increment_seconds")}/>
        <input type="text" placeholder="Max OT Mins" name="max_overtime_minutes" {...register("max_overtime_minutes")}/>
        <input type="text" placeholder="Game Duration (seconds)" name="game_duration_seconds" {...register("game_duration_seconds")}/>
        <input type="text" placeholder="Time Used" name="time_used" {...register("time_used")}/>
        <input type="text" placeholder="Avg Points Per Turn" name="points_per_turn" {...register("points_per_turn")}/>
        <input type="text" placeholder="Points Per Second" name="points_per_second" {...register("points_per_second")}/>
        <label htmlFor="time_control_name">Time Control: </label>
        <select placeholder="Time Control" name="time_control_name" id="time_control_name" form="timecontrol"  {...register("time_control_name")}>
          <option value="regular">Regular</option>
          <option value="rapid">Rapid</option>
          <option value="blitz">Blitz</option>
          <option value="ultrablitz">UltraBlitz</option>
        </select>
        <label htmlFor="gameend">Game End: </label>
        <select placeholder="Game End" name="game_end_reason" id="gameend" {...register("game_end_reason")}>
          <option value="standard">Standard</option>
          <option value="resigned">Resigned</option>
          <option value="consecutive_zeroes">Consecutive Zeroes</option>
          <option value="time">Time</option>
        </select>
        <label htmlFor="lexicon">Lexicon: </label>
        <select placeholder="Lexicon" name="lexicon" id="lexicon"{...register("lexicon")}>
          <option value="csw21">CSW21</option>
          <option value="ecwl">ECWL</option>
          <option value="NSWL20">NSWL20</option>
          <option value="NWL20">NWL20</option>
        </select>
        <label htmlFor="rating_mode">Rating Mode: </label>
        <select type="text" placeholder="Rating Mode" name="rating_mode" id="rating_mode" {...register("rating_mode")}>
          <option value="casual">Casual</option>
          <option value="rated">Rated</option>
        </select>
      <input type="submit"/>
    </form>
    </div>
  )
}

export default Features
