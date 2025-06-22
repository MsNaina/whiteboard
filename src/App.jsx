import { useEffect, useState } from 'react'
import {Route ,Routes} from "react-router-dom"
import './App.css'
import io from "socket.io-client"
import Forms from './Components/forms'
import Roompage from './pages/roompage'

const server="http://localhost:3000"
  const connectionoption = {
    "force new connection": true,
    reconnectionAttempts : "Infinity",
    timeouts:10000,
    transports:["websocket"]
  }
  const socket=io(server, connectionoption)

const App=()=> {

  const[user , setuser] = useState(null)
  
  useEffect(()=>{
    socket.on("UserIsJoined", (data) =>{
      if(data.success){
        console.log("userjoinedd")
      }else{
        console.log("something went wrong")
      }
    })
  }, []);

  useEffect(() => {
  socket.on("connect", () => {
    console.log("Socket connected with ID:", socket.id);
  });
}, []);

  
  const uuid=()=>{
    let S4=()=>{
    return(((1 + Math.random()) * 0x10000 ) | 0).toString(16).substring(1)
    }
    return(
      S4() + S4() + "-" + S4() + "-" + S4()+ "-" + S4()+ "-" + S4() + S4() + S4()
    )
  }


  return (
    <>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Forms uuid={uuid} socket={socket} setuser={setuser} />}/>
          <Route path="/:roomId" element={<Roompage user={user}/>}/>
        </Routes>
        
      </div>
    </>
  )
}

export default App
