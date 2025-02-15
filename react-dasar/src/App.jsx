/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'

function App() {
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }
  return (
    <div>
      <Header tes="inpo"/>
      <p>Belajar React Js</p>
      <button onClick={handleClick}> Like ({likes})</button>
    </div>
  );
}

export default App
