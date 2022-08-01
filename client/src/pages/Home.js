import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {

  return (
    <div>
      <div className='center-simple' style={{height: '100vh'}}>
        <NavLink to="/game" >
          <button className='btn'>Start the game</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Home