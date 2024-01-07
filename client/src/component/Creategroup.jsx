import React, { useState } from 'react'
import './chatpage.css'
import { IconButton } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Creategroup() {
  const lighttheme = useSelector((state)=>state.themekey);
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const navigate = useNavigate();
  const [usersInGroup, setUsersInGroup] = useState([]);

  if(!userData){
    console.log("User not Found");
    navigate("/");
  }
  const user = userData.data;
  const [groupName,setGroupName] = useState("");
  
  const createGroup = async() => {
    const header = {
      headers:{
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      await axios.post("http://localhost:8000/chat/createGroup", {
        name: groupName,
        users: usersInGroup,
      }, header);

      navigate("/chat-app/group");
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const addUserToGroup = () => {
    const userId = user._id;
    setUsersInGroup([...usersInGroup, userId]);
  };

  return (
    <div className={"group-input-container" + (lighttheme ? "" : " wall")}>
        <div className={"input-container" + (lighttheme ? "" : " dark")}>
            <input type="text" placeholder='Enter group name' value={groupName} onChange={(e)=>{setGroupName(e.target.value)}} className={"create-group" + (lighttheme ? "" : " dark")} />
            <IconButton onClick={() => {
              addUserToGroup();
              createGroup();
            }}>
                <AddRoundedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
            </IconButton>
        </div>
    </div>
  )
}
