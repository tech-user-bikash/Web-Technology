import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //  let counter = 0; 
  const[counter, setCounter]=useState(0);
  function handleSubtract(counter){
    console.log(counter)
    if(counter < 0){
      // document.getElementById("value").innerHTML = "Value can't be -ve";
    } else {
      setCounter(counter-1);
    }

  }
  return (
    <>
    <div id="design">
      <h1>Counter Application</h1>
      <h2 id = "value">Counter Value : {counter}</h2>
      <div id="box">{counter}</div>
      <button onClick={()=>setCounter(counter+1)}>Add Value</button>
      <button onClick={handleSubtract(counter)}>Subtract Value</button>
      <button onClick={()=>setCounter(0)}>Reset</button>
    </div>
      
    </>
  )
}

export default App
