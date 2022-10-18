import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (

    <div className="flex justify-center items-center mt-6">
          <Link
            to="/register"
            className="inline-block text-sm text-orange-500 align-baseline hover:text-orange-800"
          >
         Register!
          </Link>
        </div>

  )
}

export default Home