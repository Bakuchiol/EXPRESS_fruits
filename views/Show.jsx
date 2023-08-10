import React from 'react'

function Show(props) {
    // from index.js
    const fruit = props.fruit

  return (
    <div>
      <h1>SHOW PAGE</h1>
      <h4>The  {fruit.name} is {fruit.color}</h4>
      <h2 style={{color: "crimson"}}>{fruit.readyToEat ? "It's ready to eat" : "It's not ready yet."}</h2>
    </div>
  )
}

export default Show
