import React from 'react'
import './receivemessage.css'

export default function Sendmessage() {
    const props={name:'You', message:'Hello, there',timestamp:'12.00'};
    return (
      <div className='send-messages'>
        <div className="messagebox">
          <p className='mess'>{props.message}</p>
          <p className='receive-timestamp'>{props.timestamp}</p>
        </div>
      </div>
    )
}
