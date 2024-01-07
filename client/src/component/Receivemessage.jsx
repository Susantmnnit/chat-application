import React from 'react'
import './receivemessage.css'

export default function Receivemessage(props) {
    return (
      <div className='receivedsms'>
        <p className='receive-icon'>{props.name[0]}</p>
        <div className="text-content">
            <p className='receive-name'>{props.name}</p>
            {/* <p className='receive-message'>{props.message}</p> */}
            <p className='receive-message'>sms</p>
            <p className='receive-timestamp'>{props.timestamp}</p>
        </div>
      </div>
    )
}
