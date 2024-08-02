import React from 'react'

const Select = ({lista, fxgeneric}) => {
  return (
    <div>
        <select onChange={(e) => {
            fxgeneric(e);
        }}>

            {lista.map((o) => {
                return <option key={o.value} value={o.value}>{o.descript}</option>;
            })}
            
        </select>
    </div>
  )
}

export default Select