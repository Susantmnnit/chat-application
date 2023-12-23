import React from 'react'

export default function Conversation({props}) {
  return (
    <div className='conversation-container'>
      <p className='people-icon'>{props.name[0]}</p>
      <p className='people-name'>{props.name}</p>
      <p className='people-lastmessage'>{props.lastmessage}</p>
      <p className='people-timestamp'>{props.timestamp}</p>
    </div>
  )
}
