import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import Chatpage from './component/Chatpage';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Rightbar from './component/Rightbar';
import Creategroup from './component/Creategroup';
import Onlineuser from './component/Onlineuser';
import Group from './component/Group';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='chat-app' element={<Chatpage/>}>
          <Route path='home' element={<Home/>}/>
          <Route path='messages' element={<Rightbar/>}/>
          <Route path='create-group' element={<Creategroup/>}/>
          <Route path='onlineusers' element={<Onlineuser/>}/>
          <Route path='group' element={<Group/>}/>
        </Route>
      </Routes>
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <Chatpage/> */}
    </div>
  );
}

export default App;
