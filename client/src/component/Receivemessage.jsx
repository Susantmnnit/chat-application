import React from 'react';
import './receivemessage.css';

export default function Receivemessage({ props }) {
  //console.log("Received props:", props);

  const formatDate = (isoString) => {
    //console.log("Received date string:", isoString);
    const date = new Date(isoString);
    //console.log("Parsed date object:", date);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className='receivedsms'>
      <p className='receive-icon'>{props.sender.name[0]}</p>
      <div className="text-content">
        <p className='receive-name'>{props.sender.name}</p>
        <p className='receive-message'>{props.content}</p>
        <p className='receive-timestamp'>{formatDate(props.createdAt)}</p>
      </div>
    </div>
  );
}
