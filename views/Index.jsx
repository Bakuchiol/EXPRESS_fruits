import React from 'react'

function Index(props) {

   const fruits = props.fruits

  return (
    <div>
      <nav>
        <a href="/fruits/new">Create a New Fruit</a>
      </nav>

      {fruits.map((fruit,i)=>{
        return (
            <>
            <a href={`/fruits/${i}`}>
                <h2>{fruit.name}</h2>
            </a>
            </>
        );
      })}
    </div>
  );
}

export default Index
