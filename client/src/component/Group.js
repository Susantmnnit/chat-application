import React, { useEffect, useState } from 'react';
import './chatpage.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../image/online-user-logo.jpg';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Group() {
  const lighttheme = useSelector((state) => state.themekey);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const navigate = useNavigate();

  if (!userData) {
    console.log('User not found');
    navigate('/');
  }

  const user = userData.data;

  useEffect(() => {
    const header = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get('http://localhost:8000/chat/fetchGroups', header).then((res) => {
      setGroups(res.data);
    });
  }, [user.token]);

  return (
    <>
      <div className={'icons' + (lighttheme ? '' : ' dark')}>
        <div className="logo">
          <img src={logo} alt="Logo" />
          <p>Available groups</p>
        </div>
      </div>
      <div className={'search' + (lighttheme ? '' : ' dark')}>
        <IconButton>
          <SearchOutlinedIcon className={'icon' + (lighttheme ? '' : ' dark')} />
        </IconButton>
        <input type="text" placeholder="Search" className={'search-bar' + (lighttheme ? '' : ' dark')} autoComplete="off" autoFocus />
      </div>
      <div className="online-users">
        {groups.map((group, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            className={'online-user' + (lighttheme ? '' : ' dark')}
            key={index}
            onClick={() => {
              const header = {
                headers: {
                  Authorization: `Bearer ${userData.data.token}`,
                },
              };

              axios.put(
                'http://localhost:8000/chat/addSelfToGroup',
                {
                  chatId: group._id,
                  userId: userData.data._id,
                },
                header
              );
            }}
          >
            <p className="onlie-user-fch">{group.chatName[0]}</p>
            <p className="online-user-name">{group.chatName}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}