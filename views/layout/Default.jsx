import React from 'react'

function Default(props) {
  return (
    <div>
      <html>
        <head><title>{props.title}</title></head>
        <body>
        <h1>{props.title}</h1>
        {props.children}
        <h1>THIS IS A TEST!</h1>
        </body>
      </html>
    </div>
  )
}

export default Default
