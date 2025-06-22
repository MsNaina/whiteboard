import express from "express"
const app=express()

const server= require("http").createServer(app)
import { Server } from "socket.io"

const io= new Server(server)

//routes
app.get("/",(req,res)=>{
    res.send("Hii there")
})

io.on("connection",(socket)=>{
    socket.on('UserIsJoined' , (data)=>{
        const {name , host , userId , roomId , presenter } = data
        socket.join(roomId)
        socket.emit("UserIsJoined", {success : true})
    })
    console.log("user connected")
})

const port= process.env.PORT || 3000;
server.listen(port,()=>console.log(`Server is running on port ${port}`))