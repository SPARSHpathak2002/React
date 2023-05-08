import React from 'react'
import { Link } from 'react-router-dom'

const Introduction = () => {
  return (
    <div className="bg-waveSvg bg-black bg-no-repeat bg-cover bg-center bg-fixed w-full h-screen flex flex-col items-center justify-center">
        <div className='w-1/2 flex flex-col items-center md:w-3/4 mb-28'>
            <h1 className='text-8xl font-black text-white'>Web Code Editor</h1>
            <p className='text-2xl  text-white'>
                An Online Web Based Editor ,&nbsp;
                <span className='font-bold'>Write ,</span>
                <span className='font-bold'>Compile ,</span>
                <span className='font-bold'>Save</span>.
            </p>
        </div>
            <Link to='/editor' className='bg-black text-white px-4 py-4 text-2xl rounded-md hover:border-2'>Start Coding</Link>
            <p className='mt-4'>Made with <span>❤</span> by  <a href="https://github.com/SPARSHpathak2002" className='font-bold text-white hover:underline'>Sparsh Pathak</a></p>
    </div>
  )
}

export default Introduction