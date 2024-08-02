import React from 'react'
/*Para crear componentes debemos siempre importar React from 'react'*/
const Input = ({title, type, valor, fxgeneric, name="", error=""}) => {

  return (
      <div className='flex py-2'>
        <div className='w-36'>
          {title} <span className='text-blue-400 font-semibold'>{name}</span>: 
        </div>
        <div className='w-full px-4'>
          <input 
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mx-6  ${error ? "border-2 border-red-600" : ""}`}
              type={type}
              value={valor}
              onChange={(e) => { 
                  fxgeneric(e);
              }} 
          />

          <div className='text-left pl-2.5'>
            <span className='text-red-600 text-sm font-semibold pl-4'>{error}</span>
          </div>   
        </div>        
      </div>      
  )
}

export default Input