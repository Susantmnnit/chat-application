import React from 'react'
import './receivemessage.css'

export default function Receivemessage(props) {
  console.log("receive",props);
    return (
      <div className='receivedsms'>
        <p className='receive-icon'>{props.props.sender.name[0]}</p>
        <div className="text-content">
            <p className='receive-name'>{props.props.sender.name}</p>
            {/* <p className='receive-message'>{props.message}</p> */}
            <p className='receive-message'>{props.props.content}</p>
            <p className='receive-timestamp'>{props.props.createdAt}</p>
        </div>
      </div>
    )
}
