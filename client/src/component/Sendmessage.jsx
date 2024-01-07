import React from 'react'
import './receivemessage.css'

export default function Sendmessage(props) {
    return (
      <div className='send-messages'>
        <div className="messagebox">
          {/* <p className='mess'>{props.message}</p> */}
          <p className='mess'>sms</p>
          <p className='receive-timestamp'>{props.timestamp}</p>
        </div>
      </div>
    )
}
