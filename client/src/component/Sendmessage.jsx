import React from 'react'
import './receivemessage.css'

export default function Sendmessage({props}) {
  //console.log("send",props);
  const formatDate = (isoString) => {
    //console.log("send date string:", isoString);
    const date = new Date(isoString);
    //console.log("Parsed date object:", date);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className='send-messages'>
      <div className="messagebox">
        {/* <p className='mess'>{props.message}</p> */}
        <p className='mess'>{props.content}</p>
        <p className='receive-timestamp'>{formatDate(props.createdAt)}</p>
      </div>
    </div>
  )
}
