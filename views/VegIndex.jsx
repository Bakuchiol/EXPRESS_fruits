import React from 'react'

function VegIndex(props) {

    const vegetables = props.vegetables

  return (
    <div>
      <nav>
        <a href="/vegetables/new">List a new Character</a>
      </nav>

      {vegetables.map((vegetable,i)=>{
        return (
            <div key={i}>
            <a href={`/vegetables/${vegetable._id}`}>
                <h2>{vegetable.name}</h2>
            </a>
            </div>
        );
      })}
    </div>
  )
}

export default VegIndex
