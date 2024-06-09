import React, { useState, useEffect } from 'react';
import './chatpage.css';
import Leftbar from './Leftbar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Chatpage() {
  const lighttheme = useSelector((state) => state.themekey);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 745);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 745);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={`container${lighttheme ? '' : ' dark-theme'}`}>
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          className="menu-button"
          style={{marginLeft: '2px',height: '50px'}}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        className={`drawer${lighttheme ? '' : ' wall'}`}
      >
        <Leftbar />
      </Drawer>
      {!isMobile && (
        <div className={`leftbar${lighttheme ? '' : ' wall'}`}>
          <Leftbar />
        </div>
      )}
      <div className={`rightbar${lighttheme ? '' : ' wall'}`}>
        <Outlet />
      </div>
    </div>
  );
}
