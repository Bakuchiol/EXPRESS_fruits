import React from 'react'

function VeggieTale(props) {

    const vegTale = props.vegetables

  return (
    <div>
      <h1>VEGGIE TALES?</h1>
      <nav>
        <a href="vegTale/new">WORK PLEASEEEEEE</a>
      </nav>

        {vegTale.map((veg, i) => {
            return (
                <div key={i}>
                    <a href={`/veggieTale/${veg.id}`}>
                        <h2>{veg.name}</h2>
                    </a>
                </div>
            )
        })}

    </div>
  )
}

export default VeggieTale
