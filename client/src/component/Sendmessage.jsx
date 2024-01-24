import React from 'react'
import './receivemessage.css'

export default function Sendmessage(props) {
  console.log("send",props);
    return (
      <div className='send-messages'>
        <div className="messagebox">
          {/* <p className='mess'>{props.message}</p> */}
          <p className='mess'>{props.props.content}</p>
          <p className='receive-timestamp'>{props.props.createdAt}</p>
        </div>
      </div>
    )
}
