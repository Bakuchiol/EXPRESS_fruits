import React from 'react'
import DefaultLayout from '../views/layout/Default'

function Edit(props) {
    const fruit = props.fruit
  return (
    <div>
      <DefaultLayout title="Edit Page">      
     {/* See the Layout takes in a prop called Title and we pass Edit Page to it  note: comments can't go first or last in  jsx return*/}
          {/* form is not complete we will do that below*/}
          <form action={`/fruits/${props.fruit._id}?_method=PUT`} method="POST">
          Name: <input type="text" name="name" defaultValue={props.fruit.name}/><br/>
          Color: <input type="text" name="color"  defaultValue={props.fruit.color}/><br/>
          Is Ready To Eat:
              { props.fruit.readyToEat? <input type="checkbox" name="readyToEat" defaultChecked />: <input type="checkbox" name="readyToEat"/> }
          <br/>
          <input type="submit" value="Submit Changes"/>
      </form>
      </DefaultLayout>
    </div>
  )
}

export default Edit
