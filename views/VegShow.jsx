import React from 'react'

function VegShow(props) {

    const vegetable = props.vegetable

  return (
    <div>
        <h4>{vegetable.name} is {vegetable.color}</h4>
        <h2 style={{color: "crimson"}}>{vegetable.readyToEat ? "Fresh Produce" : "Rotten Produce."}</h2>

    </div>
  )
}

export default VegShow
