import React from 'react'
import './chatpage.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

export default function Conversation({props}) {
  const lighttheme = useSelector((state)=>state.themekey);
  const navigate=useNavigate();
  return (
    <motion.div  initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }} className={"conversation-container" + (lighttheme ? "" : " dark")} onClick={()=>{navigate('messages')}}>
      <p className='people-icon'>{props.name[0]}</p>
      <p className={"people-name" + (lighttheme ? "" : " dark")}>{props.name}</p>
      <p className='people-lastmessage'>{props.lastmessage}</p>
      <p className={"people-timestamp" + (lighttheme ? "" : " dark")}>{props.timestamp}</p>
    </motion.div>
  )
}
