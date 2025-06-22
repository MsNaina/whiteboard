import { useState } from "react"
import { useNavigate } from "react-router-dom"
const CreateroomForms=({uuid, socket , setuser})=>{
    const[roomId , setroomId]=useState('')
    const[name, setname]=useState("")
    const navigate = useNavigate()
    const handleCreateroom=(e)=>{
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
           <input type="text" className="form-control my-2 " placeholder="Enter your name" value={name} 
           onChange={(e)=>setname(e.target.value)}/>
        </div>

       
        <div className="input-group d-flex align-items-center justify-content-center">
          <input type="text" className="form-control my-2 " value={roomId} placeholder="Generate room code" disabled/>
        </div>

        <div className="input-group-append ">
            <button className="btn btn-primary btn-sm me-1 " type="button" 
            onClick={()=>setroomId(uuid())}>Generate</button>
            <button className="btn btn-outline-danger btn-sm " type="button">Copy</button>
        </div>

        <div>
            <button type="submit" className="btn btn-primary btn-block form-control mt-4"
            onClick={handleCreateroom}
            >Generate Room</button>
        </div>

       </form>
        </>
    )
}
export default CreateroomForms