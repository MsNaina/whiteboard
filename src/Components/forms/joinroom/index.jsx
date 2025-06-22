import { useState } from "react"
import { useNavigate } from "react-router-dom"

const JoinroomForms=({socket , setuser , uuid})=>{

    const [roomId , setroomId]=useState("")
    const[name,setname]=useState("")
    const navigate= useNavigate()
    const handleRoomjoin=(e)=>{
      e.preventDefault()

       const roomData={
        name,
        roomId,
        userId:uuid(),
        host:true,
        presenter:true
       }
       setuser(roomData);
       navigate(`/${roomId}`)
       socket.emit("UserJoined" , roomData)
        console.log(roomData)
    }   

    return(
        <>
         <form className="col-md-12 mt-5 form">

        <div className="form-group">
           <input type="text" className="form-control my-2 " placeholder="Enter your name" value={name} onChange={(e)=>setname(e.target.value)} />
        </div>

       
        <div className="form-group ">
          <input type="text" className="form-control my-2 " placeholder="Enter room code" value={roomId} onChange={(e)=>setroomId(e.target.value)} />
        </div>

        <div>
            <button type="submit" className="btn btn-primary btn-block form-control mt-4" onClick={handleRoomjoin}>Join Room</button>
        </div>

       </form>
        </>
    )
}
export default JoinroomForms