import React from 'react'
import { useSelector } from 'react-redux';

function Home() {

const {user} = useSelector(state => state.users);

  return (

      <div>
          {user && <h1>Welcome {user?.name}</h1>}
      </div>

  )
}

export default Home