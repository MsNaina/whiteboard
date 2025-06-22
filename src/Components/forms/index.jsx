import "./index.css"
import JoinroomForms from "./joinroom"
import CreateroomForms from "./createroom"
const Forms=({uuid , socket , setuser})=>{
    return(
        <>
        <div className="row h-100 pt-5">
            <div className="p-5 col-md-4 mx-auto mt-5 border border-primary rounded-2 d-flex flex-column align-items-center form-box">
                <h2 className="text-primary fw-bold">Create Room</h2>
                <CreateroomForms uuid={uuid} socket= {socket} setuser={setuser} />
            </div>
            <div className="p-5 col-md-4 mx-auto mt-5 border border-primary rounded-2 d-flex flex-column align-items-center form-box">
                <h1 className="text-primary fw-bold">Join Room</h1>
                <JoinroomForms uuid={uuid} socket= {socket} setuser={setuser} />
            </div>

        </div>
        </>
    )
}
export default Forms