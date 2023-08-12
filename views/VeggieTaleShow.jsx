import React from 'react'

function VeggieTaleShow(props) {

    const vegetable = props.vegetables

  return (
    <div>
        <h4>{vegetable.name} is {vegetable.color}</h4>
        <h2 style={{color: "crimson"}}>{vegetable.readyToEat ? "Fresh Produce" : "Rotten Produce."}</h2>
    </div>
  )
}

export default VeggieTaleShow
