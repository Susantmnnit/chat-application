import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Conversation({props}) {
  const navigate=useNavigate();
  return (
    <div className='conversation-container' onClick={()=>{navigate('messages')}}>
      <p className='people-icon'>{props.name[0]}</p>
      <p className='people-name'>{props.name}</p>
      <p className='people-lastmessage'>{props.lastmessage}</p>
      <p className='people-timestamp'>{props.timestamp}</p>
    </div>
  )
}
