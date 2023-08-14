import React from 'react'
// const DefaultLayout = require('../views/layout/Default')
import DefaultLayout from '../views/layout/Default'

function Index(props) {

   const fruits = props.fruits

  return (
    <div>
      <DefaultLayout title={"Fruits Index Page"}>
      <nav>
        <a href="/fruits/new">Create a New Fruit</a>
      </nav>

      {fruits.map((fruit,i)=>{
        return (
            <div key={i}>
            <a href={`/fruits/${fruit._id}`}>
                <h2>{fruit.name}</h2>
            </a>

            {/* edit */}
            <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
            {/* edit */}

          {/* delete */}
          <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
            <input type="submit" value="DELETE"/>
          </form>
          {/* delete */}

            </div>
        );
      })}
    </DefaultLayout>
    </div>
  );
}

export default Index
