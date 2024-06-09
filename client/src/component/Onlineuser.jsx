import React, { useEffect, useState } from 'react'
import './chatpage.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../image/online-user-logo.jpg'
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toaster from './Toaster';

export default function Onlineuser() {
  const lighttheme = useSelector((state)=>state.themekey);
  const [refresh, setRefresh] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userdata) {
      //console.log("User not authenticated");
      navigate(-1);
    } else {
      //console.log("User refreshed");
      const header = {
        headers: {
          Authorization: `Bearer ${userdata.data.token}`
        }
      };
      axios.get("http://localhost:8000/user/fetchusers", header).then((data) => {
        //console.log("User data from API ", data);
        setUsers(data.data);
      });
    }
  }, [refresh, navigate, userdata?.data?.token, userdata]); 
  
  const handleSearch = async (query) => {
    setRefresh(!refresh)
    setSearch(query);
    if (!query) {
      setToastMessage("Please Enter something in search");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userdata.data.token}`,
        },
      };

      // console.log("hello---");
      const { data } = await axios.get(`http://localhost:8000/user/fetchusers?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setToastMessage("Failed to Load the Search Results");
    }
  };

  const chatHndler = async (user) => {
    const header = {
      headers: {
        Authorization: `Bearer ${userdata.data.token}`
      },
    }
    try {
      await axios.post("http://localhost:8000/chat", {
        userId: user._id,
      },
        header);
      setToastMessage("Chat initiated successfully");
    } catch (error) {
      setToastMessage("Failed to initiate chat");
    }
  }

  return (
    <>
      {toastMessage && <Toaster message={toastMessage} />}
      <div className={"icons" + (lighttheme ? "" : " dark")}>
        <div className='logo'>
          <img src={logo} alt="Logo" />
          <p>Online users</p>
        </div>
      </div>
      <div className={"search" + (lighttheme ? "" : " dark")}>
        <IconButton>
          <SearchOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
        </IconButton>
        <input type="text" placeholder="Search by name or email" className={"search-bar" + (lighttheme ? "" : " dark")}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="online-users">
        {searchResult.length>0 ?  (searchResult.map((user,index)=>{
          return(
            <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }}
              className={"online-user" + (lighttheme ? "" : " dark")} key={index} 
              onClick={() =>chatHndler(user)}>
                <p className='onlie-user-fch'>{user.name[0]}</p>
                <p className='online-user-name'>{user.name}</p>
            </motion.div>
          )
        })) : (users.map((user,index)=>{
          return(
            <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }}
              className={"online-user" + (lighttheme ? "" : " dark")} key={index} 
              onClick={() =>chatHndler(user)}>
                <p className='onlie-user-fch'>{user.name[0]}</p>
                <p className='online-user-name'>{user.name}</p>
            </motion.div>
          )
        }))}
      </div>
    </>
  )
}
